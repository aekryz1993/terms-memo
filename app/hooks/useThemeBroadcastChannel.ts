import { useCallback, useEffect } from "react";

import { Theme } from "~/context/theme";

import type { TListenEventCallback } from "./useBroadcastChannel";

export const useThemeBroadcastChannel = ({
  listenToMessage,
  removeMessageListener,
  setTheme,
}: {
  listenToMessage: TListenEventCallback<{}>;
  removeMessageListener: TListenEventCallback<{}>;
  setTheme: React.Dispatch<React.SetStateAction<Theme | null>>;
}) => {
  const callback = useCallback(() => {
    setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  }, [setTheme]);

  useEffect(() => {
    listenToMessage(callback);

    return () => {
      removeMessageListener(callback);
    };
  }, [listenToMessage, removeMessageListener, callback]);
};
