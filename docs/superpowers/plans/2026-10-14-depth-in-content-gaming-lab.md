# Depth in Content — Multi-Age Gaming Lab (Ages 10, 12, 15, 18, 21) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the Multi-Age Gaming Lab into an intellectually profound, mathematically rigorous, and syllabus-grounded academic platform across all 5 age tiers (Ages 10, 12, 15, 18, 21), incorporating complete curriculum modules, formal algorithm proofs, solved KTU numerical problems, real-time formula workbenches, and viva voce interview question banks.

**Architecture:**
1. Deep Academic & Mathematical Data Model (`dashboard/src/data/gamingLabData.ts`):
   - Formal mathematical derivations, State Machines, Boolean algebras, Forward Kinematics DH models, VLSM subnetting formulas, Banker's Algorithm safety vectors, and CPM PERT float equations.
   - Solved numerical examples with detailed step-by-step calculations and intermediate values.
   - Viva Voce / Technical Interview questions with faculty model answers.
2. Rich Multi-Tab Academic Hub (`dashboard/src/pages/GamingLab.tsx`):
   - Tab 1: **Interactive Simulation Game** (Canvas/Simulator)
   - Tab 2: **Deep Theoretical Foundations** (Derivations, Complexity, Invariants)
   - Tab 3: **Solved KTU Numerical Problem** (Step-by-step worked calculation)
   - Tab 4: **Realtime Interactive Formula Workbench** (Interactive calculators for each tier)
   - Tab 5: **Viva Voce & Technical Mastery** (Interview Q&A with faculty explanations)
   - Tab 6: **Enterprise Architecture Case Study** (Real-world industrial systems)
3. Standalone HTML Showcase Mirror (`dashboard/public/gaming-lab.html` and `subjects/common/gaming-lab.html`):
   - Full depth integration in offline-capable standalone HTML files with sound synthesis and glassmorphism styling.
4. Comprehensive Automated Vitest Test Suite (`dashboard/src/tests/GamingLab.test.ts`):
   - Verifying all 5 tiers have complete academic, numerical, theoretical, and viva voce modules.
   - Verifying zero student PII and mandatory faculty branding.
5. Re-indexing, build, commit, and Vercel production deployment.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide icons, Vitest, HTML5 Canvas, Web Audio API.

