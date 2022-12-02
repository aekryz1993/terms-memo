import type { TUserBody } from "./endpoints";
import type { Level } from "./enums";

export interface TUserDB extends TUserBody {
  id: string;
}

export interface TSetDB {
  id: string;
  title: string;
  description?: string | null;
  userId: string;
  updatedAt: Date;
}

export interface TLevelDB {
  id: string;
  name: Level;
  setId: string;
}

export interface TTermDB {
  id: string;
  name: string;
  definition: string;
  levelId: string;
  updatedAt: Date;
}
