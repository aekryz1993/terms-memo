import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, useActionData, useTransition } from "@remix-run/react";

import { PrimaryButton } from "../utilities/buttons";
import { Field, TextareaField } from "../utilities/inputs";
import { formClasses, inputClasses, submitBtn } from "./styled";

import type { SetActionData } from "~/types/data";

export const SetActionFrom = ({
  handleClose,
  actionType,
  id,
  title,
  description,
  buttonLabel,
}: {
  handleClose: () => void;
  actionType: string;
  id?: string;
  title?: string;
  description?: string | null;
  buttonLabel: string;
}) => {
  const transition = useTransition();
  const actionData = useActionData<SetActionData>();
  const [fields, setFields] = useState({
    title: title ?? "",
    description: description ?? "",
  });

  const isSubmitRef = useRef(false);

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

  useEffect(() => {
    if (transition.state === "idle" && isSubmitRef.current) {
      setFields({ title: "", description: "" });
      isSubmitRef.current = false;
    } else if (
      transition.state === "submitting" &&
      transition.submission.formData.get("title")
    ) {
      isSubmitRef.current = true;
      handleClose();
    }
  }, [transition.state, handleClose]);

  return (
    <Form method="post" className={formClasses}>
      <input type="hidden" name="actionType" value={actionType} />
      {actionType === "edit" ? (
        <input type="hidden" name="id" value={id} />
      ) : null}
      <Field
        {...fieldProps({
          name: "title",
          value: fields.title,
          defaultValue: actionData?.fields?.title,
          error: actionData?.fieldErrors?.title,
        })}
        placeholder="Type a set title..."
      />
      <TextareaField
        {...fieldProps({
          name: "description",
          value: fields.description,
        })}
        placeholder="Type a description of the set..."
        rows={5}
        maxLength={130}
      />
      <PrimaryButton type="submit" classes={submitBtn}>
        {buttonLabel}
      </PrimaryButton>
    </Form>
  );
};
