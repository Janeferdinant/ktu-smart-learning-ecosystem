import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { GLASS_THEMES, GlassTheme } from '../types/theme';
import { Sparkles, Sun, Moon, Check, Palette } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { glassTheme, appearanceMode, setGlassTheme, toggleAppearanceMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const activeTheme = GLASS_THEMES.find(t => t.id === glassTheme) || GLASS_THEMES[0];

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleAppearanceMode}
          className="glass-button p-2.5 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all hover:scale-105 active:scale-95"
          title={`Switch to ${appearanceMode === 'light' ? 'Dark' : 'Light'} Mode`}
          aria-label="Toggle light or dark appearance mode"
        >
          {appearanceMode === 'light' ? (
            <Moon className="w-4 h-4 text-indigo-600" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        {/* Theme Picker Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-button px-3.5 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 active:scale-95"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <Palette className="w-4 h-4 text-blue-500" />
          <span className="hidden sm:inline font-medium">{activeTheme.name}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">
            {activeTheme.badge}
          </span>
        </button>
      </div>

      {/* Dropdown Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel p-4 z-50 animate-in fade-in zoom-in-95 duration-150 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Select Liquid Glass Style</h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">10 Styles</span>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-1">
              {GLASS_THEMES.map((theme) => {
                const isSelected = theme.id === glassTheme;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setGlassTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`text-left p-2.5 rounded-xl transition-all border flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/15 shadow-md shadow-blue-500/10'
                        : 'border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${theme.previewColor} border border-white/60 dark:border-white/20 shadow-xs`} />
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-500 font-bold" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">{theme.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {theme.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Appearance Mode:</span>
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-200/50 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/50">
                <button
                  onClick={() => toggleAppearanceMode()}
                  className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${appearanceMode === 'light' ? 'bg-white dark:bg-slate-700 shadow-xs text-blue-600' : 'text-slate-500'}`}
                >
                  Light
                </button>
                <button
                  onClick={() => toggleAppearanceMode()}
                  className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${appearanceMode === 'dark' ? 'bg-white dark:bg-slate-700 shadow-xs text-blue-400' : 'text-slate-500'}`}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
