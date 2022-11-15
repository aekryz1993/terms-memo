import { useCallback } from "react";
import { clearTimeoutIfexist } from ".";

export const usePostDataToOtherClientTabs = ({
  numClients,
  savePersistRefresh,
  postMessage,
}: {
  numClients: number;
  savePersistRefresh: React.MutableRefObject<any>;
  postMessage: (data: any) => void;
}) => {
  return useCallback(
    (timerId: React.MutableRefObject<number | NodeJS.Timeout | null>) => {
      if (savePersistRefresh.current.type === "done") {
        clearTimeoutIfexist(timerId);
        const data = savePersistRefresh.current.data.authInfo;
        if (numClients > 1) postMessage({ token: data.token });
      }
    },
    [numClients, postMessage, savePersistRefresh]
  );
};
