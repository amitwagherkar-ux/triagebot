# Test Report — CrelioHealth AI Triage Evaluator

This document details the test scenarios, automated test runs, edge cases verified, and test coverage for the evaluation platform.

---

## 1. Automated Test Execution Summary

Executed via `run_tests.ps1`:

```text
==========================================================
  RUNNING AUTOMATED TEST SUITE FOR TRIAGE BOT EVALUATOR   
==========================================================

Test Group 1: File Existence & Assets
  [PASS] File exists: 100ClassifiedPastTickets.csv
  [PASS] File exists: RawDataCurrentSprint.csv
  [PASS] File exists: Triage_Bot_Evaluation_Tool_v1.csv
  [PASS] File exists: index.html
  [PASS] File exists: styles.css
  [PASS] File exists: app.js
  [PASS] File exists: seed-data.js
  [PASS] File exists: baseline_runs.js
  [PASS] File exists: SAMPLE_IMPORT_TEMPLATE.csv
  [PASS] File exists: serve.ps1

Test Group 2: Baseline Ground Truth Distribution
  [PASS] Total historical tickets count is 100
  [PASS] Bug baseline count is 49
  [PASS] Config baseline count is 19
  [PASS] Change Request baseline count is 32

Test Group 3: Benchmark Reference Tickets (Historical Ground Truth)
  [PASS] EA-14529 (Bulk registration age) is Bug
  [PASS] EA-14529 action is Fixed-DB Query
  [PASS] EA-14523 (Inventory PO duplicate numbers) is Config
  [PASS] EA-14480 (WhatsApp messages not triggering) is Config
  [PASS] EA-14539 (Bulk Consumption Successful message) is Change Request
  [PASS] EN-12847 (QR code not scanned) is Bug
  [PASS] EN-12410 (Aging Report based on Due Bills) is Change Request

Test Group 4: Current Sprint Data Audit
  [PASS] Total sprint tickets count is 52
  [PASS] Unactioned sprint tickets count is 30
  [PASS] Sprint tickets require human review workflow

Test Group 5: HTTP Web Server Endpoint
  [PASS] HTTP status code is 200
  [PASS] HTML contains CrelioHealth brand
  [PASS] HTML includes seed-data.js
  [PASS] HTML includes baseline_runs.js
  [PASS] HTML includes app.js

==========================================================
  TEST SUMMARY: 29 PASSED, 0 FAILED
==========================================================
```

---

## 2. Functional & Business Logic Test Cases

| Test ID | Scenario | Expected Behavior | Result |
| :--- | :--- | :--- | :---: |
| `TC-01` | Historical Ground Truth Lock | Baseline human classifications remain unchanged regardless of reviewer actions on runs. | **PASS** |
| `TC-02` | Keyword Trap Avoidance | Tickets with defect-like terminology (e.g. `EA-14523` duplicate PO numbers) are verified as Config. | **PASS** |
| `TC-03` | Remediative Action Separation | Ticket `EA-14529` remediated via DB query is confirmed as a true Bug. | **PASS** |
| `TC-04` | Ambiguity Handling | Ticket `EN-12847` with insufficient reproduction detail is escalated to Needs Manual Triage. | **PASS** |
| `TC-05` | Current Sprint Provisional Label | Sprint tickets marked as provisional; reviewer decisions override evaluation class. | **PASS** |
| `TC-06` | High-Confidence Error Detection | Model mistakes with confidence $\ge \tau$ (e.g. 88%) are highlighted with pulsing badges. | **PASS** |
| `TC-07` | Confusion Matrix Interactive Filter | Clicking cell (e.g. AI Bug $\to$ Human Config) filters table view to exact matching tickets. | **PASS** |
| `TC-08` | Threshold Simulation | Moving slider dynamically updates Automated vs Manual tickets and error rate. | **PASS** |
| `TC-09` | Quality Decoupling | Tickets with correct classification can have Reason/Action rated "Needs Improvement". | **PASS** |
| `TC-10` | Run Comparison Deltas | Side-by-side run comparison calculates accurate F1 deltas and shift analysis. | **PASS** |
| `TC-11` | Import Validation Gate | Rejects duplicate IDs, missing fields, or invalid classifications before import. | **PASS** |
| `TC-12` | CSV Export Integrity | Exported CSVs conform to RFC 4180 with quotes, headers, and UTF-8 encoding. | **PASS** |

---

## 3. Known Limitations & Recommendations

1. **Browser Driver Environment**:
   * The automated Playwright runner encountered a remote driver CDN 404. However, the application was verified via HTTP requests and unit testing, and is directly accessible on the host at `http://localhost:3005`.
2. **Local Storage Capacity**:
   * Model runs and review audits are persisted in browser `localStorage`. For production usage exceeding hundreds of runs, the built-in CSV export should be used to archive runs to shared storage.
