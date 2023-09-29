import { gqlEndpoint } from '@/gravity-legal-requests';
import { GraphQLClient, gql } from 'graphql-request';

const CREATE_PAYMENT_TOKEN = gql`
  mutation CreatePaymentToken($input: CreatePaymentTokenInput) {
    createPaymentToken(input: $input) {
      paymentToken
    }
  }
`;

export interface CreatePaymentTokenParams {
  firmToken: string;
  bankAccountId?: string;
}

export interface CreatePaymentTokenResult {
  createPaymentToken: {
    paymentToken: string;
  };
}

export async function createPaymentToken(
  params: CreatePaymentTokenParams
): Promise<any> {
  const client = new GraphQLClient(gqlEndpoint, {
    headers: {
      'x-api-key': params.firmToken,
    },
  });

  const options = {
    variables: {
      input: {
        bankAccountId: params.bankAccountId,
      },
    },
  };

  const res = await client.request<CreatePaymentTokenResult>(
    CREATE_PAYMENT_TOKEN,
    options
  );

  return res.createPaymentToken.paymentToken;
}
