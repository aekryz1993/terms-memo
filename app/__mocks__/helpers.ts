import { graphql } from "msw";
import jwt from "jsonwebtoken";

import type { GraphQLRequest, GraphQLVariables } from "msw";
import { findUser } from "./mocks/users";
import { secretJWT } from "./mocks/auth";

const apiGraph =
  process.env.NODE_ENV === "test"
    ? graphql
    : graphql.link("http://localhost:4000/graphql");

const getToken = (req: GraphQLRequest<GraphQLVariables>) => {
  // const { refresh_token } = req.cookies;
  // console.log("cookie: ", refresh_token);
  const headers = new Headers(req.headers);
  const token = headers.get("authorization")?.replace("Bearer ", "");

  // if (token === "null" || token === "undefined" || refresh_token !== token)
  //   return null;
  return token;
};

const validAuth = (req: GraphQLRequest<GraphQLVariables>) => {
  const token = getToken(req);

  if (!token) return { user: null, token: null, expires: null };

  const jwtPayload = jwt.verify(token, secretJWT) as jwt.JwtPayload;

  const user = jwtPayload.sub && findUser(jwtPayload.sub);

  const expires = new Date(
    (jwtPayload.exp as number) - (jwtPayload.iat as number)
  );

  return { user, token, expires };
};

export { apiGraph, getToken, validAuth };
