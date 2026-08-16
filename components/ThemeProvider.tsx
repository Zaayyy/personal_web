"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "cyberpunk";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_theme") as Theme | null;
      if (saved && (saved === "dark" || saved === "light" || saved === "cyberpunk")) {
        return saved;
      }
    }
    return "dark";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.remove("dark", "light", "cyberpunk");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio_theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.remove("dark", "light", "cyberpunk");
    document.documentElement.classList.add(newTheme);
  };

  const cycleTheme = (): Theme => {
    const themes: Theme[] = ["dark", "light", "cyberpunk"];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    return nextTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      <div style={{ visibility: mounted ? "visible" : "visible" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
