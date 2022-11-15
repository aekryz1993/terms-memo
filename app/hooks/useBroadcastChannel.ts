import { useCallback, useMemo } from "react";

export const useBroadcastChannel = (name: string) => {
  const broadcastChannel = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return new BroadcastChannel(name);
  }, [name]);

  const postMessage = useCallback(
    (data: any) => {
      broadcastChannel?.postMessage(data);
    },
    [broadcastChannel]
  );

  const listenToMessage = useCallback(
    (callback: (event: MessageEvent) => void) => {
      broadcastChannel?.addEventListener("message", callback);
    },
    [broadcastChannel]
  );

  const removeMessageListener = useCallback(
    (callback: (event: MessageEvent) => void) => {
      broadcastChannel?.removeEventListener("message", callback);
    },
    [broadcastChannel]
  );

  return { postMessage, listenToMessage, removeMessageListener };
};
