# KTU Smart Learning Ecosystem Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the raw KTU folder into an organized academic repository and build a responsive, production-grade Liquid Glass educational dashboard featuring 10 glass themes, real PPTX/Excel downloads in light theme, verified 46-hour teaching plans, interactive quizzes, knowledge graphs, 3D simulations, and an Early Learning game mode.

**Architecture:** The project organizes existing academic assets into a structured `ktu/subjects/` and `audit-reports/` hierarchy with full hash inventory and duplicate tracking. The web application is built inside `dashboard/` with React 18, TypeScript, Vite, and Tailwind CSS, featuring a centralized ThemeProvider (supporting 10 glass themes and decoupled dark/light modes), client-side PptxGenJS generation (enforcing light presentation themes), SheetJS for Excel teaching plans, Three.js for interactive 3D simulations, and Web Speech API for Early Learning narration.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React, PptxGenJS, SheetJS (xlsx), Three.js, Canvas API, Web Speech API, Vitest.

**Spec:** Antigravity Master Prompt — KTU Smart Learning Ecosystem.

## Global Constraints

- **Academic Integrity:** All subjects, question papers, schemes, and notes must reference the real files discovered in the KTU folder (CST303, CST205 Java, PCADT502, PECST521, CST305, CST307, STM32).
- **Presentation Light Theme:** All generated PowerPoint (.pptx) decks must strictly export in a dedicated LIGHT THEME by default, regardless of current dashboard glass/appearance mode.
- **Faculty Branding:** All pages, slides, teaching plans, and study documents must carry the official footer: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`.
- **Dynamic Date:** Current date must dynamically render using the local system date in `DD Month YYYY` format (e.g., `13 October 2026`).
- **Exact 46-Hour Schedule:** Every subject's teaching plan must mathematically validate to exactly 46 hours.
- **Safe Reorganization:** Existing files must be backed up or safely symlinked/mapped; duplicate removal must only target proven SHA-256 byte-for-byte duplicates after generating the audit report.

## Review Focus

1. **PowerPoint Theme Leakage:** Verify that generating PPTX slides while the dashboard is in Dark or Burgundy Glass mode still produces clean, high-contrast, pure light-themed presentations.
2. **Hour Calculation Drift:** Verify that the 46-hour teaching plans for all subjects sum to exactly 46 hours with zero calculation discrepancies.
3. **Audio Narration Browser Fallback:** Ensure Early Learning Mode gracefully handles browsers where SpeechSynthesis is restricted, muted, or unsupported without throwing errors.
4. **Duplicate Report Accuracy:** Verify that the SHA-256 duplicate report accurately identifies the 4 identical `MODULE 4 (1-4).pdf` copies (6,826,586 bytes) and provides a clean migration path.
5. **3D Canvas Cleanup:** Ensure Three.js canvas instances properly dispose geometries, materials, and animation frames when switching tabs to prevent memory leaks.

---

### Task 1: Repository Audit, Duplicate Detection, and Asset Reorganization

**Files:**
- Create: `audit-reports/file-inventory.csv`
- Create: `audit-reports/duplicate-report.csv`
- Create: `audit-reports/validation-report.md`
- Create: `resource-index.json`
- Create: `README.md`
- Test: `tests/audit-verification.test.js`

**Interfaces:**
- Produces: `resource-index.json` containing complete metadata on subjects, modules, question papers, schemes, notes, and PPTs.

- [ ] **Step 1: Write automated audit and inventory script**
  Run Node.js script to hash all 79 files with SHA-256, categorize into subjects (CST303, CST205 Java, PCADT502 Robotics, PECST521 SPM, CST305 AI, CST307 Data Mining, STM32), and identify duplicates.

- [ ] **Step 2: Generate audit reports**
  Export `audit-reports/file-inventory.csv`, `audit-reports/duplicate-report.csv`, and `audit-reports/validation-report.md`. Document the 4 duplicate copies of `MODULE 4.pdf` (6,826,586 bytes each) and the size comparison of question papers.

- [ ] **Step 3: Organize directory structure safely**
  Create structured subject directories under `subjects/cst303-computer-networks/`, `subjects/cst205-object-oriented-programming/`, `subjects/pcadt502-robotics/`, `subjects/pecst521-software-project-management/`, and `shared-assets/`. Retain backups and generate `resource-index.json` with mapping from legacy paths to structured paths.

- [ ] **Step 4: Verify audit outputs**
  Verify that all 79 files are accounted for, no data is lost, and `resource-index.json` is valid JSON.

---

### Task 2: Dashboard Project Scaffolding & Glassmorphism Theme System

**Files:**
- Create: `dashboard/package.json`
- Create: `dashboard/vite.config.ts`
- Create: `dashboard/tailwind.config.js`
- Create: `dashboard/src/index.css`
- Create: `dashboard/src/types/theme.ts`
- Create: `dashboard/src/context/ThemeContext.tsx`
- Create: `dashboard/src/components/ThemeSelector.tsx`
- Test: `dashboard/src/tests/ThemeContext.test.tsx`

**Interfaces:**
- Produces: `useTheme()` hook providing `{ currentGlassTheme, appearanceMode, setGlassTheme, setAppearanceMode }`.
- Supports 10 Glass Themes: `light-liquid`, `dark-liquid`, `iridescent`, `frosted`, `crystal`, `aurora`, `soft-pastel`, `burgundy`, `ocean`, `minimal-academic`.
- Supports 2 Appearance Modes: `light`, `dark`.

- [ ] **Step 1: Initialize Vite React TypeScript application**
  Configure Vite, Tailwind CSS, Lucide icons, and PostCSS inside `dashboard/`.

- [ ] **Step 2: Implement Glass Design System in `index.css`**
  Define CSS custom variables and backdrop filters for specular highlights, chromatic aberration borders, refractive blurs, and surface elevations across all 10 glass themes.

- [ ] **Step 3: Implement `ThemeContext.tsx` with localStorage persistence**
  Provide reactive state and persistence for theme style and appearance mode.

- [ ] **Step 4: Build interactive `ThemeSelector.tsx` component**
  Render dropdown/modal allowing instant preview and switching between all 10 glass themes and light/dark modes.

- [ ] **Step 5: Verify theme switching**
  Verify that selecting each theme visibly alters the CSS custom variables, gradients, and backgrounds.

---

### Task 3: Core Navigation, Subject Explorer, and Dynamic Header/Footer

**Files:**
- Create: `dashboard/src/types/academic.ts`
- Create: `dashboard/src/data/academicData.ts`
- Create: `dashboard/src/components/Header.tsx`
- Create: `dashboard/src/components/Sidebar.tsx`
- Create: `dashboard/src/components/Footer.tsx`
- Create: `dashboard/src/pages/SubjectExplorer.tsx`
- Test: `dashboard/src/tests/SubjectExplorer.test.tsx`

**Interfaces:**
- Produces: Dynamic layout shell with active section routing across all 16 ecosystem modules.
- Footer displays: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)` with dynamic `DD Month YYYY` date.

