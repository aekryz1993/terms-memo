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

const optionsContainer =
  "absolute top-2 right-2 hover:bg-bg-sec_hvr_lt dark:hover:bg-bg-sec_hvr_dark rounded-full p-1";

const formClasses =
  "h-full w-5/6 max-w-[400px] m-auto flex flex-col items-stretch gap-6 md:gap-12";
const inputClasses =
  "rounded py-4 px-4 bg-bg-input_lt dark:bg-bg-input_dark drop-shadow w-full";
const submitBtn = "mt-2";

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
  optionsContainer,
  formClasses,
  inputClasses,
  submitBtn,
};
