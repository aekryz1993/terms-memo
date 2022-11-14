import { gql } from "@apollo/client";
import client from "~/apollo-client";
import type { TUserBody } from "~/types/endpoints";
import { setContext } from "~/utils/helpers";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
      }
      token
      expiresIn
      statusCode
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      user {
        id
        username
      }
      token
      expiresIn
      statusCode
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      user {
        id
        username
      }
      token
      expiresIn
      statusCode
    }
  }
`;

export const CHECK_TOKEN = gql`
  mutation CheckToken {
    checkToken {
      user {
        id
        username
      }
      token
      expiresIn
      statusCode
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      statusCode
    }
  }
`;

export async function login({ username, password }: TUserBody) {
  const response = await client.mutate({
    mutation: LOGIN,
    variables: { username, password },
  });
  return response;
}

export async function signup({ username, password }: TUserBody) {
  const response = await client.mutate({
    mutation: SIGNUP,
    variables: { username, password },
  });
  return response;
}

export async function refreshToken(token?: string | null) {
  const response = await client.mutate({
    mutation: REFRESH_TOKEN,
    context: setContext(token),
  });
  return response;
}

export async function checkToken(token?: string | null) {
  const response = await client.mutate({
    mutation: CHECK_TOKEN,
    context: setContext(token),
  });
  return response;
}

export async function logout(token?: string | null) {
  const response = await client.mutate({
    mutation: LOGOUT,
    context: setContext(token),
  });
  return response;
}
