import { gqlEndpoint } from '@/gravity-legal';
import { getPartnerToken } from '@/lib/getPartnerToken';
import { GraphQLClient, gql } from 'graphql-request';

const CREATE_FIRM = gql`
  mutation CreateFirm($input: CreateFirmInput!) {
    createFirm(input: $input) {
      apiToken
    }
  }
`;

export interface CreateFirmInput {
  name: string;
}

export interface RunPaymentData {
  createFirm: {
    apiToken: string;
  };
}

export async function createFirm(name: string): Promise<string> {
  const partnerToken = getPartnerToken();

  const client = new GraphQLClient(gqlEndpoint, {
    headers: {
      'x-api-key': partnerToken,
    },
  });

  const variables = {
    input: {
      name,
      mockOnboarding: true,
    },
  };

  const result = await client.request<RunPaymentData>(CREATE_FIRM, variables);
  return result.createFirm.apiToken;
}
