/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    require.resolve("react-widgets/styles.css"),
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "go-to-top": {
          "0%": {},
          "100%": {
            top: 20,
            left: "50%",
            transform: "translateX(-50%) translateY(0)",
            fontSize: "4rem",
          },
        },
        "rotate": {
          "0%": {
            transform: "translate(-150px, 50px) scale(0.4) rotate(0deg)",
            opacity: 1,
            zIndex: 1,
          },
          "45%": {
            transform: "translate(150px, -50px) scale(0.4) rotate(0deg)",
            opacity: 1,
            zIndex: 1,
          },
          "55%": {
            transform: "translate(150px, -50px) scale(0.4) rotate(180deg)",
            opacity: 1,
            zIndex: 3,
          },
          "95%": {
            transform: "translate(-150px, 50px) scale(0.4) rotate(180deg)",
            opacity: 1,
            zIndex: 3,
          },
          "100%": {
            transform: "translate(-150px, 50px) scale(0.4) rotate(0deg)",
            opacity: 1,
            zIndex: 3,
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        bogart: ["var(--font-bogart)"],
        baloo: ["var(--font-baloo)"],
      },
      animation: {
        "fade-in": "fade-in 1s ease-in-out forwards",
        "go-to-top": "go-to-top 1s ease-in-out forwards",
        "rotate": "rotate 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("react-widgets-tailwind"),
    require("tailwindcss-animation-delay"),
  ],
};
