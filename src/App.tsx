import { useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { SudokuGrid } from './components/grid/SudokuGrid';

function App() {
  const initGame = useGameStore((state) => state.initGame);

  useEffect(() => {
    initGame('easy');
  }, [initGame]);

  return (
    <div className="App">
      <h1>SUDOKU</h1>
      <SudokuGrid />
    </div>
  )
}

export default App
