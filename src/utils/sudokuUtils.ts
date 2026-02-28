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

export const areRelated = (index1: number, index2: number): boolean => {
  if (index1 === index2) return false;

  const r1 = Math.floor(index1 / 9);
  const c1 = index1 % 9;
  const b1 = Math.floor(r1 / 3) * 3 + Math.floor(c1 / 3);

  const r2 = Math.floor(index2 / 9);
  const c2 = index2 % 9;
  const b2 = Math.floor(r2 / 3) * 3 + Math.floor(c2 / 3);

  return r1 === r2 || c1 === c2 || b1 === b2;
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

