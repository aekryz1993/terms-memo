import type { TAction, TActionType, TState } from "./types";

const toggleOpenOptions = (state: TState) => ({
  ...state,
  isOpened: !state.isOpened,
});

const closeOptions = (state: TState) => ({
  ...state,
  isOpened: false,
});

const toggleBinned = (state: TState) => ({
  ...state,
  isBinned: !state.isBinned,
});

const applyBinned = (state: TState) => ({
  ...state,
  isBinned: true,
});

const cancelBinned = (state: TState) => ({
  ...state,
  isBinned: false,
});

const toggleOpenModalOption = (state: TState, actionName: string) => ({
  ...state,
  isOpenedModal: {
    ...state.isOpenedModal,
    [actionName]: !state.isOpenedModal[actionName],
  },
});

const closeModalOption = (state: TState, actionName: string) => ({
  ...state,
  isOpenedModal: {
    ...state.isOpenedModal,
    [actionName]: false,
  },
});

const dispatchWithoutPayload =
  (dispatch: React.Dispatch<TAction>) => (actionType: TActionType) => () => {
    dispatch({ type: actionType });
  };

export {
  toggleOpenOptions,
  closeOptions,
  toggleOpenModalOption,
  toggleBinned,
  applyBinned,
  cancelBinned,
  closeModalOption,
  dispatchWithoutPayload,
};
