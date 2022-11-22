import type { TSet } from "~/types/endpoints";
import type { TPayload, TState } from "./types";

export const initialState = (sets: TSet[], currentPage: number) => ({
  setsByPage: sets ? { [currentPage]: sets } : {},
  currentSets: sets ?? [],
  currentPage,
});

export const addSets = (state: TState, payload: Required<TPayload>) => ({
  ...state,
  setsByPage: { ...state.setsByPage, [payload.currentPage]: payload.sets },
  currentSets: payload.sets,
  currentPage: payload.currentPage,
});

export const fetchSets = (
  state: TState,
  payload: Pick<TPayload, "currentPage">
) => ({
  ...state,
  currentSets: state.setsByPage[payload.currentPage],
  currentPage: payload.currentPage,
});
