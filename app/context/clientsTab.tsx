import { createContext, useContext } from "react";
import { useManageClientTab } from "~/hooks/useManageClientTab";

const ClientsTabContext = createContext<
  { isController: boolean; numClients: number } | undefined
>(undefined);

export const ClientsTabProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isController, numClients } = useManageClientTab();

  return (
    <ClientsTabContext.Provider value={{ isController, numClients }}>
      {children}
    </ClientsTabContext.Provider>
  );
};

export const useClientsTabContext = () => {
  const context = useContext(ClientsTabContext);
  if (!context) {
    throw new Error(
      "useClientsTabContext must be used within a ClientsTabProvider"
    );
  }

  return context;
};
