import React, { useCallback, useEffect } from "react";
import { useFetcher } from "@remix-run/react";

import { useCallbackRef } from "../useCallbackRef";
import { compareDate, useDeepMemo } from "../useDeepMemo";
import { useBroadcastChannel } from "../useBroadcastChannel";
import { useClientsTabContext } from "~/context/clientsTab";

import type { TAuthInfo } from "~/types/data";

export const useRefreshToken = (authInfo: TAuthInfo | null) => {
  const { postMessage, listenToMessage, removeMessageListener } =
    useBroadcastChannel("refresh_token");

  const { isController, numClients } = useClientsTabContext();

  const timerId = React.useRef<NodeJS.Timeout | number | null>(null);

  const persistRefreshAuth = useFetcher();

  const savePersistRefresh = useCallbackRef(persistRefreshAuth);

  const delayTimeout = useDeepMemo(authInfo?.expiresIn, compareDate);

  const listenMessageCallback = useCallback(
    ({ data }: { data: { token: string } }) => {
      savePersistRefresh.current.submit(
        { token: data.token },
        { action: ".", method: "get" }
      );
    },
    [savePersistRefresh]
  );

  useEffect(() => {
    if (isController) return;

    clearTimeoutIfexist(timerId);

    listenToMessage(listenMessageCallback);
    return () => {
      removeMessageListener(listenMessageCallback);
    };
  }, [
    listenToMessage,
    isController,
    removeMessageListener,
    listenMessageCallback,
  ]);

  const setRefreshTimer = useCallback(
    (timerId: React.MutableRefObject<number | NodeJS.Timeout | null>) => {
      timerId.current = setTimeout(() => {
        savePersistRefresh.current.submit(
          { token: authInfo?.token },
          { action: "action/refresh-token", method: "post" }
        );
      }, delayTimeout.getTime() - Date.now() - 5000);
    },
    [authInfo?.token, delayTimeout, savePersistRefresh]
  );

  const postDataToOtherClientTabs = useCallback(
    (timerId: React.MutableRefObject<number | NodeJS.Timeout | null>) => {
      if (savePersistRefresh.current.type === "done") {
        clearTimeoutIfexist(timerId);
        const data = savePersistRefresh.current.data.authInfo;
        if (numClients > 1) postMessage({ token: data.token });
      }
    },
    [numClients, postMessage, savePersistRefresh]
  );

  const preventRefresh = !isController || !authInfo?.token;

  useEffect(() => {
    if (preventRefresh) {
      clearTimeoutIfexist(timerId);
      return;
    }

    postDataToOtherClientTabs(timerId);
    if (!timerId.current) {
      setRefreshTimer(timerId);
    }

    return () => {
      clearTimeoutIfexist(timerId);
    };
  }, [setRefreshTimer, preventRefresh, timerId, postDataToOtherClientTabs]);
};

const clearTimeoutIfexist = (
  timerId: React.MutableRefObject<number | NodeJS.Timeout | null>
) => {
  if (timerId.current) {
    clearTimeout(timerId.current);
    timerId.current = null;
  }
};
