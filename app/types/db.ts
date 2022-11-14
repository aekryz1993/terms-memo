import type { TSetBody, TUserBody } from "./endpoints";
import type { CardName } from "./enums";

export interface TUserDB extends TUserBody {
  id: string;
}

export interface TSetDB extends TSetBody {
  id: string;
  userId: string;
}

export interface TCardDB {
  id: string;
  name: CardName;
  setId: string;
}
