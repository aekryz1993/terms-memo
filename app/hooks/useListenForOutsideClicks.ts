import { useCallback, useEffect } from "react";

export const useListenForOutsideClicks = ({
  setIsOpened,
  isOpened,
  dropdownRef,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isOpened: boolean;
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const handleCloseEvent = useCallback(
    (event: any) => {
      const dropdown = dropdownRef.current;
      const target = event.target;

      if (dropdown?.contains(target)) return;

      setIsOpened(false);
    },
    [dropdownRef, setIsOpened]
  );

  useEffect(() => {
    if (!isOpened) {
      document.removeEventListener("click", handleCloseEvent);
    } else {
      document.addEventListener("click", handleCloseEvent);
    }

    return () => {
      document.removeEventListener("click", handleCloseEvent);
    };
  }, [handleCloseEvent, isOpened]);
};
