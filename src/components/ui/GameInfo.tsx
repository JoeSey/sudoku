import React from 'react';
import { useGameStore } from '../../store/useGameStore';

export const GameInfo: React.FC = () => {
  const timer = useGameStore((state) => state.timer);
  const mistakeCount = useGameStore((state) => state.mistakeCount);
  const difficulty = useGameStore((state) => state.difficulty);
  const isPaused = useGameStore((state) => state.isPaused);
  const togglePause = useGameStore((state) => state.togglePause);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-info" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '500px',
      margin: '10px auto',
      padding: '0 10px',
      fontFamily: 'monospace',
      fontSize: '1rem',
      textTransform: 'uppercase'
    }}>
      <div>{difficulty}</div>
      <div>Mistakes: {mistakeCount}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>{formatTime(timer)}</span>
        <button 
          onClick={() => togglePause()}
          style={{
            background: 'none',
            border: '1px solid #000',
            cursor: 'pointer',
            padding: '2px 8px',
            fontSize: '0.8rem'
          }}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
};
