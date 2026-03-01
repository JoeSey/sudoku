import React from 'react';
import { useGameStore } from '../../store/useGameStore';

interface GameInfoProps {
  onNewGame: () => void;
}

export const GameInfo: React.FC<GameInfoProps> = ({ onNewGame }) => {
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
      margin: '0 auto',
      padding: '0 10px',
      fontFamily: 'monospace',
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      color: '#666'
    }}>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button 
          onClick={onNewGame}
          className="hover:text-black transition-colors"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textTransform: 'uppercase', font: 'inherit' }}
        >
          New Game
        </button>
        <span style={{ color: '#000', fontWeight: 'bold' }}>{difficulty}</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span>Mistakes: <span style={{ color: mistakeCount > 0 ? '#000' : 'inherit' }}>{mistakeCount}</span></span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#000', fontWeight: 'bold', minWidth: '45px' }}>{formatTime(timer)}</span>
          <button 
            onClick={() => togglePause()}
            className="hover:text-black transition-colors"
            style={{
              background: 'none',
              border: '1px solid #ddd',
              borderRadius: '3px',
              cursor: 'pointer',
              padding: '2px 6px',
              fontSize: '0.7rem',
              textTransform: 'uppercase'
            }}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  );
};
