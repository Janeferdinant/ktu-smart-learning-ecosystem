# Subject Interactive Showcases Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build premium animated HTML learning environments for each KTU engineering subject code featuring 3D visualizations, realtime interactive demos, industrial applications, quizzes, knowledge graphs, educational games, career & payscale guides, interactive numerical calculators, solved previous year university exam solutions, glassmorphism aesthetics, motion graphics, and official faculty footer branding.

**Architecture:** Each subject code (`CST205`, `CST303`, `CST305`, `CST307`, `EST-STM32`, `PCADT502`, `PECST521`) receives an ultra-responsive, standalone animated HTML showcase located both within its subject repository folder (`subjects/<folder>/interactive-showcase.html`) and mirrored in `dashboard/public/subjects/<subject-code>.html`. The pages share a high-performance glassmorphism design system supporting 6 glass variants (Liquid, Aurora, Frosted, Neon Cyber, Deep Obsidian, Holographic), 3D interactive particle / mesh canvas, mathematical calculation engines, interactive knowledge graphs, and dynamic minigames.

**Tech Stack:** HTML5 Semantic Markup, Vanilla CSS3 (Glassmorphism, 3D transforms, keyframe motion graphics, backdrop filters), Modern ES6+ JavaScript, Canvas API / WebGL 3D, Google Fonts (Outfit, Plus Jakarta Sans, JetBrains Mono), Lucide SVG icons.

**Spec:** User requirements requesting:
- Animated HTML for each subject code with:
  1. Realtime demo
  2. Enterprise & real-world applications
  3. Interactive quiz with instant feedback
  4. Dynamic knowledge graph
  5. Subject-specific educational game
  6. Job roles, career paths, and payscales (INR LPA & USD $)
  7. Numerical calculation engine with step-by-step solutions
  8. Solved KTU previous year question paper with marking schemes
- Footer branding: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`
- Visual styles: Glassmorphism effects of all kinds, 3D, HD, 4K responsive layout, motion graphics
- Master prompt updated and documented in `MASTER_PROMPT.md`

## Global Constraints
- **Faculty Branding:** Official footer on all pages: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`.
- **Zero Student PII:** Absolute zero presence of student names or KTU register numbers.
- **Glassmorphism Design:** Curated glass themes (Liquid Glass, Aurora Glass, Frosted Glass, Neon Cyber, Deep Obsidian) with smooth `backdrop-filter: blur(16px)` and specular highlights.
- **Responsiveness & Performance:** 100% fluid from mobile screens to 4K displays with 60 FPS CSS/Canvas animations.
- **Production Deployment:** Build, test, commit, push to GitHub (`Janeferdinant/ktu-smart-learning-ecosystem`), and deploy to Vercel production (`https://dashboard-eta-ashen-67.vercel.app`).

## Review Focus
1. **Interactive Demo State:** Input changes and resets run smoothly without freezing the main thread.
2. **Numerical Calculations:** Exact numerical precision with boundary checking and clear step-by-step mathematical work.
3. **Knowledge Graph Interactivity:** Node dragging/hovering and connection line rendering work across desktop and touch viewports.
4. **Quiz & Minigames:** Scoring logic correctly records answers and provides accurate KTU-level feedback.
5. **Standalone Portability:** HTML showcases function independently both when opened directly as local files and when served over HTTP/HTTPS on Vercel.

---

### Task 1: Master Prompt Documentation & README Update

**Files:**
- Create: `MASTER_PROMPT.md`
- Modify: `README.md`

**Interfaces:**
- Produces: The authoritative, comprehensive KTU Smart Learning Ecosystem master prompt incorporating all current and expanded capabilities.

- [ ] **Step 1: Create `MASTER_PROMPT.md`**
Assemble the full Antigravity Master Prompt incorporating all core repository goals plus the explicit subject-wise animated HTML specifications (realtime demo, application, quiz, knowledge graph, games, job and payscale, numerical calculation, solved PYQ, glassmorphism, 3D, motion graphics, and faculty footer).

