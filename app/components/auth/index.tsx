import { useState } from "react";

import { Container } from "../utilities/layout";
import { Login } from "./login";
import { Signup } from "./signup";
import { containerclsx, titleClsx } from "./styled";

export enum TCurrentScreen {
  LOGIN = "login",
  REGISTER = "register",
}

export interface TScreenState {
  setCurrentScreen: React.Dispatch<React.SetStateAction<TCurrentScreen>>;
  currentScreen: TCurrentScreen;
}

export const AuthLayout = () => {
  const [currentScreen, setCurrentScreen] = useState<TCurrentScreen>(
    TCurrentScreen.LOGIN
  );

  return (
    <>
      <h1 className={titleClsx}>{currentScreen ? "Login" : "Sign Up"}</h1>
      <Container classes={containerclsx}>
        {currentScreen === TCurrentScreen.LOGIN ? (
          <Login
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          />
        ) : currentScreen === TCurrentScreen.REGISTER ? (
          <Signup
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          />
        ) : null}
      </Container>
    </>
  );
};
