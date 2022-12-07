import { useActionData, useParams } from "@remix-run/react";
import { useMemo } from "react";

import { ErrorMessageField, Field, TextareaField } from "../utilities/inputs";

import { ActionFrom } from "../utilities/action-form";
import { useFields } from "~/hooks/useFields";
import { useSubmitForm } from "~/hooks/use-submit-form";
import { LevelsCheckBox } from "./levels-checkbox";

import type { TermActionData } from "~/types/data";
import type { TTerm } from "~/types/endpoints";

const initialFields = ({
  name,
  definition,
}: {
  name?: string | null;
  definition?: string | null;
}) => ({
  name: name ?? "",
  definition: definition ?? "",
});

export const TermActionFrom = ({
  handleClose,
  actionType,
  term,
  buttonLabel,
  currentLevel,
}: {
  handleClose: () => void;
  actionType: string;
  term?: TTerm;
  buttonLabel: string;
  currentLevel?: string;
}) => {
  const actionData = useActionData<TermActionData>();
  const { setId } = useParams();

  const initialState = useMemo(
    () => initialFields({ name: term?.name, definition: term?.definition }),
    [term?.name, term?.definition]
  );

  const { fieldProps, fields, setFields } = useFields(() => initialState);

  useSubmitForm({ setFields, initialState, handleClose });

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
      {currentLevel && actionType === "add" ? (
        <>
          <input type="hidden" name="levelId" value={currentLevel} />
          <LevelsCheckBox />
        </>
      ) : null}

      {actionData?.formError ? (
        <ErrorMessageField>{actionData.formError}</ErrorMessageField>
      ) : null}
    </ActionFrom>
  );
};
