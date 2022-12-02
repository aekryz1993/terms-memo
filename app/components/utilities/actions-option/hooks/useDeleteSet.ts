import { useFetcher } from "@remix-run/react";
import { useCallback, useEffect, useRef } from "react";

import { useCallbackRef } from "~/hooks/useCallbackRef";

export const useDelete = ({
  id,
  action,
  actionType,
}: {
  id: string;
  action: string;
  actionType: string;
}) => {
  const persistDelete = useFetcher();
  const savePersistDelete = useCallbackRef(persistDelete);

  const deleteTimerIdRef = useRef<NodeJS.Timeout | number | null>(null);

  const setDeleteTimer = useCallback(() => {
    deleteTimerIdRef.current = setTimeout(() => {
      savePersistDelete.current.submit({ id }, { action, method: "post" });
    }, 10000);
  }, [deleteTimerIdRef, savePersistDelete]);

  useEffect(() => {
    if (
      savePersistDelete.current.type === "done" &&
      savePersistDelete.current.data.actionType === actionType
    ) {
      if (deleteTimerIdRef.current) {
        clearTimeout(deleteTimerIdRef.current);
        deleteTimerIdRef.current = null;
      }
    }
    return () => {
      if (deleteTimerIdRef.current) {
        clearTimeout(deleteTimerIdRef.current);
      }
    };
  }, [deleteTimerIdRef, savePersistDelete]);

  return { setDeleteTimer, deleteTimerIdRef };
};
