import { gqlEndpoint } from '@/gravity-legal-requests';
import { GraphQLClient, gql } from 'graphql-request';

const START_PAYMENT_SESSION = gql`
  mutation StartPaymentSession($input: CreatePaymentTokenInput) {
    createPaymentToken(input: $input) {
      paymentToken
    }
  }
`;

export interface StartPaymentSessionParams {
  firmToken: string;
  bankAccountId?: string;
}

export interface StartPaymentSessionResult {
  createPaymentToken: {
    paymentToken: string;
  };
}

export async function startPaymentSession(
  params: StartPaymentSessionParams
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

  const res = await client.request<StartPaymentSessionResult>(
    START_PAYMENT_SESSION,
    options
  );

  return res.createPaymentToken.paymentToken;
}
