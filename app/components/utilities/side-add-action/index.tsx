import { useCallback, useRef } from "react";
import clsx from "clsx";

import { Title } from "../Typography";
import { useListenForOutsideClicks } from "~/hooks/useListenForOutsideClicks";
import { ControllerIcon } from "./ControllerIcon";
import {
  container,
  closedContainer,
  openedContainer,
  titleClsx,
  contentContainer,
} from "./styled";
import { Box } from "../layout";

export const SideActionContainer = ({
  children,
  title,
  isOpened,
  setIsOpened,
}: {
  children: React.ReactNode;
  title: string;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
      <Box classes={contentContainer}>
        <Title classes={titleClsx}>{title}</Title>
        {children}
      </Box>
      <ControllerIcon isOpened={isOpened} setIsOpened={setIsOpened} />
    </div>
  );
};
