import { gql, QueryResult, useQuery } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GET_TRANSACTIONS() {
    transactions {

    }
  }
`;

export interface UseTransactionsVariables {}

export interface UseTransactionsResult {}

export const useTransactions = (): QueryResult<
  UseTransactionsResult,
  UseTransactionsVariables
> => {
  return useQuery<UseTransactionsResult, UseTransactionsVariables>(
    GET_TRANSACTIONS
  );
};
