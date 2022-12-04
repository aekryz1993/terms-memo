import clsx from "clsx";

const levelsNavPlaceholder = "w-full pb-2 text-lg";

const levelsNavContainerClsx = `${clsx(
  "relative w-full py-2",
  "flex items-center"
)}`;

const levelsNavClsx = "flex gap-3 items-center md:gap-4 xl:gap-14";

const levelContainerClsx =
  "px-2 py-1 border-l-solid border-l-8 rounded cursor-pointer text-sm md:text-lg md:px-4 md:py-2";

export {
  levelsNavPlaceholder,
  levelsNavContainerClsx,
  levelsNavClsx,
  levelContainerClsx,
};
