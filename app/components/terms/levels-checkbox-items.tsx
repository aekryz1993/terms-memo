import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";

import { Box } from "../utilities/layout";
import { activeLevelClsx, levelBorderColor } from "../levels/styled";
import { levelContainerClsx } from "./styled";
import { useLevelsNavContext } from "../levels/context";

import type { LevelsLoaderData } from "~/types/data";

export const LevelsCheckboxItems = () => {
  const { levels } = useLoaderData<LevelsLoaderData>();
  const {
    state: { currentLevel },
    updateLevel,
  } = useLevelsNavContext();

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
