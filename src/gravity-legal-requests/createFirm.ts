import { gqlEndpoint } from '@/gravity-legal-requests';
import { getPartnerToken } from '@/lib/getPartnerToken';
import { GraphQLClient, gql } from 'graphql-request';

const CREATE_FIRM = gql`
  mutation CreateFirm($input: CreateFirmInput!) {
    createFirm(input: $input) {
      apiToken
      signUpLink {
        link
        expiresAt
      }
    }
  }
`;

export interface CreateFirmInput {
  name: string;
}

export interface CreateFirmData {
  createFirm: {
    apiToken: string;
    signUpLink: {
      link: string;
      expiresAt: Date;
    };
  };
}

export async function createFirm(name: string): Promise<CreateFirmData> {
  const partnerToken = getPartnerToken();

  const client = new GraphQLClient(gqlEndpoint, {
    headers: {
      'x-api-key': partnerToken,
    },
  });

  const variables = {
    input: {
      name,
      mockOnboarding: false,
    },
  };

  return client.request<CreateFirmData>(CREATE_FIRM, variables);
}
