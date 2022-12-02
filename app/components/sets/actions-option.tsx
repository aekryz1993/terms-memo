import { useCallback } from "react";

import { ActionsOptionLayout } from "../utilities/actions-option";
import { Options } from "../utilities/actions-option/options";
import { useDelete } from "../utilities/actions-option/hooks/useDeleteSet";
import { useActionsOption } from "../utilities/actions-option/context";
import { DeleteOption } from "../utilities/actions-option/options/delete-option";
import { EditOption } from "../utilities/actions-option/options/edit-option";
import { SetActionFrom } from "./set-action-form";

import type { TOption } from "../utilities/actions-option/context/types";
import type { TSet } from "~/types/endpoints";

const options: TOption[] = [
  { label: "Edit", actionType: "edit" },
  { label: "Delete", actionType: "delete" },
];

export const ActionsOption = ({ set }: { set: TSet }) => {
  const {
    state: { isOpenedModal },
    closeModalOption,
  } = useActionsOption();

  const { setDeleteTimer, deleteTimerIdRef } = useDelete({
    id: set.id,
    action: "action/set/delete-set",
    actionType: "delete-set",
  });

  const handleClose = useCallback(() => {
    closeModalOption({ actionName: "edit" });
  }, [closeModalOption]);

  return (
    <>
      <ActionsOptionLayout>
        <Options options={options} setDeleteTimer={setDeleteTimer} />
      </ActionsOptionLayout>

      {isOpenedModal.edit ? (
        <EditOption title="Edit the Set">
          <SetActionFrom
            set={set}
            actionType="edit"
            handleClose={handleClose}
            buttonLabel="Update"
          />
        </EditOption>
      ) : null}
      {isOpenedModal.delete ? (
        <DeleteOption text="Set binned" deleteTimerIdRef={deleteTimerIdRef} />
      ) : null}
    </>
  );
};
