import { useEffect } from "react";

export const usePostMessage = ({
  broadcastChannel,
  isController,
  token,
  expiresIn,
  savePersistRefresh,
}: {
  broadcastChannel?: BroadcastChannel;
  isController: boolean;
  token?: string | null;
  expiresIn?: Date | null;
  savePersistRefresh: React.MutableRefObject<any>;
}) => {
  useEffect(() => {}, []);
};
