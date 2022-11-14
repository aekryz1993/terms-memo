import ReactDOM from "react-dom";
import { usePortal } from "~/hooks/usePortal";

export const Portal = ({
  id,
  children,
  clsx,
  handleClose,
}: {
  id: string;
  clsx?: string;
  handleClose?: () => void;
  children: React.ReactNode;
}) => {
  const target = usePortal(id, clsx, handleClose);
  return ReactDOM.createPortal(children, target);
};
