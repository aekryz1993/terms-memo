import { useCallback, useState } from "react";

import { SetActionFrom } from "./set-action-form";
import { SideActionContainer } from "../utilities/side-add-action";

export const AddSet = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  return (
    <SideActionContainer
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      title="Add a New Set"
    >
      <SetActionFrom
        actionType="add"
        handleClose={handleClose}
        buttonLabel="Add"
      />
    </SideActionContainer>
  );
};
