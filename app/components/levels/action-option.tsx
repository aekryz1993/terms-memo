import { useCallback } from "react";

import { ActionsOptionLayout } from "../utilities/actions-option";
import { Options } from "../utilities/actions-option/options";
import { useDelete } from "../utilities/actions-option/hooks/useDeleteSet";
import { useActionsOption } from "../utilities/actions-option/context";
import { DeleteOption } from "../utilities/actions-option/options/delete-option";
import { EditOption } from "../utilities/actions-option/options/edit-option";
import { TermActionFrom } from "./term-actrion-form";

import type { TOption } from "../utilities/actions-option/context/types";
import type { TTerm } from "~/types/endpoints";

const options: TOption[] = [
  { label: "Edit", actionType: "edit" },
  { label: "Delete", actionType: "delete" },
];

export const ActionsOption = ({ term }: { term: TTerm }) => {
  const {
    state: { isOpenedModal },
    closeModalOption,
  } = useActionsOption();

  const { setDeleteTimer, deleteTimerIdRef } = useDelete({
    id: term.id,
    action: "action/term/delete-term",
    actionType: "delete-term",
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
        <EditOption title="Edit the Term">
          <TermActionFrom
            term={term}
            actionType="edit"
            handleClose={handleClose}
            buttonLabel="Update"
          />
        </EditOption>
      ) : null}
      {isOpenedModal.delete ? (
        <DeleteOption text="Term binned" deleteTimerIdRef={deleteTimerIdRef} />
      ) : null}
    </>
  );
};
