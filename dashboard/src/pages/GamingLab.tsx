import React, { useState } from 'react';
import { GAMING_LAB_TIERS, AgeTierGame } from '../data/gamingLabData';
import { 
  Gamepad2, Award, BookOpen, Sparkles, Calculator, 
  FileText, CheckCircle2, ChevronDown, ChevronRight, 
  ShieldCheck, ArrowRight, Terminal, Cpu, Layers, Network, Bot
} from 'lucide-react';

// Age-Tier Game Components
import { AlgorithmRoverGame } from '../components/games/AlgorithmRoverGame';
import { LogicGateDefenderGame } from '../components/games/LogicGateDefenderGame';
import { OopRoboArenaGame } from '../components/games/OopRoboArenaGame';
import { SubnetDijkstraRushGame } from '../components/games/SubnetDijkstraRushGame';
import { DistributedDeadlockCommandGame } from '../components/games/DistributedDeadlockCommandGame';

type ActiveTab = 'simulation' | 'theory' | 'numerical' | 'workbench' | 'vivavoce' | 'enterprise';

export const GamingLab: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulation');
  const [expandedViva, setExpandedViva] = useState<number | null>(1);

  // Workbench state for Age 10
  const [wbSteps, setWbSteps] = useState<number>(5);
  const [wbTurns, setWbTurns] = useState<number>(2);
  const [wbGems, setWbGems] = useState<number>(3);

  // Workbench state for Age 12
  const [wbInA, setWbInA] = useState<number>(1);
  const [wbInB, setWbInB] = useState<number>(0);
  const [wbInC, setWbInC] = useState<number>(1);

  // Workbench state for Age 15
  const [wbL1, setWbL1] = useState<number>(200);
  const [wbL2, setWbL2] = useState<number>(150);
  const [wbTh1, setWbTh1] = useState<number>(30);
  const [wbTh2, setWbTh2] = useState<number>(45);

  // Workbench state for Age 18
  const [wbPrefix, setWbPrefix] = useState<number>(26);

  // Workbench state for Age 21
  const [wbDurA, setWbDurA] = useState<number>(3);
  const [wbDurB, setWbDurB] = useState<number>(4);
  const [wbDurC, setWbDurC] = useState<number>(2);
  const [wbDurD, setWbDurD] = useState<number>(5);
  const [wbDurE, setWbDurE] = useState<number>(6);
  const [wbDurF, setWbDurF] = useState<number>(3);

  const activeTier = GAMING_LAB_TIERS.find(t => t.age === selectedAge) || GAMING_LAB_TIERS[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Header with Glassmorphic Gradient */}
      <div className="glass-panel p-6 sm:p-10 relative overflow-hidden bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-cyan-500/10 border-indigo-500/30">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-bold border border-indigo-500/30">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Progressive Engineering Arcade & Academic Simulation Lab</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Curriculum Gaming Lab (Ages 10 – 21+)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Curated by <strong>Jane Rose</strong>, Assistant Professor, Department of Computer Science and Engineering (CSE). Experience the physical, algorithmic, and mathematical concepts of the KTU curriculum through 5 developmentally calibrated stages — from foundational algorithmic logic to distributed systems deadlock resolution.
          </p>
        </div>

        {/* Age Level Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mr-2">
            Select Age Tier:
          </span>
          {GAMING_LAB_TIERS.map(tier => (
            <button
              key={tier.age}
              onClick={() => {
                setSelectedAge(tier.age);
                setExpandedViva(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedAge === tier.age
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-102 ring-2 ring-cyan-400/50'
                  : 'glass-button hover:border-cyan-500/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>Age {tier.age}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">{tier.difficulty}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Container with Age Metadata Banner */}
      <div className="glass-panel p-6 space-y-6">
        
        {/* Tier Title and Academic Mapping Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                {activeTier.tierLabel}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                {activeTier.badge}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                {activeTier.academicFramework.bloomsTaxonomyLevel}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {activeTier.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {activeTier.subtitle}
            </p>
          </div>

          <div className="text-right space-y-1">
            <div className="text-[11px] font-mono text-slate-400">KTU Course & Syllabus Alignment:</div>
            <div className="text-xs font-bold text-indigo-400">
              {activeTier.academicFramework.courseCode}: {activeTier.academicFramework.courseTitle}
            </div>
            <div className="text-[11px] text-slate-400">
              {activeTier.academicFramework.moduleNumber} • {activeTier.academicFramework.creditWeight} Credits
            </div>
          </div>
        </div>

        {/* Content Depth Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/40 dark:border-slate-700/40 pb-3">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'simulation'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('theory')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'theory'
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Theoretical Foundations & Proofs</span>
          </button>

          <button
            onClick={() => setActiveTab('numerical')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'numerical'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Solved KTU Numerical Problem</span>
          </button>

          <button
            onClick={() => setActiveTab('workbench')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'workbench'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Realtime Formula Workbench</span>
          </button>

          <button
            onClick={() => setActiveTab('vivavoce')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'vivavoce'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Viva Voce & Technical Mastery</span>
          </button>

          <button
            onClick={() => setActiveTab('enterprise')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'enterprise'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Enterprise Case Study</span>
          </button>
        </div>

        {/* Tab 1: Interactive Simulation */}
        {activeTab === 'simulation' && (
          <div className="space-y-4">
            <div className="pt-2">
              {activeTier.age === 10 && <AlgorithmRoverGame />}
              {activeTier.age === 12 && <LogicGateDefenderGame />}
              {activeTier.age === 15 && <OopRoboArenaGame />}
              {activeTier.age === 18 && <SubnetDijkstraRushGame />}
              {activeTier.age === 21 && <DistributedDeadlockCommandGame />}
            </div>

            {/* Quick Rules & Objective Footnote */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200/30 dark:border-slate-800">
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-cyan-400 font-mono uppercase text-[10px] block mb-1">
                  Simulation Objective:
                </span>
                {activeTier.gameplay.objective}
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-amber-400 font-mono uppercase text-[10px] block mb-1">
                  Pedagogical Milestone:
                </span>
                {activeTier.gameplay.pedagogicalOutcome}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Theoretical Foundations & Proofs */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>{activeTier.deepTheory.mathematicalDerivation.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeTier.deepTheory.coreConcept}
              </p>
            </div>

            {/* Context and Invariants */}
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs sm:text-sm text-indigo-300">
              <strong>Theoretical Context: </strong>
              {activeTier.deepTheory.mathematicalDerivation.context}
              <div className="mt-2 text-xs font-mono text-cyan-300">
                <strong>System Invariant: </strong> {activeTier.deepTheory.mathematicalDerivation.invariantCondition}
              </div>
            </div>

            {/* Mathematical Formulas */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold block">
                Fundamental Governing Formulations
              </span>
              <div className="space-y-1.5 font-mono text-xs text-slate-200">
                {activeTier.deepTheory.mathematicalDerivation.latexFormulas.map((formula, idx) => (
                  <div key={idx} className="p-2 rounded bg-black/40 border border-slate-800 text-cyan-300 font-semibold">
                    {formula}
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Derivation */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-200 text-xs font-mono uppercase tracking-wider text-emerald-400">
                Formal Derivation Steps
              </h4>
              <div className="space-y-2">
                {activeTier.deepTheory.mathematicalDerivation.derivationSteps.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/30 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Formal Algorithm Pseudocode */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-xs text-purple-400 font-bold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{activeTier.deepTheory.formalAlgorithm.name}</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  Time: <strong className="text-cyan-400">{activeTier.deepTheory.formalAlgorithm.timeComplexity}</strong> | 
                  Space: <strong className="text-amber-400">{activeTier.deepTheory.formalAlgorithm.spaceComplexity}</strong>
                </span>
              </div>
              <pre className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {activeTier.deepTheory.formalAlgorithm.pseudocode.join('\n')}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Solved KTU Numerical Problem */}
        {activeTab === 'numerical' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>KTU Examination Solved Numerical Calculation</span>
                </span>
                <span className="text-[11px] font-mono text-amber-300/80">Marks: 10–14 pts</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                {activeTier.solvedNumericalExample.problemStatement}
              </p>
            </div>

            {/* Given Data Parameters Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300 font-mono">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-2.5">Parameter / Variable</th>
                    <th className="px-4 py-2.5">Given Examination Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                  {Object.entries(activeTier.solvedNumericalExample.givenData).map(([key, value], idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="px-4 py-2 text-cyan-300 font-bold">{key}</td>
                      <td className="px-4 py-2 text-slate-200">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Step-by-Step Worked Solution */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Step-by-Step Computational Derivation
              </h4>
              <div className="space-y-3">
                {activeTier.solvedNumericalExample.stepByStepSolution.map((s) => (
                  <div key={s.stepNumber} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-mono font-bold">
                          {s.stepNumber}
                        </span>
                        <span>{s.stepTitle}</span>
                      </span>
                      <span className="font-mono text-[10px] text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {s.formulaUsed}
                      </span>
                    </div>
                    <div className="p-2.5 rounded bg-black/40 font-mono text-xs text-slate-300 border border-slate-800">
                      {s.calculation}
                    </div>
                    <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{s.intermediateResult}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Answer Callout */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                Final Result & Conclusion:
              </span>
              <p className="text-xs sm:text-sm font-mono text-white font-semibold">
                {activeTier.solvedNumericalExample.finalAnswer}
              </p>
              <p className="text-xs text-slate-400 italic pt-1 border-t border-emerald-500/20">
                <strong>Engineering Takeaway: </strong> {activeTier.solvedNumericalExample.engineeringTakeaway}
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Realtime Formula Workbench */}
        {activeTab === 'workbench' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                <span>{activeTier.interactiveWorkbench.title}</span>
              </h3>
              <p className="text-xs font-mono text-slate-300">
                Active Formula: <strong className="text-cyan-300">{activeTier.interactiveWorkbench.formulaDisplay}</strong>
              </p>
            </div>

            {/* Age 10 Workbench: Rover Path Complexity */}
            {activeTier.age === 10 && (
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Forward Steps (c_m = 2):</label>
                    <input 
                      type="range" min="1" max="15" value={wbSteps} 
                      onChange={e => setWbSteps(Number(e.target.value))}
                      className="w-full accent-cyan-500" 
                    />
                    <div className="text-right font-mono text-xs text-cyan-400 font-bold">{wbSteps} steps</div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Rotations (c_t = 1):</label>
                    <input 
                      type="range" min="0" max="8" value={wbTurns} 
                      onChange={e => setWbTurns(Number(e.target.value))}
                      className="w-full accent-amber-500" 
                    />
                    <div className="text-right font-mono text-xs text-amber-400 font-bold">{wbTurns} turns</div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Gems Collected (c_c = 1):</label>
                    <input 
                      type="range" min="0" max="5" value={wbGems} 
                      onChange={e => setWbGems(Number(e.target.value))}
                      className="w-full accent-emerald-500" 
                    />
                    <div className="text-right font-mono text-xs text-emerald-400 font-bold">{wbGems} gems</div>
                  </div>
                </div>

                {/* Realtime Output Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Total Burned Battery</div>
                    <div className="text-xl font-bold font-mono text-amber-400">
                      {(wbSteps * 2) + (wbTurns * 1) + (wbGems * 1)} units
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Remaining Battery Capacity</div>
                    <div className="text-xl font-bold font-mono text-cyan-400">
                      {Math.max(0, 100 - ((wbSteps * 2) + (wbTurns * 1) + (wbGems * 1)))}%
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Time Complexity Bound</div>
                    <div className="text-xl font-bold font-mono text-emerald-400">
                      O({wbSteps + wbTurns + wbGems})
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Age 12 Workbench: Boolean Logic */}
            {activeTier.age === 12 && (
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
                <div className="flex flex-wrap items-center justify-around gap-4">
                  {[
                    { label: 'Input A', val: wbInA, set: setWbInA },
                    { label: 'Input B', val: wbInB, set: setWbInB },
                    { label: 'Input C', val: wbInC, set: setWbInC }
                  ].map((pin, i) => (
                    <button
                      key={i}
                      onClick={() => pin.set(pin.val === 1 ? 0 : 1)}
                      className={`px-5 py-3 rounded-xl font-mono text-sm font-bold flex items-center gap-3 transition-all ${
                        pin.val === 1
                          ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      <span>{pin.label}:</span>
                      <span className="text-lg font-black">{pin.val}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">A AND B</div>
                    <div className="text-lg font-bold font-mono text-cyan-400">{wbInA & wbInB}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">A OR B</div>
                    <div className="text-lg font-bold font-mono text-amber-400">{wbInA | wbInB}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">A XOR B XOR C</div>
                    <div className="text-lg font-bold font-mono text-purple-400">{wbInA ^ wbInB ^ wbInC}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Majority Voter F</div>
                    <div className="text-lg font-bold font-mono text-emerald-400">
                      {(wbInA & wbInB) | (wbInB & wbInC) | (wbInA & wbInC)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Age 15 Workbench: Kinematics Arm */}
            {activeTier.age === 15 && (
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">L1 (mm):</label>
                    <input type="number" value={wbL1} onChange={e => setWbL1(Number(e.target.value))} className="w-full bg-black/50 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">L2 (mm):</label>
                    <input type="number" value={wbL2} onChange={e => setWbL2(Number(e.target.value))} className="w-full bg-black/50 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">θ1 (deg):</label>
                    <input type="range" min="-90" max="90" value={wbTh1} onChange={e => setWbTh1(Number(e.target.value))} className="w-full accent-cyan-500" />
                    <div className="text-right font-mono text-xs text-cyan-400">{wbTh1}°</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">θ2 (deg):</label>
                    <input type="range" min="-120" max="120" value={wbTh2} onChange={e => setWbTh2(Number(e.target.value))} className="w-full accent-purple-500" />
                    <div className="text-right font-mono text-xs text-purple-400">{wbTh2}°</div>
                  </div>
                </div>

                {/* Calculation Outputs */}
                {(() => {
                  const r1 = (wbTh1 * Math.PI) / 180;
                  const r2 = ((wbTh1 + wbTh2) * Math.PI) / 180;
                  const x = wbL1 * Math.cos(r1) + wbL2 * Math.cos(r2);
                  const y = wbL1 * Math.sin(r1) + wbL2 * Math.sin(r2);
                  const detJ = wbL1 * wbL2 * Math.sin((wbTh2 * Math.PI) / 180);
                  const isSingular = Math.abs(detJ) < 100;

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                      <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Tip Coordinate X</div>
                        <div className="text-lg font-bold font-mono text-cyan-400">{x.toFixed(2)} mm</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Tip Coordinate Y</div>
                        <div className="text-lg font-bold font-mono text-cyan-400">{y.toFixed(2)} mm</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Max Reach (L1+L2)</div>
                        <div className="text-lg font-bold font-mono text-amber-400">{wbL1 + wbL2} mm</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Jacobian Det(J)</div>
                        <div className={`text-lg font-bold font-mono ${isSingular ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                          {detJ.toFixed(0)} {isSingular ? '(Singular!)' : '(Safe)'}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Age 18 Workbench: VLSM CIDR Calculator */}
            {activeTier.age === 18 && (
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400">Select CIDR Subnet Prefix Length (/{wbPrefix}):</label>
                  <input 
                    type="range" min="24" max="30" value={wbPrefix} 
                    onChange={e => setWbPrefix(Number(e.target.value))} 
                    className="w-full accent-cyan-500" 
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>/24 (254 hosts)</span>
                    <span>/26 (62 hosts)</span>
                    <span>/28 (14 hosts)</span>
                    <span>/30 (2 hosts)</span>
                  </div>
                </div>

                {(() => {
                  const h = 32 - wbPrefix;
                  const total = Math.pow(2, h);
                  const usable = Math.max(0, total - 2);
                  const lastOctet = 256 - total;
                  const mask = `255.255.255.${lastOctet}`;

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                      <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Subnet Mask</div>
                        <div className="text-sm font-bold font-mono text-cyan-400">{mask}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Host Bits (h)</div>
                        <div className="text-lg font-bold font-mono text-amber-400">{h} bits</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Total Addresses</div>
                        <div className="text-lg font-bold font-mono text-purple-400">{total} IPs</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Usable Hosts (2^h - 2)</div>
                        <div className="text-lg font-bold font-mono text-emerald-400">{usable} hosts</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Age 21 Workbench: CPM Schedule Calculator */}
            {activeTier.age === 21 && (
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                  {[
                    { id: 'A', dur: wbDurA, set: setWbDurA },
                    { id: 'B (pred A)', dur: wbDurB, set: setWbDurB },
                    { id: 'C (pred A)', dur: wbDurC, set: setWbDurC },
                    { id: 'D (pred B)', dur: wbDurD, set: setWbDurD },
                    { id: 'E (pred C)', dur: wbDurE, set: setWbDurE },
                    { id: 'F (pred D,E)', dur: wbDurF, set: setWbDurF },
                  ].map((act, i) => (
                    <div key={i} className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 block truncate">Act {act.id}:</label>
                      <input 
                        type="number" min="1" max="20" value={act.dur} 
                        onChange={e => act.set(Number(e.target.value))}
                        className="w-full bg-black/50 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                      />
                    </div>
                  ))}
                </div>

                {(() => {
                  const efA = wbDurA;
                  const efB = efA + wbDurB;
                  const efC = efA + wbDurC;
                  const efD = efB + wbDurD;
                  const efE = efC + wbDurE;
                  const esF = Math.max(efD, efE);
                  const efF = esF + wbDurF;
                  const critChain = efD >= efE ? 'A → B → D → F' : 'A → C → E → F';

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
                      <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Total Project Duration</div>
                        <div className="text-xl font-bold font-mono text-cyan-400">{efF} days</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Identified Critical Path</div>
                        <div className="text-sm font-bold font-mono text-amber-400 mt-1">{critChain}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Slack Float Buffer</div>
                        <div className="text-xl font-bold font-mono text-emerald-400">
                          {Math.abs(efD - efE)} days
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Viva Voce & Technical Mastery */}
        {activeTab === 'vivavoce' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Technical Interview & KTU Viva Voce Examination Question Bank</span>
              </h3>
              <p className="text-xs text-slate-300">
                Rigorous oral examination questions curated by <strong>Jane Rose</strong>, Assistant Professor CSE. Test your conceptual clarity and architectural reasoning.
              </p>
            </div>

            <div className="space-y-3">
              {activeTier.vivaVoceQuestions.map((q) => {
                const isExpanded = expandedViva === q.questionNumber;
                return (
                  <div key={q.questionNumber} className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                    <button
                      onClick={() => setExpandedViva(isExpanded ? null : q.questionNumber)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                          Q{q.questionNumber}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-white">
                          {q.question}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                          {q.conceptTested}
                        </span>
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-black/40 text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                        <div className="font-bold font-mono text-emerald-400 text-xs uppercase tracking-wider">
                          Faculty Model Answer:
                        </div>
                        <p>{q.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 6: Enterprise Case Study */}
        {activeTab === 'enterprise' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
              <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>Enterprise Production Systems & Real-World Engineering Case Study</span>
              </h3>
              <p className="text-xs text-slate-300">
                How the theoretical concepts in this game tier power modern hyperscale technology platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  Real-World Mental Model & Analogy
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{activeTier.deepTheory.realWorldAnalogy}"
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                  Hyperscale Industrial Deployment
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeTier.deepTheory.industryApplication}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Official Faculty Footer Branding */}
      <footer className="glass-panel p-6 border-slate-800 text-center text-xs text-slate-400 space-y-2">
        <div className="font-bold text-slate-200">
          KTU Smart Learning Ecosystem • Progressive STEM Gaming Laboratory
        </div>
        <div>
          Curated & Mentored by: <strong className="text-cyan-400">Jane Rose</strong> | Assistant Professor | Department of Computer Science and Engineering (CSE)
        </div>
        <div className="text-[11px] text-slate-500">
          Grounded in APJ Abdul Kalam Technological University (KTU) B.Tech CSE Syllabus & IEEE Pedagogical Guidelines
        </div>
      </footer>

    </div>
  );
};