- [ ] **Step 1: Define academic TypeScript interfaces**
  Define models for `Subject`, `Module`, `Resource`, `QuestionPaper`, `TeachingPlanSession`, `QuizQuestion`, `ResearchPaper`, and `CareerPathway`.

- [ ] **Step 2: Populate `academicData.ts` from `resource-index.json`**
  Link the real KTU files (CST303, CST205 Java with 36 PPTs, PCADT502, PECST521, CST305, etc.) with verified syllabi and regulations.

- [ ] **Step 3: Build Header, Sidebar, and Footer**
  Implement responsive sidebar with 16 functional tabs, search bar, regulation filters (KTU 2019 / 2024 Scheme), and official faculty footer.

- [ ] **Step 4: Verify navigation and dynamic date**
  Verify header and footer render current formatted date and switch views seamlessly.

---

### Task 4: Module-Wise Learning Hub, Notes, Question Papers & Scheme Solutions

**Files:**
- Create: `dashboard/src/pages/ModuleLearning.tsx`
- Create: `dashboard/src/pages/QuestionPaperBank.tsx`
- Create: `dashboard/src/pages/AnswerKeySolutions.tsx`
- Create: `dashboard/src/components/PdfViewerModal.tsx`
- Test: `dashboard/src/tests/QuestionPaperBank.test.tsx`

**Interfaces:**
- Consumes: `academicData.ts`.
- Displays real question papers (Dec 2022, Dec 2021, April 2018, May 2019, Model Sets 1-5, Scheme 1 Draft Solutions) with filter by year, module, and examination type.

