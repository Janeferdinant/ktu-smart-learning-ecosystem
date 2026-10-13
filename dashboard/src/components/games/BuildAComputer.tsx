import React, { useState } from 'react';
import { speechService } from '../../services/speechNarration';
import { Sparkles, RotateCcw, Volume2, CheckCircle2, Star } from 'lucide-react';

interface BuildAComputerProps {
  onEarnStar: () => void;
}

const PARTS = [
  { id: 'screen', name: 'Monitor Screen', emoji: '🖥️', role: 'Shows pictures and games!' },
  { id: 'cpu', name: 'Computer Brain (CPU)', emoji: '🧠', role: 'Does all the thinking!' },
  { id: 'keyboard', name: 'Typing Keyboard', emoji: '⌨️', role: 'Types words and letters!' },
  { id: 'mouse', name: 'Clicky Mouse', emoji: '🖱️', role: 'Points and clicks things!' }
];

export const BuildAComputer: React.FC<BuildAComputerProps> = ({ onEarnStar }) => {
  const [assembled, setAssembled] = useState<string[]>([]);

  const handleAddPart = (id: string, name: string) => {
    if (assembled.includes(id)) return;
    const updated = [...assembled, id];
    setAssembled(updated);
    speechService.speak(`Added the ${name}!`);

    if (updated.length === PARTS.length) {
      speechService.speak('Beep boop! The computer is fully built and powered on! Amazing engineering!');
      onEarnStar();
    }
  };

  const reset = () => {
    setAssembled([]);
  };

  const isComplete = assembled.length === PARTS.length;

  return (
    <div className="glass-panel p-6 sm:p-10 space-y-6 text-center bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-cyan-500/10">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Game 5: Build-a-Computer
        </span>
        <button
          onClick={() => speechService.speak('Tap each computer part to build your own computer!')}
          className="glass-button p-2 rounded-xl text-blue-600 hover:scale-105"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <h2 className="text-2xl font-black text-slate-900 dark:text-white">
        Build Your Very Own Computer!
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        Tap the parts below to place them on the study desk!
      </p>

      {/* Assembly Desk */}
      <div className="p-6 rounded-3xl bg-white/60 dark:bg-slate-900/60 border-2 border-blue-300/40 shadow-inner max-w-lg mx-auto min-h-48 flex items-center justify-center gap-4 flex-wrap">
        {PARTS.map((part) => {
          const isPlaced = assembled.includes(part.id);
          return (
            <div
              key={part.id}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                isPlaced
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105'
                  : 'border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50 text-slate-400'
              }`}
            >
              <span className="text-3xl sm:text-4xl">{isPlaced ? part.emoji : '❓'}</span>
              <span className="text-[10px] font-bold mt-1 line-clamp-1">{part.name}</span>
            </div>
          );
        })}
      </div>

      {/* Toolbox Parts to Tap */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Available Parts in Toolbox:
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {PARTS.map((part) => {
            const isUsed = assembled.includes(part.id);
            return (
              <button
                key={part.id}
                disabled={isUsed}
                onClick={() => handleAddPart(part.id, part.name)}
                className={`px-4 py-3 rounded-2xl border flex items-center gap-2.5 font-bold text-xs transition-all ${
                  isUsed
                    ? 'opacity-40 border-slate-300 bg-slate-100 dark:bg-slate-800 text-slate-400'
                    : 'glass-card border-blue-400 hover:scale-105 active:scale-95 text-slate-800 dark:text-white'
                }`}
              >
                <span className="text-2xl">{part.emoji}</span>
                <span>{part.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isComplete && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-sm font-bold animate-in zoom-in-95">
          ✨ Power On! Your computer is running and ready for fun!
        </div>
      )}

      <div>
        <button
          onClick={reset}
          className="glass-button px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Desk</span>
        </button>
      </div>
    </div>
  );
};
