/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Tipografia obrigatória
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // Paleta de cores do Design System
      colors: {
        accent: {
          DEFAULT: '#48c9ea',
          hover: '#8BE6FF',
          soft: 'rgba(97, 218, 251, 0.25)',
          glow: 'rgba(97, 218, 251, 0.45)',
        },
        
        // Glass morphism
        glass: {
          primary: 'rgba(10, 15, 25, 0.55)',
          secondary: 'rgba(17, 25, 40, 0.60)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        
        // Texto
        text: {
          primary: '#E5E7EB',
          secondary: '#9CA3AF',
          disabled: '#6B7280',
        },
      },
      
      // Backgrounds para glass morphism
      backgroundColor: {
        'glass-primary': 'rgba(10, 15, 25, 0.55)',
        'glass-secondary': 'rgba(17, 25, 40, 0.60)',
      },
      
      // Borders
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.08)',
      },
      
      // Box shadows para glow effects
      boxShadow: {
        'glow-accent': '0 0 20px rgba(97, 218, 251, 0.45)',
        'glow-accent-lg': '0 0 40px rgba(97, 218, 251, 0.45)',
      },
    },
  },
  plugins: [],
}
