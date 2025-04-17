import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction } from '../redux/transactionSlice';
import { TransactionType, Transaction } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../redux/store';
import {
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from '@mui/material';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TransactionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // for edit route

  const transactions = useSelector((state: RootState) => state.transactions);
  const editingTransaction = transactions.find(t => t.id === id);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount.toString());
      setType(editingTransaction.type);
      setDate(editingTransaction.date);
    }
  }, [editingTransaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      alert('Please fill in all fields');
      return;
    }

    const newTransaction: Transaction = {
      id: editingTransaction ? editingTransaction.id : uuidv4(),
      title: title.trim(),
      amount: parseFloat(amount),
      type,
      date,
    };

    if (editingTransaction) {
      dispatch(updateTransaction(newTransaction));
    } else {
      const isDuplicate = transactions.some(
        t =>
          t.title.toLowerCase() === title.toLowerCase().trim() &&
          t.amount === parseFloat(amount) &&
          t.type === type &&
          t.date === date
      );

      if (isDuplicate) {
        alert('Duplicate transaction detected. Please enter a unique transaction.');
        return;
      }

      dispatch(addTransaction(newTransaction));
    }

    navigate('/');
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
      </Typography>
      <FormWrapper onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <FormControl>
          <FormLabel>Type</FormLabel>
          <RadioGroup
            row
            value={type}
            onChange={e => setType(e.target.value as TransactionType)}
          >
            <FormControlLabel value="income" control={<Radio />} label="Income" />
            <FormControlLabel value="expense" control={<Radio />} label="Expense" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          inputProps={{ max: new Date().toISOString().split('T')[0] }}
        />
        <Button variant="contained" color="primary" type="submit">
          {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </Button>
      </FormWrapper>
    </>
  );
};
