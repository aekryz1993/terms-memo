import { gql } from "@apollo/client";
import client from "~/apollo-client";
import type { TTermBody } from "~/types/endpoints";
import { setContext } from "~/utils/helpers";

const CREATE_TERM = gql`
  mutation CreateTerm($levelId: String!, $name: String!, $definition: String) {
    createTerm(levelId: $levelId, name: $name, definition: $definition) {
      term {
        id
        name
        definition
      }
      statusCode
      message
    }
  }
`;

const EDIT_TERM = gql`
  mutation EditTerm($id: String!, $title: String!, $description: String) {
    updateTerm(id: $id, title: $title, description: $description) {
      term {
        id
        name
        definition
      }
      statusCode
      message
    }
  }
`;

const DELETE_TERM = gql`
  mutation DeleteTerm($id: String!) {
    deleteTerm(id: $id) {
      statusCode
      message
    }
  }
`;

export async function createTerm(
  { name, definition }: TTermBody,
  token: string
) {
  const response = await client.mutate({
    mutation: CREATE_TERM,
    variables: { name, definition },
    context: setContext(token),
  });

  return response;
}

export async function editTerm(
  { id, name, definition }: TTermBody & { id: string },
  token: string
) {
  const response = await client.mutate({
    mutation: EDIT_TERM,
    variables: { id, name, definition },
    context: setContext(token),
  });

  return response;
}

export async function deleteTerm({ id }: { id: string }, token: string) {
  const response = await client.mutate({
    mutation: DELETE_TERM,
    variables: { id },
    context: setContext(token),
  });

  return response;
}
