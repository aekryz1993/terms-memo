import { useCallback } from "react";

import { Portal } from "../Portal";
import { Paragraph, Title } from "../utilities/Typography";
import { ClosePortalBtn } from "../utilities/close-portal-btn";
import { portalContainertClsx, portalRootClsx } from "../set/styled";
import { paragraphClsx, titleClsx } from "./styled";

import type { TTerm } from "~/types/endpoints";

export const TermLayout = ({
  term,
  setStateAction,
}: {
  term: TTerm;
  setStateAction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      setStateAction(false);
    },
    [setStateAction]
  );

  const handleCloseFromOutside = useCallback(() => {
    setStateAction(false);
  }, [setStateAction]);

  return (
    <Portal
      id="term-layout"
      rootClass={portalRootClsx}
      clsx={portalContainertClsx}
      handleClose={handleCloseFromOutside}
    >
      <ClosePortalBtn handleCloseEvent={handleClose} />
      <Title classes={titleClsx}>{term.name}</Title>
      {term.definition ? (
        <Paragraph classes={paragraphClsx}>{term.definition}</Paragraph>
      ) : (
        "This term does not have a definition!"
      )}
    </Portal>
  );
};
