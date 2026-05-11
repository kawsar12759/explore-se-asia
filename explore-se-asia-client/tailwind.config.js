/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '510px',
      },
      colors: {
        adventure: {
          50: '#fef5f1',
          100: '#fde8dc',
          200: '#fcc9a3',
          300: '#fba86a',
          400: '#f98741',
          500: '#f26c28',
          600: '#d9531e',
          700: '#b53c1a',
          800: '#92301b',
          900: '#7a2818',
        },
        explore: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        }
      },
      backgroundImage: {
        'gradient-adventure': 'linear-gradient(135deg, #f26c28 0%, #d9531e 100%)',
        'gradient-explore': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f26c28 0%, #f89d3c 50%, #fbaf3f 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

