/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        textColor: "rgba(var(--textColor))",
        textColorBanner: "var(--textColorBanner)",
        btnBgColor: "rgba(var(--btnBgColor))",
      },
      height: {
        screenHeight: "var(--screenHeight)",
        fiftyvh: "var(--fiftyvh)",
        fortyvh: "var(--fortyvh)",
        thirtyvh: "var(--thirtyvh)",
      },
      width: {
        eightyvw: "var(--eightyvw)",
      },
      fontFamily: {
        fontFamilyMain: "var(--fontFamilyMain)",
        fontFamilySecondary: "var(--fontFamilySecondary)",
      },
    },
  },

  plugins: [],
};
