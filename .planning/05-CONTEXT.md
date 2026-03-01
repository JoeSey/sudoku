# Phase 5 Context: Advanced Features & Logic Trainer

## Overview
Phase 5 focuses on transforming the Sudoku app into a "Logic Trainer" while providing a deep "Zen" experience. This involves a smart hint system that explains deductions and a minimalist mode for focused play.

## Logic Trainer (Smart Hints)
The hint system serves as a learning tool, prioritizing understanding over simply revealing values.

- **Interaction Flow**:
  - **Logic First**: Clicking "Hint" highlights the logical pattern (e.g., Naked Pair, X-Wing) rather than immediately filling a value.
  - **Progressive Disclosure**: Initially shows a simple label (e.g., "Naked Pair"). A "Explain More" button provides a deeper walkthrough.
  - **Animation**: Uses animated strike-throughs to show *why* certain candidates are being eliminated.
  - **Feedback**: Provides a "Pattern Solved!" toast if the user correctly identifies the logic after a hint.
- **Logic Engine**:
  - **Note Dependency**: Hints primarily work with pencil notes (manual or auto).
  - **Easiest First**: The engine prioritizes the most basic logical deductions to guide the user naturally.
  - **Fix Fallback**: If no logical pattern is found (often due to incorrect notes), the system offers to "Fix Notes" or reveals a correct value as a fallback.
- **Visuals**:
  - **Distinct Color**: Logic highlights use a new accent color (e.g., "Logic Gold" or Purple) to distinguish them from selection/conflicts.
  - **Detail**: Highlights specific pencil note numbers within cells involved in the pattern.
- **Tracking**:
  - **Assisted (A) Label**: Using a logic hint marks the game as "Assisted". This label is shown in the "New Game" and "Best Times" screens (similar to the Auto-Notes indicator).

## Zen Mode
A toggleable mode for maximum focus and minimal distraction.

- **UI Reduction**:
  - Hides the Timer and Mistake counter completely.
  - Hides the Digit Progress pie-charts on the keypad.
- **Assist Disabling**:
  - Disables "Instant Feedback" (red highlights for mistakes).
  - Disables "Selection Highlights" (row, column, and block highlights).
- **Activation**:
  - Controlled by a dedicated On/Off toggle button available during the session.

## Code & Integration Context
- **Logic Engine**: Investigate `sudoku-core` or a similar lightweight logic analyzer that can identify specific Sudoku techniques.
- **State Management**:
  - Add `isZenMode: boolean` to `useGameStore`.
  - Add `activeHint: Hint | null` to track the current logical deduction being highlighted.
  - Extend `bestTimes` or game history to include the `isAssisted` flag.
- **UI Components**:
  - Update `SudokuGrid` and `PencilGrid` to support the new logic highlight color and animations.
  - Create a `HintOverlay` or `HintExplanation` component for the progressive disclosure of logic.
  - Add the Zen Mode toggle to the main UI (likely near the Timer or Settings).

## Deferred Ideas
- (None at this time - focused on Logic Trainer and Zen Mode core).
