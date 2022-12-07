const container =
  "fixed z-50 shadow-2xl h-full w-[300px] md:w-[414px] xl:w-[820px] bg-bg-sec_lt dark:bg-bg-sec_dark transition-transform duration-1000";

const contentContainer = "overflow-y-auto flex flex-col";

const closedContainer =
  "-translate-x-[280px] md:-translate-x-[390px] xl:-translate-x-[800px]";
const openedContainer = "translate-x-0";
const titleClsx = "text-xl md:text-3xl mx-auto font-black";

const openOrCloseBox =
  "fixed h-full top-0 -left-[20px] cursor-pointer translate-x-[300px] md:translate-x-[414px] xl:translate-x-[820px]";
const openOrCloseIcon =
  "absolute p-2 drop-shadow-xl top-2/4 -translate-y-2/4 h-10 w-10 rounded-full text-white cursor-pointer transition-all duration-1000";
const openIcon = "bg-text-inactive_lt dark:bg-bg-input_dark rotate-315";
const closeIcon = "bg-bg-sel_lt dark:bg-bg-sel_dark rotate-0";

export {
  container,
  contentContainer,
  closedContainer,
  openedContainer,
  titleClsx,
  openOrCloseBox,
  openOrCloseIcon,
  openIcon,
  closeIcon,
};
