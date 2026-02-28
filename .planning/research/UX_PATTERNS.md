# Sudoku UX & UI Patterns Research

**Domain:** Modern Sudoku App Design
**Researched:** 2024-10-24

## Modern, Clean UI Patterns

### 1. Zen Minimalism
*   **Palette:** High-contrast monochromatic (e.g., charcoal bg, soft-gray lines, indigo active state).
*   **Spacing:** Use increased padding between the 3x3 "boxes" to help with visual chunking.
*   **Borders:** Use varying border-weights (thick for boxes, thin for cells) to clarify the 9x9 structure.

### 2. "True Black" Dark Mode
*   Essential for OLED screens.
*   Avoid pure white text; use soft grays to reduce glare during long sessions.

### 3. Micro-Interactions
*   **Pulse Animation:** A subtle pulse when a number is placed correctly.
*   **Shake Animation:** A gentle horizontal shake if an invalid digit is entered.
*   **Fade Transitions:** Smooth fade-in/out for pencil marks when they are auto-updated.

## Smart Pencil-Note Assistance (UX)

### 1. The Fixed-Position Rule
Notes should always be in a 3x3 grid within each cell.
*   `1` is top-left, `2` is top-center, `3` is top-right.
*   This enables **pattern recognition** (e.g., "the top-right is filled") which is faster than reading the digit.

### 2. Candidate Highlighting
*   **Focus Mode:** Tapping a digit (e.g., "5") should highlight every cell containing a "5" (both filled and notes).
*   **Axis Highlighting:** Selecting a cell should faintly tint its entire row, column, and box.

### 3. Input Modes
| Mode | How it Works | Best For |
| :--- | :--- | :--- |
| **Cell-First** | Select cell → Select digit | Casual play, small screens. |
| **Digit-First** | Select digit → Tap multiple cells | Bulk filling, note placement ("Paint Mode"). |
| **Snyder Mode** | Marks only 2 candidates per box. | Speed solving / Advanced enthusiasts. |

## Feature Best-in-Class: Good Sudoku (Zach Gage)
Considered the benchmark for modern Sudoku UX:
1.  **Removing the "Busy Work":** Use "Auto-Fill All Possible Candidates" as a toggle.
2.  **Mistake Visualization:** Don't just show a red "X"; show why it's a mistake (highlight the conflicting cell).
3.  **Logical Teaching:** If a player is stuck, highlight the logical pattern (e.g., Naked Triple) they should look for.

## Key Recommendations
*   Implement a **"Smart Mode"** toggle that handles auto-update and auto-hinting.
*   Prioritize **Accessibility** with high-contrast text and keyboard navigation (arrow keys for cell selection).

## Sources
*   [Good Sudoku (Zach Gage)](https://www.vice.com/en/article/sudoku-good-sudoku-zach-gage/)
*   [Dribbble - Modern Sudoku Interfaces](https://dribbble.com/search/sudoku-game)
*   [NYT Sudoku App (UX Reference)](https://www.nytimes.com/puzzles/sudoku)
