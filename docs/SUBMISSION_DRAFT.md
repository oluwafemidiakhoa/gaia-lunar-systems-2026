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
- The turn-two evidence panel documents a **historical X8.2 solar flare on 10 September 2017** (start 15:35 UTC, peak 16:06 UTC, end 16:31 UTC) using NASA CCMC's SEP event record and a NOAA contemporary bulletin.
- The resource effects and risks in the **fictional game card** are **not derived from the flare observations**, do not imply that it struck any lunar crew, and are not lunar engineering predictions.
- The prototype now includes a cached server-side NASA DONKI FLR request. When a validated recent flare is returned, the game can show its date, classification, and source. If unavailable, it displays the historical NASA case; recent-data functionality still requires live endpoint verification.
- All game resource values, probability thresholds, turn lengths, and specialist effects are simplified unvalidated educational rules. NASA technology-gap mappings proposed in the design document should not be advertised as verified without checking against the primary NASA spreadsheet.

## How we built it
A static HTML/CSS/JavaScript interface with an isolated pure JavaScript state machine. Seeded pseudo-random events allow reproducible tests. GitHub Actions runs Node's built-in game-engine tests. The game is deployed on Vercel and runs without paid cloud services. A read-only server-side endpoint optionally queries the NASA DONKI FLR API and falls back to a sourced historical flare.

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
- Do not claim independent NASA endorsement, validated lunar outcomes, a verified successful live DONKI response, user-study results, or a deployed Mars mission.

## Scientific sources
1. [NASA CCMC SEP validation event record — September 10, 2017](https://ccmc.gsfc.nasa.gov/assessment/topics/SEP/campaign2020/20170910.php) — flare onset, peak, end and X8.2 classification.
2. [NOAA SWPC contemporary X8.2 event bulletin](https://www.spaceweather.gov/news/x82-r3-strong-x-ray-event-observed-101606-utc) — corroborates date, peak and X8.2 classification.
3. [NASA Moon science overview](https://science.nasa.gov/moon/) — general educational background.
4. [NASA Space Apps Challenge 2026 home and submission schedule](https://www.spaceappschallenge.org/2026/) — event schedule and portal guidance.

## Required demo — max 30 seconds of video OR max 7 slides

NASA Space Apps 2026 submission guidance allows **one video lasting no more than 30 seconds** or **one presentation of no more than seven slides**. The demo link and final project link are separate, and must be viewable without requesting access. If the video is not in English, add English subtitles.

**30-second shot list (English captions):**
- **0–5 s:** “Can kids run a Moon base?” — game landing screen.
- **5–10 s:** Choose two specialists and show six resource bars.
- **10–18 s:** Make a decision, show power/crew consequences and the NASA-sourced turn-two flare observation. On-screen text: “NASA data ≠ simulated game effects.”
- **18–24 s:** Show lunar night hazards, warnings, and the final choice.
- **24–30 s:** Show Mission Control decision ratings and replay score; end with “Play The First Night”.

**Alternative seven-slide outline:** Challenge; learning goal; player choices; authentic NASA flare and citation; resource tradeoffs; Mission Control feedback; playable link and team.

Only use verified captures of the actual game. Do not invent playtesting, measured learning improvement, or empirical win rates. Obtain a separate publicly viewable demo URL, verify it in an incognito browser window, and insert that URL in the Space Apps Project Tab.

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

## NASA resource compliance — selected challenge (confirmed from official Resources tab text provided by team lead)

Selected challenge: **Build a Junior Astronaut Mission Trainer**, NASA Space Apps Challenge 2026.

The challenge's **NASA Data & Resources** list explicitly names:
- [NASA Open APIs](https://api.nasa.gov/) (including DONKI)
- [NASA DONKI](https://ccmc.gsfc.nasa.gov/tools/DONKI/)
- [NASA OSDR](https://osdr.nasa.gov/bio/repo/)
- [NASA RadLab](https://visualization.osdr.nasa.gov/radlab/gui/data-api/)
- [NASA Mars Trek](https://trek.nasa.gov/mars/)

**Our selected eligible resource is NASA DONKI**, not OSDR/RadLab/Mars Trek. Turn 2's source panel uses an archived real flare with attribution and attempts a read-only recent DONKI FLR request. Its gameplay consequences remain invented educational rules. This establishes the resource's presence on the selected challenge list; it does **not** independently establish a successful recent API request, adherence to all submission rules, or award eligibility.

**Before the final submission:** verify the deployed endpoint returns a correctly labeled NASA response or the transparent historical fallback, and demonstrate the source panel in the recorded video. Respect the NASA disclaimer: the team project is not NASA-endorsed.

## Final team coordination — 2026-11-15

- **Science correction verified against uploaded NASA 2025 spreadsheet:** ESDMD #0805 is **Autonomous Surface Mobility and Navigation**. Do not call #0805 “Lunar caves.” Other linked gap IDs have been mapped to their official spreadsheet titles in `game-engine.js`. These are related technology gaps, **not** claims that NASA has validated the game mechanics.
- **Mission Control copy:** Emir reports having prepared one-line ratings and sourced facts. Those exact texts were not attached to the materials available for this update; do not claim they have been integrated without receiving and testing the file.
- **Video maker:** Hamza may assemble a screen recording of the game. To comply with the team's stated under-18 restrictions, use **gameplay capture only**, with text captions or adult narration; do not include any minor's face, photo, or recorded voice. Producing a video does not require appearing in it.
- **Submissions:** Team lead must populate the NASA Space Apps Project Tab with the short description, playable public project link, public repository link, eligible NASA dataset attribution, and an accurate disclosure of any AI assistance. A publicly accessible 30-second video OR up to 7 slides is required per the team's reported guide. Verify actual portal fields and capture final submission confirmation.

### Concise NASA Data field (proposed)
NASA DONKI (NASA Open APIs) supplies sourced historical solar-flare context and a read-only recent-event endpoint for Turn 2. NASA's 2025 Moon-to-Mars Architecture-Driven Technology Gaps spreadsheet provides related engineering problem references for Turns 4 and 5. The game's event effects, resources and scoring are simplified educational mechanics; they are not NASA observations or predictions.

### AI use disclosure (draft; verify with contributors)
AI-assisted development tools were used in implementing and testing parts of the game, including code, interface, scoring diagnostics, and documentation. Team members reviewed the mechanics and NASA source references and conducted manual gameplay testing. No claim is made that AI-generated gameplay outcomes represent real NASA mission calculations. **Confirm with Emir and Hamza whether and how they used AI before submitting a statement on behalf of the entire team.**
