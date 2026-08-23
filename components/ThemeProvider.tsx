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
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_theme") as Theme | null;
      if (saved && (saved === "dark" || saved === "light" || saved === "cyberpunk")) {
        setThemeState(saved);
        document.documentElement.setAttribute("data-theme", saved);
        document.documentElement.classList.remove("dark", "light", "cyberpunk");
        document.documentElement.classList.add(saved);
      }
    } catch {
      // Ignore localStorage error
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("portfolio_theme", newTheme);
    } catch {
      // Ignore localStorage error
    }
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
      {children}
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
