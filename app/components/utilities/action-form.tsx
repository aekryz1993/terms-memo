import { Form } from "@remix-run/react";

import { PrimaryButton } from "./buttons";

const formClasses =
  "h-full w-5/6 max-w-[400px] m-auto flex flex-col items-stretch gap-6 md:gap-12";
const inputClasses =
  "rounded py-4 px-4 bg-bg-input_lt dark:bg-bg-input_dark drop-shadow w-full";
const submitBtn = "mt-2";

const ActionFrom = ({
  actionType,
  buttonLabel,
  children,
}: {
  actionType: string;
  buttonLabel: string;
  children: React.ReactNode;
}) => {
  return (
    <Form method="post" className={formClasses}>
      <input type="hidden" name="actionType" value={actionType} />
      {children}
      <PrimaryButton type="submit" classes={submitBtn}>
        {buttonLabel}
      </PrimaryButton>
    </Form>
  );
};

export { ActionFrom, inputClasses };
