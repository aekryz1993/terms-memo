import { Link, useLoaderData } from "@remix-run/react";
import { Fragment, useCallback, useState } from "react";
import GlobalLineIcon from "remixicon-react/GlobalLineIcon";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Box, Container } from "../utilities/layout";
import { dropDownSlot, appearanceBtnClsx } from "./styled";
import { Dropdown } from "../utilities/dropdown";
import { useLanguageBroadcast } from "~/hooks/useLanguageBroadcast";

import type { RootLoaderData } from "~/types/data";

export const Language = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { lngs } = useLoaderData<RootLoaderData>();
  const { i18n } = useTranslation();

  useLanguageBroadcast(i18n.language);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  return (
    <Container
      classes={clsx(appearanceBtnClsx, isOpened && "z-50")}
      onClick={() => setIsOpened((prev) => !prev)}
    >
      <GlobalLineIcon size="24" />

      <Dropdown isOpened={isOpened} handleClose={handleClose}>
        {Object.keys(lngs).map((lng) => (
          <Fragment key={lng}>
            {i18n.language == lng ? (
              <Box
                classes={clsx(dropDownSlot, "bg-bg-sel_lt dark:bg-bg-sel_dark")}
              >
                {lngs[lng].nativeName}
              </Box>
            ) : (
              <Link replace to={`?lng=${lng}`}>
                <Box classes={dropDownSlot}>{lngs[lng].nativeName}</Box>
              </Link>
            )}
          </Fragment>
        ))}
      </Dropdown>
    </Container>
  );
};
