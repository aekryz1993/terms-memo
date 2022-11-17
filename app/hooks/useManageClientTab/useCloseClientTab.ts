import { useBeforeUnload } from "@remix-run/react";
import { useCallback } from "react";

export const useCloseClientTab = (
  tabId: number,
  isUnloadRef: React.MutableRefObject<boolean>
) => {
  useBeforeUnload(
    useCallback(() => {
      isUnloadRef.current = true;
      const storedClients = window.localStorage.getItem("clients");
      if (storedClients) {
        const filtredClients = JSON.parse(storedClients).filter(
          (client: number) => client !== tabId
        );
        window.localStorage.setItem("clients", JSON.stringify(filtredClients));
      }
    }, [isUnloadRef, tabId])
  );
};
