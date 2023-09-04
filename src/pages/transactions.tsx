import { Layout } from '@/components/layout/Layout';
import { TransactionsPage } from '@/components/transactions/TransactionsPage';
import { NextPage } from 'next';

const Transactions: NextPage = () => {
  return (
    <Layout>
      <TransactionsPage />
    </Layout>
  );
};

export default Transactions;
