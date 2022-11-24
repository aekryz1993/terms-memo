import { Form as FormRemix } from "@remix-run/react";
import clsx from "clsx";
import { forwardRef } from "react";

interface TFormProps extends React.ComponentPropsWithoutRef<typeof FormRemix> {
  children: React.ReactNode;
  classes?: string;
}

const primaryFormLightClasses = "bg-bg-sec_lt";

const primaryFormDarkClasses = "dark:bg-bg-sec_dark";

const Form = forwardRef(
  (props: TFormProps, ref?: React.ForwardedRef<HTMLFormElement>) => {
    const { children, classes, ...formProps } = props;

    return (
      <FormRemix
        {...formProps}
        ref={ref}
        className={clsx(
          classes,
          primaryFormLightClasses,
          primaryFormDarkClasses
        )}
      >
        {children}
      </FormRemix>
    );
  }
);

Form.displayName = "Form";

export { Form };
