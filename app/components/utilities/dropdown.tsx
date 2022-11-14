import clsx from "clsx";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useListenForOutsideClicks } from "~/hooks/useListenForOutsideClicks";
import { dropdownContainer } from "../header/styled";

const Dropdown = ({
  children,
  setIsOpened,
  isOpened,
}: {
  children: React.ReactNode;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isOpened: boolean;
}) => {
  const { i18n } = useTranslation();
  const dropdownRef = useRef(null);

  useListenForOutsideClicks({ setIsOpened, isOpened, dropdownRef });

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
          ref={dropdownRef}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};

export { Dropdown };
