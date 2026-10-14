import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { 
  Play, Pause, RotateCcw, Cpu, Sparkles, Terminal, Code2, 
  Lightbulb, Sliders, Eye, Zap, Layers, Activity, CheckCircle2 
} from 'lucide-react';
import { 
  executeForwardPass, 
  ActivationFn, 
  ForwardPassResult 
} from '../../services/neuralMath';

type LightPreset = 'neon_cyber' | 'quantum_plasma' | 'solar_flare' | 'bioluminescence';

const LIGHT_THEMES: Record<LightPreset, {
  name: string;
  nodeColor: number;
  nodeEmissive: number;
  pulseColor: number;
  lineColor: number;
  ambientColor: number;
  dirColor: number;
  accentBg: string;
}> = {
  neon_cyber: {
    name: '⚡ Neon Cyber Glow',
    nodeColor: 0x00f0ff,
    nodeEmissive: 0x0284c7,
    pulseColor: 0xff007f,
    lineColor: 0x38bdf8,
    ambientColor: 0x0f172a,
    dirColor: 0x00f0ff,
    accentBg: 'border-cyan-500/40 text-cyan-400'
  },
  quantum_plasma: {
    name: '🌌 Quantum Plasma',
    nodeColor: 0x10b981,
    nodeEmissive: 0x059669,
    pulseColor: 0xa855f7,
    lineColor: 0x6ee7b7,
    ambientColor: 0x0f172a,
    dirColor: 0xa855f7,
    accentBg: 'border-emerald-500/40 text-emerald-400'
  },
  solar_flare: {
    name: '🔥 Solar Flare',
    nodeColor: 0xf59e0b,
    nodeEmissive: 0xd97706,
    pulseColor: 0xef4444,
    lineColor: 0xfcd34d,
    ambientColor: 0x1c1917,
    dirColor: 0xfbbf24,
    accentBg: 'border-amber-500/40 text-amber-400'
  },
  bioluminescence: {
    name: '💡 Bioluminescence',
    nodeColor: 0x2dd4bf,
    nodeEmissive: 0x0d9488,
    pulseColor: 0x38bdf8,
    lineColor: 0x99f6e4,
    ambientColor: 0x042f2e,
    dirColor: 0x2dd4bf,
    accentBg: 'border-teal-500/40 text-teal-400'
  }
};

