const optionsContainer =
  "absolute top-2 right-2 hover:bg-bg-sec_hvr_lt dark:hover:bg-bg-sec_hvr_dark rounded-full p-1 z-40";

// delete-option
const deleteRootclsx =
  "fixed bottom-12 left-12 px-4 py-2 w-[300px] drop-shadow-2xl rounded bg-bg-sec_lt dark:bg-bg-sec_dark";
const deleteContainerClsx = "flex items-center justify-between";
const actionsBoxClsx = "flex items-center gap-4";
const actionClsx =
  "p-2 hover:bg-bg-sec_hvr_lt dark:hover:bg-bg-sec_hvr_dark cursor-pointer";
const undoClsx = "rounded text-text-tag_lt dark:text-text-tag_dark text-sm";
const closeClsx = "rounded-full";
const closeIconClsx = "w-6 h-6";

// edit-option
const portalRootClsx = "fixed top-0 z-50 w-full h-full bg-transparent";
const portalContainertClsx =
  "absolute top-0 left-0 right-0 bottom-0 m-auto bg-bg-sec_lt dark:bg-bg-sec_dark max-h-full md:max-h-max md:w-[414px] w-full xl:w-[820px] rounded-lg drop-shadow-2xl flex flex-col gap-12 px-4 py-12";
const titleClsx = "text-3xl mx-auto font-black";

export {
  optionsContainer,
  deleteRootclsx,
  deleteContainerClsx,
  actionsBoxClsx,
  actionClsx,
  undoClsx,
  closeClsx,
  closeIconClsx,
  portalRootClsx,
  portalContainertClsx,
  titleClsx,
};
