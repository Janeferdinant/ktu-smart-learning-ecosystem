# KTU Smart Learning Ecosystem

> **APJ Abdul Kalam Technological University (KTU) — Computer Science and Engineering**  
> **Faculty Lead:** Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)  
> **License:** Academic & Educational Open Access

---

## 🎯 What is the Use of this Repository?

The **KTU Smart Learning Ecosystem** transforms academic engineering repositories into an all-in-one, interactive learning and teaching platform for KTU B.Tech students and faculty.

### For Engineering Students
- **Exam Preparation & High Scores:** Instant access to 12 official KTU University Question Papers (2018–2022), 5 model question paper sets (PCCST501 standard), and official evaluation schemes with step-by-step scoring keys.
- **Module-Wise Mastery:** Structured lecture notes, diagrams, and key topic breakdowns covering the complete KTU 2019 Scheme syllabus for core subjects (Computer Networks, OOP with Java, AI, Data Mining, Robotics, Software Project Management).
- **Interactive Assessments:** Self-paced quizzes with immediate explanations, code-output predictions, debugging exercises, and score analytics.
- **Visual & Experimental Learning:** Step-by-step 3D Neural Network visualizations (Three.js), OSPF vs. RIPv2 packet routing simulations, CPU scheduling Gantt calculators, and a client-side SQL playground.
- **Concept Discovery & Prerequisite Maps:** An interactive Knowledge Graph mapping connections between core theory, prerequisites, lab experiments, IEEE research papers, and career outcomes.
- **Career & Placement Readiness:** Verified IEEE research papers with permanent DOIs, real-world industry applications, skill-gap analysis, and compensation benchmarks.

### For Faculty Members
- **Validated 46-Hour Teaching Plans:** Automated, session-by-session teaching plans mathematically calibrated to exactly 46.0 teaching hours per subject, featuring syllabus mapping, pedagogical methods, and 1-click SheetJS Excel (`.xlsx`) export.
- **Light-Themed PowerPoint Slide Generation:** High-resolution, editable presentation decks (`.pptx`) generated client-side using PptxGenJS in a clean academic light theme with official faculty footer branding.
- **Resource Management & Auditability:** Complete SHA-256 file inventory, duplicate detection reports, and automated indexing across all academic assets.

### For Young Learners (Early Learning Mode)
- **Age-Adaptive STEM Games (Age 5):** Interactive mini-games (*Pattern Garden*, *Robot Path Adventure*, *Shape & Color Lab*, *Memory Match*, *Build-a-Computer*) that introduce foundational computational thinking using analogies, Web Speech narration, and a parent/teacher PIN gate.

---

## 💎 Key Features & Technology Highlights

