import { useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const useSubmitForm = ({
  setFields,
  handleClose,
}: {
  setFields: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
  handleClose: () => void;
}) => {
  const isSubmitRef = useRef(false);
  const transition = useTransition();

  const state = transition.state;
  const hasTitle = transition.submission?.formData.get("title") ? true : false;

  useEffect(() => {
    if (state === "idle" && isSubmitRef.current) {
      setFields({ title: "", description: "" });
      isSubmitRef.current = false;
    } else if (state === "submitting" && hasTitle) {
      isSubmitRef.current = true;
      handleClose();
    }
  }, [state, hasTitle, handleClose]);
};
