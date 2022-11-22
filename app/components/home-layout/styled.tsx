import clsx from "clsx";

interface TGridContainerProps extends React.ComponentProps<"ul"> {
  children: React.ReactNode;
}

const gridContainerclsx =
  "grid gap-4 grid-cols-1 text-direction-ltr pb-10 select-none";
const smGgridContainerclsx = "sm:grid-cols-2";
const lgGridContainerclsx = "lg:gap-8 lg:grid-cols-3";
const xlGridContainerclsx = "xl:gap-10 xl:grid-cols-4";

const GridContainer = (props: TGridContainerProps) => {
  const { children, className, ...ulProps } = props;

  return (
    <ul
      {...ulProps}
      className={clsx(
        className,
        gridContainerclsx,
        smGgridContainerclsx,
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

const paginationRoot =
  "inline-flex sticky bottom-6 w-full justify-center items-center select-none";
const paginationContainer = "flex gap-2";

const paginationItem = "drop-shadow-xl cursor-pointer rounded";
const paginationItemLight = "bg-bg-sec_lt";
const paginationItemDark =
  "dark:bg-bg-sec_dark dark:border-btn-disable_dark dark:border-[0.1px]";

const paginationIconItem =
  "text-center tracking-wider font-semibold text-sm py-1 px-2 sm:text-lg sm:py-2";

const selectedPage = "bg-bg-sel_lt text-white dark:bg-bg-sel_dark";

const disableIcon = "opacity-40";

export {
  GridContainer,
  headerClasses,
  descriptionClasses,
  paginationRoot,
  paginationContainer,
  paginationItem,
  paginationIconItem,
  paginationItemLight,
  paginationItemDark,
  selectedPage,
  disableIcon,
};
