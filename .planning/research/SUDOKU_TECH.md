# Sudoku Tech Research: Generation & Solving

**Domain:** Sudoku Libraries (React-compatible)
**Researched:** 2024-10-24

## Modern Sudoku Libraries (2024)

| Library | Link | Key Features | Performance / Use Case |
| :--- | :--- | :--- | :--- |
| **`sudoku-puzzle`** | [npm](https://www.npmjs.com/package/sudoku-puzzle) | ESM support, 9x9/16x16 grids, 5 levels of difficulty, validation. | **Recommended for modern React apps.** Released June 2024. Very clean API. |
| **`sudoku-core`** | [npm](https://www.npmjs.com/package/sudoku-core) | Step-by-step solving, board analysis, logic technique identification. | **Best for "Hint" systems.** Can tell the user *why* a move is possible (e.g., "Naked Pair"). |
| **`sudoku-pro`** | [npm](https://www.npmjs.com/package/sudoku-pro) | Minimalist, library-first design. | Solid alternative for simple generation and board manipulation. |
| **`fast-sudoku-solver`** | [npm](https://www.npmjs.com/package/fast-sudoku-solver) | Highly optimized backtracking with constraint propagation. | Best for server-side generation or bulk puzzle analysis. |

### Implementation Details: `sudoku-puzzle` (React + TypeScript)

```tsx
import { generateSudoku, solveSudoku, isBoardValid } from 'sudoku-puzzle';

// Generate a 9x9 puzzle with difficulty level 2
const grid = generateSudoku(9, 2);

// Check if a move is valid without revealing the solution
const isValid = isBoardValid(grid);
```

## "Smart Pencil-Note Assistance" Implementation

### Core Logic: Auto-Update
The "Smart" part of pencil-notes is usually an **Auto-Update** function triggered on every digit placement.

```typescript
function updatePencilMarks(grid, cellIndex, placedValue) {
  const { row, col, box } = getRelatedCells(cellIndex);
  [...row, ...col, ...box].forEach(idx => {
    grid[idx].notes.delete(placedValue);
  });
}
```

### Advanced Assistance: Snyder Mode
*   **Logic:** Only auto-populate candidates for a number if it appears exactly twice in a 3x3 box.
*   **Implementation:** Requires a "Box-first" scanning algorithm after every placement to check candidate counts within the box.

## Solving Strategies & Performance
For a smooth React UI, the solver should only be called once during puzzle generation. Subsequent validation should be done by checking against the **cached solution**.

1.  **Generate:** `solution = solveSudoku(initialGrid)`.
2.  **Move:** `isValid = currentMove === solution[index]`.
3.  **Conflict Check:** Standard row/col/box scan (O(27)) is faster than re-running the solver.

## Confidence: HIGH
The ecosystem for Sudoku logic is mature. Modern libraries provide stable ESM/TS support suitable for any React project.

## Sources
- [npm - sudoku-puzzle (v1.0.1+)](https://www.npmjs.com/package/sudoku-puzzle)
- [npm - sudoku-core](https://www.npmjs.com/package/sudoku-core)
- [GitHub - m-p-m/sudoku-puzzle](https://github.com/m-p-m/sudoku-puzzle)
