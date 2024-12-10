const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['src/app/**/*.{js,ts,jsx,tsx,mdx,json}', 'src/components/**/*.{js,ts,jsx,tsx,mdx,json}'],
  safelist: ['sh__line'],
  theme: {
    screens: {
      xs: '390px',
      sm: '435px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      colors: {
        cardactive: 'hsl(var(--cardactive))',
        other: 'hsl(var(--other))',
        precode: 'hsl(var(--precode))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        light: {
          50: '#f5f7f9',
          100: '#f2f4f8',
          200: '#e2e7ee',
          300: '#cad2dd',
          400: '#a4abb6',
          500: '#969ba6',
          600: '#5b6371',
          700: '#363f4e',
          800: '#1f2633',
          900: '#131825',
          950: '#050914'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      animation: {
        reveal: 'reveal 0.7s ease-in-out'
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono]
      },
      keyframes: {
        reveal: {
          '0%': { opacity: 0, filter: 'brightness(1) blur(15px)', scale: '1.0125' },
          '10%': { opacity: 1, filter: 'brightness(1.25) blur(10px)' },
          '100%': { opacity: 1, filter: 'brightness(1) blur(0)', scale: '1' }
        }
      },
      lineHeight: {
        slacker: '1.75'
      },
      gridTemplateRows: {
        'max-1': 'repeat(1, minmax(0, max-content))'
      },
      height: {
        'dynamic-screen': '100dvh'
      },
      minHeight: {
        'dynamic-screen': '100dvh'
      },
      maxHeight: {
        'dynamic-screen': '100dvh'
      }
    }
  },
  plugins: [require('@tailwindcss/container-queries'), require('tailwindcss-animate')],
  future: {
    hoverOnlyWhenSupported: true
  }
}
