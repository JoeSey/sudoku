# Phase 5 Research: Advanced Features & Logic Trainer

## Overview
Phase 5 aims to implement a "Logic Trainer" and a "Zen Mode". The core challenge is integrating a logic engine that can identify human-solving techniques (Naked Pairs, X-Wings, etc.) and explain them visually.

## Logic Engine Candidates

### 1. `sudoku-core` (komeilmehranfar)
- **Status**: Available on NPM.
- **Pros**:
  - TypeScript support.
  - Provides a `hint()` function that returns the next step.
  - Includes difficulty analysis and used strategies (e.g., "Naked Single", "Hidden Single").
  - Step-by-step solving returns a list of logical moves.
- **Cons**:
  - Explanations are mostly titles (e.g., "Naked Pair"). We'll need to map these to human-friendly descriptions and animations.
  - Mapping specific steps to their "reason" cells might require manual work if the library only returns the target cell/value.

### 2. `SudokuLab` (weiawesome/SudokuLab)
- **Status**: GitHub repository (Modern TS/React).
- **Pros**:
  - Gold standard for teaching logic.
  - Specifically designed for "Human-style" explanations.
  - Implements modular strategies (Naked Single to advanced logic).
- **Cons**:
  - Might not be as easy to integrate as a standard NPM package. We might need to port the core logic or use it as a submodule.

### 3. Custom Logic Wrapper
- We can use `sudoku-core` as the engine and build a "Logic UI Layer" that:
  - Takes the strategy name (e.g., "Naked Pair").
  - Identifies the cells involved (the "causes") and the target cell (the "effect").
  - Triggers the animated strike-throughs for eliminated candidates.

## Zen Mode Implementation
- **State**: `isZenMode` toggle in `useGameStore`.
- **UI**:
  - Conditional rendering in `GameInfo` (hide timer/mistakes).
  - Conditional rendering in `Keypad` (hide pie-charts).
  - Disable visual highlights (selection/conflicts) in `SudokuGrid` and `SudokuCell` based on `isZenMode`.
- **Activation**: A minimalist "Zen" button near the timer.

## Technical Strategy
1. **Install `sudoku-core`**: Use it for the primary logic analysis.
2. **Hint UI Layer**:
   - Create a `HintService` or utility that calls `sudoku-core.hint()`.
   - If `sudoku-core` identifies a strategy, we'll implement a visual "Walkthrough" for the top 5 techniques (Naked Single, Hidden Single, Pointing Pairs, Naked Pair, Naked Triple).
3. **Animations**: Use Framer Motion or simple CSS for the candidate strike-throughs.
4. **State Persistence**: Update `bestTimes` to include `isAssisted: boolean` when a logic hint is used.

## Next Steps
- Implement `isZenMode` and its UI effects.
- Integrate `sudoku-core` and prototype the first "Naked Single" hint.
- Build the progressive disclosure Hint UI (Label -> Explain More -> Action).
