import { useGameStore } from './src/store/useGameStore';

async function test() {
  useGameStore.getState().initGame('easy');
  
  useGameStore.setState((state) => {
    state.grid[0].fixed = false;
    state.grid[0].value = null;
    state.grid[0].notes = [9];
    
    state.grid[1].fixed = false;
    state.grid[1].value = null;
    state.grid[1].notes = [5];
  });
  
  useGameStore.getState().setSelection([0], 0);
  useGameStore.getState().setCellValue(0, 5);
  
  const state = useGameStore.getState();
  console.log('Cell 0 notes:', state.grid[0].notes);
  console.log('Cell 1 notes:', state.grid[1].notes);
  
  if (state.grid[1].notes.includes(5)) {
    console.error('Note 5 was not removed from related cell 1');
    process.exit(1);
  }
  if (!state.grid[0].notes.includes(9)) {
    console.error('Note 9 was removed from active cell 0 (should be suspended)');
    process.exit(1);
  }
  console.log('Smart cleanup (suspend) success');
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
