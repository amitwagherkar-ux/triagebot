/**
 * CrelioHealth AI Triage Evaluator - Main Application Engine
 * Pure modular, zero-dependency ES6+ implementation.
 */

// Global App State
const AppState = {
  currentMode: 'HISTORICAL', // 'HISTORICAL' (100) or 'CURRENT_SPRINT' (52)
  currentRunId: 'run_hist_v1',
  confidenceThreshold: 0.80, // 80% default as approved
  
  // Datasets
  historicalTickets: [],
  sprintTickets: [],
  runs: [],
  reviews: {}, // Key: `${runId}_${ticketId}`

  // UI State
  activeCategory: 'historical_results',
  activeTab: 'dashboard',
  categoryLastTab: {
    'current_run': 'evaluation',
    'historical_results': 'dashboard',
    'knowledge_base': 'patterns'
  },
  tableFilters: {
    search: '',
    status: 'ALL',
    groundTruth: 'ALL',
    aiClass: 'ALL',
    highRiskOnly: false,
    qualityIssueOnly: false,
    matrixCellFilter: null // { aiClass, gtClass }
  },
  currentPage: 1,
  pageSize: 25,
  currentDetailTicketId: null,

  // Comparison State
  compareRunAId: 'run_hist_v1',
  compareRunBId: 'run_hist_v2',

  // Review Queue Filter: 'pending', 'reviewed', 'all'
  reviewQueueFilter: 'pending'
};

// ==========================================================================
// 1. Initialization & Storage Engine
// ==========================================================================

function initApp() {
  loadStoredData();
  setupEventListeners();
  renderRunSelector();
  switchMode(AppState.currentMode);
  switchTab(AppState.activeTab || 'dashboard');
  showToast('Triage Evaluator initialized successfully', 'success');
}

function loadStoredData() {
  // Load baseline tickets from localStorage (if user appended) or fall back to window seeds
  const storedHist = localStorage.getItem('triage_custom_historical_tickets');
  if (storedHist) {
    try {
      AppState.historicalTickets = JSON.parse(storedHist);
    } catch (e) {
      AppState.historicalTickets = window.SEED_HISTORICAL_TICKETS || [];
    }
  } else {
    AppState.historicalTickets = window.SEED_HISTORICAL_TICKETS || [];
  }

  const storedSprint = localStorage.getItem('triage_custom_sprint_tickets');
  if (storedSprint) {
    try {
      AppState.sprintTickets = JSON.parse(storedSprint);
    } catch (e) {
      AppState.sprintTickets = window.SEED_SPRINT_TICKETS || [];
    }
  } else {
    AppState.sprintTickets = window.SEED_SPRINT_TICKETS || [];
  }

  updateDatasetModeBadges();

  // Load Model Runs from localStorage or fall back to preloaded
  const storedRuns = localStorage.getItem('triage_model_runs');
  if (storedRuns) {
    try {
      AppState.runs = JSON.parse(storedRuns);
    } catch (e) {
      AppState.runs = window.PRELOADED_RUNS || [];
    }
  } else {
    AppState.runs = window.PRELOADED_RUNS || [];
    saveRunsToStorage();
  }

  // Load Reviews from localStorage or fall back to preloaded
  const storedReviews = localStorage.getItem('triage_reviews');
  if (storedReviews) {
    try {
      AppState.reviews = JSON.parse(storedReviews);
    } catch (e) {
      AppState.reviews = {};
    }
  } else {
    AppState.reviews = {};
    if (window.INITIAL_FEEDBACK && Array.isArray(window.INITIAL_FEEDBACK)) {
      window.INITIAL_FEEDBACK.forEach(fb => {
        AppState.reviews[`${fb.run_id}_${fb.ticket_id}`] = fb;
      });
      saveReviewsToStorage();
    }
  }
}

function saveRunsToStorage() {
  try {
    localStorage.setItem('triage_model_runs', JSON.stringify(AppState.runs));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }
}

function saveReviewsToStorage() {
  try {
    localStorage.setItem('triage_reviews', JSON.stringify(AppState.reviews));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }
}

// ==========================================================================
// 2. Core Evaluation & Metrics Engine
// ==========================================================================

function getActiveTickets() {
  return AppState.currentMode === 'HISTORICAL' 
    ? AppState.historicalTickets 
    : AppState.sprintTickets;
}

function getActiveRun() {
  return AppState.runs.find(r => r.run_id === AppState.currentRunId) || AppState.runs[0];
}

/**
 * Calculates evaluation status for an individual ticket
 */
function evaluateTicket(ticket, run) {
  const ticketId = ticket['JIRA ID'].trim();
  const reviewKey = `${run.run_id}_${ticketId}`;
  const review = AppState.reviews[reviewKey];

  // AI Prediction lookup
  const aiResult = run.results ? run.results.find(r => r.ticket_id === ticketId) : null;

  // Ground Truth Determination
  let groundTruthClass = null;
  let isProvisional = false;

  if (review && review.reviewer_classification) {
    // Reviewer explicitly provided/confirmed classification
    groundTruthClass = review.reviewer_classification;
  } else if (AppState.currentMode === 'HISTORICAL') {
    // Locked ground truth from baseline file
    groundTruthClass = ticket['Classification'] ? ticket['Classification'].trim() : null;
  } else {
    // Current Sprint: supplied value is provisional until verified
    groundTruthClass = ticket['Classification'] ? ticket['Classification'].trim() : 'Unclassified';
    isProvisional = true;
  }

  // Evaluation outcome
  let matchStatus = 'NO_AI'; // 'CORRECT', 'INCORRECT', 'ABSTAINED', 'NO_AI'
  let isHighRiskError = false;

  if (aiResult && aiResult.classification) {
    const aiClass = aiResult.classification.trim();
    const conf = parseFloat(aiResult.confidence) || 0;

    if (aiClass === 'Needs Manual Triage') {
      matchStatus = 'ABSTAINED';
    } else if (groundTruthClass && groundTruthClass !== 'Unclassified') {
      if (aiClass.toLowerCase() === groundTruthClass.toLowerCase()) {
        matchStatus = 'CORRECT';
      } else {
        matchStatus = 'INCORRECT';
        if (conf >= AppState.confidenceThreshold) {
          isHighRiskError = true;
        }
      }
    } else {
      matchStatus = 'PENDING_REVIEW';
    }
  }

  return {
    ticketId,
    ticket,
    aiResult,
    groundTruthClass,
    isProvisional,
    matchStatus,
    isHighRiskError,
    review
  };
}

/**
 * Calculates full suite of metrics for a given run and dataset
 */
function computeRunMetrics(run, tickets = null) {
  if (!tickets) {
    tickets = run.dataset_target === 'HISTORICAL' 
      ? AppState.historicalTickets 
      : AppState.sprintTickets;
  }

  const evaluated = tickets.map(t => evaluateTicket(t, run));
  const totalTickets = evaluated.length;

  let correctCount = 0;
  let incorrectCount = 0;
  let abstainedCount = 0;
  let noAiCount = 0;
  let pendingCount = 0;
  let highRiskCount = 0;

  let totalConf = 0;
  let confCount = 0;
  let correctConfTotal = 0;
  let incorrectConfTotal = 0;

  // Confusion Matrix counts: [AI][GroundTruth]
  const classes = ['Bug', 'Config', 'Change Request', 'Needs Manual Triage'];
  const matrix = {};
  classes.forEach(r => {
    matrix[r] = {};
    classes.forEach(c => matrix[r][c] = 0);
  });

  evaluated.forEach(ev => {
    if (!ev.aiResult || !ev.aiResult.classification) {
      noAiCount++;
      return;
    }

    const aiClass = ev.aiResult.classification;
    const conf = parseFloat(ev.aiResult.confidence) || 0;
    totalConf += conf;
    confCount++;

    const gtClass = ev.groundTruthClass;

    if (matrix[aiClass] && matrix[aiClass][gtClass] !== undefined) {
      matrix[aiClass][gtClass]++;
    }

    if (ev.matchStatus === 'CORRECT') {
      correctCount++;
      correctConfTotal += conf;
    } else if (ev.matchStatus === 'INCORRECT') {
      incorrectCount++;
      incorrectConfTotal += conf;
      if (ev.isHighRiskError) highRiskCount++;
    } else if (ev.matchStatus === 'ABSTAINED') {
      abstainedCount++;
    } else if (ev.matchStatus === 'PENDING_REVIEW') {
      pendingCount++;
    }
  });

  const attemptedCount = correctCount + incorrectCount;
  const accuracyAttempted = attemptedCount > 0 ? (correctCount / attemptedCount) : 0;
  const accuracyOverall = totalTickets > 0 ? (correctCount / totalTickets) : 0;
  const coverage = totalTickets > 0 ? (attemptedCount / totalTickets) : 0;
  const abstentionRate = totalTickets > 0 ? (abstainedCount / totalTickets) : 0;

  const avgConfidence = confCount > 0 ? (totalConf / confCount) : 0;
  const avgConfCorrect = correctCount > 0 ? (correctConfTotal / correctCount) : 0;
  const avgConfIncorrect = incorrectCount > 0 ? (incorrectConfTotal / incorrectCount) : 0;

  // Per-Class Metrics for ['Bug', 'Config', 'Change Request']
  const targetClasses = ['Bug', 'Config', 'Change Request'];
  const perClassMetrics = {};
  let macroF1Sum = 0;
  let weightedF1Sum = 0;
  let totalSupport = 0;

  targetClasses.forEach(cls => {
    let tp = 0;
    let fp = 0;
    let fn = 0;
    let support = 0;

    evaluated.forEach(ev => {
      if (!ev.aiResult || !ev.aiResult.classification) return;
      const aiCls = ev.aiResult.classification;
      const gtCls = ev.groundTruthClass;

      if (gtCls === cls) support++;

      if (aiCls === cls && gtCls === cls) {
        tp++;
      } else if (aiCls === cls && gtCls !== cls) {
        fp++;
      } else if (aiCls !== cls && gtCls === cls) {
        fn++;
      }
    });

    const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;
    const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0;
    const f1 = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    perClassMetrics[cls] = { tp, fp, fn, support, precision, recall, f1 };
    macroF1Sum += f1;
    weightedF1Sum += f1 * support;
    totalSupport += support;
  });

  const macroF1 = targetClasses.length > 0 ? macroF1Sum / targetClasses.length : 0;
  const weightedF1 = totalSupport > 0 ? weightedF1Sum / totalSupport : 0;

  // Threshold Simulation Curve (50% to 95%)
  const thresholdSteps = [0.50, 0.60, 0.70, 0.80, 0.90, 0.95];
  const thresholdCurve = thresholdSteps.map(th => {
    let autoCount = 0;
    let manualCount = 0;
    let autoErrorCount = 0;

    evaluated.forEach(ev => {
      if (!ev.aiResult) {
        manualCount++;
        return;
      }
      const conf = parseFloat(ev.aiResult.confidence) || 0;
      const isAbstain = ev.aiResult.classification === 'Needs Manual Triage';

      if (conf >= th && !isAbstain) {
        autoCount++;
        if (ev.matchStatus === 'INCORRECT') {
          autoErrorCount++;
        }
      } else {
        manualCount++;
      }
    });

    return {
      threshold: th,
      thresholdPct: `${Math.round(th * 100)}%`,
      automatedCount: autoCount,
      automatedPct: totalTickets > 0 ? ((autoCount / totalTickets) * 100).toFixed(1) : '0',
      manualCount,
      manualPct: totalTickets > 0 ? ((manualCount / totalTickets) * 100).toFixed(1) : '0',
      incorrectAutomations: autoErrorCount,
      autoErrorRate: autoCount > 0 ? ((autoErrorCount / autoCount) * 100).toFixed(1) : '0'
    };
  });

  // Current threshold dynamic impact
  const currentThresholdData = (function() {
    let auto = 0;
    let manual = 0;
    let autoErr = 0;
    const th = AppState.confidenceThreshold;

    evaluated.forEach(ev => {
      if (!ev.aiResult) { manual++; return; }
      const conf = parseFloat(ev.aiResult.confidence) || 0;
      const isAbstain = ev.aiResult.classification === 'Needs Manual Triage';
      if (conf >= th && !isAbstain) {
        auto++;
        if (ev.matchStatus === 'INCORRECT') autoErr++;
      } else {
        manual++;
      }
    });
    return {
      automated: auto,
      automatedPct: totalTickets > 0 ? ((auto / totalTickets) * 100).toFixed(1) : '0',
      manual,
      manualPct: totalTickets > 0 ? ((manual / totalTickets) * 100).toFixed(1) : '0',
      autoErrors: autoErr,
      autoErrorRate: auto > 0 ? ((autoErr / auto) * 100).toFixed(1) : '0'
    };
  })();

  return {
    totalTickets,
    attemptedCount,
    correctCount,
    incorrectCount,
    abstainedCount,
    noAiCount,
    pendingCount,
    highRiskCount,
    accuracyAttempted,
    accuracyOverall,
    coverage,
    abstentionRate,
    avgConfidence,
    avgConfCorrect,
    avgConfIncorrect,
    matrix,
    classes,
    perClassMetrics,
    macroF1,
    weightedF1,
    thresholdCurve,
    currentThresholdData,
    evaluated
  };
}

