import { gql } from "@apollo/client";
import client from "~/apollo-client";
import { setContext } from "~/utils/helpers";

export const SET_LEVELS = gql`
  query SetLevels($setId: String!) {
    setLevels(setId: $setId) {
      levels {
        id
        name
        setId
      }
    }
  }
`;

export const Fetch_LEVEL = gql`
  query FetchLevel($id: String!) {
    fetchLevel(id: $id) {
      level {
        id
        name
        setId
      }
    }
  }
`;

export async function fetchSetLevels(
  { setId }: { setId: string },
  token: string
) {
  const response = await client.query({
    query: SET_LEVELS,
    variables: { setId },
    context: setContext(token),
  });

  return response;
}

export async function fetchLevel({ id }: { id: string }, token: string) {
  const response = await client.query({
    query: Fetch_LEVEL,
    variables: { id },
    context: setContext(token),
  });

  return response;
}
