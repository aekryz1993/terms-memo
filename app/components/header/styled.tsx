import { Box } from "../utilities/layout";

const containerClsx =
  "sticky top-0 p-4 z-50 flex justify-between bg-bg-sec_lt dark:bg-bg-sec_dark shadow items-stretch";

const rightSubContainerClsx = "justify-between gap-8 items-center";

const appearanceClsx = "justify-between items-center gap-4";

const appearanceBtnClsx =
  "rounded-full bg-bg-pry_lt dark:bg-bg-pry_dark p-2 cursor-pointer";

const dropdownContainer =
  "absolute bg-bg-sec_lt dark:bg-bg-sec_dark shadow-xl rounded translate-y-4";

const dropDownSlot =
  "hover:bg-bg-pry_hvr_lt dark:hover:bg-bg-pry_hvr_dark cursor-pointer px-6 py-2";

const Logo = () => {
  return (
    <Box classes="flex justify-center items-center">
      <h1 className="logo-text text-text-tag_lt dark:text-text-active_dark">
        ENGLISH MEMO
      </h1>
    </Box>
  );
};

export {
  containerClsx,
  Logo,
  rightSubContainerClsx,
  appearanceClsx,
  appearanceBtnClsx,
  dropdownContainer,
  dropDownSlot,
};
