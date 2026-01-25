import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
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
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 60px -12px hsla(192, 91%, 50%, 0.4)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 80px -8px hsla(192, 91%, 50%, 0.6)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "text-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "blur-in": {
          "0%": { filter: "blur(20px)", opacity: "0" },
          "100%": { filter: "blur(0)", opacity: "1" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shooting-star": {
          "0%": { 
            transform: "translate(0, 0) scale(0)",
            opacity: "0"
          },
          "10%": {
            opacity: "1",
            transform: "translate(0, 0) scale(1)"
          },
          "100%": {
            transform: "translate(-200px, 200px) scale(0)",
            opacity: "0"
          },
        },
        "cosmic-float": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "33%": { transform: "translateY(-20px) translateX(10px)" },
          "66%": { transform: "translateY(10px) translateX(-10px)" },
        },
        "nebula-pulse": {
          "0%, 100%": { 
            opacity: "0.3",
            transform: "scale(1)"
          },
          "50%": { 
            opacity: "0.6",
            transform: "scale(1.1)"
          },
        },
        "constellation-twinkle": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "cosmic-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 60px -12px hsla(192, 91%, 50%, 0.4)",
            filter: "blur(0px)"
          },
          "50%": { 
            boxShadow: "0 0 100px -8px hsla(192, 91%, 50%, 0.7)",
            filter: "blur(2px)"
          },
        },
        "slide-up-reveal": {
          "0%": { 
            opacity: "0",
            transform: "translateY(60px) scale(0.95)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0) scale(1)"
          },
        },
        "scale-fade-in": {
          "0%": { 
            opacity: "0",
            transform: "scale(0.8)"
          },
          "100%": { 
            opacity: "1",
            transform: "scale(1)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "fade-in-down": "fade-in-down 0.8s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "text-reveal": "text-reveal 0.8s ease-out forwards",
        "line-grow": "line-grow 0.6s ease-out forwards",
        "blur-in": "blur-in 0.8s ease-out forwards",
        "marquee": "marquee 60s linear infinite",
        "shooting-star": "shooting-star 2s linear infinite",
        "cosmic-float": "cosmic-float 8s ease-in-out infinite",
        "nebula-pulse": "nebula-pulse 4s ease-in-out infinite",
        "constellation-twinkle": "constellation-twinkle 3s ease-in-out infinite",
        "cosmic-glow": "cosmic-glow 3s ease-in-out infinite",
        "slide-up-reveal": "slide-up-reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-fade-in": "scale-fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      backgroundSize: {
        "300%": "300%",
      },
      // tailwind.config.js
      theme: {
        extend: {
          spacing: {
            '40': '10rem',
          },
        },
      }

    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
