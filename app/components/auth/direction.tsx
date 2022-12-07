import { Box } from "../utilities/layout";

export const Direction = ({
  text,
  buttonLabel,
  handleChangeScreen,
}: {
  text: string;
  buttonLabel: string;
  handleChangeScreen: () => void;
}) => {
  return (
    <Box>
      <span className="text-sm sm:text-base">{text}</span>
      <button
        type="button"
        onClick={handleChangeScreen}
        className="text-text-tag_lt dark:text-text-tag_dark ml-2 text-sm sm:text-base"
      >
        {buttonLabel}
      </button>
    </Box>
  );
};
