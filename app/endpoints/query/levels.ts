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
