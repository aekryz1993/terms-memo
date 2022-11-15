import { useCallback } from "react";

export const useSetRefreshTimer = ({
  savePersistRefresh,
  token,
  delayTimeout,
}: {
  savePersistRefresh: React.MutableRefObject<any>;
  token?: string | null;
  delayTimeout: Date;
}) => {
  return useCallback(
    (timerId: React.MutableRefObject<number | NodeJS.Timeout | null>) => {
      timerId.current = setTimeout(() => {
        savePersistRefresh.current.submit(
          { token },
          { action: "action/refresh-token", method: "post" }
        );
      }, delayTimeout.getTime() - Date.now() - 5000);
    },
    [token, delayTimeout, savePersistRefresh]
  );
};
