import clsx from "clsx";

import { centerVertically } from "../utilities/layout";

const levelsNavContainerClsx = `${clsx(
  "relative w-full py-4 bg-bg-sec_lt dark:bg-bg-sec_dark sm:bg-transparent dark:sm:bg-transparent sm:py-12",
  centerVertically
)}`;

const xslevelsNavClsx =
  "flex justify-between items-center cursor-pointer mx-4 w-full rounded-md px-2 py-1 border-2 border-bg-input_lt dark:border-bg-input_dark text-lg text-text-active_lt dark:text-text-active_dark sm:hidden";
const levelsNavClsx = "hidden sm:flex gap-8 items-center";
3;

const modalRootClsx =
  "fixed w-full bg-bg-sec_lt dark:bg-bg-sec_dark px-2 pb-4 pt-14 mt-4 sm:hidden";
const modalContainerClsx = "flex flex-col gap-4";

const levelBorderColor = {
  All: "border-l-alert-info_lt dark:border-l-alert-info_dark",
  Difficult: "border-l-alert-danger_lt dark:border-l-alert-danger_dark",
  Medium: "border-l-alert-warning_lt dark:border-l-alert-warning_dark",
  Perfect: "border-l-alert-success_lt dark:border-l-alert-success_dark",
};

const levelContainerClsx =
  "px-4 py-2 border-l-solid border-l-8 rounded cursor-pointer text-lg";

const inactiveLevelClsx =
  "border border-bg-input_lt dark:border-bg-input_dark sm:border-0 sm:border-l-8";

const activeLevelClsx = "bg-bg-sel_lt dark:bg-bg-sel_dark text-white";

const arrowDownIconClsx = "w-5 h-5 text-text-other_lt dark:text-white";
const closeIconClsx = "w-6 h-6 absolute right-2 top-2";

export {
  levelsNavContainerClsx,
  xslevelsNavClsx,
  levelsNavClsx,
  levelBorderColor,
  levelContainerClsx,
  activeLevelClsx,
  inactiveLevelClsx,
  arrowDownIconClsx,
  modalRootClsx,
  modalContainerClsx,
  closeIconClsx,
};
