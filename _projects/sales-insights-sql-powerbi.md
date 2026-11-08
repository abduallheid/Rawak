---
seo_title: "SQL & Power BI Sales Insights Dashboard | Abduallh Rawak"
title: Sales insights for a hardware distributor with SQL and Power BI
short_title: Sales insights (SQL + Power BI)
description: "MySQL analysis and a Power BI dashboard showing revenue, growth and top and declining markets for a hardware distributor, plus a personal-finance report."
summary: MySQL analysis and Power BI dashboards that show which markets, customers and products drive revenue – and which are declining.
headline_result: MySQL analysis → interactive Power BI sales dashboard
date: 2022-06-18
last_modified_at: 2023-11-11
order: 4
featured: false
tags: [sql, power-bi, data-analysis]
stack: [MySQL, MySQL Workbench, SQL, Power BI, Excel]
languages: [SQL]
repo: https://github.com/abduallheid/DATA_ANALYSYS-sales_insight-
role: Sole analyst – SQL analysis, data cleaning, data model and dashboards.
problem: Sales leadership at a hardware distributor relied on spreadsheets and couldn't see which markets were growing or declining.
image:
  base: /assets/img/projects/sales-insights-sql-powerbi/cover
  width: 1103
  height: 627
  alt: Dark-themed Power BI sales insight dashboard with sales by market, sales by store, monthly growth line and average sales quantity by customer.
  caption: Sales insight dashboard – markets, stores, monthly growth and quantity by customer.
---

## Problem

The data comes from **AtliQ Hardware**, a fictional computer-hardware distributor dataset that is widely used for practice. [VERIFY: source attribution] Its sales director could not answer simple questions quickly – *how much did we sell in Chennai in 2020? Which markets are declining?* – because the data lived in a transactional MySQL database that only engineers queried.

## Approach

1. **Explore in SQL first.** Loaded the database dump into MySQL Workbench and answered the business questions directly in SQL – total customers, transactions per market, distinct products per market, revenue by year and month, and revenue by market.
2. **Clean what SQL revealed.** Exploration showed that currency values contained hidden carriage returns (`"INR\r"`, `"USD\r"`) and that some transactions were in USD and others in INR, so totals were wrong unless both issues were handled.
3. **Model and visualise in Power BI.** Imported the cleaned tables, related them around the transactions table (customers, products, markets, date) [VERIFY] and designed a single-page dashboard for revenue, sales quantity, growth over time, and top customers and products.

```sql
-- Revenue in 2020 for the Chennai market (code Mark001)
SELECT SUM(t.sales_amount)
FROM transactions t
JOIN date d ON t.order_date = d.date
WHERE d.year = 2020
  AND t.market_code = 'Mark001';
```

## Architecture

```
MySQL dump ─► MySQL Workbench (exploration SQL) ─► cleaning (currency fix) [VERIFY: in SQL or Power Query]
                                                        │
                                       Power BI star schema ─► Sales insight dashboard
```

## Results

- A dashboard the sales team can filter by year, month and market without writing SQL.
- Revenue figures that are correct across currencies, after normalising INR and USD transactions.
- [FILL IN: the headline insights – e.g. the top 3 markets by revenue share and the markets with falling sales.]

The repository also contains a **personal-finance dashboard** built with the same approach – income, spending by category, savings rate and a monthly statement:

![Power BI personal finance dashboard with income, expense and savings KPI cards, a savings-rate trend line and a detailed monthly statement table]({{ '/assets/img/projects/sales-insights-sql-powerbi/finance-dashboard-lg.webp' | relative_url }}){: width="1280" height="713" loading="lazy"}

## Challenges

- **Dirty categorical values.** The hidden `\r` in currency codes silently dropped rows from filtered totals – a reminder to check `DISTINCT` values before trusting a `WHERE` clause.
- **Mixed currencies.** Totals are only meaningful after converting to one currency. [VERIFY: conversion rate or method used]

## Lessons

- **Answer the question in SQL before building visuals.** It surfaces data-quality problems while they are still cheap to fix.
- **One page, one audience.** A sales director needs trend, ranking and drill-down – not twenty visuals.

## Links

- SQL, `.pbix` files and PDF export: [DATA_ANALYSYS-sales_insight- on GitHub]({{ page.repo }})
