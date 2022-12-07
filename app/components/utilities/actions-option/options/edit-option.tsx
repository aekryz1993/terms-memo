import { portalContainertClsx, portalRootClsx, titleClsx } from "../styled";
import { useActionsOption } from "../context";
import { Portal } from "~/components/Portal";
import { Title } from "../../Typography";
import { ClosePortalBtn } from "../../close-portal-btn";

export const EditOption = ({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) => {
  const { closeModalOption } = useActionsOption();

  const handleCloseEvent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    closeModalOption({ actionName: "edit" });
  };

  const handleCloseFromOutside = () => {
    closeModalOption({ actionName: "edit" });
  };

  return (
    <Portal
      id={id}
      rootClass={portalRootClsx}
      clsx={portalContainertClsx}
      handleClose={handleCloseFromOutside}
    >
      <ClosePortalBtn handleCloseEvent={handleCloseEvent} />
      <Title classes={titleClsx}>{title}</Title>
      {children}
    </Portal>
  );
};
