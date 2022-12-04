import { useActionData, useParams } from "@remix-run/react";

import { Field, TextareaField } from "../utilities/inputs";

import { ActionFrom } from "../utilities/action-form";
import { useFields } from "~/hooks/useFields";
import { useSubmitForm } from "~/hooks/use-submit-form";
import { LevelsCheckBox } from "./levels-checkbox";
import { useLevelsNavContext } from "../levels/context";

import type { TermActionData } from "~/types/data";
import type { TTerm } from "~/types/endpoints";

const initialFields = (term?: TTerm) => ({
  name: term?.name ?? "",
  definition: term?.definition ?? "",
});

export const TermActionFrom = ({
  handleClose,
  actionType,
  term,
  buttonLabel,
}: {
  handleClose: () => void;
  actionType: string;
  term?: TTerm;
  buttonLabel: string;
}) => {
  const actionData = useActionData<TermActionData>();
  const { setId } = useParams();
  const { fieldProps, fields, setFields } = useFields(() =>
    initialFields(term)
  );

  const {
    state: { currentLevel },
  } = useLevelsNavContext();

  useSubmitForm({ setFields, handleClose });

  return (
    <ActionFrom actionType={actionType} buttonLabel={buttonLabel}>
      {actionType === "edit" && term ? (
        <input type="hidden" name="id" value={term.id} />
      ) : null}
      <input type="hidden" name="setId" value={setId} />
      <Field
        {...fieldProps({
          name: "name",
          value: fields.name,
          defaultValue: actionData?.fields?.name,
          error: actionData?.fieldErrors?.name,
        })}
        placeholder="Type a term name..."
      />
      <TextareaField
        {...fieldProps({
          name: "definition",
          value: fields.definition,
        })}
        placeholder="Type a definition of the term..."
        rows={5}
        maxLength={130}
      />
      {actionType === "add" ? <></> : null}
      <input type="hidden" name="levelId" value={currentLevel} />
      <LevelsCheckBox />
      {/**TODO: re-style */}
      {actionData?.formError ? (
        <p className="form-validation-error" role="alert">
          {actionData.formError}
        </p>
      ) : null}
    </ActionFrom>
  );
};
