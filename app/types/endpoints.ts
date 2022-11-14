import type { CardName, Typename } from "./enums";

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
  description: string;
}

export interface TCardBody {
  name: CardName;
  setId: string;
}

export interface TSet extends TSetBody {
  id: string;
  userId: string;
  // __typename: Typename.Set;
}

export interface TCard extends TCardBody {
  id: string;
  __typename: Typename.Card;
}

export interface TPaginationParams {
  skip: number;
  take: number;
}
