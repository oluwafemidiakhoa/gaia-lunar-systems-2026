# NASA Space Apps 2026 — Submission draft (review before submitting)

**Project:** Gaia Lunar Systems — *The First Night* / Moon-to-Mars Junior Astronaut Mission Trainer  
**Live application:** https://gaia-lunar-systems-2026.vercel.app/  
**Source repository:** https://github.com/oluwafemidiakhoa/gaia-lunar-systems-2026  
**Team:** Oluwafemi Idiakhoa (Team Lead, engineering/integration), Emir Besnili (game systems and rules), Muhammad Hamza Shafoat (youth UX review).

## One-sentence pitch
An accessible browser-based lunar survival game that teaches younger students to make evidence-informed engineering decisions under uncertainty—and explains why good decisions do not always guarantee good outcomes.

## The problem
Lunar exploration challenges such as limited electricity, life support, harsh temperatures and equipment failures can be abstract for children. A choice-driven experience gives them a way to see tradeoffs and learn from consequences.

## Solution and interaction
The player selects two specialists, manages six resource bars (crew wellbeing, habitat, spare parts, electricity, water and oxygen), and makes six decisions representing a fictional thirty-day lunar mission. Decisions can incur costs, create future benefits, or lead to uncertain outcomes. The final Mission Control review separates success or failure from the **quality of decisions at the time they were made**.

**Educational distinction:** A wise choice can fail through chance. A reckless choice can sometimes succeed. The game presents an explanatory rubric rather than claiming to compute objectively ideal decisions.

## Science and data
- The turn-two education panel documents a **historical X8.2 solar flare on 10 September 2017** (start 15:35 UTC, peak 16:06 UTC, end 16:31 UTC) using NASA CCMC's SEP event record and a NOAA contemporary bulletin.
- The resource effects and risks in the **fictional game card** are **not derived from the flare observations**, do not imply that it struck any lunar crew, and are not lunar engineering predictions.
- The prototype now includes a cached server-side NASA DONKI FLR request. When a validated recent flare is returned, the game can show its date, classification, and source. If unavailable, it displays the historical NASA case; recent-data functionality still requires live endpoint verification.
- All game resource values, probability thresholds, turn lengths, and specialist effects are simplified unvalidated educational rules. NASA technology-gap mappings proposed in the design document should not be advertised as verified without checking against the primary NASA spreadsheet.

## How we built it
A static HTML/CSS/JavaScript interface with an isolated pure JavaScript state machine. Seeded pseudo-random events allow reproducible tests. GitHub Actions runs Node's built-in game-engine tests. The game is deployed on Vercel and runs without paid cloud services or external APIs.

## What makes it distinctive
- Six explicit, readable gauges instead of averages that could hide a dangerous oxygen or power shortage
- A separate success/failure result and a transparent ex-ante decision-quality score
- Four specialist roles, including an under-pressure medical role
- Mission Control describes specific decisions rated Poor so players can learn from them
- Real historical NASA scientific context clearly separated from simulated effects
- Replayability through different crew combinations, event conditions, and an on-device best score

## Current evidence / limitations
- Automated tests have run in GitHub Actions; inspect the final commit's check before submission.
- The team reports a successful manual game playthrough, but independent browser interaction and youth usability results have not yet been documented.
- Specialist balance and scoring rubric are provisional pending Emir's and Hamza's review.
- Do not claim independent NASA endorsement, validated lunar outcomes, a live API, user-study results, or a deployed Mars mission.

## Scientific sources
1. [NASA CCMC SEP validation event record — September 10, 2017](https://ccmc.gsfc.nasa.gov/assessment/topics/SEP/campaign2020/20170910.php) — flare onset, peak, end and X8.2 classification.
2. [NOAA SWPC contemporary X8.2 event bulletin](https://www.spaceweather.gov/news/x82-r3-strong-x-ray-event-observed-101606-utc) — corroborates date, peak and X8.2 classification.
3. [NASA Moon science overview](https://science.nasa.gov/moon/) — general educational background.
4. [NASA Space Apps Challenge 2026 home and submission schedule](https://www.spaceappschallenge.org/2026/) — event schedule and portal guidance.

## Demo outline (about two minutes)
1. Open the game and state the learning goal (15 s).
2. Select two specialists and explain their tradeoff (20 s).
3. Show resource gauges and turn-one temptation (20 s).
4. On turn two, point to the dated NASA event and distinguish it from the fictional simulation (30 s).
5. Advance to the night, demonstrate a risky decision and warnings (25 s).
6. Show Mission Control's outcome, Good/OK/Poor ratings and high score (30 s).

## Submission checklist — operator actions
- [ ] Confirm that every team member has joined the registered 2026 team in the correct event.
- [ ] Confirm challenge selection matches this project in the official Space Apps portal.
- [ ] Review and paste edited submission description into the **Project Tab** on the team's page.
- [ ] Add the verified working game URL and public GitHub link.
- [ ] Record and upload/attach the required demonstration material according to official portal instructions.
- [ ] Check whether the live project URL is accessible without Vercel login.
- [ ] Confirm latest automated checks passed and review Emir's v2 changes.
- [ ] Submit by **November 15, 2026, 11:59 PM local time** (NASA Space Apps official 2026 page).
- [ ] Capture the portal's final confirmation and project URL. **No submission is claimed until confirmed.**

## Global Awards resource eligibility gate
NASA Space Apps organizers state that eligibility for Global Awards requires at least one NASA data/resource item **listed under the Resources tab of the team's selected challenge**. DONKI alone is not proof of that requirement unless the selected challenge includes it. Confirm the registered challenge and its Resources, use and cite an eligible source, and do not claim eligibility until checked.
