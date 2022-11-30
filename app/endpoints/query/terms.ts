import { gql } from "@apollo/client";
import client from "~/apollo-client";
import { setContext } from "~/utils/helpers";

export const LEVEL_TERMS = gql`
  query LevelTerms($levelId: String!) {
    levelTerms(levelId: $levelId) {
      terms {
        id
        name
        definition
        levelId
        updatedAt
      }
    }
  }
`;

export async function fetchLevelTerms(
  { levelId }: { levelId: string },
  token: string
) {
  const response = await client.query({
    query: LEVEL_TERMS,
    variables: { levelId },
    context: setContext(token),
  });

  return response;
}
