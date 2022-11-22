import { createContext, useEffect, useReducer } from "react";
import { useFetcher } from "@remix-run/react";

import { reducer } from "./reducer";
import { initialState } from "./helper";
import { useCallbackRef } from "~/hooks/useCallbackRef";

import type { TContext, TPayload } from "./types";
import type { TSet } from "~/types/endpoints";

export const SetContext = createContext<TContext | undefined>(undefined);

export const SetProvider = ({
  children,
  sets,
  currentPage,
}: {
  children: React.ReactNode;
  sets: TSet[];
  currentPage: number;
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState(sets, currentPage)
  );

  const persistFetchSets = useFetcher();
  const persistFetchSetsRef = useCallbackRef(persistFetchSets);

  const fetchSets = ({ currentPage }: TPayload) => {
    dispatch({ type: "FETCH", payload: { currentPage } });
  };

  const addSets = ({ currentPage, sets }: Required<TPayload>) => {
    dispatch({ type: "ADD_SETS", payload: { sets, currentPage } });
  };

  const value = {
    state,
    fetchSets,
    addSets,
    persistFetchSetsRef,
  };

  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
};
