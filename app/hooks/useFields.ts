import { useCallback, useState } from "react";

import { inputClasses } from "~/components/utilities/action-form";

export const useFields = (initialFields: () => { [key: string]: string }) => {
  const [fields, setFields] = useState(initialFields);

  const fieldProps = useCallback(
    ({
      name,
      value,
      defaultValue,
      error,
    }: {
      name: string;
      value?: string;
      defaultValue?: string;
      error?: string;
    }) => ({
      classes: inputClasses,
      type: "text",
      id: `${name}-input`,
      name,
      defaultValue,
      value,
      "aria-invalid": Boolean(value),
      "aria-errormessage": error ? "title-error" : undefined,
      fieldError: error,
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setFields((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      },
    }),
    [setFields]
  );

  return { fieldProps, fields, setFields };
};
