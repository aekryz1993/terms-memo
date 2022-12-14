import clsx from "clsx";
import { useLoaderData } from "@remix-run/react";

import { Body } from "./body";
import { Head } from "./head";
import { Loading } from "../loading";
import { useDocument } from "~/hooks/useDocument";
import { useRefreshToken } from "~/hooks/useRefreshToken";

import type { RootLoaderData } from "~/types/data";

export function Document({
  children,
  title = `English Memo: no more losing what you learn!`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { locale, i18n, ready, theme } = useDocument();

  const { authInfo } = useLoaderData<RootLoaderData>();

  const checkTokenData = authInfo
    ? {
        ...authInfo,
        expiresIn: authInfo?.expiresIn ? new Date(authInfo?.expiresIn) : null,
      }
    : null;

  useRefreshToken(checkTokenData);

  if (!ready) return <Loading />;

  return (
    <html lang={locale} dir={i18n?.dir()} className={clsx(theme)}>
      <Head title={title} />
      <Body>{children}</Body>
    </html>
  );
}
