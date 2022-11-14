import { gql } from "@apollo/client";
import client from "~/apollo-client";
import { setContext } from "~/utils/helpers";

import type { TPaginationParams } from "~/types/endpoints";

const SETS = gql`
  query Sets($skip: String!, $take: String!) {
    sets(skip: $skip, take: $take) {
      id
      title
      description
      userId
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
