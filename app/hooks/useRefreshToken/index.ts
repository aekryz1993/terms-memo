import React from "react";
import { useFetcher } from "@remix-run/react";

import { useCallbackRef } from "../useCallbackRef";
import { useBroadcastChannel } from "../useBroadcastChannel";
import { useClientsTabContext } from "~/context/clientsTab";
import { useControllerTask } from "./useControllerTask";

import type { TAuthInfo } from "~/types/data";
import { useReceiveMessage } from "./useReceiveMessage";
import { usePostLoginMessage } from "./usePostLoginMessage";
import { usePostLogoutMessage } from "./usePostLogoutMessage";

export const useRefreshToken = (authInfo: TAuthInfo | null) => {
  const { postMessage, listenToMessage, removeMessageListener } =
    useBroadcastChannel("refresh_token");

  const { isController, numClients } = useClientsTabContext();

  const timerId = React.useRef<NodeJS.Timeout | number | null>(null);

  const persistRefreshAuth = useFetcher();

  const savePersistRefresh = useCallbackRef(persistRefreshAuth);

  usePostLoginMessage({
    token: authInfo?.token,
    numClients,
    postMessage,
  });

  usePostLogoutMessage({
    token: authInfo?.token,
    numClients,
    isController,
    postMessage,
  });

  useReceiveMessage({
    listenToMessage,
    removeMessageListener,
    savePersistRefresh,
    isController,
    timerId,
    token: authInfo?.token,
  });

  useControllerTask({
    numClients,
    isController,
    savePersistRefresh,
    token: authInfo?.token,
    expiresIn: authInfo?.expiresIn,
    timerId,
    postMessage,
  });
};

export const clearTimeoutIfexist = (
  timerId: React.MutableRefObject<number | NodeJS.Timeout | null>
) => {
  if (timerId.current) {
    clearTimeout(timerId.current);
    timerId.current = null;
  }
};
