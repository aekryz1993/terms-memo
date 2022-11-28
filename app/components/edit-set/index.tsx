import React, { useCallback } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { titleClsx } from "../add-set/styled";
import { Portal } from "../Portal";
import { SetActionFrom } from "../sets/set-action-form";
import { Title } from "../utilities/Typography";
import {
  closeBtnContainer,
  closeBtnIcon,
  portalContainertClsx,
  portalRootClsx,
} from "./styled";
import { Box } from "../utilities/layout";

export const EditSet = ({
  id,
  title,
  description,
  isOpened,
  setIsOpenedModal,
}: {
  id: string;
  title: string;
  description?: string | null;
  isOpened: boolean;
  setIsOpenedModal: React.Dispatch<
    React.SetStateAction<{ edit: boolean; delete: boolean }>
  >;
}) => {
  const handleClose = useCallback(() => {
    setIsOpenedModal((prevState) => ({ ...prevState, edit: false }));
  }, [setIsOpenedModal]);

  return (
    <Portal
      id="edit-set"
      rootClass={portalRootClsx}
      clsx={portalContainertClsx}
    >
      <Box
        classes={closeBtnContainer}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpenedModal((prevState) => ({ ...prevState, edit: false }));
        }}
      >
        <XMarkIcon className={closeBtnIcon} />
      </Box>
      <Title classes={titleClsx}>Edit the Set</Title>
      <SetActionFrom
        title={title}
        id={id}
        description={description}
        actionType="edit"
        handleClose={handleClose}
        buttonLabel="Update"
      />
    </Portal>
  );
};
