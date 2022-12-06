import { useLoaderData, useParams } from "@remix-run/react";
import clsx from "clsx";

import { Box } from "../utilities/layout";
import { activeLevelClsx, levelBorderColor } from "../levels/styled";
import { levelContainerClsx } from "./styled";
import { useLevelsNavContext } from "../levels/context";

import type { LevelsLoaderData } from "~/types/data";
import { useEffect } from "react";

export const LevelsCheckboxItems = () => {
  const { levels } = useLoaderData<LevelsLoaderData>();
  const { levelId } = useParams();

  const {
    state: { currentLevel },
    updateLevel,
  } = useLevelsNavContext();

  useEffect(() => {
    if (levelId) updateLevel(levelId);
    else updateLevel(levels[0].id);
  }, [levelId]);

  return (
    <>
      {levels?.length
        ? levels.map((level) => (
            <Box
              key={level.id}
              classes={clsx(
                levelContainerClsx,
                levelBorderColor[level.name],
                currentLevel === level.id ? activeLevelClsx : null
              )}
              onClick={() => updateLevel(level.id)}
            >
              {level.name}
            </Box>
          ))
        : null}
    </>
  );
};
