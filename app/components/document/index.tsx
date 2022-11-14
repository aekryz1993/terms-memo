import clsx from "clsx";

import { Body } from "./body";
import { Head } from "./head";
import { Loading } from "../loading";
import { useDocument } from "~/hooks/useDocument";

export function Document({
  children,
  title = `English Memo: no more losing what you learn!`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { locale, i18n, ready, theme } = useDocument();

  if (!ready) return <Loading />;

  return (
    <html lang={locale} dir={i18n?.dir()} className={clsx(theme)}>
      <Head title={title} />
      <Body>{children}</Body>
    </html>
  );
}