- [ ] **Step 2: Update `README.md`**
Reference `MASTER_PROMPT.md` and document the new interactive subject showcase feature set in the project overview.

- [ ] **Step 3: Verify markdown formatting**
Ensure clear headings, code fences, and links.

---

### Task 2: Core Design Architecture & Shared Showcase Engine

**Files:**
- Create: `subjects/common/showcase-theme.css`
- Create: `subjects/common/showcase-engine.js`

**Interfaces:**
- Produces: CSS glass design tokens (Liquid, Aurora, Frosted, Cyber, Obsidian), 3D canvas particle visualizer, modal popups, audio feedback synthesized via Web Audio API, and shared interactive components.

- [ ] **Step 1: Implement `showcase-theme.css`**
Define CSS variables for all glass themes, keyframe motion graphics (pulse, float, shimmer, gradient-shift), 3D perspective cards, responsive grid layouts, and typography.

- [ ] **Step 2: Implement `showcase-engine.js`**
Define lightweight, zero-dependency modules:
- Interactive 3D/Particle Canvas background
- Interactive Knowledge Graph renderer (canvas/SVG force-directed layout)
- Quiz controller with instant score tracking and explanations
- Numerical Calculator framework with step-by-step rendering
- Educational minigame base controller
- Theme switcher dropdown

- [ ] **Step 3: Verify local rendering**
Check that CSS and JS modules load cleanly without runtime errors.

---

### Task 3: Animated Showcases for CST205 (Java OOP) & CST303 (Computer Networks)

**Files:**
- Create: `subjects/cst205-object-oriented-programming/interactive-showcase.html`
- Create: `dashboard/public/subjects/cst205.html`
- Create: `subjects/cst303-computer-networks/interactive-showcase.html`
- Create: `dashboard/public/subjects/cst303.html`

**Interfaces:**
- Consumes: `showcase-theme.css`, `showcase-engine.js`
- Produces: Complete animated showcases for CST205 and CST303.

- [ ] **Step 1: Build CST205 Showcase**
- Realtime Demo: JVM Runtime Memory & Garbage Collection visualizer (Stack vs Heap, Young/Old Gen, Eden space).
- Application: High-frequency trading engines, Android application lifecycle, Spring Boot microservices.
- Quiz: 5-question KTU OOP exam quiz (polymorphism, interfaces, exception handling, threads).
- Knowledge Graph: Java OOP hierarchy (Object -> Class -> Interface -> Inheritance -> Multithreading).
- Game: "Bug Hunter / Bytecode Catcher" mini-game.
- Job & Payscale: Java Backend Architect, Enterprise Software Engineer ($85k-$165k / ₹8-32 LPA).
- Numerical Calculation: JVM Heap Sizing & Big-O Algorithm Space/Time Complexity calculator.
- Solved PYQ: Dec 2022 / July 2023 KTU Part A & Part B questions with full Java code solutions.
- Footer: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`.

- [ ] **Step 2: Build CST303 Showcase**
- Realtime Demo: Interactive Subnetting / CIDR & Distance-Vector / Dijkstra Packet Router.
- Application: Cloud VPC design (AWS/GCP), BGP Internet Exchange, CDN caching.
- Quiz: 5-question KTU Computer Networks exam quiz (TCP/IP, OSPF, sliding window, subnetting).
- Knowledge Graph: OSI & TCP/IP 5-layer interactive network topology.
- Game: "Packet Defense: Defend Against SYN Flood / Collision" game.
- Job & Payscale: Network Security Engineer, Cloud Infrastructure Architect ($90k-$175k / ₹9-35 LPA).
- Numerical Calculation: CIDR Subnet Calculator & Hamming Code / CRC Checksum calculator with step-by-step binary math.
- Solved PYQ: Dec 2022 KTU CST303 questions (Subnetting, Leaky Bucket, TCP congestion window) with detailed solutions.
- Footer: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`.

- [ ] **Step 3: Mirror to `dashboard/public/subjects/`**
Copy/sync to `dashboard/public/subjects/cst205.html` and `dashboard/public/subjects/cst303.html`.

