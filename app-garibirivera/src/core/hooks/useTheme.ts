"use client";

import { useThemeContext } from "@/core/context/ThemeContext";

export function useTheme() {
  const context = useThemeContext();

  const toggleTheme = () => {
    const newTheme = context.isDarkMode ? "light" : "dark";
    context.setTheme(newTheme);
  };

  return {
    theme: context.theme,
    setTheme: context.setTheme,
    toggleTheme,
    isDarkMode: context.isDarkMode,
    isLightMode: context.isLightMode,
  };
}
