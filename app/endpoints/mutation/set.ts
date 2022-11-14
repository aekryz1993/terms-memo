import { gql } from "@apollo/client";
import client from "~/apollo-client";
import type { TSetBody } from "~/types/endpoints";
import { setContext } from "~/utils/helpers";

const CREATE_SET = gql`
  mutation CreateSet($userId: String!, $title: String!, $description: String) {
    createSet(title: $title, description: $description) {
      set {
        id
        title
        description
        userId
      }
      statusCode
      message
    }
  }
`;

export async function createSet(
  { title, description }: TSetBody,
  token: string
) {
  const response = await client.mutate({
    mutation: CREATE_SET,
    variables: { title, description },
    context: setContext(token),
  });

  return response;
}
