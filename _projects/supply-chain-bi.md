---
seo_title: "Supply-Chain Power BI Dashboard & DAX KPIs | Abduallh Rawak"
title: Supply-chain BI – demand, supplier and logistics dashboards in Power BI
short_title: Supply-chain BI dashboard
description: "A 3-page Power BI report with DAX KPIs for demand, supplier performance and shipping – plus an honest test of whether the data can forecast units sold."
summary: Power BI report with DAX KPIs for demand, supplier performance and logistics – and an ML experiment that showed what the data can't predict.
headline_result: 3-page Power BI report · 10+ DAX KPIs · ML baseline tested
date: 2023-12-30
last_modified_at: 2026-05-02
order: 2
featured: true
tags: [power-bi, data-analysis, python, machine-learning, forecasting]
stack: [Power BI, DAX, Python, pandas, scikit-learn, XGBoost]
languages: [Python, DAX]
repo: https://github.com/abduallheid/Supply-chain-Business-Analysis
role: Sole analyst – ETL, data model, DAX measures, report design and ML experiment. [VERIFY]
problem: Inventory, lead-time and supplier data sat in one flat file, so it couldn't show where the supply chain was losing time or money.
image:
  base: /assets/img/projects/supply-chain-bi/cover
  width: 1242
  height: 695
  alt: Power BI supply chain overview page with KPI cards for total revenue, supply cost, products sold and production volume, plus revenue-by-product and monthly sales charts.
  caption: Overview page – revenue, cost and volume KPIs with slicers for customer demographics, location, product type and supplier.
mutual_information:
  - { label: "Location", value: 0.233 }
  - { label: "Manufacturing lead time", value: 0.149 }
  - { label: "Inspection results", value: 0.133 }
  - { label: "Shipping carrier", value: 0.113 }
  - { label: "Shipping time", value: 0.040 }
---

## Problem

The dataset describes the supply chain of a fashion and cosmetics business: product type, price, availability, stock levels, order quantities, lead times, manufacturing costs, inspection results, shipping carriers, routes and suppliers. [VERIFY: dataset source and licence] In a single spreadsheet it answers none of the questions a supply-chain manager actually asks:

- Which suppliers are late, expensive or failing inspection?
- Where do lead times come from – manufacturing or shipping?
- Is demand forecastable from the operational data we already have?

## Approach

1. **ETL in Python.** Loaded the raw CSV (100 product records) with pandas, profiled every column, removed records with an `Unknown` customer demographic and wrote a clean `processed_data.csv` (69 records) for Power BI.
2. **Data model and DAX.** Built measures for demand planning (forecast, actual sales, forecast error, forecast accuracy, demand variability, sales growth) and supplier performance (on-time delivery, defect rate, lead-time adherence, cost efficiency). Example:

   ```
   Forecast_Accuracy_KPI =
       1 - DIVIDE(
             AVERAGE(ABS(processed_data[Forecast Error])),
             AVERAGE(processed_data[Demand Forecast]))
   ```

3. **Report design.** Three pages – **Overview**, **Demand** and **Performance** – sharing one slicer panel (customer demographics, location, product type, supplier) so every view can be filtered the same way.
4. **ML experiment.** Tested whether *number of products sold* could be predicted from price, availability, stock, order quantities, location, manufacturing lead time and inspection results, using linear, ridge, lasso, KNN, decision tree, random forest, XGBoost RF and neural-network regressors.

## Architecture

```
supply_chain_data.csv ─► ETL.ipynb (pandas: profile, clean, filter) ─► processed_data.csv
                                                                          │
                     ┌────────────────────────────────────────────────────┤
                     ▼                                                    ▼
         Power BI model + DAX KPIs                         Demand ML.ipynb (scikit-learn)
         Overview · Demand · Performance pages             feature selection → 8 regressors
```

## Results

![Power BI supplier performance page with on-time delivery, defect-rate gauge, SLT adherence and supplier cost-efficiency visuals]({{ '/assets/img/projects/supply-chain-bi/supplier-performance-lg.webp' | relative_url }}){: width="1222" height="691" loading="lazy"}

The **Performance** page puts supplier on-time delivery, defect rate and lead-time adherence side by side, so a buyer can compare suppliers on reliability and quality at once instead of on price alone. [FILL IN: the most important finding – e.g. which supplier or route stood out, and by how much]

The ML experiment produced a clear, useful negative result. Mutual information showed which features carry *any* signal about units sold:

{% include chart-bars.html rows=page.mutual_information title="Which features carry signal about units sold" subtitle="Mutual information with “number of products sold” (higher = more shared information), top 5 features" format="decimal3" label_heading="Feature" value_heading="Mutual information" note="Source: Demand ML.ipynb in the project repository (mutual_info_regression, random_state=0)." %}

But **no regressor beat a simple average on the validation split** – every model had a negative R² (random forest: R² −0.09, RMSE ≈ 312 units). The operational fields describe *how* products move, not *why* customers buy them.

## Challenges

- **Small, wide dataset.** 100 product records (69 after cleaning) with 20+ columns makes over-fitting easy: the decision tree scored a perfect 1.0 on training data and −0.33 on validation.
- **KPI definitions.** "Forecast accuracy" and "on-time delivery" have several industry definitions. Each DAX formula is written out in the repository README, so anyone can check exactly how a number is calculated.

## Lessons

- **A negative result is a result.** Reporting that the data cannot forecast demand stops a business from trusting a model that would have been wrong – and points to the data it needs instead (seasonality, promotions, price history).
- **Shared slicers make a report feel like one product.** The same filter panel on every page means a filter set on Overview still makes sense on Performance.

## Links

- Code, DAX and the `.pbix` report: [Supply-chain-Business-Analysis on GitHub]({{ page.repo }})
- PDF export of the dashboard: `supply_chain.pdf` in the repository
