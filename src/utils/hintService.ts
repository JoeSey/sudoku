import { hint, Board, SolvingResult } from 'sudoku-core';
import { Cell } from '../types';

export interface Hint {
  strategy: string;
  description: string;
  targetIndices: number[];
  reasonIndices: number[]; // Cells that "prove" the logic
  value?: number;
  eliminates?: { index: number; value: number }[];
}

export const gridToCoreBoard = (grid: Cell[]): Board => {
  return grid.map(cell => cell.value);
};

export const getNextHint = (grid: Cell[]): Hint | null => {
  const coreBoard = gridToCoreBoard(grid);
  const result: SolvingResult = hint(coreBoard);

  if (!result || !result.steps || result.steps.length === 0) {
    return null;
  }

  // Basic strategy mapping
  let strategyTitle = result.analysis.usedStrategies.length > 0 
    ? result.analysis.usedStrategies[0].title 
    : "Logical Deduction";

  // Use the first few steps to build a more comprehensive hint
  // sudoku-core v3 returns steps with an 'updates' array
  const firstStep = result.steps[0];
  const stepType = (firstStep as any).type;
  const stepStrategy = (firstStep as any).strategy || strategyTitle;
  const updates = (firstStep as any).updates || [];

  if (stepType === 'value' && updates.length > 0) {
    const update = updates[0];
    const index = update.index;
    const value = update.filledValue;
    
    return {
      strategy: stepStrategy,
      description: getStrategyDescription(stepStrategy, value),
      targetIndices: [index],
      reasonIndices: [], 
      value,
    };
  }

  if (stepType === 'elimination' && updates.length > 0) {
    const eliminates = updates.map((u: any) => ({
      index: u.index,
      value: u.eliminatedValue
    }));

    return {
      strategy: stepStrategy,
      description: getStrategyDescription(stepStrategy, updates[0].eliminatedValue, true),
      targetIndices: [updates[0].index],
      reasonIndices: [],
      eliminates,
    };
  }

  // Fallback: If no logic found but board not solved, suggest fixing notes or revealing a value
  const emptyCellIdx = grid.findIndex(c => c.value === null);
  if (emptyCellIdx !== -1) {
    return {
      strategy: "Note Check",
      description: "No immediate logic found. Try cleaning your notes or using 'Auto' to reset them.",
      targetIndices: [emptyCellIdx],
      reasonIndices: [],
    };
  }

  return null;
};

const getStrategyDescription = (strategy: string, value: number, isElimination = false): string => {
  const valStr = value !== undefined ? value.toString() : "a value";
  
  if (isElimination) {
    switch (strategy) {
      case 'Naked Pair':
        return `A Naked Pair in this house means ${valStr} can be removed from other cells.`;
      case 'Naked Triple':
        return `A Naked Triple in this house means ${valStr} can be removed from other cells.`;
      case 'Hidden Pair':
        return `A Hidden Pair in this house means other candidates can be removed, leaving only ${valStr}.`;
      case 'Pointing Pair':
      case 'Pointing Triple':
        return `Candidates in this block point to ${valStr} being restricted in this row/column.`;
      default:
        return `Logical analysis allows us to eliminate ${valStr} from this cell.`;
    }
  }

  switch (strategy) {
    case 'Single Remaining Cell Strategy':
    case 'Naked Single':
      return `This cell has only one possible candidate: ${valStr}.`;
    case 'Hidden Single':
      return `In this row, column, or block, ${valStr} can only fit in this cell.`;
    default:
      return `Logical analysis suggests ${valStr} belongs in this cell.`;
  }
};
