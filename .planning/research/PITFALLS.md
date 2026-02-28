# Domain Pitfalls: Sudoku Apps

**Domain:** Sudoku Puzzles
**Researched:** 2024-10-24

## Critical Pitfalls

### Pitfall 1: Generating Unsolvable or Multi-Solution Puzzles
**What goes wrong:** Randomly removing numbers from a grid can lead to a puzzle with multiple solutions or no logical path forward.
**Why it happens:** Sudoku generation requires a solver to verify uniqueness after each number removal.
**Consequences:** High player frustration when logical deduction fails.
**Prevention:** Use a reputable library (`sudoku-puzzle`, `sudoku-core`) that guarantees single-solution generation.

### Pitfall 2: Re-render Performance Bottleneck
**What goes wrong:** Tapping a number to highlight its instances causes the whole grid to lag.
**Why it happens:** React re-rendering 81 complex cells (each with nested 3x3 pencil marks) can hit the 16ms frame limit on mobile.
**Consequences:** UX feels sluggish and "heavy".
**Prevention:** Use specialized state management (Zustand/Signals) with precise selectors to only re-render the cells that *actually* change state. Use `memo` on `SudokuCell`.

## Moderate Pitfalls

### Pitfall 1: Stale Pencil Marks
**What goes wrong:** Player places a "5" in a cell, but they previously marked "5" as a candidate in other cells in that row.
**Prevention:** Implement "Auto-Update Notes" by default (or as a toggle) to automatically clean up related candidates.

### Pitfall 2: Lack of Mobile Consideration
**What goes wrong:** Sudoku grids are dense and digits are small. Fingers can easily mis-tap.
**Prevention:** Use a large, thumb-friendly `NumberPad` instead of clicking individual small buttons inside the cells. Provide clear haptic feedback (on mobile) and visual confirmation (active state).

## Minor Pitfalls

### Pitfall 1: Non-Standard Difficulty Scaling
**What goes wrong:** "Hard" is too easy, or "Easy" requires advanced logic (e.g., X-Wing).
**Prevention:** Rely on libraries that categorize difficulty by the *techniques* required to solve them, not just the number of empty cells.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Core Grid | 81-cell re-render lag. | Memoize `SudokuCell` and use atomic state selectors. |
| Pencil Notes | Managing nested Set state. | Use `Immer` within the store for easier state mutations. |
| Logic Engine | Blocking the main thread. | If using a heavy backtracking solver, run it in a Web Worker. |

## Sources

- [Common Sudoku Implementation Mistakes (Dev.to)](https://dev.to/vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGHbAkCTAtByw7FgHQTyx1epHmZWdJCETgM1BoRARBhz2yom1FIwH2ZdA7ID9tQQIAf1T8iMo6zNc9bCdlAQbFbNqfsRBvbOgwoD9_GkkIhVRYT4Hey7ai3856attL4iOb4eOLRCIMipSe3wnTRIqF2VSmjARV_E2iE0fQfdEEXOEzcjRNXL4SHvhyzZcGJaxS136Cff8ptT2BZf04oMfB2-7Eg6VGfc5aVM6aMVhpq)
- [Performance Optimization in React Grids](https://react.dev/learn/render-and-commit)
