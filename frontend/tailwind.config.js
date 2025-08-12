/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      "main-bg": "#0b141a",
      primary: "#00a884",
      "light-gray-1": "#e9edef",
      "light-gray-2": "#f0f2f5",
      "text-primary": "#111b21",
      "text-secondary": "#54656f",
      "text-tertiary": "#667781",
      "text-dark-gray": "#41525d",
      "chat-bg": "#e5ddd5",
      "bubble-sent-bg": "#d9fdd3",
      "accent-green": "#43c960",
      "filter-active-bg": "#e0f0ff",
      "link-blue": "#027eb5",
      "whatsapp-green": "#00a884",
      "whatsapp-dark": "#111b21",
      "whatsapp-light": "#ffffff",
      "whatsapp-gray": "#667781",
      "whatsapp-light-gray": "#f0f2f5",
      "whatsapp-border": "#e9edef",
      "whatsapp-hover": "#f5f6f6",
      "whatsapp-active": "#e0f0ff",
    },
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
    },
    boxShadow: {
      custom: "0 6px 18px rgba(11, 20, 26, 0.15)",
      bubble: "0 1px 1px rgba(0, 0, 0, 0.05)",
      "whatsapp-header": "0 1px 0 0 rgba(0, 0, 0, 0.1)",
      "whatsapp-input": "0 1px 0 0 rgba(0, 0, 0, 0.1)",
      "whatsapp-message": "0 1px 0.5px rgba(0, 0, 0, 0.13)",
    },
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
};
export const plugins = [];
