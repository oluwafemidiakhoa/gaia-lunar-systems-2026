# Game System v2: "The First Night"

**Owner:** Emir (Game Systems Lead) · **Status:** v2, updated after team review

**AI use:** drafted with Claude (AI assistant) from Emir's design and reviewed by Emir.

This is the rule set for one complete lunar mission. Everything here is a game-model choice unless it is marked as NASA-based. Numbers are a starting point and will be tuned with Hamza's testing.

**What changed from v1**
- Exact turn order added (§3).
- Turn 1 "risk" is now clearly a temptation with no dice roll (§3).
- Doctor protects the crew on turns 3 and 5 (§5).
- Decision-quality score out of 1,000, separate from win/lose (§7).
- Mission Control review at the end, with four outcomes (§8).
- Warnings now say why a low bar is dangerous (§1).
- Clear labels for real, historical and game data (§4).

---

## The mission in one paragraph
No human has ever spent a full night on the Moon. A lunar night lasts about 15 Earth days and gets colder than −170 °C. The crew lands at the lunar equator at sunrise and has to keep the crew and the base safe for 30 days, until the Sun rises again.

**Scope:** Moon only, one site (equator), ages 7–12.

---

## 1. Resources and starting values

The model keeps **6 bars** (0–10).

| Bar | Start |
|---|---|
| Crew | 10 |
| Base | 10 |
| Spare parts | 6 |
| Power | 6 |
| Water | 6 |
| Oxygen | 6 |

Why supplies start at 6, not 10: sending mass to the Moon is expensive, so the base starts half full.

**Low and healthy.** A bar at **0–3 is low**. A bar at **4–10 is healthy**. The same line is used everywhere: warnings, the turn-5 crisis, and the score.

**Warnings.** When a bar is low, a red line names the bar and says why it matters:

| Low bar | Warning |
|---|---|
| Crew | "Crew very tired! If the crew reaches zero, the mission ends." |
| Base | "Base damaged! A broken base cannot power the systems." |
| Spare parts | "Almost no spare parts! Without them, the base slowly breaks." |
| Power | "Power very low! Without power, air and water stop being recycled." |
| Water | "Water very low! Without water, the crew gets sick." |
| Oxygen | "Oxygen very low! Without air, the crew is in serious danger." |

### Automatic changes every turn (each turn = 5 days)
| Phase | Turns | Change |
|---|---|---|
| Day | 1–3 | Power +1 · Crew −1 |
| Night | 4–6 | Power −2 · Water −1 · Oxygen −1 · Base −1 · Crew −1 |

The Doctor changes the crew loss on turns 3 and 5 (§5).

### What happens at zero (applies every turn while the bar is 0)
| Bar at 0 | Effect |
|---|---|
| Spare parts | Base −1 (nothing to repair with) |
| Base | Power −1 (systems fail) |
| Power | Oxygen −2, Water −1 (no recycling) |
| Water | Crew −2 |
| Oxygen | Crew −5 |
| **Crew** | **Mission over** |

---

## 2. Player decisions

Every event card has a **target** (the resource in danger) and a **cost** (what you pay to act).

**Turns 1–4: three choices**

| Choice | What it means |
|---|---|
| **Take a risk** | Big win or big loss on the target. Always costs something. |
| **Play safe** | Small sure loss on the target. Never free. |
| **Invest** | Pay now; it may pay off two turns later. |

**Turn 5: two choices**, both risky (see §4). **Turn 6: final decision**, two choices, no dice.

No choice is free. This follows the challenge note: "Avoid designing a 'safe' choice that has no cost."

---

## 3. How decisions change resources

| Turn | Risk (target / cost) | Safe | Invest (cost now → later) |
|---|---|---|---|
| 1 | Temptation: Crew +1, Power −3 (no dice) | Power −1 | Parts −1 → Power +2 in turn 3 |
| 2 | +2 or −2 / cost −1 | target −1 | cost −2 → target +3 in turn 4 |
| 3 | +2 or −3 / cost −1 | target −2 | cost −2 → target +3 in turn 5 |
| 4 | +2 or −2 / cost −1 | target −1 | cost −1 → target +2 in turn 6 |