| Feature | Description |
|---|---|
| **📜 Master Prompt Blueprint** | Comprehensive architecture specification documented in [`MASTER_PROMPT.md`](file:///c:/Users/Asus/Downloads/ktu/MASTER_PROMPT.md). |
| **🚀 3D Animated Subject Showcases** | Standalone HD/4K interactive showcases for every subject code with realtime demos, applications, quizzes, knowledge graphs, minigames, career & payscale guides, numerical solvers, and solved KTU PYQs. |
| **🎨 10 Selectable Liquid Glass Themes** | Light/Dark mode with 10 customizable glass styles (*Light Liquid Glass, Dark Liquid Glass, Iridescent, Frosted, Crystal, Aurora, Soft Pastel, Burgundy, Ocean, Minimal Academic*). |
| **📊 Validated 46-Hour Teaching Plans** | Exact 46-hour session breakdown, interactive completion tracker, and SheetJS Excel spreadsheet generator. |
| **📑 Light-Theme PowerPoint Slides** | Editable `.pptx` presentations generated client-side via PptxGenJS with strict Light Theme enforcement. |
| **🧠 Interactive Knowledge Graph** | SVG/Canvas visual network mapping subjects, modules, prerequisites, virtual labs, and career pathways. |
| **⚡ Virtual Labs & 3D Simulations** | Real-time interactive simulators: Three.js 3D Neural Net, Dijkstra OSPF vs. Bellman-Ford RIPv2 routing, CPU scheduling, and SQL query sandbox. |
| **📝 Comprehensive Assessment Center** | Multi-topic question bank with MCQs, code-output, negative marking, timer controls, and review modes. |
| **🧸 Early Learning Mode (Age 5)** | Speech synthesis narration, visual reward garden, and secure parent/teacher math PIN gate. |
| **📄 Authentic IEEE Research Papers** | Verified papers from IEEE Transactions with active DOI links, methodology outlines, and student project ideas. |

---

## 📂 Repository Architecture

```
ktu/
├── README.md                                # Ecosystem overview, documentation & deployment guide
├── resource-index.json                      # Comprehensive JSON index of all cataloged academic resources
├── vercel.json                              # Production Vercel deployment configuration
│
├── audit-reports/                           # Data integrity and deduplication reports
│   ├── file-inventory.csv                   # SHA-256 hash inventory of all 153 repository files
│   ├── duplicate-report.csv                 # Detailed audit of exact byte duplicate groups
│   ├── validation-report.md                 # Academic audit & syllabus mapping validation report
│   └── final-audit-report.md                # Comprehensive system audit report
│
├── subjects/                                # Reorganized KTU academic subjects
│   ├── cst303-computer-networks/            # S5 B.Tech CSE (4 Credits)
│   │   ├── modules/ (module-01 to 05)       # Module notes, presentations, question banks
│   │   ├── question-papers/                 # Previous year, model papers, and official schemes
│   │   ├── teaching-plan/                   # Validated 46-hour teaching schedule & lesson plans
│   │   ├── laboratory/                      # OSPF & RIPv2 routing lab documentation
│   │   └── industry-applications/           # Real-world project reports (e.g. MOGO project)
│   ├── cst205-object-oriented-programming/  # S3 B.Tech CSE (4 Credits) — 36 authentic lecture decks
│   ├── cst305-artificial-intelligence/      # Textbooks & foundational references
│   ├── cst307-data-mining/                  # Association rule & FP-growth mining modules
│   ├── embedded-systems-stm32/              # Mastering STM32 hardware and architecture notes
│   ├── pcadt502-robotics/                   # Robotics & automation lecture materials
│   └── pecst521-software-project-management/# Agile, SCRUM, and SPM curriculum resources
│
├── shared-assets/                           # Shared documentation, certificates, and media
│   ├── career-certifications/               # NVIDIA AI Operations & MCP interview guides
│   └── documents/                           # Supplementary university circulars
│
└── dashboard/                               # Production Web Application (React 18 + Vite + TS)
    ├── package.json                         # Dependencies (Lucide, PptxGenJS, XLSX, Three, Tailwind)
    ├── vite.config.ts                       # Vite build configuration
    ├── tailwind.config.js                   # Liquid Glass theme design tokens
    └── src/
        ├── components/                      # UI components (Header, Sidebar, Footer, ThemeSelector)
        │   ├── games/                       # 5 Early Learning educational games
        │   └── simulations/                 # 3D Neural Net, Routing, CPU scheduling, SQL sandbox
        ├── context/                         # ThemeContext (10 glass themes + light/dark mode)
        ├── data/                            # Academic data, teaching plans, quiz bank, research papers
        ├── pages/                           # 16 main learning dashboard pages & views
        └── services/                        # PptxGenJS generator, SheetJS Excel export, Web Speech
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18.x or higher (Node 24.x supported)
- **npm**: Version 9.x or higher

### Local Development Setup

1. Clone or open the repository:
   ```bash
   git clone https://github.com/Janeferdinant/ktu-smart-learning-ecosystem.git
   cd ktu-smart-learning-ecosystem
   ```

2. Navigate into the dashboard directory and install dependencies:
   ```bash
   cd dashboard
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

### Running Tests
To verify test suites (including 46-hour math validation, PPTX generation, and theme switcher):
```bash
npm run test
```

### Production Build
```bash
npm run build
```
The optimized bundle will be compiled into `dashboard/dist/`.

---

## 🌐 Deployment to Vercel

This repository includes a pre-configured `vercel.json` at the root for seamless one-command deployment:

```bash
# From the repository root:
npx vercel --prod
```

Or deploy directly from the `dashboard/` subfolder:
```bash
cd dashboard
npx vercel --prod
```

---

## 🏛️ Academic Leadership & Citation

```
Jane Rose
Assistant Professor, Department of Computer Science and Engineering (CSE)
APJ Abdul Kalam Technological University (KTU)
```

*For educational inquiries, academic curriculum contributions, or collaborative research, refer to the institution faculty directory.*
