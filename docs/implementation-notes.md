# Implementation notes — First Night MVP

This implementation is an educational prototype based on Emir's proposed game-system v1, with provisional changes discussed during team review.

## Model boundaries
- Six five-day turns, lunar equator, two specialists, and resource gauges.
- Doctors prevent fatigue on turns 3 and 5 (provisional v2 mechanic).
- Three main choices; two choices in final turn.
- Decision-quality score is assigned from pre-decision resource levels, not the random outcome.
- The 1,000-point total is normalized from turns played; explanatory scoring is intentionally simplified.
- The event descriptions, effects, chances, and mission results are fictional educational mechanics.
- The space-weather event is **simulated**, not a live NASA DONKI observation. Do not label it as real event data.
- The base and crew thresholds are game rules, not lunar-habitat safety limits.

## Still needed before scientific release
- Verify all NASA gap identifiers and corresponding source documents.
- If adding DONKI, display actual event timestamp, source link, and distinguish observation from simulated effects; provide an offline fallback with truthful labels.
- Run scenario balance simulation and youth usability testing; thresholds and score weights are not validated.
- Add real NASA citations on cards where the associated claims are verifiable.

## Verification
Run `npm test` using Node 20+; no packages need to be installed for the test suite.
Deploy as a static site; `index.html` imports `game-engine.js`.

## Update — 2026-11-15
- Fixed negative-resource underflow and zero-penalty cascade behavior; end-of-turn resources are bounded 0–10.
- Added regression tests for power crossing below zero and crew death.
- DONKI endpoint is a read-only observation feed. NASA API failures must leave the historical case in place, never fabricate a live observation.
- Global Awards resource-list eligibility is pending challenge-specific verification.