- Risk works **50%** of the time, or **70%** if the right specialist is on the crew.
- Invest pays off **50%** of the time. The cost is paid when the player invests; the bonus arrives two turns later only if it paid off.
- There is no invest option on turn 5.

**Turn 1 is a temptation.** The "risk" choice on turn 1 has no dice roll. The crew enjoys the extra power (for example hot showers), so Crew +1, but the power is wasted, so Power −3. It teaches early that what feels good now can hurt later.

### Turn order (exact sequence)

Turns 1–5:
1. **Pick the card.** Turns 1 and 3 are fixed, turn 2 comes from DONKI, turn 4 is random, turn 5 checks the bars now (crisis if any bar is low, otherwise opportunity).
2. **Pay due investments.** If an investment from two turns ago paid off, its bonus is added now, before the player chooses. If there is none, nothing happens.
3. **Player chooses**, and the choice is applied (target and cost).
4. **Automatic changes** for day or night (§1), including the Doctor rule (§5).
5. **Zero rules:** every bar at 0 triggers its effect once (§1).
6. **Keep all bars between 0 and 10.**
7. **Check:** if Crew is 0, the mission is over and the game goes to Mission Control.

Turn 6 (final):
1. Pay due investments.
2. Automatic night changes.
3. Zero rules, then keep bars between 0 and 10.
4. If Crew is 0, the mission is over.
5. The player makes the final choice and it is applied. The "Power below 2" check uses Power after step 2.
6. Keep bars between 0 and 10, then check the win rule (§6).

---

## 4. Mission events and consequences

### The six turns
| Turn | Days | Type | Event |
|---|---|---|---|
| 1 | 1–5 | Temptation (fixed) | **Extra power**: easy to waste. Target Power, cost Spare parts |
| 2 | 6–10 | **Space weather (real NASA data)** | One of 3 cards, picked by a real DONKI event (below) |
| 3 | 11–15 | Known challenge (fixed) | **Night is falling**. Target Power, cost Base |
| 4 | 16–20 | Random problem | One card from the pool of 5 (below) |
| 5 | 21–25 | **Crisis or opportunity** | Depends on the player's own bars (below) |
| 6 | 26–30 | Final decision | The last night |

### Data labels
Every card shows where its information comes from:

| Label | Used for | Example |
|---|---|---|
| **REAL NASA DATA** | A recent event from NASA's DONKI database | "REAL NASA DATA · 12 Nov 2026 · Solar flare · class M2" |
| **REAL NASA DATA · past event** | A real older event, used when no recent one is available | "REAL NASA DATA · past event · 10 Sep 2017 · Solar flare · class X8" |
| **NASA problem** | A real open problem from NASA's technology-gap list | "NASA problem #0801: Lunar dust" |
| **Game rule** | How the event changes the bars | Always shown as part of the game, never as a NASA claim |

The card text always makes clear that the effect on the base is part of the game: "In the game, this is what it does to your base."

### Turn 2: space weather (NASA DONKI)
The game takes a real event from NASA's DONKI database. The **event type** decides the card. The strength is shown as information only.

| DONKI event | Card | Target / cost | Specialist |
|---|---|---|---|
| Solar Energetic Particles (SEP) | "Particles are here!" Hide in the shelter or not | Crew / Oxygen | Doctor |
| Solar Flare (FLR) | "A flash on the Sun!" Particles may follow in 20–30 min, or not at all. Finish the outside job or come in | Power / Crew | Field specialist |
| Coronal Mass Ejection (CME) | "A giant cloud is coming!" It may arrive in less than a day or in a few days. Cover the base with Moon soil | Base / Spare parts | Engineer |

If DONKI has no recent event or cannot be reached, the game uses a short list of real past events, labeled "past event" with their dates.

