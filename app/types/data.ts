import type { Theme } from "~/context/theme";
import type { TLevel, TSet, TTerm, TUser } from "./endpoints";

export interface TAuthInfo {
  user: TUser | null;
  token: string | null;
  expiresIn: Date | null;
}

export type LoginActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    username: string;
    password: string;
  };
};

export type SetActionData = {
  formError?: string;
  fieldErrors?: {
    title: string | undefined;
  };
  fields?: {
    title: string;
  };
};

export type TermActionData = {
  formError?: string;
  fieldErrors?: {
    name: string | undefined;
  };
  fields?: {
    name: string;
  };
};

export interface AuthLoaderData {
  authInfo: TAuthInfo | null;
}

export interface PaginationLoaderData {
  tatolItems: number;
  totalPages: number;
  currentPage: number;
  take: number;
  skip: number;
}
export interface SetsLoaderData extends PaginationLoaderData {
  sets: TSet[];
  token: string;
}
export interface TermsLoaderData extends PaginationLoaderData {
  terms: TTerm[];
  token: string;
}

export interface SetLoaderData {
  set: TSet;
  levels: TLevel[];
}

export interface RootLoaderData {
  locale: string;
  pathname: string;
  lngs: { [key: string]: { nativeName: string } };
  theme: Theme | null;
  authInfo: TAuthInfo | null;
}
