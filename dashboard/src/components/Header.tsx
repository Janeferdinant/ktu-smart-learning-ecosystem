import React from 'react';
import { ThemeSelector } from './ThemeSelector';
import { GraduationCap, Sparkles, Search, Menu, Baby, BookOpen } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  activeSection,
  setActiveSection,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <header className="sticky top-0 z-30 glass-panel !rounded-none !border-x-0 !border-t-0 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu & Branding */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden glass-button p-2 rounded-xl text-slate-700 dark:text-slate-200"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div
          onClick={() => setActiveSection('subjects')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                KTU Smart Learning
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400">
                CSE
              </span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
              APJ Abdul Kalam Technological University
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Global Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, PYQs, algorithms, topics..."
            className="glass-input w-full pl-9 pr-4 py-2 text-sm placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5">
        {/* Early Learning Mode Button */}
        <button
          onClick={() => setActiveSection('games')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeSection === 'games'
              ? 'bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow-md shadow-pink-500/20 scale-105'
              : 'glass-button text-pink-600 dark:text-pink-400 hover:border-pink-400'
          }`}
          title="Switch to Early Learning Mode for 5-Year-Olds"
        >
          <Baby className="w-4 h-4" />
          <span className="hidden sm:inline">Kids Mode (Age 5)</span>
        </button>

        {/* Theme Picker & Light/Dark Mode */}
        <ThemeSelector />
      </div>
    </header>
  );
};
