import { portalContainertClsx, portalRootClsx, titleClsx } from "../styled";
import { useActionsOption } from "../context";
import { Portal } from "~/components/Portal";
import { Title } from "../../Typography";
import { ClosePortalBtn } from "../../close-portal-btn";

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
      <ClosePortalBtn handleCloseEvent={handleCloseEvent} />
      <Title classes={titleClsx}>{title}</Title>
      {children}
    </Portal>
  );
};
