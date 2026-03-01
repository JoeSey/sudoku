import { useEffect, useState } from 'react';
import { useGameStore } from './store/useGameStore';
import { SudokuGrid } from './components/grid/SudokuGrid';
import { Keypad } from './components/ui/Keypad';
import { GameInfo } from './components/ui/GameInfo';
import { WinOverlay } from './components/ui/WinOverlay';
import { NewGameModal } from './components/ui/NewGameModal';

function App() {
  const initGame = useGameStore((state) => state.initGame);
  const tickTimer = useGameStore((state) => state.tickTimer);
  const isPaused = useGameStore((state) => state.isPaused);
  const isGameWon = useGameStore((state) => state.isGameWon);
  const togglePause = useGameStore((state) => state.togglePause);
  const setGameWon = useGameStore((state) => state.setGameWon);

  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);

  useEffect(() => {
    // Open New Game modal on first load if the grid is empty
    const grid = useGameStore.getState().grid;
    const isFirstLoad = grid.every(cell => !cell.fixed && cell.value === null);
    if (isFirstLoad) {
      setIsNewGameModalOpen(true);
    }
  }, []);

  useEffect(() => {
    // 1-second interval loop calling tickTimer() ONLY if isPaused and isGameWon are false
    if (isPaused || isGameWon || isNewGameModalOpen) return;

    const interval = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isGameWon, isNewGameModalOpen, tickTimer]);

  const handleNewGame = () => {
    setIsNewGameModalOpen(true);
  };

  const startNewGame = (difficulty: any, useSymmetry: boolean) => {
    initGame(difficulty, useSymmetry);
    setGameWon(false);
    setIsNewGameModalOpen(false);
  };

  useEffect(() => {
    // Visibility/Blur auto-pause
    const handleVisibilityChange = () => {
      if (document.hidden && !isGameWon && !isNewGameModalOpen) {
        togglePause(true);
      }
    };

    const handleBlur = () => {
      if (!isGameWon && !isNewGameModalOpen) {
        togglePause(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [togglePause, isGameWon, isNewGameModalOpen]);

  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      gap: '20px',
      backgroundColor: '#fff',
      color: '#000'
    }}>
      <h1 style={{ margin: 0, letterSpacing: '0.2em' }}>SUDOKU</h1>
      <GameInfo onNewGame={handleNewGame} />
      <SudokuGrid />
      <Keypad />
      
      <WinOverlay onNewGame={handleNewGame} />
      <NewGameModal 
        isOpen={isNewGameModalOpen} 
        onClose={() => setIsNewGameModalOpen(false)} 
        onStartGame={startNewGame} 
      />
    </div>
  )
}

export default App
