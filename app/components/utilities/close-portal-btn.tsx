import { XMarkIcon } from "@heroicons/react/24/outline";

import { Box } from "./layout";

const closeBtnContainer =
  "absolute top-4 right-4 p-2 rounded-full bg-text-inactive_lt dark:bg-bg-input_dark cursor-pointer hover:bg-bg-sec_hvr_lt dark:hover:bg-bg-sec_hvr_dark";
const closeBtnIcon = "w-4 h-4";

export const ClosePortalBtn = ({
  handleCloseEvent,
}: {
  handleCloseEvent: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}) => {
  return (
    <Box classes={closeBtnContainer} onClick={handleCloseEvent}>
      <XMarkIcon className={closeBtnIcon} />
    </Box>
  );
};