### Turn 4: random problem pool (each tied to a NASA technology gap)
| Card | NASA gap | Target / cost | Specialist |
|---|---|---|---|
| Dust on the panels | #0801 Lunar dust | Power / Crew | Field specialist |
| The battery is leaking power | #0901 Surface power and energy storage | Power / Spare parts | Field specialist |
| Germs in the water | #0303 Water storage after dormancy | Water / Power | Scientist |
| Too much on one cable | #0903 Power distribution | Base / Power | Engineer |
| The computer keeps crashing | #0201 Extreme-environment electronics | Base / Spare parts | Engineer |

**Source for all NASA gap numbers:** NASA, Moon to Mars Architecture, Architecture-Driven Technology Gaps, Revision C (2025): https://www.nasa.gov/wp-content/uploads/2025/12/2025-architecture-driven-technology-gaps.xlsx

### Turn 5: crisis or opportunity
- **Crisis:** if any bar is low (0–3), a crisis comes for the lowest one. If two bars tie, the order is Crew, Base, Spare parts, Power, Water, Oxygen. The player's earlier choices created it.
- **Opportunity:** if no bar is low.

Both have **two risky choices**. The right specialist matters more here: **75%** with, **35%** without.

**Crisis cards**

| Low bar | Card | NASA gap | "Go fix it" | "Hold on" |
|---|---|---|---|---|
| Power | The battery is freezing | #0901 | Target Crew · Field specialist | Target Base · Engineer |
| Water | Is the water safe? | #0304 | Target Crew · Scientist | Target Base · Engineer |
| Oxygen | Running out of air | #0601 | Target Crew · Scientist | Target Base · Engineer |
| Spare parts | Nothing left to fix with | #0502 | Target Base · Engineer | Target Base · Engineer |
| Base | The base is cracking | #0501 | Target Base · Engineer | Target Base · Engineer |
| Crew | Someone is sick | #0405 | Target Crew · Doctor | Target Base · Engineer |

- Success: target **+3**. "Go fix it" also restores the low bar **+2**.
- Failure: target **−2**.

**Opportunity card:** "A cave on the Moon" (#0805, #0301)

- Explore the cave (Field specialist): target Crew, +3 / −2
- Make the base stronger (Engineer): target Base, +3 / −2

### Turn 6: the last night
"The battery can protect the machines or the people, not both. This is a critical choice: you can lose even with no warnings."

| Choice | Effect |
|---|---|
| Shut down | Crew −2 |
| Keep the heat on | Base −2, and if Power is below 2: Crew −3 |

---

## 5. Crew specialization

The player picks **2 of 4** specialists. Each one protects certain resources. When a risky choice targets one of those, the chance goes up.

| Specialist | Protects | Extra |
|---|---|---|
| Doctor | Crew | **Crew does not drop automatically on turns 3 and 5.** The Doctor keeps the crew healthy as night falls and through the darkest days. |
| Engineer | Base, Spare parts | |
| Field specialist | Power (works outside: panels, batteries) | |
| Scientist | Water, Oxygen | |

With only two seats, something is always unprotected.

**Under testing (Hamza):** the automatic crew loss on turn 1.
- **A)** Crew −1 every turn (current rule).
- **B)** No crew loss on turn 1.

---

## 6. Success and failure

- **Mission over:** Crew reaches 0 at any time.
- **Win:** after the final decision, **Crew ≥ 5 and Base ≥ 5**. The crew sees the sunrise on day 30.
- **Lose:** otherwise.

---

## 7. Decision score (out of 1,000)

### Why we score decisions, not resources
In real space missions, good decisions don't always lead to good results. A crew can do everything right and still face a dust storm or a broken part. Another crew can take a careless risk and get lucky. We want kids to learn this difference: when to take a risk and when to play safe under real uncertainty.

So the game measures two separate things:
- **The mission result** (win or lose) shows what happened on the Moon.
- **The score** shows how well the player decided, judged only on what the player could see at that moment. Dice results never change the score.

Resources already decide win or lose, so they are not counted again in the score.

