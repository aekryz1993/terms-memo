import { useContext } from "react";
import { SetContext } from "./provider";

export const TAKE = 15;

export const useSetContext = () => {
  const context = useContext(SetContext);

  if (!context) {
    throw new Error("useSetContext must be used within a SetProvider");
  }

  return context;
};
