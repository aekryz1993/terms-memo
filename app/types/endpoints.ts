import type { Level, Typename } from "./enums";

export interface TUserBody {
  username: string;
  password: string;
}

export interface TUser {
  id: string;
  username: string;
  password?: string;
  __typename?: Typename.User;
}

export interface TSetBody {
  title: string;
  description?: string | null;
}

export interface TLevelBody {
  name: Level;
  setId: string;
}

export interface TTermBody {
  name: string;
  definition?: string | null;
  levelId: string;
}

export interface TSet extends TSetBody {
  id: string;
  userId: string;
  updatedAt: string;
  // __typename: Typename.Set;
}

export interface TLevel extends TLevelBody {
  id: string;
  __typename: Typename.Level;
}

export interface TTerm extends TTermBody {
  id: string;
  updatedAt: string;
  __typename: Typename.Term;
}

export interface TPaginationParams {
  skip: number;
  take: number;
  search: string | null;
}
