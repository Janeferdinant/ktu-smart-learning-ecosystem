import React, { useState } from 'react';
import { speechService } from '../../services/speechNarration';
import { Sparkles, Star, RotateCcw, Volume2, VolumeX, CheckCircle } from 'lucide-react';

interface PatternGardenProps {
  onEarnStar: () => void;
}

const PATTERNS = [
  { sequence: ['🌸', '🌻', '🌸', '🌻'], next: '🌸', choices: ['🌸', '🍎', '🍄'] },
  { sequence: ['🍎', '🍏', '🍎', '🍏'], next: '🍎', choices: ['⭐', '🍎', '🌻'] },
  { sequence: ['🦋', '🐞', '🦋', '🐞'], next: '🦋', choices: ['🦋', '🌸', '🍏'] },
  { sequence: ['⭐', '🌙', '⭐', '🌙'], next: '⭐', choices: ['🍎', '🌙', '⭐'] }
];

export const PatternGarden: React.FC<PatternGardenProps> = ({ onEarnStar }) => {
  const [level, setLevel] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const current = PATTERNS[level % PATTERNS.length];

  const handleChoice = (emoji: string) => {
    if (emoji === current.next) {
      setFeedback('Yay! You found the next pattern item! Super job!');
      speechService.speak('Yay! Super job! You found the pattern!');
      onEarnStar();
      setTimeout(() => {
        setFeedback(null);
        setLevel(prev => (prev + 1) % PATTERNS.length);
      }, 1500);
    } else {
      setFeedback('Oops! Try another one, you can do it!');
      speechService.speak('Oops! Try again, friend!');
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const speakIntro = () => {
    speechService.speak('Welcome to the Pattern Garden! Look at the sequence, and tap the item that comes next!');
  };

  return (
    <div className="glass-panel p-6 sm:p-10 space-y-6 text-center bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-amber-500/10">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
          Game 1: Pattern Garden
        </span>
        <button
          onClick={speakIntro}
          className="glass-button p-2 rounded-xl text-pink-600 hover:scale-105"
          title="Hear Instructions"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <h2 className="text-2xl font-black text-slate-900 dark:text-white">
        What Comes Next in the Garden?
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        Look at the friendly sequence below and tap the matching item!
      </p>

      {/* Garden Sequence Display */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 py-6 bg-white/40 dark:bg-slate-900/40 rounded-3xl border border-pink-200/50 dark:border-pink-900/30">
        {current.sequence.map((item, i) => (
          <div
            key={i}
            className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-3xl sm:text-4xl animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {item}
          </div>
        ))}
        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl border-4 border-dashed border-pink-400 flex items-center justify-center text-3xl text-pink-400 font-bold bg-pink-50/50 dark:bg-pink-950/20">
          ?
        </div>
      </div>

      {/* Interactive Choices */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Tap Your Answer:
        </div>
        <div className="flex justify-center gap-4 sm:gap-6">
          {current.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => handleChoice(choice)}
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl bg-white dark:bg-slate-800 border-2 border-pink-300 dark:border-pink-700 shadow-lg hover:scale-110 active:scale-95 transition-all text-4xl sm:text-5xl flex items-center justify-center hover:border-pink-500"
            >
              {choice}
            </button>
          ))}
        </div>
      </div>

      {/* Friendly Feedback */}
      {feedback && (
        <div className="p-4 rounded-2xl bg-pink-500/20 text-pink-700 dark:text-pink-300 text-sm font-bold animate-in zoom-in-95">
          {feedback}
        </div>
      )}
    </div>
  );
};