---

### Task 4: Animated Showcases for CST305 (AI) & CST307 (Data Mining)

**Files:**
- Create: `subjects/cst305-artificial-intelligence/interactive-showcase.html`
- Create: `dashboard/public/subjects/cst305.html`
- Create: `subjects/cst307-data-mining/interactive-showcase.html`
- Create: `dashboard/public/subjects/cst307.html`

- [ ] **Step 1: Build CST305 Showcase**
- Realtime Demo: Interactive A* Search grid pathfinder & 2-layer Neural Network decision boundary visualizer.
- Application: Autonomous driving, Medical diagnostics AI, Natural Language Processing.
- Quiz: 5-question KTU AI quiz (Heuristics, Minimax with Alpha-Beta pruning, Knowledge Representation).
- Knowledge Graph: AI landscape (State Space Search, Logic, Neural Nets, NLP, Expert Systems).
- Game: "Turing Labyrinth: Guide the Agent Through Heuristic Maze".
- Job & Payscale: AI/ML Research Engineer, Deep Learning Specialist ($110k-$210k / ₹12-45 LPA).
- Numerical Calculation: Bayes' Theorem Posterior Probability & Alpha-Beta Pruning value calculator.
- Solved PYQ: KTU CST305 Model Exam Questions with complete step-by-step derivations.
- Footer: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`.

- [ ] **Step 2: Build CST307 Showcase**
- Realtime Demo: Interactive Apriori Algorithm Frequent Itemset Generator & Decision Tree split visualizer.
- Application: Retail Market Basket analysis, Fraud detection in banking, Genomic sequence mining.
- Quiz: 5-question KTU Data Mining quiz (FP-Growth, K-Means clustering, ROC curves, OLAP cubes).
- Knowledge Graph: Data Mining pipeline (ETL -> Data Warehouse -> Mining -> Evaluation).
- Game: "Pattern Hunter: Cluster the Outliers in Record Time".
- Job & Payscale: Data Scientist, Big Data Mining Engineer ($95k-$180k / ₹10-38 LPA).
- Numerical Calculation: Support, Confidence, Lift calculation & Information Gain / Gini Index calculator.
- Solved PYQ: KTU CST307 previous year questions with full mathematical step-by-step calculations.
- Footer: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`.

- [ ] **Step 3: Mirror to `dashboard/public/subjects/`**
Sync to `dashboard/public/subjects/cst305.html` and `dashboard/public/subjects/cst307.html`.

---

### Task 5: Animated Showcases for STM32, PCADT502 (Robotics) & PECST521 (SPM)

**Files:**
- Create: `subjects/embedded-systems-stm32/interactive-showcase.html`
- Create: `dashboard/public/subjects/embedded-systems-stm32.html`
- Create: `subjects/pcadt502-robotics/interactive-showcase.html`
- Create: `dashboard/public/subjects/pcadt502.html`
- Create: `subjects/pecst521-software-project-management/interactive-showcase.html`
- Create: `dashboard/public/subjects/pecst521.html`

