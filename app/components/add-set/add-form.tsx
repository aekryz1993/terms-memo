import React, { useCallback, useEffect, useState } from "react";
import { Form, useActionData, useTransition } from "@remix-run/react";

import { PrimaryButton } from "../utilities/buttons";
import { Field } from "../utilities/inputs";
import { formClasses, inputClasses, submitBtn } from "./styled";

import type { SetActionData } from "~/types/data";

export const AddForm = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const transition = useTransition();
  const actionData = useActionData<SetActionData>();
  const [fields, setFields] = useState({ title: "", description: "" });

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
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      },
    }),
    [setFields]
  );

  useEffect(() => {
    if (transition.state === "idle") {
      setFields({ title: "", description: "" });
    } else if (
      transition.state === "submitting" &&
      transition.submission.formData.get("title")
    ) {
      setIsOpen(false);
    }
  }, [transition.state, setIsOpen]);

  return (
    <Form method="post" className={formClasses}>
      <input type="hidden" name="actionType" value="add" />
      <Field
        {...fieldProps({
          name: "title",
          value: fields.title,
          defaultValue: actionData?.fields?.title,
          error: actionData?.fieldErrors?.title,
        })}
        placeholder="Type a set title..."
      />
      <Field
        {...fieldProps({
          name: "description",
          value: fields.description,
        })}
        placeholder="Type a description of the set..."
      />
      <PrimaryButton type="submit" classes={submitBtn}>
        Add Set
      </PrimaryButton>
    </Form>
  );
};
