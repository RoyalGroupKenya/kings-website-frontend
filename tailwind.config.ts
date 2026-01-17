import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1B2338", // Navy as primary
          foreground: "#F4F1EC",
          50: "#F8F9FA",
          100: "#E9ECEF",
          200: "#DEE2E6",
          300: "#CED4DA",
          400: "#6C757D",
          500: "#495057",
          600: "#343A40",
          700: "#212529",
          800: "#1B2338",
          900: "#0D1117",
        },
        secondary: {
          DEFAULT: "#AE844C", // Gold as secondary
          foreground: "#1B2338",
          50: "#FAF8F5",
          100: "#F4F1EC",
          200: "#E8DFD1",
          300: "#DCCCB6",
          400: "#C5A87F",
          500: "#AE844C",
          600: "#9D7744",
          700: "#68502D",
          800: "#4E3C22",
          900: "#342817",
        },
        navy: {
          DEFAULT: "#1B2338",
          50: "#F8F9FA",
          100: "#E9ECEF",
          200: "#DEE2E6",
          300: "#CED4DA",
          400: "#6C757D",
          500: "#495057",
          600: "#343A40",
          700: "#212529",
          800: "#1B2338",
          900: "#0D1117",
        },
        gold: {
          DEFAULT: "#AE844C",
          50: "#FAF8F5",
          100: "#F4F1EC",
          200: "#E8DFD1",
          300: "#DCCCB6",
          400: "#C5A87F",
          500: "#AE844C",
          600: "#9D7744",
          700: "#68502D",
          800: "#4E3C22",
          900: "#342817",
        },
        ivory: {
          DEFAULT: "#F4F1EC",
          50: "#FEFEFE",
          100: "#F4F1EC",
          200: "#EAE4D9",
          300: "#E0D7C6",
          400: "#CCBDA0",
          500: "#B8A37A",
          600: "#A6936E",
          700: "#6F6249",
          800: "#534937",
          900: "#383125",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "luxury-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(174, 132, 76, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(174, 132, 76, 0.6)" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
        "slide-in-left": "slide-in-left 0.8s ease-out",
        "slide-in-right": "slide-in-right 0.8s ease-out",
        "scale-in": "scale-in 0.8s ease-out",
        float: "float 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "luxury-glow": "luxury-glow 3s ease-in-out infinite",
        "text-shimmer": "text-shimmer 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        shimmer: "linear-gradient(90deg, transparent, rgba(174, 132, 76, 0.1), transparent)",
        "luxury-gradient": "linear-gradient(135deg, #AE844C 0%, #9D7744 50%, #68502D 100%)",
        "text-shimmer": "linear-gradient(90deg, #AE844C, #F4F1EC, #AE844C)",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),require('@tailwindcss/typography')],
} satisfies Config

export default config
