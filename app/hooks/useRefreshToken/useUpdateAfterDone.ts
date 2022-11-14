import { useEffect } from "react";

import type { TAuthInfo } from "~/types/data";

export const useUpdateAfterDone = ({
  savePersistRefresh,
  updateStates,
  broadcastChannel,
}: {
  savePersistRefresh: React.MutableRefObject<any>;
  updateStates: (authInfo: TAuthInfo) => void;
  broadcastChannel?: BroadcastChannel;
}) => {
  useEffect(() => {
    if (savePersistRefresh.current.type === "done") {
      const authInfo = savePersistRefresh.current.data.authInfo;
      updateStates(authInfo);
      broadcastChannel?.postMessage({
        token: authInfo.token,
        user: authInfo.user,
      });
    }
  }, [broadcastChannel, savePersistRefresh, updateStates]);
};
