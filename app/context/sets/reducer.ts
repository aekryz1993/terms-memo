import { updateCurrentSets } from "./helpers";
import type { TAction, TState } from "./types";

export const reducer = (state: TState, action: TAction) => {
  const actions = {
    UPDATE_CURRENT_SETS: () => {},
    ADD_SET: () => updateCurrentSets(state, action.payload.sets),
    UPDATE_SET: () => {},
    REMOVE_SET: () => {},
    DEFAULT: () => {
      throw new Error("Unknown action");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
};
