import { useMemo, useRef } from "react";
import { useStorage } from "../useStorage";
import { useClientStorageChangeListening } from "./useClientStorageChangeListening";
import { useCloseClientTab } from "./useCloseClientTab";
import { useStoreClients } from "./useStoreClients";
import { useStoreTabSession } from "./useStoreTabSession";

export const useManageClientTab = () => {
  const { storedValue: tabId, setValue: setTabId } = useStorage({
    storageType: "sessionStorage",
    key: "TabId",
    dependencyInitValue: (prevStoredValue?: any) => {
      if (prevStoredValue) {
        return JSON.parse(prevStoredValue);
      }
      return Date.now();
    },
  });

  const dependencyInitValue = useMemo(
    () => (prevStoredValue?: any) => {
      if (!tabId) return JSON.parse(prevStoredValue);
      if (!prevStoredValue) {
        const newState = [tabId];
        window.localStorage.setItem("clients", JSON.stringify(newState));
        return newState;
      }

      const parsedStoredValue = JSON.parse(prevStoredValue);

      if (parsedStoredValue.includes(tabId)) return parsedStoredValue;
      else {
        const newState = [...parsedStoredValue, tabId];
        window.localStorage.setItem("clients", JSON.stringify(newState));
        return newState;
      }
    },
    [tabId]
  );

  const {
    storedValue: clients,
    setValue: setClients,
    setStoredValue: setStoredClients,
  } = useStorage({
    storageType: "localStorage",
    key: "clients",
    dependencyInitValue,
  });

  const isUnloadRef = useRef(false);

  useStoreTabSession(tabId, setTabId);
  useStoreClients({ tabId, clients, setClients, isUnloadRef });
  useCloseClientTab(tabId, isUnloadRef);
  useClientStorageChangeListening(setStoredClients);

  return {
    isController: clients?.length && tabId ? clients[0] === tabId : false,
    numClients: clients?.length ?? 0,
  };
};
