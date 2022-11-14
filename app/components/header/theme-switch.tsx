import MoonLineIcon from "remixicon-react/MoonLineIcon";
import SunLineIcon from "remixicon-react/SunLineIcon";

import { Theme, useTheme } from "~/context/theme";
import { appearanceBtnClsx } from "./styled";

export const ThemeSwithch = () => {
  const [theme, setTheme] = useTheme();

  return (
    <button
      className={appearanceBtnClsx}
      id="themebtn"
      onClick={() =>
        setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK))
      }
    >
      {theme === Theme.DARK ? (
        <MoonLineIcon size="24" />
      ) : (
        <SunLineIcon size="24" />
      )}
    </button>
  );
};