## Global Constraints
- **Faculty Branding:** Permanent requirement: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`.
- **Zero Student PII:** Absolute prohibition on real student names or KTU register numbers in any file or test.
- **Deep Academic Rigor:** No hand-waving or trivial summaries. Every tier must have formal math, solved numerical calculation, and syllabus mapping.
- **Flawless Responsiveness:** Glassmorphism UI tokens working seamlessly on mobile, tablet, and 4K displays.

## Review Focus
1. **Mathematical Consistency:** All formulas ($X, Y$ kinematics, VLSM host counts $2^h - 2$, Dijkstra edge relaxation, CPM $TF = LS - ES$) must be mathematically verified and numerically exact.
2. **Interactive Workbench Accuracy:** Interactive calculator inputs must react dynamically and produce validated outputs without NaN or divide-by-zero crashes.
3. **Vitest Test Coverage:** Every tier's data contract must be asserted in unit tests.
4. **Offline HTML Parity:** `gaming-lab.html` must mirror the rich tabs and depth in content present in the React dashboard.
5. **Clean Production Build:** Zero TypeScript compiler errors or Vite build failures.

---

### Task 1: Enrich `gamingLabData.ts` with Rigorous Academic & Numerical Depth

**Files:**
- Modify: `dashboard/src/data/gamingLabData.ts`

- [ ] **Step 1: Define comprehensive TypeScript interfaces**
  Define `AcademicFramework`, `MathematicalDerivation`, `SolvedNumericalExample`, `InteractiveWorkbenchConfig`, and `VivaVoceQuestion` interfaces.
- [ ] **Step 2: Implement deep content for Age 10 (Algorithm Rover)**
  Add FSM formalisms, Big-O loop complexity, step-by-step battery depletion calculation, and viva voce questions.
- [ ] **Step 3: Implement deep content for Age 12 (Logic Gate Defender)**
  Add Boolean algebra theorems, De Morgan's proofs, Full Adder equations, solved K-map minimization numerical problem, and viva voce questions.
- [ ] **Step 4: Implement deep content for Age 15 (OOP & 2-DOF Robot Arm)**
  Add VTable dynamic dispatch internals, DH parameters, Forward Kinematics trigonometric derivation, Jacobian singularity condition, link coordinate numerical calculation, and viva voce questions.
- [ ] **Step 5: Implement deep content for Age 18 (Subnet Slicer & Dijkstra Rush)**
  Add VLSM mathematical derivations, Dijkstra edge relaxation formal pseudocode, 4-department VLSM subnet allocation numerical problem with full network/broadcast tables, and viva voce questions.
- [ ] **Step 6: Implement deep content for Age 21 (Deadlock Breaker & CPM Project Command)**
  Add Coffman's conditions, Banker's algorithm safety equation, CPM forward/backward pass equations, 6-activity CPM schedule numerical problem with float calculations and critical path identification, and viva voce questions.

---

### Task 2: Build the Multi-Tab Academic Hub in `GamingLab.tsx`

**Files:**
- Modify: `dashboard/src/pages/GamingLab.tsx`

- [ ] **Step 1: Add Tab Navigation state and UI**
  Add tabs: "Interactive Simulation", "Theoretical Foundations", "Solved KTU Numerical", "Interactive Formula Workbench", "Viva Voce & Interview", "Enterprise Architecture".
- [ ] **Step 2: Render Deep Theoretical Foundations**
  Display formal algorithms, Big-O complexities, mathematical formulas, and derivations.
- [ ] **Step 3: Render Solved KTU Numerical Calculation**
  Display question statement, given data table, step-by-step worked steps, and final highlighted result.
- [ ] **Step 4: Build Realtime Interactive Formula Workbenches**
  - Age 10: Step Complexity & Battery Depletion Calculator.
  - Age 12: 3-Input Boolean Gate & Truth Table Generator.
  - Age 15: 2-DOF Kinematic $(X, Y)$ & Singularity Determinant Solver.
  - Age 18: CIDR / VLSM Subnet Sizing & Host Range Calculator.
  - Age 21: CPM Float & Critical Path Network Calculator.
- [ ] **Step 5: Render Viva Voce Q&A and Enterprise Case Studies**
  Display technical interview questions with expandable model answers and real-world system architecture breakdowns.

---

### Task 3: Mirror Deep Content in `gaming-lab.html` and `subjects/common/gaming-lab.html`

**Files:**
- Modify: `dashboard/public/gaming-lab.html`
- Create/Modify: `subjects/common/gaming-lab.html`

- [ ] **Step 1: Update `dashboard/public/gaming-lab.html` with tabs and rich academic depth**
  Add tab controls for Theory, Solved Numerical, Interactive Calculator, and Viva Voce.
- [ ] **Step 2: Copy updated file to `subjects/common/gaming-lab.html`**
  Ensure identical offline experience for the subject catalog.

---

### Task 4: Unit Testing & Verification

**Files:**
- Create: `dashboard/src/tests/GamingLab.test.ts`

- [ ] **Step 1: Write comprehensive Vitest test suite**
  Assert all 5 tiers have valid `academicFramework`, `solvedNumericalExample`, `deepTheory`, `vivaVoceQuestions`, and `interactiveWorkbench`. Assert zero PII and verify faculty branding string.
- [ ] **Step 2: Run test suite**
  Run `npm test -- --run` to verify 100% pass rate.
- [ ] **Step 3: Run production build**
  Run `npm run build` in `dashboard` to confirm zero TypeScript compilation errors.

---

### Task 5: Re-indexing, Commit, Push, and Vercel Deployment

**Files:**
- Modify: `audit-reports/file-inventory.csv`
- Modify: `resource-index.json`
- Modify: `MASTER_PROMPT.md`

- [ ] **Step 1: Re-index workspace inventory**
  Run python re-indexing script.
- [ ] **Step 2: Commit and push to GitHub**
  Commit all changes with clear descriptive message.
- [ ] **Step 3: Deploy to Vercel Production**
  Execute `npx --yes vercel --prod --yes` and verify HTTP 200 on live endpoints.
