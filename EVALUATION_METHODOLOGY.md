# Evaluation Methodology — CrelioHealth AI Triage Evaluator

This document details the mathematical formulas, evaluation protocols, anti-leakage safeguards, and threshold optimization methodology implemented in the Triage Bot Evaluation Tool.

---

## 1. Core Evaluation Philosophy

A production Triage Bot cannot be judged purely on basic accuracy. In enterprise medical laboratory SaaS:
* A **high-confidence wrong classification** (e.g. telling a lab an existing defect is "working as expected" with 95% confidence) is catastrophic.
* A model that **knows when to abstain** (escalating to *Needs Manual Triage*) is significantly more valuable than one that forces an ungrounded guess.
* A bot must provide **valid reasoning, verified evidence, and practical first actions** even when its classification is correct.

---

## 2. Statistical Metrics & Mathematical Formulations

### A. Classification Status Definition
For each ticket $i$, let:
* $y_i \in \{\text{Bug}, \text{Config}, \text{Change Request}, \text{Needs Manual Triage}\}$ be the authoritative ground truth (from baseline or human review override).
* $\hat{y}_i \in \{\text{Bug}, \text{Config}, \text{Change Request}, \text{Needs Manual Triage}\}$ be the AI prediction.
* $c_i \in [0.0, 1.0]$ be the AI prediction confidence.

$$\text{Status}(i) = \begin{cases}
\text{No AI}, & \text{if } \hat{y}_i \text{ is missing} \\
\text{Abstained}, & \text{if } \hat{y}_i = \text{Needs Manual Triage} \\
\text{Correct}, & \text{if } \hat{y}_i = y_i \\
\text{Incorrect}, & \text{if } \hat{y}_i \neq y_i
\end{cases}$$

### B. Attempted Accuracy vs Overall Accuracy
1. **Accuracy on Attempted Classifications**:
   $$\text{Accuracy}_{\text{Attempted}} = \frac{N_{\text{Correct}}}{N_{\text{Correct}} + N_{\text{Incorrect}}}$$
   *Measures the accuracy when the bot committed to a definitive triage decision.*

2. **Overall Cohort Accuracy**:
   $$\text{Accuracy}_{\text{Overall}} = \frac{N_{\text{Correct}}}{N_{\text{Total}}}$$

3. **Coverage Rate**:
   $$\text{Coverage} = \frac{N_{\text{Correct}} + N_{\text{Incorrect}}}{N_{\text{Total}}}$$

4. **Abstention / Manual Escalation Rate**:
   $$\text{Abstention Rate} = \frac{N_{\text{Abstained}}}{N_{\text{Total}}}$$

---

### C. Per-Class Precision, Recall, and F1-Score
For each target class $C \in \{\text{Bug}, \text{Config}, \text{Change Request}\}$:
* **True Positives ($TP_C$)**: $\hat{y}_i = C \land y_i = C$
* **False Positives ($FP_C$)**: $\hat{y}_i = C \land y_i \neq C$
* **False Negatives ($FN_C$)**: $\hat{y}_i \neq C \land y_i = C$
* **Support ($S_C$)**: Number of tickets where ground truth $y_i = C$.

$$\text{Precision}_C = \frac{TP_C}{TP_C + FP_C}$$
$$\text{Recall}_C = \frac{TP_C}{TP_C + FN_C}$$
$$\text{F1}_C = 2 \times \frac{\text{Precision}_C \times \text{Recall}_C}{\text{Precision}_C + \text{Recall}_C}$$

* **Macro F1-Score**: Unweighted arithmetic mean across classes:
  $$\text{Macro F1} = \frac{1}{3} \sum_{C} \text{F1}_C$$
* **Weighted F1-Score**: Support-weighted mean:
  $$\text{Weighted F1} = \frac{\sum_C (S_C \times \text{F1}_C)}{\sum_C S_C}$$

---

## 3. Confidence Threshold Simulation & Risk Optimization

The tool implements a dynamic threshold simulation curve across cutoffs $\tau \in [0.50, 0.95]$:

1. **Automated Ticket Criterion**:
   A ticket is eligible for automatic routing if:
   $$c_i \ge \tau \quad \text{AND} \quad \hat{y}_i \neq \text{Needs Manual Triage}$$

2. **Manual Escalation Criterion**:
   A ticket is routed to human triage if:
   $$c_i < \tau \quad \text{OR} \quad \hat{y}_i = \text{Needs Manual Triage}$$

3. **High-Risk Error Identification**:
   Any automated ticket ($c_i \ge \tau$) where $\hat{y}_i \neq y_i$ is flagged as **High-Risk**.

4. **Automation Error Rate**:
   $$\text{Error Rate}_{\text{Automated}} = \frac{N_{\text{High-Risk Errors}}}{N_{\text{Automated Tickets}}}$$

*Objective*: Find the optimal threshold $\tau^*$ that maximizes automation coverage while keeping the automation error rate below the enterprise target (typically $< 3\%$).

---

## 4. Response-Quality vs Classification Decoupling

The platform evaluates four triage response components independently of classification correctness:
* **Reasoning Quality**: Is the causal explanation logically sound?
* **Evidence Quality**: Did the bot cite concrete facts from the ticket, or make unverified assumptions?
* **Recommended Next Action**: Is the suggested action the smallest practical step to advance the ticket?
* **Suggested Team / Owner**: Is the team mapping supported by Jira data?

Each component is rated as:
* **Good**: Appropriate and aligned with product specifications.
* **Needs Improvement**: Partially aligned but vague or missing key context.
* **Incorrect**: Factually wrong, misleading, or counter-productive.

---

## 5. Anti-Leakage Safeguards

1. In Historical Baseline evaluation, the model predictions are imported **without exposing ground-truth labels** to the prompt.
2. Source data files (`100ClassifiedPastTickets.csv` and `RawDataCurrentSprint.csv`) are strictly read-only and immutable.
3. Reviewer corrections create a distinct audit record and never erase the original AI output.
