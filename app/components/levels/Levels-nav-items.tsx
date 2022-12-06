import { memo, useEffect } from "react";
import { NavLink, useLoaderData, useParams } from "@remix-run/react";
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
  const { levelId } = useParams();

  const {
    state: { currentLevel },
    closeIsOpened,
    updateLevel,
  } = useLevelsNavContext();

  const handleItemClick = (itemName: string) => {
    closeIsOpened();
    updateLevel(itemName);
  };

  useEffect(() => {
    if (levelId) {
      updateLevel(levelId);
    }
  }, [levelId]);

  return (
    <>
      <NavLink prefetch="intent" to="levels" replace>
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
            <NavLink
              key={level.id}
              prefetch="intent"
              to={`levels/${level.id}`}
              replace
            >
              <Box
                classes={clsx(
                  levelContainerClsx,
                  levelBorderColor[level.name],
                  currentLevel === level.id
                    ? activeLevelClsx
                    : inactiveLevelClsx
                )}
                onClick={() => updateLevel(level.id)}
              >
                {level.name}
              </Box>
            </NavLink>
          ))
        : null}
    </>
  );
});
