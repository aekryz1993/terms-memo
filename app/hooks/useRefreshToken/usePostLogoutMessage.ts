import { useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

import type { MessageData } from "./useReceiveMessage";

export const usePostLogoutMessage = ({
  token,
  numClients,
  isController,
  postMessage,
}: {
  token?: string | null;
  numClients: number;
  isController: boolean;
  postMessage: (data: MessageData) => void;
}) => {
  const transition = useTransition();

  const isFromLogoutRef = useRef(false);

  const fromLogoutPathname = transition.submission?.action === "/logout";
  const fromDestroyTokenPathname =
    transition.type === "fetchActionRedirect" &&
    !transition.submission &&
    transition.state === "loading" &&
    isController;

  if (
    (fromLogoutPathname || fromDestroyTokenPathname) &&
    transition.state === "loading"
  ) {
    isFromLogoutRef.current = true;
  }

  const postMessageCondition =
    transition.state === "idle" && isFromLogoutRef.current && numClients > 1
      ? true
      : false;

  useEffect(() => {
    if (postMessageCondition) {
      postMessage({
        reload: true,
        pathname: "logout",
        fromController: isController,
      });
      isFromLogoutRef.current = false;
    }
  }, [postMessage, postMessageCondition, isController]);
};
