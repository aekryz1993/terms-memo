/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      rotate: {
        315: "315deg",
      },
      borderWidth: {
        "1/10": "0.1px",
        "2/10": "0.2px",
        "3/10": "0.3px",
      },
    },
    colors: {
      white: "#FFFFFF",
      transparent: "transparent",
      alert: {
        danger_lt: "#ff4444",
        warning_lt: "#ffbb33",
        success_lt: "#00C851",
        info_lt: "#33b5e5",
        // dark mode colors
        danger_dark: "#CC0000",
        warning_dark: "#FF8800",
        success_dark: "#007E33",
        info_dark: "#0099CC",
      },

      bg: {
        sel_lt: "#1A74E4",
        pry_lt: "#F1F2F5",
        sec_lt: "#FFFFFF",
        input_lt: "#f1f2f5",
        pry_hvr_lt: "#E4E5E8",
        sec_hvr_lt: "#F2F2F2",
        // dark mode colors
        sel_dark: "#2374E1",
        pry_dark: "#18191a",
        sec_dark: "#242526",
        input_dark: "#3A3B3C",
        pry_hvr_dark: "#2f3031",
        sec_hvr_dark: "#4E4F50",
      },
      text: {
        inactive_lt: "#65676b",
        active_lt: "#1876f2",
        title_lt: "#1c1e21",
        text_lt: "#050505",
        other_lt: "#65676b",
        tag_lt: "#1876f2",
        // dark mode colors
        inactive_dark: "#b0b3b8",
        active_dark: "#2374e1",
        title_dark: "#e4e6eb",
        text_dark: "#e4e6eb",
        other_dark: "#b0b3b8",
        tag_dark: "#2e89ff",
      },
      btn: {
        bg_lt: "#1B74E4",
        hvr_lt: "#1A6ED7",
        disable_lt: "#E4E6EB",
        cancel_lt: "#D9DADF",
        cancel_hvr_lt: "#BEC3C9",
        // dark mode colors
        bg_dark: "#2374E1",
        hvr_dark: "#3A82E4",
        disable_dark: "#4F5051",
        cancel_dark: "#4B4C4F",
      },
    },
  },
  plugins: [],
};
