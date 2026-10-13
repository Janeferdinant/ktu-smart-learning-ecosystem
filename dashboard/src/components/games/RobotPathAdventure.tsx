import React, { useState } from 'react';
import { speechService } from '../../services/speechNarration';
import { Bot, ArrowRight, ArrowDown, RotateCcw, Volume2, Star, CheckCircle } from 'lucide-react';

interface RobotPathAdventureProps {
  onEarnStar: () => void;
}

export const RobotPathAdventure: React.FC<RobotPathAdventureProps> = ({ onEarnStar }) => {
  const [robotPos, setRobotPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isWon, setIsWon] = useState<boolean>(false);

  const target = { x: 3, y: 3 };

  const moveRight = () => {
    if (isWon) return;
    if (robotPos.x < 3) {
      const nextX = robotPos.x + 1;
      setRobotPos(prev => ({ ...prev, x: nextX }));
      speechService.speak('Stepping right!');
      checkWin(nextX, robotPos.y);
    }
  };

  const moveDown = () => {
    if (isWon) return;
    if (robotPos.y < 3) {
      const nextY = robotPos.y + 1;
      setRobotPos(prev => ({ ...prev, y: nextY }));
      speechService.speak('Stepping down!');
      checkWin(robotPos.x, nextY);
    }
  };

  const checkWin = (x: number, y: number) => {
    if (x === target.x && y === target.y) {
      setIsWon(true);
      speechService.speak('Hooray! Robo reached the energy star! You are a brilliant coder!');
      onEarnStar();
    }
  };

  const reset = () => {
    setRobotPos({ x: 0, y: 0 });
    setIsWon(false);
  };

  return (
    <div className="glass-panel p-6 sm:p-10 space-y-6 text-center bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-indigo-500/10">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
          Game 2: Robot Path Adventure
        </span>
        <button
          onClick={() => speechService.speak('Guide our friendly robot to the golden star using the move buttons!')}
          className="glass-button p-2 rounded-xl text-cyan-600 hover:scale-105"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <h2 className="text-2xl font-black text-slate-900 dark:text-white">
        Help Robo Find the Star!
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        Tap the direction buttons to guide Robo step-by-step through the maze!
      </p>

      {/* 4x4 Grid Maze */}
      <div className="flex justify-center py-4">
        <div className="grid grid-cols-4 gap-2.5 p-4 rounded-3xl bg-white/50 dark:bg-slate-900/50 border-2 border-cyan-300/40 shadow-inner">
          {Array.from({ length: 16 }).map((_, idx) => {
            const x = idx % 4;
            const y = Math.floor(idx / 4);
            const isRobotHere = robotPos.x === x && robotPos.y === y;
            const isTargetHere = target.x === x && target.y === y;

            return (
              <div
                key={idx}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all ${
                  isRobotHere
                    ? 'bg-blue-600 text-white shadow-lg scale-105 animate-pulse'
                    : isTargetHere
                    ? 'bg-amber-400 text-white shadow-md animate-bounce'
                    : 'bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50'
                }`}
              >
                {isRobotHere ? '🤖' : isTargetHere ? '⭐' : ''}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 pt-2">
        <button
          onClick={moveRight}
          disabled={robotPos.x >= 3 || isWon}
          className="px-6 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all active:scale-95 disabled:opacity-40"
        >
          <span>Step Right</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={moveDown}
          disabled={robotPos.y >= 3 || isWon}
          className="px-6 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all active:scale-95 disabled:opacity-40"
        >
          <span>Step Down</span>
          <ArrowDown className="w-5 h-5" />
        </button>

        <button
          onClick={reset}
          className="p-4 rounded-2xl glass-button text-slate-500 hover:text-slate-800"
          title="Start Over"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {isWon && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-sm animate-in zoom-in-95">
          🎉 Spectacular! You guided Robo safely home! Star unlocked!
        </div>
      )}
    </div>
  );
};
