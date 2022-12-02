import clsx from "clsx";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useListenForOutsideClicks } from "~/hooks/useListenForOutsideClicks";
import { dropdownContainer } from "../header/styled";

const Dropdown = ({
  children,
  handleClose,
  isOpened,
}: {
  children: React.ReactNode;
  handleClose: () => void;
  isOpened: boolean;
}) => {
  const { i18n } = useTranslation();
  const containerRef = useRef(null);

  useListenForOutsideClicks({ handleClose, isOpened, containerRef });

  return (
    <>
      {isOpened ? (
        <div
          className={clsx(
            dropdownContainer,
            i18n.dir(i18n.language) === "rtl"
              ? "translate-x-2/4"
              : "-translate-x-2/4"
          )}
          ref={containerRef}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};

export { Dropdown };
