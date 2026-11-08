---
seo_title: "Telecom Churn Prediction (0.905 ROC-AUC) | Abduallh Rawak"
title: Predicting telecom customer churn with a production-ready ML system
short_title: Orange Telecom churn prediction
description: "Random Forest churn model for 5,000 telecom subscribers (0.905 ROC-AUC), served via FastAPI and Streamlit with risk tiers, retention advice and Power BI."
summary: End-to-end churn prediction for 5,000 telecom subscribers – model, REST API, Streamlit app, Power BI report and CI-tested code.
headline_result: 0.905 ROC-AUC · 87% precision on held-out customers
date: 2023-10-17
last_modified_at: 2026-10-13
order: 1
featured: true
tags: [machine-learning, python, mlops, power-bi, streamlit]
stack: [Python, scikit-learn, pandas, FastAPI, Pydantic, Streamlit, Docker, Power BI, GitHub Actions]
languages: [Python]
repo: https://github.com/abduallheid/Customer-Churn-Prediction-for-a-Telecom-Company-
demo: https://orangechurn.streamlit.app/
role: Sole developer – analysis, modelling, API, app, dashboard and CI.
problem: Spot which subscribers are about to leave early enough for the retention team to act – and tell them why.
image:
  base: /assets/img/projects/orange-telecom-churn/cover
  width: 1165
  height: 652
  alt: Power BI churn overview for Orange Telecom showing a 14.1% churn rate, $297.5K monthly revenue, 5,000 customers and average customer-service calls by state.
  caption: The Power BI overview that sits alongside the model – churn rate, revenue at risk and service-call friction by state.
results:
  - { value: "0.905", label: "ROC-AUC on 1,000 unseen subscribers" }
  - { value: "87.0%", label: "precision – flagged customers who really churned" }
  - { value: "75.9%", label: "recall – churners caught before they left" }
  - { value: "24", label: "automated tests run in CI on Python 3.9–3.12" }
feature_importance:
  - { label: "Customer-service calls", value: 0.1553 }
  - { label: "Daytime charge", value: 0.1438 }
  - { label: "Daytime minutes", value: 0.1373 }
  - { label: "International plan", value: 0.1049 }
  - { label: "Evening minutes", value: 0.0558 }
  - { label: "Evening charge", value: 0.0544 }
  - { label: "International calls", value: 0.0404 }
  - { label: "International minutes", value: 0.0391 }
---

## Problem

Customer attrition is one of the biggest cost drivers in telecoms: winning a new subscriber costs far more than keeping an existing one. The Orange Telecom dataset has 5,000 subscribers, and **14.1% of them churned**. The business question was not just *"who will leave?"* but *"who should the retention team call this week, and what should they offer?"*

That framing set three requirements:

1. **Rank customers by risk**, not just label them, so a limited retention budget goes to the right people.
2. **Explain each prediction** in terms an account manager can act on.
3. **Make it usable** outside a notebook – an API for other systems and an app for non-technical staff.

## Approach

**Data.** 17 features per subscriber: account length, plan flags (international, voicemail), minutes / calls / charges for day, evening, night and international usage, and the number of customer-service calls. I split the data **80/20 with stratification** on the churn label (4,000 training, 1,000 test records) so the 14% minority class is represented equally in both.

**Leak-free preprocessing.** All transformations live inside a single scikit-learn `Pipeline` with a `ColumnTransformer` (an `OrdinalEncoder` maps the two yes/no plan flags to 0/1 and a `StandardScaler` handles the 15 numeric usage fields). The pipeline is fitted on the training split only, so nothing from the test set leaks into training.

**Model.** I compared a Random Forest against Gradient Boosting through the project's CLI and kept a **Random Forest (200 trees, max depth 14, `class_weight="balanced"`)**. Balanced class weights matter here: without them, a model can score ~86% accuracy by predicting "no churn" for everyone.

