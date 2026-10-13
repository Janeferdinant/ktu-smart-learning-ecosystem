import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Cpu, Sparkles } from 'lucide-react';

export const NeuralNetwork3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [activation, setActivation] = useState<'relu' | 'sigmoid' | 'tanh'>('relu');
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Network Layer Setup
    const layerSizes = [4, 6, 6, 2];
    const layerSpacing = 5;
    const nodeSpheres: THREE.Mesh[] = [];
    const layerNodePositions: THREE.Vector3[][] = [];

    const sphereGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      shininess: 100
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x60a5fa, 1.5);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    // Generate Nodes
    layerSizes.forEach((count, lIdx) => {
      const positions: THREE.Vector3[] = [];
      const x = (lIdx - (layerSizes.length - 1) / 2) * layerSpacing;

      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * 1.8;
        const z = Math.sin(i * 0.5) * 0.8;
        const pos = new THREE.Vector3(x, y, z);
        positions.push(pos);

        const sphere = new THREE.Mesh(sphereGeo, nodeMaterial.clone());
        sphere.position.copy(pos);
        scene.add(sphere);
        nodeSpheres.push(sphere);
      }
      layerNodePositions.push(positions);
    });

    // Connect Lines (Synapses)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.25
    });

    for (let l = 0; l < layerNodePositions.length - 1; l++) {
      const currentLayer = layerNodePositions[l];
      const nextLayer = layerNodePositions[l + 1];

      currentLayer.forEach(p1 => {
        nextLayer.forEach(p2 => {
          const points = [p1, p2];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeo, lineMaterial);
          scene.add(line);
        });
      });
    }

    // 3. Signal Pulses (Photons moving along synapses)
    const pulseCount = 30;
    const pulses: { mesh: THREE.Mesh; progress: number; p1: THREE.Vector3; p2: THREE.Vector3; speed: number }[] = [];
    const pulseGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    for (let i = 0; i < pulseCount; i++) {
      const l = Math.floor(Math.random() * (layerNodePositions.length - 1));
      const p1 = layerNodePositions[l][Math.floor(Math.random() * layerNodePositions[l].length)];
      const p2 = layerNodePositions[l + 1][Math.floor(Math.random() * layerNodePositions[l + 1].length)];
      const mesh = new THREE.Mesh(pulseGeo, pulseMat);
      scene.add(mesh);
      pulses.push({
        mesh,
        progress: Math.random(),
        p1,
        p2,
        speed: 0.01 + Math.random() * 0.015
      });
    }

    // 4. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (isPlaying) {
        scene.rotation.y += 0.003 * speed;
        scene.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.08;

        // Animate pulses
        pulses.forEach(p => {
          p.progress += p.speed * speed;
          if (p.progress >= 1) {
            p.progress = 0;
            const l = Math.floor(Math.random() * (layerNodePositions.length - 1));
            p.p1 = layerNodePositions[l][Math.floor(Math.random() * layerNodePositions[l].length)];
            p.p2 = layerNodePositions[l + 1][Math.floor(Math.random() * layerNodePositions[l + 1].length)];
          }
          p.mesh.position.lerpVectors(p.p1, p.p2, p.progress);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener('resize', handleResize);

    // 5. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying, speed, activation]);

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-500" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Interactive 3D Deep Neural Network Simulation
            </h3>
            <span className="text-[11px] text-slate-500">
              Three.js GPU acceleration • Forward signal propagation with synapsing activations
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="glass-button px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Speed:</span>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-20"
            />
            <span className="font-mono text-xs">{speed}x</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-[400px] rounded-2xl bg-slate-950/90 relative overflow-hidden shadow-inner border border-slate-800"
      />

      <div className="grid grid-cols-4 gap-2 text-center text-xs text-slate-500 pt-2 border-t border-slate-200/50 dark:border-slate-800/60">
        <div>Input Layer: 4 Features</div>
        <div>Hidden Layer 1: 6 Neurons</div>
        <div>Hidden Layer 2: 6 Neurons</div>
        <div>Output Layer: 2 Classes</div>
      </div>
    </div>
  );
};
