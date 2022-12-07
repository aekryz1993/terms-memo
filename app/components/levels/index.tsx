import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";

import { LevelsNavProvider } from "./context";
import { Levels } from "./Levels";
import { LevelsNavItems } from "./Levels-nav-items";

import type { LevelLoaderData } from "~/types/data";

export const LevelsNav = () => {
  const { level } = useLoaderData<LevelLoaderData>();

  const initialLevel = useMemo(
    () => ({ id: level?.id, name: level?.name }),
    [level?.id, level?.name]
  );

  return (
    <LevelsNavProvider initialLevel={initialLevel}>
      <Levels>
        <LevelsNavItems />
      </Levels>
    </LevelsNavProvider>
  );
};
