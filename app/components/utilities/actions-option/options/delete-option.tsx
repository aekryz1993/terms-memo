import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import { Portal } from "~/components/Portal";
import { Box } from "../../layout";
import { Sentence } from "../../Typography";
import { useActionsOption } from "../context";
import {
  actionClsx,
  actionsBoxClsx,
  closeClsx,
  closeIconClsx,
  deleteContainerClsx,
  deleteRootclsx,
  undoClsx,
} from "../styled";

export const DeleteOption = ({
  text,
  id,
  deleteTimerIdRef,
}: {
  text: string;
  id: string;
  deleteTimerIdRef: React.MutableRefObject<number | NodeJS.Timeout | null>;
}) => {
  const { cancelBinned, closeModalOption } = useActionsOption();

  const handleClose = () => {
    closeModalOption({ actionName: "delete" });
  };

  const handleUndo = () => {
    if (deleteTimerIdRef.current) {
      clearTimeout(deleteTimerIdRef.current);
      deleteTimerIdRef.current = null;
      cancelBinned();
      handleClose();
    }
  };

  return (
    <Portal id={id} rootClass={deleteRootclsx} clsx={deleteContainerClsx}>
      <Box>
        <Sentence>{text}</Sentence>
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
