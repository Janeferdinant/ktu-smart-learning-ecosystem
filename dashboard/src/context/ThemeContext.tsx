import React, { createContext, useContext, useEffect, useState } from 'react';
import { GlassTheme, AppearanceMode } from '../types/theme';

interface ThemeContextType {
  glassTheme: GlassTheme;
  appearanceMode: AppearanceMode;
  setGlassTheme: (theme: GlassTheme) => void;
  setAppearanceMode: (mode: AppearanceMode) => void;
  toggleAppearanceMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [glassTheme, setGlassThemeState] = useState<GlassTheme>(() => {
    const saved = localStorage.getItem('ktu_glass_theme');
    return (saved as GlassTheme) || 'light-liquid';
  });

  const [appearanceMode, setAppearanceModeState] = useState<AppearanceMode>(() => {
    const saved = localStorage.getItem('ktu_appearance_mode');
    return (saved as AppearanceMode) || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', glassTheme);
    root.setAttribute('data-appearance', appearanceMode);
    document.body.setAttribute('data-theme', glassTheme);
    document.body.setAttribute('data-appearance', appearanceMode);

    if (appearanceMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('ktu_glass_theme', glassTheme);
    localStorage.setItem('ktu_appearance_mode', appearanceMode);
  }, [glassTheme, appearanceMode]);

  const setGlassTheme = (theme: GlassTheme) => {
    setGlassThemeState(theme);
  };

  const setAppearanceMode = (mode: AppearanceMode) => {
    setAppearanceModeState(mode);
  };

  const toggleAppearanceMode = () => {
    setAppearanceModeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        glassTheme,
        appearanceMode,
        setGlassTheme,
        setAppearanceMode,
        toggleAppearanceMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
