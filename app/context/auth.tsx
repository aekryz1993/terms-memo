import { createContext, useContext } from "react";
import { useRefreshToken } from "~/hooks/useRefreshToken";
import type { TAuthInfo } from "~/types/data";
import type { TUser } from "~/types/endpoints";

interface TContext {
  loggedUser: TUser | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<TContext | undefined>(undefined);

export const AuthProvider = ({
  children,
  authInfo,
}: {
  children: React.ReactNode;
  authInfo: TAuthInfo | null;
}) => {
  const { token, setToken, loggedUser, setLoggedUser } =
    useRefreshToken(authInfo);

  const value = {
    loggedUser,
    setLoggedUser,
    token,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