export const NeuralNetwork3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Simulation Controls
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [lightPreset, setLightPreset] = useState<LightPreset>('neon_cyber');
  const [activation, setActivation] = useState<ActivationFn>('relu');
  const [codeLanguage, setCodeLanguage] = useState<'python' | 'pytorch' | 'javascript'>('python');

  // Input Tensor Features: [Latency ms, Packet Loss %, Bandwidth Mbps, CPU Load %]
  const [inputs, setInputs] = useState<[number, number, number, number]>([0.85, -0.42, 0.63, 0.91]);
  const [forwardResult, setForwardResult] = useState<ForwardPassResult>(() => executeForwardPass([0.85, -0.42, 0.63, 0.91], 'relu'));
  const [lastBurstTime, setLastBurstTime] = useState<number>(0);

  // Orbit / Interaction State
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const zoomLevel = useRef<number>(16);

  // References to keep animation loop stable without recreating Three.js scene
  const isPlayingRef = useRef<boolean>(isPlaying);
  const speedRef = useRef<number>(speed);
  const lightPresetRef = useRef<LightPreset>(lightPreset);
  const activationRef = useRef<ActivationFn>(activation);
  const forwardResultRef = useRef<ForwardPassResult>(forwardResult);
  const burstSignalRef = useRef<{ active: boolean; progress: number }>({ active: false, progress: 0 });

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { lightPresetRef.current = lightPreset; }, [lightPreset]);
  useEffect(() => { activationRef.current = activation; }, [activation]);
  useEffect(() => { forwardResultRef.current = forwardResult; }, [forwardResult]);

  // Handle Forward Pass Execution
  const handleRunForwardPass = () => {
    const res = executeForwardPass(inputs, activation);
    setForwardResult(res);
    forwardResultRef.current = res;
    burstSignalRef.current = { active: true, progress: 0 };
    setLastBurstTime(Date.now());
  };

  // Reset Camera View
  const handleResetCamera = () => {
    targetRotation.current = { x: 0, y: 0 };
    cameraRotation.current = { x: 0, y: 0 };
    zoomLevel.current = 16;
  };

  // Setup Three.js WebGL Scene ONCE
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = 460;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, zoomLevel.current);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Dynamic Lighting System
    const ambientLight = new THREE.AmbientLight(LIGHT_THEMES[lightPresetRef.current].ambientColor, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(LIGHT_THEMES[lightPresetRef.current].dirColor, 2.0);
    dirLight.position.set(12, 18, 14);
    scene.add(dirLight);

    // Dynamic Mouse Spotlight
    const mousePointLight = new THREE.PointLight(0x00f0ff, 3, 15);
    mousePointLight.position.set(0, 0, 8);
    scene.add(mousePointLight);

    // Signal Burst PointLight (lights up entire network during execution)
    const burstPointLight = new THREE.PointLight(0xff007f, 0, 25);
    scene.add(burstPointLight);

    // 3. Network Architecture: 4 Layers [4, 6, 6, 2]
    const layerSizes = [4, 6, 6, 2];
    const layerSpacingX = 4.2;
    const nodeSpheres: THREE.Mesh[] = [];
    const layerNodePositions: THREE.Vector3[][] = [];
    const sphereGeo = new THREE.SphereGeometry(0.38, 32, 32);

    const theme = LIGHT_THEMES[lightPresetRef.current];
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: theme.nodeColor,
      emissive: theme.nodeEmissive,
      emissiveIntensity: 0.6,
      shininess: 120,
      specular: 0xffffff
    });

    // Create Layers & Nodes (Centered perfectly)
    layerSizes.forEach((count, lIdx) => {
      const positions: THREE.Vector3[] = [];
      const x = (lIdx - (layerSizes.length - 1) / 2) * layerSpacingX;

      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * 1.55;
        const z = Math.sin(i * 0.7) * 0.6;
        const pos = new THREE.Vector3(x, y, z);
        positions.push(pos);

        const sphere = new THREE.Mesh(sphereGeo, nodeMaterial.clone());
        sphere.position.copy(pos);
        scene.add(sphere);
        nodeSpheres.push(sphere);
      }
      layerNodePositions.push(positions);
    });

    // 4. Synapse Cables (Lines connecting layers)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: theme.lineColor,
      transparent: true,
      opacity: 0.35
    });

    for (let l = 0; l < layerNodePositions.length - 1; l++) {
      const currentLayer = layerNodePositions[l];
      const nextLayer = layerNodePositions[l + 1];

      currentLayer.forEach(p1 => {
        nextLayer.forEach(p2 => {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
          const line = new THREE.Line(lineGeo, lineMaterial);
          scene.add(line);
        });
      });
    }

    // 5. Continuous Signal Pulses (Laser Photons)
    const pulseCount = 36;
    const pulses: { mesh: THREE.Mesh; progress: number; p1: THREE.Vector3; p2: THREE.Vector3; speed: number; light?: THREE.PointLight }[] = [];
    const pulseGeo = new THREE.SphereGeometry(0.12, 16, 16);

    for (let i = 0; i < pulseCount; i++) {
      const l = Math.floor(Math.random() * (layerNodePositions.length - 1));
      const p1 = layerNodePositions[l][Math.floor(Math.random() * layerNodePositions[l].length)];
      const p2 = layerNodePositions[l + 1][Math.floor(Math.random() * layerNodePositions[l + 1].length)];
      const pulseMat = new THREE.MeshBasicMaterial({ color: theme.pulseColor });
      const mesh = new THREE.Mesh(pulseGeo, pulseMat);
      scene.add(mesh);

      // Add miniature point light to select pulses for glowing trail
      let pLight: THREE.PointLight | undefined;
      if (i % 6 === 0) {
        pLight = new THREE.PointLight(theme.pulseColor, 1.8, 4);
        scene.add(pLight);
      }

      pulses.push({
        mesh,
        progress: Math.random(),
        p1,
        p2,
        speed: 0.008 + Math.random() * 0.016,
        light: pLight
      });
    }

    // 6. Interactive Mouse & Orbit Event Listeners
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Move 3D spotlight to cursor location
      mousePointLight.position.x = normX * 8;
      mousePointLight.position.y = normY * 5;

      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.008;
      targetRotation.current.x += deltaY * 0.008;

      // Clamp vertical tilt
      targetRotation.current.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotation.current.x));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomLevel.current += e.deltaY * 0.01;
      zoomLevel.current = Math.max(9, Math.min(26, zoomLevel.current));
      camera.position.z = zoomLevel.current;
    };

    // Touch Event Handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.01;
      targetRotation.current.x += deltaY * 0.01;
      targetRotation.current.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotation.current.x));

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 7. Animation Loop with Inertia & Light Pulse Propagation
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth camera orbit inertia
      cameraRotation.current.x += (targetRotation.current.x - cameraRotation.current.x) * 0.1;
      cameraRotation.current.y += (targetRotation.current.y - cameraRotation.current.y) * 0.1;

      // Apply rotation to scene
      scene.rotation.y = cameraRotation.current.y;
      scene.rotation.x = cameraRotation.current.x;

      const currentTheme = LIGHT_THEMES[lightPresetRef.current];

      // Update light colors if theme changed
      dirLight.color.setHex(currentTheme.dirColor);
      mousePointLight.color.setHex(currentTheme.nodeColor);
      lineMaterial.color.setHex(currentTheme.lineColor);

      // Auto-rotation when not dragging
      if (isPlayingRef.current && !isDraggingRef.current) {
        targetRotation.current.y += 0.0025 * speedRef.current;
      }

      // Handle Signal Burst Execution Wave
      if (burstSignalRef.current.active) {
        burstSignalRef.current.progress += 0.015 * speedRef.current;
        const p = burstSignalRef.current.progress;

        // Position burst light along X from input to output
        const startX = -layerSpacingX * 1.5;
        const endX = layerSpacingX * 1.5;
        burstPointLight.position.set(startX + p * (endX - startX), 0, 4);
        burstPointLight.intensity = Math.sin(p * Math.PI) * 8;
        burstPointLight.color.setHex(currentTheme.pulseColor);

        // Highlight nodes as wave passes through
        const activeLayer = Math.min(3, Math.floor(p * 4));
        let nodeCounter = 0;
        layerSizes.forEach((count, lIdx) => {
          for (let i = 0; i < count; i++) {
            const sphere = nodeSpheres[nodeCounter++];
            const mat = sphere.material as THREE.MeshPhongMaterial;
            if (lIdx === activeLayer) {
              mat.emissive.setHex(currentTheme.pulseColor);
              mat.emissiveIntensity = 1.2;
              sphere.scale.setScalar(1.25);
            } else {
              mat.emissive.setHex(currentTheme.nodeEmissive);
              mat.emissiveIntensity = 0.5;
              sphere.scale.setScalar(1.0);
            }
          }
        });

        if (burstSignalRef.current.progress >= 1.0) {
          burstSignalRef.current.active = false;
          burstPointLight.intensity = 0;
          nodeSpheres.forEach(s => {
            (s.material as THREE.MeshPhongMaterial).emissive.setHex(currentTheme.nodeEmissive);
            (s.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.5;
            s.scale.setScalar(1.0);
          });
        }
      }

      // Animate continuous signal pulses
      if (isPlayingRef.current) {
        pulses.forEach(p => {
          p.progress += p.speed * speedRef.current;
          if (p.progress >= 1) {
            p.progress = 0;
            const l = Math.floor(Math.random() * (layerNodePositions.length - 1));
            p.p1 = layerNodePositions[l][Math.floor(Math.random() * layerNodePositions[l].length)];
            p.p2 = layerNodePositions[l + 1][Math.floor(Math.random() * layerNodePositions[l + 1].length)];
          }
          p.mesh.position.lerpVectors(p.p1, p.p2, p.progress);
          (p.mesh.material as THREE.MeshBasicMaterial).color.setHex(currentTheme.pulseColor);

          if (p.light) {
            p.light.position.copy(p.mesh.position);
            p.light.color.setHex(currentTheme.pulseColor);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener('resize', handleResize);

    // 8. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      pulseGeo.dispose();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* 3D Demo Visualizer Panel */}
      <div className="glass-panel p-6 space-y-4 relative border-cyan-500/30">
        
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Interactive 3D Deep Neural Network Simulation
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold border border-cyan-500/30">
                  WebGL Three.js
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Full 360° orbit rotation • Forward signal propagation • Real-time matrix tensor math
              </p>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="glass-button px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:border-cyan-400"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>

            {/* Speed Slider */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-xs text-slate-300">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Speed:</span>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-16 accent-cyan-400 cursor-pointer"
              />
              <span className="font-mono text-cyan-400 font-bold">{speed}x</span>
            </div>

            {/* Light Effect Selector */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-xs text-slate-300">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Light Effect:</span>
              <select
                value={lightPreset}
                onChange={(e) => setLightPreset(e.target.value as LightPreset)}
                className="bg-transparent text-cyan-400 font-bold text-xs outline-none cursor-pointer"
              >
                {Object.entries(LIGHT_THEMES).map(([k, v]) => (
                  <option key={k} value={k} className="bg-slate-900 text-white">{v.name}</option>
                ))}
              </select>
            </div>

            {/* Reset Camera Button */}
            <button
              onClick={handleResetCamera}
              className="glass-button p-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              title="Reset 3D Camera"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3D Canvas Mount with Interactive Overlay Instructions */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
          <div
            ref={mountRef}
            className="w-full h-[460px] cursor-grab active:cursor-grabbing"
          />

          {/* Canvas Floating HUD Instructions */}
          <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
            <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-cyan-400" />
              <span>Drag mouse / touch to rotate 360° • Scroll to zoom</span>
            </span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-2 pointer-events-none">
            <span className={`px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold border ${LIGHT_THEMES[lightPreset].accentBg}`}>
              {LIGHT_THEMES[lightPreset].name}
            </span>
          </div>

          {/* Quick Forward Pass Trigger Button directly in 3D Canvas */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleRunForwardPass}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4 text-slate-950 fill-current" />
              <span>Execute Forward Propagation Signal Wave</span>
            </button>
          </div>
        </div>

        {/* 4 Layers Architecture Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono pt-2">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">Input Layer</div>
            <div className="font-bold text-cyan-400">4 Features (X)</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">Hidden Layer 1</div>
            <div className="font-bold text-purple-400">6 Neurons (W1: 4×6)</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">Hidden Layer 2</div>
            <div className="font-bold text-indigo-400">6 Neurons (W2: 6×6)</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">Output Softmax</div>
            <div className="font-bold text-emerald-400">2 Classes (Binary)</div>
          </div>
        </div>
      </div>

      {/* Working of Code & Interactive Mathematical Matrix Workbench */}
      <div className="glass-panel p-6 sm:p-8 space-y-6 border-indigo-500/30">
        
        {/* Section Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Working of Code: Live Feedforward Matrix Computation
              </h3>
              <p className="text-xs text-slate-500">
                KTU CST305 / CST401 Machine Learning • Mathematical forward pass calculation with real Python / PyTorch code
              </p>
            </div>
          </div>

          {/* Activation Function & Code Language Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Activation f(z):</span>
              {(['relu', 'sigmoid', 'tanh', 'leaky_relu'] as ActivationFn[]).map(fn => (
                <button
                  key={fn}
                  onClick={() => {
                    setActivation(fn);
                    const res = executeForwardPass(inputs, fn);
                    setForwardResult(res);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold uppercase transition-all ${
                    activation === fn
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'glass-button text-slate-400'
                  }`}
                >
                  {fn.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Tensor Input Controls (Left) & Live Code Runner (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Input Tensor Sliders (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>1. Feature Inputs X ∈ ℝ⁴</span>
            </h4>

            <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              {[
                { label: 'x₁: Network Latency (Norm)', idx: 0, min: -1.0, max: 1.0, step: 0.05, desc: 'Ping jitter latency' },
                { label: 'x₂: Packet Drop Ratio', idx: 1, min: -1.0, max: 1.0, step: 0.05, desc: 'Buffer saturation drop' },
                { label: 'x₃: Throughput Volatility', idx: 2, min: -1.0, max: 1.0, step: 0.05, desc: 'Burst flow anomaly' },
                { label: 'x₄: CPU Kernel Thread Load', idx: 3, min: -1.0, max: 1.0, step: 0.05, desc: 'Context switch frequency' }
              ].map(f => (
                <div key={f.idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-300">{f.label}</span>
                    <span className="font-mono text-cyan-400 font-bold">{inputs[f.idx].toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={inputs[f.idx]}
                    onChange={(e) => {
                      const newInputs = [...inputs] as [number, number, number, number];
                      newInputs[f.idx] = parseFloat(e.target.value);
                      setInputs(newInputs);
                      const res = executeForwardPass(newInputs, activation);
                      setForwardResult(res);
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">{f.desc}</div>
                </div>
              ))}
            </div>

            {/* Calculated Output Verdict */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-900/80 border border-indigo-500/30 space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Output Classification</span>
                <span className="text-[10px] font-mono text-cyan-400">Softmax Normalized</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${
                  forwardResult.predictedClass === 0 
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' 
                    : 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                }`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-black text-white">{forwardResult.predictedLabel}</div>
                  <div className="text-xs font-mono text-slate-400">
                    Safe: {(forwardResult.outputProbabilities[0] * 100).toFixed(1)}% | Alert: {(forwardResult.outputProbabilities[1] * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code Editor & Execution Output (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>2. Executable Code & Matrix Equations</span>
              </h4>
              <div className="flex gap-1.5">
                {(['python', 'pytorch', 'javascript'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setCodeLanguage(lang)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                      codeLanguage === lang ? 'bg-indigo-600 text-white' : 'glass-button text-slate-400'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Block */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-xs font-mono">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 font-bold text-slate-300">
                    {codeLanguage === 'python' ? 'forward_pass_numpy.py' : codeLanguage === 'pytorch' ? 'deep_net_torch.py' : 'matrix_forward.js'}
                  </span>
                </span>
                <span className="text-[10px] text-cyan-400">Dynamic Synapse Execution</span>
              </div>
              <pre className="p-4 text-slate-200 overflow-x-auto leading-relaxed max-h-[340px]">
                {codeLanguage === 'python' ? forwardResult.pythonCode : codeLanguage === 'pytorch' ? `# PyTorch Module Forward Propagation
import torch
import torch.nn as nn

class KTUDetectionNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(4, 6)
        self.fc2 = nn.Linear(6, 6)
        self.fc3 = nn.Linear(6, 2)
        self.act = nn.${activation === 'relu' ? 'ReLU' : activation === 'sigmoid' ? 'Sigmoid' : activation === 'tanh' ? 'Tanh' : 'LeakyReLU'}()
        self.softmax = nn.Softmax(dim=-1)

    def forward(self, x):
        z1 = self.act(self.fc1(x))
        z2 = self.act(self.fc2(z1))
        out = self.softmax(self.fc3(z2))
        return out

# Input Tensor
x = torch.tensor([${inputs.map(n => n.toFixed(2)).join(', ')}], dtype=torch.float32)
model = KTUDetectionNet()
prediction = model(x)
print("Class Probabilities:", prediction.detach().numpy())` : `// JavaScript Matrix Forward Propagation
function forwardPass(X, activationFn = '${activation}') {
  const Z1 = math.add(math.multiply(X, W1), B1);
  const A1 = Z1.map(val => ${activation}(val));
  
  const Z2 = math.add(math.multiply(A1, W2), B2);
  const A2 = Z2.map(val => ${activation}(val));
  
  const Z3 = math.add(math.multiply(A2, W3), B3);
  return softmax(Z3);
}

// Executed with inputs: [${inputs.map(n => n.toFixed(2)).join(', ')}]
// Result: ${forwardResult.predictedLabel}`}
              </pre>
            </div>

            {/* Step-by-Step Layer Value Inspection Table */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Layer-wise Tensor Activation Vector [A⁽ˡ⁾]:
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">A₁ (Hidden Layer 1):</div>
                  <div className="text-slate-300 truncate">
                    [{forwardResult.layerTraces[1].aValues.map(v => v.toFixed(2)).join(', ')}]
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">A₂ (Hidden Layer 2):</div>
                  <div className="text-slate-300 truncate">
                    [{forwardResult.layerTraces[2].aValues.map(v => v.toFixed(2)).join(', ')}]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