**From probability to action.** The predictor turns each probability into a **risk tier** – `LOW` below 0.35, `MEDIUM` up to 0.65, `HIGH` above – and attaches rule-based *key drivers* and *recommended actions* (for example, a flat-rate day bundle for customers with high daytime bills).

## Architecture

```
CSV / JSON request
      │
      ▼
Pydantic v2 schema validation ──► scikit-learn Pipeline (preprocess + Random Forest)
                                        │
                                        ▼
                         Predictor: probability → risk tier → drivers → recommendations
                          │                                   │
                          ▼                                   ▼
              FastAPI  (/predict, /predict/upload-csv)   Streamlit app (single + batch scoring)
                          │
                          ▼
                 Docker Compose (API + UI)   ·   Power BI report for management
```

The code is a proper Python package (`src/telecom_churn/`) with separate modules for data loading, preprocessing, training, evaluation and inference, a unified CLI (`train`, `evaluate`, `predict`, `serve`), and **24 pytest tests**. GitHub Actions lints with Ruff, retrains the model artefact and runs the tests on Python 3.9, 3.10, 3.11 and 3.12.

## Results

On the 1,000-subscriber hold-out set the model reached **0.905 ROC-AUC** and **0.849 PR-AUC** – the more honest metric under class imbalance.

{% include chart-confusion.html title="Where the model is right and wrong" tn=843 fp=16 fn=34 tp=107 neg="Retained" pos="Churned" note="Source: models/model_metadata.json in the project repository (Random Forest, stratified hold-out, 14.1% churn rate)." %}

Read in business terms:

- **107 of 141 real churners were flagged in advance** (75.9% recall).
- **Only 16 loyal customers were flagged by mistake**, so 87% of retention spend lands on someone who was genuinely about to leave.
- **34 churners were missed.** Lowering the `HIGH` threshold would catch more of them at the cost of more false alarms – a trade-off the retention team can now make explicitly.

{% include chart-bars.html rows=page.feature_importance title="What drives churn" subtitle="Random Forest feature importance (mean decrease in impurity), top 8 of 17 features" format="decimal3" label_heading="Feature" value_heading="Importance" note="Importances sum to 1 across all 17 features. Daytime charge and minutes are highly correlated, so their combined share (28%) is the fairer reading." %}

Three findings shaped the recommendations:

1. **Service friction is the strongest signal.** Customers who call support **4 or more times** churn at more than 70%. Fixing the reason for repeat calls is worth more than any discount.
2. **Daytime bill shock.** Heavy daytime users on per-minute tariffs leave for competitors; a flat-rate day bundle targets exactly this group.
3. **The international plan is a value problem in both directions** – customers paying for it without using it, and heavy international callers *without* it who get surprise surcharges.

## Challenges

- **Class imbalance.** With 14% positives, accuracy is misleading. I reported precision, recall, F1 and PR-AUC alongside accuracy and used balanced class weights rather than oversampling, which kept the pipeline simple and leak-free.
- **Correlated features.** Minutes and charges are near-linear transforms of each other, which splits importance between them. I kept both for the model but grouped them when explaining results.
- **Reproducibility across Python versions.** A pickled model trained on one version failed to load on another in CI. The fix was to retrain the artefact as a CI step and make the predictor's loading code resilient.

## Lessons

- **Design the output for the person who acts on it.** Risk tiers and plain-language drivers made the model useful to a retention team; a raw probability would not have been.
- **Choose the metric before the model.** In retention, a false alarm costs a discount and a miss costs a customer. Naming that trade-off up front is what makes the tier thresholds defensible.
- **Treat a portfolio model like production code.** Tests, typed schemas and CI caught real bugs – including the cross-version loading issue – that a notebook never would have.

## Links

- Code: [Customer-Churn-Prediction-for-a-Telecom-Company- on GitHub]({{ page.repo }})
- Live app: [orangechurn.streamlit.app]({{ page.demo }})
- Power BI report and executive PDF: in the repository's `Dashboard/` folder
