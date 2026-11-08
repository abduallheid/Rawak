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
market_share:
  - { label: "Delhi NCR", value: 0.528 }
  - { label: "Mumbai", value: 0.152 }
  - { label: "Ahmedabad", value: 0.134 }
  - { label: "Nagpur", value: 0.056 }
  - { label: "Bhopal (Mark007)", value: 0.043 }
  - { label: "Kochi", value: 0.019 }
  - { label: "Other 9 markets", value: 0.068 }
---

## Problem

The data comes from **AtliQ Hardware**, a fictional computer-hardware distributor dataset that is widely used for practice: 150,283 transactions across 15 Indian markets from October 2017 to June 2020. Its sales director could not answer simple questions quickly – *how much did we sell in Chennai in 2020? Which markets are declining?* – because the data lived in a transactional MySQL database that only engineers queried.

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
- **One market carries the business.** Delhi NCR brings in more than half of all revenue, and the top three markets bring in 81%.
- **Revenue fell 19% from 2018 to 2019** (₹414M → ₹337M, the last two full years). Delhi NCR fell 22%, so the decline is mostly a Delhi NCR story.
- **A few small markets grew against the trend:** Hyderabad (+14%), the larger of the two Bhopal market codes (+8%) and Kochi (+6%).
- **Chennai, the market the original SQL questions focused on, nearly halved** (−43%, ₹9.0M → ₹5.1M).

{% include chart-bars.html rows=page.market_share title="Revenue share by market" subtitle="Share of total revenue, October 2017 – June 2020 (top 6 markets + the other 9 combined)" format="percent" label_heading="Market" value_heading="Share of revenue" note="Source: db_dump.sql in the project repository, recomputed in Python. Excludes 1,611 zero or negative amounts. The 4 USD transactions are converted at ₹75/USD; they do not change any share." %}

The repository also contains a **personal-finance dashboard** built with the same approach – income, spending by category, savings rate and a monthly statement:

![Power BI personal finance dashboard with income, expense and savings KPI cards, a savings-rate trend line and a detailed monthly statement table]({{ '/assets/img/projects/sales-insights-sql-powerbi/finance-dashboard-lg.webp' | relative_url }}){: width="1280" height="713" loading="lazy"}

## Challenges

- **Dirty categorical values.** The hidden `\r` in currency codes silently dropped rows from filtered totals – a reminder to check `DISTINCT` values before trusting a `WHERE` clause.
- **Mixed currencies.** Totals are only meaningful after converting to one currency. Only 4 of 150,283 transactions are in USD, so the rate barely matters here – but a filter on `currency = 'INR'` would silently have dropped them.
- **Other data-quality traps in the dump:** 1,611 transactions with a zero or negative sales amount, two market codes (`Mark007`, `Mark013`) that are both named "Bhopal", and two markets (New York, Paris) with no sales at all. Each one distorts a market ranking if it isn't handled.

## Lessons

- **Answer the question in SQL before building visuals.** It surfaces data-quality problems while they are still cheap to fix.
- **One page, one audience.** A sales director needs trend, ranking and drill-down – not twenty visuals.

## Links

- SQL, `.pbix` files and PDF export: [DATA_ANALYSYS-sales_insight- on GitHub]({{ page.repo }})
