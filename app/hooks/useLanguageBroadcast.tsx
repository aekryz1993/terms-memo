import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { createBrowserHistory } from "history";
import { useLoaderData } from "@remix-run/react";

import { useBroadcastChannel } from "./useBroadcastChannel";

export const useLanguageBroadcast = (locale: string) => {
  const currentLocaleRef = useRef(locale);
  const { i18n } = useTranslation();
  const { pathname } = useLoaderData();

  const receiverRef = useRef(false);

  const historyRef = useRef(
    typeof window !== "undefined" ? createBrowserHistory() : undefined
  );

  const { postMessage, listenToMessage, removeMessageListener } =
    useBroadcastChannel("locale");

  useEffect(() => {
    if (currentLocaleRef.current !== locale && !receiverRef.current) {
      historyRef.current?.replace({
        pathname,
      });
      postMessage({ locale });
      currentLocaleRef.current = locale;
    } else if (receiverRef.current) receiverRef.current = false;
  }, [locale, postMessage, pathname]);

  const callback = useCallback(
    ({ data }: { data: { locale: string } }) => {
      receiverRef.current = true;
      i18n.changeLanguage(data.locale, () => {
        historyRef.current?.replace({
          pathname,
        });
        window.location.reload();
      });
    },
    [i18n, pathname]
  );

  useEffect(() => {
    listenToMessage(callback);

    return () => {
      removeMessageListener(callback);
    };
  }, [listenToMessage, removeMessageListener, callback]);
};
