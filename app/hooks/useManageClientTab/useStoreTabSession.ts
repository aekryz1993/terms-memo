import { useEffect } from "react";
import { useCallbackRef } from "../useCallbackRef";

export const useStoreTabSession = (tabId: number, setTabId: any) => {
  // const setStoredTabIdRef = useCallbackRef(setTabId);

  useEffect(() => {
    if (!tabId) {
      const id = Date.now();
      setTabId(id);
      // setStoredTabIdRef.current(id);
    }
  }, [setTabId, tabId]);
  // }, [setStoredTabIdRef, tabId]);
};
