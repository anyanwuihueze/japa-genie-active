import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        // Add other semantic colors as needed
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        // For animated chat bubbles
        "chat-bubble-in": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        // For floating background flags
        "background-float": {
            "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
            "25%": { transform: "translateY(-15px) rotate(5deg)" },
            "75%": { transform: "translateY(10px) rotate(-5deg)" },
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeInUp: "fadeInUp 0.8s ease-out",
        "chat-bubble-in": "chat-bubble-in 0.5s ease-out forwards",
        "background-float": "background-float 15s ease-in-out infinite",
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;

export default config;
