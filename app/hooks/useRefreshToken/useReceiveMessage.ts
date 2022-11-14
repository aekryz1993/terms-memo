import { useEffect } from "react";

import { clearTimeoutIfexist } from ".";

export const useReceiveMessage = ({
  broadcastChannel,
  savePersistRefresh,
  isController,
  timerId,
}: {
  broadcastChannel?: BroadcastChannel;
  savePersistRefresh: React.MutableRefObject<any>;
  isController: boolean;
  timerId: React.MutableRefObject<number | NodeJS.Timeout | null>;
}) => {
  useEffect(() => {
    if (isController) return;

    clearTimeoutIfexist(timerId);

    broadcastChannel?.addEventListener(
      "message",
      ({ data }: { data: { token: string } }) => {
        savePersistRefresh.current.submit(
          { token: data.token },
          { action: "action/sync-cookie-token", method: "post" }
        );
      }
    );
  }, [broadcastChannel, isController, savePersistRefresh, timerId]);
};
