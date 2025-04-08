
import { TransactionList } from '../components/TransactionList';
import { BalanceSummary } from '../components/BalanceSummary';
import { Container } from '../styles/Container';

const Home = () => {
  return (
    <Container>
      <BalanceSummary />
      <TransactionList />
    </Container>
  );
};

export default Home;
