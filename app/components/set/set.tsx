import { useLoaderData } from "@remix-run/react";
import { useCallback, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

import { Box, Container } from "../utilities/layout";
import { Title } from "../utilities/Typography";
import { Portal } from "../Portal";
import { ClosePortalBtn } from "../utilities/close-portal-btn";
import {
  containerClsx,
  titleClsx,
  displayMoreClsx,
  displayMoreBoxClsx,
  portalRootClsx,
  portalContainertClsx,
} from "./styled";

import type { SetLoaderData } from "~/types/data";

export const Set = () => {
  const { set } = useLoaderData<SetLoaderData>();
  const [isOpened, setIsOpened] = useState(false);

  const handleCloseEvent = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      setIsOpened(false);
    },
    [setIsOpened]
  );

  const handleCloseFromOutside = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  return (
    <>
      <Container classes={containerClsx}>
        <Title classes={titleClsx}>{set.title}</Title>
        <Box
          classes={displayMoreBoxClsx}
          onClick={() => setIsOpened((prevState) => !prevState)}
        >
          <QuestionMarkCircleIcon className={displayMoreClsx} />
        </Box>
      </Container>
      {isOpened ? (
        <Portal
          id="set-description"
          rootClass={portalRootClsx}
          clsx={portalContainertClsx}
          handleClose={handleCloseFromOutside}
        >
          <ClosePortalBtn handleCloseEvent={handleCloseEvent} />
          {set.description
            ? set.description
            : "This set does not have a description!"}
        </Portal>
      ) : null}
    </>
  );
};
