import { graphql } from "msw";
import { jwtVerify } from "jose";

import type { GraphQLRequest, GraphQLVariables } from "msw";
import { findUser } from "./mocks/users";
import { secretJWT } from "./mocks/auth";

const apiGraph =
  process.env.NODE_ENV === "test"
    ? graphql
    : graphql.link("http://server.com/graphql");

const getToken = (req: GraphQLRequest<GraphQLVariables>) => {
  const headers = new Headers(req.headers);
  const token = headers.get("authorization")?.replace("Bearer ", "");

  return token;
};

const validAuth = async (req: GraphQLRequest<GraphQLVariables>) => {
  const token = getToken(req);

  if (!token) return { user: null, token: null, expires: null };

  const { payload: jwtPayload } = await jwtVerify(token, secretJWT);

  const user = jwtPayload.sub && findUser(jwtPayload.sub);

  const expires = new Date(jwtPayload.exp as number);

  return { user, token, expires };
};

export { apiGraph, getToken, validAuth };
