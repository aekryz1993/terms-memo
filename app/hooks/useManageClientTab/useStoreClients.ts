import { useEffect, useMemo } from "react";
import { useCallbackRef } from "../useCallbackRef";

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
  const saveSetClients = useCallbackRef(setClients);

  const storedClient = useMemo(() => {
    return clients?.includes(tabId);
  }, [clients, tabId]);

  const resetClientsCondition = tabId && !storedClient && !isUnloadRef.current;

  useEffect(() => {
    if (!resetClientsCondition) return;

    let doUpdate = true;

    if (doUpdate || !isUnloadRef.current)
      saveSetClients.current((prevState: number[]) =>
        prevState?.length > 0 ? [...prevState, tabId] : [tabId]
      );

    return () => {
      doUpdate = false;
      isUnloadRef.current = false;
    };
  }, [tabId, resetClientsCondition, saveSetClients, isUnloadRef]);
};
