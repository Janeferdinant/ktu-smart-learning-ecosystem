import React, { useState } from 'react';
import { speechService } from '../../services/speechNarration';
import { Sparkles, RotateCcw, Volume2, Star } from 'lucide-react';

interface MemoryMatchProps {
  onEarnStar: () => void;
}

interface Card {
  id: number;
  emoji: string;
  name: string;
}

const INITIAL_PAIRS = [
  { emoji: '💻', name: 'Computer' },
  { emoji: '🖱️', name: 'Mouse' },
  { emoji: '⌨️', name: 'Keyboard' },
  { emoji: '🤖', name: 'Robot' }
];

export const MemoryMatch: React.FC<MemoryMatchProps> = ({ onEarnStar }) => {
  const [cards, setCards] = useState<Card[]>(() => {
    const list = [...INITIAL_PAIRS, ...INITIAL_PAIRS].map((item, idx) => ({
      id: idx,
      emoji: item.emoji,
      name: item.name
    }));
    return list.sort(() => Math.random() - 0.5);
  });

  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);

  const handleCardClick = (card: Card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.name)) return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);
    speechService.speak(card.name);

    if (newFlipped.length === 2) {
      const card1 = cards.find(c => c.id === newFlipped[0])!;
      const card2 = cards.find(c => c.id === newFlipped[1])!;

      if (card1.name === card2.name) {
        setMatched(prev => [...prev, card1.name]);
        speechService.speak(`Match found! Two ${card1.name}s!`);
        onEarnStar();
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const resetGame = () => {
    setMatched([]);
    setFlipped([]);
    const list = [...INITIAL_PAIRS, ...INITIAL_PAIRS].map((item, idx) => ({
      id: idx,
      emoji: item.emoji,
      name: item.name
    }));
    setCards(list.sort(() => Math.random() - 0.5));
  };

  const isAllMatched = matched.length === INITIAL_PAIRS.length;

  return (
    <div className="glass-panel p-6 sm:p-10 space-y-6 text-center bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-amber-500/10">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          Game 4: Memory Match
        </span>
        <button
          onClick={() => speechService.speak('Flip the cards and find the matching pairs of computer friends!')}
          className="glass-button p-2 rounded-xl text-purple-600 hover:scale-105"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <h2 className="text-2xl font-black text-slate-900 dark:text-white">
        Find the Matching Friends!
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        Flip cards to reveal friendly computer components and find pairs!
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto py-4">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.name);
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`h-20 sm:h-24 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl transition-all shadow-md ${
                isFlipped
                  ? 'bg-white dark:bg-slate-800 border-2 border-purple-400 scale-102'
                  : 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white/50 border border-purple-400/40 hover:scale-105 active:scale-95'
              }`}
            >
              {isFlipped ? card.emoji : '❓'}
            </button>
          );
        })}
      </div>

      {isAllMatched && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-sm font-bold animate-in zoom-in-95">
          🎉 Incredible memory! You matched all the computer friends!
        </div>
      )}

      <div>
        <button
          onClick={resetGame}
          className="glass-button px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Shuffle & Play Again</span>
        </button>
      </div>
    </div>
  );
};
