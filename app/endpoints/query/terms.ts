import { gql } from "@apollo/client";

import client from "~/apollo-client";
import { setContext } from "~/utils/helpers";

import type { TPaginationParams } from "~/types/endpoints";

export const LEVEL_TERMS = gql`
  query LevelTerms(
    $levelId: String!
    $skip: Int!
    $take: Int!
    $search: String
  ) {
    levelTerms(levelId: $levelId, skip: $skip, take: $take, search: $search) {
      items {
        id
        name
        definition
        levelId
        updatedAt
      }
      tatolItems
      totalPages
      currentPage
    }
  }
`;

export const SET_TERMS = gql`
  query SetTerms($setId: String!, $skip: Int!, $take: Int!, $search: String) {
    setTerms(setId: $setId, skip: $skip, take: $take, search: $search) {
      items {
        id
        name
        definition
        levelId
        updatedAt
      }
      tatolItems
      totalPages
      currentPage
    }
  }
`;

export async function fetchLevelTerms(
  { levelId, skip, take, search }: { levelId: string } & TPaginationParams,
  token: string
) {
  const response = await client.query({
    query: LEVEL_TERMS,
    variables: { levelId, skip, take, search },
    context: setContext(token),
  });

  return response;
}

export async function fetchSetTerms(
  { setId, skip, take, search }: { setId: string } & TPaginationParams,
  token: string
) {
  const response = await client.query({
    query: SET_TERMS,
    variables: { setId, skip, take, search },
    context: setContext(token),
  });

  return response;
}
