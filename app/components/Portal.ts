import { useEffect } from "react";
import ReactDOM from "react-dom";
import { usePortal } from "~/hooks/usePortal";

export const Portal = ({
  id,
  children,
  rootClass,
  clsx,
  handleClose,
}: {
  id: string;
  children: React.ReactNode;
  rootClass?: string;
  clsx?: string;
  handleClose?: () => void;
}) => {
  if (!canUseDOM()) {
    return null;
  }
  const target = usePortal({ id, rootClass, clsx, handleClose });
  return ReactDOM.createPortal(children, target);
};

export function canUseDOM() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}
