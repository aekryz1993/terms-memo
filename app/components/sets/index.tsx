import { useTransition } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

import { Portal } from "../Portal";
import { AddSetForm } from "./add-set-form";
import { Sets } from "./sets";

export const SetsLayout = () => {
  const [isOpenAddSet, setIsOpenAddSet] = useState(false);
  const transition = useTransition();

  const formRef = useRef() as React.RefObject<HTMLFormElement>;

  useEffect(() => {
    if (transition.state == "idle") {
      setIsOpenAddSet(false);
      formRef.current && formRef.current.reset();
    }
  }, [transition.state]);

  return (
    <>
      {isOpenAddSet ? (
        <Portal id="modal">
          <AddSetForm setIsOpenAddSet={setIsOpenAddSet} ref={formRef} />
        </Portal>
      ) : (
        <Sets setIsOpenAddSet={setIsOpenAddSet} />
      )}
    </>
  );
};
