import clsx from "clsx";

interface TCardProps extends React.ComponentProps<"li"> {
  children: React.ReactNode;
  isbinned?: string;
}

const cardClsx =
  "w-[400px] relative px-4 py-4 flex flex-col bg-bg-sec_lt dark:bg-bg-sec_dark shadow cursor-pointer rounded transition-all duration-300";

const visibleClsx = "translate-x-0";

const deletedClsx = "-translate-x-[9999px]";

const Card = (props: TCardProps) => {
  const { children, className, ...divProps } = props;

  return (
    <li
      {...divProps}
      className={clsx(
        cardClsx,
        props.isbinned ? deletedClsx : visibleClsx,
        className
      )}
    >
      {children}
    </li>
  );
};

export { Card };
