import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import { Portal } from "../Portal";
import { Box } from "../utilities/layout";
import { Sentence } from "../utilities/Typography";
import {
  actionClsx,
  actionsBoxClsx,
  closeClsx,
  closeIconClsx,
  deleteContainerClsx,
  deleteRootclsx,
  undoClsx,
} from "./styled";

export const DeleteSet = ({
  deleteTimerIdRef,
  setIsOpenedModal,
  setIsBinned,
}: {
  deleteTimerIdRef: React.MutableRefObject<number | NodeJS.Timeout | null>;
  setIsOpenedModal: React.Dispatch<
    React.SetStateAction<{
      edit: boolean;
      delete: boolean;
    }>
  >;
  setIsBinned: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleUndo = () => {
    if (deleteTimerIdRef.current) {
      clearTimeout(deleteTimerIdRef.current);
      deleteTimerIdRef.current = null;
      setIsBinned(false);
      setIsOpenedModal((prevState) => ({ ...prevState, delete: false }));
    }
  };

  const handleClose = () => {
    setIsOpenedModal((prevState) => ({ ...prevState, delete: false }));
  };

  return (
    <Portal
      id="delete-set"
      rootClass={deleteRootclsx}
      clsx={deleteContainerClsx}
    >
      <Box>
        <Sentence>Set binned</Sentence>
      </Box>
      <Box classes={actionsBoxClsx}>
        <button className={clsx(actionClsx, undoClsx)} onClick={handleUndo}>
          Undo
        </button>
        <button className={clsx(actionClsx, closeClsx)} onClick={handleClose}>
          <XMarkIcon className={closeIconClsx} />
        </button>
      </Box>
    </Portal>
  );
};
