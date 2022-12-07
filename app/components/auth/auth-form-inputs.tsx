import { useActionData } from "@remix-run/react";
import { memo } from "react";
import { ErrorMessageField, Field, Input } from "../utilities/inputs";
import { useFieldswithoutState } from "~/hooks/useFields";

import type { LoginActionData } from "~/types/data";
import type { TCurrentScreen } from ".";

export const AuthFormInputs = memo(
  ({ currentScreen }: { currentScreen: TCurrentScreen }) => {
    const actionData = useActionData<LoginActionData>();

    const { fieldProps } = useFieldswithoutState();

    return (
      <>
        <input type="hidden" name="authType" value={currentScreen} />
        <Field
          {...fieldProps({
            name: "username",
            type: "text",
            defaultValue: actionData?.fields?.username,
            error: actionData?.fieldErrors?.username,
          })}
          placeholder="Type your username..."
        />
        <Field
          {...fieldProps({
            name: "password",
            type: "password",
            defaultValue: actionData?.fields?.password,
            error: actionData?.fieldErrors?.password,
          })}
          placeholder="Type your password..."
        />
        {actionData?.formError ? (
          <ErrorMessageField>{actionData.formError}</ErrorMessageField>
        ) : null}
      </>
    );
  }
);

if (process.env.NODE_ENV !== "production")
  AuthFormInputs.displayName = "AuthFormInputs";
