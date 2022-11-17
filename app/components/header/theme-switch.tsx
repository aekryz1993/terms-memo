import MoonLineIcon from "remixicon-react/MoonLineIcon";
import SunLineIcon from "remixicon-react/SunLineIcon";

import { Theme, useTheme } from "~/context/theme";
import { useBroadcastChannel } from "~/hooks/useBroadcastChannel";
import { useThemeBroadcastChannel } from "~/hooks/useThemeBroadcastChannel";
import { appearanceBtnClsx } from "./styled";

export const ThemeSwithch = () => {
  const [theme, setTheme] = useTheme();
  const { postMessage, listenToMessage, removeMessageListener } =
    useBroadcastChannel("theme");

  const handleSwitchTheme = () => {
    setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
    postMessage({});
  };

  useThemeBroadcastChannel({
    listenToMessage,
    removeMessageListener,
    setTheme,
  });

  return (
    <button
      className={appearanceBtnClsx}
      id="themebtn"
      onClick={handleSwitchTheme}
    >
      {theme === Theme.DARK ? (
        <MoonLineIcon size="24" />
      ) : (
        <SunLineIcon size="24" />
      )}
    </button>
  );
};
