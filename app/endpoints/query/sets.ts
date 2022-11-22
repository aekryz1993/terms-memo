import { gql } from "@apollo/client";
import client from "~/apollo-client";
import { setContext } from "~/utils/helpers";

import type { TPaginationParams } from "~/types/endpoints";

export const SETS = gql`
  query Sets($skip: String!, $take: String!) {
    fetchSets(skip: $skip, take: $take) {
      sets {
        id
        title
        description
        userId
        updatedAt
      }
      tatolSets
      totalPages
      currentPage
    }
  }
`;

export async function fetchSets(
  { skip, take }: TPaginationParams,
  token: string
) {
  const response = await client.query({
    query: SETS,
    variables: { skip, take },
    context: setContext(token),
  });

  return response;
}
