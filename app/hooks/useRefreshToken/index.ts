import React from "react";
import { useFetcher } from "@remix-run/react";

import { useCallbackRef } from "../useCallbackRef";
import { useBroadcastChannel } from "../useBroadcastChannel";
import { useClientsTabContext } from "~/context/clientsTab";
import { useControllerTask } from "./useControllerTask";

import type { TAuthInfo } from "~/types/data";
import { useReceiveMessage } from "./useReceiveMessage";

export const useRefreshToken = (authInfo: TAuthInfo | null) => {
  const { postMessage, listenToMessage, removeMessageListener } =
    useBroadcastChannel("refresh_token");

  const { isController, numClients } = useClientsTabContext();

  const timerId = React.useRef<NodeJS.Timeout | number | null>(null);

  const persistRefreshAuth = useFetcher();

  const savePersistRefresh = useCallbackRef(persistRefreshAuth);

  useReceiveMessage({
    listenToMessage,
    removeMessageListener,
    savePersistRefresh,
    isController,
    timerId,
  });

  const preventRefresh = !isController || !authInfo?.token;

  useControllerTask({
    numClients,
    preventRefresh,
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
