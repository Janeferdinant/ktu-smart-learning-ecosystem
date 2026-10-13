import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../data/quizQuestions';
import { CheckCircle2, XCircle, Clock, AlertCircle, ArrowRight, RotateCcw, Award, Flag, BookOpen } from 'lucide-react';

interface QuizEngineProps {
  questions: QuizQuestion[];
  subjectName: string;
  onFinish?: (score: number, total: number) => void;
  onNavigateNotes?: (moduleId: number) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  questions,
  subjectName,
  onFinish,
  onNavigateNotes
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(questions.length * 90); // 90 seconds per question
  const [negativeMarking, setNegativeMarking] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, timeLeft]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isSubmitted) return;

    if (currentQ.type === 'multi-select') {
      const currentSelected: string[] = selectedAnswers[currentQ.id] || [];
      const updated = currentSelected.includes(option)
        ? currentSelected.filter(o => o !== option)
        : [...currentSelected, option];
      setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: updated }));
    } else {
      setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: option }));
    }
  };

  const toggleFlag = (id: string) => {
    setFlaggedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Score Calculation
  const calculateResults = () => {
    let score = 0;
    let maxPoints = 0;
    const weakTopics: string[] = [];

    questions.forEach(q => {
      maxPoints += q.points;
      const userAns = selectedAnswers[q.id];

      let isCorrect = false;
      if (q.type === 'multi-select') {
        const correctArr = (q.correctAnswer as string[]).sort();
        const userArr = (userAns as string[] || []).sort();
        isCorrect = JSON.stringify(correctArr) === JSON.stringify(userArr);
      } else {
        isCorrect = userAns === q.correctAnswer;
      }

      if (isCorrect) {
        score += q.points;
      } else if (userAns !== undefined && negativeMarking) {
        score -= q.points * 0.25;
      } else if (!isCorrect) {
        weakTopics.push(q.topicRef);
      }
    });

    return {
      score: Math.max(0, Math.round(score * 10) / 10),
      maxPoints,
      percentage: Math.round((Math.max(0, score) / maxPoints) * 100),
      weakTopics: Array.from(new Set(weakTopics))
    };
  };

  const results = isSubmitted ? calculateResults() : null;

  const restartQuiz = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setTimeLeft(questions.length * 90);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isSubmitted && results) {
    return (
      <div className="glass-panel p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/25">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Assessment Results Summary
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Course: {subjectName} | Standard KTU Assessment Matrix
          </p>
        </div>

        {/* Score Ring / Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="glass-card p-5">
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
              {results.score} / {results.maxPoints}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Total Points Scored</div>
          </div>

          <div className="glass-card p-5">
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {results.percentage}%
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Accuracy Rating</div>
          </div>

          <div className="glass-card p-5">
            <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {Object.keys(selectedAnswers).length} / {questions.length}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Questions Attempted</div>
          </div>
        </div>

        {/* Weak Topic Diagnostic */}
        {results.weakTopics.length > 0 && (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <AlertCircle className="w-4 h-4" />
              <span>Recommended Study Focus Areas:</span>
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 pl-4 list-disc">
              {results.weakTopics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Question Review List */}
        <div className="space-y-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Question-by-Question Solution Review:
          </h3>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              let isCorrect = false;
              if (q.type === 'multi-select') {
                const correctArr = (q.correctAnswer as string[]).sort();
                const userArr = (userAns as string[] || []).sort();
                isCorrect = JSON.stringify(correctArr) === JSON.stringify(userArr);
              } else {
                isCorrect = userAns === q.correctAnswer;
              }

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isCorrect
                      ? 'bg-emerald-500/5 border-emerald-500/30'
                      : 'bg-red-500/5 border-red-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="font-mono text-slate-500">Q{idx + 1}.</span>
                      <span className="text-slate-900 dark:text-white">{q.question}</span>
                    </div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>+{q.points}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 shrink-0">
                        <XCircle className="w-4 h-4" />
                        <span>0</span>
                      </span>
                    )}
                  </div>

                  {q.codeSnippet && (
                    <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto">
                      {q.codeSnippet}
                    </pre>
                  )}

                  <div className="text-xs space-y-1">
                    <div className="text-slate-500">
                      Your Answer:{' '}
                      <strong className={isCorrect ? 'text-emerald-600' : 'text-red-600'}>
                        {Array.isArray(userAns) ? userAns.join(', ') : userAns || '(Skipped)'}
                      </strong>
                    </div>
                    {!isCorrect && (
                      <div className="text-emerald-700 dark:text-emerald-400">
                        Correct Answer:{' '}
                        <strong>
                          {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}
                        </strong>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50 leading-relaxed">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Explanation: </span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={restartQuiz}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-8 space-y-6">
      {/* Quiz Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
        <div>
          <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            QUESTION {currentIndex + 1} OF {questions.length} • MODULE 0{currentQ.moduleId}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Difficulty: <strong className="capitalize">{currentQ.difficulty}</strong> • {currentQ.points} Points
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Negative Marking Toggle */}
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={negativeMarking}
              onChange={(e) => setNegativeMarking(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Negative Marking (-0.25)</span>
          </label>

          {/* Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 font-mono text-xs font-bold text-slate-700 dark:text-slate-200">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {/* Flag */}
          <button
            onClick={() => toggleFlag(currentQ.id)}
            className={`p-2 rounded-xl text-xs transition-colors ${
              flaggedQuestions[currentQ.id]
                ? 'bg-amber-500 text-white shadow-xs'
                : 'glass-button text-slate-500'
            }`}
            title="Flag question for review"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Text */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Code Snippet if applicable */}
        {currentQ.codeSnippet && (
          <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto border border-slate-700 shadow-inner">
            {currentQ.codeSnippet}
          </pre>
        )}
      </div>

      {/* Options */}
      {currentQ.options && (
        <div className="space-y-2.5">
          {currentQ.options.map((opt, i) => {
            const isSelected =
              currentQ.type === 'multi-select'
                ? (selectedAnswers[currentQ.id] as string[] || []).includes(opt)
                : selectedAnswers[currentQ.id] === opt;

            return (
              <div
                key={i}
                onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-md shadow-blue-500/20'
                    : 'glass-card border-slate-200/50 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/60 dark:bg-slate-800/60 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-xs leading-relaxed">{opt}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Navigator Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
        {questions.map((q, idx) => {
          const isAns = selectedAnswers[q.id] !== undefined;
          const isCurrent = idx === currentIndex;
          const isFlagged = flaggedQuestions[q.id];

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-8 h-8 rounded-xl text-xs font-bold font-mono transition-all relative ${
                isCurrent
                  ? 'ring-2 ring-blue-500 bg-blue-600 text-white'
                  : isAns
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
                  : 'glass-button text-slate-500'
              }`}
            >
              {idx + 1}
              {isFlagged && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-xl text-xs font-semibold glass-button disabled:opacity-40"
        >
          Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-1.5"
          >
            <span>Next Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => setIsSubmitted(true)}
            className="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
          >
            <span>Submit Exam</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
