import clsx from "clsx";

interface THeaderProps extends React.ComponentPropsWithoutRef<"h1"> {
  children: React.ReactNode;
  classes?: string;
}

interface TParagraph extends React.ComponentPropsWithoutRef<"p"> {
  children: React.ReactNode;
  classes?: string;
}

interface TSentence extends React.ComponentPropsWithoutRef<"span"> {
  children: React.ReactNode;
  classes?: string;
}

const titleClasses = "font-bold tracking-wide text-xl";
const titleClassesLight = "text-text-title_lt";
const titleClassesDark = "dark:text-text-title_dark";

const Title = (props: THeaderProps) => {
  const { className, classes, children, ...headerProps } = props;
  return (
    <h1
      {...headerProps}
      className={clsx(
        classes,
        titleClasses,
        titleClassesLight,
        titleClassesDark,
        className
      )}
    >
      {children}
    </h1>
  );
};

const subTitleClasses = "tracking-wide text-xs";
const subTitleClassesLight = "text-text-inactive_lt";
const subTitleClassesDark = "dark:text-text-inactive_dark";

const SubTitle = (props: TParagraph) => {
  const { className, classes, children, ...headerProps } = props;
  return (
    <p
      {...headerProps}
      className={clsx(
        classes,
        subTitleClasses,
        subTitleClassesLight,
        subTitleClassesDark,
        className
      )}
    >
      {children}
    </p>
  );
};

const paragraphClasses =
  "text-sm tracking-wide break-words leading-loose text-ellipsis-2";
const paragraphClassesLight = "text-text-text_lt";
const paragraphClassesDark = "dark:text-text-text_dark";

const Paragraph = (props: TParagraph) => {
  const { className, classes, children, ...headerProps } = props;
  return (
    <p
      {...headerProps}
      className={clsx(
        classes,
        paragraphClasses,
        paragraphClassesLight,
        paragraphClassesDark,
        className
      )}
    >
      {children}
    </p>
  );
};

const sentenceClsx = "tracking-wide break-words leading-loose text-ellipsis-2";

const Sentence = (props: TSentence) => {
  const { className, classes, children, ...sentenceProps } = props;
  return (
    <span
      {...sentenceProps}
      className={clsx(
        classes,
        sentenceClsx,
        paragraphClassesLight,
        paragraphClassesDark,
        className
      )}
    >
      {children}
    </span>
  );
};

const errorMessageClassesLight = "text-alert-danger_lt";
const errorMessageClassesDark = "dark:text-alert-danger_dark";

const ErrorMessage = (props: TParagraph) => {
  const { className, classes, children, ...errorMessageProps } = props;
  return (
    <p
      {...errorMessageProps}
      className={clsx(
        classes,
        paragraphClasses,
        errorMessageClassesLight,
        errorMessageClassesDark,
        className
      )}
    >
      {children}
    </p>
  );
};

export { Title, SubTitle, Paragraph, Sentence, ErrorMessage };
