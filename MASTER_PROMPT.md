# ANTIGRAVITY MASTER PROMPT — KTU SMART LEARNING ECOSYSTEM

## 1. Project Goal & Vision

Analyze, clean, reorganize, and transform the complete `ktu` repository into an ultra-premium, interactive educational ecosystem for KTU (APJ Abdul Kalam Technological University) engineering subjects.

The platform provides a dual-audience learning and teaching experience:
1. **Professional Faculty Environment:** 46-hour accredited teaching plans, lecture notes, syllabus mapping, question banks, answer keys, downloadable light-theme module slides, research publications, and curriculum governance.
2. **Interactive Student Learning Hub:** Standalone 3D animated web showcases for every subject code featuring real-time simulators, industrial case studies, adaptive quizzes, dynamic knowledge graphs, educational minigames, salary & career roadmaps, step-by-step numerical calculation solvers, and verified KTU previous-year exam solutions.

---

## 2. Global Aesthetics & Design Standards

### Visual Quality & Resolution
- **HD & 4K Retina Optimization:** Modern typography scaled for ultra-high-definition displays (Google Fonts: *Outfit*, *Plus Jakarta Sans*, and *JetBrains Mono*).
- **3D Visualizations & Motion Graphics:** Real-time WebGL/Canvas 3D geometries, interactive floating particle networks, orbital physics, smooth GPU-accelerated CSS animations (`@keyframes`), and reactive micro-interactions.

### Comprehensive Glassmorphism Palette
Every component, card, and panel implements advanced glassmorphism with dynamic theme switching across 6 glass varieties:
1. **Liquid Glass:** Refractive glass with animated fluid chromatic sheen, specular light borders, and depth blurring.
2. **Aurora Glass:** Vibrant ambient multi-color mesh gradient blooming behind frosted glass panels.
3. **Frosted Glass:** Crisp, clean Scandinavian glass aesthetics (`backdrop-filter: blur(16px)` with soft daylight luminescence).
4. **Neon Cyber Glass:** High-contrast cyber-glow with cyan/magenta/emerald neon borders, dark smoky tint, and terminal typography.
5. **Deep Obsidian Glass:** Smoked volcanic glass with deep charcoal tones, gold/emerald accents, and minimal sleek reflections.
6. **Holographic Glass:** Prismatic iridescent refraction with shifting gradient angles.

### Mandatory Faculty Branding Footer
All pages, templates, showcases, and modules must display the official faculty credential footer:
```html
<footer class="faculty-footer">
  <div class="footer-container">
    <div class="faculty-badge">
      <span class="faculty-name">Jane Rose</span>
      <span class="faculty-title">Assistant Professor</span>
      <span class="faculty-dept">Department of Computer Science and Engineering (CSE)</span>
    </div>
    <p class="copyright-text">KTU Smart Learning Ecosystem © 2026. Designed for Academic Excellence.</p>
  </div>
</footer>
```

### Privacy & Security Policy
- **Zero Student PII:** Absolute prohibition against personal student names, university register numbers (e.g., `SNM...`, `RET...`), or sensitive contact info. All learner data must use generic tokens (`Student 101`, `Student 102`).

---

## 3. Curriculum & Subject Codes Covered

The ecosystem encompasses core engineering, computer science, and emerging interdisciplinary courses:

| Subject Code | Subject Name | Semester & Branch |
| :--- | :--- | :--- |
| **CST205** | Object Oriented Programming in Java | S3 Computer Science & Engineering |
| **CST303** | Computer Networks | S5 Computer Science & Engineering |
| **CST305** | Artificial Intelligence | S5 Computer Science & Engineering |
| **CST307** | Data Mining | S5 Computer Science & Engineering |
| **EST-STM32** | Embedded Systems & STM32 Microcontrollers | S5/S6 Electronics & CSE |
| **PCADT502** | Robotics and Automation | S5 Artificial Intelligence & Robotics |
| **PECST521** | Software Project Management | S5 Computer Science & Engineering Elective |

---

## 4. Subject-Wise Interactive Animated HTML Showcase Specifications

