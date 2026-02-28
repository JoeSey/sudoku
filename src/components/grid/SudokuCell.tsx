import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import classNames from 'classnames';
import { areRelated, areIdenticalValue } from '../../utils/sudokuUtils';

interface SudokuCellProps {
  index: number;
}

export const SudokuCell: React.FC<SudokuCellProps> = ({ index }) => {
  const cell = useGameStore((state) => state.grid[index]);
  const isSelected = useGameStore((state) => state.selectedCellIndex === index);
  const isConflicting = useGameStore((state) => state.conflicts.includes(index));
  const isRelated = useGameStore((state) => 
    state.selectedCellIndex !== null && areRelated(state.selectedCellIndex, index)
  );
  const isIdentical = useGameStore((state) => {
    const selectedCell = state.selectedCellIndex !== null ? state.grid[state.selectedCellIndex] : null;
    return selectedCell && areIdenticalValue(selectedCell.value, cell?.value ?? null) && state.selectedCellIndex !== index;
  });

  const setSelectedCellIndex = useGameStore((state) => state.setSelectedCellIndex);
  
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && cellRef.current) {
      cellRef.current.focus();
    }
  }, [isSelected]);

  const handleClick = () => {
    setSelectedCellIndex(index);
  };

  return (
    <div
      ref={cellRef}
      className={classNames('sudoku-cell', {
        'fixed': cell?.fixed,
        'user-input': !cell?.fixed && cell?.value !== null,
        'selected': isSelected,
        'highlight-related': isRelated,
        'highlight-identical': isIdentical,
        'conflict': isConflicting,
      })}
      tabIndex={isSelected ? 0 : index === 0 && !useGameStore.getState().selectedCellIndex ? 0 : -1}
      onClick={handleClick}
      role="gridcell"
      aria-selected={isSelected}
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

