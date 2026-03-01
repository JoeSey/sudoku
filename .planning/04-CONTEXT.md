# Phase 4 Context: Game Management & Persistence

## 1. Timer & Lifecycle
- **Pause Behavior:** When the game is paused, the grid content (numbers and notes) must be **hidden** to prevent solving.
- **Auto-Pause:** The timer should automatically pause when the browser tab loses focus or is minimized.
- **Mistake Tracking:** A **mistake counter** will track invalid placements (conflicts), but there is no strike limit (no "Game Over" based on mistakes).
- **Win State:** A **subtle/minimalist celebration** (e.g., a calm "Puzzle Solved" fade-in and grid pulse) instead of loud animations.

## 2. Persistence & Records (LocalStorage)
- **Data Scope:** Persist the current game state (grid, timer, mistakes) AND a full history of **Personal Bests** (Best Time + Mistakes) for all difficulties.
- **Storage Strategy:** Use a **single active game slot** (starting a new game overwrites the previous one).
- **Migration:** If the storage format changes (version mismatch), the app should **clear all data** and start fresh.
- **PB Visibility:** Personal bests for each difficulty will be displayed within the **New Game / Difficulty Menu**.

## 3. New Game Flow
- **UI Presentation:** A **centered modal** for selecting difficulty and viewing best times.
- **Confirmation:** Only ask "Are you sure?" when starting a new game if the current board has **existing progress** (at least one cell filled).
- **Dialog Options:** The modal will include **Difficulty Selection** and a **Symmetry Toggle** (Note: Symmetry logic is a dependency to be addressed in core engine updates).
- **First-Time Load:** The app should show the **New Game Menu immediately** when a user arrives for the first time.

## 4. Visual Polish & Zen Style
- **Aesthetic:** A **Monochrome Zen** palette (primarily white, black, and grays).
- **Animations:** Use a **fast fade-in and subtle scale-up** effect when a number is placed in a cell.
- **Information Density:** The timer and mistake counter should be **always visible** on the screen.
- **Win Celebration:** A subtle fade-in message and grid animation to maintain the minimalist tone.

## 5. Code Context & Integration Points
- **Store:** Update `useGameStore.ts` to include `timer`, `isPaused`, `mistakeCount`, and `bestTimes`.
- **Middleware:** Integrate `zustand/middleware/persist` for LocalStorage sync.
- **Validation:** Leverage existing `getAllConflicts` in `sudokuUtils.ts` for the mistake counter logic.
- **Types:** Update `GameState` and `GameSettings` in `src/types/index.ts` to reflect new fields.
- **Dependencies:** The "Symmetry Toggle" requires updating the `generateNewPuzzle` utility (deferred logic).

## 6. Deferred & Future Considerations
- **Symmetry Toggle:** Logic for generating symmetric boards will be integrated into the core generator in a later refinement pass.
- **Advanced Stats:** Detailed game history (beyond PBs) is out of scope for Phase 4.
