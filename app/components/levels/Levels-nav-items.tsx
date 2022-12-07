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
import { TLevel, useLevelsNavContext } from "./context";

import type { LevelLoaderData, LevelsLoaderData } from "~/types/data";

export const LevelsNavItems = memo(() => {
  const { levels, level } = useLoaderData<LevelsLoaderData & LevelLoaderData>();

  const {
    state: { currentLevel },
    closeIsOpened,
    updateLevel,
  } = useLevelsNavContext();

  const handleItemClick = (itemName: TLevel) => {
    closeIsOpened();
    updateLevel(itemName);
  };

  useEffect(() => {
    if (level) {
      updateLevel({ id: level.id, name: level.name });
    }
  }, [level?.id, level?.name]);

  return (
    <>
      <NavLink prefetch="intent" to="levels" replace>
        <Box
          classes={clsx(
            levelContainerClsx,
            levelBorderColor["All"],
            currentLevel.id === "All" ? activeLevelClsx : inactiveLevelClsx
          )}
          onClick={() => handleItemClick({ id: "All", name: "All" })}
        >
          All
        </Box>
      </NavLink>
      {levels?.length
        ? levels.map((_level) => (
            <NavLink
              key={_level.id}
              prefetch="intent"
              to={`levels/${_level.id}`}
              replace
            >
              <Box
                classes={clsx(
                  levelContainerClsx,
                  levelBorderColor[_level.name],
                  currentLevel.id === _level.id
                    ? activeLevelClsx
                    : inactiveLevelClsx
                )}
                onClick={() =>
                  handleItemClick({ id: _level.id, name: _level.name })
                }
              >
                {_level.name}
              </Box>
            </NavLink>
          ))
        : null}
    </>
  );
});
