import React, { useState, useEffect, useRef } from 'react';
import { Layers, RotateCcw, Target, Award, Code2 } from 'lucide-react';

interface TargetItem {
  id: number;
  x: number;
  y: number;
  material: 'Steel (Magnetic)' | 'Circuit (Delicate)' | 'Alloy (Heavy)';
  requiredSubclass: 'MagneticCollector' | 'PrecisionLaserGripper' | 'HeavyDutyWelder';
  radius: number;
}

export const OopRoboArenaGame: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<'MagneticCollector' | 'PrecisionLaserGripper' | 'HeavyDutyWelder'>('PrecisionLaserGripper');
  const [theta1, setTheta1] = useState<number>(35);
  const [theta2, setTheta2] = useState<number>(45);
  const [score, setScore] = useState<number>(0);
  const [currentTarget, setCurrentTarget] = useState<TargetItem>({
    id: 1,
    x: 120,
    y: 80,
    material: 'Circuit (Delicate)',
    requiredSubclass: 'PrecisionLaserGripper',
    radius: 18
  });
  const [logMessage, setLogMessage] = useState<string>('Select matching subclass and adjust joint angles (θ1, θ2) to dock on target.');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const L1 = 90;
  const L2 = 70;

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
      // Audio autoplay policy
    }
  };

  const spawnNewTarget = () => {
    const materials: ('Steel (Magnetic)' | 'Circuit (Delicate)' | 'Alloy (Heavy) ')[] = [
      'Steel (Magnetic)',
      'Circuit (Delicate)',
      'Alloy (Heavy) '
    ];
    const subMap: Record<string, 'MagneticCollector' | 'PrecisionLaserGripper' | 'HeavyDutyWelder'> = {
      'Steel (Magnetic)': 'MagneticCollector',
      'Circuit (Delicate)': 'PrecisionLaserGripper',
      'Alloy (Heavy) ': 'HeavyDutyWelder'
    };

    const mat = materials[Math.floor(Math.random() * materials.length)];
    const angle = (Math.random() * 90 - 45) * Math.PI / 180;
    const dist = Math.random() * 50 + 85;

    setCurrentTarget({
      id: Date.now(),
      x: Math.round(dist * Math.cos(angle)),
      y: Math.round(dist * Math.sin(angle) + 40),
      material: mat as 'Steel (Magnetic)' | 'Circuit (Delicate)' | 'Alloy (Heavy)',
      requiredSubclass: subMap[mat],
      radius: 18
    });
  };

  // Render Kinematic Arm Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height - 40;

    // Draw Base
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - 30, cy, 60, 20);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 30, cy, 60, 20);

    // Target
    const tpx = cx + currentTarget.x;
    const tpy = cy - currentTarget.y;

    ctx.beginPath();
    ctx.arc(tpx, tpy, currentTarget.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(244, 63, 94, 0.25)';
    ctx.fill();
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '10px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText('TARGET', tpx, tpy + 3);

    // Angles in Radians
    const r1 = (-theta1 * Math.PI) / 180;
    const r12 = (-(theta1 + theta2) * Math.PI) / 180;

    const j1x = cx + L1 * Math.cos(r1 - Math.PI / 2);
    const j1y = cy + L1 * Math.sin(r1 - Math.PI / 2);

    const endX = j1x + L2 * Math.cos(r12 - Math.PI / 2);
    const endY = j1y + L2 * Math.sin(r12 - Math.PI / 2);

    // Link 1
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(j1x, j1y);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Joint 1
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#0284c7';
    ctx.fill();

    // Joint 2
    ctx.beginPath();
    ctx.arc(j1x, j1y, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#a855f7';
    ctx.fill();

    // Link 2
    ctx.beginPath();
    ctx.moveTo(j1x, j1y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Gripper Tip
    ctx.beginPath();
    ctx.arc(endX, endY, 7, 0, Math.PI * 2);
    ctx.fillStyle = selectedClass === 'PrecisionLaserGripper' ? '#10b981' : selectedClass === 'MagneticCollector' ? '#38bdf8' : '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [theta1, theta2, currentTarget, selectedClass]);

  const verifyDocking = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height - 40;

    const r1 = (-theta1 * Math.PI) / 180;
    const r12 = (-(theta1 + theta2) * Math.PI) / 180;
    const j1x = cx + L1 * Math.cos(r1 - Math.PI / 2);
    const j1y = cy + L1 * Math.sin(r1 - Math.PI / 2);
    const endX = j1x + L2 * Math.cos(r12 - Math.PI / 2);
    const endY = j1y + L2 * Math.sin(r12 - Math.PI / 2);

    const tpx = cx + currentTarget.x;
    const tpy = cy - currentTarget.y;

    const dist = Math.sqrt((endX - tpx) ** 2 + (endY - tpy) ** 2);

    if (selectedClass !== currentTarget.requiredSubclass) {
      setLogMessage(`❌ Polymorphism Mismatch! Target requires subclass ${currentTarget.requiredSubclass}, but you invoked ${selectedClass}!`);
      playTone(200, 'sawtooth', 0.3);
      return;
    }

    if (dist <= currentTarget.radius + 6) {
      const pts = 100 + Math.round((25 - dist) * 4);
      setScore(score + pts);
      setLogMessage(`🎯 Perfect Dock! Polymorphic override executed via ${selectedClass}. +${pts} pts!`);
      playTone(523.25, 'triangle', 0.1);
      setTimeout(() => playTone(659.25, 'triangle', 0.15), 100);
      spawnNewTarget();
    } else {
      setLogMessage(`⚠️ Kinematic Alignment Error! End-effector is ${Math.round(dist)} px away from target. Adjust θ1 & θ2.`);
      playTone(300, 'sine', 0.15);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-700/50 gap-4">
        <div>
          <div className="text-[10px] uppercase font-mono text-slate-400">Target Payload</div>
          <div className="text-sm font-bold text-white mt-0.5">{currentTarget.material}</div>
          <div className="text-[11px] font-mono text-amber-400">Required: {currentTarget.requiredSubclass}</div>
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase font-mono text-slate-400">Engineering Score</div>
          <div className="text-xl font-black font-mono text-cyan-400">{score} pts</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Arm Canvas */}
        <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative">
            <canvas ref={canvasRef} width={480} height={320} className="w-full h-full block" />
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
            {logMessage}
          </div>
        </div>

        {/* Control Palette & OOP Code Hierarchy */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-4 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Polymorphic Subclass Selector</span>
            </h4>

            <div className="space-y-2">
              {[
                { id: 'PrecisionLaserGripper', label: 'PrecisionLaserGripper (Delicate)', desc: 'Overrides engage() with optical laser clamp' },
                { id: 'MagneticCollector', label: 'MagneticCollector (Ferrous Steel)', desc: 'Overrides engage() with 12V electromagnet' },
                { id: 'HeavyDutyWelder', label: 'HeavyDutyWelder (High-Torque Alloy)', desc: 'Overrides engage() with hydraulic pneumatic clamp' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => { setSelectedClass(sub.id as unknown as typeof selectedClass); playTone(550, 'sine', 0.05); }}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                    selectedClass === sub.id
                      ? 'bg-purple-600/20 border-purple-500 text-purple-200 shadow-md shadow-purple-500/20'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold font-mono">{sub.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{sub.desc}</div>
                </button>
              ))}
            </div>

            {/* Kinematic Angle Sliders */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Joint 1 Angle (θ1):</span>
                  <span className="text-cyan-400 font-bold">{theta1}°</span>
                </div>
                <input
                  type="range"
                  min="-75"
                  max="75"
                  value={theta1}
                  onChange={(e) => setTheta1(parseInt(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Joint 2 Angle (θ2):</span>
                  <span className="text-purple-400 font-bold">{theta2}°</span>
                </div>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  value={theta2}
                  onChange={(e) => setTheta2(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

            {/* Execute Docking */}
            <button
              onClick={verifyDocking}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 transition"
            >
              <Target className="w-4 h-4" />
              <span>Execute Polymorphic Docking</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
