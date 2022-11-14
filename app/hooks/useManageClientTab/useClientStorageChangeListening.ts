import { useCallback, useEffect } from "react";

export const useClientStorageChangeListening = (setStoredClients: any) => {
  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === "clients") {
        setStoredClients(JSON.parse(event.newValue as string));
      }
    },
    [setStoredClients]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.addEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);
};
