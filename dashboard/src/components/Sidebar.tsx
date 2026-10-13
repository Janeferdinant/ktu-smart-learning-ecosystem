import React from 'react';
import {
  BookOpen,
  Layers,
  FileText,
  Presentation,
  HelpCircle,
  CheckCircle2,
  BrainCircuit,
  Network,
  Baby,
  Cpu,
  FileCheck,
  Briefcase,
  TrendingUp,
  CalendarDays,
  UserCheck,
  Compass
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  category: 'core' | 'assessment' | 'interactive' | 'career-faculty';
}

export const NAV_ITEMS: NavItem[] = [
  // Core Academic
  { id: 'subjects', label: '1. My Subjects', icon: BookOpen, category: 'core' },
  { id: 'regulations', label: '2. Semester & Regulations', icon: Compass, category: 'core' },
  { id: 'modules', label: '3. Module-wise Learning', icon: Layers, category: 'core' },
  { id: 'notes', label: '4. Notes & Study Materials', icon: FileText, category: 'core' },
  { id: 'slides', label: '5. Downloadable Slides', icon: Presentation, badge: 'Light PPTX', category: 'core' },
  { id: 'pyq', label: '6. Previous-Year Papers', icon: HelpCircle, badge: '12 PYQs', category: 'core' },
  { id: 'answer-keys', label: '7. Answer Keys & Schemes', icon: CheckCircle2, badge: 'Official', category: 'core' },

  // Interactive & Assessment
  { id: 'quizzes', label: '8. Quiz & Assessment', icon: BrainCircuit, badge: 'Adaptive', category: 'assessment' },
  { id: 'knowledge-graph', label: '9. Knowledge Graph', icon: Network, category: 'interactive' },
  { id: 'games', label: '10. Early Learning Games', icon: Baby, badge: 'Age 5', category: 'interactive' },
  { id: 'simulations', label: '11. Virtual Lab & 3D Demos', icon: Cpu, badge: 'Three.js', category: 'interactive' },

  // Research, Career & Faculty
  { id: 'research', label: '12. Research Explorer', icon: FileCheck, badge: 'IEEE', category: 'career-faculty' },
  { id: 'industry', label: '13. Industry Applications', icon: Briefcase, category: 'career-faculty' },
  { id: 'careers', label: '14. Job & Salary Explorer', icon: TrendingUp, category: 'career-faculty' },
  { id: 'teaching-plans', label: '15. 46-Hour Teaching Plans', icon: CalendarDays, badge: '46h Validated', category: 'career-faculty' },
  { id: 'faculty', label: '16. Faculty Management', icon: UserCheck, category: 'career-faculty' }
];

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  isOpen = false,
  onClose
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-[69px] z-50 lg:z-10 h-screen lg:h-[calc(100vh-69px)] w-72 glass-panel !rounded-none !border-y-0 !border-l-0 p-4 overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Section Categories */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
              Academic Curricula
            </div>
            <div className="space-y-1">
              {NAV_ITEMS.filter(item => item.category === 'core').map(item => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (onClose) onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
              Assessments & Interactive
            </div>
            <div className="space-y-1">
              {NAV_ITEMS.filter(item => item.category === 'assessment' || item.category === 'interactive').map(item => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (onClose) onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.id === 'games'
                            ? 'bg-pink-500/15 text-pink-600 dark:text-pink-400'
                            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
              Research, Career & Faculty
            </div>
            <div className="space-y-1">
              {NAV_ITEMS.filter(item => item.category === 'career-faculty').map(item => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (onClose) onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
