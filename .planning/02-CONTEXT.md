# Phase 2 Context: Solving Interface & Basic Interactions

## 1. Selection & Interaction Model
- **Arrow Key Navigation:** Implement **Grid Warp** (e.g., pressing Right at column 8 jumps back to column 0 in the same row).
- **Blur Behavior:** The selected cell **Persists** (stays highlighted) when the grid loses focus (e.g., clicking on a menu or background).
- **Tab Navigation:** The `Tab` key should **Skip Fixed Cells**, moving the focus only between mutable/empty cells.
- **Selection Toggling:** Clicking an already selected cell results in **Stay Selected** (no change to selection state).

## 2. Highlighting Visual Hierarchy
- **Highlighting Priority:** When a cell matches multiple highlight criteria (e.g., same row and same number), use a **Combined Blend** (layer highlights with transparency).
- **"Identical Number" Scope:** The grid highlights matching numbers **Always** (any cell containing the "active" number, whether selected or just typed, should glow).
- **Empty Cell Selection:** The "crosshair" (row/col/box) highlights are **Always** visible when a cell is selected, regardless of whether it contains a value.
- **Conflict Visuals:** Conflicts (duplicates) **Override** other highlights for that specific cell.

## 3. Input & Keypad Behavior
- **Cell Toggling:** Re-entering the same number in a cell results in **Stay Selected** (no change/clear).
- **Fixed Cell Interaction:** Pre-filled cells are **Selectable** (they show highlights and crosshairs) but their values cannot be changed.
- **Keypad Priority:** Use a **Hybrid** approach (optimize for both physical keyboard and on-screen keypad).
- **Input Method Selection:** Switch between entering Values and Pencil Notes via a **Toggle Mode** (button-based).

## 4. Conflict Detection Experience
- **Feedback Timing:** **Configurable** in settings (allow users to choose between Immediate feedback or Manual checking).
- **Marking Scope:** Highlight **Just Duplicates** (only the specific cells containing the conflicting value).
- **Persistence:** **Instant Clear** (red marker vanishes as soon as the conflict is resolved).
- **Visual Intensity:** **Text-Only Override** (the number itself turns red, but preserves background highlights for the crosshair).

## 5. Code Context & Integration Points
- **Store:** `src/store/useGameStore.ts` needs to be updated with selection state (`selectedCellIndex`) and highlight logic.
- **Components:** `SudokuCell.tsx` will need to handle multiple CSS classes/states for the blended highlights.
- **Utilities:** Conflict detection logic in `sudokuUtils.ts` should be accessible for real-time (immediate) validation.
