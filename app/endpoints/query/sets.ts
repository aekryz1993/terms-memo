import { gql } from "@apollo/client";
import client from "~/apollo-client";
import { setContext } from "~/utils/helpers";

import type { TPaginationParams } from "~/types/endpoints";

const SETS = gql`
  query Sets($skip: Int!, $take: Int!, $search: String) {
    fetchSets(skip: $skip, take: $take, search: $search) {
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

const SET = gql`
  query Set($id: String!) {
    fetchSet(id: $id) {
      set {
        id
        title
        description
        userId
        updatedAt
      }
    }
  }
`;

async function fetchSets(
  { skip, take, search }: TPaginationParams,
  token: string
) {
  const response = await client.query({
    query: SETS,
    variables: { skip, take, search },
    context: setContext(token),
  });

  return response;
}

async function fetchSet({ id }: { id: string }, token: string) {
  const response = await client.query({
    query: SET,
    variables: { id },
    context: setContext(token),
  });

  return response;
}

export { SETS, SET, fetchSets, fetchSet };
