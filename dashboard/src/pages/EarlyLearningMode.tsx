import React, { useState } from 'react';
import { speechService } from '../services/speechNarration';
import { PatternGarden } from '../components/games/PatternGarden';
import { RobotPathAdventure } from '../components/games/RobotPathAdventure';
import { ShapeColorLab } from '../components/games/ShapeColorLab';
import { MemoryMatch } from '../components/games/MemoryMatch';
import { BuildAComputer } from '../components/games/BuildAComputer';
import { Baby, Star, Volume2, VolumeX, LogOut, Lock, Award, Heart } from 'lucide-react';

interface EarlyLearningModeProps {
  onExitToEngineering: () => void;
}

export const EarlyLearningMode: React.FC<EarlyLearningModeProps> = ({ onExitToEngineering }) => {
  const [activeGame, setActiveGame] = useState<number>(1);
  const [starCount, setStarCount] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(speechService.getIsMuted());
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  const toggleMute = () => {
    const muted = speechService.toggleMute();
    setIsMuted(muted);
  };

  const earnStar = () => {
    setStarCount(prev => prev + 1);
  };

  const handleExitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple parent math lock: 4 + 5 = 9
    if (pinInput.trim() === '9' || pinInput.trim() === '1234') {
      speechService.stop();
      onExitToEngineering();
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner with Star Garden & Audio Controls */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-amber-500/15 border-pink-400/30">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-3xl shadow-lg shadow-pink-500/20">
            ⭐
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
              <Baby className="w-4 h-4" />
              <span>Early Learning Wonderland • Age 5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
              Friendly Coding & Logic Adventures
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Gentle animations, speech narration, and zero stress learning!
            </p>
          </div>
        </div>

        {/* Stars Counter & Tools */}
        <div className="flex items-center gap-3">
          {/* Star Garden */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-900 dark:text-amber-200 font-extrabold text-sm shadow-sm">
            <span className="text-xl">🌟</span>
            <span>{starCount} Stars Earned</span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleMute}
            className={`p-3 rounded-2xl font-bold transition-all shadow-sm ${
              isMuted ? 'bg-slate-200 dark:bg-slate-700 text-slate-500' : 'bg-pink-500 text-white shadow-pink-500/20'
            }`}
            title={isMuted ? 'Unmute Friendly Narration' : 'Mute Narration'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Exit Parent Gate */}
          <button
            onClick={() => setShowExitModal(true)}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold glass-button flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:border-slate-400"
          >
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Parent / Teacher Exit</span>
          </button>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { id: 1, name: 'Pattern Garden', icon: '🌸', subtitle: 'Sequencing' },
          { id: 2, name: 'Robot Path', icon: '🤖', subtitle: 'Algorithm Steps' },
          { id: 3, name: 'Shape & Color', icon: '🎨', subtitle: 'Classification' },
          { id: 4, name: 'Memory Match', icon: '🃏', subtitle: 'Pairs' },
          { id: 5, name: 'Build a Computer', icon: '🖥️', subtitle: 'Hardware' }
        ].map((g) => {
          const isActive = activeGame === g.id;
          return (
            <button
              key={g.id}
              onClick={() => {
                setActiveGame(g.id);
                speechService.stop();
              }}
              className={`p-4 rounded-3xl text-center transition-all border flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? 'bg-gradient-to-b from-pink-500 to-purple-600 text-white shadow-xl shadow-pink-500/25 border-pink-400 scale-103 font-bold'
                  : 'glass-card text-slate-700 dark:text-slate-300 hover:border-pink-300'
              }`}
            >
              <span className="text-3xl mb-1">{g.icon}</span>
              <span className="text-xs font-extrabold">{g.name}</span>
              <span className={`text-[10px] ${isActive ? 'text-pink-100' : 'text-slate-400'}`}>
                {g.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Game Workspace */}
      <div className="relative">
        {activeGame === 1 && <PatternGarden onEarnStar={earnStar} />}
        {activeGame === 2 && <RobotPathAdventure onEarnStar={earnStar} />}
        {activeGame === 3 && <ShapeColorLab onEarnStar={earnStar} />}
        {activeGame === 4 && <MemoryMatch onEarnStar={earnStar} />}
        {activeGame === 5 && <BuildAComputer onEarnStar={earnStar} />}
      </div>

      {/* Parent Verification Exit Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="glass-panel w-full max-w-sm p-6 sm:p-8 space-y-5 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Parent / Teacher Gate
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Please answer this math question to return to the engineering dashboard:
              </p>
            </div>

            <form onSubmit={handleExitVerification} className="space-y-4">
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white py-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                4 + 5 = ?
              </div>

              <input
                type="text"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter answer here..."
                className="glass-input w-full p-2.5 text-center text-sm font-bold"
                autoFocus
              />

              {pinError && (
                <div className="text-xs text-red-500 font-semibold">
                  Incorrect answer. Try again.
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold glass-button"
                >
                  Stay in Kids Mode
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                >
                  Confirm Exit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
