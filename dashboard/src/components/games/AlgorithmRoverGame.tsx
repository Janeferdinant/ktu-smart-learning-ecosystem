import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, ArrowRight, CornerDownLeft, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

export const AlgorithmRoverGame: React.FC = () => {
  const [commands, setCommands] = useState<string[]>([]);
  const [roverPos, setRoverPos] = useState<Position>({ x: 0, y: 0 });
  const [roverDir, setRoverDir] = useState<number>(0); // 0=Right, 1=Down, 2=Left, 3=Up
  const [gems, setGems] = useState<Position[]>([{ x: 2, y: 0 }, { x: 3, y: 2 }, { x: 1, y: 4 }]);
  const [collectedCount, setCollectedCount] = useState<number>(0);
  const [obstacles] = useState<Position[]>([{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 1 }, { x: 0, y: 3 }]);
  const targetBeacon: Position = { x: 4, y: 4 };

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeCmdIdx, setActiveCmdIdx] = useState<number | null>(null);
  const [battery, setBattery] = useState<number>(20);
  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<string>('Ready! Queue your algorithmic commands.');
  const [statusType, setStatusType] = useState<'info' | 'success' | 'error'>('info');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const GRID_SIZE = 5;

  // Sound Synthesizer
  const playTone = (freq: number, type: OscillatorType, duration: number) => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context policy
    }
  };

  const addCommand = (cmd: string) => {
    if (isRunning) return;
    if (commands.length >= 16) {
      setGameStatus('Command buffer full! Max 16 commands in memory.');
      setStatusType('error');
      playTone(220, 'sawtooth', 0.2);
      return;
    }
    setCommands([...commands, cmd]);
    playTone(550, 'sine', 0.05);
  };

  const clearCommands = () => {
    if (isRunning) return;
    setCommands([]);
    resetState();
    playTone(400, 'sine', 0.08);
  };

  const resetState = () => {
    setRoverPos({ x: 0, y: 0 });
    setRoverDir(0);
    setGems([{ x: 2, y: 0 }, { x: 3, y: 2 }, { x: 1, y: 4 }]);
    setCollectedCount(0);
    setBattery(20);
    setActiveCmdIdx(null);
    setIsRunning(false);
    setGameStatus('Rover reset to launchpad (0,0). Queue commands.');
    setStatusType('info');
  };

  // Draw Grid & Rover
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid Cells
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const px = x * cellSize;
        const py = y * cellSize;

        ctx.fillStyle = (x + y) % 2 === 0 ? 'rgba(15, 23, 42, 0.85)' : 'rgba(30, 41, 59, 0.85)';
        ctx.fillRect(px, py, cellSize, cellSize);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, cellSize, cellSize);
      }
    }

    // Draw Target Beacon
    const bpx = targetBeacon.x * cellSize + cellSize / 2;
    const bpy = targetBeacon.y * cellSize + cellSize / 2;
    ctx.beginPath();
    ctx.arc(bpx, bpy, cellSize * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
    ctx.fill();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 12px Plus Jakarta Sans';
    ctx.textAlign = 'center';
    ctx.fillText('📡 BEACON', bpx, bpy + 4);

    // Draw Obstacles (Rocks)
    for (const obs of obstacles) {
      const opx = obs.x * cellSize + cellSize / 2;
      const opy = obs.y * cellSize + cellSize / 2;
      ctx.beginPath();
      ctx.arc(opx, opy, cellSize * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = '#475569';
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText('🪨', opx, opy + 4);
    }

    // Draw Gems
    for (const gem of gems) {
      const gpx = gem.x * cellSize + cellSize / 2;
      const gpy = gem.y * cellSize + cellSize / 2;
      ctx.beginPath();
      ctx.arc(gpx, gpy, cellSize * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.font = '11px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText('💎', gpx, gpy + 4);
    }

    // Draw Rover
    const rpx = roverPos.x * cellSize + cellSize / 2;
    const rpy = roverPos.y * cellSize + cellSize / 2;

    ctx.save();
    ctx.translate(rpx, rpy);
    ctx.rotate((roverDir * 90 * Math.PI) / 180);

    // Rover chassis
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-cellSize * 0.25, -cellSize * 0.25, cellSize * 0.5, cellSize * 0.5);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(-cellSize * 0.25, -cellSize * 0.25, cellSize * 0.5, cellSize * 0.5);

    // Headlight indicator
    ctx.beginPath();
    ctx.moveTo(cellSize * 0.25, -cellSize * 0.15);
    ctx.lineTo(cellSize * 0.38, 0);
    ctx.lineTo(cellSize * 0.25, cellSize * 0.15);
    ctx.fillStyle = '#facc15';
    ctx.fill();

    ctx.restore();
  }, [roverPos, roverDir, gems, obstacles, targetBeacon]);

  // Execute Command Queue Sequentially
  const executeAlgorithm = async () => {
    if (isRunning || commands.length === 0) return;
    setIsRunning(true);
    setGameStatus('Executing algorithmic instruction queue...');
    setStatusType('info');

    let curPos = { ...roverPos };
    let curDir = roverDir;
    let curBattery = battery;
    let curGems = [...gems];
    let curCollected = collectedCount;
    let currentScore = score;

    for (let i = 0; i < commands.length; i++) {
      setActiveCmdIdx(i);
      const cmd = commands[i];

      if (curBattery <= 0) {
        setGameStatus('Battery Depleted! Program halted due to energy starvation.');
        setStatusType('error');
        playTone(200, 'sawtooth', 0.4);
        setIsRunning(false);
        return;
      }

      curBattery--;
      setBattery(curBattery);

      if (cmd === 'MOVE') {
        let nx = curPos.x;
        let ny = curPos.y;
        if (curDir === 0) nx++;
        else if (curDir === 1) ny++;
        else if (curDir === 2) nx--;
        else if (curDir === 3) ny--;

        // Boundary Check
        if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) {
          setGameStatus('Runtime Error: Boundary Overflow! Out of bounds.');
          setStatusType('error');
          playTone(180, 'sawtooth', 0.3);
          setIsRunning(false);
          return;
        }

        // Obstacle Collision Check
        if (obstacles.some(o => o.x === nx && o.y === ny)) {
          setGameStatus('Crash! Hit rock obstacle. Algorithmic path blocked.');
          setStatusType('error');
          playTone(150, 'sawtooth', 0.4);
          setIsRunning(false);
          return;
        }

        curPos = { x: nx, y: ny };
        setRoverPos(curPos);
        playTone(450, 'sine', 0.06);
      } else if (cmd === 'LEFT') {
        curDir = (curDir + 3) % 4;
        setRoverDir(curDir);
        playTone(520, 'sine', 0.05);
      } else if (cmd === 'RIGHT') {
        curDir = (curDir + 1) % 4;
        setRoverDir(curDir);
        playTone(580, 'sine', 0.05);
      } else if (cmd === 'COLLECT') {
        const gemIdx = curGems.findIndex(g => g.x === curPos.x && g.y === curPos.y);
        if (gemIdx !== -1) {
          curGems.splice(gemIdx, 1);
          setGems([...curGems]);
          curCollected++;
          setCollectedCount(curCollected);
          currentScore += 100;
          setScore(currentScore);
          playTone(880, 'triangle', 0.15);
        }
      }

      await new Promise(r => setTimeout(r, 450));
    }

    setActiveCmdIdx(null);
    setIsRunning(false);

    // Goal Check
    if (curPos.x === targetBeacon.x && curPos.y === targetBeacon.y) {
      const finalScore = currentScore + 200 + (curBattery * 10);
      setScore(finalScore);
      setGameStatus(`SUCCESS! Beacon reached! Mission Complete. Score: ${finalScore}`);
      setStatusType('success');
      playTone(523.25, 'triangle', 0.1);
      setTimeout(() => playTone(659.25, 'triangle', 0.15), 100);
      setTimeout(() => playTone(783.99, 'triangle', 0.3), 220);
    } else {
      setGameStatus(`Program finished, but beacon at (${targetBeacon.x}, ${targetBeacon.y}) not reached.`);
      setStatusType('info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Canvas & HUD Area */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-slate-400">
                Battery: <strong className={battery < 5 ? 'text-rose-400' : 'text-emerald-400'}>{battery}/20</strong>
              </span>
              <span className="text-xs font-mono text-slate-400">
                Gems: <strong className="text-cyan-400">{collectedCount}/3</strong>
              </span>
            </div>
            <div className="text-xs font-mono font-bold text-amber-400">
              Score: {score} pts
            </div>
          </div>

          <div className="relative aspect-square max-w-[440px] mx-auto rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl bg-slate-950">
            <canvas ref={canvasRef} width={440} height={440} className="w-full h-full block" />
          </div>

          <div className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
            statusType === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' :
            statusType === 'error' ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' :
            'bg-slate-800/50 border-slate-700/40 text-slate-300'
          }`}>
            {statusType === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> :
             statusType === 'error' ? <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" /> :
             <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />}
            <span>{gameStatus}</span>
          </div>
        </div>

        {/* Command Programming Palette */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-4 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Instruction Queue ({commands.length}/16)</span>
              <button
                onClick={clearCommands}
                disabled={isRunning}
                className="text-xs text-rose-500 hover:text-rose-400 font-semibold transition"
              >
                Clear All
              </button>
            </h4>

            {/* Instruction Command Blocks */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addCommand('MOVE')}
                disabled={isRunning}
                className="p-2.5 rounded-xl text-xs font-bold bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 flex items-center gap-2 transition"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Move Forward</span>
              </button>
              <button
                onClick={() => addCommand('LEFT')}
                disabled={isRunning}
                className="p-2.5 rounded-xl text-xs font-bold bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 flex items-center gap-2 transition"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
                <span>Turn Left 90°</span>
              </button>
              <button
                onClick={() => addCommand('RIGHT')}
                disabled={isRunning}
                className="p-2.5 rounded-xl text-xs font-bold bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 flex items-center gap-2 transition"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Turn Right 90°</span>
              </button>
              <button
                onClick={() => addCommand('COLLECT')}
                disabled={isRunning}
                className="p-2.5 rounded-xl text-xs font-bold bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-300 flex items-center gap-2 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Collect Gem</span>
              </button>
            </div>

            {/* Current Queued Steps Visualizer */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 min-h-[140px] max-h-[160px] overflow-y-auto">
              <div className="text-[11px] font-mono text-slate-500 mb-2">Memory Queue Buffer:</div>
              {commands.length === 0 ? (
                <div className="text-xs text-slate-500 italic">Queue is empty. Click commands above to assemble your algorithm.</div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {commands.map((cmd, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold transition-all ${
                        activeCmdIdx === idx
                          ? 'bg-amber-500 text-slate-950 scale-105 shadow-md shadow-amber-500/40 ring-1 ring-white'
                          : 'bg-slate-800 text-slate-300 border border-slate-700/60'
                      }`}
                    >
                      {idx + 1}. {cmd}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={executeAlgorithm}
                disabled={isRunning || commands.length === 0}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition disabled:opacity-40"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Execute Algorithm</span>
              </button>
              <button
                onClick={resetState}
                disabled={isRunning}
                className="p-2.5 rounded-xl text-xs font-semibold glass-button hover:border-slate-500 transition"
                title="Reset Rover State"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
