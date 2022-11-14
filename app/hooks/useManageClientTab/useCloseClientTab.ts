import { useEffect } from "react";

export const useCloseClientTab = (
  tabId: number,
  isUnloadRef: React.MutableRefObject<boolean>
) => {
  useEffect(() => {
    function handleTabClose(event: BeforeUnloadEvent) {
      event.preventDefault();
      isUnloadRef.current = true;
      const storedClients = window.localStorage.getItem("clients");
      if (storedClients) {
        const filtredClients = JSON.parse(storedClients).filter(
          (client: number) => client !== tabId
        );
        window.localStorage.setItem("clients", JSON.stringify(filtredClients));
      }
    }

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [tabId, isUnloadRef]);
};
