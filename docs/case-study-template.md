---
# Copy this file to _projects/<short-slug>.md – the slug becomes the URL: /Rawak/projects/<short-slug>/
seo_title: "[FILL IN – max 60 chars incl. ' | Abduallh Rawak']"
title: "[FILL IN – descriptive H1, can be longer]"
short_title: "[FILL IN – used in breadcrumbs]"
description: "[FILL IN – 120–155 chars: what, how, headline result. Shown in Google and on the page]"
summary: "[FILL IN – one sentence for the card]"
headline_result: "[FILL IN – e.g. 0.91 ROC-AUC · 40% faster reporting]"   # optional, shown on the card
date: 2026-01-31              # first commit / project start
last_modified_at: 2026-02-28  # optional
order: 7                      # position in lists (1 = first)
featured: false               # true = shown on the home page (first 3)
tags: [power-bi, sql]         # slugs from _data/tags.yml (add new ones there)
stack: [Power BI, DAX, SQL]
languages: [SQL]              # for SoftwareSourceCode structured data
repo: https://github.com/abduallheid/REPO
demo:                         # optional live URL
role: "[FILL IN – solo, or your part in a team]"
problem: "[FILL IN – one sentence]"
image:                        # run: scripts/optimize-image.sh screenshot.png assets/img/projects/<slug>/cover
  base: /assets/img/projects/<slug>/cover
  width: 1280                 # width/height of cover-lg.webp (printed by the script)
  height: 720
  alt: "[FILL IN – describe what the screenshot shows, not 'screenshot']"
  caption: "[optional]"
results:                      # optional stat tiles; only real, sourced numbers
  - { value: "[FILL IN]", label: "[FILL IN]" }
chart_data:                   # optional – any list you want to chart
  - { label: "A", value: 10 }
  - { label: "B", value: 6 }
---

## Problem

[FILL IN – who had the problem, why it mattered, what "done" looked like.]

## Approach

[FILL IN – data, cleaning, method, key decisions and why.]

## Architecture

```
source ─► processing ─► model / data model ─► dashboard / app
```

## Results

{% include chart-bars.html rows=page.chart_data title="[Chart title]" subtitle="[What is measured, unit]" note="Source: [where the numbers come from]" %}

[FILL IN – numbers first, then what they mean for the business.]

## Challenges

- [FILL IN]

## Lessons

- [FILL IN]

## Links

- Code: [repo]({{ page.repo }})