- [ ] **Step 1: Build EST-STM32 Showcase**
- Realtime Demo: Interactive ARM Cortex-M4 GPIO pin toggle & PWM frequency oscilloscope.
- Application: Automotive ECU, Medical telemetry devices, Aerospace avionics.
- Quiz: 5-question KTU Embedded Systems quiz (Interrupts, NVIC, I2C/SPI, DMA, Timers).
- Knowledge Graph: Embedded ecosystem (Hardware -> Registers -> HAL -> RTOS -> Application).
- Game: "Pin Matrix Master: Wire the Peripheral Under Pressure".
- Job & Payscale: Firmware Engineer, Embedded Systems Specialist ($85k-$160k / ₹7-28 LPA).
- Numerical Calculation: Timer Prescaler & Reload Value / Baud Rate generator calculator.
- Solved PYQ: KTU Embedded Systems questions with annotated C firmware code.
- Footer: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`.

- [ ] **Step 2: Build PCADT502 Robotics Showcase**
- Realtime Demo: Interactive 2-DOF Robotic Arm Forward/Inverse Kinematics canvas.
- Application: Industrial welding robots, Surgical da Vinci systems, Autonomous warehouse AGVs.
- Quiz: 5-question KTU Robotics quiz (DH parameters, Actuators, Trajectory planning, PID control).
- Knowledge Graph: Robotics engineering (Kinematics, Dynamics, Sensing, Control, Actuation).
- Game: "End-Effector Precision Touch: Align the Arm Joint Coordinates".
- Job & Payscale: Robotics Systems Engineer, Automation Architect ($95k-$180k / ₹9-36 LPA).
- Numerical Calculation: Denavit-Hartenberg (DH) Transformation Matrix & Joint Torque calculator.
- Solved PYQ: KTU Robotics questions with full matrix derivations and diagrams.
- Footer: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`.

- [ ] **Step 3: Build PECST521 Software Project Management Showcase**
- Realtime Demo: Interactive Critical Path Method (CPM) / PERT Schedule & Burn-down chart simulator.
- Application: Enterprise Agile transformations, Large-scale mission-critical software delivery.
- Quiz: 5-question KTU SPM quiz (COCOMO, Risk Management, Scrum ceremonies, Earned Value Analysis).
- Knowledge Graph: SPM disciplines (Initiation, Estimation, Scheduling, Risk, Quality, Closure).
- Game: "Agile Sprint Balancer: Allocate Story Points & Prevent Team Burnout".
- Job & Payscale: Technical Project Manager, Agile Delivery Lead ($100k-$190k / ₹14-42 LPA).
- Numerical Calculation: Basic & Intermediate COCOMO Effort / Function Points / Schedule Estimation calculator.
- Solved PYQ: KTU PECST521 questions with worked numerical tables and EVM derivations.
- Footer: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`.

- [ ] **Step 4: Mirror to `dashboard/public/subjects/`**
Sync all remaining showcases to `dashboard/public/subjects/`.

---

### Task 6: Dashboard Integration & Cross-Navigation

**Files:**
- Modify: `dashboard/src/data/academicData.ts`
- Modify: `dashboard/src/components/SubjectModuleDetail.tsx` (or subject landing view)
- Modify: `dashboard/src/components/Header.tsx` or navigation menu

- [ ] **Step 1: Add Showcase URLs to Subject Catalog**
Update each subject record in `academicData.ts` with its `showcaseUrl` pointing to `/subjects/<subject-code>.html`.

- [ ] **Step 2: Add "Launch Interactive 3D Showcase" Action Button**
In the dashboard UI, render a high-visibility glassmorphism button on every subject card/detail view with a glowing badge: `"⚡ Launch 3D Interactive Showcase"`.

- [ ] **Step 3: Verify navigation**
Ensure clicking opens the animated HTML showcase in a new tab or iframe seamlessly.

---

### Task 7: File Inventory Audit, Verification, Commit & Vercel Deployment

**Files:**
- Modify: `audit-reports/file-inventory.csv`
- Modify: `resource-index.json`

- [ ] **Step 1: Update File Inventory & Hashes**
Run `node scripts/update_index.js` to index all new HTML, CSS, and JS showcase files with SHA-256 signatures.

- [ ] **Step 2: Run automated test suite**
Run `npm test` in `dashboard` to ensure all 25 unit/integration tests pass.

- [ ] **Step 3: Run production build**
Run `npm run build` in `dashboard` to ensure clean bundling with zero errors.

- [ ] **Step 4: Commit & push to GitHub**
```bash
git add .
git commit -m "feat: add 3D animated interactive showcases for all 7 KTU subjects with demos, quizzes, games, and career guides"
git push origin main
```

- [ ] **Step 5: Deploy to Vercel production**
Run `npx --yes vercel --prod --yes` and verify HTTP 200 on `https://dashboard-eta-ashen-67.vercel.app` and all `/subjects/*.html` routes.