// ==========================================================================
// 3. UI Rendering & Interactions
// ==========================================================================

function switchMode(newMode) {
  AppState.currentMode = newMode;
  AppState.currentPage = 1;
  AppState.tableFilters.matrixCellFilter = null;

  // Update mode buttons
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === newMode);
  });

  // Pick suitable run for mode
  const matchingRuns = AppState.runs.filter(r => r.dataset_target === newMode);
  if (matchingRuns.length > 0 && !matchingRuns.some(r => r.run_id === AppState.currentRunId)) {
    AppState.currentRunId = matchingRuns[0].run_id;
  }
  
  renderRunSelector();
  refreshAllViews();
}

function renderRunSelector() {
  const select = document.getElementById('runSelect');
  if (!select) return;

  const currentModeRuns = AppState.runs.filter(r => r.dataset_target === AppState.currentMode);
  const otherRuns = AppState.runs.filter(r => r.dataset_target !== AppState.currentMode);

  let html = `<optgroup label="Runs for ${AppState.currentMode === 'HISTORICAL' ? 'Historical Baseline' : 'Next Sprint'}">`;
  currentModeRuns.forEach(r => {
    html += `<option value="${r.run_id}" ${r.run_id === AppState.currentRunId ? 'selected' : ''}>${escapeHtml(r.model_name)} - ${escapeHtml(r.prompt_version)}</option>`;
  });
  html += `</optgroup>`;

  if (otherRuns.length > 0) {
    html += `<optgroup label="Other Runs">`;
    otherRuns.forEach(r => {
      html += `<option value="${r.run_id}" ${r.run_id === AppState.currentRunId ? 'selected' : ''}>[${r.dataset_target}] ${escapeHtml(r.model_name)} - ${escapeHtml(r.prompt_version)}</option>`;
    });
    html += `</optgroup>`;
  }

  select.innerHTML = html;
}

function refreshAllViews() {
  const run = getActiveRun();
  if (!run) return;

  const metrics = computeRunMetrics(run);

  renderQuickKpis(metrics);
  renderDashboard(metrics);
  renderEvaluationTable(metrics);
  renderReviewQueue(metrics);
  renderModelComparison();
  renderFeedbackAnalysis(metrics);
}

// --------------------------------------------------------------------------
// Quick KPI Bar
// --------------------------------------------------------------------------
function renderQuickKpis(m) {
  document.getElementById('quickAccuracyVal').textContent = `${(m.accuracyAttempted * 100).toFixed(1)}%`;
  document.getElementById('quickAccuracyVal').className = `kpi-pill-val ${m.accuracyAttempted >= 0.8 ? 'success' : 'danger'}`;

  document.getElementById('quickHighRiskVal').textContent = m.highRiskCount;
  document.getElementById('quickHighRiskVal').className = `kpi-pill-val ${m.highRiskCount > 0 ? 'danger' : 'success'}`;

  document.getElementById('quickAbstainVal').textContent = `${(m.abstentionRate * 100).toFixed(1)}%`;

  // Count pending reviews in either sprint mode or historical mode
  let pendingCount = 0;
  if (AppState.currentMode === 'CURRENT_SPRINT') {
    pendingCount = m.evaluated.filter(ev => !ev.review || ev.isProvisional).length;
  } else {
    pendingCount = m.evaluated.filter(ev => !ev.review && (ev.matchStatus === 'INCORRECT' || ev.matchStatus === 'ABSTAINED')).length;
  }
  document.getElementById('quickPendingVal').textContent = pendingCount;
  document.getElementById('badgeReviewCount').textContent = pendingCount;
}

// --------------------------------------------------------------------------
// Dashboard View
// --------------------------------------------------------------------------
function renderDashboard(m) {
  // Top KPI Cards
  document.getElementById('kpiAccuracyVal').textContent = `${(m.accuracyAttempted * 100).toFixed(1)}%`;
  document.getElementById('kpiAccuracySub').textContent = `${m.correctCount} of ${m.attemptedCount} attempted classifications`;

  document.getElementById('kpiHighRiskVal').textContent = m.highRiskCount;
  document.getElementById('kpiHighRiskSub').textContent = `Wrong predictions with ≥ ${Math.round(AppState.confidenceThreshold * 100)}% confidence`;

  document.getElementById('kpiMacroF1Val').textContent = m.macroF1.toFixed(3);
  document.getElementById('kpiMacroF1Sub').textContent = `Weighted F1: ${m.weightedF1.toFixed(3)} across 3 classes`;

  document.getElementById('kpiAbstentionVal').textContent = `${(m.abstentionRate * 100).toFixed(1)}%`;
  document.getElementById('kpiAbstentionSub').textContent = `${m.abstainedCount} escalated to Needs Manual Triage`;

  document.getElementById('kpiAvgConfVal').textContent = `${(m.avgConfidence * 100).toFixed(1)}%`;
  document.getElementById('kpiAvgConfSub').textContent = `Correct: ${(m.avgConfCorrect * 100).toFixed(1)}% | Wrong: ${(m.avgConfIncorrect * 100).toFixed(1)}%`;

  // Confusion Matrix
  renderConfusionMatrix(m);

  // Per-Class Metrics Table
  renderPerClassTable(m);

  // Threshold Simulator
  renderThresholdSimulator(m);

  // High-Risk Error Spotlight List
  renderHighRiskSpotlight(m);
}

