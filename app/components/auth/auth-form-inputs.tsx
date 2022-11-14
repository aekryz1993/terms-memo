import { useActionData } from "@remix-run/react";
import { Input } from "../utilities/inputs";

import type { LoginActionData } from "~/types/data";
import type { TCurrentScreen } from ".";
import { memo } from "react";

export const AuthFormInputs = memo(
  ({ currentScreen }: { currentScreen: TCurrentScreen }) => {
    const actionData = useActionData<LoginActionData>();

    return (
      <>
        <input type="hidden" name="authType" value={currentScreen} />
        <div>
          <label htmlFor="username-input">Username</label>
          <Input
            type="text"
            id="username-input"
            name="username"
            defaultValue={actionData?.fields?.username}
            aria-invalid={Boolean(actionData?.fieldErrors?.username)}
            aria-errormessage={
              actionData?.fieldErrors?.username ? "username-error" : undefined
            }
          />
          {actionData?.fieldErrors?.username ? (
            <p
              className="form-validation-error"
              role="alert"
              id="username-error"
            >
              {actionData.fieldErrors.username}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="password-input">Password</label>
          <Input
            type="password"
            id="password-input"
            name="password"
            defaultValue={actionData?.fields?.username}
            aria-invalid={Boolean(actionData?.fieldErrors?.username)}
            aria-errormessage={
              actionData?.fieldErrors?.username ? "username-error" : undefined
            }
          />
          {actionData?.fieldErrors?.password ? (
            <p
              className="form-validation-error"
              role="alert"
              id="password-error"
            >
              {actionData.fieldErrors.password}
            </p>
          ) : null}
        </div>
        <div id="form-error-message">
          {actionData?.formError ? (
            <p className="form-validation-error" role="alert">
              {actionData.formError}
            </p>
          ) : null}
        </div>
      </>
    );
  }
);

if (process.env.NODE_ENV !== "production")
  AuthFormInputs.displayName = "AuthFormInputs";
