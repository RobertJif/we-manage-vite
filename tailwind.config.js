/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  screens: {
    mobile: "630px",
    tablet: "1024px",
    desktop: "1280px",

    // 0 - 744 = mobile
    // 744 - 1280 = tablet
    // 1280 - xxx = desktop

    // 0 - 430 = default
    // 430 - 744 = mobile
    // 744 - 1280 = tablet
    // 1280 - xxx = desktop
  },

  fontSize: {
    "4xl": "38px",
    "3xl": "32px",
    "2xl": "28px",
    xl: "24px",
    lg: "18px",
    base: "16px",
    sm: "14px",
    xs: "11px",
  },
  theme: {
    colors: {
      "primary-100": "var(--color-primary-100)",
      "secondary-100": "var(--color-secondary-100)",
      "success-100": "var(--color-success-100)",
      "error-100": "var(--color-error-100)",
      "white-100": "var(--color-white-100)",
      "white-200": "var(--color-white-200)",
      "white-300": "var(--color-white-300)",
    },
    extend: {},
  },
  plugins: [],
};