function renderConfusionMatrix(m) {
  const container = document.getElementById('confusionMatrixWrap');
  if (!container) return;

  const classes = ['Bug', 'Config', 'Change Request', 'Needs Manual Triage'];

  let html = `
    <table class="confusion-table">
      <thead>
        <tr>
          <th style="text-align: left; min-width: 130px;">AI \\ Human</th>
          <th>Human Bug</th>
          <th>Human Config</th>
          <th>Human Change Req</th>
          <th>Manual Review</th>
        </tr>
      </thead>
      <tbody>
  `;

  classes.forEach(aiRow => {
    html += `<tr><td class="row-header">AI ${escapeHtml(aiRow)}</td>`;
    classes.forEach(humanCol => {
      const count = (m.matrix[aiRow] && m.matrix[aiRow][humanCol] !== undefined) ? m.matrix[aiRow][humanCol] : 0;
      const isDiagonal = aiRow === humanCol && aiRow !== 'Needs Manual Triage';
      const isAbstain = aiRow === 'Needs Manual Triage';
      const isError = !isDiagonal && !isAbstain && count > 0;

      let cellClass = 'matrix-cell';
      if (isDiagonal) cellClass += ' diagonal-correct';
      else if (isError) cellClass += ' off-diagonal-error';
      else if (isAbstain) cellClass += ' abstention-cell';

      const pct = m.totalTickets > 0 ? ((count / m.totalTickets) * 100).toFixed(1) : 0;

      html += `
        <td class="${cellClass}" onclick="filterTableByMatrix('${aiRow}', '${humanCol}')" title="Click to inspect ${count} tickets where AI predicted '${aiRow}' and Ground Truth was '${humanCol}'">
          <span class="matrix-count">${count}</span>
          <span class="matrix-pct">${pct}%</span>
        </td>
      `;
    });
    html += `</tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

function filterTableByMatrix(aiClass, gtClass) {
  AppState.tableFilters.matrixCellFilter = { aiClass, gtClass };
  AppState.tableFilters.status = 'ALL';
  AppState.activeTab = 'evaluation';
  switchTab('evaluation');
  showToast(`Filtered Evaluate for AI: "${aiClass}" vs Human: "${gtClass}"`, 'info');
}

function renderPerClassTable(m) {
  const tbody = document.getElementById('perClassMetricsBody');
  if (!tbody) return;

  let html = '';
  const classes = ['Bug', 'Config', 'Change Request'];

  classes.forEach(cls => {
    const data = m.perClassMetrics[cls];
    const prec = (data.precision * 100).toFixed(1);
    const rec = (data.recall * 100).toFixed(1);
    const f1 = (data.f1 * 100).toFixed(1);

    html += `
      <tr>
        <td><span class="badge badge-${getClassBadgeName(cls)}">${escapeHtml(cls)}</span></td>
        <td><strong>${data.support}</strong></td>
        <td>
          <div class="metric-bar-wrap">
            <span style="min-width: 42px;">${prec}%</span>
            <div class="metric-bar-bg"><div class="metric-bar-fill" style="width: ${prec}%;"></div></div>
          </div>
        </td>
        <td>
          <div class="metric-bar-wrap">
            <span style="min-width: 42px;">${rec}%</span>
            <div class="metric-bar-bg"><div class="metric-bar-fill" style="width: ${rec}%; background: var(--accent-cyan);"></div></div>
          </div>
        </td>
        <td>
          <div class="metric-bar-wrap">
            <span style="min-width: 42px; font-weight: 700; color: var(--primary-light);">${f1}%</span>
            <div class="metric-bar-bg"><div class="metric-bar-fill" style="width: ${f1}%; background: var(--status-correct);"></div></div>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function renderThresholdSimulator(m) {
  const slider = document.getElementById('thresholdSlider');
  const valBadge = document.getElementById('thresholdValBadge');
  if (slider && valBadge) {
    slider.value = Math.round(AppState.confidenceThreshold * 100);
    valBadge.textContent = `${slider.value}%`;
  }

  const impact = m.currentThresholdData;
  document.getElementById('simAutomatedVal').textContent = `${impact.automated} (${impact.automatedPct}%)`;
  document.getElementById('simManualVal').textContent = `${impact.manual} (${impact.manualPct}%)`;
  document.getElementById('simIncorrectVal').textContent = impact.autoErrors;
  document.getElementById('simErrorRateVal').textContent = `${impact.autoErrorRate}%`;
  document.getElementById('simErrorRateVal').style.color = parseFloat(impact.autoErrorRate) > 5 ? 'var(--status-incorrect)' : 'var(--status-correct)';
}

function renderHighRiskSpotlight(m) {
  const list = document.getElementById('highRiskList');
  if (!list) return;

  const highRiskTickets = m.evaluated.filter(ev => ev.isHighRiskError);

  if (highRiskTickets.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-dim); font-size: 0.85rem;">
        ✅ No high-confidence wrong answers detected above ${Math.round(AppState.confidenceThreshold * 100)}% threshold!
      </div>
    `;
    return;
  }

  let html = '';
  highRiskTickets.forEach(ev => {
    const confPct = Math.round((parseFloat(ev.aiResult.confidence) || 0) * 100);
    html += `
      <div class="high-risk-item" onclick="openTicketDetailDrawer('${ev.ticketId}')">
        <div class="high-risk-info">
          <div class="high-risk-head">
            <span class="high-risk-id">${escapeHtml(ev.ticketId)}</span>
            <span class="badge badge-high-risk">CONFIDENCE ${confPct}%</span>
          </div>
          <div class="high-risk-summary">${escapeHtml(ev.ticket['Jira Summary'] || '')}</div>
        </div>
        <div class="high-risk-mismatch">
          <span class="badge badge-${getClassBadgeName(ev.aiResult.classification)}">AI: ${escapeHtml(ev.aiResult.classification)}</span>
          <span style="color: var(--text-dim);">➔</span>
          <span class="badge badge-${getClassBadgeName(ev.groundTruthClass)}">Human: ${escapeHtml(ev.groundTruthClass)}</span>
        </div>
      </div>
    `;
  });

  list.innerHTML = html;
}

// --------------------------------------------------------------------------
// Evaluation Studio View (Full Table)
// --------------------------------------------------------------------------
function renderEvaluationTable(m) {
  const tbody = document.getElementById('evaluationTableBody');
  const countLabel = document.getElementById('tableCountLabel');
  if (!tbody) return;

  let filtered = m.evaluated.filter(ev => {
    // Search query
    if (AppState.tableFilters.search) {
      const q = AppState.tableFilters.search.toLowerCase();
      const matchId = ev.ticketId.toLowerCase().includes(q);
      const matchSummary = (ev.ticket['Jira Summary'] || '').toLowerCase().includes(q);
      const matchReason = ev.aiResult ? (ev.aiResult.reason || '').toLowerCase().includes(q) : false;
      if (!matchId && !matchSummary && !matchReason) return false;
    }

    // Status filter
    if (AppState.tableFilters.status !== 'ALL') {
      if (ev.matchStatus !== AppState.tableFilters.status) return false;
    }

    // AI Classification filter
    if (AppState.tableFilters.aiClass !== 'ALL') {
      if (!ev.aiResult || ev.aiResult.classification !== AppState.tableFilters.aiClass) return false;
    }

    // Ground Truth filter
    if (AppState.tableFilters.groundTruth !== 'ALL') {
      if (ev.groundTruthClass !== AppState.tableFilters.groundTruth) return false;
    }

    // High Risk Only filter
    if (AppState.tableFilters.highRiskOnly && !ev.isHighRiskError) return false;

    // Matrix Cell click filter
    if (AppState.tableFilters.matrixCellFilter) {
      const { aiClass, gtClass } = AppState.tableFilters.matrixCellFilter;
      const curAi = ev.aiResult ? ev.aiResult.classification : 'NO_AI';
      if (curAi !== aiClass || ev.groundTruthClass !== gtClass) return false;
    }

    return true;
  });

  countLabel.textContent = `Showing ${filtered.length} of ${m.totalTickets} tickets`;

  // Pagination slice
  const startIdx = (AppState.currentPage - 1) * AppState.pageSize;
  const pageSlice = filtered.slice(startIdx, startIdx + AppState.pageSize);

  if (pageSlice.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 3rem; color: var(--text-dim);">
          No tickets found matching the selected filter criteria.
        </td>
      </tr>
    `;
    renderPagination(filtered.length);
    return;
  }

  let html = '';
  pageSlice.forEach(ev => {
    const confPct = ev.aiResult ? `${Math.round((parseFloat(ev.aiResult.confidence) || 0) * 100)}%` : '-';
    const isProvisional = ev.isProvisional;
    const jiraUrl = ev.ticket['Ticket ID'] || `https://crelio.atlassian.net/browse/${ev.ticketId}`;

    let statusBadge = '';
    if (ev.matchStatus === 'CORRECT') {
      statusBadge = `<span class="badge badge-correct">✓ Correct</span>`;
    } else if (ev.matchStatus === 'INCORRECT') {
      statusBadge = `<span class="badge badge-incorrect">✗ Incorrect</span>`;
    } else if (ev.matchStatus === 'ABSTAINED') {
      statusBadge = `<span class="badge badge-manual">⚡ Manual Review</span>`;
    } else {
      statusBadge = `<span class="badge" style="background: rgba(255,255,255,0.08); color: var(--text-dim);">No AI</span>`;
    }

    if (ev.isHighRiskError) {
      statusBadge += ` <span class="badge badge-high-risk">HIGH RISK</span>`;
    }

    const aiBadge = ev.aiResult 
      ? `<span class="badge badge-${getClassBadgeName(ev.aiResult.classification)}">${escapeHtml(ev.aiResult.classification)}</span>`
      : `<span style="color: var(--text-dim);">-</span>`;

    const gtBadge = `<span class="badge badge-${getClassBadgeName(ev.groundTruthClass)}">${escapeHtml(ev.groundTruthClass || 'Pending')} ${isProvisional ? '(Provisional)' : ''}</span>`;

    // Response quality dots
    let qualityDots = `<span style="color: var(--text-dim);">-</span>`;
    if (ev.review) {
      qualityDots = `
        <div class="quality-dot-group" title="Reason: ${ev.review.reason_quality || 'unrated'} | Evidence: ${ev.review.evidence_quality || 'unrated'} | Action: ${ev.review.action_quality || 'unrated'}">
          <span class="quality-dot ${getDotClass(ev.review.reason_quality)}"></span>
          <span class="quality-dot ${getDotClass(ev.review.evidence_quality)}"></span>
          <span class="quality-dot ${getDotClass(ev.review.action_quality)}"></span>
        </div>
      `;
    }

    html += `
      <tr>
        <td>
          <a href="${escapeHtml(jiraUrl)}" target="_blank" class="ticket-link" title="Open in Jira">
            ${escapeHtml(ev.ticketId)} ↗
          </a>
        </td>
        <td style="max-width: 320px;">
          <div style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(ev.ticket['Jira Summary'] || '')}">
            ${escapeHtml(ev.ticket['Jira Summary'] || '')}
          </div>
          <div style="font-size: 0.725rem; color: var(--text-dim);">
            ${ev.ticket['Assignee'] ? `Assignee: ${escapeHtml(ev.ticket['Assignee'])}` : ''} 
            ${ev.ticket['Human Action Taken'] ? `| Action: ${escapeHtml(ev.ticket['Human Action Taken'])}` : ''}
          </div>
        </td>
        <td>${gtBadge}</td>
        <td>${aiBadge}</td>
        <td><strong>${confPct}</strong></td>
        <td>${statusBadge}</td>
        <td>${qualityDots}</td>
        <td style="text-align: right;">
          <button class="btn btn-secondary btn-sm" onclick="openTicketDetailDrawer('${ev.ticketId}')">
            Deep Dive
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
  renderPagination(filtered.length);
}

function renderPagination(totalCount) {
  const container = document.getElementById('tablePagination');
  if (!container) return;

  const totalPages = Math.ceil(totalCount / AppState.pageSize) || 1;
  const cur = AppState.currentPage;

  container.innerHTML = `
    <button class="btn btn-secondary btn-sm" ${cur <= 1 ? 'disabled' : ''} onclick="changePage(${cur - 1})" title="Previous page (Shortcut: Press ←)">
      ◀ Previous <span class="btn-press-hint">Press <kbd class="kbd-subtle">←</kbd></span>
    </button>
    <span style="font-size: 0.8rem; color: var(--text-muted); margin: 0 0.5rem;">
      Page ${cur} of ${totalPages}
    </span>
    <button class="btn btn-secondary btn-sm" ${cur >= totalPages ? 'disabled' : ''} onclick="changePage(${cur + 1})" title="Next page (Shortcut: Press →)">
      Next ▶ <span class="btn-press-hint">Press <kbd class="kbd-subtle">→</kbd></span>
    </button>
  `;
}

function changePage(page) {
  AppState.currentPage = page;
  const run = getActiveRun();
  if (run) {
    const metrics = computeRunMetrics(run);
    renderEvaluationTable(metrics);
  }
}

// --------------------------------------------------------------------------
// Review Queue View (Product Analyst Focus Queue)
// --------------------------------------------------------------------------
function setReviewQueueFilter(filter) {
  AppState.reviewQueueFilter = filter;
  ['pending', 'reviewed', 'all'].forEach(f => {
    const btn = document.getElementById(`btn_review_filter_${f}`);
    if (btn) btn.classList.toggle('active', f === filter);
  });
  const run = getActiveRun();
  if (run) {
    const m = computeRunMetrics(run);
    renderReviewQueue(m);
  }
}

function renderReviewQueue(m) {
  const container = document.getElementById('reviewCardsList');
  const countBadge = document.getElementById('reviewQueueCount');
  if (!container) return;

  // Compute pending vs reviewed pools
  let pendingList = [];
  let reviewedList = [];

  if (AppState.currentMode === 'CURRENT_SPRINT') {
    pendingList = m.evaluated.filter(ev => !ev.review || ev.isProvisional);
    reviewedList = m.evaluated.filter(ev => ev.review && !ev.isProvisional);
  } else {
    pendingList = m.evaluated.filter(ev => !ev.review && (ev.matchStatus === 'INCORRECT' || ev.matchStatus === 'ABSTAINED'));
    reviewedList = m.evaluated.filter(ev => ev.review && (ev.matchStatus === 'INCORRECT' || ev.matchStatus === 'ABSTAINED' || ev.review.feedback_type));
  }

  const allList = [...pendingList, ...reviewedList];

  // Update counts on filter buttons
  const elPending = document.getElementById('count_review_pending');
  const elReviewed = document.getElementById('count_review_reviewed');
  const elAll = document.getElementById('count_review_all');
  if (elPending) elPending.textContent = pendingList.length;
  if (elReviewed) elReviewed.textContent = reviewedList.length;
  if (elAll) elAll.textContent = allList.length;

  if (countBadge) countBadge.textContent = `${pendingList.length} pending`;

  const curFilter = AppState.reviewQueueFilter || 'pending';
  ['pending', 'reviewed', 'all'].forEach(f => {
    const btn = document.getElementById(`btn_review_filter_${f}`);
    if (btn) btn.classList.toggle('active', f === curFilter);
  });

  let queueTickets = pendingList;
  if (curFilter === 'reviewed') queueTickets = reviewedList;
  else if (curFilter === 'all') queueTickets = allList;

  if (queueTickets.length === 0) {
    const emptyMsg = curFilter === 'pending'
      ? 'All tickets in this dataset have been reviewed or matched expected classifications.'
      : (curFilter === 'reviewed' ? 'No tickets have been audited in this dataset yet.' : 'No tickets available in this queue.');
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border-subtle);">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
        <h3 style="color: var(--text-main); font-weight: 700; margin-bottom: 0.25rem;">
          ${curFilter === 'pending' ? 'Review Empty!' : 'No Records Found'}
        </h3>
        <p style="color: var(--text-dim); font-size: 0.85rem;">${emptyMsg}</p>
      </div>
    `;
    return;
  }

  let html = '';
  queueTickets.slice(0, 30).forEach(ev => {
    const confPct = ev.aiResult ? `${Math.round((parseFloat(ev.aiResult.confidence) || 0) * 100)}%` : '-';
    const jiraUrl = ev.ticket['Ticket ID'] || `https://crelio.atlassian.net/browse/${ev.ticketId}`;

    html += `
      <div class="review-ticket-card">
        <div class="review-card-top">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <a href="${escapeHtml(jiraUrl)}" target="_blank" class="ticket-link">${escapeHtml(ev.ticketId)} ↗</a>
              <span class="badge badge-${getClassBadgeName(ev.groundTruthClass)}">Expected: ${escapeHtml(ev.groundTruthClass)}</span>
              ${ev.isHighRiskError ? '<span class="badge badge-high-risk">HIGH RISK</span>' : ''}
            </div>
            <div class="review-card-summary">${escapeHtml(ev.ticket['Jira Summary'] || '')}</div>
          </div>
        </div>

        <div class="review-side-by-side">
          <div>
            <div class="review-col-title">AI Recommendation</div>
            <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.4rem;">
              <span class="badge badge-${getClassBadgeName(ev.aiResult ? ev.aiResult.classification : '')}">
                ${escapeHtml(ev.aiResult ? ev.aiResult.classification : 'No Result')}
              </span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Conf: <strong>${confPct}</strong></span>
            </div>
            <div style="font-size: 0.775rem; color: var(--text-muted); line-height: 1.4;">
              ${escapeHtml(ev.aiResult ? ev.aiResult.reason : 'No reasoning generated.')}
            </div>
          </div>

          <div>
            <div class="review-col-title">Jira Context & Actions</div>
            <div style="font-size: 0.75rem; color: var(--text-dim); line-height: 1.4;">
              <div><strong>Action Taken:</strong> ${escapeHtml(ev.ticket['Human Action Taken'] || 'None recorded')}</div>
              <div><strong>Assignee:</strong> ${escapeHtml(ev.ticket['Assignee'] || 'Unassigned')}</div>
              <div><strong>Priority:</strong> P${escapeHtml(ev.ticket['Priority'] || '0')}</div>
            </div>
          </div>
        </div>

        <div class="review-card-actions">
          <div style="font-size: 0.75rem; color: var(--text-dim);">
            ${ev.review ? `Status: <strong style="color: #34d399;">Reviewed</strong>` : 'Pending Decision'}
          </div>
          <div class="btn-group-fast-review">
            <button class="btn btn-success btn-sm" onclick="quickReviewDecision('${ev.ticketId}', 'Correct', '${ev.aiResult ? ev.aiResult.classification : 'Bug'}')">
              ✓ Correct
            </button>
            <button class="btn btn-danger btn-sm" onclick="openTicketDetailDrawer('${ev.ticketId}', 'override')">
              ✗ Override
            </button>
            <button class="btn btn-secondary btn-sm" onclick="quickReviewDecision('${ev.ticketId}', 'Needs Manual Triage', 'Needs Manual Triage')">
              ⚡ Escalate
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function quickReviewDecision(ticketId, decision, finalClass) {
  const run = getActiveRun();
  if (!run) return;

  const key = `${run.run_id}_${ticketId}`;
  AppState.reviews[key] = {
    ticket_id: ticketId,
    run_id: run.run_id,
    reviewer_decision: decision,
    reviewer_classification: finalClass,
    feedback_type: decision === 'Correct' ? '' : 'Wrong classification',
    reviewer_comment: `Quick reviewed as ${decision} via Review.`,
    reason_quality: decision === 'Correct' ? 'Good' : 'Needs Improvement',
    evidence_quality: decision === 'Correct' ? 'Good' : 'Needs Improvement',
    action_quality: decision === 'Correct' ? 'Good' : 'Needs Improvement',
    suggested_owner_quality: 'Good',
    reviewed_by: 'Product Analyst',
    reviewed_at: new Date().toISOString()
  };

  saveReviewsToStorage();
  refreshAllViews();
  showToast(`Recorded "${decision}" decision for ticket ${ticketId}`, 'success');
}

// --------------------------------------------------------------------------
// Ticket Detail Drawer & Full Audit Workflow
// --------------------------------------------------------------------------
function openTicketDetailDrawer(ticketId, focusTab = 'details') {
  AppState.currentDetailTicketId = ticketId;
  const run = getActiveRun();
  if (!run) return;

  const ticket = getActiveTickets().find(t => t['JIRA ID'].trim() === ticketId);
  if (!ticket) return;

  const evaluation = evaluateTicket(ticket, run);
  const aiResult = evaluation.aiResult || {};
  const review = evaluation.review || {};

  // Populate Header
  document.getElementById('drawerTicketId').textContent = ticketId;
  document.getElementById('drawerJiraLink').href = ticket['Ticket ID'] || `https://crelio.atlassian.net/browse/${ticketId}`;
  document.getElementById('drawerSummary').textContent = ticket['Jira Summary'] || 'No summary available';

  // Populate Jira Source Meta
  document.getElementById('drawerMetaPriority').textContent = `P${ticket['Priority'] || '0'}`;
  document.getElementById('drawerMetaAssignee').textContent = ticket['Assignee'] || 'Unassigned';
  document.getElementById('drawerMetaReporter').textContent = ticket['Reporter'] || 'Not specified';
  document.getElementById('drawerMetaAction').textContent = ticket['Human Action Taken'] || 'None recorded';
  document.getElementById('drawerMetaGroundTruth').textContent = evaluation.groundTruthClass || 'Pending';

  // Populate AI Result Section
  document.getElementById('drawerAiClass').textContent = aiResult.classification || 'None';
  document.getElementById('drawerAiClass').className = `badge badge-${getClassBadgeName(aiResult.classification)}`;
  document.getElementById('drawerAiConfidence').textContent = `${Math.round((parseFloat(aiResult.confidence) || 0) * 100)}%`;
  document.getElementById('drawerAiReason').textContent = aiResult.reason || 'No reasoning provided';
  document.getElementById('drawerAiEvidence').textContent = aiResult.evidence || 'No specific evidence lines provided';
  document.getElementById('drawerAiAction').textContent = aiResult.recommended_action || 'No recommended action specified';
  document.getElementById('drawerAiOwner').textContent = aiResult.suggested_owner || 'Engineering';
  document.getElementById('drawerAiHumanReview').textContent = aiResult.human_review || 'Not Required';

  // Form Population
  document.getElementById('reviewDecisionSelect').value = review.reviewer_decision || 'Correct';
  document.getElementById('correctClassSelect').value = review.reviewer_classification || aiResult.classification || 'Bug';
  document.getElementById('feedbackTypeSelect').value = review.feedback_type || '';
  document.getElementById('reviewerComment').value = review.reviewer_comment || '';

  document.getElementById('ratingReason').value = review.reason_quality || 'Good';
  document.getElementById('ratingEvidence').value = review.evidence_quality || 'Good';
  document.getElementById('ratingAction').value = review.action_quality || 'Good';
  document.getElementById('ratingOwner').value = review.suggested_owner_quality || 'Good';

  // Display Drawer
  const drawer = document.getElementById('ticketDetailDrawer');
  drawer.classList.add('active');
}

function closeTicketDetailDrawer() {
  const drawer = document.getElementById('ticketDetailDrawer');
  drawer.classList.remove('active');
  AppState.currentDetailTicketId = null;
}

function saveTicketReviewForm() {
  const ticketId = AppState.currentDetailTicketId;
  const run = getActiveRun();
  if (!ticketId || !run) return;

  const decision = document.getElementById('reviewDecisionSelect').value;
  const finalClass = document.getElementById('correctClassSelect').value;
  const feedbackType = document.getElementById('feedbackTypeSelect').value;
  const comment = document.getElementById('reviewerComment').value;

  const reasonQ = document.getElementById('ratingReason').value;
  const evidenceQ = document.getElementById('ratingEvidence').value;
  const actionQ = document.getElementById('ratingAction').value;
  const ownerQ = document.getElementById('ratingOwner').value;

  if (decision === 'Incorrect' && !feedbackType) {
    showToast('Please select a Feedback Type when marking an incorrect classification', 'error');
    return;
  }

  const key = `${run.run_id}_${ticketId}`;
  AppState.reviews[key] = {
    ticket_id: ticketId,
    run_id: run.run_id,
    reviewer_decision: decision,
    reviewer_classification: finalClass,
    feedback_type: feedbackType,
    reviewer_comment: comment,
    reason_quality: reasonQ,
    evidence_quality: evidenceQ,
    action_quality: actionQ,
    suggested_owner_quality: ownerQ,
    reviewed_by: 'Product Analyst',
    reviewed_at: new Date().toISOString()
  };

  saveReviewsToStorage();
  closeTicketDetailDrawer();
  refreshAllViews();
  showToast(`Evaluation for ${ticketId} saved successfully!`, 'success');
}

// --------------------------------------------------------------------------
// Model Comparison View
// --------------------------------------------------------------------------
function renderModelComparison() {
  const selectA = document.getElementById('compareSelectA');
  const selectB = document.getElementById('compareSelectB');
  if (!selectA || !selectB) return;

  let htmlOptions = '';
  AppState.runs.forEach(r => {
    htmlOptions += `<option value="${r.run_id}">[${r.dataset_target}] ${escapeHtml(r.model_name)} - ${escapeHtml(r.prompt_version)}</option>`;
  });

  selectA.innerHTML = htmlOptions;
  selectB.innerHTML = htmlOptions;

  selectA.value = AppState.compareRunAId;
  selectB.value = AppState.compareRunBId;

  const runA = AppState.runs.find(r => r.run_id === AppState.compareRunAId) || AppState.runs[0];
  const runB = AppState.runs.find(r => r.run_id === AppState.compareRunBId) || (AppState.runs[1] || AppState.runs[0]);

  if (!runA || !runB) return;

  const mA = computeRunMetrics(runA);
  const mB = computeRunMetrics(runB);

  // Render comparative table
  const tbody = document.getElementById('compareTableBody');
  if (!tbody) return;

  const rows = [
    { name: 'Target Dataset', valA: runA.dataset_target, valB: runB.dataset_target, format: 'text' },
    { name: 'Accuracy (Attempted)', valA: (mA.accuracyAttempted * 100), valB: (mB.accuracyAttempted * 100), format: 'pct', higherIsBetter: true },
    { name: 'Overall Accuracy', valA: (mA.accuracyOverall * 100), valB: (mB.accuracyOverall * 100), format: 'pct', higherIsBetter: true },
    { name: 'Macro F1-Score', valA: mA.macroF1, valB: mB.macroF1, format: 'decimal', higherIsBetter: true },
    { name: 'Bug F1-Score', valA: mA.perClassMetrics['Bug'].f1, valB: mB.perClassMetrics['Bug'].f1, format: 'decimal', higherIsBetter: true },
    { name: 'Config F1-Score', valA: mA.perClassMetrics['Config'].f1, valB: mB.perClassMetrics['Config'].f1, format: 'decimal', higherIsBetter: true },
    { name: 'Change Request F1-Score', valA: mA.perClassMetrics['Change Request'].f1, valB: mB.perClassMetrics['Change Request'].f1, format: 'decimal', higherIsBetter: true },
    { name: 'High-Confidence Errors', valA: mA.highRiskCount, valB: mB.highRiskCount, format: 'int', higherIsBetter: false },
    { name: 'Abstention / Manual Rate', valA: (mA.abstentionRate * 100), valB: (mB.abstentionRate * 100), format: 'pct', neutral: true },
    { name: 'Average Confidence', valA: (mA.avgConfidence * 100), valB: (mB.avgConfidence * 100), format: 'pct', neutral: true }
  ];

  let tableHtml = '';
  rows.forEach(r => {
    let deltaHtml = '';
    if (r.format !== 'text') {
      const diff = r.valB - r.valA;
      if (Math.abs(diff) > 0.0001) {
        let isPositive = r.higherIsBetter !== undefined ? (r.higherIsBetter ? diff > 0 : diff < 0) : true;
        let sign = diff > 0 ? '+' : '';
        let diffStr = r.format === 'pct' ? `${sign}${diff.toFixed(1)}%` : `${sign}${diff.toFixed(3)}`;
        deltaHtml = `<span class="delta-pill ${isPositive ? 'positive' : 'negative'}">${diffStr}</span>`;
      } else {
        deltaHtml = `<span style="color: var(--text-dim);">-</span>`;
      }
    }

    const displayA = r.format === 'pct' ? `${r.valA.toFixed(1)}%` : (r.format === 'decimal' ? r.valA.toFixed(3) : r.valA);
    const displayB = r.format === 'pct' ? `${r.valB.toFixed(1)}%` : (r.format === 'decimal' ? r.valB.toFixed(3) : r.valB);

    tableHtml += `
      <tr>
        <td style="font-weight: 600;">${r.name}</td>
        <td><strong>${displayA}</strong></td>
        <td><strong>${displayB}</strong></td>
        <td>${deltaHtml}</td>
      </tr>
    `;
  });

  tbody.innerHTML = tableHtml;

  // Render Shift Analysis (Fixed vs Regressed tickets)
  renderShiftAnalysis(mA, mB);
}

function renderShiftAnalysis(mA, mB) {
  const container = document.getElementById('shiftAnalysisWrap');
  if (!container) return;

  const tickets = mA.evaluated;
  let fixedTickets = [];
  let regressedTickets = [];

  tickets.forEach(evA => {
    const evB = mB.evaluated.find(e => e.ticketId === evA.ticketId);
    if (!evB) return;

    if (evA.matchStatus === 'INCORRECT' && evB.matchStatus === 'CORRECT') {
      fixedTickets.push({ id: evA.ticketId, summary: evA.ticket['Jira Summary'], oldAi: evA.aiResult.classification, newAi: evB.aiResult.classification, gt: evA.groundTruthClass });
    } else if (evA.matchStatus === 'CORRECT' && evB.matchStatus === 'INCORRECT') {
      regressedTickets.push({ id: evA.ticketId, summary: evA.ticket['Jira Summary'], oldAi: evA.aiResult.classification, newAi: evB.aiResult.classification, gt: evA.groundTruthClass });
    }
  });

  let html = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div class="content-card">
        <div class="card-title-group" style="margin-bottom: 0.75rem;">
          <span class="badge badge-correct">✓ Fixed in Run B (${fixedTickets.length})</span>
        </div>
        <div style="max-height: 250px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem;">
          ${fixedTickets.length === 0 ? '<p style="color: var(--text-dim); font-size: 0.8rem;">No tickets fixed.</p>' : ''}
          ${fixedTickets.map(t => `
            <div style="background: var(--bg-surface); padding: 0.6rem; border-radius: 6px; font-size: 0.8rem; border-left: 3px solid #34d399;">
              <strong style="color: var(--accent-cyan);">${escapeHtml(t.id)}</strong>: ${escapeHtml(t.summary)}<br>
              <span style="font-size: 0.725rem; color: var(--text-dim);">Changed from wrong '${t.oldAi}' to correct '${t.newAi}' (Human: ${t.gt})</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="content-card">
        <div class="card-title-group" style="margin-bottom: 0.75rem;">
          <span class="badge badge-incorrect">✗ Regressed in Run B (${regressedTickets.length})</span>
        </div>
        <div style="max-height: 250px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem;">
          ${regressedTickets.length === 0 ? '<p style="color: var(--text-dim); font-size: 0.8rem;">No regressions detected.</p>' : ''}
          ${regressedTickets.map(t => `
            <div style="background: var(--bg-surface); padding: 0.6rem; border-radius: 6px; font-size: 0.8rem; border-left: 3px solid #f87171;">
              <strong style="color: var(--accent-cyan);">${escapeHtml(t.id)}</strong>: ${escapeHtml(t.summary)}<br>
              <span style="font-size: 0.725rem; color: var(--text-dim);">Regressed from correct '${t.oldAi}' to '${t.newAi}' (Human: ${t.gt})</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// --------------------------------------------------------------------------
// Feedback & Pattern Analysis View
// --------------------------------------------------------------------------
function renderFeedbackAnalysis(m) {
  // 1. Error Types Distribution
  const errorTypeContainer = document.getElementById('errorTypesChart');
  if (errorTypeContainer) {
    const errorCounts = {};
    Object.values(AppState.reviews).forEach(rev => {
      if (rev.feedback_type) {
        errorCounts[rev.feedback_type] = (errorCounts[rev.feedback_type] || 0) + 1;
      }
    });

    const entries = Object.entries(errorCounts).sort((a, b) => b[1] - a[1]);
    const maxVal = entries.length > 0 ? entries[0][1] : 1;

    let html = '';
    if (entries.length === 0) {
      html = `<p style="color: var(--text-dim); font-size: 0.85rem; padding: 1rem;">No feedback errors captured yet. Review tickets to populate failure patterns.</p>`;
    } else {
      entries.forEach(([errType, count]) => {
        const pct = Math.round((count / maxVal) * 100);
        html += `
          <div class="bar-chart-row">
            <div class="bar-chart-label" title="${escapeHtml(errType)}">${escapeHtml(errType)}</div>
            <div class="bar-chart-track">
              <div class="bar-chart-fill" style="width: ${pct}%;"></div>
            </div>
            <div class="bar-chart-val">${count}</div>
          </div>
        `;
      });
    }
    errorTypeContainer.innerHTML = html;
  }

  // 2. Confused Pairs (e.g. Config predicted as Bug)
  const confusedPairsContainer = document.getElementById('confusedPairsChart');
  if (confusedPairsContainer) {
    const pairs = [];
    const classes = ['Bug', 'Config', 'Change Request'];
    classes.forEach(r => {
      classes.forEach(c => {
        if (r !== c) {
          const count = (m.matrix[r] && m.matrix[r][c]) ? m.matrix[r][c] : 0;
          if (count > 0) {
            pairs.push({ label: `AI '${r}' ➔ Human '${c}'`, count });
          }
        }
      });
    });

    pairs.sort((a, b) => b.count - a.count);
    const maxPair = pairs.length > 0 ? pairs[0].count : 1;

    let pairHtml = '';
    if (pairs.length === 0) {
      pairHtml = `<p style="color: var(--text-dim); font-size: 0.85rem; padding: 1rem;">Zero confusion pairs! All attempted classifications are aligned.</p>`;
    } else {
      pairs.forEach(p => {
        const pct = Math.round((p.count / maxPair) * 100);
        pairHtml += `
          <div class="bar-chart-row">
            <div class="bar-chart-label" style="width: 240px;" title="${escapeHtml(p.label)}">${escapeHtml(p.label)}</div>
            <div class="bar-chart-track">
              <div class="bar-chart-fill" style="width: ${pct}%; background: linear-gradient(90deg, #f43f5e, #fb923c);"></div>
            </div>
            <div class="bar-chart-val">${p.count}</div>
          </div>
        `;
      });
    }
    confusedPairsContainer.innerHTML = pairHtml;
  }

  // 3. Response Quality Matrix Breakdown
  renderQualityScorecard();
}

function renderQualityScorecard() {
  const container = document.getElementById('qualityScorecardWrap');
  if (!container) return;

  const reviews = Object.values(AppState.reviews);
  const total = reviews.length || 1;

  function countRating(field, rating) {
    return reviews.filter(r => r[field] === rating).length;
  }

  const components = [
    { name: 'AI Reasoning Quality', field: 'reason_quality' },
    { name: 'Evidence & Signals Quality', field: 'evidence_quality' },
    { name: 'Recommended Next Action', field: 'action_quality' },
    { name: 'Suggested Team / Owner', field: 'suggested_owner_quality' }
  ];

  let html = `
    <table class="class-metrics-table">
      <thead>
        <tr>
          <th>Triage Component</th>
          <th>Good</th>
          <th>Needs Improvement</th>
          <th>Incorrect / Bad</th>
        </tr>
      </thead>
      <tbody>
  `;

  components.forEach(c => {
    const good = countRating(c.field, 'Good');
    const imp = countRating(c.field, 'Needs Improvement');
    const bad = countRating(c.field, 'Incorrect');

    html += `
      <tr>
        <td style="font-weight: 600;">${c.name}</td>
        <td><span style="color: #34d399; font-weight: 700;">${good}</span> <small style="color: var(--text-dim);">(${Math.round(good/total*100)}%)</small></td>
        <td><span style="color: #fbbf24; font-weight: 700;">${imp}</span> <small style="color: var(--text-dim);">(${Math.round(imp/total*100)}%)</small></td>
        <td><span style="color: #f87171; font-weight: 700;">${bad}</span> <small style="color: var(--text-dim);">(${Math.round(bad/total*100)}%)</small></td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

// ==========================================================================
// 4. Ingest & Import Engine (CSV / JSON + Smart Column Mapping)
// ==========================================================================

const IngestEngine = {
  rawRows: [],
  headers: [],

  detectColumnMapping(headers) {
    const mapping = {
      ticket_id: '',
      classification: '',
      confidence: '',
      reason: '',
      evidence: '',
      recommended_action: '',
      suggested_owner: '',
      human_review: ''
    };

    const syns = {
      ticket_id: ['ticket id', 'jira id', 'issue id', 'key', 'id'],
      classification: ['ai classification', 'classification', 'predicted classification', 'predicted class', 'bot action', 'class'],
      confidence: ['ai confidence', 'confidence', 'score', 'probability'],
      reason: ['ai reason', 'reason', 'rationale', 'explanation'],
      evidence: ['ai evidence', 'evidence', 'signals', 'proof'],
      recommended_action: ['ai recommended action', 'recommended action', 'next action', 'action'],
      suggested_owner: ['ai suggested team/owner', 'suggested team/owner', 'suggested owner', 'team', 'owner'],
      human_review: ['ai human review', 'human review', 'review required']
    };

    headers.forEach(h => {
      const lower = h.toLowerCase().trim();
      Object.keys(syns).forEach(k => {
        if (!mapping[k] && syns[k].some(s => lower.includes(s))) {
          mapping[k] = h;
        }
      });
    });

    return mapping;
  },

  parseCSV(text) {
    const lines = [];
    let row = [''];
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          row[row.length - 1] += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push('');
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && next === '\n') i++;
        if (row.length > 1 || row[0] !== '') {
          lines.push(row);
        }
        row = [''];
      } else {
        row[row.length - 1] += char;
      }
    }
    if (row.length > 1 || row[0] !== '') lines.push(row);
    return lines;
  },

  validateAndTransform(rows, mapping, targetDataset) {
    const validClasses = ['Bug', 'Config', 'Change Request', 'Needs Manual Triage'];
    const validTickets = (targetDataset === 'HISTORICAL' ? AppState.historicalTickets : AppState.sprintTickets)
      .map(t => t['JIRA ID'].trim());

    const results = [];
    const errors = [];
    const seenIds = new Set();

    rows.forEach((r, idx) => {
      const rowNum = idx + 2; // Accounting for 1-based header
      const rawId = (r[mapping.ticket_id] || '').trim();

      if (!rawId) {
        errors.push(`Row ${rowNum}: Missing Ticket ID.`);
        return;
      }

      if (seenIds.has(rawId)) {
        errors.push(`Row ${rowNum}: Duplicate Ticket ID '${rawId}'.`);
        return;
      }
      seenIds.add(rawId);

      // Verify ID belongs to chosen dataset
      if (!validTickets.includes(rawId)) {
        errors.push(`Row ${rowNum}: Ticket ID '${rawId}' was not found in the ${targetDataset} dataset.`);
        return;
      }

      // Classification validation
      let rawClass = (r[mapping.classification] || '').trim();
      const matchedClass = validClasses.find(c => c.toLowerCase() === rawClass.toLowerCase());
      if (!matchedClass) {
        errors.push(`Row ${rowNum} (${rawId}): Invalid classification '${rawClass}'. Must be Bug, Config, Change Request, or Needs Manual Triage.`);
        return;
      }

      // Confidence validation & normalization
      let rawConf = (r[mapping.confidence] || '0').toString().replace('%', '').trim();
      let conf = parseFloat(rawConf);
      if (isNaN(conf)) {
        errors.push(`Row ${rowNum} (${rawId}): Invalid confidence value '${rawConf}'.`);
        return;
      }
      if (conf > 1.0) conf = conf / 100.0;
      if (conf < 0 || conf > 1.0) {
        errors.push(`Row ${rowNum} (${rawId}): Confidence out of range 0.0 - 1.0.`);
        return;
      }

      results.push({
        ticket_id: rawId,
        classification: matchedClass,
        confidence: Math.round(conf * 100) / 100,
        reason: r[mapping.reason] || '',
        evidence: r[mapping.evidence] || '',
        recommended_action: r[mapping.recommended_action] || '',
        suggested_owner: r[mapping.suggested_owner] || 'Engineering',
        human_review: r[mapping.human_review] || (conf < 0.7 ? 'Required' : 'Not Required')
      });
    });

    return { results, errors };
  }
};

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    processRawImportText(e.target.result);
  };
  reader.readAsText(file);
}

function processRawImportText(text) {
  text = text.trim();
  let headers = [];
  let rows = [];

  if (text.startsWith('[') || text.startsWith('{')) {
    // JSON Import
    try {
      const parsed = JSON.parse(text);
      rows = Array.isArray(parsed) ? parsed : (parsed.results || []);
      if (rows.length > 0) {
        headers = Object.keys(rows[0]);
      }
    } catch (e) {
      showToast('Invalid JSON file format', 'error');
      return;
    }
  } else {
    // CSV Import
    const parsedLines = IngestEngine.parseCSV(text);
    if (parsedLines.length < 2) {
      showToast('CSV must contain a header row and at least one data row', 'error');
      return;
    }
    headers = parsedLines[0].map(h => h.trim());
    rows = parsedLines.slice(1).map(r => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = r[i] || '');
      return obj;
    });
  }

  IngestEngine.rawRows = rows;
  IngestEngine.headers = headers;

  renderColumnMapper(headers);
  showToast(`Loaded ${rows.length} records. Please verify column mapping below.`, 'info');
}

function renderColumnMapper(headers) {
  const mapping = IngestEngine.detectColumnMapping(headers);
  const container = document.getElementById('columnMappingContainer');
  if (!container) return;

  const fields = [
    { key: 'ticket_id', label: 'Ticket / Jira ID (Required)', required: true },
    { key: 'classification', label: 'AI Classification (Required)', required: true },
    { key: 'confidence', label: 'Confidence Score (Required)', required: true },
    { key: 'reason', label: 'Reasoning Text', required: false },
    { key: 'evidence', label: 'Evidence Lines', required: false },
    { key: 'recommended_action', label: 'Recommended Action', required: false },
    { key: 'suggested_owner', label: 'Suggested Team / Owner', required: false },
    { key: 'human_review', label: 'Human Review Flag', required: false }
  ];

  let html = `
    <h4 style="margin-bottom: 0.5rem; color: var(--text-main);">Confirm Column Mapping</h4>
    <table class="mapping-table">
      <tbody>
  `;

  fields.forEach(f => {
    html += `
      <tr>
        <td style="width: 220px; font-weight: 600;">${f.label}</td>
        <td>
          <select class="filter-select" id="map_${f.key}">
            <option value="">-- None / Skip --</option>
            ${headers.map(h => `<option value="${escapeHtml(h)}" ${mapping[f.key] === h ? 'selected' : ''}>${escapeHtml(h)}</option>`).join('')}
          </select>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
  document.getElementById('importConfirmBtn').disabled = false;
}

function executeImport() {
  const targetDataset = document.getElementById('importTargetDataset').value;
  const modelName = document.getElementById('importModelName').value.trim() || 'Custom Model';
  const promptVer = document.getElementById('importPromptVersion').value.trim() || 'v1.0';
  const description = document.getElementById('importDescription').value.trim() || 'User uploaded evaluation run';

  const mapping = {
    ticket_id: document.getElementById('map_ticket_id').value,
    classification: document.getElementById('map_classification').value,
    confidence: document.getElementById('map_confidence').value,
    reason: document.getElementById('map_reason').value,
    evidence: document.getElementById('map_evidence').value,
    recommended_action: document.getElementById('map_recommended_action').value,
    suggested_owner: document.getElementById('map_suggested_owner').value,
    human_review: document.getElementById('map_human_review').value
  };

  if (!mapping.ticket_id || !mapping.classification || !mapping.confidence) {
    showToast('Ticket ID, AI Classification, and Confidence columns must be mapped.', 'error');
    return;
  }

  const { results, errors } = IngestEngine.validateAndTransform(IngestEngine.rawRows, mapping, targetDataset);

  if (errors.length > 0) {
    const errorBox = document.getElementById('importValidationErrors');
    errorBox.style.display = 'block';
    errorBox.innerHTML = `
      <strong style="color: #f87171;">Validation failed (${errors.length} errors found):</strong>
      <ul style="margin-top: 0.5rem; max-height: 150px; overflow-y: auto; padding-left: 1.25rem;">
        ${errors.slice(0, 10).map(e => `<li>${escapeHtml(e)}</li>`).join('')}
        ${errors.length > 10 ? `<li>... and ${errors.length - 10} more errors</li>` : ''}
      </ul>
    `;
    showToast(`Validation failed with ${errors.length} errors. Please fix before importing.`, 'error');
    return;
  }

  // Create new ModelRun
  const newRunId = `run_${Date.now()}`;
  const newRun = {
    run_id: newRunId,
    model_name: modelName,
    prompt_version: promptVer,
    dataset_target: targetDataset,
    created_at: new Date().toISOString(),
    description,
    results
  };

  AppState.runs.push(newRun);
  AppState.currentRunId = newRunId;
  AppState.currentMode = targetDataset;
  saveRunsToStorage();

  switchMode(targetDataset);
  switchTab('dashboard');
  showToast(`Successfully imported run "${modelName} (${promptVer})" with ${results.length} tickets!`, 'success');
}

// ==========================================================================
// 4B. Dataset Append Engine (CSV & Excel for Historical Baseline & Current Sprint)
// ==========================================================================

function updateDatasetModeBadges() {
  const histLen = AppState.historicalTickets ? AppState.historicalTickets.length : 0;
  const sprintLen = AppState.sprintTickets ? AppState.sprintTickets.length : 0;


  const statsHist = document.getElementById('statsHistCount');
  if (statsHist) statsHist.textContent = histLen;
  const statsSprint = document.getElementById('statsSprintCount');
  if (statsSprint) statsSprint.textContent = sprintLen;

  // Sync dropdown options
  const optImportHist = document.querySelector('#importTargetDataset option[value="HISTORICAL"]');
  if (optImportHist) optImportHist.textContent = `Historical Baseline (${histLen} Tickets)`;
  const optImportSprint = document.querySelector('#importTargetDataset option[value="CURRENT_SPRINT"]');
  if (optImportSprint) optImportSprint.textContent = `Next Sprint (${sprintLen} Tickets)`;

  const optAppendHist = document.querySelector('#appendTargetDataset option[value="HISTORICAL"]');
  if (optAppendHist) optAppendHist.textContent = 'Historical Baseline';
  const optAppendSprint = document.querySelector('#appendTargetDataset option[value="CURRENT_SPRINT"]');
  if (optAppendSprint) optAppendSprint.textContent = 'Next Sprint';
}

const DatasetIngestEngine = {
  rawRows: [],
  headers: [],
  fileName: '',

  detectColumnMapping(headers) {
    const mapping = {
      jira_id: '',
      summary: '',
      classification: '',
      human_action: '',
      priority: '',
      assignee: '',
      reporter: '',
      ticket_url: ''
    };

    const syns = {
      jira_id: ['jira id', 'ticket id', 'issue id', 'issue key', 'key', 'id'],
      summary: ['jira summary', 'summary', 'issue title', 'title', 'description', 'issue'],
      classification: ['classification', 'human classification', 'ground truth', 'expected classification', 'class', 'type'],
      human_action: ['human action taken', 'human action', 'action taken', 'resolution', 'developer action', 'action'],
      priority: ['priority', 'severity', 'sev', 'level'],
      assignee: ['assignee', 'assigned to', 'developer', 'owner'],
      reporter: ['reporter', 'reported by', 'author', 'creator'],
      ticket_url: ['ticket url', 'url', 'jira link', 'link', 'web link']
    };

    headers.forEach(h => {
      const lower = h.toLowerCase().trim();
      Object.keys(syns).forEach(k => {
        if (!mapping[k] && syns[k].some(s => lower === s || lower.includes(s))) {
          mapping[k] = h;
        }
      });
    });

    return mapping;
  }
};

function switchImportType(type) {
  const btnModel = document.getElementById('btn_import_type_model');
  const btnDataset = document.getElementById('btn_import_type_dataset');
  const containerModel = document.getElementById('importContainer_model');
  const containerDataset = document.getElementById('importContainer_dataset');

  if (type === 'dataset') {
    if (btnModel) { btnModel.className = 'btn btn-secondary btn-sm'; }
    if (btnDataset) { btnDataset.className = 'btn btn-primary btn-sm'; }
    if (containerModel) containerModel.classList.add('hidden');
    if (containerDataset) containerDataset.classList.remove('hidden');
  } else {
    if (btnModel) { btnModel.className = 'btn btn-primary btn-sm'; }
    if (btnDataset) { btnDataset.className = 'btn btn-secondary btn-sm'; }
    if (containerModel) containerModel.classList.remove('hidden');
    if (containerDataset) containerDataset.classList.add('hidden');
  }
}

function openDatasetAppendView(dataset) {
  switchTab('import');
  switchImportType('dataset');
  if (dataset) {
    const sel = document.getElementById('appendTargetDataset');
    if (sel) sel.value = dataset;
  }
  const el = document.getElementById('importContainer_dataset');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function onAppendTargetDatasetChange() {
  if (DatasetIngestEngine.headers && DatasetIngestEngine.headers.length > 0) {
    renderDatasetColumnMapper(DatasetIngestEngine.headers, DatasetIngestEngine.rawRows, DatasetIngestEngine.fileName);
  }
}

function handleDatasetFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileName = file.name;
  const lowerName = fileName.toLowerCase();
  const isExcel = lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls');

  const titleEl = document.getElementById('datasetDropzoneTitle');
  const subEl = document.getElementById('datasetDropzoneSub');
  if (titleEl) titleEl.textContent = `Loaded: ${fileName}`;
  if (subEl) subEl.textContent = `${(file.size / 1024).toFixed(1)} KB | Processing rows...`;

  if (isExcel) {
    if (typeof XLSX === 'undefined') {
      showToast('Excel parser library loading, please try again or use CSV.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawJson = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (!rawJson || rawJson.length === 0) {
          showToast('Excel sheet contains no data rows.', 'error');
          return;
        }

        const headers = Object.keys(rawJson[0]);
        processDatasetRawRows(headers, rawJson, fileName);
      } catch (err) {
        showToast('Error reading Excel workbook: ' + err.message, 'error');
      }
    };
    reader.readAsArrayBuffer(file);
  } else {
    // CSV
    const reader = new FileReader();
    reader.onload = function(e) {
      const text = e.target.result;
      const parsedLines = IngestEngine.parseCSV(text);
      if (parsedLines.length < 2) {
        showToast('CSV must contain a header row and at least one data row', 'error');
        return;
      }
      const headers = parsedLines[0].map(h => h.trim());
      const rows = parsedLines.slice(1).map(r => {
        const obj = {};
        headers.forEach((h, i) => obj[h] = r[i] || '');
        return obj;
      });
      processDatasetRawRows(headers, rows, fileName);
    };
    reader.readAsText(file);
  }
}

function processDatasetRawRows(headers, rows, fileName) {
  DatasetIngestEngine.rawRows = rows;
  DatasetIngestEngine.headers = headers;
  DatasetIngestEngine.fileName = fileName;

  renderDatasetColumnMapper(headers, rows, fileName);
  showToast(`Parsed ${rows.length} tickets from ${fileName}. Please verify column mappings.`, 'info');
}

function renderDatasetColumnMapper(headers, rows, fileName) {
  const mapping = DatasetIngestEngine.detectColumnMapping(headers);
  const container = document.getElementById('datasetColumnMappingContainer');
  if (!container) return;

  const targetDataset = document.getElementById('appendTargetDataset')?.value || 'HISTORICAL';
  const isHistorical = targetDataset === 'HISTORICAL';

  const fields = [
    { key: 'jira_id', label: 'JIRA ID / Key (Required)', required: true },
    { key: 'summary', label: 'Jira Summary / Title (Required)', required: true },
    { key: 'classification', label: `Classification (Bug/Config/CR) ${isHistorical ? '(Required)' : '(Optional)'}`, required: isHistorical },
    { key: 'human_action', label: 'Human Action Taken / Resolution', required: false },
    { key: 'priority', label: 'Priority / Severity', required: false },
    { key: 'assignee', label: 'Assignee', required: false },
    { key: 'reporter', label: 'Reporter', required: false },
    { key: 'ticket_url', label: 'Ticket Link / URL (Auto-generated if empty)', required: false }
  ];

  let html = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
      <h4 style="color: var(--text-main); margin: 0;">Confirm Column Mapping (${rows.length} rows)</h4>
      <span style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700;">Target: ${isHistorical ? 'Historical Baseline' : 'Next Sprint'}</span>
    </div>
    <table class="mapping-table">
      <tbody>
  `;

  fields.forEach(f => {
    html += `
      <tr>
        <td style="width: 250px; font-weight: 600;">
          ${f.label} ${f.required ? '<span style="color: #f87171;">*</span>' : ''}
        </td>
        <td>
          <select class="filter-select" id="dsmap_${f.key}">
            <option value="">-- None / Skip --</option>
            ${headers.map(h => `<option value="${escapeHtml(h)}" ${mapping[f.key] === h ? 'selected' : ''}>${escapeHtml(h)}</option>`).join('')}
          </select>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;

  const confirmBtn = document.getElementById('datasetConfirmBtn');
  if (confirmBtn) confirmBtn.disabled = false;

  const preview = document.getElementById('datasetImportPreview');
  if (preview) {
    preview.innerHTML = `
      <div style="background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 8px; padding: 0.75rem; font-size: 0.8rem; color: var(--text-muted);">
        ℹ️ Ready to append: <strong>${escapeHtml(fileName)}</strong> (${rows.length} incoming rows). Click "Validate & Append Tickets" to add to <strong>${isHistorical ? 'Historical Baseline' : 'Next Sprint'}</strong>.
      </div>
    `;
  }
}

function executeDatasetAppend() {
  const targetDataset = document.getElementById('appendTargetDataset').value;
  const duplicateStrategy = document.getElementById('appendDuplicateStrategy').value;

  const mapping = {
    jira_id: document.getElementById('dsmap_jira_id')?.value,
    summary: document.getElementById('dsmap_summary')?.value,
    classification: document.getElementById('dsmap_classification')?.value,
    human_action: document.getElementById('dsmap_human_action')?.value,
    priority: document.getElementById('dsmap_priority')?.value,
    assignee: document.getElementById('dsmap_assignee')?.value,
    reporter: document.getElementById('dsmap_reporter')?.value,
    ticket_url: document.getElementById('dsmap_ticket_url')?.value
  };

  if (!mapping.jira_id || !mapping.summary) {
    showToast('JIRA ID and Jira Summary columns must be mapped.', 'error');
    return;
  }

  if (targetDataset === 'HISTORICAL' && !mapping.classification) {
    showToast('Classification (Bug / Config / Change Request) is required for Historical Baseline.', 'error');
    return;
  }

  const rawRows = DatasetIngestEngine.rawRows || [];
  const errors = [];
  const validTickets = [];
  const validClasses = ['Bug', 'Config', 'Change Request'];

  rawRows.forEach((r, idx) => {
    const rowNum = idx + 2;
    const jiraId = (r[mapping.jira_id] || '').trim();
    const summary = (r[mapping.summary] || '').trim();

    if (!jiraId) {
      errors.push(`Row ${rowNum}: Missing JIRA ID.`);
      return;
    }
    if (!summary) {
      errors.push(`Row ${rowNum} (${jiraId}): Missing Jira Summary.`);
      return;
    }

    let cls = (mapping.classification && r[mapping.classification] ? r[mapping.classification] : '').trim();
    if (targetDataset === 'HISTORICAL') {
      const matched = validClasses.find(c => c.toLowerCase() === cls.toLowerCase());
      if (!matched) {
        errors.push(`Row ${rowNum} (${jiraId}): Invalid classification '${cls}'. Must be Bug, Config, or Change Request.`);
        return;
      }
      cls = matched;
    } else {
      const matched = validClasses.find(c => c.toLowerCase() === cls.toLowerCase());
      cls = matched || (cls || 'Bug');
    }

    const ticketUrl = (mapping.ticket_url && r[mapping.ticket_url]) 
      ? r[mapping.ticket_url].trim() 
      : `https://crelio.atlassian.net/browse/${jiraId}`;

    validTickets.push({
      "JIRA ID": jiraId,
      "Ticket ID": ticketUrl,
      "Jira Summary": summary,
      "Classification": cls,
      "Human Action Taken": (mapping.human_action && r[mapping.human_action]) ? r[mapping.human_action].trim() : '',
      "Last Comments": '',
      "Verification Description": '',
      "Bot Action": '',
      "Assignee": (mapping.assignee && r[mapping.assignee]) ? r[mapping.assignee].trim() : '',
      "Reporter": (mapping.reporter && r[mapping.reporter]) ? r[mapping.reporter].trim() : '',
      "Priority": (mapping.priority && r[mapping.priority]) ? r[mapping.priority].trim() : '1'
    });
  });

  const errorBox = document.getElementById('datasetValidationErrors');
  if (errors.length > 0) {
    if (errorBox) {
      errorBox.style.display = 'block';
      errorBox.innerHTML = `
        <strong style="color: #f87171;">Validation failed (${errors.length} errors found):</strong>
        <ul style="margin-top: 0.5rem; max-height: 150px; overflow-y: auto; padding-left: 1.25rem;">
          ${errors.slice(0, 10).map(e => `<li>${escapeHtml(e)}</li>`).join('')}
          ${errors.length > 10 ? `<li>... and ${errors.length - 10} more errors</li>` : ''}
        </ul>
      `;
    }
    showToast(`Validation failed with ${errors.length} errors. Please check the error list.`, 'error');
    return;
  }

  if (errorBox) errorBox.style.display = 'none';

  let targetArray = targetDataset === 'HISTORICAL' ? AppState.historicalTickets : AppState.sprintTickets;
  let addedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  validTickets.forEach(newT => {
    const existingIdx = targetArray.findIndex(t => t['JIRA ID'].trim() === newT['JIRA ID'].trim());
    if (existingIdx !== -1) {
      if (duplicateStrategy === 'update') {
        targetArray[existingIdx] = Object.assign({}, targetArray[existingIdx], newT);
        updatedCount++;
      } else {
        skippedCount++;
      }
    } else {
      targetArray.push(newT);
      addedCount++;
    }
  });

  // Save to localStorage
  saveDatasetToStorage(targetDataset);

  // Update UI and recompute views
  updateDatasetModeBadges();
  refreshAllViews();

  const preview = document.getElementById('datasetImportPreview');
  if (preview) {
    preview.innerHTML = `
      <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; padding: 0.85rem; color: #6ee7b7; font-size: 0.85rem;">
        ✅ <strong>Successfully Appended!</strong><br>
        Added <strong>+${addedCount}</strong> new tickets, updated <strong>${updatedCount}</strong>, skipped <strong>${skippedCount}</strong>.<br>
        New total in <strong>${targetDataset === 'HISTORICAL' ? 'Historical Baseline' : 'Next Sprint'}</strong>: <strong>${targetArray.length}</strong> tickets.
      </div>
    `;
  }

  showToast(`Appended +${addedCount} tickets to ${targetDataset === 'HISTORICAL' ? 'Historical Baseline' : 'Next Sprint'}! Total: ${targetArray.length}`, 'success');
}

function saveDatasetToStorage(targetDataset) {
  if (targetDataset === 'HISTORICAL') {
    localStorage.setItem('triage_custom_historical_tickets', JSON.stringify(AppState.historicalTickets));
  } else {
    localStorage.setItem('triage_custom_sprint_tickets', JSON.stringify(AppState.sprintTickets));
  }
}

function exportCurrentDatasetCSV(targetDataset) {
  const tickets = targetDataset === 'HISTORICAL' ? AppState.historicalTickets : AppState.sprintTickets;
  const fileName = targetDataset === 'HISTORICAL' ? '100ClassifiedPastTickets.csv' : 'RawDataCurrentSprint.csv';

  const headers = [
    'JIRA ID', 'Ticket ID', 'Jira Summary', 'Classification', 'Human Action Taken',
    'Last Comments', 'Verification Description', 'Assignee', 'Reporter', 'Priority'
  ];

  const rows = tickets.map(t => [
    t['JIRA ID'] || '',
    t['Ticket ID'] || '',
    t['Jira Summary'] || '',
    t['Classification'] || '',
    t['Human Action Taken'] || '',
    t['Last Comments'] || '',
    t['Verification Description'] || '',
    t['Assignee'] || '',
    t['Reporter'] || '',
    t['Priority'] || ''
  ]);

  downloadCSV(fileName, headers, rows);
}

function resetDatasetToOriginalSeeds() {
  if (!confirm('Are you sure you want to reset datasets back to the original seeds (100 Historical / 52 Next Sprint)? Any appended tickets will be cleared.')) {
    return;
  }
  localStorage.removeItem('triage_custom_historical_tickets');
  localStorage.removeItem('triage_custom_sprint_tickets');
  AppState.historicalTickets = [...(window.SEED_HISTORICAL_TICKETS || [])];
  AppState.sprintTickets = [...(window.SEED_SPRINT_TICKETS || [])];
  updateDatasetModeBadges();
  refreshAllViews();
  showToast('Reset datasets to original seeds (100 Historical / 52 Next Sprint)', 'info');

  const preview = document.getElementById('datasetImportPreview');
  if (preview) {
    preview.innerHTML = `
      <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 0.75rem; font-size: 0.8rem; color: #fca5a5;">
        ↺ Datasets reset to default seeds.
      </div>
    `;
  }
}

// ==========================================================================
// 5. Data Export Engine (CSV & JSON)
// ==========================================================================

function exportFullEvaluationCSV() {
  const run = getActiveRun();
  if (!run) return;
  const metrics = computeRunMetrics(run);

  const headers = [
    'JIRA ID', 'Summary', 'Priority', 'Assignee', 'Reporter', 'Historical Action Taken',
    'Final Expected Classification', 'Is Provisional Label', 'AI Classification', 'AI Confidence',
    'Evaluation Outcome', 'Is High Risk Error', 'Reviewer Decision', 'Reviewer Override Class',
    'Feedback Type', 'Reviewer Comment', 'Reason Quality', 'Evidence Quality', 'Action Quality'
  ];

  const rows = metrics.evaluated.map(ev => {
    const r = ev.review || {};
    return [
      ev.ticketId,
      ev.ticket['Jira Summary'] || '',
      ev.ticket['Priority'] || '',
      ev.ticket['Assignee'] || '',
      ev.ticket['Reporter'] || '',
      ev.ticket['Human Action Taken'] || '',
      ev.groundTruthClass || '',
      ev.isProvisional ? 'Yes' : 'No',
      ev.aiResult ? ev.aiResult.classification : '',
      ev.aiResult ? ev.aiResult.confidence : '',
      ev.matchStatus,
      ev.isHighRiskError ? 'Yes' : 'No',
      r.reviewer_decision || '',
      r.reviewer_classification || '',
      r.feedback_type || '',
      r.reviewer_comment || '',
      r.reason_quality || '',
      r.evidence_quality || '',
      r.action_quality || ''
    ];
  });

  downloadCSV(`Triage_Evaluation_${run.model_name.replace(/\s+/g, '_')}_${AppState.currentMode}.csv`, headers, rows);
}

function exportMisclassifiedOnlyCSV() {
  const run = getActiveRun();
  if (!run) return;
  const metrics = computeRunMetrics(run);

  const headers = [
    'JIRA ID', 'Summary', 'Expected Classification', 'AI Classification',
    'AI Confidence', 'AI Reason', 'AI Evidence', 'Feedback Type', 'Reviewer Comment'
  ];

  const wrongTickets = metrics.evaluated.filter(ev => ev.matchStatus === 'INCORRECT' || ev.matchStatus === 'ABSTAINED');
  const rows = wrongTickets.map(ev => {
    const r = ev.review || {};
    return [
      ev.ticketId,
      ev.ticket['Jira Summary'] || '',
      ev.groundTruthClass || '',
      ev.aiResult ? ev.aiResult.classification : '',
      ev.aiResult ? ev.aiResult.confidence : '',
      ev.aiResult ? ev.aiResult.reason : '',
      ev.aiResult ? ev.aiResult.evidence : '',
      r.feedback_type || '',
      r.reviewer_comment || ''
    ];
  });

  downloadCSV(`Triage_Errors_${run.model_name.replace(/\s+/g, '_')}.csv`, headers, rows);
}

function exportReviewerFeedbackCSV() {
  const headers = [
    'Ticket ID', 'Run ID', 'Reviewer Decision', 'Final Classification',
    'Feedback Type', 'Reviewer Comment', 'Reason Quality', 'Evidence Quality',
    'Action Quality', 'Owner Quality', 'Reviewed By', 'Reviewed At'
  ];

  const rows = Object.values(AppState.reviews).map(r => [
    r.ticket_id,
    r.run_id,
    r.reviewer_decision,
    r.reviewer_classification,
    r.feedback_type,
    r.reviewer_comment,
    r.reason_quality,
    r.evidence_quality,
    r.action_quality,
    r.suggested_owner_quality,
    r.reviewed_by,
    r.reviewed_at
  ]);

  downloadCSV('Triage_Reviewer_Feedback_Audit.csv', headers, rows);
}

function downloadCSV(filename, headers, rows) {
  let csvContent = headers.map(h => `"${(h||'').toString().replace(/"/g, '""')}"`).join(',') + '\r\n';
  rows.forEach(row => {
    csvContent += row.map(cell => `"${(cell||'').toString().replace(/"/g, '""')}"`).join(',') + '\r\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`Exported ${filename}`, 'success');
}

// ==========================================================================
// 6. Navigation, Tabs & Utilities
// ==========================================================================

function setupEventListeners() {
  // Mode switcher
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => switchMode(btn.dataset.mode));
  });

  // Run Selector
  const runSelect = document.getElementById('runSelect');
  if (runSelect) {
    runSelect.addEventListener('change', (e) => {
      AppState.currentRunId = e.target.value;
      const r = AppState.runs.find(x => x.run_id === e.target.value);
      if (r && r.dataset_target !== AppState.currentMode) {
        AppState.currentMode = r.dataset_target;
        document.querySelectorAll('.mode-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.mode === r.dataset_target);
        });
      }
      refreshAllViews();
    });
  }

  // Category Switcher Buttons
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => switchCategory(btn.dataset.category));
  });

  // Nav Tabs
  document.querySelectorAll('.nav-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Threshold Slider
  const slider = document.getElementById('thresholdSlider');
  if (slider) {
    slider.addEventListener('input', (e) => {
      AppState.confidenceThreshold = parseFloat(e.target.value) / 100.0;
      document.getElementById('thresholdValBadge').textContent = `${e.target.value}%`;
      const run = getActiveRun();
      if (run) {
        const m = computeRunMetrics(run);
        renderThresholdSimulator(m);
        renderHighRiskSpotlight(m);
        renderQuickKpis(m);
        renderEvaluationTable(m);
      }
    });
  }

  // Evaluation Table Filter inputs
  const searchInput = document.getElementById('tableSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.tableFilters.search = e.target.value;
      AppState.currentPage = 1;
      const run = getActiveRun();
      if (run) renderEvaluationTable(computeRunMetrics(run));
    });
  }

  const filterStatus = document.getElementById('filterStatusSelect');
  if (filterStatus) {
    filterStatus.addEventListener('change', (e) => {
      AppState.tableFilters.status = e.target.value;
      AppState.tableFilters.matrixCellFilter = null;
      AppState.currentPage = 1;
      const run = getActiveRun();
      if (run) renderEvaluationTable(computeRunMetrics(run));
    });
  }

  const filterAiClass = document.getElementById('filterAiClassSelect');
  if (filterAiClass) {
    filterAiClass.addEventListener('change', (e) => {
      AppState.tableFilters.aiClass = e.target.value;
      AppState.tableFilters.matrixCellFilter = null;
      AppState.currentPage = 1;
      const run = getActiveRun();
      if (run) renderEvaluationTable(computeRunMetrics(run));
    });
  }

  const filterGtClass = document.getElementById('filterGroundTruthSelect');
  if (filterGtClass) {
    filterGtClass.addEventListener('change', (e) => {
      AppState.tableFilters.groundTruth = e.target.value;
      AppState.tableFilters.matrixCellFilter = null;
      AppState.currentPage = 1;
      const run = getActiveRun();
      if (run) renderEvaluationTable(computeRunMetrics(run));
    });
  }

  const filterHighRisk = document.getElementById('filterHighRiskOnly');
  if (filterHighRisk) {
    filterHighRisk.addEventListener('change', (e) => {
      AppState.tableFilters.highRiskOnly = e.target.checked;
      AppState.currentPage = 1;
      const run = getActiveRun();
      if (run) renderEvaluationTable(computeRunMetrics(run));
    });
  }

  // Model comparison selects
  const compA = document.getElementById('compareSelectA');
  const compB = document.getElementById('compareSelectB');
  if (compA && compB) {
    compA.addEventListener('change', (e) => {
      AppState.compareRunAId = e.target.value;
      renderModelComparison();
    });
    compB.addEventListener('change', (e) => {
      AppState.compareRunBId = e.target.value;
      renderModelComparison();
    });
  }

  // File Upload Dropzone - AI Runs
  const fileInput = document.getElementById('csvFileInput');
  if (fileInput) {
    fileInput.addEventListener('change', handleFileUpload);
  }

  // File Upload Dropzone - Dataset Tickets (Excel / CSV)
  const datasetFileInput = document.getElementById('datasetFileInput');
  if (datasetFileInput) {
    datasetFileInput.addEventListener('change', handleDatasetFileUpload);
  }

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    const isTyping = ['input', 'textarea', 'select'].includes((e.target.tagName || '').toLowerCase()) || e.target.isContentEditable;
    const isDrawerOpen = AppState.currentDetailTicketId && document.getElementById('ticketDetailDrawer')?.classList.contains('active');
    const isModalOpen = document.getElementById('globalHelpModal')?.classList.contains('active');

    // 1. ESC: Close any active drawer, modal, or blur active input
    if (e.key === 'Escape') {
      if (isDrawerOpen) {
        closeTicketDetailDrawer();
        e.preventDefault();
        return;
      }
      if (isModalOpen) {
        closeGlobalHelpModal();
        e.preventDefault();
        return;
      }
      if (isTyping) {
        e.target.blur();
        return;
      }
    }

    // 2. Ctrl + S or Ctrl + Enter: Save Review in Deep Dive Workstation
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'Enter')) {
      if (isDrawerOpen) {
        e.preventDefault();
        saveTicketReviewForm();
        return;
      }
    }

    // 3. Ctrl + K or '/': Focus Evaluation Table Search Bar
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      switchTab('evaluation');
      const search = document.getElementById('tableSearchInput');
      if (search) {
        search.focus();
        search.select();
      }
      return;
    }

    if (e.key === '/' && !isTyping && !isDrawerOpen && !isModalOpen) {
      e.preventDefault();
      switchTab('evaluation');
      const search = document.getElementById('tableSearchInput');
      if (search) {
        search.focus();
        search.select();
      }
      return;
    }

    // 4. '?': Toggle Global Help Modal
    if (e.key === '?' && !isTyping && !isDrawerOpen) {
      e.preventDefault();
      if (isModalOpen) closeGlobalHelpModal();
      else openGlobalHelpModal();
      return;
    }

    // 5. Category Navigation: 1, 2, 3 (when not typing in form)
    if (!isTyping && !isDrawerOpen && !isModalOpen) {
      if (e.key === '1') {
        e.preventDefault();
        switchCategory('current_run');
        return;
      }
      if (e.key === '2') {
        e.preventDefault();
        switchCategory('historical_results');
        return;
      }
      if (e.key === '3') {
        e.preventDefault();
        switchCategory('knowledge_base');
        return;
      }

      // 6. 'e' or 'E': Export CSV
      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        exportFullEvaluationCSV();
        return;
      }

      // 7. 'k' or 'K': Toggle Front Page Shortcuts Reference
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        toggleFrontShortcuts();
        return;
      }

      // 8. 'i' or 'I': Ingest
      if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        switchTab('import');
        return;
      }

      // 8. ArrowLeft / ArrowRight: Pagination on Evaluation Table
      if (AppState.activeTab === 'evaluation') {
        const run = getActiveRun();
        if (run) {
          const metrics = computeRunMetrics(run);
          const totalPages = Math.ceil(metrics.evaluated.length / AppState.pageSize) || 1;
          if (e.key === 'ArrowLeft' && AppState.currentPage > 1) {
            e.preventDefault();
            changePage(AppState.currentPage - 1);
            return;
          }
          if (e.key === 'ArrowRight' && AppState.currentPage < totalPages) {
            e.preventDefault();
            changePage(AppState.currentPage + 1);
            return;
          }
        }
      }
    }
  });
}

