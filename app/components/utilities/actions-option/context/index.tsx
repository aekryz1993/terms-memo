import { createContext, useContext } from "react";

import type { TContext } from "./types";

export const ActionsOptionContext = createContext<TContext | undefined>(
  undefined
);

export const useActionsOption = () => {
  const context = useContext(ActionsOptionContext);

  if (!context)
    throw new Error(
      "useActionsOption must be used within ActionsOptionProvider"
    );

  return context;
};
