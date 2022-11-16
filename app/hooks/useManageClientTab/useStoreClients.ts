import { useEffect, useMemo } from "react";

export const useStoreClients = ({
  tabId,
  clients,
  setClients,
  isUnloadRef,
}: {
  tabId: number;
  clients: number[];
  setClients: any;
  isUnloadRef: React.MutableRefObject<boolean>;
}) => {
  const storedClient = useMemo(() => {
    return clients?.includes(tabId);
  }, [clients, tabId]);

  const resetClientsCondition = tabId && !storedClient && !isUnloadRef.current;

  useEffect(() => {
    if (!resetClientsCondition) return;

    let doUpdate = true;

    if (doUpdate)
      setClients((prevState: number[]) =>
        prevState?.length > 0 ? [...prevState, tabId] : [tabId]
      );

    return () => {
      doUpdate = false;
    };
  }, [setClients, tabId, resetClientsCondition]);
};
