import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../redux/transactionSlice';
import { useTransactions } from '../hooks/useTransaction';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Animate with motion.div wrapped around Card
const MotionCard = styled(motion(Card))<{ type: string }>`
  border-left: 6px solid ${({ type }) => (type === 'income' ? '#4caf50' : '#f44336')};
`;

export const TransactionList = () => {
  const { transactions } = useTransactions();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<'date' | 'type' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleOrderChange = (
    event: React.MouseEvent<HTMLElement>,
    newOrder: 'asc' | 'desc' | null
  ) => {
    if (newOrder) setSortOrder(newOrder);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'type') {
      comparison = a.type.localeCompare(b.type);
    } else if (sortBy === 'amount') {
      comparison = a.amount - b.amount;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" spacing={2}>
          <FormControl size="small">
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value as 'date' | 'type' | 'amount')}
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="type">Type</MenuItem>
              <MenuItem value="amount">Amount</MenuItem>
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={sortOrder}
            exclusive
            onChange={handleOrderChange}
            size="small"
            color="primary"
            aria-label="sort order"
          >
            <ToggleButton value="asc">Asc</ToggleButton>
            <ToggleButton value="desc">Desc</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      <ListWrapper>
        {sortedTransactions.length === 0 ? (
          <Typography variant="body2">No transactions yet.</Typography>
        ) : (
          <AnimatePresence>
            {sortedTransactions.map((txn) => (
              <MotionCard
                key={txn.id}
                type={txn.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <div>
                      <Typography variant="subtitle1">{txn.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(txn.date).toLocaleDateString()}
                      </Typography>
                    </div>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: txn.type === 'income' ? 'green' : 'red' }}
                      >
                        {txn.type === 'income' ? '+' : '-'}${txn.amount}
                      </Typography>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => navigate(`/edit/${txn.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => dispatch(deleteTransaction(txn.id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </MotionCard>
            ))}
          </AnimatePresence>
        )}
      </ListWrapper>
    </>
  );
};
