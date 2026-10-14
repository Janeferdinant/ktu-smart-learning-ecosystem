/**
 * KTU Smart Learning Ecosystem — Interactive Showcase Engine
 * Faculty Lead: Jane Rose | Assistant Professor | Dept. of CSE
 * Features: 3D particle background, dynamic themes, Web Audio sound effects,
 * interactive knowledge graph, quiz engine, and math calculator framework.
 */

// 1. Audio FX Synthesizer (Zero external dependencies)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playTone(freq, type, duration, gainVal = 0.08) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy
    }
  }

  click() { this.playTone(600, 'sine', 0.05, 0.04); }
  success() {
    this.playTone(523.25, 'triangle', 0.1, 0.06);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.15, 0.07), 80);
    setTimeout(() => this.playTone(783.99, 'triangle', 0.25, 0.08), 160);
  }
  error() {
    this.playTone(280, 'sawtooth', 0.15, 0.05);
    setTimeout(() => this.playTone(220, 'sawtooth', 0.2, 0.06), 100);
  }
}

const sfx = new SoundFX();

// 2. 3D Particle & Spatial Mesh Background
function init3DBackground() {
  const canvas = document.getElementById('canvas-3d-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const PARTICLE_COUNT = 55;
  let mouse = { x: null, y: null, radius: 120 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2.5 + 1,
      color: i % 2 === 0 ? 'rgba(56, 189, 248, ' : 'rgba(168, 85, 247, '
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Dynamic Mouse Spotlight Light Effect
    if (mouse.x !== null) {
      const radialGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius * 1.6);
      radialGlow.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
      radialGlow.addColorStop(0.4, 'rgba(168, 85, 247, 0.12)');
      radialGlow.addColorStop(0.8, 'rgba(16, 185, 129, 0.04)');
      radialGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.radius * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse interaction
      if (mouse.x !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.6)';
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = 0.18 * (1 - dist / 130);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
}

// 3. Theme Switcher Engine
function initThemeSwitcher() {
  const select = document.getElementById('theme-select');
  if (!select) return;

  const saved = localStorage.getItem('ktu-glass-theme') || 'liquid';
  select.value = saved;
  document.body.setAttribute('data-theme', saved);

  select.addEventListener('change', (e) => {
    const val = e.target.value;
    document.body.setAttribute('data-theme', val);
    localStorage.setItem('ktu-glass-theme', val);
    sfx.click();
  });
}

// 4. Interactive Knowledge Graph Engine (Canvas-based)
class InteractiveKnowledgeGraph {
  constructor(canvasId, nodes, edges) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = nodes;
    this.edges = edges;
    this.hoveredNode = null;
    this.selectedNode = null;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found = null;
      for (const node of this.nodes) {
        const dx = mx - node.x;
        const dy = my - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < (node.radius || 20)) {
          found = node;
          break;
        }
      }

      if (found !== this.hoveredNode) {
        this.hoveredNode = found;
        this.canvas.style.cursor = found ? 'pointer' : 'default';
        if (found) sfx.click();
      }
    });

    this.canvas.addEventListener('click', () => {
      if (this.hoveredNode) {
        this.selectedNode = this.hoveredNode;
        sfx.success();
        const descBox = document.getElementById('kg-node-desc');
        if (descBox) {
          descBox.innerHTML = `<strong>${this.hoveredNode.label}</strong>: ${this.hoveredNode.description || 'Core concept in the KTU syllabus.'}`;
        }
      }
    });

    this.animate();
  }

  resize() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = 360;
  }

  animate() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Draw Edges
    for (const edge of this.edges) {
      const source = this.nodes.find(n => n.id === edge.source);
      const target = this.nodes.find(n => n.id === edge.target);
      if (source && target) {
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = (this.hoveredNode && (this.hoveredNode.id === source.id || this.hoveredNode.id === target.id))
          ? 'rgba(56, 189, 248, 0.8)'
          : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = (this.hoveredNode && (this.hoveredNode.id === source.id || this.hoveredNode.id === target.id)) ? 2.5 : 1.2;
        ctx.stroke();

        // Edge label if present
        if (edge.label) {
          const midX = (source.x + target.x) / 2;
          const midY = (source.y + target.y) / 2;
          ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
          ctx.font = '10px JetBrains Mono';
          ctx.fillText(edge.label, midX - 10, midY - 6);
        }
      }
    }

    // Draw Nodes
    for (const node of this.nodes) {
      const isHovered = this.hoveredNode && this.hoveredNode.id === node.id;
      const isSelected = this.selectedNode && this.selectedNode.id === node.id;
      const r = (node.radius || 22) + (isHovered ? 4 : 0);

      // Outer Glow
      if (isHovered || isSelected) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fillStyle = node.color || '#0f172a';
      ctx.fill();
      ctx.lineWidth = isHovered ? 3 : 1.5;
      ctx.strokeStyle = isHovered ? '#38bdf8' : 'rgba(255, 255, 255, 0.3)';
      ctx.stroke();

      // Node label
      ctx.fillStyle = '#ffffff';
      ctx.font = `${isHovered ? '700' : '600'} 11px Plus Jakarta Sans`;
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + 4);
    }

    requestAnimationFrame(() => this.animate());
  }
}

