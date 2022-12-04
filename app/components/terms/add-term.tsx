import { useCallback, useState } from "react";
import { useLoaderData } from "@remix-run/react";

import { LevelsNavProvider } from "../levels/context";
import { SideActionContainer } from "../utilities/side-add-action";
import { TermActionFrom } from "./term-action-form";

import type { LevelsLoaderData } from "~/types/data";

export const AddTerm = () => {
  const { levels } = useLoaderData<LevelsLoaderData>();
  const [isOpened, setIsOpened] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  return (
    <SideActionContainer
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      title="Add a New Term"
    >
      <LevelsNavProvider initialLevel={levels[0].id}>
        <TermActionFrom
          actionType="add"
          handleClose={handleClose}
          buttonLabel="Add"
        />
      </LevelsNavProvider>
    </SideActionContainer>
  );
};
