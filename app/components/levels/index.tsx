import { LevelsNavProvider } from "./context";
import { Levels } from "./Levels";
import { LevelsNavItems } from "./Levels-nav-items";

export const LevelsNav = () => {
  return (
    <LevelsNavProvider>
      <Levels>
        <LevelsNavItems />
      </Levels>
    </LevelsNavProvider>
  );
};
