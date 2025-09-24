/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "#2563EB" }, ink: "#111111", mute: "#6B7280" },
      borderRadius: { xl2: "1rem" }
    }
  },
  plugins: []
};
