import React from "react";
import { expect } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";
import { useRefreshToken } from "~/hooks/useRefreshToken";
import { REFRESH_TOKEN } from "~/endpoints/mutation/auth";
import {
  forbiddenError,
  invalid_token,
  refreshDataResponse,
  valid_token,
} from "~/__mocks__/mocks/auth";
import { ApolloProvider, useMutation } from "@apollo/client";
import client from "~/apollo-client";

describe("USE_REFRESH_TOKEN", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  );

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("useRefreshToken hook should update their states and setup a timeout", async () => {
    const authInfo = {
      user: {
        id: "user_0",
        username: "user_0",
      },
      token: "valid_token:user_0",
      expires_in: Date.now() - 6000,
    };

    const { result: refreshTokenResult } = renderHook(
      () => useMutation(REFRESH_TOKEN),
      {
        wrapper,
      }
    );

    const [refresh] = refreshTokenResult.current;
    const refreshMock = jest.fn(() => refresh);

    const { result } = renderHook(
      ({ initialValue }) => useRefreshToken(initialValue, refreshMock()),
      {
        initialProps: { initialValue: authInfo },
      }
    );

    expect(refreshMock).toHaveBeenCalledTimes(1);
    expect(result.current.token).toBe(authInfo.token);
    expect(result.current.loggedUser).toEqual(authInfo.user);
    expect(result.current.error).toBe(null);
    expect(refreshTokenResult.current[1].data).toBeUndefined();

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(refreshMock).toHaveBeenCalledTimes(3);
    expect(result.current.token).toBe(
      refreshDataResponse(authInfo.user.username).token
    );
    expect(result.current.loggedUser).toEqual(
      refreshDataResponse(authInfo.user.username).user
    );
    expect(result.current.error).toBe(null);
    expect(refreshTokenResult.current[1].data.refreshToken).toEqual(
      refreshDataResponse(
        refreshTokenResult.current[1].data.refreshToken.user.username
      )
    );
  });

  it("useRefreshToken hook should return an error when token is invalid", async () => {
    const authInfo = {
      user: {
        id: "0",
        username: "user_0",
      },
      token: invalid_token,
      expires_in: Date.now() - 6000,
    };

    const { result: refreshTokenResult } = renderHook(
      () => useMutation(REFRESH_TOKEN),
      {
        wrapper,
      }
    );

    const [refresh] = refreshTokenResult.current;
    const refreshMock = jest.fn(() => refresh);

    const { result } = renderHook(
      ({ initialValue }) => useRefreshToken(initialValue, refreshMock()),
      {
        initialProps: { initialValue: authInfo },
      }
    );

    expect(result.current.token).toBe(authInfo.token);
    expect(result.current.loggedUser).toEqual(authInfo.user);
    expect(refreshTokenResult.current[1].data).toBeUndefined();

    expect(refreshMock).toHaveBeenCalledTimes(1);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(refreshMock).toHaveBeenCalledTimes(2);

    expect(result.current.token).toBe(null);
    expect(result.current.loggedUser).toBe(null);
    expect(result.current.error).toBe(forbiddenError.message);

    expect(refreshTokenResult.current[1].data).toBeUndefined();
  });

  it("useRefreshToken hook should cleanup the timer when logout", async () => {
    const authInfo = {
      user: {
        id: "0",
        username: "user_0",
      },
      token: valid_token,
      expires_in: Date.now() - 6000,
    };

    const { result: refreshTokenResult } = renderHook(
      () => useMutation(REFRESH_TOKEN),
      {
        wrapper,
      }
    );

    const [refresh] = refreshTokenResult.current;
    const refreshMock = jest.fn(() => refresh);

    const { result } = renderHook(
      ({ initialValue }) => useRefreshToken(initialValue, refreshMock()),
      {
        initialProps: { initialValue: authInfo },
      }
    );

    expect(result.current.token).toBe(authInfo.token);
    expect(result.current.loggedUser).toEqual(authInfo.user);
    expect(refreshTokenResult.current[1].data).toBeUndefined();

    expect(refreshMock).toHaveBeenCalledTimes(1);

    await act(() => {
      result.current.setToken(null);
      result.current.setLoggedUser(null);
    });

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(refreshMock).toHaveBeenCalledTimes(2);

    expect(result.current.token).toBe(null);
    expect(result.current.loggedUser).toBe(null);
    expect(result.current.error).toBe(null);

    expect(refreshTokenResult.current[1].data).toBeUndefined();
  });
});
