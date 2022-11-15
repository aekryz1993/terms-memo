import { useCallback, useEffect } from "react";

import { clearTimeoutIfexist } from ".";

export const useReceiveMessage = ({
  listenToMessage,
  removeMessageListener,
  savePersistRefresh,
  isController,
  timerId,
}: {
  listenToMessage: (callback: (event: MessageEvent<any>) => void) => void;
  removeMessageListener: (callback: (event: MessageEvent<any>) => void) => void;
  savePersistRefresh: React.MutableRefObject<any>;
  isController: boolean;
  timerId: React.MutableRefObject<number | NodeJS.Timeout | null>;
}) => {
  const listenMessageCallback = useCallback(
    ({ data }: { data: { token: string } }) => {
      savePersistRefresh.current.submit(
        { token: data.token },
        { action: ".", method: "get" }
      );
    },
    [savePersistRefresh]
  );

  const listinerCondition = useCallback(() => {
    if (isController) return;
    clearTimeoutIfexist(timerId);
  }, [isController, timerId]);

  useEffect(() => {
    listinerCondition();
    listenToMessage(listenMessageCallback);
    return () => {
      removeMessageListener(listenMessageCallback);
    };
  }, [
    listenToMessage,
    removeMessageListener,
    listenMessageCallback,
    listinerCondition,
  ]);
};