const TAB_CATEGORY_MAP = {
  // Historical Results
  'dashboard': 'historical_results',
  'comparison': 'historical_results',
  'import': 'historical_results',
  'export': 'historical_results',

  // Tickets Queue
  'evaluation': 'current_run',
  'review': 'current_run',

  // Knowledge Base
  'patterns': 'knowledge_base',
  'framework': 'knowledge_base'
};

const TAB_NAME_MAP = {
  'dashboard': 'Dashboard',
  'comparison': 'Model Comparison',
  'import': 'Import & Mapping',
  'export': 'Export Center',
  'evaluation': 'Evaluate',
  'review': 'Review',
  'patterns': 'Feedback & Patterns',
  'framework': 'Triage Framework'
};

const CATEGORY_META = {
  'current_run': {
    id: 'current_run',
    name: 'Tickets Queue',
    icon: '⚡',
    defaultTab: 'evaluation',
    tabs: ['evaluation', 'review']
  },
  'historical_results': {
    id: 'historical_results',
    name: 'Historical Results',
    icon: '🏛️',
    defaultTab: 'dashboard',
    tabs: ['dashboard', 'comparison', 'import', 'export']
  },
  'knowledge_base': {
    id: 'knowledge_base',
    name: 'Knowledge Base',
    icon: '📚',
    defaultTab: 'patterns',
    tabs: ['patterns', 'framework']
  }
};

