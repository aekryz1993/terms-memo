import { useReducer } from "react";
import { ActionsOptionContext } from ".";
import { dispatchWithoutPayload } from "./helper";
import { reducer } from "./reducer";

import type { TOptions, TProviderProps } from "./types";

const initialState = (options: TOptions) => ({
  isOpened: false,
  isBinned: false,
  isOpenedModal: options,
});

export const ActionsOptionProvider = ({
  children,
  options,
}: TProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState(options));

  const dispatcher = dispatchWithoutPayload(dispatch);

  const toggleOpenOptions = dispatcher("TOGGLE_OPEN_OPTIONS");

  const closeOptions = dispatcher("CLOSE_OPTIONS");

  const toggleBinned = dispatcher("TOGGLE_BINNED");

  const applyBinned = dispatcher("APPLY_BINNED");

  const cancelBinned = dispatcher("CANCEL_BINNED");

  const toggleOpenModalOption = ({ actionName }: { actionName: string }) => {
    dispatch({ type: "TOGGLE_OPEN_MODAL_OPTION", payload: { actionName } });
  };

  const closeModalOption = ({ actionName }: { actionName: string }) => {
    dispatch({ type: "CLOSE_MODAL_OPTION", payload: { actionName } });
  };

  const value = {
    state,
    toggleOpenOptions,
    closeOptions,
    toggleBinned,
    applyBinned,
    cancelBinned,
    toggleOpenModalOption,
    closeModalOption,
  };
  return (
    <ActionsOptionContext.Provider value={value}>
      {children}
    </ActionsOptionContext.Provider>
  );
};
