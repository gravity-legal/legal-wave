import { gqlEndpoint } from '@/gravity-legal-requests';
import { GraphQLClient, gql } from 'graphql-request';

const CREATE_SAVE_PAYMENT_METHOD_TOKEN = gql`
  mutation CreateSavePaymentMethodToken(
    $input: CreateSavePaymentMethodTokenInput
  ) {
    createSavePaymentMethodToken(input: $input) {
      token
    }
  }
`;

export interface CreateSavePaymentMethodTokenParams {
  firmToken: string;
  clientId?: string;
}

export interface CreateSavePaymentMethodTokenResult {
  createSavePaymentMethodToken: {
    token: string;
  };
}

export async function createSavePaymentMethodToken(
  params: CreateSavePaymentMethodTokenParams
): Promise<string> {
  const client = new GraphQLClient(gqlEndpoint, {
    headers: {
      'x-api-key': params.firmToken,
    },
  });

  const options = {
    variables: {
      input: {
        clientId: params.clientId,
      },
    },
  };

  const res = await client.request<CreateSavePaymentMethodTokenResult>(
    CREATE_SAVE_PAYMENT_METHOD_TOKEN,
    options
  );

  return res.createSavePaymentMethodToken.token;
}
