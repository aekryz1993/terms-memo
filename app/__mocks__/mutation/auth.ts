import { rest } from "msw";
import { jwtVerify, SignJWT } from "jose";

import {
  authPasswordError,
  authUsernameError,
  expiresIn,
  forbiddenError,
  loginDataResponse,
  secretJWT,
  alg,
} from "../mocks/auth";
import { checkPassword, existUserError, findUser, users } from "../mocks/users";
import { apiGraph, validAuth } from "../helpers";

const loginMock = apiGraph.mutation("Login", async (req, res, ctx) => {
  const { username, password } = req.variables;

  const user = findUser(username);

  if (!user) return res(ctx.errors([authUsernameError]));

  if (!checkPassword(user)(password))
    return res(ctx.errors([authPasswordError]));

  const token = await new SignJWT({ sub: username })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expiresIn().getTime())
    .sign(secretJWT);

  const { payload: jwtPayload } = await jwtVerify(token, secretJWT);

  const loginData = loginDataResponse(
    username,
    token,
    new Date(jwtPayload.exp as number)
  );

  return res(
    ctx.data({
      login: loginData,
    })
  );
});

const signupMock = apiGraph.mutation("Signup", async (req, res, ctx) => {
  const { username, password } = req.variables;

  const user = findUser(username);

  if (user) return res(ctx.errors([existUserError]));

  if (process.env.NODE_ENV !== "test") {
    users.push({ id: username, username, password });
  }

  const token = await new SignJWT({ sub: username })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expiresIn().getTime())
    .sign(secretJWT);

  const { payload: jwtPayload } = await jwtVerify(token, secretJWT);

  const loginData = loginDataResponse(
    username,
    token,
    new Date(jwtPayload.exp as number)
  );

  return res(
    ctx.data({
      signup: loginData,
    })
  );
});

const refreshTokenMock = apiGraph.mutation(
  "RefreshToken",
  async (req, res, ctx) => {
    try {
      const { user } = await validAuth(req);

      if (!user) return res(ctx.errors([forbiddenError]));

      const token = await new SignJWT({ sub: user.id })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(expiresIn().getTime())
        .sign(secretJWT);

      const { payload: jwtPayload } = await jwtVerify(token, secretJWT);

      const authData = loginDataResponse(
        user.username,
        token,
        new Date(jwtPayload.exp as number)
      );

      return res(
        ctx.data({
          refreshToken: authData,
        })
      );
    } catch {
      return res(ctx.errors([forbiddenError]));
    }
  }
);

const checkTokenMock = apiGraph.mutation(
  "CheckToken",
  async (req, res, ctx) => {
    try {
      const { user, token, expires } = await validAuth(req);

      if (!user || !token) return res(ctx.errors([forbiddenError]));

      const authData = loginDataResponse(user.username, token, expires);

      return res(
        ctx.data({
          checkToken: authData,
        })
      );
    } catch {
      return res(ctx.errors([forbiddenError]));
    }
  }
);

const logoutMock = apiGraph.mutation("Logout", async (req, res, ctx) => {
  try {
    const { user, token } = await validAuth(req);

    if (!user || !token) return res(ctx.errors([forbiddenError]));

    return res(
      ctx.data({
        logout: { statusCode: 200 },
      })
    );
  } catch {
    return res(ctx.errors([forbiddenError]));
  }
});

const getHttponlyCookies = rest.get(
  "http://localhost:4000/api/cookies",
  (req, res, ctx) => {
    const { refresh_token } = req.cookies;
    if (refresh_token) return res(ctx.json({ cookies: { refresh_token } }));
    return res(ctx.json({ cookies: null }));
  }
);

export const auth = () => [
  loginMock,
  signupMock,
  refreshTokenMock,
  checkTokenMock,
  getHttponlyCookies,
  logoutMock,
];
