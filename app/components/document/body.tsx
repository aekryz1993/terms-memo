import { LiveReload, Scripts, ScrollRestoration } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import { SsrBtnTheme, useTheme } from "~/context/theme";

import { HeaderSection } from "../header";
import { Main } from "./main";

export const Body = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [theme] = useTheme();

  return (
    <body>
      <HeaderSection />
      <Main>
        {/* <h1 className="text-5xl font-bold text-btn-bg_lt dark:text-purple-700">
          {t("header")}
        </h1> */}
        {children}
      </Main>
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV !== "production" ? <LiveReload /> : null}
      <SsrBtnTheme ssrTheme={Boolean(theme)} />
    </body>
  );
};
