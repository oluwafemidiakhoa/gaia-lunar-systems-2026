# Decision-score diagnostic — 2026-11-15

## Purpose
Investigate youth UX tester Hamza's concern that random choices often produce high scores.

## Method
Code: `tests/score-baseline.test.js`. This runs the current game engine on six two-specialist combinations with 300 fixed-seed simulated runs per combination (1,800 runs total). Each turn selects uniformly among the available actions using a second deterministic pseudo-random sequence. Recorded values: score mean, score median, fraction with at least 700 points, fraction with exactly 1000 points, and mission win fraction.

This is **not** a model of children, not a randomized clinical or education experiment, and not proof of learning outcomes. The action-selection pseudo-randomness and environmental pseudo-randomness are reproducible but not independent empirical observations.

## Results
| Specialists | n | Mean | Median | Score >=700 (%) | Score 1000 (%) | Mission won (%) |
|---|---:|---:|---:|---:|---:|---:|
| Doctor + Engineer | 300 | 555 | 550 | 26 | 0 | 20 |
| Doctor + Field | 300 | 597 | 600 | 32 | 1 | 17 |
| Doctor + Scientist | 300 | 499 | 475 | 18 | 0 | 9 |
| Engineer + Field | 300 | 703 | 700 | 62 | 12 | 7 |
| Engineer + Scientist | 300 | 580 | 625 | 38 | 1 | 4 |
| Field + Scientist | 300 | 603 | 600 | 34 | 3 | 6 |

Source of measured outputs: [GitHub Actions run 43724083801](https://github.com/oluwafemidiakhoa/gaia-lunar-systems-2026/actions/runs/43724083801) under `GAIA_LUNAR_RANDOM_POLICY_BASELINE`. Rates are rounded percentages.

## Interpretation
- Random-choice baselines differ sharply by specialist pair, especially Engineer + Field. This is evidence of an unevenly calibrated educational rubric, not evidence of child-learning success.
- A score of 1000 can coexist with low mission survival rates, because the rubric deliberately grades decisions rather than observed outcomes.
- Hamza's three manually reported Field + Scientist scores were 700, 775, and 550, and are **not** interchangeable with this 300-run simulated baseline.

## Release recommendation
Keep the existing rule table until Emir's kid-friendly wording arrives and the team approves the calibration target. Consider reducing the apparent precision of the score, showing Good/OK/Poor by turn, and/or having players explain a decision before awarding the highest category. Do **not** arbitrarily lower points or invent new accuracy claims just to reduce perfect scores. The new click-through Mission Control display addresses reading burden independently of scoring changes.

## Verification scope
Game-engine and rendering-shell unit tests are automated. Browser interaction, focus behavior, voice-over, full accessibility, and direct playtesting with children remain unverified.
