/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: "#FFFFFF",
      bg: {
        pry_lt: "#F1F2F5",
        sec_lt: "#FFFFFF",
        input_lt: "#f1f2f5",
        pry_hvr_lt: "#E4E5E8",
        sec_hvr_lt: "#F2F2F2",
        sel_lt: "#1A74E4",
        // dark mode colors
        pry_dark: "#18191a",
        sec_dark: "#242526",
        input_dark: "#3A3B3C",
        pry_hvr_dark: "#2f3031",
        sec_hvr_dark: "#4E4F50",
        sel_dark: "#2374E1",
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
