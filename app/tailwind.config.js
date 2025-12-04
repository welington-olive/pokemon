/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        background: '#FFFFFF',
        surface: '#F9FAFB',
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          disabled: '#9CA3AF',
        },
        border: '#E5E7EB',
      },
    },
  },
  plugins: [],
};

