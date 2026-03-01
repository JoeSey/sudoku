import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import classNames from 'classnames';
import { areRelated, areIdenticalValue } from '../../utils/sudokuUtils';
import { PencilGrid } from './PencilGrid';

interface SudokuCellProps {
  index: number;
  onMouseDown: () => void;
  onMouseEnter: () => void;
}

export const SudokuCell: React.FC<SudokuCellProps> = ({ index, onMouseDown, onMouseEnter }) => {
  const cell = useGameStore((state) => state.grid[index]);
  const isSelected = useGameStore((state) => state.selectedIndices.includes(index));
  const isPrimary = useGameStore((state) => state.primaryIndex === index);
  const isConflicting = useGameStore((state) => state.conflicts.includes(index));
  const isRelated = useGameStore((state) => 
    state.primaryIndex !== null && areRelated(state.primaryIndex, index)
  );
  const isIdentical = useGameStore((state) => {
    const primaryCell = state.primaryIndex !== null ? state.grid[state.primaryIndex] : null;
    return primaryCell && areIdenticalValue(primaryCell.value, cell?.value ?? null) && state.primaryIndex !== index;
  });

  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPrimary && cellRef.current) {
      cellRef.current.focus();
    }
  }, [isPrimary]);

  return (
    <div
      ref={cellRef}
      className={classNames('sudoku-cell', {
        'fixed': cell?.fixed,
        'user-input': !cell?.fixed && cell?.value !== null,
        'selected': isSelected,
        'primary': isPrimary,
        'highlight-related': isRelated,
        'highlight-identical': isIdentical,
        'conflict': isConflicting,
      })}
      tabIndex={isPrimary ? 0 : index === 0 && !useGameStore.getState().primaryIndex ? 0 : -1}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      role="gridcell"
      aria-selected={isSelected}
    >
      {cell?.value !== null ? (
        <span className="cell-value">{cell?.value}</span>
      ) : (
        <PencilGrid notes={cell?.notes ?? []} />
      )}
    </div>
  );
};
