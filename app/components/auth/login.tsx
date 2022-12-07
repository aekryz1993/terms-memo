import { AuthFormInputs } from "./auth-form-inputs";
import { TCurrentScreen } from ".";
import { Box } from "../utilities/layout";
import { ActionFrom } from "../utilities/action-form";

import type { TScreenState } from ".";
import { Direction } from "./direction";
import { useCallback } from "react";

export const Login = ({ setCurrentScreen, currentScreen }: TScreenState) => {
  const handleChangeScreen = useCallback(
    () => setCurrentScreen(TCurrentScreen.REGISTER),
    [setCurrentScreen]
  );

  return (
    <>
      <ActionFrom actionType="login" buttonLabel="Login">
        <AuthFormInputs currentScreen={currentScreen} />
        <Direction
          text="Don't have an account yet?"
          handleChangeScreen={handleChangeScreen}
          buttonLabel="Create a new account."
        />
      </ActionFrom>
    </>
  );
};
