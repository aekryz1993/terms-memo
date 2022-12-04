import clsx from "clsx";
import { PlusIcon } from "@heroicons/react/24/outline";

import { openOrCloseIcon, closeIcon, openIcon, openOrCloseBox } from "./styled";
import { Box } from "../layout";

export const ControllerIcon = ({
  isOpened,
  setIsOpened,
}: {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Box classes={openOrCloseBox}>
    <PlusIcon
      className={clsx(openOrCloseIcon, isOpened ? openIcon : closeIcon)}
      onClick={() => setIsOpened((prev) => !prev)}
    />
  </Box>
);
