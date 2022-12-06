import { useCallback, useState } from "react";
import { useLoaderData, useParams } from "@remix-run/react";

import { LevelsNavProvider, useLevelsNavContext } from "../levels/context";
import { SideActionContainer } from "../utilities/side-add-action";
import { TermActionFrom } from "./term-action-form";

import type { LevelsLoaderData } from "~/types/data";

export const AddTerm = () => {
  const { levels } = useLoaderData<LevelsLoaderData>();
  const { levelId } = useParams();
  const [isOpened, setIsOpened] = useState(false);

  return (
    <SideActionContainer
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      title="Add a New Term"
    >
      <LevelsNavProvider initialLevel={levelId ?? levels[0].id}>
        <AddTermContainer setIsOpened={setIsOpened} />
      </LevelsNavProvider>
    </SideActionContainer>
  );
};

const AddTermContainer = ({
  setIsOpened,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    state: { currentLevel },
  } = useLevelsNavContext();

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  return (
    <TermActionFrom
      actionType="add"
      handleClose={handleClose}
      buttonLabel="Add"
      currentLevel={currentLevel}
    />
  );
};
