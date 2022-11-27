import { Form } from "@remix-run/react";

import { PrimaryButton } from "../utilities/buttons";
import { AuthFormInputs } from "./auth-form-inputs";
import { TCurrentScreen } from ".";
import { Box } from "../utilities/layout";

import type { TScreenState } from ".";

export const Login = ({ setCurrentScreen, currentScreen }: TScreenState) => {
  return (
    <>
      <h1>Login</h1>
      <Form method="post" replace>
        <AuthFormInputs currentScreen={currentScreen} />
        <Box>
          <span>Don't have an account yet?</span>
          <button
            type="button"
            onClick={() => setCurrentScreen(TCurrentScreen.REGISTER)}
            className="text-text-tag_lt dark:text-text-tag_dark ml-2"
          >
            Create a new account.
          </button>
        </Box>
        <PrimaryButton type="submit">Login</PrimaryButton>
      </Form>
    </>
  );
};
