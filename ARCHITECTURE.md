# Architecture Documentation — CrelioHealth AI Triage Evaluator

This document outlines the architectural patterns, data flow, component boundaries, and state management of the Triage Bot Evaluation Tool.

---

## 1. System Topology & Architectural Principles

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          User Browser Client                           │
│                                                                        │
│  ┌───────────────────────┐   ┌──────────────────────────────────────┐  │
│  │   UI View Controller  │   │          Evaluation Engine           │  │
│  │  - Executive Dashboard│   │  - Confusion Matrix (4x4)            │  │
│  │  - Evaluation Studio  │◄──┤  - Precision, Recall, F1 Calculation │  │
│  │  - Review Queue       │   │  - Threshold Simulator               │  │
│  │  - Model Comparison   │   │  - Response Quality Scorecard        │  │
│  │  - Feedback Patterns  │   └──────────────────▲───────────────────┘  │
│  └───────────▲───────────┘                      │                      │
│              │                                  │                      │
│  ┌───────────▼──────────────────────────────────┴───────────────────┐  │
│  │                       Application State Store                    │  │
│  │  - Historical Seed Dataset (100 rows, immutable)                 │  │
│  │  - Current Sprint Dataset (52 rows, immutable)                   │  │
│  │  - Model Runs Repository (LocalStorage / Preloaded runs)         │  │
│  │  - Reviewer Audit Store (Key: runId_ticketId)                    │  │
│  └──────────────────────────────────▲───────────────────────────────┘  │
│                                     │                                  │
│  ┌──────────────────────────────────▼───────────────────────────────┐  │
│  │                   Ingestion & Export Subsystems                  │  │
│  │  - RFC 4180 Compliant CSV Parser & Generator                     │  │
│  │  - Intelligent Column Mapper (Synonym detection)                 │  │
│  │  - Multi-rule Validation Gate (ID check, bounds check)           │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
                                      ▲
                                      │ HTTP 1.1 (port 3005)
┌─────────────────────────────────────┴──────────────────────────────────┐
│                   Local Host Runtime (Windows PowerShell)              │
│  - System.Net.HttpListener lightweight web server (serve.ps1)          │
│  - Zero external npm/python dependencies                               │
└────────────────────────────────────────────────────────────────────────┘
```

### Architectural Decisions:
1. **Zero External Runtime Dependencies**:
   * Windows machines without Node.js or Python can execute and host the complete tool via built-in PowerShell `System.Net.HttpListener`.
   * Standard browser APIs (`FileReader`, `Blob`, `URL.createObjectURL`, `LocalStorage`) manage file operations and state without server round-trips.
2. **Immutable Source Separation**:
   * Raw dataset records (`SEED_HISTORICAL_TICKETS` and `SEED_SPRINT_TICKETS`) are frozen.
   * Model outputs are stored in `ModelRun.results`.
   * Human evaluations are stored in `AppState.reviews`.
   * The effective evaluated outcome is a computed projection view. No write operation can mutate original input files.
3. **Reactive Re-computation**:
   * Whenever a reviewer records a decision or adjusts the confidence threshold slider, the evaluation engine recalculates metrics, confusion matrices, and per-class F1 scores in sub-millisecond execution time.

---

## 2. Component Structure

### A. Data Layer (`seed-data.js` & `baseline_runs.js`)
* `seed-data.js`: Automatically synchronized from `100ClassifiedPastTickets.csv` and `RawDataCurrentSprint.csv`.
* `baseline_runs.js`: Pre-populates:
  1. `run_hist_v1`: Baseline Zero-Shot Claude 3.5 run exhibiting common failure patterns.
  2. `run_hist_v2`: Rule-Guided Few-Shot Claude 3.5 run with high F1.
  3. `run_sprint_v1`: Sprint live evaluation batch ready for Product Analyst review.
  4. `INITIAL_FEEDBACK`: Pre-seeded reviewer feedback illustrating audit trail records.

### B. Core Application Logic (`app.js`)
* **`AppState`**: Single source of truth managing dataset mode, active run, confidence cutoff, filters, and page index.
* **`evaluateTicket(ticket, run)`**: Pure function projecting an individual ticket's comparison outcome.
* **`computeRunMetrics(run, tickets)`**: Comprehensive calculation of all KPIs, confusion matrices, class statistics, and threshold simulation arrays.
* **`IngestEngine`**: Handles file reading, delimiter parsing, column matching, and validation reporting.
* **`UIController`**: Renders DOM structures, handles modal drawers, table filtering, and toasts.

### C. Styling & Design Tokens (`styles.css`)
* CSS Custom Properties define a dark-mode slate theme inspired by CrelioHealth brand aesthetics.
* Custom styling for 4×4 heatmap matrices, metric progress bars, side drawers, and high-risk pulsing alert badges.

---

## 3. Security, Privacy & Data Handling
* **Air-Gapped / Offline Ready**: All calculations execute client-side. Ticket summaries and Jira URLs never leave the user's workstation.
* **Data Persistence**: Changes persist in browser `localStorage`. To export state across team members, the built-in **Export Center** generates standardized CSV audit records.
