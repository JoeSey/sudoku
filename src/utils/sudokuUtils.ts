import { generateSudoku, isBoardValid } from 'sudoku-puzzle';
import { Cell, Difficulty } from '../types';

export const difficultyToComplexity: Record<Difficulty, number> = {
  easy: 4,
  medium: 5,
  hard: 6,
  expert: 7,
};

export const createGridFrom2D = (board: number[][]): Cell[] => {
  const grid: Cell[] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      grid.push({
        value: val === 0 ? null : val,
        fixed: val !== 0,
        notes: [],
      });
    }
  }
  return grid;
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

export const generateNewPuzzle = (difficulty: Difficulty): Cell[] => {
  const complexity = difficultyToComplexity[difficulty];
  const board = generateSudoku(9, complexity);
  return createGridFrom2D(board);
};

export const checkBoardValidity = (grid: Cell[]): boolean => {
  const board = gridTo2D(grid);
  return isBoardValid(board);
};
