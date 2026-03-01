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
  // If the library identifies a cell to fill, it's usually the first 'value' step
  const valueStep = result.steps.find(s => s.type === 'value');
  const eliminationSteps = result.steps.filter(s => s.type === 'elimination');

  if (valueStep) {
    const { row, col, value } = valueStep;
    const index = row * 9 + col;
    
    // If the step has a more specific strategy, use it (depends on library version/fork)
    const stepStrategy = (valueStep as any).strategy || strategyTitle;
    
    return {
      strategy: stepStrategy,
      description: getStrategyDescription(stepStrategy, value),
      targetIndices: [index],
      reasonIndices: [], // TODO: Future refinement
      value,
    };
  }

  if (eliminationSteps.length > 0) {
    const { row, col, value } = eliminationSteps[0];
    const index = row * 9 + col;
    const stepStrategy = (eliminationSteps[0] as any).strategy || strategyTitle;

    return {
      strategy: stepStrategy,
      description: getStrategyDescription(stepStrategy, value, true),
      targetIndices: [index],
      reasonIndices: [],
      eliminates: eliminationSteps.map(s => ({ 
        index: s.row * 9 + s.col, 
        value: s.value 
      })),
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
