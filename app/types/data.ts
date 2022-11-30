import type { Theme } from "~/context/theme";
import type { TLevel, TSet, TUser } from "./endpoints";

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

export interface AuthLoaderData {
  authInfo: TAuthInfo | null;
}

// export interface SetsLoaderData extends AuthLoaderData {
export interface SetsLoaderData {
  sets: TSet[];
  tatolSets: number;
  totalPages: number;
  currentPage: number;
  token: string;
  take: number;
  skip: number;
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
