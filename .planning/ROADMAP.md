# Roadmap: Sudoku

## Phase 1: Core Engine & Scaffolding
**Goal:** Establish the React/Zustand foundation and integrate the Sudoku generation library.
**Requirements:** [PH1-01, PH1-02, PH1-03, PH1-04, PH1-05, PH1-06]
- [ ] Initialize React + TypeScript + Zustand environment. [PH1-01]
- [ ] Set up the basic 9x9 grid data structure in Zustand. [PH1-02]
- [ ] Integrate `sudoku-puzzle` for puzzle generation and validation. [PH1-03]
- [ ] Implement a basic grid UI without interactive solving yet. [PH1-04]
- [ ] Performance: Selective re-rendering for 81 cells. [PH1-05]
- [ ] Project Structure & Core Types. [PH1-06]
- [ ] **Verification:** Generate a puzzle and verify it displays correctly in the terminal/UI.

**Plans:** 2 plans

Plans:
- [ ] 01-01-PLAN.md — Scaffolding & State management
- [ ] 01-02-PLAN.md — Basic Grid UI implementation

## Phase 2: Solving Interface & Basic Interactions
**Goal:** Enable users to select cells, input numbers, and see basic feedback.
- [ ] Cell selection logic (mouse and keyboard).
- [ ] Keyboard input (1-9) for placement.
- [ ] Highlight active cell, row, column, and block.
- [ ] Highlight all instances of the same number across the grid.
- [ ] Conflict detection (duplicate values).
- [ ] **Verification:** Manually solve a simple puzzle and confirm all highlights/conflicts work.

## Phase 3: Smart Pencil Notes & Fluidity
**Goal:** Implement the "Smart Assistance" features that differentiate the app.
- [ ] Toggle mode between "Input" and "Note".
- [ ] Mini-grid layout for pencil notes (3x3 fixed position).
- [ ] Smart Auto-Update: Remove candidates from row/col/block when a number is placed.
- [ ] Multi-cell note selection (if applicable).
- [ ] **Verification:** Place a '5' in a cell and verify all other '5' notes in its block are automatically removed.

## Phase 4: Game Management & Persistence
**Goal:** Add polish with a timer, difficulty levels, and LocalStorage.
- [ ] Game timer and solved-state detection.
- [ ] Difficulty selection menu (New Game dialog).
- [ ] LocalStorage integration for auto-save and personal bests.
- [ ] "Zen Minimalism" UI styling and animations.
- [ ] **Verification:** Close the browser, reopen, and ensure the game state and timer are preserved.

## Phase 5: Advanced Features & Logic Trainer (Optional)
**Goal:** Add "Smart Hints" and explain solving patterns.
- [ ] Integrate `sudoku-core` for logic analysis.
- [ ] "Hint" button that highlights a logical deduction (e.g., Naked Pair).
- [ ] "Zen Mode" toggle for extra minimalist focus.
- [ ] **Verification:** Use the hint system to find a hidden triple and verify the explanation.
