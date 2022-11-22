import type { TSet } from "~/types/endpoints";
import type { Dispatch } from "~/types/utils";

export interface TState {
  setsByPage: { [page: number]: TSet[] };
  currentSets: TSet[];
  currentPage: number;
}

export type TActionType = "FETCH" | "ADD_SETS";

export type TPayload = { sets?: TSet[]; currentPage: number };

export interface TAction {
  type: TActionType;
  payload: TPayload;
}

export interface TContext {
  state: TState;
  addSets: Dispatch;
  fetchSets: Dispatch;
  persistFetchSetsRef: React.MutableRefObject<any>;
}