- [ ] **Step 1: Build `ModuleLearning.tsx`**
  Render module breakdown (Modules 1-5) for each subject with topic checklists, lecture notes, and textbook links.

- [ ] **Step 2: Build `QuestionPaperBank.tsx`**
  Render searchable table of university question papers, series question banks, and model papers with direct download and preview actions.

- [ ] **Step 3: Build `AnswerKeySolutions.tsx`**
  Present official evaluation schemes, mark distributions, step-by-step solutions, and draft answer schemes from `CST303-DRAFT SCHEME1.pdf` and `B2 CST303 CN QP SCHEME1-Dec 2022.pdf`.

- [ ] **Step 4: Verify question paper and scheme functionality**
  Verify all filters and preview triggers work without errors.

---

### Task 5: Downloadable Light-Theme PowerPoint Generator (PptxGenJS)

**Files:**
- Create: `dashboard/src/services/pptxGenerator.ts`
- Create: `dashboard/src/pages/SlideDownloadCenter.tsx`
- Test: `dashboard/src/tests/pptxGenerator.test.ts`

**Interfaces:**
- Produces: `generateModulePresentation(subjectId: string, moduleId: number)` returning `.pptx` file.
- Enforces strict LIGHT THEME with academic typography, slide numbers, faculty footer branding, and structured slides (Objectives, Concept, Architecture, Algorithms, Examples, Summary, References).

- [ ] **Step 1: Implement PptxGenJS generation service**
  Configure slide master with pure white/soft cream background (`#FFFFFF`, `#F8FAFC`), navy headers (`#1E3A8A`), high-contrast body text (`#0F172A`), accent dividers (`#3B82F6`), and Jane Rose footer branding.

- [ ] **Step 2: Generate rich academic content for all modules**
  Build slide decks for Computer Networks (Module 1: Layering & Physical, Module 2: Data Link & MAC, Module 3: Network Layer & Routing OSPF/RIP, Module 4: Transport Layer TCP/UDP, Module 5: Application Layer HTTP/DNS) and Java OOP (Modules 1-5).

- [ ] **Step 3: Build `SlideDownloadCenter.tsx`**
  Provide one-click download buttons for individual module decks, full subject packs (zipped or batch), and printable handouts.

- [ ] **Step 4: Verify PPTX download validity**
  Test generation in browser, open PPTX, verify default light theme regardless of active dashboard glass theme.

---

### Task 6: Validated 46-Hour Teaching Plans & Excel/PDF Download Center

**Files:**
- Create: `dashboard/src/data/teachingPlans.ts`
- Create: `dashboard/src/services/excelGenerator.ts`
- Create: `dashboard/src/pages/TeachingPlanExplorer.tsx`
- Create: `dashboard/src/components/TeachingProgressTracker.tsx`
- Test: `dashboard/src/tests/teachingPlanValidation.test.ts`

**Interfaces:**
- Produces: Exactly 46 teaching sessions per subject with duration, module, topic, learning outcomes, teaching method, resources, assessment, and practical activity.
- Generates downloadable `.xlsx` spreadsheets using SheetJS.

- [ ] **Step 1: Construct 46-hour teaching schedule datasets**
  Build 46 sessions for CST303 Computer Networks, CST205 Java OOP, PCADT502 Robotics, and PECST521 Software Project Management.

- [ ] **Step 2: Write automated 46-hour mathematical validator**
  Unit test asserting `sum(durations) === 46.0` for every subject, with module hour breakdowns.

- [ ] **Step 3: Implement SheetJS Excel generator (`excelGenerator.ts`)**
  Export structured spreadsheet with session numbers, topics, outcomes, teaching methods, and faculty approval block.

- [ ] **Step 4: Build `TeachingPlanExplorer.tsx` and interactive tracker**
  Provide session checklist (planned / completed / pending), progress gauge, filter by module, and Excel/Print download buttons.

- [ ] **Step 5: Verify 46-hour validation and downloads**
  Ensure tests pass and Excel export generates valid `.xlsx` file.

---

### Task 7: Interactive Quiz & Examination Assessment Centre

**Files:**
- Create: `dashboard/src/data/quizQuestions.ts`
- Create: `dashboard/src/pages/AssessmentCenter.tsx`
- Create: `dashboard/src/components/QuizEngine.tsx`
- Test: `dashboard/src/tests/QuizEngine.test.tsx`

