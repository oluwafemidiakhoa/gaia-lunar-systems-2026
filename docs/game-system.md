# Game System v1: "The First Night"

**Owner:** Emir (Game Systems Lead) · **Status:** first version for team review

**AI use:** drafted with Claude (AI assistant) from Emir's design and reviewed by Emir.

This is the rule set for one complete lunar mission. Everything here is a game-model choice unless it is marked as NASA-based. Numbers are a starting point and will be tested and tuned during the event.

---

## The mission in one paragraph
No human has ever spent a full night on the Moon. A lunar night lasts about 15 Earth days and gets colder than −170 °C. The crew lands at the lunar equator at sunrise and has to keep the crew and the base safe for 30 days, until the Sun rises again.

**Scope:** Moon only, one site (equator), ages 7–12.

---

## 1. Resources and starting values

The model keeps **6 hidden bars** (0–10). The player sees **3 gauges**:

| Gauge the player sees | What is inside | How it is shown |
|---|---|---|
| **CREW** | Crew | Crew bar |
| **BASE** | Base + Spare parts | Average of the two |
| **SUPPLIES** | Water + Oxygen + Power | Average of the three |

| Hidden bar | Start | Shown inside gauge |
|---|---|---|
| Crew | 10 | **CREW** |
| Base | 10 | **BASE** (average of Base + Spare parts) |
| Spare parts | 6 | **BASE** |
| Power | 6 | **SUPPLIES** (average of Water + Oxygen + Power) |
| Water | 6 | **SUPPLIES** |
| Oxygen | 6 | **SUPPLIES** |

Why supplies start at 6, not 10: sending mass to the Moon is expensive, so the base starts half full.

**What the player sees**

- Turns 1–3: the 3 gauges, each with a short line saying what is inside it.
- **Warning:** if any hidden bar inside a gauge drops below 4, a red line appears, e.g. "Power very low!" The gauge still shows the average.
- **Turn 4:** the BASE gauge opens into its two parts (Base health, Spare parts) and the win rule is repeated, so the player can react before the last two decisions.
- Numbers are never shown. The player reads the bars.

### Automatic changes every turn (each turn = 5 days)
| Phase | Turns | Change |
|---|---|---|
| Day | 1–3 | Power +1 · Crew −1 |
| Night | 4–6 | Power −2 · Water −1 · Oxygen −1 · Base −1 · Crew −1 |

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

**Turn 5: two choices**, both risky (see Events). **Turn 6: final decision**, two choices.

No choice is free. This follows the challenge note: "Avoid designing a 'safe' choice that has no cost."

---

## 3. How decisions change resources

| Turn | Risk (target / cost) | Safe | Invest (cost now → later, 50%) |
|---|---|---|---|
| 1 | Crew +1, target −3 (temptation) | target −1 | cost −1 → target +2 in turn 3 |
| 2 | +2 or −2 / −1 | target −1 | cost −2 → target +3 in turn 4 |
| 3 | +2 or −3 / −1 | target −2 | cost −2 → target +3 in turn 5 |
| 4 | +2 or −2 / −1 | target −1 | cost −1 → target +2 in turn 6 |

- Risk works **50%** of the time, or **70%** if the right specialist is on the crew.
- Invest pays off **50%** of the time.
- These chances are a starting point and will be tuned by testing.

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

### Turn 2: space weather (NASA DONKI)
The game takes a real event from NASA's DONKI database. The **event type** decides the card. The card shows the real event ("REAL NASA DATA · date · type · class"). The effect on the bars is a game rule, not a NASA claim.

| DONKI event | Card | Target / cost | Specialist |
|---|---|---|---|
| Solar Energetic Particles (SEP) | "Particles are here!" Hide in the shelter or not | Crew / Oxygen | Doctor |
| Solar Flare (FLR) | "A flash on the Sun!" Particles may follow in 20–30 min, or not at all. Finish the outside job or come in | Power / Crew | Field specialist |
| Coronal Mass Ejection (CME) | "A giant cloud is coming!" It may arrive in less than a day or in a few days. Cover the base with Moon soil | Base / Spare parts | Engineer |

If DONKI has no recent event or cannot be reached, the game uses a short list of real past events, still labeled as real data with their dates.

### Turn 4: random problem pool (each tied to a NASA technology gap)
| Card | NASA gap | Target / cost | Specialist |
|---|---|---|---|
| Dust on the panels | #0801 Lunar dust | Power / Crew | Field specialist |
| The battery is leaking power | #0901 Surface power and energy storage | Power / Spare parts | Field specialist |
| Germs in the water | #0303 Water storage after dormancy | Water / Power | Scientist |
| Too much on one cable | #0903 Power distribution | Base / Power | Engineer |
| The computer keeps crashing | #0201 Extreme-environment electronics | Base / Spare parts | Engineer |

NASA gap IDs are from NASA's Moon to Mars Architecture technology gaps (Revision C, 2025).

### Turn 5: crisis or opportunity
- **Crisis:** if any hidden bar is below 4, a crisis comes for the lowest one. The player's earlier choices created it.
- **Opportunity:** if nothing is below 4.

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

| Specialist | Protects |
|---|---|
| Doctor | Crew |
| Engineer | Base, Spare parts |
| Field specialist | Power (works outside: panels, batteries) |
| Scientist | Water, Oxygen |

With only two seats, something is always unprotected.

---

## 6. Success and failure

- **Mission over:** Crew reaches 0 at any time.
- **Win:** after the final decision, **Crew ≥ 5 and Base ≥ 5**. The crew sees the sunrise on day 30.
- **Lose:** otherwise.

---

## 7. Game progression and result

**Progression:** briefing → pick 2 specialists → 6 turns → final decision → debrief.

**Result:** win or lose. No score. The player can replay with a different crew or different choices; the random cards and the real space weather make each game different.

### Debrief: how it is built
We do not write a separate text for every possible game. The debrief is assembled from small pieces:

1. **The game keeps a log.** For each turn it saves: the card, the player's choice, whether it worked, and which bars went up or down.
2. **Turn lines come from the cards.** Every choice already has a short result sentence (e.g. "Hot showers used a lot of power."). The debrief lists the turns that mattered most: the biggest drop, the turn that caused the turn-5 crisis, and the final choice.
3. **The opening sentence comes from a small list,** picked by how the game ended:

| How it ended | Opening sentence |
|---|---|
| Win | "You saw the sunrise! Your crew made it through the night." |
| Lost: Crew too low | "The crew got too tired and cold to keep going." |
| Lost: Base too low | "The base was too damaged to survive the last night." |
| Lost: Crew reached 0 early | "The mission had to end early. The crew could not go on." |

4. **One tip,** picked from the bar that caused the trouble. For example, if Power caused the crisis: "Next time, try saving daytime power for the night."

So the writing work is: one result sentence per choice (already part of each card), 4 opening sentences, and one tip per bar (6 tips).

---

## How we will check the balance
- A player who always plays safe should never win.
- A fixed, memorized plan should not be a reliable way to win.
- A player who reads the bars and picks the right specialist should win most of the time, but not always.

The exact numbers will be tuned with a simulation and with Hamza's playtesting.
