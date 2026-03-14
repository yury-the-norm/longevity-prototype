/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:       '#1c1d21',
        surface:  'rgba(255,255,255,0.04)',
        accent:   '#78c8c9',
        accent2:  '#78a0d1',
        critical: '#ff2056',
        warn:     '#e67e22',
        optimal:  '#05df72',
        text:     '#fdfffc',
        muted:    'rgba(253,255,252,0.6)',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
