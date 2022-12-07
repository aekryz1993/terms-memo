import { Form } from "@remix-run/react";

import { PrimaryButton } from "./buttons";

const formClasses =
  "h-full w-5/6 max-w-[400px] m-auto flex flex-col items-stretch gap-6 sm:gap-12";
const inputClasses =
  "rounded py-2 px-4 bg-bg-input_lt dark:bg-bg-input_dark drop-shadow w-full sm:py-4";
const submitBtn =
  "mt-2 text-lg py-2 font-normal sm:py-4 sm:text-xl sm:font-black";

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
    <Form method="post" className={formClasses} replace>
      <input type="hidden" name="actionType" value={actionType} />
      {children}
      <PrimaryButton type="submit" classes={submitBtn}>
        {buttonLabel}
      </PrimaryButton>
    </Form>
  );
};

export { ActionFrom, inputClasses };
