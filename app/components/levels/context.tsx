import { useParams } from "@remix-run/react";
import { createContext, useContext, useState } from "react";

import type { Dispatch } from "~/types/utils";

export interface TState {
  isOpened: boolean;
  currentLevel?: string;
}

export interface TContext {
  state: TState;
  updateLevel: Dispatch;
  toggleIsOpened: Dispatch;
  closeIsOpened: Dispatch;
}

const LevelsNavContext = createContext<TContext | undefined>(undefined);

export const LevelsNavProvider = ({
  children,
  initialLevel,
}: {
  children: React.ReactNode;
  initialLevel?: string;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(initialLevel);

  const updateLevel = (level: string) => {
    setCurrentLevel(level);
  };
  const toggleIsOpened = () => {
    setIsOpened((prevState) => !prevState);
  };
  const closeIsOpened = () => {
    setIsOpened(false);
  };

  const value = {
    state: {
      isOpened,
      currentLevel,
    },
    updateLevel,
    toggleIsOpened,
    closeIsOpened,
  };

  return (
    <LevelsNavContext.Provider value={value}>
      {children}
    </LevelsNavContext.Provider>
  );
};

export const useLevelsNavContext = () => {
  const context = useContext(LevelsNavContext);
  if (!context)
    throw new Error(
      "useLevelsNavContext must be used within LevelsNavProvider"
    );

  return context;
};
