# Architecture Patterns: Sudoku App

**Domain:** Sudoku Engine & Grid UI
**Researched:** 2024-10-24

## Recommended Architecture

The system should follow a centralized "Game State" pattern using Zustand. The grid is an 81-cell array (or 9x9 nested array), with each cell containing its value, pencil marks, and status (fixed, correct, error).

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `GameContainer` | State initialization, Undo/Redo logic. | Zustand Store |
| `SudokuGrid` | Rendering the 9x9 layout, handling 3x3 block borders. | `SudokuCell` |
| `SudokuCell` | Displaying digit or pencil marks, handling selection. | Zustand Store |
| `NumberPad` | Input for digits and toggling "Note Mode". | Zustand Store |
| `LogicEngine` | Non-UI logic for validation and hints (via library). | Zustand Store |

### Data Flow

1.  **User Input:** User taps a cell (Selection state changes).
2.  **Number Action:** User taps a digit on `NumberPad`.
3.  **State Update:** Zustand store updates the cell value (or toggles a pencil mark).
4.  **Auto-Logic:** Store triggers "Auto-Update Notes" to remove that digit from the row/col/box.
5.  **Re-render:** Affected cells re-render.

## Patterns to Follow

### Pattern 1: Normalized Grid State
Instead of just a 2D array of numbers, use objects to track metadata (fixed, notes, coloring).

```typescript
type Cell = {
  value: number | null;
  fixed: boolean; // Pre-filled by generator
  notes: Set<number>; // Pencil marks
  error: boolean;
  highlighted: boolean;
};

type SudokuStore = {
  grid: Cell[];
  setCell: (index: number, val: number) => void;
  toggleNote: (index: number, val: number) => void;
  // ...
};
```

### Pattern 2: Multi-Pass Validation
1.  **Instant Validation:** Check if the number already exists in its row/col/box (simple Set check).
2.  **Solved Validation:** Once the board is full, use the library solver to ensure it matches the unique solution.

## Anti-Patterns to Avoid

### Anti-Pattern 1: React Context for Grid State
**Why bad:** Updating a single cell in an 81-cell grid using Context will re-render the *entire* grid unless heavily memoized.
**Instead:** Use Zustand with selective selectors (`useStore(state => state.grid[42])`) so only the changed cell re-renders.

### Anti-Pattern 2: Prop Drilling Selection State
**Instead:** Keep `selectedCellIndex` in the global store. Cells can check `isSelected = useStore(s => s.selectedCellIndex === myIndex)`.

## Scalability Considerations

| Concern | MVP (10 users) | Growth (10K users) | High Load |
|---------|--------------|--------------|-------------|
| Logic Processing | In-browser solver. | Web Worker for generation. | Server-side validation (optional). |
| Offline | LocalStorage saving. | PWA / IndexDB for multiple saved games. | Sync across devices (Cloud). |

## Sources

- [Zustand Performance Best Practices](https://github.com/pmndrs/zustand)
- [React Sudoku Grid Architectures (GitHub search)](https://github.com/topics/sudoku-react)