For **each subject code**, build an animated, standalone, responsive HTML application (`interactive-showcase.html`) equipped with the following 8 integrated pillars:

### 1. Real-Time Interactive Demo
A hands-on, live-running simulator/visualizer:
- **CST205 (Java):** JVM Memory & Garbage Collection visualizer (Stack frames, Young/Old Gen Heap, Eden allocation).
- **CST303 (Networks):** Interactive Subnet Calculator & Dijkstra Shortest Path Packet Router simulator.
- **CST305 (AI):** A* Search heuristic grid pathfinder & 2-Layer Neural Network decision boundary visualizer.
- **CST307 (Data Mining):** Apriori Frequent Itemset miner & Interactive Decision Tree split visualizer.
- **EST-STM32 (Embedded):** ARM Cortex-M4 GPIO pin matrix toggle, register bitmasks, and PWM oscilloscope.
- **PCADT502 (Robotics):** 2-DOF Robotic Arm Forward and Inverse Kinematics interactive canvas.
- **PECST521 (SPM):** Critical Path Method (CPM) / PERT Schedule & Agile Sprint Burndown simulator.

### 2. Enterprise & Real-World Applications
Comprehensive industrial use-case breakdown showcasing architecture patterns, enterprise tooling, and case studies (e.g., AWS Cloud VPCs, high-frequency trading in Java, robotic surgery with da Vinci systems, medical diagnosis neural networks, banking fraud detection).

### 3. Interactive Exam Quiz
A 5-question multiple-choice knowledge check mirroring KTU examination standards with:
- Instant feedback and scoring
- In-depth technical explanations for every correct and incorrect answer
- Score badge and visual progress tracker

### 4. Dynamic Knowledge Graph
An interactive node-edge graph rendered via Canvas/SVG illustrating concept hierarchies, prerequisites, and relationships with hover tooltips and interactive node expansion.

### 5. Educational Mini-Game
An engaging, subject-specific mini-game:
- *Bytecode Catcher* (CST205)
- *Packet Router Defense* (CST303)
- *Turing Heuristic Maze* (CST305)
- *Pattern & Cluster Miner* (CST307)
- *STM32 Pin Master* (EST-STM32)
- *Kinematic Target Toucher* (PCADT502)
- *Agile Velocity Balancer* (PECST521)

### 6. Career Roles, Industry Paths & Payscale Guide
Detailed career roadmaps with:
- Primary and secondary job roles (e.g., Cloud Architect, AI Specialist, Robotics Engineer)
- Key industry skill requirements and standard certifications (AWS, Cisco, Oracle, ARM)
- Market salary ranges in Indian Rupees (INR LPA) and Global Dollars (USD $)
- Top domestic and international hiring companies

### 7. Step-by-Step Numerical Calculation Engine
An interactive calculator workbench with parameter sliders, real-time recalculation, and step-by-step mathematical derivations:
- *CST205:* Big-O time/space complexity & JVM heap allocation sizing
- *CST303:* CIDR Subnetting & CRC / Hamming Code error detection calculations
- *CST305:* Bayes' Theorem posterior probability & Alpha-Beta Minimax value calculations
- *CST307:* Support, Confidence, Lift & Information Gain / Gini Index calculations
- *EST-STM32:* Timer prescaler & reload frequency / USART Baud rate divisor calculations
- *PCADT502:* Denavit-Hartenberg (DH) Transformation Matrix & Joint torque calculations
- *PECST521:* COCOMO I & II Effort, Function Points, and Earned Value Management (EVM) calculations

### 8. Solved KTU Previous Year Question Paper (PYQ)
Actual KTU university exam questions solved with full step-by-step working:
- Mark breakdowns (Part A 3-mark conceptual questions & Part B 14-mark analytical problems)
- Code implementations, mathematical proofs, circuit/state diagrams, and KTU examiner tips.

---

---

## 5. Deployment & Continuous Integration

1. All interactive showcases are placed in both:
   - `subjects/<subject-folder>/interactive-showcase.html`
   - `dashboard/public/subjects/<subject-code>.html`
