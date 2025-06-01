/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,ts,tsx}"],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        PoppinsBold: ["PoppinsBold", "sans-serif"],
        PoppinsMedium: ["PoppinsMedium", "sans-serif"],
        PoppinsSemiBold: ["PoppinsSemiBold", "sans-serif"],
        PoppinsLight: ["PoppinsLight", "sans-serif"],
        PoppinsBlack: ["PoppinsBlack", "sans-serif"],
        AquireBold: ["AquireBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
