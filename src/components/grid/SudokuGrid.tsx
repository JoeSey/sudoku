import React, { useState, useEffect } from 'react';
import { SudokuCell } from './SudokuCell';
import { useGameStore } from '../../store/useGameStore';

export const SudokuGrid: React.FC = () => {
  const moveSelection = useGameStore((state) => state.moveSelection);
  const setCellValue = useGameStore((state) => state.setCellValue);
  const toggleNoteInSelection = useGameStore((state) => state.toggleNoteInSelection);
  const toggleNoteMode = useGameStore((state) => state.toggleNoteMode);
  const isNoteMode = useGameStore((state) => state.isNoteMode);
  const setSelection = useGameStore((state) => state.setSelection);
  const selectedIndices = useGameStore((state) => state.selectedIndices);
  const primaryIndex = useGameStore((state) => state.primaryIndex);
  const grid = useGameStore((state) => state.grid);
  const undo = useGameStore((state) => state.undo);
  const redo = useGameStore((state) => state.redo);

  const [dragStart, setDragStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const getRectangleIndices = (start: number, end: number) => {
    const r1 = Math.floor(start / 9);
    const c1 = start % 9;
    const r2 = Math.floor(end / 9);
    const c2 = end % 9;

    const minRow = Math.min(r1, r2);
    const maxRow = Math.max(r1, r2);
    const minCol = Math.min(c1, c2);
    const maxCol = Math.max(c1, c2);

    const indices = [];
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        indices.push(r * 9 + c);
      }
    }
    return indices;
  };

  const handlePointerDown = (index: number, e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setDragStart(index);
    setIsDragging(true);
    setSelection([index], index);
  };

  const handlePointerEnter = (index: number, e: React.PointerEvent) => {
    if (isDragging && dragStart !== null) {
      const indices = getRectangleIndices(dragStart, index);
      setSelection(indices, index);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // History (Ctrl+Z, Ctrl+Shift+Z / Ctrl+Y)
    if (e.ctrlKey || e.metaKey) {
      if (e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }
      if (e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
        return;
      }
    }

    if (primaryIndex === null) return;

    // Number input (1-9)
    if (/^[1-9]$/.test(e.key)) {
      e.preventDefault();
      const num = parseInt(e.key, 10);
      if (isNoteMode) {
        toggleNoteInSelection(num);
      } else {
        setCellValue(primaryIndex, num);
      }
      return;
    }

    // Toggle Note Mode (N)
    if (e.key.toLowerCase() === 'n') {
      e.preventDefault();
      toggleNoteMode();
      return;
    }

    // Clearing (Backspace/Delete)
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      selectedIndices.forEach(idx => {
        setCellValue(idx, null);
      });
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        moveSelection('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveSelection('down');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveSelection('left');
        break;
      case 'ArrowRight':
        e.preventDefault();
        moveSelection('right');
        break;
      case 'Tab': {
        e.preventDefault();
        const direction = e.shiftKey ? -1 : 1;
        let nextIndex = (primaryIndex + direction + 81) % 81;

        while (grid[nextIndex].fixed) {
          nextIndex = (nextIndex + direction + 81) % 81;
          if (nextIndex === primaryIndex) break;
        }
        setSelection([nextIndex], nextIndex);
        break;
      }
    }
  };

  const isPaused = useGameStore((state) => state.isPaused);
  const togglePause = useGameStore((state) => state.togglePause);

  const indices = Array.from({ length: 81 }, (_, i) => i);

  return (
    <div 
      className="sudoku-grid-container"
      onKeyDown={handleKeyDown}
      role="grid"
      tabIndex={0}
      style={{ position: 'relative', outline: 'none' }}
    >
      <div 
        className="sudoku-grid"
        style={{ 
          filter: isPaused ? 'blur(15px)' : 'none',
          pointerEvents: isPaused ? 'none' : 'auto',
          transition: 'filter 0.3s ease',
          margin: '0 auto',
          touchAction: 'none'
        }}
      >
        {indices.map((index) => (
          <SudokuCell 
            key={index} 
            index={index} 
            onPointerDown={(e) => handlePointerDown(index, e)}
            onPointerEnter={(e) => handlePointerEnter(index, e)}
          />
        ))}
      </div>
      
      {isPaused && (
        <div 
          onClick={() => togglePause(false)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            cursor: 'pointer',
            zIndex: 10,
            backdropFilter: 'blur(5px)',
            borderRadius: '4px'
          }}
        >
          <div style={{
            padding: '15px 30px',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontSize: '1rem',
            fontWeight: 300,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            Paused
          </div>
        </div>
      )}
    </div>
  );
};
