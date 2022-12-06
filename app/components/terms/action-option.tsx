import { useCallback } from "react";

import { ActionsOptionLayout } from "../utilities/actions-option";
import { Options } from "../utilities/actions-option/options";
import { useDelete } from "../utilities/actions-option/hooks/useDeleteSet";
import { useActionsOption } from "../utilities/actions-option/context";
import { DeleteOption } from "../utilities/actions-option/options/delete-option";
import { EditOption } from "../utilities/actions-option/options/edit-option";
import { TermActionFrom } from "./term-action-form";
import { MoveTerm } from "./move-term";

import type { TOption } from "../utilities/actions-option/context/types";
import type { TTerm } from "~/types/endpoints";

const options: TOption[] = [
  { label: "Edit", actionType: "edit" },
  { label: "Delete", actionType: "delete" },
  { label: "Move", actionType: "move" },
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

  const handleClose = useCallback(
    (actionType: string) => () => {
      closeModalOption({ actionName: actionType });
    },
    [closeModalOption]
  );

  const { id, levelId } = term;

  return (
    <>
      <ActionsOptionLayout>
        <Options options={options} setDeleteTimer={setDeleteTimer} />
      </ActionsOptionLayout>

      {isOpenedModal.edit && levelId ? (
        <EditOption title="Edit the Term" id="edit-term">
          <TermActionFrom
            term={term}
            actionType="edit"
            handleClose={handleClose("edit")}
            buttonLabel="Update"
          />
        </EditOption>
      ) : null}
      {isOpenedModal.delete && levelId ? (
        <DeleteOption
          text="Term binned"
          deleteTimerIdRef={deleteTimerIdRef}
          id="delete-term"
        />
      ) : null}
      {isOpenedModal.move && levelId ? (
        <MoveTerm term={{ id, levelId }} handleClose={handleClose("move")} />
      ) : null}
    </>
  );
};
