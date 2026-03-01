# Roadmap: Sudoku

## Phase 1: Core Engine & Scaffolding
**Goal:** Establish the React/Zustand foundation and integrate the Sudoku generation library.
**Requirements:** [PH1-01, PH1-02, PH1-03, PH1-04, PH1-05, PH1-06]
- [x] Initialize React + TypeScript + Zustand environment. [PH1-01]
- [x] Set up the basic 9x9 grid data structure in Zustand. [PH1-02]
- [x] Integrate `sudoku-puzzle` for puzzle generation and validation. [PH1-03]
- [x] Implement a basic grid UI without interactive solving yet. [PH1-04]
- [x] Performance: Selective re-rendering for 81 cells. [PH1-05]
- [x] Project Structure & Core Types. [PH1-06]
- [x] **Verification:** Generate a puzzle and verify it displays correctly in the terminal/UI.

**Plans:** 2 plans

Plans:
- [x] 01-01-PLAN.md — Scaffolding & State management
- [x] 01-02-PLAN.md — Basic Grid UI implementation

## Phase 2: Solving Interface & Basic Interactions
**Goal:** Enable users to select cells, input numbers, and see basic feedback.
**Plans:** 3 plans

Plans:
- [x] 02-01-PLAN.md — Selection Logic & Grid Warp Navigation
- [x] 02-02-PLAN.md — Number Input & Visual Highlights
- [x] 02-03-PLAN.md — Conflict Detection

- [x] Cell selection logic (mouse and keyboard).
- [x] Keyboard input (1-9) for placement.
- [x] Highlight active cell, row, column, and block.
- [x] Highlight all instances of the same number across the grid.
- [x] Conflict detection (duplicate values).
- [x] **Verification:** Manually solve a simple puzzle and confirm all highlights/conflicts work.

## Phase 3: Smart Pencil Notes & Fluidity
**Goal:** Implement the "Smart Assistance" features that differentiate the app.
**Plans:** 3 plans

Plans:
- [x] 03-01-PLAN.md — Note Mode & Fixed-Position Visualization
- [x] 03-02-PLAN.md — Multi-Cell Drag Selection
- [x] 03-03-PLAN.md — Smart Cleanup & Bulk Operations

- [x] Toggle mode between "Input" and "Note".
- [x] Mini-grid layout for pencil notes (3x3 fixed position).
- [x] Smart Auto-Update: Remove candidates from row/col/block when a number is placed.
- [x] Multi-cell note selection (if applicable).
- [x] **Verification:** Place a '5' in a cell and verify all other '5' notes in its block are automatically removed.

## Phase 4: Game Management & Persistence
**Goal:** Add polish with a timer, difficulty levels, and LocalStorage.
**Requirements:** [PH4-01, PH4-02, PH4-03, PH4-04, PH4-05, PH4-06, PH4-07, PH4-08, PH4-09, PH4-10]

- [x] Game timer and solved-state detection. [PH4-01, PH4-02]
- [x] Difficulty selection menu (New Game dialog). [PH4-03]
- [x] LocalStorage integration for auto-save and personal bests. [PH4-04, PH4-05]
- [x] "Zen Minimalism" UI styling and animations. [PH4-06]
- [x] Mistake counter and auto-pause behavior. [PH4-07, PH4-08, PH4-09]
- [x] Symmetry Toggle placeholder. [PH4-10]
- [x] **Verification:** Close the browser, reopen, and ensure the game state and timer are preserved.

**Plans:** 3 plans

Plans:
- [x] 01-01-PLAN.md — State management & persistence
- [x] 02-02-PLAN.md — Timer logic & auto-pause behavior
- [x] 03-03-PLAN.md — New Game flow & Zen styling

## Phase 4.5: Modern UI/UX Enhancements
**Goal:** Refine the user experience with advanced visual feedback and mobile optimizations.
**Requirements:** [PH4-11, PH4-12, PH4-13, PH4-14, PH4-15]
- [x] Pie-chart keypad buttons showing digit progress. [PH4-11]
- [x] Auto-Notes and Erase All Notes features. [PH4-12]
- [x] Zen highlights for identical values and related pencil notes. [PH4-13]
- [x] Optimized mobile responsiveness (scaling, touch-action). [PH4-14]
- [x] Double-tap on single pencil mark to fill final value. [PH4-15]
- [x] Undo/Redo functionality (keyboard & UI buttons). [PH4-16]
- [x] **Verification:** Verify all new features on both desktop and mobile layouts.

## Phase 5: Advanced Features & Logic Trainer (Optional)
**Goal:** Add "Smart Hints" and explain solving patterns.
- [ ] Integrate `sudoku-core` for logic analysis.
- [ ] "Hint" button that highlights a logical deduction (e.g., Naked Pair).
- [ ] "Zen Mode" toggle for extra minimalist focus.
- [ ] **Verification:** Use the hint system to find a hidden triple and verify the explanation.
