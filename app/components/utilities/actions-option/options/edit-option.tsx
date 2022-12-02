import { useCallback } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  closeBtnContainer,
  closeBtnIcon,
  portalContainertClsx,
  portalRootClsx,
  titleClsx,
} from "../styled";
import { useActionsOption } from "../context";
import { Portal } from "~/components/Portal";
import { Box } from "../../layout";
import { Title } from "../../Typography";

export const EditOption = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { closeModalOption } = useActionsOption();

  const handleCloseEvent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    closeModalOption({ actionName: "edit" });
  };

  return (
    <Portal
      id="edit-set"
      rootClass={portalRootClsx}
      clsx={portalContainertClsx}
    >
      <Box classes={closeBtnContainer} onClick={handleCloseEvent}>
        <XMarkIcon className={closeBtnIcon} />
      </Box>
      <Title classes={titleClsx}>{title}</Title>
      {children}
    </Portal>
  );
};
