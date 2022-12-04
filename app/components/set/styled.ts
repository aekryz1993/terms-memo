import clsx from "clsx";

import { centerVertically } from "../utilities/layout";

const containerClsx = `${clsx(
  "w-full bg-bg-sec_lt dark:bg-bg-sec_dark sm:bg-transparent dark:sm:bg-transparent py-4 md:pt-10 md:pb-0",
  centerVertically
)}`;

const titleClsx = "text-3xl md:text-4xl";
const displayMoreBoxClsx =
  "relative -top-1 left-1 cursor-pointer rounded-full bg-white";
const displayMoreClsx =
  "w-3 h-3 sm:w-4 sm:h-4 text-alert-info_lt dark:text-alert-info_dark";

const portalRootClsx = "fixed top-0 z-50 w-full h-full bg-[rgba(0,0,0,0.7)]";
const portalContainertClsx =
  "absolute top-56 left-0 right-0 mx-auto bg-bg-sec_lt dark:bg-bg-sec_dark max-h-[50%] md:max-h-max w-[90%] md:w-[414px] xl:w-[820px] rounded-lg drop-shadow-2xl pt-16 pb-12 px-12 text-justify";

export {
  containerClsx,
  titleClsx,
  displayMoreBoxClsx,
  displayMoreClsx,
  portalRootClsx,
  portalContainertClsx,
};
