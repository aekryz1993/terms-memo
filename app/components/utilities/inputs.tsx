import clsx from "clsx";

interface TDivProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  classes?: string;
}

interface TInputProps extends React.ComponentPropsWithoutRef<"input"> {
  classes?: string;
}

interface TTextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  classes?: string;
}

interface TLabelProps extends React.ComponentPropsWithoutRef<"label"> {
  children: React.ReactNode;
  classes?: string;
}

const primaryinputLightClasses = "bg-bg-input_lt";

const primaryInputDarkClasses = "dark:bg-bg-input_dark";

const LabelInput = (props: TLabelProps) => {
  const { classes, className, children, ...labelProps } = props;
  return (
    <label className={clsx(classes, className)} {...labelProps}>
      {children}
    </label>
  );
};

const Input = (props: TInputProps) => {
  const { classes, className, ...inputProps } = props;
  return (
    <input
      {...inputProps}
      className={clsx(
        classes ? classes : primaryinputLightClasses,
        classes ? classes : primaryInputDarkClasses,
        className
      )}
    />
  );
};

const Textarea = (props: TTextareaProps) => {
  const { classes, className, ...inputProps } = props;
  return (
    <textarea
      {...inputProps}
      className={clsx(
        classes,
        primaryinputLightClasses,
        primaryInputDarkClasses,
        className
      )}
    />
  );
};

const FormInputItem = (props: TDivProps) => {
  const { children, className, classes, ...divProps } = props;
  return (
    <div {...divProps} className={clsx(classes, className)}>
      {children}
    </div>
  );
};

export { LabelInput, Input, Textarea, FormInputItem };
