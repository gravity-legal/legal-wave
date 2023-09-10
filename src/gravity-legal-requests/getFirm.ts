import { gqlEndpoint } from '@/gravity-legal-requests';
import { GraphQLClient, gql } from 'graphql-request';

const GET_FIRM = gql`
  query GetFirm {
    firm {
      id
      isAcceptingPayments
      name
    }
  }
`;

export interface GravityLegalFirm {
  id: string;
  isAcceptingPayments: boolean;
  name: string;
}

export interface GetFirmData {
  firm: GravityLegalFirm;
}

export async function getFirm(firmApiToken: string): Promise<GravityLegalFirm> {
  const client = new GraphQLClient(gqlEndpoint, {
    headers: {
      'x-api-key': firmApiToken,
    },
  });

  const result = await client.request<GetFirmData>(GET_FIRM);
  return result.firm;
}
