import { useEffect } from "react";

export const useStoreTabSession = (tabId: number, setTabId: any) => {
  useEffect(() => {
    if (!tabId) {
      const id = Date.now();
      setTabId(id);
    }
  }, [setTabId, tabId]);
};
