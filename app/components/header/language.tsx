import { Link, useLoaderData } from "@remix-run/react";
import { Fragment, useState } from "react";
import GlobalLineIcon from "remixicon-react/GlobalLineIcon";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Box, Container } from "../utilities/layout";
import { dropDownSlot, appearanceBtnClsx } from "./styled";
import { Dropdown } from "../utilities/dropdown";

import type { RootLoaderData } from "~/types/data";

export const Language = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { lngs } = useLoaderData<RootLoaderData>();
  const { i18n } = useTranslation();

  return (
    <Container
      newClasses={clsx(appearanceBtnClsx, isOpened && "z-50")}
      onClick={() => setIsOpened((prev) => !prev)}
    >
      <GlobalLineIcon size="24" />

      <Dropdown isOpened={isOpened} setIsOpened={setIsOpened}>
        {Object.keys(lngs).map((lng) => (
          <Fragment key={lng}>
            {i18n.language == lng ? (
              <Box
                newClasses={clsx(
                  dropDownSlot,
                  "bg-bg-sel_lt dark:bg-bg-sel_dark"
                )}
              >
                {lngs[lng].nativeName}
              </Box>
            ) : (
              <Link replace to={`?lng=${lng}`}>
                <Box newClasses={dropDownSlot}>{lngs[lng].nativeName}</Box>
              </Link>
            )}
          </Fragment>
        ))}
      </Dropdown>
    </Container>
  );
};
