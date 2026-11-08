---
seo_title: "Developer Salary Prediction App (ML) | Abduallh Rawak"
title: Predicting software-developer salaries from the Stack Overflow survey
short_title: Developer salary prediction
description: "A Streamlit app estimating developer salaries by country, education and experience from the Stack Overflow 2021 survey – and what an R² of 0.32 teaches."
summary: Random-forest salary estimator built on the Stack Overflow 2021 survey, deployed as a three-page Streamlit app.
headline_result: Random forest RMSE ≈ $38.8K · R² 0.32
date: 2021-10-07
last_modified_at: 2023-09-28
order: 5
featured: false
tags: [machine-learning, python, streamlit, data-analysis]
stack: [Python, pandas, scikit-learn, Seaborn, Streamlit]
languages: [Python]
repo: https://github.com/abduallheid/salary-perdiction-app
demo: https://salary-perdiction-app.streamlit.app/
role: Sole developer – data cleaning, modelling and Streamlit app.
problem: Developers comparing job offers across countries have no quick way to see what a realistic salary looks like for their experience and education.
image:
  base: /assets/img/projects/software-salary-prediction/cover
  width: 1280
  height: 853
  alt: Laptop showing a code editor next to a coffee mug on a dark desk.
models:
  - { label: "Random forest", value: 0.323 }
  - { label: "Decision tree", value: 0.305 }
---

## Problem

Salary transparency varies hugely between countries. A developer weighing an offer – or a hiring manager setting a band – needs a ballpark figure for *this country, this degree, this many years of professional experience*.

## Approach

**Data.** The [Stack Overflow Developer Survey 2021](https://insights.stackoverflow.com/survey) public results. I kept country, education level, years of professional coding and yearly compensation in USD.

**Cleaning.**

- Kept **full-time employees only**, so part-time and freelance pay don't distort the target.
- Grouped countries with fewer than **400 responses** into "Other", then excluded that group, so every country in the app has enough data.
- Limited salaries to **$10,000–$250,000** to remove obvious outliers and typos.
- Mapped experience text ("Less than 1 year", "More than 50 years") to numbers, and collapsed education into four levels (less than a bachelor's, bachelor's, master's, post-grad).

**Modelling.** Label-encoded country and education, split 80/20, and compared linear regression, KNN, SVR, a decision tree and a random forest, then tuned tree depth with `GridSearchCV`.

## Architecture

```
survey_results_public.csv ─► pandas cleaning ─► label encoders + RandomForestRegressor
                                                    │  (pickled together: saved_steps_1.pkl)
                                                    ▼
                         Streamlit app: Predict page · Explore page (charts) · View page
```

## Results

{% include chart-bars.html rows=page.models title="How much salary variation the models explain" subtitle="R² on the 20% test split (1.0 = perfect, 0 = no better than the average salary)" format="decimal3" label_heading="Model" value_heading="R²" note="Source: salary_prediction_stk2021.ipynb in the project repository. Linear and kernel models scored far lower and are omitted." %}

The best model, a **random forest, has an RMSE of about $38,800** – useful as a rough band, not a precise quote. With only three inputs, it explains about a third of the variation in salary.

## Challenges

- **Three features can't explain salary.** Company size, role, tech stack and city matter as much as country and experience. The estimate should be read as a guide; the app's Explore page shows salary distributions by country so users can see the spread around it.
- **An early cleaning mistake.** The notebook fills missing salaries with the mean *before* filtering. That injects thousands of identical, artificial values. In a rebuild I would drop rows with no salary instead.

## Lessons

- **Report the error in the user's units.** "±$39K" means more to a developer than "R² = 0.32".
- **Clean the target last and carefully** – imputing the thing you are trying to predict quietly biases the model.

## Links

- Live app: [salary-perdiction-app on Streamlit]({{ page.demo }})
- Code and notebook: [salary-perdiction-app on GitHub]({{ page.repo }})
