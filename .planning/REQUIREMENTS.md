# Requirements: Sudoku

## 1. Project Overview
A modern React-based Sudoku application focusing on a fluid, smart solving experience.

## 2. Functional Requirements
### 2.1 Puzzle Generation
- **Difficulty Levels:** Support for Easy, Medium, Hard, and Expert.
- **Unique Solutions:** All puzzles must have exactly one solution.
- **Generation:** Leverage `sudoku-puzzle` for puzzle generation and validation.

### 2.2 Solving Interface
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

### 2.3 Game Management
- **Timer:** Track solve time from start to completion.
- **Game State:** Auto-save current game progress to LocalStorage.
- **Fastest Times:** Record and display personal bests per difficulty level.
- **New Game:** Generate a new puzzle at any time with a difficulty selection.
- **Reset:** Clear all user input and restart the current puzzle.

## 3. Non-Functional Requirements
- **Performance:** Ensure high-performance re-rendering using Zustand for state management.
- **Aesthetic:** "Zen Minimalism" - clean, monochromatic/modern palette, responsive design.
- **Accessibility:** Keyboard shortcuts for all major actions (1-9 for numbers, N for notes, etc.).
- **Responsiveness:** Mobile-friendly layout (adapted keypad and grid sizing).

## 4. Technical Stack
- **Framework:** React (TypeScript)
- **State Management:** Zustand
- **Puzzle Engine:** `sudoku-puzzle`
- **Logic Analysis:** `sudoku-core` (for potential hint system)
- **Styling:** Vanilla CSS (Modern CSS features like Flexbox/Grid)

## 5. Success Criteria
- Users can reliably generate and solve Sudoku puzzles of various difficulties.
- Smart pencil-note assistance works seamlessly without performance lag.
- Fastest times are tracked correctly and persist across sessions.
- The UI feels modern, clean, and responsive.
