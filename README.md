# Gaia Lunar Systems — The First Night

An independent educational lunar survival game for ages 7–12, built for the NASA Space Apps Challenge 2026. This repository is **new**, separate from the team's earlier project.

## Play
Open `index.html` using a local HTTP server (ES modules are not guaranteed to load from a `file://` URL):

```bash
python -m http.server 8080
```

Then visit http://localhost:8080. No application dependencies, API keys, or Copilot credits are required.

## How it works
1. Choose two specialists.
2. Play six five-day turns, balancing oxygen, water, power, habitat integrity, spares, and crew health.
3. Survive to the end with **Crew ≥ 5** and **Base ≥ 5**.
4. Read a Mission Control debrief and a separate **decision-quality** score.

The score evaluates game-model choices before random outcomes, not post-hoc luck. This scoring rubric is provisional and needs youth playtesting.

## Current scope
- One lunar-equator mission: **The First Night**.
- Simplified game mechanics. Resource values and risk probabilities are **not validated engineering data**.
- No live NASA DONKI API. The event is **illustrative** and clearly labeled.
- No high-score persistence yet. The second South Pole mission is future scope.
- Source verification, game balance, and device testing remain before submission.

## Contribute
- [Emir's game-system specification — PR #1](https://github.com/oluwafemidiakhoa/gaia-lunar-systems-2026/pull/1)
- [Playable implementation — PR #2](https://github.com/oluwafemidiakhoa/gaia-lunar-systems-2026/pull/2)
- Review the playtest protocol in [docs/playtest-checklist.md](docs/playtest-checklist.md).

## Tests
Run `npm test` with Node.js 20+; tests use the Node built-in test runner.

## Credits and scientific notice
Gaia Lunar Systems team: Oluwafemi (Team Lead and software integration), Emir (Game Systems Lead), Hamza (Youth UX and game-logic review).

Not affiliated with or endorsed by NASA. NASA facts must be cited independently; outcomes and probabilistic mechanics in this game are illustrative.
