import { useLocation, useSearchParams, useSubmit } from "@remix-run/react";
import { useCallback, useState } from "react";

import { useCallbackRef } from "./useCallbackRef";
import { useDebounce } from "./useDebounce";

export const useSearch = () => {
  const [cancel, setCancel] = useState(false);
  const location = useLocation();
  const [params] = useSearchParams();
  const search = params.get("search");
  const [searchState, setSearchState] = useState(search ?? "");

  const submit = useSubmit();
  const submitRef = useCallbackRef(submit);

  const commitSubmit = useCallback(
    (formData?: FormData, value?: string) => {
      submitRef.current(formData ?? null, {
        replace: true,
        action: value
          ? `${location.pathname}?search=${value}`
          : `${location.pathname}`,
        method: "get",
      });
    },
    [submitRef]
  );

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      const target: EventTarget & { value?: string } = event.target;
      if (target?.value) {
        setCancel(true);
        const formData = new FormData();
        formData.set("search", target.value);
        commitSubmit(formData, target.value);
      } else {
        setCancel(false);
        commitSubmit();
      }
    },
    [setCancel, commitSubmit]
  );

  const handleCancelEnvent = useCallback(() => {
    setCancel(false);
    setSearchState("");
    commitSubmit();
  }, [setCancel, setSearchState, commitSubmit]);

  const debouncedChangeHandler = useDebounce({ callback: handleChange });

  return {
    searchState,
    cancel,
    debouncedChangeHandler,
    setSearchState,
    handleCancelEnvent,
  };
};
