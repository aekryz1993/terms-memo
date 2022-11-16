import { useEffect } from "react";

export const useStoreTabSession = (tabId: number, setTabId: any) => {
  useEffect(() => {
    let doUpdate = true;

    if (!tabId && doUpdate) {
      const id = Date.now();
      setTabId(id);
    }

    return () => {
      doUpdate = false;
    };
  }, [setTabId, tabId]);
};
