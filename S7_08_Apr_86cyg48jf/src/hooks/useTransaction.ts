
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useTransactions = () => {
  const transactions = useSelector((state: RootState) => state.transactions);

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  return { transactions, income, expense, balance };
};
