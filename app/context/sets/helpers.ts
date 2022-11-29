import type { TSet } from "~/types/endpoints";
import type { TState } from "./types";

const updateCurrentSets = (state: TState, sets?: TSet[] | null) => ({
  ...state,
  currentSets: sets,
});

const addSet = (state: TState, set: TSet) => ({
  ...state,
  currentSets: state.currentSets?.length
    ? [set, ...state.currentSets.slice(0, -1)]
    : [set],
});

const editSet = (state: TState, updatedSet: TSet) => {
  if (!state.currentSets || state.currentSets.length < 0) return [updatedSet];

  const updatedSetIndex = state.currentSets?.length
    ? state.currentSets.findIndex((set) => set.id === updatedSet.id)
    : -1;

  if (updatedSetIndex < 0)
    return {
      ...state,
      currentSets: state.currentSets?.length
        ? [updatedSet, ...state.currentSets.slice(0, -1)]
        : [updatedSet],
    };

  return {
    ...state,
    currentSets: state.currentSets?.length,
  };
};

export { updateCurrentSets, addSet, editSet };