function switchCategory(categoryId) {
  const meta = CATEGORY_META[categoryId];
  if (!meta) return;
  const targetTab = (AppState.categoryLastTab && AppState.categoryLastTab[categoryId]) || meta.defaultTab;
  switchTab(targetTab);
}

function switchTab(tabId) {
  const categoryId = TAB_CATEGORY_MAP[tabId] || 'historical_results';
  AppState.activeTab = tabId;
  AppState.activeCategory = categoryId;
  if (!AppState.categoryLastTab) AppState.categoryLastTab = {};
  AppState.categoryLastTab[categoryId] = tabId;

  // Update Category buttons
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === categoryId);
  });

  // Update Category panes
  document.querySelectorAll('.category-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `category_${categoryId}`);
  });

  // Show only active category subnav
  document.querySelectorAll('.category-subtabs').forEach(subnav => {
    subnav.style.display = subnav.dataset.parentCategory === categoryId ? 'flex' : 'none';
  });

  // Update Tab buttons
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Update Tab panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `tab_${tabId}`);
  });

  // Update breadcrumb
  const catMeta = CATEGORY_META[categoryId];
  const badgeEl = document.getElementById('activeCategoryBadge');
  const tabBadgeEl = document.getElementById('activeTabBadge');
  if (badgeEl && catMeta) {
    badgeEl.textContent = `${catMeta.icon} ${catMeta.name}`;
  }
  if (tabBadgeEl) {
    tabBadgeEl.textContent = TAB_NAME_MAP[tabId] || tabId;
  }
}

