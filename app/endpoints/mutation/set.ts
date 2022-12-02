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

const EDIT_SET = gql`
  mutation EditSet($id: String!, $title: String!, $description: String) {
    updateSet(id: $id, title: $title, description: $description) {
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

const DELETE_SET = gql`
  mutation DeleteSet($id: String!) {
    deleteSet(id: $id) {
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

export async function editSet(
  { id, title, description }: TSetBody & { id: string },
  token: string
) {
  const response = await client.mutate({
    mutation: EDIT_SET,
    variables: { id, title, description },
    context: setContext(token),
  });

  return response;
}

export async function deleteSet({ id }: { id: string }, token: string) {
  const response = await client.mutate({
    mutation: DELETE_SET,
    variables: { id },
    context: setContext(token),
  });

  return response;
}
