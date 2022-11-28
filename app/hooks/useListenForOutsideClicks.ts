import { useCallback, useEffect } from "react";

export const useListenForOutsideClicks = ({
  handleClose,
  isOpened,
  containerRef,
}: {
  handleClose: () => void;
  isOpened: boolean;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const handleCloseEvent = useCallback(
    (event: any) => {
      const dropdown = containerRef.current;
      const target = event.target;

      if (dropdown?.contains(target)) return;

      handleClose();
    },
    [containerRef, handleClose]
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
