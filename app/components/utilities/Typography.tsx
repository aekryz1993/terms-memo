import clsx from "clsx";

interface THeaderProps extends React.ComponentPropsWithoutRef<"h1"> {
  children: React.ReactNode;
  classes?: string;
}

interface tParagraph extends React.ComponentPropsWithoutRef<"p"> {
  children: React.ReactNode;
  classes?: string;
}

const titleClasses = "font-bold tracking-wide text-xl";
const titleClassesLight = "text-text-title_lt";
const titleClassesDark = "dark:text-text-title_dark";

export const Title = (props: THeaderProps) => {
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

export const SubTitle = (props: tParagraph) => {
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

export const Paragraph = (props: tParagraph) => {
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
