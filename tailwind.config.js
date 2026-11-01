/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      screens: {
        md: "861px",
      },
      fontFamily: {
        display: ["Nunito", "ui-rounded", "Segoe UI", "system-ui", "sans-serif"],
        body: ["Lato", "Segoe UI", "system-ui", "sans-serif"],
        sans: ["Lato", "Segoe UI", "system-ui", "sans-serif"],
      },
      // As cores da interface vêm de variáveis CSS, que trocam com o tema (src/index.css).
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        mute: "var(--mute)",
        line: "var(--line)",
        gold: {
          DEFAULT: "var(--gold)",
          hover: "var(--gold-hover)",
          ink: "var(--gold-ink)",
          soft: "var(--gold-soft)",
        },
        vtex: { DEFAULT: "#F71963", ink: "var(--vtex-ink)" },
        wake: { DEFAULT: "#C505F2", ink: "var(--wake-ink)" },
        wp: { DEFAULT: "#21759B", ink: "var(--wp-ink)" },
        danger: "var(--danger)",
      },
      maxWidth: {
        wrap: "none",
      },
      padding: {
        gl: "var(--gl)",
        gr: "var(--gr)",
      },
    },
  },
  plugins: [],
};
