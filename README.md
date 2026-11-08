# Abduallh Rawak – data analytics portfolio

Live site: **https://abduallheid.github.io/Rawak/**

A fast, accessible Jekyll site on GitHub Pages: case studies written in Markdown, charts rendered at build time as accessible HTML tables, no CSS framework, no jQuery, and about 1 KB of optional JavaScript.

## Add a new case study (one file)

1. Optimise the cover image:
   ```bash
   scripts/optimize-image.sh ~/Desktop/dashboard.png assets/img/projects/my-project/cover
   ```
2. Copy `docs/case-study-template.md` to `_projects/my-project.md` and fill in the front matter and sections.
3. Commit and push to `main`. The project page, card, tag filter, sitemap, RSS feed, structured data and previous/next links are all generated.

Everything else is data, not HTML:

| What | File |
|---|---|
| Name, contact, CV links, summary | `_data/profile.yml` |
| Jobs | `_data/experience.yml` |
| Certifications | `_data/certifications.yml` |
| Skills | `_data/skills.yml` |
| Tag labels | `_data/tags.yml` |
| GitHub language stats (auto-refreshed) | `_data/github.json` |
| Search Console / Bing verification, analytics | `_config.yml` |

## Charts

`{% include chart-bars.html rows=page.my_data title="…" subtitle="…" note="Source: …" %}` renders a horizontal bar chart as a real `<table>`, so screen readers, print and no-JS users all get the numbers. `chart-confusion.html` renders a confusion matrix. Both follow the light and dark themes.

## Local preview

```bash
bundle install
bundle exec jekyll serve --livereload
# open http://localhost:4000/Rawak/
```

`Gemfile` pins the `github-pages` gem, so the local build uses the same Jekyll 3.10 and plugins as production.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and every Monday. It first refreshes `_data/github.json` from the GitHub API (one call, authenticated with `GITHUB_TOKEN`), so the site never calls the API at runtime and can't hit rate limits.

**One-time setup:** go to *Settings → Pages → Build and deployment* and set **Source: GitHub Actions**. If you leave it on "Deploy from a branch", the site still builds, but the GitHub stats stay at their last committed values.

`.github/workflows/quality.yml` runs on pull requests: Lighthouse CI (mobile, fails below 95 in any category) and axe-core (WCAG 2.2 AA).
