import clsx from "clsx";

import { Box } from "./layout";

interface TDivProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  classes?: string;
}

interface TInputProps extends React.ComponentPropsWithoutRef<"input"> {
  classes?: string;
}

interface TLabelProps extends React.ComponentPropsWithoutRef<"label"> {
  children: React.ReactNode;
  classes?: string;
}

interface TErrorMessageFieldProps extends React.ComponentPropsWithoutRef<"p"> {
  children: React.ReactNode;
  classes?: string;
}

interface TFieldProps extends TInputProps {
  id: string;
  fieldError?: string;
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

const labelClasses = "block text-xl pb-2";

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

const Label = (props: TLabelProps) => {
  const { classes, className, children, ...labelProps } = props;
  return (
    <label {...labelProps} className={clsx(classes, labelClasses, className)}>
      {children}
    </label>
  );
};

const ErrorMessageField = (props: TErrorMessageFieldProps) => {
  const { classes, className, children, ...errorMessageProps } = props;
  return (
    <p {...errorMessageProps} className={clsx(classes, className)}>
      {children}
    </p>
  );
};

const Field = (props: TFieldProps) => {
  const { fieldError, ...fieldProps } = props;
  return (
    <Box>
      <Label htmlFor={fieldProps.id}>
        {fieldProps.name
          ? `${fieldProps.name.charAt(0).toUpperCase()}${fieldProps.name.slice(
              1
            )}`
          : null}
      </Label>
      <Input {...fieldProps} />
      {fieldError ? (
        <ErrorMessageField role="alert" id="title-error">
          {fieldError}
        </ErrorMessageField>
      ) : null}
    </Box>
  );
};

export { LabelInput, Label, Field, Input, Textarea, FormInputItem };
