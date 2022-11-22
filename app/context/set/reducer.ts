import { addSets, fetchSets } from "./helper";

import type { TAction, TPayload, TState } from "./types";

type TReducer = (state: TState, action: TAction) => TState;

export const reducer: TReducer = (state: TState, action: TAction) => {
  const actions = {
    ADD_SETS: () => addSets(state, action.payload as Required<TPayload>),
    FETCH: () => fetchSets(state, action.payload),
    DEFAULT: () => {
      throw new Error("Unknown action");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
};
