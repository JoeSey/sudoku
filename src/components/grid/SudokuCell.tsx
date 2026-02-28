import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import classNames from 'classnames';

interface SudokuCellProps {
  index: number;
}

export const SudokuCell: React.FC<SudokuCellProps> = ({ index }) => {
  const cell = useGameStore((state) => state.grid[index]);

  return (
    <div
      className={classNames('sudoku-cell', {
        'fixed': cell?.fixed,
        'user-input': !cell?.fixed && cell?.value !== null,
      })}
    >
      {cell?.value !== null ? (
        <span className="cell-value">{cell?.value}</span>
      ) : (
        <div className="notes-container">
          {/* Placeholder for notes */}
        </div>
      )}
    </div>
  );
};
