import { useActionData } from "@remix-run/react";

import { Field, TextareaField } from "../utilities/inputs";

import { ActionFrom } from "../utilities/action-form";
import { useFields } from "~/hooks/useFields";
import { useSubmitForm } from "~/hooks/use-submit-form";

import type { SetActionData } from "~/types/data";
import type { TSet } from "~/types/endpoints";

const initialFields = (set?: TSet) => ({
  title: set?.title ?? "",
  description: set?.description ?? "",
});

export const SetActionFrom = ({
  handleClose,
  actionType,
  set,
  buttonLabel,
}: {
  handleClose: () => void;
  actionType: string;
  set?: TSet;
  buttonLabel: string;
}) => {
  const actionData = useActionData<SetActionData>();
  const { fieldProps, fields, setFields } = useFields(() => initialFields(set));

  useSubmitForm({ setFields, handleClose });

  return (
    <ActionFrom actionType={actionType} buttonLabel={buttonLabel}>
      {actionType === "edit" && set ? (
        <input type="hidden" name="id" value={set.id} />
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
    </ActionFrom>
  );
};
