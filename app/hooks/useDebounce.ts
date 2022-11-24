import { debounce } from "lodash";
import { useEffect } from "react";
import { useMemoOne } from "use-memo-one";

export const useDebounce = ({
  callback,
  delay = 500,
}: {
  callback: (...args: any) => void;
  delay?: number;
}) => {
  const debouncedCallback = useMemoOne(
    () => debounce(callback, delay),
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  return debouncedCallback;
};
