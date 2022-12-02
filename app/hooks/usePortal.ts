import { useCallback, useEffect, useRef } from "react";

function createRootElement(id: string, rootClass?: string) {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  rootClass?.split(" ").forEach((cls) => {
    if (cls) rootContainer.classList.add(cls);
  });
  return rootContainer;
}

function addRootElement(rootElem: Element) {
  if (document.body.lastElementChild)
    document.body.insertBefore(
      rootElem,
      document.body.lastElementChild.nextElementSibling
    );
}

export const usePortal = ({
  id,
  rootClass,
  clsx,
  handleClose,
}: {
  id: string;
  rootClass?: string;
  clsx?: string;
  handleClose?: () => void;
}) => {
  const rootElemRef = useRef<HTMLDivElement | null>(null);

  const stopPropagationChild = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    let parentElem: Element | null =
      existingParent || createRootElement(id, rootClass);

    if (!existingParent) {
      addRootElement(parentElem);
    }

    parentElem.appendChild(rootElemRef.current as Element);

    if (handleClose) {
      parentElem.addEventListener("click", handleClose);
      rootElemRef.current?.addEventListener("click", stopPropagationChild);
    }

    return function removeElement() {
      rootElemRef.current?.remove();
      if (!parentElem?.childElementCount) {
        parentElem?.remove();
        if (handleClose) {
          parentElem?.removeEventListener("click", handleClose);
          rootElemRef.current?.removeEventListener(
            "click",
            stopPropagationChild
          );
        }
      }
    };
  }, [id, handleClose]);

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement("div");
      clsx?.split(" ").forEach((cls) => {
        rootElemRef.current?.classList.add(cls);
      });
    }
    return rootElemRef.current;
  }

  return getRootElem();
};
