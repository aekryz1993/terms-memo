import clsx from "clsx";

interface TGridContainerProps extends React.ComponentProps<"ul"> {
  children: React.ReactNode;
}

const layoutContainer = "flex flex-col gap-12 px-8 pt-8";

const gridContainerclsx =
  "grid gap-4 grid-cols-1 text-direction-ltr pb-20 select-none";
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
  "inline-flex absolute bottom-6 w-full justify-center items-center select-none z-30";
const paginationContainer = "flex gap-1 sm:gap-2";

const paginationItem = "drop-shadow-2xl cursor-pointer rounded";
const paginationItemLight = "bg-bg-sec_lt";
const paginationItemDark =
  "dark:bg-bg-sec_dark dark:border-btn-disable_dark dark:border-[0.1px]";

const paginationIconItem =
  "text-center tracking-wider font-semibold text-sm py-1 px-2 sm:text-lg sm:py-2";

const selectedPage = "bg-bg-sel_lt text-white dark:bg-bg-sel_dark";

const disableIcon = "opacity-40";

const searchbarContainer = "sticky top-20 w-11/12 max-w-xl mx-auto";
const searchInput =
  "w-full pl-4 py-4 rounded-lg drop-shadow-lg bg-bg-sec_lt dark:bg-bg-input_dark";
const searchBarIcon =
  "absolute inline-block -translate-x-10 top-2/4 -translate-y-2/4 rotate-90";

const searchCancelIcon =
  "cursor-pointer text-text-inactive_lt dark:text-text-inactive_dark";

export {
  layoutContainer,
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
  searchbarContainer,
  searchBarIcon,
  searchInput,
  searchCancelIcon,
};
