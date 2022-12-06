import { useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const useSubmitForm = ({
  setFields,
  initialState,
  handleClose,
}: {
  setFields: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
  initialState: { [key: string]: string };
  handleClose: () => void;
}) => {
  const isSubmitRef = useRef(false);
  const transition = useTransition();

  const mainFieldKey = Object.keys(initialState)[0];

  const state = transition.state;
  const hasValue = transition.submission?.formData.get(mainFieldKey)
    ? true
    : false;

  useEffect(() => {
    if (state === "idle" && isSubmitRef.current) {
      setFields(() => initialState);
      isSubmitRef.current = false;
    } else if (state === "submitting" && hasValue) {
      isSubmitRef.current = true;
      handleClose();
    }
  }, [state, hasValue, handleClose]);
};
