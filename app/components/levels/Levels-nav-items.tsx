import { memo } from "react";
import { NavLink, useLoaderData } from "@remix-run/react";
import clsx from "clsx";

import { Box } from "../utilities/layout";
import {
  activeLevelClsx,
  inactiveLevelClsx,
  levelBorderColor,
  levelContainerClsx,
} from "./styled";
import { useLevelsNavContext } from "./context";

import type { LevelsLoaderData } from "~/types/data";

export const LevelsNavItems = memo(() => {
  const { levels } = useLoaderData<LevelsLoaderData>();

  const {
    state: { currentLevel },
    closeIsOpened,
    updateLevel,
  } = useLevelsNavContext();

  const handleItemClick = (itemName: string) => {
    closeIsOpened();
    updateLevel(itemName);
  };

  return (
    <>
      <NavLink prefetch="intent" to="levels">
        <Box
          classes={clsx(
            levelContainerClsx,
            levelBorderColor["All"],
            currentLevel === "All" ? activeLevelClsx : inactiveLevelClsx
          )}
          onClick={() => handleItemClick("All")}
        >
          All
        </Box>
      </NavLink>
      {levels?.length
        ? levels.map((level) => (
            <NavLink key={level.id} prefetch="intent" to={`levels/${level.id}`}>
              <Box
                classes={clsx(
                  levelContainerClsx,
                  levelBorderColor[level.name],
                  currentLevel === level.name
                    ? activeLevelClsx
                    : inactiveLevelClsx
                )}
                onClick={() => updateLevel(level.name)}
              >
                {level.name}
              </Box>
            </NavLink>
          ))
        : null}
    </>
  );
});
