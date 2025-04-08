import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('transactions');
    if (serializedState === null) return undefined;
    return { transactions: JSON.parse(serializedState) };
  } catch (err) {
    console.error('Load state error:', err);
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state.transactions);
    localStorage.setItem('transactions', serializedState);
  } catch (err) {
    console.error('Save state error:', err);
  }
};

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
