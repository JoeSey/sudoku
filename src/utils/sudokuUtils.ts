import { Cell, Difficulty } from '../types';

// Standard Sudoku Helper Constants
const GRID_SIZE = 9;
const BOX_SIZE = 3;

/**
 * Validates if placing 'num' at 'row', 'col' is valid on 'board' (2D number array)
 */
const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
  for (let x = 0; row < GRID_SIZE && x < GRID_SIZE; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const startRow = row - (row % BOX_SIZE);
  const startCol = col - (col % BOX_SIZE);
  for (let i = 0; i < BOX_SIZE; i++) {
    for (let j = 0; j < BOX_SIZE; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
};

/**
 * Solves the board and returns the number of solutions found (capped at 2 for uniqueness check)
 */
const countSolutions = (originalBoard: number[][], limit = 2): number => {
  // Create a deep copy to avoid modifying the original board
  const board = originalBoard.map(row => [...row]);
  let solutions = 0;

  const solve = (): boolean => {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve()) {
                if (solutions >= limit) return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    solutions++;
    return solutions >= limit;
  };

  solve();
  return solutions;
};

/**
 * Fills a complete valid Sudoku board using shuffling for randomness
 */
const fillBoard = (board: number[][]): boolean => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === 0) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (const num of nums) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

/**
 * Difficulty settings mapping (Target Clue Counts)
 * Easy: 36 clues
 * Medium: 28 clues
 * Hard: 22 clues
 * Expert: 17 clues (Mathematical minimum for unique solution)
 */
const difficultyToClues: Record<Difficulty, number> = {
  easy: 36,
  medium: 28,
  hard: 22,
  expert: 17,
};

export const generateNewPuzzle = (difficulty: Difficulty, useSymmetry = true): Cell[] => {
  const targetClues = difficultyToClues[difficulty];
  let board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  let currentClues: number = 81;

  // Try generating until we get close to the target clues (max 5 full attempts)
  for (let attempt = 0; attempt < 5; attempt++) {
    const tempBoard: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillBoard(tempBoard);
    let tempClues = 81;

    const cells = Array.from({ length: 81 }, (_, i) => i).sort(() => Math.random() - 0.5);

    for (const index of cells) {
      if (tempClues <= targetClues) break;

      const r = Math.floor(index / 9);
      const c = index % 9;

      if (tempBoard[r][c] === 0) continue;

      if (useSymmetry) {
        const r2 = 8 - r;
        const c2 = 8 - c;
        const val1 = tempBoard[r][c];
        const val2 = tempBoard[r2][c2];

        tempBoard[r][c] = 0;
        tempBoard[r2][c2] = 0;

        if (countSolutions(tempBoard) === 1) {
          tempClues -= (r === r2 && c === c2) ? 1 : 2;
        } else {
          tempBoard[r][c] = val1;
          tempBoard[r2][c2] = val2;
        }
      } else {
        const val = tempBoard[r][c];
        tempBoard[r][c] = 0;
        if (countSolutions(tempBoard) === 1) {
          tempClues--;
        } else {
          tempBoard[r][c] = val;
        }
      }
    }

    if (tempClues <= currentClues) {
      board = tempBoard;
      currentClues = tempClues;
    }

    // Expert is hard to reach with symmetry, but let's try to get as low as possible
    if (currentClues <= targetClues + 1) break;
  }

  // 3. Convert to Cell array
  const grid: Cell[] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      grid.push({
        value: board[r][c] === 0 ? null : board[r][c],
        fixed: board[r][c] !== 0,
        notes: [],
      });
    }
  }
  return grid;
};

export const checkBoardValidity = (grid: Cell[]): boolean => {
  const board = gridTo2D(grid);
  // Basic check: no empty cells and unique solution count must be 1
  if (grid.some(c => c.value === null)) return false;
  return countSolutions(board) === 1;
};

export const gridTo2D = (grid: Cell[]): number[][] => {
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  grid.forEach((cell, index) => {
    const r = Math.floor(index / 9);
    const c = index % 9;
    board[r][c] = cell.value || 0;
  });
  return board;
};

export const areRelated = (index1: number, index2: number): boolean => {
  return areInSameLine(index1, index2) || areInSameBlock(index1, index2);
};

export const areInSameLine = (index1: number, index2: number): boolean => {
  if (index1 === index2) return false;
  const r1 = Math.floor(index1 / 9);
  const c1 = index1 % 9;
  const r2 = Math.floor(index2 / 9);
  const c2 = index2 % 9;
  return r1 === r2 || c1 === c2;
};

export const areInSameBlock = (index1: number, index2: number): boolean => {
  if (index1 === index2) return false;
  const r1 = Math.floor(index1 / 9);
  const c1 = index1 % 9;
  const b1 = Math.floor(r1 / 3) * 3 + Math.floor(c1 / 3);
  const r2 = Math.floor(index2 / 9);
  const c2 = index2 % 9;
  const b2 = Math.floor(r2 / 3) * 3 + Math.floor(c2 / 3);
  return b1 === b2;
};

export const areIdenticalValue = (val1: number | null, val2: number | null): boolean => {
  return val1 !== null && val1 === val2;
};

export const getConflicts = (grid: Cell[], index: number): number[] => {
  const val = grid[index].value;
  if (val === null) return [];
  const conflicts: number[] = [];
  const r = Math.floor(index / 9);
  const c = index % 9;
  const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
  for (let i = 0; i < 81; i++) {
    if (i === index) continue;
    if (grid[i].value === val) {
      const r2 = Math.floor(i / 9);
      const c2 = i % 9;
      const b2 = Math.floor(r2 / 3) * 3 + Math.floor(c2 / 3);
      if (r === r2 || c === c2 || b === b2) {
        conflicts.push(i);
      }
    }
  }
  return conflicts;
};

export const getAllConflicts = (grid: Cell[]): number[] => {
  const conflicts = new Set<number>();
  for (let i = 0; i < 81; i++) {
    const cellConflicts = getConflicts(grid, i);
    if (cellConflicts.length > 0) {
      conflicts.add(i);
      cellConflicts.forEach((idx) => conflicts.add(idx));
    }
  }
  return Array.from(conflicts);
};
