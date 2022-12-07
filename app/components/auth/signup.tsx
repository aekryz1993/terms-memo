import { useCallback } from "react";

import { AuthFormInputs } from "./auth-form-inputs";
import { TCurrentScreen } from ".";
import { Box } from "../utilities/layout";
import { ActionFrom } from "../utilities/action-form";
import { Direction } from "./direction";

import type { TScreenState } from ".";

export const Signup = ({ setCurrentScreen, currentScreen }: TScreenState) => {
  const handleChangeScreen = useCallback(
    () => setCurrentScreen(TCurrentScreen.LOGIN),
    [setCurrentScreen]
  );

  return (
    <>
      <ActionFrom actionType="register" buttonLabel="Sign up">
        <AuthFormInputs currentScreen={currentScreen} />
        <Direction
          text="Do You already have an account?"
          handleChangeScreen={handleChangeScreen}
          buttonLabel="Go to login."
        />
      </ActionFrom>
    </>
  );
};