// 5. Interactive Quiz Runner
function initQuiz(questions) {
  const container = document.getElementById('quiz-container');
  const scoreBadge = document.getElementById('quiz-score-badge');
  if (!container || !questions || !questions.length) return;

  let score = 0;
  let answered = 0;

  container.innerHTML = questions.map((q, idx) => `
    <div class="quiz-question-box" id="q-box-${idx}">
      <div class="quiz-q-text"><span style="color: var(--accent-cyan); font-family: var(--font-mono);">Q${idx + 1}.</span> ${q.question}</div>
      <div class="quiz-options">
        ${q.options.map((opt, optIdx) => `
          <button class="quiz-opt-btn" onclick="checkQuizAnswer(${idx}, ${optIdx}, ${q.answer})">${opt}</button>
        `).join('')}
      </div>
      <div class="quiz-explanation" id="q-exp-${idx}">
        <strong>💡 KTU Concept Review:</strong> ${q.explanation}
      </div>
    </div>
  `).join('');

  window.checkQuizAnswer = (qIdx, chosenIdx, correctIdx) => {
    const qBox = document.getElementById(`q-box-${qIdx}`);
    if (qBox.dataset.answered) return;
    qBox.dataset.answered = 'true';

    const buttons = qBox.querySelectorAll('.quiz-opt-btn');
    buttons.forEach((btn, bIdx) => {
      btn.disabled = true;
      if (bIdx === correctIdx) btn.classList.add('correct');
      if (bIdx === chosenIdx && chosenIdx !== correctIdx) btn.classList.add('wrong');
    });

    const exp = document.getElementById(`q-exp-${qIdx}`);
    if (exp) exp.style.display = 'block';

    if (chosenIdx === correctIdx) {
      score++;
      sfx.success();
    } else {
      sfx.error();
    }
    answered++;

    if (scoreBadge) {
      scoreBadge.innerText = `Score: ${score} / ${questions.length}`;
      scoreBadge.style.color = score === questions.length ? '#34d399' : 'var(--accent-cyan)';
    }
  };
}

// 6. Solved PYQ Accordion
function initPYQAccordion() {
  document.querySelectorAll('.pyq-q-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isVisible = body.style.display === 'block';
      body.style.display = isVisible ? 'none' : 'block';
      sfx.click();
    });
  });

  document.querySelectorAll('.pyq-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pyq-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      document.querySelectorAll('.pyq-item').forEach(item => {
        if (target === 'all' || item.dataset.category === target) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      sfx.click();
    });
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  init3DBackground();
  initThemeSwitcher();
  initPYQAccordion();
});
