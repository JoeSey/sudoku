import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import classNames from 'classnames';
import { areRelated, areIdenticalValue } from '../../utils/sudokuUtils';
import { PencilGrid } from './PencilGrid';

interface SudokuCellProps {
  index: number;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerEnter: (e: React.PointerEvent) => void;
}

export const SudokuCell: React.FC<SudokuCellProps> = ({ index, onPointerDown, onPointerEnter }) => {
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
  const activeHint = useGameStore((state) => state.activeHint);
  const isHintTarget = activeHint?.targetIndices.includes(index);
  const isHintReason = activeHint?.reasonIndices.includes(index);
  const strikeThroughValue = activeHint?.eliminates?.find(e => e.index === index)?.value;
  
  const primaryValue = useGameStore((state) => 
    state.primaryIndex !== null ? state.grid[state.primaryIndex].value : null
  );
  const isCleaned = useGameStore((state) => state.lastCleanedIndices.includes(index));
  const isZenMode = useGameStore((state) => state.isZenMode);
  const setCellValue = useGameStore((state) => state.setCellValue);

  const cellRef = useRef<HTMLDivElement>(null);
  const lastTap = useRef(0);

  useEffect(() => {
    if (isPrimary && cellRef.current) {
      cellRef.current.focus();
    }
  }, [isPrimary]);

  const handlePointerDown = (e: React.PointerEvent) => {
    onPointerDown(e);
    
    // Manual double-tap detection for both mouse and touch
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (cell && !cell.fixed && cell.value === null && cell.notes.length === 1) {
        setCellValue(index, cell.notes[0]);
      }
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  return (
    <div
      ref={cellRef}
      className={classNames('sudoku-cell', {
        'fixed': cell?.fixed,
        'user-input': !cell?.fixed && cell?.value !== null,
        'selected': isSelected,
        'primary': isPrimary,
        'highlight-related': !isZenMode && isRelated,
        'highlight-identical': !isZenMode && isIdentical,
        'conflict': !isZenMode && isConflicting,
        'cleaned-pulse': isCleaned,
        'hint-target': isHintTarget,
        'hint-reason': isHintReason,
      })}
      tabIndex={isPrimary ? 0 : index === 0 && !useGameStore.getState().primaryIndex ? 0 : -1}
      onPointerDown={handlePointerDown}
      onPointerEnter={onPointerEnter}
      role="gridcell"
      aria-selected={isSelected}
    >
      {cell?.value !== null ? (
        <span key={cell?.value} className="cell-value">{cell?.value}</span>
      ) : (
        <PencilGrid 
          notes={cell?.notes ?? []} 
          highlightValue={primaryValue} 
          strikeThroughValue={strikeThroughValue}
        />
      )}
    </div>
  );
};
