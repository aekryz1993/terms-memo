import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { Box, Container } from "../utilities/layout";
import { Portal } from "../Portal";
import {
  arrowDownIconClsx,
  closeIconClsx,
  levelsNavClsx,
  levelsNavContainerClsx,
  modalContainerClsx,
  modalRootClsx,
  xslevelsNavClsx,
} from "./styled";
import { useLevelsNavContext } from "./context";

export const Levels = ({ children }: { children: React.ReactNode }) => {
  const {
    state: { isOpened, currentLevel },
    toggleIsOpened,
    closeIsOpened,
  } = useLevelsNavContext();

  return (
    <Container classes={levelsNavContainerClsx}>
      <Box classes={levelsNavClsx}>{children}</Box>

      <Box
        classes={xslevelsNavClsx}
        onClick={() => {
          toggleIsOpened();
        }}
      >
        {currentLevel.name}
        <ChevronDownIcon className={arrowDownIconClsx} />
      </Box>

      {isOpened ? (
        <Portal
          id="levels"
          rootClass={modalRootClsx}
          clsx={modalContainerClsx}
          handleClose={closeIsOpened}
        >
          <XMarkIcon
            className={closeIconClsx}
            onClick={() => closeIsOpened()}
          />
          {children}
        </Portal>
      ) : null}
    </Container>
  );
};
