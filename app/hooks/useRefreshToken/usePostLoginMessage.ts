import { useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const usePostLoginMessage = ({
  token,
  numClients,
  postMessage,
}: {
  token?: string | null;
  numClients: number;
  postMessage: (data: { token?: string | null; reload: boolean }) => void;
}) => {
  const transition = useTransition();

  const isFromLoginRef = useRef(false);

  if (
    (transition.submission?.action === "/login" ||
      transition.submission?.action === "/register") &&
    transition.state === "loading"
  ) {
    isFromLoginRef.current = true;
  }

  const postMessageCondition =
    transition.state === "idle" &&
    typeof token === "string" &&
    isFromLoginRef.current &&
    numClients > 1
      ? true
      : false;

  useEffect(() => {
    if (postMessageCondition) {
      postMessage({ reload: true });
      isFromLoginRef.current = false;
    }
  }, [postMessage, postMessageCondition]);
};
