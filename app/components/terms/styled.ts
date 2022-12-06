import clsx from "clsx";

const levelsNavPlaceholder = "w-full pb-2 text-lg";

const levelsNavContainerClsx = `${clsx(
  "relative w-full py-2",
  "flex items-center"
)}`;

const levelsNavClsx = "flex gap-3 items-center md:gap-4 xl:gap-14";

const levelContainerClsx =
  "px-2 py-1 border-l-solid border-l-8 rounded cursor-pointer text-sm md:text-lg md:px-4 md:py-2";

const modalContainerClsx =
  "relative top-2/4 -translate-y-2/4 bg-bg-sec_lt dark:bg-bg-sec_dark px-2 pb-4 pt-14 mt-4 flex flex-col gap-4";

const portalContainertClsx =
  "absolute top-0 left-0 right-0 bottom-0 m-auto bg-bg-sec_lt dark:bg-bg-sec_dark max-h-full md:max-h-max w-full md:w-[414px] rounded-lg drop-shadow-2xl flex flex-col gap-12 px-4 py-12";

export {
  levelsNavPlaceholder,
  levelsNavContainerClsx,
  levelsNavClsx,
  levelContainerClsx,
  modalContainerClsx,
  portalContainertClsx,
};