**Interfaces:**
- Produces: Interactive exam simulation with MCQ, multi-select, true/false, code-output prediction, debugging, negative marking toggle, timer, score analytics, and detailed explanations.

- [ ] **Step 1: Author comprehensive question bank from syllabus and PYQs**
  Include questions across Computer Networks, Java OOP, Robotics, and AI with difficulty levels (Beginner, Intermediate, Advanced) and KTU exam patterns.

- [ ] **Step 2: Implement `QuizEngine.tsx` component**
  Build question timer, randomized question option, instant answer feedback with explanation, score tracking, and flag-for-review feature.

- [ ] **Step 3: Implement Result Analytics & Revision Recommender**
  Display performance by module, list of incorrect questions with detailed rationale, and links back to corresponding module notes.

- [ ] **Step 4: Verify quiz interactions and scoring**
  Verify correct answer verification, score computation, and restart functionality.

---

### Task 8: Interactive Knowledge Graph Explorer

**Files:**
- Create: `dashboard/src/data/knowledgeGraphData.ts`
- Create: `dashboard/src/pages/KnowledgeGraphExplorer.tsx`
- Create: `dashboard/src/components/GraphCanvas.tsx`
- Test: `dashboard/src/tests/KnowledgeGraph.test.tsx`

**Interfaces:**
- Produces: Interactive SVG/Canvas knowledge network connecting subjects, modules, core concepts, prerequisites, equations, lab demos, research papers, and career roles.

- [ ] **Step 1: Define graph nodes and edges**
  Construct semantic network of KTU CS topics: OSI/TCP-IP, Routing Protocols, Socket Programming, JVM Internals, Swing Event Delegation, Kinematics, Heuristic Search, etc.

- [ ] **Step 2: Implement zoomable, draggable, interactive canvas**
  Support node selection, cluster filtering (by subject, module, difficulty), prerequisite path tracing, and direct link to notes.

- [ ] **Step 3: Verify graph search and navigation**
  Verify searching a keyword highlights relevant nodes and opens topic drawer.

---

### Task 9: Early Learning Mode (Age 5 Adaptive Educational Games)

**Files:**
- Create: `dashboard/src/pages/EarlyLearningMode.tsx`
- Create: `dashboard/src/components/games/PatternGarden.tsx`
- Create: `dashboard/src/components/games/RobotPathAdventure.tsx`
- Create: `dashboard/src/components/games/ShapeColorLab.tsx`
- Create: `dashboard/src/components/games/MemoryMatch.tsx`
- Create: `dashboard/src/components/games/BuildAComputer.tsx`
- Create: `dashboard/src/services/speechNarration.ts`
- Test: `dashboard/src/tests/EarlyLearningGames.test.tsx`

**Interfaces:**
- Produces: Dedicated child-friendly mode with 5 animated learning games, high contrast friendly UI, Web Speech API text-to-speech audio instructions, visual rewards, and parent/teacher exit gate.

- [ ] **Step 1: Implement `speechNarration.ts`**
  Provide safe wrapper around Web Speech API with pause, mute, replay, speech rate control, and fallback captions.

- [ ] **Step 2: Build 5 animated learning games**
  - Pattern Garden (data sequence recognition)
  - Robot Path Adventure (algorithmic step-by-step sequencing)
  - Shape & Color Lab (classification)
  - Memory Match (computer icon matching)
  - Build-a-Computer (drag-and-drop hardware components)

- [ ] **Step 3: Build child-safe shell with parent gate**
  Implement gentle celebration animations, virtual reward stars, and numeric pin gate to return to the engineering dashboard.

- [ ] **Step 4: Verify game logic, audio controls, and responsiveness**
  Verify each game completes, rewards play, and narration toggles work.

---

### Task 10: Topic-Specific 3D Visualizations, Motion Graphics & Virtual Labs

**Files:**
- Create: `dashboard/src/pages/Visualizations3D.tsx`
- Create: `dashboard/src/pages/VirtualLabs.tsx`
- Create: `dashboard/src/components/simulations/NeuralNetwork3D.tsx`
- Create: `dashboard/src/components/simulations/PacketRoutingSimulation.tsx`
- Create: `dashboard/src/components/simulations/CpuSchedulingLab.tsx`
- Create: `dashboard/src/components/simulations/SqlSandboxLab.tsx`
- Test: `dashboard/src/tests/Simulations.test.tsx`

