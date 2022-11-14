import type { TUser, TUserBody } from "~/types/endpoints";
import { Typename } from "~/types/enums";

const valid_token = "valid_token";
const invalid_token = "invalid_token";

const expiresIn = () => new Date(Date.now() + 1000 * 20);

const secretJWT = "s3cr3t";

const newUserBody: Readonly<TUserBody> = {
  username: "new_user",
  password: "new_user_password",
};

const existUser: Readonly<TUserBody> = {
  username: "user_0",
  password: "user_0",
};

const notExistUser: Readonly<TUserBody> = {
  username: "user_noExist",
  password: "password",
};

const notMatchPassword: Readonly<TUserBody> = {
  username: "user_0",
  password: "password_notMatch",
};

const authUsernameError = {
  message: "This username does not exist",
  errorType: "AuthenticationError",
};

const authPasswordError = {
  message: "The password is incorrect",
  errorType: "AuthenticationError",
};

const forbiddenError = {
  message: "Forbidden access",
  errorType: "ForbiddenError",
};

const newUser: Readonly<TUser> = {
  id: newUserBody.username,
  username: newUserBody.username,
  __typename: Typename.User,
};

const loginDataResponse = (username: string, token: string, expires: Date) => ({
  user: {
    id: username,
    username,
    __typename: "User",
  },
  token,
  expiresIn: expires,
  statusCode: 200,
});

const refreshDataResponse = (
  username: string,
  token: string,
  expires: Date
) => ({
  user: {
    id: username,
    username,
    __typename: "User",
  },
  token,
  expiresIn: expires,
  statusCode: 200,
});

export {
  valid_token,
  invalid_token,
  expiresIn,
  secretJWT,
  existUser,
  notExistUser,
  notMatchPassword,
  authUsernameError,
  authPasswordError,
  forbiddenError,
  newUser,
  loginDataResponse,
  refreshDataResponse,
};
