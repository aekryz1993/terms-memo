import { ApolloProvider } from "@apollo/client";
import { json, redirect } from "@remix-run/node";
import { Outlet, useCatch, useLoaderData } from "@remix-run/react";

import i18next from "~/i18next.server";
import client from "./apollo-client";
import styles from "./styles/app.css";
import { languages } from "./utils/helpers";
import { ThemeProvider } from "./context/theme";
import { getThemeSession } from "./utils/theme.server";
import { Document } from "./components/document";
import { i18nCookie } from "./utils/i18n.server";
import { getAuthSession } from "./utils/auth.server";
import { checkToken } from "./endpoints/mutation/auth";
import { ClientsTabProvider } from "./context/clientsTab";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import type { RootLoaderData } from "./types/data";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const isLoginPage = pathname.startsWith("/login") ? true : false;
  const locale = await i18next.getLocale(request);
  const themeSession = await getThemeSession(request);
  const authSession = await getAuthSession(request);

  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const tokenFromForm = form.get("token");

  const token = tokenFromForm || authSession.getToken();

  const headers = new Headers();
  headers.append("Set-Cookie", await i18nCookie.serialize(locale));

  const appearanceData = {
    locale,
    pathname,
    lngs: languages,
    theme: themeSession.getTheme(),
  };

  try {
    if (isLoginPage) {
      if (!token)
        return json({ ...appearanceData, authInfo: null }, { headers });
      const response = await checkToken(token);
      if (response.data.checkToken?.token) return redirect("/");
    }

    if (!token) return redirect("/login");
    const response = await checkToken(token);

    if (response.data.checkToken?.token) {
      return json(
        { ...appearanceData, authInfo: response.data.checkToken },
        { headers }
      );
    }
  } catch {
    headers.append("Set-Cookie", await authSession.destroy());
    return isLoginPage
      ? json({ ...appearanceData, authInfo: null }, { headers })
      : redirect("/login", { headers });
  }
};

export let handle = {
  i18n: "common",
};

export default function App() {
  const { theme } = useLoaderData<RootLoaderData>();

  return (
    <ClientsTabProvider>
      <ThemeProvider specifiedTheme={theme}>
        <ApolloProvider client={client}>
          <Document>
            <Outlet />
          </Document>
        </ApolloProvider>
      </ThemeProvider>
    </ClientsTabProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const { theme } = useLoaderData<RootLoaderData>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <Document title={`${caught.status} ${caught.statusText}`}>
        <div>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </div>
      </Document>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const { theme } = useLoaderData<RootLoaderData>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <Document title="Uh-oh!">
        <div>
          <h1>App Error</h1>
          <pre>{error.message}</pre>
        </div>
      </Document>
    </ThemeProvider>
  );
}
