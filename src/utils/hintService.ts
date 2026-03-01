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
  const strategyTitle = result.analysis.usedStrategies.length > 0 
    ? result.analysis.usedStrategies[0].title 
    : "Logical Deduction";

  // Use the first few steps to build a more comprehensive hint
  // If the library identifies a cell to fill, it's usually the first 'value' step
  const valueStep = result.steps.find(s => s.type === 'value');
  const eliminationSteps = result.steps.filter(s => s.type === 'elimination');

  if (valueStep) {
    const { row, col, value } = valueStep;
    const index = row * 9 + col;
    
    return {
      strategy: strategyTitle,
      description: getStrategyDescription(strategyTitle, value),
      targetIndices: [index],
      reasonIndices: [], // TODO: Future refinement
      value,
    };
  }

  if (eliminationSteps.length > 0) {
    const { row, col, value } = eliminationSteps[0];
    const index = row * 9 + col;

    return {
      strategy: strategyTitle,
      description: `Logic shows ${value} can be removed from this cell.`,
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

const getStrategyDescription = (strategy: string, value: number): string => {
  switch (strategy) {
    case 'Single Remaining Cell Strategy':
    case 'Naked Single':
      return `This cell has only one possible candidate: ${value}.`;
    case 'Hidden Single':
      return `In this row, column, or block, ${value} can only fit in this cell.`;
    default:
      return `Logical analysis suggests ${value} belongs in this cell or should be eliminated.`;
  }
};
