import { login, refreshToken, signup } from "~/endpoints/mutation/auth";
import {
  authPasswordError,
  authUsernameError,
  existUser,
  forbiddenError,
  invalid_token,
  loginDataResponse,
  newUserBody,
  notExistUser,
  notMatchPassword,
  refreshDataResponse,
} from "~/__mocks__/mocks/auth";
import { expect } from "@jest/globals";

describe("LOGIN", () => {
  it("successfully logged in", async () => {
    const response = await login(existUser);
    expect(response.data.login).toEqual(
      loginDataResponse(response.data.login.user.username)
    );
  });

  it("user does not exist", async () => {
    try {
      await login(notExistUser);
    } catch (error: any) {
      expect(error.message).toBe(authUsernameError.message);
    }
  });

  it("password is not matched", async () => {
    try {
      await login(notMatchPassword);
    } catch (error: any) {
      expect(error.message).toBe(authPasswordError.message);
    }
  });
});

describe("SIGN UP", () => {
  it("successfully signed up", async () => {
    const response = await signup(newUserBody);
    expect(response.data.signup).toEqual(
      loginDataResponse(response.data.signup.user.username)
    );
  });
});

describe("REFRESH TOKEN", () => {
  const username = "user_0";
  it("successfully refresh token", async () => {
    const response = await refreshToken(`valid_token:${username}`);
    expect(response.data.refreshToken).toEqual(refreshDataResponse(username));
  });

  it("failed to refresh token", async () => {
    try {
      await refreshToken(invalid_token);
    } catch (error: any) {
      expect(error.message).toBe(forbiddenError.message);
    }
  });
});
