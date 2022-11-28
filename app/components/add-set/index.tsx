import clsx from "clsx";
import { useCallback, useRef, useState } from "react";

import {
  closedContainer,
  container,
  openedContainer,
  titleClsx,
} from "./styled";
import { ControllerIcon } from "./ControllerIcon";
import { Title } from "../utilities/Typography";
import { useListenForOutsideClicks } from "~/hooks/useListenForOutsideClicks";
import { SetActionFrom } from "../sets/set-action-form";

export const AddSet = () => {
  const [isOpened, setIsOpened] = useState(false);
  const containerRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  useListenForOutsideClicks({ handleClose, isOpened, containerRef });

  return (
    <div
      className={clsx(container, isOpened ? openedContainer : closedContainer)}
      ref={containerRef}
    >
      <Title classes={titleClsx}>Add a New Set</Title>
      <SetActionFrom
        actionType="add"
        handleClose={handleClose}
        buttonLabel="Add"
      />
      <ControllerIcon isOpened={isOpened} setIsOpened={setIsOpened} />
    </div>
  );
};