**Interfaces:**
- Produces: Interactive 3D and canvas-based simulations with Play/Pause/Step controls, adjustable parameters, and step-by-step annotations.

- [ ] **Step 1: Build 3D Neural Network / Signal Propagation with Three.js**
  Interactive 3D view of interconnected layers, weights, activation pulses, and rotate/zoom controls.

- [ ] **Step 2: Build Real-Time Packet Routing Simulation**
  Visualize RIP vs OSPF shortest path Dijkstra calculation with node failures and routing table convergence.

- [ ] **Step 3: Build CPU Scheduling Virtual Lab**
  Simulate FCFS, SJF, Round Robin, and Priority scheduling with interactive Gantt chart, turnaround time, and waiting time calculator.

- [ ] **Step 4: Build SQL Sandbox & Java Swing Layout Sandbox**
  Interactive query execution on student/course dataset and live Swing layout preview.

- [ ] **Step 5: Verify simulation responsiveness and cleanup**
  Verify clean animation frame lifecycle and parameter adjustments.

---

### Task 11: Verified IEEE Research Explorer, Industry Applications & Career Explorer

**Files:**
- Create: `dashboard/src/data/researchData.ts`
- Create: `dashboard/src/data/industryCareerData.ts`
- Create: `dashboard/src/pages/ResearchExplorer.tsx`
- Create: `dashboard/src/pages/IndustryApplications.tsx`
- Create: `dashboard/src/pages/CareerSalaryExplorer.tsx`
- Test: `dashboard/src/tests/ResearchAndCareer.test.tsx`

**Interfaces:**
- Produces: Curated database of verified IEEE papers with real DOIs, authors, methodologies, and findings; real-world industry tools; and verified job roles with salary benchmarks.

- [ ] **Step 1: Curate verified IEEE papers for all KTU subjects**
  Include landmark papers: Cerf & Kahn (TCP/IP), Dijkstra (SPF routing), Java Memory Model (Manson et al.), SLAM algorithms for mobile robots, and FP-growth mining. Include real DOIs and links.

- [ ] **Step 2: Build `ResearchExplorer.tsx`**
  Display research problem, methodology, dataset, findings, limitations, and links to syllabus modules.

- [ ] **Step 3: Build `IndustryApplications.tsx` and `CareerSalaryExplorer.tsx`**
  Map subject concepts to enterprise stacks (AWS, Kubernetes, Cisco, Spring Boot, ROS, PyTorch), student project ideas, verified career roles (Network Architect, Java Backend Engineer, Robotics Engineer), salary ranges, and skills gap analysis.

- [ ] **Step 4: Verify search, filters, and external link integrity**
  Ensure all metadata and links render properly.

---

### Task 12: Faculty Resource Management, End-to-End Testing & Production Build

**Files:**
- Create: `dashboard/src/pages/FacultyManagement.tsx`
- Modify: `dashboard/src/App.tsx`
- Create: `dashboard/src/tests/E2EVerification.test.tsx`
- Create: `audit-reports/final-audit-report.md`

**Interfaces:**
- Produces: Complete production build, verified test suite, and final comprehensive audit documentation.

- [ ] **Step 1: Implement `FacultyManagement.tsx`**
  Faculty dashboard for course file compilation, syllabus coverage tracker, internal assessment marks entry, and batch export of course files.

- [ ] **Step 2: Assemble complete application routing and navigation in `App.tsx`**
  Wire all 16 ecosystem modules with seamless transitions, breadcrumbs, search, and responsive mobile drawer.

- [ ] **Step 3: Run full test suite and TypeScript validation**
  Execute `npm run build` and Vitest test suite to ensure zero compiler warnings, zero missing imports, and 100% build pass.

- [ ] **Step 4: Perform live browser verification**
  Launch dev server, verify light/dark themes, test PowerPoint generation, verify 46-hour plan downloads, test early learning games, and capture verification screenshots.

- [ ] **Step 5: Compile `audit-reports/final-audit-report.md`**
  Document complete deliverables, file manifests, test results, and faculty deployment guidelines.
