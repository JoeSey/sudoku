import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import classNames from 'classnames';

export const HintExplanation: React.FC = () => {
  const activeHint = useGameStore((state) => state.activeHint);
  const clearHint = useGameStore((state) => state.clearHint);
  const setCellValue = useGameStore((state) => state.setCellValue);
  const grid = useGameStore((state) => state.grid);
  
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [solvedByPlayer, setSolvedByPlayer] = useState(false);

  useEffect(() => {
    if (!activeHint) {
      setShowWalkthrough(false);
      setSolvedByPlayer(false);
    }
  }, [activeHint]);

  // Detect if the player solves the target cell after seeing the hint
  useEffect(() => {
    if (activeHint && activeHint.targetIndices.length > 0 && activeHint.value !== undefined) {
      const targetIdx = activeHint.targetIndices[0];
      if (grid[targetIdx].value === activeHint.value) {
        setSolvedByPlayer(true);
        // Clear the hint after a delay to show success
        const timer = setTimeout(() => {
          clearHint();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [grid, activeHint, clearHint]);

  if (!activeHint) return null;

  const handleApply = () => {
    if (activeHint.targetIndices.length > 0 && activeHint.value !== undefined) {
      setCellValue(activeHint.targetIndices[0], activeHint.value);
      clearHint();
    }
  };

  return (
    <div className="hint-overlay" style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '94%',
      maxWidth: '450px',
      backgroundColor: '#fff',
      boxShadow: '0 -10px 25px rgba(0,0,0,0.1)',
      borderRadius: '16px',
      padding: '16px',
      zIndex: 200,
      border: '1px solid #e5e7eb',
      animation: 'slideUp 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <span style={{ 
            fontSize: '0.7rem', 
            fontWeight: 'bold', 
            color: '#7c3aed', 
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Logic Hint
          </span>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{activeHint.strategy}</h3>
        </div>
        {!solvedByPlayer && (
          <button 
            onClick={clearHint}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#9ca3af' }}
          >
            ✕
          </button>
        )}
      </div>

      {solvedByPlayer ? (
        <div style={{ color: '#059669', fontWeight: 'bold', textAlign: 'center', padding: '10px 0' }}>
          ✨ Pattern Solved! Well done.
        </div>
      ) : (
        <>
          <p style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '20px', lineHeight: 1.5 }}>
            {showWalkthrough ? activeHint.description : 'A logical deduction is available. Do you want to see the explanation?'}
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            {!showWalkthrough ? (
              <button 
                onClick={() => setShowWalkthrough(true)}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '8px' }}
              >
                Explain More
              </button>
            ) : (
              <button 
                onClick={handleApply}
                className="btn btn-primary"
                style={{ flex: 1, padding: '8px', backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
              >
                Fill Value
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
