
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types';

const getInitialState = (): Transaction[] => {
  const stored = localStorage.getItem('transactions');
  return stored ? JSON.parse(stored) : [];
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: getInitialState(),
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.push(action.payload);
      localStorage.setItem('transactions', JSON.stringify(state));
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const updated = state.filter(t => t.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(updated));
      return updated;
    },

    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem('transactions', JSON.stringify(state));
      }
    }
    
  },
});

export const { addTransaction, deleteTransaction, updateTransaction} = transactionsSlice.actions;
export default transactionsSlice.reducer;
