# Multi-Age Gaming Lab (Ages 10, 12, 15, 18, 21) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an in-depth, curriculum-grounded Gaming Lab for students across 5 developmental tiers (Ages 10, 12, 15, 18, 21) featuring playable educational games, deep conceptual breakdowns, interactive simulation mechanics, real-time scoring/analytics, glassmorphism UI, audio feedback, and official faculty branding.

**Architecture:**
1. Dedicated Gaming Lab Page Component (`dashboard/src/pages/GamingLab.tsx`) with age-tier navigation, interactive gameplay canvases, and deep curriculum companion modules.
2. Individual specialized interactive game engines:
   - **Age 10:** *Algorithm Rover (Logic & Sequencing)*
   - **Age 12:** *Cyber Gate Defender (Binary & Boolean Networks)*
   - **Age 15:** *Polymorphic Code Arena & Kinematic Arm (OOP & Robotics)*
   - **Age 18:** *Subnet Slicer & Dijkstra Packet Rush (Networks & AI Search)*
   - **Age 21:** *Distributed Deadlock Breaker & CPM Project Command (Systems & SPM)*
3. Standalone HTML showcase mirror: `dashboard/public/gaming-lab.html` and `subjects/common/gaming-lab.html` for local and external access.
4. Navigation integration in `Sidebar.tsx` and `App.tsx`.
5. Automated test coverage, inventory re-indexing, build validation, git commit, and Vercel deployment.

**Tech Stack:** React 18, TypeScript, HTML5 Canvas API, Web Audio API, Lucide icons, Tailwind CSS / Vanilla CSS Glassmorphism tokens.

## Global Constraints
- **Faculty Branding:** `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)` displayed across all game lab views.
- **Deep Curriculum Alignment:** Every game reflects KTU core syllabus themes (CST205, CST303, CST305, CST307, EST-STM32, PCADT502, PECST521) tuned appropriately for the age level.
- **Zero Student PII:** Purely anonymous player profiles (e.g., "Player-101", "Cadet-12").
- **Flawless Responsiveness:** Plays smoothly on mobile, tablet, and 4K desktop viewports.

---

### Task 1: Multi-Age Gaming Lab Data & Curriculum Models

**Files:**
- Create: `dashboard/src/data/gamingLabData.ts`

- [ ] **Step 1: Define age tiers and comprehensive curriculum content**
Define structured data for all 5 tiers (10, 12, 15, 18, 21) containing:
- Tier metadata (badge, title, age group, developmental focus, prerequisite level)
- Deep conceptual curriculum guides (syllabus mapping, core theory, real-world examples, formula breakdowns)
- Gameplay specifications (game name, mechanics, objectives, scoring metrics, tips)
- Career / skill relevance (how this game translates to software and hardware engineering careers)

---

### Task 2: Implement Age-Adaptive Game Engines

**Files:**
- Create: `dashboard/src/components/games/AlgorithmRoverGame.tsx` (Age 10)
- Create: `dashboard/src/components/games/LogicGateDefenderGame.tsx` (Age 12)
- Create: `dashboard/src/components/games/OopRoboArenaGame.tsx` (Age 15)
- Create: `dashboard/src/components/games/SubnetDijkstraRushGame.tsx` (Age 18)
- Create: `dashboard/src/components/games/DistributedDeadlockCommandGame.tsx` (Age 21)

- [ ] **Step 1: Build Age 10 Game (Algorithm Rover)**
Sequential visual command queue (`MOVE_FORWARD`, `TURN_LEFT`, `TURN_RIGHT`, `COLLECT_GEM`, `LOOP`), grid collision detection, step counter, and logic debugging.

- [ ] **Step 2: Build Age 12 Game (Logic Gate Defender)**
Interactive signal propagation through logic gates (AND, OR, NOT, XOR). Players toggle binary inputs (0/1) to match output requirements and prevent network packet drop.

- [ ] **Step 3: Build Age 15 Game (OOP Robo Arena)**
Combine object-oriented property allocation (Base Class, Derived Class, Overriding methods) with a 2-DOF kinematic arm positioning challenge.

- [ ] **Step 4: Build Age 18 Game (Subnet Slicer & Dijkstra Packet Rush)**
Real-time CIDR IP partitioning challenge against the clock + Dijkstra routing path selection through weighted network nodes.

- [ ] **Step 5: Build Age 21 Game (Distributed Deadlock Command & CPM Scheduler)**
Resource Allocation Graph (RAG) cycle detection and mutual exclusion unlocker + Critical Path Float balancer under tight budget constraints.

---

### Task 3: Gaming Lab Page Component & Navigation Integration

**Files:**
- Create: `dashboard/src/pages/GamingLab.tsx`
- Modify: `dashboard/src/components/Sidebar.tsx`
- Modify: `dashboard/src/App.tsx`

- [ ] **Step 1: Create `GamingLab.tsx`**
Build the master hub page featuring:
- Hero banner with age filter pills (All, Age 10, Age 12, Age 15, Age 18, Age 21)
- Active game container with high-res Canvas gameplay and controls
- In-depth Curriculum Companion panel explaining the exact academic theory behind the game mechanics
- Scoreboard, achievements, sound FX toggle, and faculty footer branding

- [ ] **Step 2: Update `Sidebar.tsx` and `App.tsx`**
Add `"gaming-lab"` route with an `Arcade` / `Gamepad2` icon and badge `"Ages 10–21"` into the navigation menu.

---

### Task 4: Standalone HTML Showcase for Gaming Lab

**Files:**
- Create: `dashboard/public/gaming-lab.html`
- Create: `subjects/common/gaming-lab.html`

- [ ] **Step 1: Build self-contained HTML arcade**
Package all 5 age games into a standalone glassmorphism HTML application with offline support, 3D particle background, and audio synthesizer.

---

### Task 5: Testing, Re-indexing, Commit, and Vercel Production Deployment

**Files:**
- Create: `dashboard/src/tests/GamingLab.test.ts`
- Modify: `audit-reports/file-inventory.csv`
- Modify: `resource-index.json`
- Modify: `README.md`
- Modify: `MASTER_PROMPT.md`

- [ ] **Step 1: Write and run unit tests**
Verify that all age-tier data models and game instances render and score correctly without errors.

- [ ] **Step 2: Build production bundle**
Run `npm run build` in `dashboard` to ensure clean TypeScript compilation.

- [ ] **Step 3: Update file inventory**
Run `reindex.py` to index new game files with SHA-256 signatures.

- [ ] **Step 4: Git commit and push**
Commit changes and push to `origin main`.

- [ ] **Step 5: Deploy to Vercel production**
Run `npx --yes vercel --prod --yes` and verify HTTP 200 on `https://dashboard-eta-ashen-67.vercel.app` and `/gaming-lab.html`.
