import { gql } from "@apollo/client";
import client from "~/apollo-client";
import type { TCardBody } from "~/types/endpoints";
import { setContext } from "~/utils/helpers";

const CREATE_CARD = gql`
  mutation CreateCard($name: String!, $setId: String) {
    createCard(name: $title, setId: $setId) {
      set {
        id
        name
        setId
      }
      statusCode
    }
  }
`;

export async function createCard({ name, setId }: TCardBody, token: string) {
  const response = await client.mutate({
    mutation: CREATE_CARD,
    variables: { name, setId },
    context: setContext(token),
  });
  return response;
}
