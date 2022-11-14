import { Form } from "@remix-run/react";
import { PrimaryButton } from "../utilities/buttons";
import { AuthFormInputs } from "./auth-form-inputs";
import { TCurrentScreen } from ".";

import type { TScreenState } from ".";

export const Signup = ({ setCurrentScreen, currentScreen }: TScreenState) => {
  return (
    <div className="container">
      <h1>Sign up</h1>
      <Form method="post" replace>
        <AuthFormInputs currentScreen={currentScreen} />
        <div>
          <span>Do You already have an account?</span>
          <button
            type="button"
            onClick={() => setCurrentScreen(TCurrentScreen.LOGIN)}
            className="text-text-tag_lt dark:text-text-tag_dark ml-2"
          >
            Go to login.
          </button>
        </div>
        <PrimaryButton type="submit" className="button">
          Sign up
        </PrimaryButton>
      </Form>
    </div>
  );
};
