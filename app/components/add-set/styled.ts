const container =
  "fixed z-40 shadow-2xl h-full w-[300px] md:w-[414px] xl:w-[820px] bg-bg-sec_lt dark:bg-bg-sec_dark transition-transform duration-1000 flex flex-col gap-12 px-4 py-12";
const closedContainer =
  "-translate-x-[280px] md:-translate-x-[390px] xl:-translate-x-[800px]";
const openedContainer = "translate-x-0";

const openOrCloseBox =
  "fixed h-full top-0 -left-[20px] cursor-pointer translate-x-[300px] md:translate-x-[414px] xl:translate-x-[820px]";
const openOrCloseIcon =
  "absolute p-2 drop-shadow-xl top-2/4 -translate-y-2/4 h-10 w-10 rounded-full text-white cursor-pointer transition-all duration-1000";
const openIcon = "bg-text-inactive_lt dark:bg-bg-input_dark rotate-315";
const closeIcon = "bg-bg-sel_lt dark:bg-bg-sel_dark rotate-0";

const title = "text-3xl mx-auto font-black";

const formClasses =
  "h-full w-5/6 max-w-[400px] m-auto flex flex-col items-stretch gap-12";
const inputClasses =
  "rounded py-4 px-4 bg-bg-input_lt dark:bg-bg-input_dark drop-shadow w-full";
const submitBtn = "mt-6";

export {
  container,
  closedContainer,
  openedContainer,
  openOrCloseBox,
  openOrCloseIcon,
  openIcon,
  closeIcon,
  inputClasses,
  formClasses,
  title,
  submitBtn,
};