function getClassBadgeName(cls) {
  if (!cls) return 'default';
  const c = cls.toLowerCase();
  if (c.includes('bug')) return 'bug';
  if (c.includes('config')) return 'config';
  if (c.includes('change')) return 'cr';
  if (c.includes('manual')) return 'manual';
  return 'default';
}

function getDotClass(quality) {
  if (quality === 'Good') return 'good';
  if (quality === 'Needs Improvement') return 'improve';
  if (quality === 'Incorrect') return 'bad';
  return 'unrated';
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// Guide helper functions
function toggleFrontShortcuts() {
  const body = document.getElementById('body_front_shortcuts');
  const btn = document.getElementById('btn_toggle_front_shortcuts');
  if (!body || !btn) return;

  const isHidden = body.style.display === 'none' || window.getComputedStyle(body).display === 'none';
  body.style.display = isHidden ? 'block' : 'none';
  btn.textContent = isHidden ? 'Hide Shortcuts ✕' : 'Show Shortcuts 💡';

  if (isHidden) {
    document.getElementById('frontShortcutsPanel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function toggleGuide(pageKey) {
  const body = document.getElementById(`body_guide_${pageKey}`);
  const btn = document.getElementById(`btn_toggle_${pageKey}`);
  if (!body || !btn) return;

  const isHidden = body.style.display === 'none' || window.getComputedStyle(body).display === 'none';
  body.style.display = isHidden ? 'grid' : 'none';
  btn.textContent = isHidden ? 'Hide Guide ✕' : 'Show Guide 💡';
}

function openGlobalHelpModal() {
  const modal = document.getElementById('globalHelpModal');
  if (modal) modal.classList.add('active');
}

function closeGlobalHelpModal() {
  const modal = document.getElementById('globalHelpModal');
  if (modal) modal.classList.remove('active');
}

function switchModalGuideTab(tabKey) {
  document.querySelectorAll('.modal-tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.modaltab === tabKey);
  });
  document.querySelectorAll('.modal-tab-pane').forEach(p => {
    p.classList.toggle('active', p.id === `modaltab_${tabKey}`);
  });
}

// Quick KPI Navigation Redirection Handlers
function navigateToHighRiskErrors() {
  switchTab('evaluation');
  AppState.tableFilters.highRiskOnly = true;
  AppState.tableFilters.matrixCellFilter = null;
  AppState.tableFilters.status = 'ALL';
  AppState.tableFilters.aiClass = 'ALL';
  AppState.tableFilters.groundTruth = 'ALL';
  AppState.tableFilters.search = '';
  AppState.currentPage = 1;

  // Sync DOM filter controls
  const chk = document.getElementById('filterHighRiskOnly');
  if (chk) chk.checked = true;
  const filterStatus = document.getElementById('filterStatusSelect');
  if (filterStatus) filterStatus.value = 'ALL';
  const filterAi = document.getElementById('filterAiClassSelect');
  if (filterAi) filterAi.value = 'ALL';
  const filterGt = document.getElementById('filterGroundTruthSelect');
  if (filterGt) filterGt.value = 'ALL';
  const searchInput = document.getElementById('tableSearchInput');
  if (searchInput) searchInput.value = '';

  const run = getActiveRun();
  if (run) {
    const m = computeRunMetrics(run);
    renderEvaluationTable(m);
  }

  const count = document.getElementById('quickHighRiskVal')?.textContent || '0';
  showToast(`Redirected to Evaluate: Filtered to ${count} High-Risk Errors (≥ ${Math.round(AppState.confidenceThreshold * 100)}% Conf)`, 'warning');

  const tableCard = document.querySelector('#tab_evaluation .table-card');
  if (tableCard) {
    tableCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function navigateToPendingReviews() {
  switchTab('review');
  setReviewQueueFilter('pending');

  const count = document.getElementById('quickPendingVal')?.textContent || '0';
  showToast(`Redirected to Review: ${count} pending tickets ready for audit`, 'info');

  const queueHeader = document.querySelector('#tab_review .review-queue-header');
  if (queueHeader) {
    queueHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function navigateToDashboardAccuracy() {
  switchTab('dashboard');
  showToast('Redirected to Executive Dashboard', 'info');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToManualTriage() {
  switchTab('evaluation');
  AppState.tableFilters.highRiskOnly = false;
  AppState.tableFilters.matrixCellFilter = null;
  AppState.tableFilters.status = 'ABSTAINED';
  AppState.tableFilters.aiClass = 'ALL';
  AppState.tableFilters.groundTruth = 'ALL';
  AppState.tableFilters.search = '';
  AppState.currentPage = 1;

  const chk = document.getElementById('filterHighRiskOnly');
  if (chk) chk.checked = false;
  const filterStatus = document.getElementById('filterStatusSelect');
  if (filterStatus) filterStatus.value = 'ABSTAINED';
  const filterAi = document.getElementById('filterAiClassSelect');
  if (filterAi) filterAi.value = 'ALL';
  const filterGt = document.getElementById('filterGroundTruthSelect');
  if (filterGt) filterGt.value = 'ALL';
  const searchInput = document.getElementById('tableSearchInput');
  if (searchInput) searchInput.value = '';

  const run = getActiveRun();
  if (run) {
    const m = computeRunMetrics(run);
    renderEvaluationTable(m);
  }

  const rate = document.getElementById('quickAbstainVal')?.textContent || '--%';
  showToast(`Redirected to Evaluate: Showing tickets sent to Manual Review (${rate} rate)`, 'info');

  const tableCard = document.querySelector('#tab_evaluation .table-card');
  if (tableCard) {
    tableCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Kick off when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

