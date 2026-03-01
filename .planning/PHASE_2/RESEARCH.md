# Phase 2: Solving Interface & Basic Interactions - Research

**Researched:** 2026-02-28
**Domain:** React, Keyboard Events, Sudoku Interaction
**Confidence:** HIGH

## Summary
Phase 2 focuses on making the static grid interactive. We will implement cell selection, keyboard navigation (including the requested "Grid Warp"), number input (1-9), and a multi-layered highlighting system. Performance is a priority; we'll use Zustand selectors to ensure that selecting a cell or entering a number only re-renders the minimum necessary cells (~21 cells in the affected row, column, and block).

## User Decisions (from 02-CONTEXT.md)
- **Arrow Keys:** Grid Warp (e.g., Right at col 8 -> col 0).
- **Blur:** Selection persists.
- **Tab:** Skip fixed cells.
- **Re-click:** Stay selected.
- **Highlights:** Combined blend for crosshairs and identical numbers. Always-on crosshair and identical number highlights.
- **Conflicts:** Configurable (Immediate/Manual). Highlight just duplicates. Instant clear on fix. Text-only visual override (red number).
- **Input:** Stay selected on re-entry. Fixed cells are selectable. Hybrid keypad support. Toggle mode for notes.

## Technical Patterns

### 1. Roving TabIndex & Focus
To handle accessibility and keyboard navigation properly:
- The `SudokuGrid` will have a single `onKeyDown` handler.
- Only the `selectedCellIndex` will have `tabIndex={0}`. All other cells have `tabIndex={-1}`.
- When the selection moves, we manually call `.focus()` on the new cell.

### 2. Grid Warp Arithmetic
- **Right:** `(col + 1) % 9`
- **Left:** `(col - 1 + 9) % 9`
- **Down:** `(row + 1) % 9`
- **Up:** `(row - 1 + 9) % 9`

### 3. Highlight Logic (Zustand Selectors)
To avoid 81-cell re-renders, each `SudokuCell` will use a selector that returns its specific "highlight state":
```typescript
const isSelected = useGameStore(state => state.selectedCellIndex === index);
const isRelated = useGameStore(state => {
  if (state.selectedCellIndex === null) return false;
  const selRow = Math.floor(state.selectedCellIndex / 9);
  const selCol = state.selectedCellIndex % 9;
  const selBlock = Math.floor(selRow / 3) * 3 + Math.floor(selCol / 3);
  
  const myRow = Math.floor(index / 9);
  const myCol = index % 9;
  const myBlock = Math.floor(myRow / 3) * 3 + Math.floor(myCol / 3);
  
  return myRow === selRow || myCol === selCol || myBlock === selBlock;
});
const isIdentical = useGameStore(state => {
  if (state.selectedCellIndex === null) return false;
  const selValue = state.grid[state.selectedCellIndex].value;
  return selValue !== null && state.grid[index].value === selValue;
});
```

### 4. Conflict Detection
A simple utility `getConflicts(grid, index)` will return the indices of any cells in the same row, column, or block that have the same value as `grid[index]`.

## Component Architecture Updates
- **`useGameStore`**: Add `selectedCellIndex`, `setSelectedCellIndex`, `moveSelection(direction)`.
- **`SudokuCell`**: Add `onFocus`, `onKeyDown`, `onClick` handlers. Add CSS classes for `selected`, `highlight-related`, `highlight-identical`, `conflict`.

## Don't Hand-Roll
- Use `classnames` for managing the complex set of highlight classes.

## Common Pitfalls
- **Input Lag:** Ensure that the `onKeyDown` handler doesn't trigger heavy re-validation for the entire grid unless necessary.
- **Focus Loss:** When the grid is re-rendered (e.g., after `initGame`), ensure the focus is handled gracefully.
