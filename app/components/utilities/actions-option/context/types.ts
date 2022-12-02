import { Dispatch } from "~/types/utils";

export type TOptions = { [actionName: string]: boolean };

export interface TState {
  isOpened: boolean;
  isBinned: boolean;
  isOpenedModal: TOptions;
}

export type TActionType =
  | "TOGGLE_OPEN_OPTIONS"
  | "CLOSE_OPTIONS"
  | "TOGGLE_BINNED"
  | "APPLY_BINNED"
  | "CANCEL_BINNED"
  | "TOGGLE_OPEN_MODAL_OPTION"
  | "CLOSE_MODAL_OPTION";

export interface TPayload {
  actionName: string;
}

export interface TAction {
  type: TActionType;
  payload?: TPayload;
}

export interface TContext {
  state: TState;
  toggleOpenOptions: Dispatch;
  closeOptions: Dispatch;
  toggleBinned: Dispatch;
  applyBinned: Dispatch;
  cancelBinned: Dispatch;
  toggleOpenModalOption: Dispatch;
  closeModalOption: Dispatch;
}

export interface TProviderProps {
  children: React.ReactNode;
  options: TOptions;
}

export interface TOption {
  label: string;
  actionType: string;
}
