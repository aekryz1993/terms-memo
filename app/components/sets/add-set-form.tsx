import { Form } from "@remix-run/react";
import { forwardRef } from "react";
import { CancelButton, PrimaryButton } from "../utilities/buttons";

interface TProps {
  setIsOpenAddSet: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddSetForm = forwardRef(
  (
    { setIsOpenAddSet }: TProps,
    formRef: React.ForwardedRef<HTMLFormElement>
  ) => {
    return (
      <Form
        ref={formRef}
        method="post"
        replace
        className="fixed w-full h-full top-32 left-0"
      >
        <div>
          <label htmlFor="title-input">Title</label>
          <input type="text" id="title-input" name="title" />
        </div>
        <div>
          <label htmlFor="description-input">Description</label>
          <textarea
            id="description-input"
            name="description"
            rows={20}
            cols={80}
          />
        </div>
        <CancelButton type="button" onClick={() => setIsOpenAddSet(false)}>
          Cancel
        </CancelButton>
        <PrimaryButton type="submit">Confirm</PrimaryButton>
      </Form>
    );
  }
);

AddSetForm.displayName = "AddSetForm";
