# Phase 3: Smart Pencil Notes & Fluidity - Research

**Researched:** 2026-02-28
**Domain:** React, CSS Grid, Zustand, Sudoku Logic
**Confidence:** HIGH

## Summary
Phase 3 transitions the Sudoku app from a basic solver to a "smart" assistant. We will implement a 3x3 fixed-position pencil note layout within each cell, a sticky "Note Mode" with a toggle key (N) and icon, and "Smart Assistance" logic for auto-cleaning related candidates. We'll also add multi-cell selection (click & drag) for bulk adding notes.

## User Decisions (from 03-CONTEXT.md)
- **Positioning:** Fixed 3x3 Mini-Grid (e.g., '1' top-left, '5' center).
- **Empty Placeholders:** Show placeholders to maintain the 3x3 structure.
- **Transition:** Notes are "suspended" (hidden) when a final value is entered.
- **Styling:** Subtle monochromatic styling.
- **Smart Assistance:** Immediate auto-update (removing candidates from row/col/block).
- **Reversibility:** Manual restore only.
- **Conflict Prevention:** Allow all notes (even if conflicting).
- **Feedback:** Subtle visual feedback (pulse/fade) on auto-remove.
- **Multi-Cell Selection:** Click & Drag for range selection.
- **Bulk Add:** Pencil notes added to all selected cells in Note mode.
- **Mode Switching:** Toggle key (N) and Sticky mode. Pencil icon toggle/indicator.
- **Input Overrides:** No change on filled cells.

## Technical Patterns

### 1. 3x3 Fixed Mini-Grid (CSS)
```css
.notes-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 100%;
  width: 100%;
}
.note-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: #999;
}
.note-slot.empty {
  visibility: hidden;
}
```

### 2. Multi-Cell Selection (Zustand)
```typescript
interface GameState {
  selectedIndices: number[]; // Change from single index to array
  isDragging: boolean;
  // ...
  setSelection: (indices: number[]) => void;
  toggleNoteInSelection: (note: number) => void;
}
```
Implementation details:
- `onMouseDown`: Set `dragStart` and `isDragging: true`.
- `onMouseEnter`: If `isDragging`, update `dragEnd` and calculate the rectangular selection.
- `onMouseUp`: Set `isDragging: false`.

### 3. Smart Assistance (Store Action)
Update `setCellValue` to:
1. Set the value.
2. If `value` is not null:
   - Identify all related cells (row, column, block).
   - Remove `value` from their `notes` array.

### 4. Mode Switching
Add `isNoteMode: boolean` and `toggleNoteMode()` to the store.
The `N` key and the Pencil Icon will trigger `toggleNoteMode()`.

## Component Architecture Updates
- **`SudokuCell`**: Add a `PencilGrid` child component.
- **`PencilGrid`**: A 3x3 grid rendering 1-9 slots.
- **`Keypad`**: Update to show the "Note Mode" status and handle the toggle.
- **`App`**: Add global mouse up listener to handle end-of-drag outside the grid.

## Common Pitfalls
- **Performance:** Bulk updates to 81 cells can be slow. Ensure Zustand's immutable updates (Immer) are used efficiently.
- **Drag & Drop conflicts:** Ensure standard browser drag-and-drop is disabled on the grid cells.
- **Accessibility:** Ensure Arrow keys still work and potentially support Shift+Arrows for selection.
