# Requirements: Sudoku

## 1. Project Overview
A modern React-based Sudoku application focusing on a fluid, smart solving experience.

## 2. Traceability Matrix

| ID | Requirement | Status | Phase |
| --- | --- | --- | --- |
| PH1-01 | Initialize React + TypeScript + Zustand environment | [x] | Phase 1 |
| PH1-02 | Set up the basic 9x9 grid data structure in Zustand | [x] | Phase 1 |
| PH1-03 | Integrate `sudoku-puzzle` for puzzle generation and validation | [x] | Phase 1 |
| PH1-04 | Implement a basic grid UI without interactive solving yet | [x] | Phase 1 |
| PH1-05 | Performance: Selective re-rendering for 81 cells | [x] | Phase 1 |
| PH1-06 | Project Structure & Core Types | [x] | Phase 1 |
| PH2-01 | Cell selection logic (mouse and keyboard) | [x] | Phase 2 |
| PH2-02 | Grid navigation (arrows, Tab skip fixed) | [x] | Phase 2 |
| PH2-03 | Number input (keyboard and keypad) | [x] | Phase 2 |
| PH2-04 | Visual highlights (crosshair, identical) | [x] | Phase 2 |
| PH2-05 | Conflict detection (immediate/manual) | [x] | Phase 2 |
| PH3-01 | Toggle mode between "Input" and "Note" | [x] | Phase 3 |
| PH3-02 | Mini-grid layout for pencil notes (3x3 fixed position) | [x] | Phase 3 |
| PH3-03 | Smart Auto-Update (auto-cleanup candidates) | [x] | Phase 3 |
| PH3-04 | Multi-cell selection & bulk updates | [x] | Phase 3 |
| PH4-11 | Pie-chart keypad buttons showing digit progress | [x] | Phase 4.5 |
| PH4-12 | Auto-Notes and Erase All Notes features | [x] | Phase 4.5 |
| PH4-13 | Zen highlights for identical values and related pencil notes | [x] | Phase 4.5 |
| PH4-14 | Optimized mobile responsiveness (scaling, touch-action) | [x] | Phase 4.5 |
| PH4-15 | Double-tap on single pencil mark to fill final value | [x] | Phase 4.5 |
| PH4-16 | Undo/Redo functionality (keyboard & UI buttons) | [x] | Phase 4.5 |

## 3. Functional Requirements
### 3.1 Puzzle Generation
- **Difficulty Levels:** Support for Easy, Medium, Hard, and Expert.
- **Unique Solutions:** All puzzles must have exactly one solution.
- **Generation:** Leverage `sudoku-puzzle` for puzzle generation and validation.

### 3.2 Solving Interface
- **Grid Layout:** 9x9 grid with clear block boundaries (3x3 sub-grids).
- **Number Entry:** Input numbers via keyboard (1-9) or on-screen keypad.
- **Pencil Notes:**
  - **Manual Mode:** Toggle pencil notes manually.
  - **Smart Assistance:** Automatic removal of conflicting pencil notes when a number is placed.
  - **Fixed-Position Layout:** 3x3 mini-grid for pencil notes within each cell.
- **Visual Feedback:**
  - Highlight selected cell, row, column, and sub-grid.
  - Highlight all instances of the selected number.
  - Indicate conflicts (duplicate numbers in row, column, or block).
  - Clear distinction between pre-filled numbers and user-entered numbers.

### 3.3 Game Management
- **Timer:** Track solve time from start to completion.
- **Game State:** Auto-save current game progress to LocalStorage.
- **Fastest Times:** Record and display personal bests per difficulty level.
- **New Game:** Generate a new puzzle at any time with a difficulty selection.
- **Reset:** Clear all user input and restart the current puzzle.

## 4. Non-Functional Requirements
- **Performance:** Ensure high-performance re-rendering using Zustand for state management.
- **Aesthetic:** "Zen Minimalism" - clean, monochromatic/modern palette, responsive design.
- **Accessibility:** Keyboard shortcuts for all major actions (1-9 for numbers, N for notes, etc.).
- **Responsiveness:** Mobile-friendly layout (adapted keypad and grid sizing).

## 5. Technical Stack
- **Framework:** React (TypeScript)
- **State Management:** Zustand
- **Puzzle Engine:** `sudoku-puzzle`
- **Logic Analysis:** `sudoku-core` (for potential hint system)
- **Styling:** Vanilla CSS (Modern CSS features like Flexbox/Grid)

## 6. Success Criteria
- Users can reliably generate and solve Sudoku puzzles of various difficulties.
- Smart pencil-note assistance works seamlessly without performance lag.
- Fastest times are tracked correctly and persist across sessions.
- The UI feels modern, clean, and responsive.
