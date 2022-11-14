import { useFetcher } from "@remix-run/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useCallbackRef } from "~/hooks/useCallbackRef";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

type ThemeContextType = [
  Theme | null,
  React.Dispatch<React.SetStateAction<Theme | null>>
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prefersDarkMQ = "(prefers-color-scheme: dark)";
const getPreferredTheme = () =>
  window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT;

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    console.warn(
      "Hi there, The theme is already applied!",
    );
  } else {
    cl.add(theme);
  }
})();
`;

const iconViewBox = "0 0 24 24";
const iconDim = "24";
const darkIconPathSecD =
  "M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z";
const lightIconPathSecD =
  "M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z";

const renderThemeIcon = `((theme, container) => {
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const iconFirstPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  const iconSectPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );

  iconSvg.setAttribute('class', 'remixicon-icon ');
  iconSvg.setAttribute('width', ${JSON.stringify(iconDim)});
  iconSvg.setAttribute('height', ${JSON.stringify(iconDim)});
  iconSvg.setAttribute('fill','currentColor');
  iconSvg.setAttribute('viewBox', ${JSON.stringify(iconViewBox)});

  iconSectPath.setAttribute('d', theme === 'dark' ? ${JSON.stringify(
    darkIconPathSecD
  )} : ${JSON.stringify(lightIconPathSecD)});
  
  iconSvg.appendChild(iconSectPath);

  container.appendChild(iconSvg);
})(theme, themeBtn)`;

const clientBtnThemeCode = `
  ;(() => {
    const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
      ? 'dark'
      : 'light';
    const themeBtn = document.getElementById('themebtn');
    if (themeBtn.firstChild) {
      themeBtn.removeChild(themeBtn.firstChild);
      ${renderThemeIcon};
    } else {
      ${renderThemeIcon};
    }
  })();
`;

function SsrTheme({ ssrTheme }: { ssrTheme: boolean }) {
  return (
    <>
      {ssrTheme ? null : (
        <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />
      )}
    </>
  );
}

function SsrBtnTheme({ ssrTheme }: { ssrTheme: boolean }) {
  return (
    <>
      {ssrTheme ? null : (
        <script dangerouslySetInnerHTML={{ __html: clientBtnThemeCode }} />
      )}
    </>
  );
}

function ThemeProvider({
  children,
  specifiedTheme,
}: {
  children: React.ReactNode;
  specifiedTheme: Theme | null;
}) {
  const [theme, setTheme] = useState<Theme | null>(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme;
      } else {
        return null;
      }
    }
    if (typeof window !== "object") {
      return null;
    }
    return getPreferredTheme();
  });

  const persistTheme = useFetcher();

  const savePersistTheme = useCallbackRef(persistTheme);

  const mountRun = useRef(false);

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }
    if (!theme) {
      return;
    }

    savePersistTheme.current.submit(
      { theme },
      { action: "action/set-theme", method: "post" }
    );
  }, [savePersistTheme, theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

const themes: Array<Theme> = Object.values(Theme);

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

export { isTheme, SsrBtnTheme, SsrTheme, Theme, ThemeProvider, useTheme };
