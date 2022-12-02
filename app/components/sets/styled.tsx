import clsx from "clsx";

interface TGridContainerProps extends React.ComponentProps<"ul"> {
  children: React.ReactNode;
}

const layoutContainer = "flex flex-col gap-12 px-8 pt-8";

const gridContainerclsx =
  "flex flex-wrap gap-6 justify-center text-direction-ltr pb-20 select-none";
const lgGridContainerclsx = "lg:gap-8";
const xlGridContainerclsx = "xl:gap-10";

const GridContainer = (props: TGridContainerProps) => {
  const { children, className, ...ulProps } = props;

  return (
    <ul
      {...ulProps}
      className={clsx(
        className,
        gridContainerclsx,
        lgGridContainerclsx,
        xlGridContainerclsx
      )}
    >
      {children}
    </ul>
  );
};

const headerClasses = "py-2";

const descriptionClasses = "pt-4";

const optionsContainer =
  "absolute top-2 right-2 hover:bg-bg-sec_hvr_lt dark:hover:bg-bg-sec_hvr_dark rounded-full p-1";

export {
  layoutContainer,
  GridContainer,
  headerClasses,
  descriptionClasses,
  optionsContainer,
};
