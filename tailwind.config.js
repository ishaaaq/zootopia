/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      spacing: {
        15: "3.75rem",
        25: "6.25rem", // 100px
        30: "7.5rem", // 120px
        35: "8.75rem", // 140px
        40: "10rem", // 160px
        45: "11.25rem", // 180px
        50: "12.5rem", // 200px
        55: "13.75rem", // 220px
        60: "15rem", // 240px
        65: "16.25rem", // 260px
        70: "17.5rem", // 280px
        75: "18.75rem", // 300px
        80: "20rem", // 320px
        85: "21.25rem", // 340px
        90: "22.5rem", // 360px
        95: "23.75rem", // 380px
        100: "25rem", // 400px
      },
    },
  },
  plugins: [],
};
