# CrelioHealth AI Triage Evaluator (v2.0 Enterprise)

A full-fledged, dependency-free evaluation platform for measuring, analyzing, and improving AI models that classify Jira tickets into:
1. **Bug**
2. **Config**
3. **Change Request**
4. **Needs Manual Triage**

Designed specifically for **Product Analysts**, **AI Evaluation Architects**, and **Engineering Leads** at CrelioHealth.

---

## 🚀 Quick Start (Running Locally)

The application has **zero external dependencies** (no Node.js, Python, or npm required). It runs entirely on modern web standards with local storage and can be launched on Windows with a single PowerShell command:

```bash
# Clone the repository
git clone git@github.com:amitwagherkar-ux/triagebot.git
cd triagebot

# Launch the local HTTP server:
powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 3005
```

Then open your browser and navigate to:
👉 **[http://localhost:3005](http://localhost:3005)**
*(Or double-click `index.html` to open directly in Google Chrome, Edge, or any modern browser).*

---

## 📋 Key Features & Capabilities

### 1. Dual Evaluation Modes
* **🏛️ Mode A — Historical Baseline (100 Tickets)**:
  * Ground-truth locked reference set (`100ClassifiedPastTickets.csv`).
  * Verified baseline distribution: **Bug (49)**, **Config (19)**, **Change Request (32)**.
  * Measures model classification accuracy, confusion patterns, precision, recall, and F1.
  * Strict anti-leakage safeguards (human classification is never exposed to model inputs).
* **⚡ Mode B — Current Sprint Live Evaluation (52 Tickets)**:
  * Evaluates fresh backlog tickets (`RawDataCurrentSprint.csv`).
  * Treats supplied sprint classifications as provisional labels until validated.
  * Dedicated **Product Analyst Review Queue** for 1-click validation or classification overrides.

### 2. Multi-Dimensional Performance Metrics
* **Accuracy on Attempted**: Evaluates predictions excluding abstentions (`Correct / (Correct + Incorrect)`).
* **Overall Accuracy & Coverage**: Full cohort performance accounting for manual escalations.
* **Per-Class Metrics**: Precision, Recall, F1-Score, and Support calculated individually for Bug, Config, and Change Request.
* **Interactive Confusion Matrix (4×4)**: Visual heatmap of AI predictions vs Human Ground Truth. **Click any cell** to immediately filter and inspect those specific tickets.

### 3. High-Risk Error Detection & Confidence Analysis
* **High-Confidence Error Spotlight**: Identifies tickets where the model was confident (≥ threshold, default 80%) but got the classification wrong.
* **Confidence Threshold Simulator**: Interactive slider (50% to 95%) that models the trade-off between automated ticket triage and manual review escalation.

### 4. Response-Quality vs Classification Decoupling
* Evaluates **triage reasoning quality**, **evidence validity**, **recommended next action**, and **suggested owner** separately from classification correctness. A correct classification with poor evidence or invalid action is tracked and scored.

### 5. Multi-Run Model & Prompt Comparison
* Compare **Prompt v1 (Baseline)** vs **Prompt v2 (Rule-Guided)** or custom runs.
* Side-by-side metric deltas and shift analysis (tickets fixed vs tickets regressed).

### 6. Intelligent Ingestion & Mapping Center
* Import AI predictions via **CSV**, **JSON**, or copy-paste.
* Automated synonym matching for column mapping.
* Strict validation gate checking for missing IDs, invalid classes, and confidence formats.

### 7. Export Engine
* 1-click export of:
  * Full Evaluation Matrix (`.csv`)
  * Misclassified Tickets Error Report (`.csv`)
  * Reviewer Feedback Audit Trail (`.csv`)

---

## 📂 Project Directory Structure

```text
TriageBot/
├── 100ClassifiedPastTickets.csv    # Authoritative Historical Ground Truth (100 rows)
├── RawDataCurrentSprint.csv        # Current Sprint Raw Jira Backlog (52 rows)
├── Triage_Bot_Evaluation_Tool_v1.csv # Original specification and workflow reference
├── SAMPLE_IMPORT_TEMPLATE.csv      # CSV template for importing new model runs
├── index.html                      # Semantic UI shell with responsive layout & drawers
├── styles.css                      # CrelioHealth enterprise design system (tokens, glassmorphism)
├── app.js                          # Core engine: metrics, confusion matrix, review queue, filters
├── seed-data.js                    # Auto-generated offline JSON seeds of authoritative datasets
├── baseline_runs.js                # Pre-loaded baseline model runs (Prompt v1, v2, Sprint)
├── serve.ps1                       # Dependency-free PowerShell HTTP listener server
├── run_tests.ps1                   # Automated verification test suite
├── DATA_DICTIONARY.md              # Complete schema definitions and field semantics
├── EVALUATION_METHODOLOGY.md       # Statistical formulas, triage rules, and quality scoring
├── ARCHITECTURE.md                 # System architecture, data flow, and state lifecycle
└── TEST_REPORT.md                  # Test execution log and validation report
```

---

## 🛠️ The 5 Authoritative Triage Rules

1. **Rule 1 — Start from expected behavior**: Ask *"What is the product supposed to do?"* Never classify solely on reporter terminology.
2. **Rule 2 — Do not rely on keywords**: Words like *bug, issue, error, enhancement* are surface signals only.
3. **Rule 3 — Separate cause from fix method**: A DB query fix does not make an issue Config; engineering involvement does not make it a Change Request.
4. **Rule 4 — Use evidence**: Favor reproduction notes, configuration checks, and permission states.
5. **Rule 5 — Escalate uncertainty**: If evidence is ambiguous, contradictory, or confidence is low, escalate to **Needs Manual Triage**.

---

## 🤝 Reviewer Workflow

1. Navigate to the **Review Queue** or **Evaluation Studio**.
2. Select **Deep Dive** on any ticket.
3. Compare Jira ticket details against AI Reasoning and Evidence.
4. Select reviewer action:
   * **✓ Correct**: Confirms AI prediction.
   * **✗ Incorrect**: Prompts for Final Ground Truth class and one of 14 **Feedback Types**.
   * **⚡ Needs Manual Triage**: Escalates to development or support lead.
5. Score response quality (Reason, Evidence, Next Action, Suggested Team).
6. Save evaluation. All metrics update dynamically while preserving the original model prediction!
