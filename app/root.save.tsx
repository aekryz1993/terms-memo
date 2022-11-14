import { ApolloProvider } from "@apollo/client";
import { json } from "@remix-run/node";
import { Outlet, useCatch, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import i18next from "~/i18next.server";
import client from "./apollo-client";
import styles from "./styles/app.css";
import { languages } from "./utils/helpers";
import { ThemeProvider } from "./context/theme";
import { getThemeSession } from "./utils/theme.server";
import { Document } from "./components/document";
import { i18nCookie } from "./utils/i18n.server";

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
  const locale = await i18next.getLocale(request);
  const themeSession = await getThemeSession(request);

  const data: RootLoaderData = {
    locale,
    lngs: languages,
    theme: themeSession.getTheme(),
  };

  return json(data, {
    headers: { "Set-Cookie": await i18nCookie.serialize(locale) },
  });
};

export let handle = {
  i18n: "common",
};

export default function App() {
  const { theme } = useLoaderData<RootLoaderData>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <ApolloProvider client={client}>
        <Document>
          <Outlet />
        </Document>
      </ApolloProvider>
    </ThemeProvider>
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