### Points
| Decision | Good | OK | Poor |
|---|---|---|---|
| Turns 1–5 (each) | 150 | 75 | 0 |
| Turn 6 (final) | 250 | – | 0 |

Maximum: 5 × 150 + 250 = **1,000**. The best score is saved on the device ("Best: 820").

### Definitions
- **Low:** a bar at 0–3. **Healthy:** 4–10.
- **Right specialist:** the specialist who protects the card's target is on the crew.
- **A better option exists:** the right specialist is on the crew (a risk has a good chance), **or** the cost bar is healthy (an investment is affordable).

### Rules
| Turn | Choice | Situation | Points | Why |
|---|---|---|---|---|
| 1 | Use the extra power (temptation) | Always | Poor | Wastes power for a short treat |
| 1 | Invest | Always | Good | Spare parts are plentiful; it may bring power later |
| 1 | Play safe | Always | OK | Small loss, but investing was better |
| 2–4 | Risk | Right specialist, cost bar healthy | Good | The specialist raises the chance, and there is enough to pay the cost |
| 2–4 | Risk | No right specialist, target low | Poor | Gambles a resource that is already scarce |
| 2–4 | Risk | Any other case | OK | Reasonable, but not the strongest choice |
| 2–4 | Play safe | Target low | Good | Protects a scarce resource |
| 2–4 | Play safe | Target healthy, no better option | OK | A small sure loss is sensible when nothing better is available |
| 2–4 | Play safe | Target healthy, a better option exists | Poor | Took a sure loss when a better choice was available |
| 2–4 | Invest | Cost bar healthy, target healthy | Good | Uses spare resources for the future |
| 2–4 | Invest | Cost bar healthy, target low | OK | The payoff comes in two turns; the target may run out first |
| 2–4 | Invest | Cost bar low | Poor | Spends a resource that is already scarce |
| 5 | Either choice | Its specialist is on the crew | Good | Used the right person in a crisis |
| 5 | "Go fix it" | Neither choice's specialist is on the crew | OK | Facing the problem beats waiting |
| 5 | "Hold on" | Neither choice's specialist is on the crew | Poor | Waited without help |
| 5 | Either choice | Its specialist is missing, but the other choice's specialist is on the crew | Poor | Did not use the specialist available |
| 6 | Final | The choice keeps Crew and Base at 5 or more | Good | No dice: this can be worked out exactly |
| 6 | Final | Both choices keep them at 5 or more | Both Good | No difference |
| 6 | Final | Neither choice does | The one leaving more Crew + Base is Good | Limits the loss |

On turn 5, when both choices have the same specialist (Spare parts and Base crises: Engineer), both count as having their specialist.

---

## 8. Game progression and Mission Control

**Progression:** briefing → pick 2 specialists → 6 turns → final decision → Mission Control review.

### What the game records
For each turn: the card, the player's choice, the bars before and after, whether the dice worked, and the decision rating (Good, OK or Poor) with its reason.

### Mission Control review
Mission Control looks at two things: **won or lost**, and **decision score high (700 or more) or low**.

| | High score | Low score |
|---|---|---|
| **Won** | "Mission Control is proud of you! Great decisions, and they paid off." | "You made it, but luck helped a lot. Look at these turns:" |
| **Lost** | "You made smart choices, but the Moon was tough this time. That happens to real crews too." | "The mission didn't make it. Here's what went wrong:" |

Below the opening line, Mission Control lists **every turn rated Poor**, using the reason from the rules table and what the player could see at that moment. For example:
- "Turn 4: your Field Specialist was on the crew, so a risk had a good chance. Playing safe cost you power for sure."
- "Turn 2: oxygen was already low and no Scientist was on the crew. Taking a risk put your air in danger."

If no turn was rated Poor, it names the turn where the dice hurt the most, to show that good choices can still go wrong.

It ends with one tip for next time, based on the bar that caused the most trouble, and the score: "Decision score: 820 / 1,000 · Best: 905".
