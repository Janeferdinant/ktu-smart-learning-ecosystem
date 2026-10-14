import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Square, Globe, Sparkles, MessageSquare, BookOpen, Layers, Award } from 'lucide-react';
import { TierBilingualData } from '../../data/gamingLabBilingualData';

interface AnimatedAcademicAvatarProps {
  data: TierBilingualData;
  activeLanguage: 'en' | 'ml';
  onLanguageChange: (lang: 'en' | 'ml') => void;
  onExploreAlgorithm?: () => void;
  onExploreApplication?: () => void;
}

export const AnimatedAcademicAvatar: React.FC<AnimatedAcademicAvatarProps> = ({
  data,
  activeLanguage,
  onLanguageChange,
  onExploreAlgorithm,
  onExploreApplication
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [activeSubtitle, setActiveSubtitle] = useState<string>('');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentTrack = data[activeLanguage];
  const { avatar } = data;

  useEffect(() => {
    // Reset audio state when tier or language changes
    stopAudio();
    setActiveSubtitle(currentTrack.voiceoverNarrative);
  }, [data.age, activeLanguage]);

  const speakNarrative = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak = currentTrack.voiceoverNarrative;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    utterance.rate = speechRate;
    utterance.pitch = 1.05;

    // Pick appropriate voice
    const voices = window.speechSynthesis.getVoices();
    if (activeLanguage === 'ml') {
      const mlVoice = voices.find(v => v.lang.startsWith('ml') || v.name.toLowerCase().includes('malayalam'));
      const inVoice = voices.find(v => v.lang.includes('IN'));
      if (mlVoice) {
        utterance.voice = mlVoice;
      } else if (inVoice) {
        utterance.voice = inVoice;
      }
    } else {
      const enVoice = voices.find(v => (v.lang.startsWith('en-IN') || v.lang.startsWith('en-US')) && !v.name.includes('Zira'));
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pauseAudio = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-indigo-500/30 p-6 shadow-xl backdrop-blur-md">
      
      {/* Decorative Aura Background */}
      <div 
        className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-20 transition-all duration-500"
        style={{ background: isPlaying ? avatar.avatarColor : '#6366f1' }}
      />

      <div className="flex flex-col lg:flex-row items-center gap-6 relative z-10">
        
        {/* Animated Avatar Canvas / SVG Representation */}
        <div className="flex flex-col items-center text-center space-y-2 flex-shrink-0">
          <div className="relative group">
            
            {/* Outer Glowing Pulsing Rings */}
            <div 
              className={`absolute -inset-2 rounded-full transition-all duration-700 ${
                isPlaying 
                  ? 'animate-pulse opacity-80 blur-md' 
                  : 'opacity-20 blur-sm'
              }`}
              style={{ background: `radial-gradient(circle, ${avatar.avatarColor}, transparent 70%)` }}
            />

            {/* Avatar Circle Container */}
            <div 
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-950 border-2 overflow-hidden flex items-center justify-center shadow-2xl transition-all duration-300"
              style={{ borderColor: isPlaying ? avatar.avatarColor : 'rgba(99, 102, 241, 0.4)' }}
            >
              
              {/* Animated SVG Face & Expression */}
              <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                
                {/* Futuristic Gradient Head Backdrop */}
                <defs>
                  <linearGradient id="avatarGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e1b4b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor={avatar.avatarColor} />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>

                {/* Head Base */}
                <circle cx="50" cy="50" r="42" fill="url(#avatarGlow)" stroke={avatar.avatarColor} strokeWidth="1.5" />

                {/* Academic Scholar Hat / Cap Accent */}
                <path d="M 24 34 L 50 22 L 76 34 L 50 42 Z" fill="#4338ca" opacity="0.8" />
                <path d="M 50 42 L 50 48" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                <circle cx="50" cy="49" r="2.5" fill="#f59e0b" />

                {/* Smart Cyber Visor / Academic Glasses */}
                <rect x="25" y="44" width="50" height="13" rx="6" fill="url(#visorGrad)" opacity="0.9" />
                <line x1="30" y1="50" x2="45" y2="50" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <line x1="55" y1="50" x2="70" y2="50" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

                {/* Animated Eyes Behind Visor */}
                <circle cx="38" cy="50" r="2.5" fill="#ffffff" className={isPlaying ? 'animate-ping' : ''} />
                <circle cx="62" cy="50" r="2.5" fill="#ffffff" className={isPlaying ? 'animate-ping' : ''} />

                {/* Dynamic Lip-Sync Mouth */}
                {isPlaying ? (
                  <path
                    d="M 40 68 Q 50 78 60 68 Q 50 64 40 68 Z"
                    fill={avatar.avatarColor}
                    className="animate-pulse"
                  />
                ) : (
                  <path
                    d="M 42 69 Q 50 74 58 69"
                    stroke={avatar.avatarColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}

                {/* Microphone Sensor Node */}
                <circle cx="72" cy="68" r="3" fill="#f43f5e" className={isPlaying ? 'animate-bounce' : ''} />
              </svg>

              {/* Real-time Audio Wave Equalizer Overlay when Speaking */}
              {isPlaying && (
                <div className="absolute bottom-2 flex items-end gap-1 h-5 px-3 py-0.5 bg-black/60 rounded-full backdrop-blur-sm">
                  <div className="w-1 bg-cyan-400 rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 bg-emerald-400 rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 bg-purple-400 rounded-full animate-bounce h-5" style={{ animationDelay: '75ms' }} />
                  <div className="w-1 bg-amber-400 rounded-full animate-bounce h-3" style={{ animationDelay: '200ms' }} />
                </div>
              )}
            </div>

            {/* Online Status Dot */}
            <span 
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-lg"
              style={{ background: isPlaying ? '#10b981' : '#64748b' }}
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-white ${isPlaying ? 'animate-ping' : ''}`} />
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white tracking-wide block">{avatar.name}</span>
            <span className="text-[10px] font-mono text-cyan-400 block">{avatar.role}</span>
          </div>
        </div>

        {/* Speech Bubble, Narration Transcript & Interactive Audio Controls */}
        <div className="flex-1 space-y-4">
          
          {/* Top Bar with Language Toggle & Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-500/20">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{avatar.focusTopic}</span>
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                {isPlaying ? (activeLanguage === 'en' ? '• Speaking Voiceover' : '• സംസാരിക്കുന്നു') : '• Ready to Explain'}
              </span>
            </div>

            {/* Bilingual Switcher Buttons */}
            <div className="inline-flex p-1 bg-slate-950/80 rounded-xl border border-slate-800">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeLanguage === 'en'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>English (EN)</span>
              </button>
              <button
                onClick={() => onLanguageChange('ml')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeLanguage === 'ml'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>മലയാളം (ML)</span>
              </button>
            </div>
          </div>

          {/* Interactive Speech Bubble */}
          <div className="relative p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 shadow-inner space-y-2">
            <div className="flex items-start gap-2.5">
              <MessageSquare className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {currentTrack.voiceoverNarrative}
              </p>
            </div>
          </div>

          {/* Audio Playback Controls & Quick Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            
            {/* Audio Action Buttons */}
            <div className="flex items-center gap-2">
              {!isPlaying ? (
                <button
                  onClick={speakNarrative}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all scale-100 hover:scale-102"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{activeLanguage === 'en' ? 'Play Voiceover' : 'വിവരണം കേൾക്കുക (Play)'}</span>
                </button>
              ) : (
                <button
                  onClick={pauseAudio}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 flex items-center gap-2 transition-all"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>{activeLanguage === 'en' ? 'Pause' : 'താല്ക്കാലികമായി നിർത്തുക'}</span>
                </button>
              )}

              {(isPlaying || isPaused) && (
                <button
                  onClick={stopAudio}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-all"
                  title="Stop Audio"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop</span>
                </button>
              )}

              {/* Speed Rate Toggle */}
              <button
                onClick={() => setSpeechRate(prev => (prev === 1.0 ? 1.25 : 1.0))}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white"
                title="Playback Speed"
              >
                {speechRate}x Speed
              </button>
            </div>

            {/* Quick Curriculum Exploration Action Links */}
            <div className="flex items-center gap-2">
              {onExploreAlgorithm && (
                <button
                  onClick={onExploreAlgorithm}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{activeLanguage === 'en' ? 'Algorithm Steps' : 'അൽഗോരിതം ഘട്ടങ്ങൾ'}</span>
                </button>
              )}

              {onExploreApplication && (
                <button
                  onClick={onExploreApplication}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 transition-all"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{activeLanguage === 'en' ? 'Real-World Apps' : 'പ്രായോഗിക ഉപയോഗങ്ങൾ'}</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
