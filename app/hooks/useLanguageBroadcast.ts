import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "@remix-run/react";

import { useBroadcastChannel } from "./useBroadcastChannel";
import { useHistory } from "./useHistory";

export const useLanguageBroadcast = (locale: string) => {
  const currentLocaleRef = useRef(locale);
  const { i18n } = useTranslation();
  const { pathname } = useLoaderData();

  const receiverRef = useRef(false);

  const historyRef = useHistory();

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
  }, [locale, postMessage, pathname, historyRef]);

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
    [historyRef, i18n, pathname]
  );

  useEffect(() => {
    listenToMessage(callback);

    return () => {
      removeMessageListener(callback);
    };
  }, [listenToMessage, removeMessageListener, callback]);
};
