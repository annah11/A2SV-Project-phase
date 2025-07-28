import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',        // App Router folders
    './components/**/*.{ts,tsx}', // Reusable components
    './pages/**/*.{ts,tsx}',      // Optional, in case you also use Pages Router
  ],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
