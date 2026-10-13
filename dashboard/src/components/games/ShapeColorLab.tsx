import React, { useState } from 'react';
import { speechService } from '../../services/speechNarration';
import { Sparkles, Volume2, Star } from 'lucide-react';

interface ShapeColorLabProps {
  onEarnStar: () => void;
}

const ITEMS_TO_SORT = [
  { name: 'Red Heart', emoji: '❤️', targetColor: 'red' },
  { name: 'Blue Whale', emoji: '🐳', targetColor: 'blue' },
  { name: 'Green Frog', emoji: '🐸', targetColor: 'green' },
  { name: 'Yellow Sun', emoji: '☀️', targetColor: 'yellow' },
  { name: 'Red Apple', emoji: '🍎', targetColor: 'red' },
  { name: 'Blue Diamond', emoji: '💎', targetColor: 'blue' },
  { name: 'Green Leaf', emoji: '🍃', targetColor: 'green' },
  { name: 'Yellow Star', emoji: '⭐', targetColor: 'yellow' }
];

export const ShapeColorLab: React.FC<ShapeColorLabProps> = ({ onEarnStar }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentItem = ITEMS_TO_SORT[currentIndex % ITEMS_TO_SORT.length];

  const handleSort = (color: string) => {
    if (color === currentItem.targetColor) {
      setFeedback(`Wonderful! The ${currentItem.name} matches the ${color} basket!`);
      speechService.speak(`Great job! It goes in the ${color} basket!`);
      onEarnStar();
      setTimeout(() => {
        setFeedback(null);
        setCurrentIndex(prev => (prev + 1) % ITEMS_TO_SORT.length);
      }, 1200);
    } else {
      setFeedback('Oops! That basket is a different color. Try another!');
      speechService.speak('Try another basket, little friend!');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-10 space-y-6 text-center bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Game 3: Shape & Color Lab
        </span>
        <button
          onClick={() => speechService.speak('Sort the friendly items into the basket with the matching color!')}
          className="glass-button p-2 rounded-xl text-emerald-600 hover:scale-105"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <h2 className="text-2xl font-black text-slate-900 dark:text-white">
        Which Basket Does This Belong In?
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        Classify and match the item to its color basket!
      </p>

      {/* Floating Active Item */}
      <div className="py-6 flex justify-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border-4 border-emerald-400 flex items-center justify-center text-6xl animate-pulse">
          {currentItem.emoji}
        </div>
      </div>

      {/* 4 Colored Baskets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
        <button
          onClick={() => handleSort('red')}
          className="p-5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-lg text-sm transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1.5"
        >
          <span className="text-2xl">🧺</span>
          <span>Red Basket</span>
        </button>

        <button
          onClick={() => handleSort('blue')}
          className="p-5 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg text-sm transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1.5"
        >
          <span className="text-2xl">🧺</span>
          <span>Blue Basket</span>
        </button>

        <button
          onClick={() => handleSort('green')}
          className="p-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg text-sm transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1.5"
        >
          <span className="text-2xl">🧺</span>
          <span>Green Basket</span>
        </button>

        <button
          onClick={() => handleSort('yellow')}
          className="p-5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold shadow-lg text-sm transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1.5"
        >
          <span className="text-2xl">🧺</span>
          <span>Yellow Basket</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-xs font-bold animate-in zoom-in-95">
          {feedback}
        </div>
      )}
    </div>
  );
};
