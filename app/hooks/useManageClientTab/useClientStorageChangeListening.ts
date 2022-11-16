import { useCallback, useEffect, useRef } from "react";

export const useClientStorageChangeListening = (setStoredClients: any) => {
  const doUpdateRef = useRef(true);

  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === "clients") {
        if (doUpdateRef.current)
          setStoredClients(JSON.parse(event.newValue as string));
      }
    },
    [setStoredClients]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.addEventListener("storage", handleStorageChange);
      doUpdateRef.current = false;
    };
  }, [handleStorageChange]);
};
