import { Card, CardContent, Typography } from '@mui/material';
import { useTransactions } from '../hooks/useTransaction';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const BalanceSummary = () => {
  const { income, expense, balance } = useTransactions();

  return (
    <Wrapper>
      <Card>
        <CardContent>
          <Typography variant="h6">Total Balance</Typography>
          <Typography variant="h4" color={balance >= 0 ? 'green' : 'red'}>
            ${balance.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      <Row>
        <Card style={{ flex: 1 }}>
          <CardContent>
            <Typography variant="subtitle1">Income</Typography>
            <Typography variant="h6" color="green">
              +${income.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>

        <Card style={{ flex: 1 }}>
          <CardContent>
            <Typography variant="subtitle1">Expense</Typography>
            <Typography variant="h6" color="red">
              -${expense.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Row>
    </Wrapper>
  );
};
