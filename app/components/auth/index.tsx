import { useState } from "react";
import { Login } from "./login";
import { Signup } from "./signup";

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
    <div className="bg-bg-sec_lt dark:bg-bg-sec_dark">
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
    </div>
  );
};
