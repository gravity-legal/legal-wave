import { gqlEndpoint } from '@/gravity-legal';
import { GraphQLClient, gql } from 'graphql-request';

const RUN_PAYMENT = gql`
  mutation RunPayment($input: RunPaymentInput!) {
    runPayment(input: $input) {
      id
      status
      transactions {
        id
        amountProcessed
      }
    }
  }
`;

export interface RunPaymentInput {
  amount: number;
  payerEmail?: string;
  payerName?: string;
  payerZip?: string;
  paymentMethod: 'CREDIT' | 'DEBIT' | 'ACH';
  paymentToken: string;
  savePaymentMethod?: boolean;
}

export interface RunPaymentData {
  runPayment: Payment;
}

export interface Payment {
  id: string;
  status: string;
}

export async function runPayment(
  firmToken: string,
  input: RunPaymentInput
): Promise<RunPaymentData> {
  const client = new GraphQLClient(gqlEndpoint, {
    headers: {
      'x-api-key': firmToken,
    },
  });

  const variables = {
    input,
  };

  return client.request<RunPaymentData>(RUN_PAYMENT, variables);
}
