import React from 'react';
import { SudokuCell } from './SudokuCell';

export const SudokuGrid: React.FC = () => {
  // Array of 81 indices
  const indices = Array.from({ length: 81 }, (_, i) => i);

  return (
    <div className="sudoku-grid">
      {indices.map((index) => (
        <SudokuCell key={index} index={index} />
      ))}
    </div>
  );
};
