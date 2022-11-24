import clsx from "clsx";

interface TCardProps extends React.ComponentProps<"li"> {
  children: React.ReactNode;
}

const cardClsx =
  "px-4 py-4 flex flex-col bg-bg-sec_lt dark:bg-bg-sec_dark shadow cursor-pointer rounded";

const Card = (props: TCardProps) => {
  const { children, className, ...divProps } = props;

  return (
    <li {...divProps} className={clsx([cardClsx, className])}>
      {children}
    </li>
  );
};

export { Card };
