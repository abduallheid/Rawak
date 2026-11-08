---
seo_title: "Vitruvius: Construction Web App with ML | Abduallh Rawak"
title: Vitruvius – a construction-planning web app with ML cost estimates
short_title: Vitruvius construction app
description: "Graduation project: a Laravel web app where clients design a custom villa, compare global designs and get a machine-learning construction-cost estimate."
summary: Graduation project – Laravel web app for custom villa building with an ML model that estimates construction cost.
headline_result: Full-stack graduation project, team of 3
date: 2022-09-25
last_modified_at: 2024-05-30
order: 6
featured: false
tags: [web-app, machine-learning, python]
stack: [Laravel, PHP, Tailwind CSS, MySQL, Python, scikit-learn]
languages: [PHP, Python]
repo: https://github.com/abduallheid/Vitruvius-graduation-project-cs-2022
role: Team of 3 – [VERIFY] my part, e.g. the cost-prediction model and its integration.
problem: Families building a villa can't get a reliable cost estimate or compare contractors and designs without many slow site visits.
image:
  base: /assets/img/projects/vitruvius-construction-ml/cover
  width: 1280
  height: 1280
  alt: Vitruvius logo – a stylised blue building skyline under a construction crane.
---

## Problem

Building a custom home involves choosing a design, finding a contractor and estimating cost – usually through slow, fragmented conversations. Vitruvius was our answer for our 2022 computer-science graduation project: **one web app where a client designs a villa, picks from global designs and gets an instant cost estimate**.

## Approach

- **Two-sided product.** A **client interface** for choosing designs, specifications and requesting quotes, and a **contracting-company interface** for managing requests and projects.
- **Web stack.** Laravel (PHP) with Blade templates and Tailwind CSS, backed by a relational database.
- **Cost estimation.** A Python regression model, developed in the `House-price-Forecasting` module, estimates construction cost from the selected specifications. [FILL IN: model type, training data, features and accuracy]

## Architecture

```
Browser ─► Laravel (routes, controllers, Blade + Tailwind) ─► MySQL
                    │
                    └─► Python cost model (House-price-Forecasting) ─► estimated cost shown to client
```

[VERIFY: how Laravel calls the Python model – API, CLI or batch]

## Results

- A working prototype covering both client and contractor journeys, presented as our graduation project. [FILL IN: grade or award, if you want to show it]
- An [explainer video](https://drive.google.com/file/d/1VqnUlKKyblUychkMF4AY1MuB8wB3L42x/view?usp=sharing) walking through the app.

## Challenges

- **Scope.** A two-sided marketplace is large for a student team; the README still lists the project as under development.

## Lessons

- **Agree on interfaces early** when a team splits work across languages.
- **Ship the smallest end-to-end slice first** – one design, one estimate, one quote – before widening scope.

## Links

- Code: [Vitruvius-graduation-project-cs-2022 on GitHub]({{ page.repo }})
- Team: [@abduallheid](https://github.com/abduallheid), [@mahmoudmagdy10](https://github.com/mahmoudmagdy10), [@ahmed-elrooby](https://github.com/ahmed-elrooby)
