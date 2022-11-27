import clsx from "clsx";
import { PlusIcon } from "@heroicons/react/24/outline";

import { openOrCloseIcon, closeIcon, openIcon, openOrCloseBox } from "./styled";
import { Box } from "../utilities/layout";

export const ControllerIcon = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Box classes={openOrCloseBox}>
    <PlusIcon
      className={clsx(openOrCloseIcon, isOpen ? openIcon : closeIcon)}
      onClick={() => setIsOpen((prev) => !prev)}
    />
  </Box>
);
