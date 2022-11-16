import { useEffect } from "react";

import { clearTimeoutIfexist } from ".";
import { compareDate, useDeepMemo } from "../useDeepMemo";
import { usePostDataToOtherClientTabs } from "./usePostMessage";
import { useSetRefreshTimer } from "./useSetRefreshTimer";

export const useControllerTask = ({
  numClients,
  isController,
  savePersistRefresh,
  token,
  expiresIn,
  timerId,
  postMessage,
}: {
  numClients: number;
  isController: boolean;
  savePersistRefresh: React.MutableRefObject<any>;
  token?: string | null;
  expiresIn?: Date | null;
  timerId: React.MutableRefObject<number | NodeJS.Timeout | null>;
  postMessage: (data: any) => void;
}) => {
  const delayTimeout = useDeepMemo(expiresIn, compareDate);

  const preventRefresh = !isController || !token;

  const setRefreshTimer = useSetRefreshTimer({
    savePersistRefresh,
    token,
    delayTimeout,
  });

  const postDataToOtherClientTabs = usePostDataToOtherClientTabs({
    numClients,
    savePersistRefresh,
    postMessage,
  });

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