2. Showcases are linked into the main React/Vite dashboard navigation.
3. Every update is tracked with SHA-256 hashes in `audit-reports/file-inventory.csv`.
4. Automated test suites verify integrity (`npm test`).
5. Production bundle is deployed to Vercel at `https://dashboard-eta-ashen-67.vercel.app`.

---

## 6. Progressive STEM Gaming Laboratory (Ages 10 – 21+) & Academic Depth

A dedicated multi-age cognitive arcade translates abstract computer science and engineering principles into playable simulations across 5 developmental tiers, complemented by rigorous academic depth:

1. **Age 10 (Junior Explorers) — Algorithm Rover: Computational Logic Island**
   - *Curriculum Focus:* EST102 Programming & Problem Solving (Module 1).
   - *Mechanics:* Procedural command queueing (`MOVE`, `TURN_LEFT`, `TURN_RIGHT`, `COLLECT`), Manhattan taxicab metric, battery depletion invariants.
   - *Depth:* Deterministic finite state machine $\delta(S_t, I_t)$, loop invariants, solved Manhattan battery numerical, live step complexity workbench, and A* admissibility viva voce questions.

2. **Age 12 (Middle School Hackers) — Cyber Gate Defender: Boolean Network Matrix**
   - *Curriculum Focus:* CST203 Logic System Design (Module 1 & 2).
   - *Mechanics:* Interactive logic gates (AND, OR, XOR, NOT), truth table verification, packet checksum firewall routing.
   - *Depth:* Axiomatic Boolean algebra, Full Adder sum/carry derivations ($Sum = A \oplus B \oplus C_{in}$), solved SOP minimization ($F = C$), majority voting calculator workbench, and CMOS propagation delay viva voce questions.

3. **Age 15 (Pre-Engineering Apprentices) — Polymorphic Code Arena & 2-DOF Robot Arm**
   - *Curriculum Focus:* CST205 Java OOP (Module 2) & PCADT502 Robotics (Module 1).
   - *Mechanics:* Polymorphic tool attachment, 2-DOF planar joint angle sliders, Cartesian end-effector target acquisition.
   - *Depth:* Dynamic method dispatch via JVM vtables, Forward Kinematics trigonometric transformation ($X = L_1 \cos\theta_1 + L_2 \cos(\theta_1+\theta_2)$), Jacobian velocity matrix, singularity determinant ($\det(J) = L_1 L_2 \sin\theta_2$), solved numerical problem, and live reach workbench.

4. **Age 18 (Engineering Freshers) — Subnet Speed Slicer & Dijkstra Packet Rush**
   - *Curriculum Focus:* CST303 Computer Networks (Module 3) & CST305 AI (Module 1).
   - *Mechanics:* Real-time CIDR host allocation against the clock, dynamic link metric Dijkstra SPF router selection.
   - *Depth:* Variable Length Subnet Masking (VLSM) mathematical derivation ($2^h - 2$), Dijkstra edge relaxation proof by contradiction, 4-department worked allocation problem, live CIDR mask/host workbench, and negative edge bound viva voce questions.

5. **Age 21 (Senior / Grad Tech Leads) — Distributed Deadlock Command & CPM Scheduler**
   - *Curriculum Focus:* PECST521 Software Project Management & CST205 Java Concurrency.
   - *Mechanics:* Resource Allocation Graph (RAG) circular-wait cycle breaking via optimal victim preemption, CPM float buffer reallocation.
   - *Depth:* Coffman's 4 conditions, Banker's safety vector equation, CPM Forward/Backward pass equations, Total Float ($TF = LS - ES$) and Free Float ($FF = \min(ES_{succ}) - EF$), 6-activity solved critical path problem, live float workbench, and Two-Phase Locking (2PL) viva voce questions.

Each tier features 6 interactive companion tabs: **Interactive Simulation**, **Theoretical Foundations & Proofs**, **Solved KTU Numerical Problem**, **Realtime Formula Workbench**, **Viva Voce & Technical Mastery**, and **Enterprise Case Study**. Official faculty branding: `Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)`. Zero student PII.
