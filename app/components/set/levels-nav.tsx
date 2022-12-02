import { memo, useState } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { Box, Container } from "../utilities/layout";
import { Portal } from "../Portal";
import {
  activeLevelClsx,
  arrowDownIconClsx,
  closeIconClsx,
  inactiveLevelClsx,
  levelBorderColor,
  levelContainerClsx,
  levelsNavClsx,
  levelsNavContainerClsx,
  modalContainerClsx,
  modalRootClsx,
  xslevelsNavClsx,
} from "./styled";

import type { SetLoaderData } from "~/types/data";

const LevelsNavItems = memo(({ currentLevel }: { currentLevel: string }) => {
  const { levels } = useLoaderData<SetLoaderData>();

  return (
    <>
      <Box
        classes={clsx(
          levelContainerClsx,
          levelBorderColor["All"],
          currentLevel === "All" ? activeLevelClsx : inactiveLevelClsx
        )}
      >
        <Link to="levels">All</Link>
      </Box>
      {levels?.length
        ? levels.map((level) => (
            <Box
              key={level.id}
              classes={clsx(
                levelContainerClsx,
                levelBorderColor[level.name],
                currentLevel === level.name
                  ? activeLevelClsx
                  : inactiveLevelClsx
              )}
            >
              <Link to={`levels/${level.id}`}>{level.name}</Link>
            </Box>
          ))
        : null}
    </>
  );
});

export const LevelsNav = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [currentLevel, setCurrentLevel] = useState("All");

  return (
    <Container classes={levelsNavContainerClsx}>
      <Box classes={levelsNavClsx}>
        <LevelsNavItems currentLevel={currentLevel} />
      </Box>

      <Box
        classes={xslevelsNavClsx}
        onClick={() => {
          setIsOpened((prevState) => !prevState);
        }}
      >
        {currentLevel}
        <ChevronDownIcon className={arrowDownIconClsx} />
      </Box>

      {isOpened ? (
        <Portal id="levels" rootClass={modalRootClsx} clsx={modalContainerClsx}>
          <XMarkIcon
            className={closeIconClsx}
            onClick={() => setIsOpened(false)}
          />
          <LevelsNavItems currentLevel={currentLevel} />
        </Portal>
      ) : null}
    </Container>
  );
};
