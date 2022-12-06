import { useParams } from "@remix-run/react";
import { LevelsNavProvider } from "./context";
import { Levels } from "./Levels";
import { LevelsNavItems } from "./Levels-nav-items";

export const LevelsNav = () => {
  const { levelId } = useParams();
  return (
    <LevelsNavProvider initialLevel={levelId ?? "All"}>
      <Levels>
        <LevelsNavItems />
      </Levels>
    </LevelsNavProvider>
  );
};
