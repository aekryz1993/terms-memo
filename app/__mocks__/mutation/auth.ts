import { rest } from "msw";
import jwt from "jsonwebtoken";
import {
  authPasswordError,
  authUsernameError,
  expiresIn,
  forbiddenError,
  loginDataResponse,
  secretJWT,
} from "../mocks/auth";
import { checkPassword, existUserError, findUser, users } from "../mocks/users";
import { apiGraph, validAuth } from "../helpers";

const loginMock = apiGraph.mutation("Login", (req, res, ctx) => {
  const { username, password } = req.variables;

  const user = findUser(username);

  if (!user) return res(ctx.errors([authUsernameError]));

  if (!checkPassword(user)(password))
    return res(ctx.errors([authPasswordError]));

  const token = jwt.sign({ sub: username, iat: Date.now() }, secretJWT, {
    expiresIn: expiresIn().getTime(),
  });

  const jwtPayload = jwt.verify(token, secretJWT) as jwt.JwtPayload;

  const loginData = loginDataResponse(
    username,
    token,
    new Date((jwtPayload.exp as number) - (jwtPayload.iat as number))
  );

  return res(
    // ctx.cookie("refresh_token", loginData.token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "lax",
    //   expires: loginData.expiresIn,
    // }),
    ctx.data({
      login: loginData,
    })
  );
});

const signupMock = apiGraph.mutation("Signup", (req, res, ctx) => {
  const { username, password } = req.variables;

  const user = findUser(username);

  if (user) return res(ctx.errors([existUserError]));

  if (process.env.NODE_ENV !== "test") {
    users.push({ id: username, username, password });
  }

  const token = jwt.sign({ sub: username, iat: Date.now() }, secretJWT, {
    expiresIn: expiresIn().getTime(),
  });

  const jwtPayload = jwt.verify(token, secretJWT) as jwt.JwtPayload;

  const loginData = loginDataResponse(
    username,
    token,
    new Date((jwtPayload.exp as number) - (jwtPayload.iat as number))
  );

  return res(
    // ctx.cookie("refresh_token", loginData.token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "lax",
    //   expires: loginData.expiresIn,
    // }),
    ctx.data({
      signup: loginData,
    })
  );
});

const refreshTokenMock = apiGraph.mutation("RefreshToken", (req, res, ctx) => {
  try {
    const { user } = validAuth(req);

    if (!user)
      return res(
        // ctx.cookie("refresh_token", "", { maxAge: 0 }),
        ctx.errors([forbiddenError])
      );

    const token = jwt.sign({ sub: user.username, iat: Date.now() }, secretJWT, {
      expiresIn: expiresIn().getTime(),
    });

    const jwtPayload = jwt.verify(token, secretJWT) as jwt.JwtPayload;

    const authData = loginDataResponse(
      user.username,
      token,
      new Date((jwtPayload.exp as number) - (jwtPayload.iat as number))
    );

    return res(
      // ctx.cookie("refresh_token", authData.token, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "lax",
      //   expires: authData.expiresIn,
      // }),
      ctx.data({
        refreshToken: authData,
      })
    );
  } catch {
    return res(ctx.errors([forbiddenError]));
  }
});

const checkTokenMock = apiGraph.mutation("CheckToken", (req, res, ctx) => {
  try {
    const { user, token, expires } = validAuth(req);

    if (!user || !token)
      return res(
        // ctx.cookie("refresh_token", "", { maxAge: 0 }),
        ctx.errors([forbiddenError])
      );

    const authData = loginDataResponse(user.username, token, expires);

    return res(
      ctx.data({
        checkToken: authData,
      })
    );
  } catch {
    return res(ctx.errors([forbiddenError]));
  }
});

const logoutMock = apiGraph.mutation("Logout", (req, res, ctx) => {
  try {
    const { user, token } = validAuth(req);

    if (!user || !token)
      return res(
        // ctx.cookie("refresh_token", "", { maxAge: 0 }),
        ctx.errors([forbiddenError])
      );

    return res(
      // ctx.cookie("refresh_token", "", { maxAge: 0 }),
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
