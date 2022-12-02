import { useCallback } from "react";
import { dropDownSlot } from "~/components/header/styled";
import { Box } from "../layout";
import { useActionsOption } from "./context";

import type { TOption } from "./context/types";

export const Options = ({
  options,
  setDeleteTimer,
}: {
  options: TOption[];
  setDeleteTimer?: () => void;
}) => {
  const { toggleOpenModalOption, closeOptions, applyBinned } =
    useActionsOption();

  const toggleIsOpenedModal = useCallback(
    (actionType: string) =>
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        toggleOpenModalOption({ actionName: actionType });
        closeOptions();

        if (actionType === "delete") {
          applyBinned();
          setDeleteTimer?.();
        }
      },
    [toggleOpenModalOption, closeOptions]
  );

  return (
    <>
      {options.map((option) => (
        <Box
          key={option.actionType}
          classes={dropDownSlot}
          onClick={toggleIsOpenedModal(option.actionType)}
        >
          {option.label}
        </Box>
      ))}
    </>
  );
};
