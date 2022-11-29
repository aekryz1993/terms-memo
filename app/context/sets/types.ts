import type { TSet } from "~/types/endpoints";
import type { Dispatch } from "~/types/utils";

export interface TState {
  currentSets: TSet[];
  removedSet: TSet | null;
}

export type TActionType =
  | "UPDATE_CURRENT_SETS"
  | "ADD_SET"
  | "UPDATE_SET"
  | "REMOVE_SET";

export interface TPayload {
  sets?: TSet[] | null;
  set?: TSet | null;
}

export interface TAction {
  type: TActionType;
  payload: TPayload;
}

export interface TContext {
  state: TState;
  updateCurrentSets: Dispatch;
  addSet: Dispatch;
  updateSet: Dispatch;
  removeSet: Dispatch;
}
