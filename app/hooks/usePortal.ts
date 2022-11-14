import React from "react";

function createRootElement(id: string) {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  rootContainer.classList.add("absolute", "top-0", "w-full", "h-full");
  return rootContainer;
}

function addRootElement(rootElem: Element) {
  if (document.body.lastElementChild)
    document.body.insertBefore(
      rootElem,
      document.body.lastElementChild.nextElementSibling
    );
}

export const usePortal = (
  id: string,
  clsx?: string,
  handleClose?: () => void
) => {
  const rootElemRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    let parentElem: Element | null = existingParent || createRootElement(id);

    if (!existingParent) {
      addRootElement(parentElem);
    }

    parentElem.appendChild(rootElemRef.current as Element);

    if (handleClose) parentElem.addEventListener("click", handleClose);

    return function removeElement() {
      rootElemRef.current?.remove();
      if (!parentElem?.childElementCount) {
        parentElem?.remove();
        if (handleClose) parentElem?.removeEventListener("click", handleClose);
      }
    };
  }, [id, handleClose]);

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement("div");
      clsx?.split(" ").forEach((cls) => {
        rootElemRef.current?.classList.add(cls);
      });
      rootElemRef.current?.classList.add("z-50");
    }
    return rootElemRef.current;
  }

  return getRootElem();
};
