import {
  toggleOpenOptions,
  toggleOpenModalOption,
  closeOptions,
  toggleBinned,
  applyBinned,
  cancelBinned,
  closeModalOption,
} from "./helper";

import type { TAction, TState } from "./types";

export const reducer = (state: TState, action: TAction) => {
  const actions = {
    TOGGLE_OPEN_OPTIONS: () => toggleOpenOptions(state),
    CLOSE_OPTIONS: () => closeOptions(state),
    TOGGLE_BINNED: () => toggleBinned(state),
    APPLY_BINNED: () => applyBinned(state),
    CANCEL_BINNED: () => cancelBinned(state),
    TOGGLE_OPEN_MODAL_OPTION: () => {
      if (!action.payload) throw new Error("Payload must be provided");
      return toggleOpenModalOption(state, action.payload.actionName);
    },
    CLOSE_MODAL_OPTION: () => {
      if (!action.payload) throw new Error("Payload must be provided");
      return closeModalOption(state, action.payload.actionName);
    },
    DEFAULT: () => {
      throw new Error("Unknown action");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
};
