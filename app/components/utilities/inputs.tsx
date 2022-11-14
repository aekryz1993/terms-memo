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
  const { classes, children, ...labelProps } = props;
  return (
    <label className={`${classes ? classes : ""}`} {...labelProps}>
      {children}
    </label>
  );
};

const Input = (props: TInputProps) => {
  const { classes, ...inputProps } = props;
  return (
    <input
      {...inputProps}
      className={`${primaryinputLightClasses} ${primaryInputDarkClasses} ${
        classes ? classes : ""
      }`}
    />
  );
};

const Textarea = (props: TTextareaProps) => {
  const { classes, ...inputProps } = props;
  return (
    <textarea
      {...inputProps}
      className={`${primaryinputLightClasses} ${primaryInputDarkClasses} ${
        classes ? classes : ""
      }`}
    />
  );
};

const FormInputItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${className ? className : ""}`}>{children}</div>;
};

export { LabelInput, Input, Textarea, FormInputItem };
