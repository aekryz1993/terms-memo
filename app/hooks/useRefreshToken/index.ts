import React, { useEffect } from "react";
import { useFetcher } from "@remix-run/react";

import type { TUser } from "~/types/endpoints";
import type { TAuthInfo } from "~/types/data";
import { useCallbackRef } from "../useCallbackRef";
import { compareDate, useDeepMemo } from "../useDeepMemo";
import { useBroadcastChannel } from "../useBroadcastChannel";
import { useClientsTabContext } from "~/context/clientsTab";

export const useRefreshToken = (authInfo: TAuthInfo | null) => {
  const [token, setToken] = React.useState<string | null>(
    () => authInfo?.token || null
  );

  const [loggedUser, setLoggedUser] = React.useState<TUser | null>(
    () => authInfo?.user || null
  );

  const { postMessage, listenToMessage } = useBroadcastChannel("refresh_token");

  const { isController, numClients } = useClientsTabContext();

  const timerId = React.useRef<NodeJS.Timeout | number | null>(null);

  const persistRefreshAuth = useFetcher();

  const savePersistRefresh = useCallbackRef(persistRefreshAuth);

  const delayTimeout = useDeepMemo(authInfo?.expiresIn, compareDate);

  useEffect(() => {
    if (isController) return;

    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    listenToMessage(({ data }: { data: { token: string } }) => {
      savePersistRefresh.current.submit(
        { token: data.token },
        { action: "action/sync-cookie-token", method: "post" }
      );
    });
  }, [listenToMessage, isController, savePersistRefresh, numClients]);

  useEffect(() => {
    if (!isController) return;
    if (!authInfo?.token && !timerId.current) return;
    if (!authInfo?.token && timerId.current) {
      clearTimeout(timerId.current);
      return;
    }

    if (savePersistRefresh.current.type === "done") {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
      const data = savePersistRefresh.current.data;
      setToken(data.authInfo.token);
      setLoggedUser(data.authInfo.user);
      if (numClients > 1) postMessage({ token: data.authInfo.token });
    }

    if (authInfo?.token && !timerId.current && delayTimeout) {
      timerId.current = setTimeout(() => {
        savePersistRefresh.current.submit(
          { token: authInfo?.token },
          { action: "action/refresh-token", method: "post" }
        );
      }, delayTimeout.getTime() - Date.now() - 5000);
    }

    return () => {
      clearTimeoutIfexist(timerId);
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, [
    authInfo?.token,
    postMessage,
    delayTimeout,
    isController,
    savePersistRefresh,
    numClients,
  ]);

  return { token, setToken, loggedUser, setLoggedUser };
};

const clearTimeoutIfexist = (
  timerId: React.MutableRefObject<number | NodeJS.Timeout | null>
) => {
  if (timerId.current) {
    clearTimeout(timerId.current);
    timerId.current = null;
  }
};
