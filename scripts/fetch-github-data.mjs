#!/usr/bin/env node
// Build-time GitHub stats -> _data/github.json (read by the "languages" chart).
// One API call (repos list, which already includes each repo's primary language),
// so it stays far below the rate limit: 60 req/h unauthenticated, 1,000+/h with GITHUB_TOKEN.
// On any failure it keeps the existing file and exits 0, so a GitHub outage never breaks a deploy.
import { readFile, writeFile } from "node:fs/promises";

const USER = process.env.GH_USER || "abduallheid";
const OUT = new URL("../_data/github.json", import.meta.url);
const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-build" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const LABELS = { "Jupyter Notebook": "Jupyter Notebook", TSQL: "SQL", PLpgSQL: "SQL", Blade: "PHP / Laravel", PHP: "PHP / Laravel" };

async function main() {
  const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=pushed`, { headers });
  const remaining = res.headers.get("x-ratelimit-remaining");
  if (!res.ok) throw new Error(`GitHub API ${res.status} (rate limit remaining: ${remaining})`);
  const repos = (await res.json()).filter((r) => !r.fork && !r.archived && !r.private);

  const counts = {};
  for (const r of repos) {
    if (!r.language) continue;
    const name = LABELS[r.language] || r.language;
    counts[name] = (counts[name] || 0) + 1;
  }
  let languages = Object.entries(counts).map(([name, n]) => ({ name, repos: n })).sort((a, b) => b.repos - a.repos);
  // Fold the long tail into "Other" so the chart stays readable (max 7 bars).
  if (languages.length > 7) {
    const other = languages.slice(6).reduce((s, l) => s + l.repos, 0);
    languages = [...languages.slice(0, 6), { name: "Other", repos: other }];
  }

  const data = {
    generated_at: new Date().toISOString().slice(0, 10),
    source: "github-api",
    scope: `${repos.length} public, non-fork repositories`,
    user: USER,
    public_repos: repos.length,
    total_stars: repos.reduce((s, r) => s + r.stargazers_count, 0),
    languages,
  };
  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`Wrote ${repos.length} repos, ${languages.length} languages (rate limit remaining: ${remaining}).`);
}

main().catch(async (err) => {
  console.warn(`::warning::GitHub stats not refreshed – keeping existing _data/github.json. ${err.message}`);
  try { await readFile(OUT); } catch { process.exitCode = 1; }
});
