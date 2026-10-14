export interface AcademicFramework {
  courseCode: string;
  courseTitle: string;
  moduleNumber: string;
  topicName: string;
  bloomsTaxonomyLevel: string; // e.g., 'K3 (Apply)', 'K4 (Analyze)', 'K5 (Evaluate)'
  prerequisites: string[];
  creditWeight: number;
}

export interface MathematicalDerivation {
  title: string;
  context: string;
  latexFormulas: string[];
  derivationSteps: string[];
  invariantCondition: string;
}

export interface FormalAlgorithmSpec {
  name: string;
  pseudocode: string[];
  timeComplexity: string;
  spaceComplexity: string;
  bestCase: string;
  worstCase: string;
}

export interface SolvedNumericalStep {
  stepNumber: number;
  stepTitle: string;
  formulaUsed: string;
  calculation: string;
  intermediateResult: string;
}

export interface SolvedNumericalExample {
  problemStatement: string;
  givenData: Record<string, string | number>;
  stepByStepSolution: SolvedNumericalStep[];
  finalAnswer: string;
  engineeringTakeaway: string;
}

export interface InteractiveWorkbenchConfig {
  calculatorType: 'roverComplexity' | 'booleanMatrix' | 'kinematicsArm' | 'vlsmSubnetter' | 'cpmNetwork';
  title: string;
  formulaDisplay: string;
  defaultInputs: Record<string, number | string>;
}

export interface VivaVoceQuestion {
  questionNumber: number;
  question: string;
  answer: string;
  conceptTested: string;
}

export interface AgeTierGame {
  id: string;
  age: number;
  tierLabel: string;
  title: string;
  subtitle: string;
  curriculumCategory: string;
  subjectMapping: string;
  facultyMentor: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master';
  icon: string;
  colorGradient: string;
  badge: string;
  
  academicFramework: AcademicFramework;

  deepTheory: {
    coreConcept: string;
    whyItMatters: string;
    syllabusAnchor: string;
    keyFormulasOrRules: string[];
    mathematicalDerivation: MathematicalDerivation;
    formalAlgorithm: FormalAlgorithmSpec;
    realWorldAnalogy: string;
    industryApplication: string;
  };

  solvedNumericalExample: SolvedNumericalExample;
  interactiveWorkbench: InteractiveWorkbenchConfig;
  vivaVoceQuestions: VivaVoceQuestion[];

  gameplay: {
    objective: string;
    rules: string[];
    controls: string[];
    scoringSystem: string;
    pedagogicalOutcome: string;
  };
}

export const GAMING_LAB_TIERS: AgeTierGame[] = [
  // ==========================================
  // TIER 1: AGE 10 (JUNIOR EXPLORERS)
  // ==========================================
  {
    id: 'game-age-10',
    age: 10,
    tierLabel: 'Age 10 — Junior Explorers',
    title: 'Algorithm Rover: Computational Logic Island',
    subtitle: 'Master deterministic sequencing, bounded loops, and conditional obstacle evasion',
    curriculumCategory: 'Foundational Algorithms & Procedural Logic',
    subjectMapping: 'KTU Foundations of Computing & Algorithmic Thinking',
    facultyMentor: 'Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)',
    difficulty: 'Beginner',
    icon: 'Bot',
    colorGradient: 'from-emerald-500 to-teal-600',
    badge: 'Logic & Sequencing',
    academicFramework: {
      courseCode: 'EST102',
      courseTitle: 'Programming & Algorithmic Problem Solving',
      moduleNumber: 'Module 1',
      topicName: 'Procedural Decomposition, Deterministic Flow & State Transitions',
      bloomsTaxonomyLevel: 'K3 (Apply)',
      prerequisites: ['Basic arithmetic', 'Spatial directional awareness (North, South, East, West)'],
      creditWeight: 3
    },
    deepTheory: {
      coreConcept: 'Algorithmic Thinking & Deterministic State Machine Transitions',
      whyItMatters: 'Computers do not guess human intent; they execute exact instructions in strict temporal order. Understanding state transitions, loop termination invariants, and conditional branches (IF/THEN/ELSE) constructs the foundational cognitive architecture for all future software engineering and robotics.',
      syllabusAnchor: 'EST102 Module 1: Algorithms, Flowcharts, and Structured Program Execution',
      keyFormulasOrRules: [
        'Deterministic State Function: S(t + 1) = δ(S(t), I(t)), where S is state and I is instruction.',
        'Manhattan Grid Distance: D_M = |x_target - x_rover| + |y_target - y_rover|.',
        'Battery Depletion Invariant: Battery(k) = B_initial - (k · c_step + m · c_turn) ≥ 0.',
        'Loop Termination Condition: WHILE (x ≠ x_goal ∨ y ≠ y_goal) DO Move();'
      ],
      mathematicalDerivation: {
        title: 'State Transition Automaton & Battery Conservation Bound',
        context: 'A grid rover operating on a finite 2D Cartesian lattice Z² with orientation θ ∈ {0°, 90°, 180°, 270°}.',
        latexFormulas: [
          'State: Q = (x, y, θ, B) ∈ {0..W-1} × {0..H-1} × {0, 90, 180, 270} × ℝ⁺',
          'Transition: δ((x, y, θ, B), MOVE) = (x + cos(θ), y + sin(θ), θ, B - 1)',
          'Lower Bound Steps: N_min = |x_g - x_0| + |y_g - y_0|'
        ],
        derivationSteps: [
          'Step 1: On an obstacle-free grid, each forward movement changes either x or y by exactly ±1 unit.',
          'Step 2: By the triangle inequality on taxicab metric spaces, the minimum steps required to traverse from (x0, y0) to (xg, yg) is strictly D_M = |xg - x0| + |yg - y0|.',
          'Step 3: Rotations change orientation θ by ±90° with step cost 0 on Cartesian position, but consume 1 energy unit.',
          'Step 4: Energy conservation requires B_initial ≥ D_M · Cost_move + N_turns · Cost_turn. If B_initial is less, task is infeasible without intermediate recharging gems.'
        ],
        invariantCondition: 'At any execution step k, rover coordinate (x_k, y_k) must lie inside grid bounds without overlapping obstacle cells: (x_k, y_k) ∉ Obstacles.'
      },
      formalAlgorithm: {
        name: 'Deterministic Sequential Rover Execution Engine',
        pseudocode: [
          'Initialize Rover at (x0, y0, θ0) with Battery B = 100',
          'Let InstructionQueue = [I_1, I_2, ..., I_n]',
          'FOR each instruction I in InstructionQueue DO:',
          '   IF Battery <= 0 THEN HALT("Battery Exhausted - Mission Failed")',
          '   IF I == MOVE THEN:',
          '       (x_next, y_next) = (x + cos(θ), y + sin(θ))',
          '       IF IsObstacle(x_next, y_next) THEN HALT("Collision Warning!")',
          '       (x, y) = (x_next, y_next); Battery = Battery - 1',
          '   ELSE IF I == TURN_LEFT THEN θ = (θ - 90) mod 360',
          '   ELSE IF I == TURN_RIGHT THEN θ = (θ + 90) mod 360',
          '   ELSE IF I == COLLECT THEN GemCount = GemCount + 1',
          'END FOR',
          'IF (x, y) == (x_goal, y_goal) THEN RETURN SUCCESS ELSE RETURN INCOMPLETE'
        ],
        timeComplexity: 'O(N) where N is the number of queued instructions.',
        spaceComplexity: 'O(N) for storing the instruction queue.',
        bestCase: 'O(D_M) minimal instructions matching Manhattan distance exactly.',
        worstCase: 'O(N) execution before battery exhaustion or obstacle collision.'
      },
      realWorldAnalogy: 'Writing a cake baking recipe: If you bake the cake before mixing flour and eggs, the system fails. Instructions must follow an exact chronological sequence!',
      industryApplication: 'Automated Guided Vehicles (AGVs) navigating Amazon fulfilment centers, iRobot Roomba vacuum grid mapping, and NASA Mars Curiosity Rover autonomous hazard evasion.'
    },
    solvedNumericalExample: {
      problemStatement: 'A planetary rover starts at grid origin (0, 0) facing East (θ = 0°) with 100 units of battery. An energy crystal is located at coordinate (3, 2). The rover burns 2 battery units per forward move and 1 battery unit per 90° rotation. Calculate: (1) The minimum Manhattan step distance, (2) The optimal minimal-cost execution sequence, and (3) The remaining battery reserves upon crystal collection.',
      givenData: {
        'Start Coordinate (x0, y0)': '(0, 0)',
        'Initial Orientation θ0': '0° (East)',
        'Target Coordinate (xg, yg)': '(3, 2)',
        'Initial Battery (B0)': '100 units',
        'Cost per Move (c_m)': '2 units',
        'Cost per 90° Turn (c_t)': '1 unit',
        'Cost to Collect (c_c)': '1 unit'
      },
      stepByStepSolution: [
        {
          stepNumber: 1,
          stepTitle: 'Compute Minimum Manhattan Distance',
          formulaUsed: 'D_M = |xg - x0| + |yg - y0|',
          calculation: 'D_M = |3 - 0| + |2 - 0| = 3 + 2 = 5 steps',
          intermediateResult: 'Minimum required forward translations = 5 grid units.'
        },
        {
          stepNumber: 2,
          stepTitle: 'Determine Required Rotations',
          formulaUsed: 'Orientation change from East (0°) to North (90°)',
          calculation: 'Facing East initially. Move 3 steps along X. Turn Left once (90° CCW to North). Move 2 steps along Y.',
          intermediateResult: 'Total turns required = 1 turn (Left).'
        },
        {
          stepNumber: 3,
          stepTitle: 'Synthesize Optimal Execution Sequence',
          formulaUsed: 'Sequence: [MOVE, MOVE, MOVE, TURN_LEFT, MOVE, MOVE, COLLECT]',
          calculation: '3 forward moves East + 1 turn North + 2 forward moves North + 1 collect action = 7 total operations.',
          intermediateResult: 'Command queue length = 7 instructions.'
        },
        {
          stepNumber: 4,
          stepTitle: 'Calculate Total Battery Expenditure & Residual Capacity',
          formulaUsed: 'B_consumed = (5 · c_m) + (1 · c_t) + (1 · c_c); B_final = B0 - B_consumed',
          calculation: 'B_consumed = (5 × 2) + (1 × 1) + (1 × 1) = 10 + 1 + 1 = 12 units. B_final = 100 - 12 = 88 units.',
          intermediateResult: 'Battery consumed = 12 units. Residual battery = 88%.'
        }
      ],
      finalAnswer: 'Optimal Sequence: [MOVE, MOVE, MOVE, TURN_LEFT, MOVE, MOVE, COLLECT]. Manhattan distance = 5. Battery consumed = 12 units. Residual battery = 88 units.',
      engineeringTakeaway: 'Always align initial orientation with the longest axis to minimize turn penalties in battery-constrained embedded systems.'
    },
    interactiveWorkbench: {
      calculatorType: 'roverComplexity',
      title: 'Rover Path Complexity & Battery Depletion Workbench',
      formulaDisplay: 'Battery Consumed = (Steps × 2) + (Turns × 1) + (Gems × 1)',
      defaultInputs: {
        forwardSteps: 5,
        turnCount: 2,
        gemsCollected: 3,
        initialBattery: 100
      }
    },
    vivaVoceQuestions: [
      {
        questionNumber: 1,
        question: 'Why must a loop termination condition in a robot path planning algorithm be strictly monotonic?',
        answer: 'A loop condition must be monotonic (strictly decreasing distance to goal or battery counter) to mathematically guarantee termination. Without strict monotonicity, the state machine can enter a cyclic infinite loop (e.g., oscillating between two obstacles).',
        conceptTested: 'Loop Invariants & Halting Problem'
      },
      {
        questionNumber: 2,
        question: 'What is the theoretical difference between a syntax error and a semantic logic error in algorithmic sequencing?',
        answer: 'A syntax error occurs when an invalid command is submitted that the parser cannot decode. A semantic logic error occurs when every instruction is syntactically valid (e.g., MOVE_FORWARD), but the logic leads to an unintended state (e.g., crashing into a crater or exhausting energy).',
        conceptTested: 'Syntax vs Semantic Correctness'
      },
      {
        questionNumber: 3,
        question: 'How does the Manhattan distance metric provide an admissible heuristic in A* robot navigation?',
        answer: 'Because a grid rover cannot move diagonally through walls, the Manhattan distance (|Δx| + |Δy|) never overestimates the actual cost to reach the target. In A* search, an admissible heuristic h(n) ≤ h*(n) guarantees finding the optimal shortest path.',
        conceptTested: 'Heuristic Admissibility & Graph Search'
      }
    ],
    gameplay: {
      objective: 'Queue procedural movement commands to guide the rover across the grid to collect energy cells and reach the communication beacon without colliding with lunar rocks.',
      rules: [
        'Rover executes queued instructions one-by-one from left to right.',
        'Each forward step consumes 1 unit of battery energy.',
        'Colliding with an obstacle halts execution and triggers a syntax/logic warning.',
        'Collecting all 3 glowing energy gems yields a 3-star maximum score.'
      ],
      controls: [
        'Click "Move Forward", "Turn Left", "Turn Right", "Collect"',
        'Click "Execute Queue" to run the algorithm',
        'Click "Step-by-Step" to debug and watch individual instructions execute'
      ],
      scoringSystem: '+100 pts per gem collected, +200 pts for reaching the beacon, bonus pts for minimal command queue length (Algorithm Efficiency).',
      pedagogicalOutcome: 'Students develop algorithmic mental models, predictive reasoning, and off-by-one error debugging skills.'
    }
  },

  // ==========================================
  // TIER 2: AGE 12 (MIDDLE SCHOOL HACKERS)
  // ==========================================
  {
    id: 'game-age-12',
    age: 12,
    tierLabel: 'Age 12 — Middle School Hackers',
    title: 'Cyber Gate Defender: Boolean Network Matrix',
    subtitle: 'Construct digital logic circuits, calculate truth tables, and route binary data packets',
    curriculumCategory: 'Digital Logic Design & Network Fundamentals',
    subjectMapping: 'KTU S3 Digital Electronics & CST303 Computer Networks',
    facultyMentor: 'Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)',
    difficulty: 'Intermediate',
    icon: 'ShieldAlert',
    colorGradient: 'from-cyan-500 to-blue-600',
    badge: 'Binary & Boolean Gates',
    academicFramework: {
      courseCode: 'CST203',
      courseTitle: 'Logic System Design',
      moduleNumber: 'Module 1 & 2',
      topicName: 'Boolean Algebra Postulates, Logic Gate Networks & Combinational Adders',
      bloomsTaxonomyLevel: 'K4 (Analyze)',
      prerequisites: ['Binary numbering system', 'Basic set theory (AND/OR unions)'],
      creditWeight: 4
    },
    deepTheory: {
      coreConcept: 'Boolean Algebra, Logic Gates & Binary Error Parity',
      whyItMatters: 'Every modern microprocessor, GPU, and networking switch is physically constructed from billions of microscopic CMOS transistors implementing fundamental Boolean logic operations (AND, OR, NOT, XOR, NAND). Master binary operations to master computer architecture.',
      syllabusAnchor: 'CST203 Module 1: Boolean Functions, Canonical Forms, and Logic Minimization',
      keyFormulasOrRules: [
        'AND Conjunction: Y = A · B (1 only if A = 1 and B = 1).',
        'OR Disjunction: Y = A + B (1 if A = 1 or B = 1 or both).',
        'XOR Difference: Y = A ⊕ B = A\'B + AB\' (1 if inputs differ; basis of half adders).',
        'De Morgan\'s Law I: (A · B)\' = A\' + B\'; De Morgan\'s Law II: (A + B)\' = A\' · B\'.'
      ],
      mathematicalDerivation: {
        title: 'Full Adder Sum & Carry-Out Boolean Derivation',
        context: 'Deriving the minimum gate equation for 1-bit binary addition of inputs A, B and carry-in Cin.',
        latexFormulas: [
          'Sum = A ⊕ B ⊕ Cin',
          'Cout = A·B + Cin·(A ⊕ B) = A·B + B·Cin + A·Cin',
          'Even Parity P = A ⊕ B ⊕ C ⊕ D'
        ],
        derivationSteps: [
          'Step 1: Construct the 8-row truth table for inputs (A, B, Cin) producing outputs (Sum, Cout).',
          'Step 2: Sum is 1 for minterms m(1, 2, 4, 7): Sum = A\'B\'Cin + A\'BCin\' + AB\'Cin\' + ABCin.',
          'Step 3: Factor algebraic terms: Sum = Cin(A\'B\' + AB) + Cin\'(A\'B + AB\') = Cin(A ⊕ B)\' + Cin\'(A ⊕ B) = A ⊕ B ⊕ Cin.',
          'Step 4: Carry-Out is 1 for minterms m(3, 5, 6, 7): Cout = A\'BCin + AB\'Cin + ABCin\' + ABC = AB + Cin(A\'B + AB\') = AB + Cin(A ⊕ B).'
        ],
        invariantCondition: 'In any combinational circuit without feedback loops, the output is a pure memoryless deterministic mapping Y = f(X1, X2, ..., Xn).'
      },
      formalAlgorithm: {
        name: 'Boolean Logic Matrix Evaluation Engine',
        pseudocode: [
          'FUNCTION EvaluateGate(GateType, In1, In2):',
          '   SWITCH GateType:',
          '       CASE "AND": RETURN In1 AND In2',
          '       CASE "OR":  RETURN In1 OR In2',
          '       CASE "XOR": RETURN In1 XOR In2',
          '       CASE "NAND": RETURN NOT (In1 AND In2)',
          '       CASE "NOR":  RETURN NOT (In1 OR In2)',
          '       CASE "NOT":  RETURN NOT In1',
          '   END SWITCH',
          'END FUNCTION',
          'FOR each incoming Packet P with target checksum C_target DO:',
          '   C_computed = EvaluateGate(P.Gate, P.InputA, P.InputB)',
          '   IF C_computed == C_target THEN AllowPacket(P) ELSE DropPacketAndAlarm(P)'
        ],
        timeComplexity: 'O(1) per gate evaluation (direct hardware bitwise instruction).',
        spaceComplexity: 'O(1) register allocation.',
        bestCase: 'O(1) instantaneous propagation.',
        worstCase: 'O(1) constant-time propagation delay t_pd.'
      },
      realWorldAnalogy: 'A dual-custody bank vault door: Opens ONLY if Key A AND Key B are turned simultaneously (AND gate). A hallway lighting system controlled by two wall switches: Flipping either toggle changes light state (XOR gate).',
      industryApplication: 'Arithmetic Logic Units (ALUs) in Intel Core and Apple Silicon processors, Ethernet CRC-32 cyclic redundancy error checking, and SHA-256 cryptographic hashing.'
    },
    solvedNumericalExample: {
      problemStatement: 'Given the Boolean function F(A, B, C) = Σ m(1, 3, 5, 7) + d(2): (1) Write the canonical Sum-of-Products (SOP) expression, (2) Minimize the expression using Boolean algebra laws, and (3) Determine how many transistors are saved compared to the unoptimized canonical form (assuming 2 CMOS transistors per NOT gate and 6 transistors per 3-input AND gate).',
      givenData: {
        'Minterms Σ m': '1, 3, 5, 7',
        'Variables': 'A, B, C (3 binary inputs)',
        'Canonical Terms': 'A\'B\'C, A\'BC, AB\'C, ABC'
      },
      stepByStepSolution: [
        {
          stepNumber: 1,
          stepTitle: 'Write Canonical SOP Equation',
          formulaUsed: 'F = m1 + m3 + m5 + m7',
          calculation: 'F = (A\'B\'C) + (A\'BC) + (AB\'C) + (ABC)',
          intermediateResult: '4 product terms with 3 literals each.'
        },
        {
          stepNumber: 2,
          stepTitle: 'Group Adjacent Terms using Distributive Law',
          formulaUsed: 'XY + XY\' = X(Y + Y\') = X(1) = X',
          calculation: 'F = A\'C(B\' + B) + AC(B\' + B) = A\'C(1) + AC(1) = A\'C + AC',
          intermediateResult: 'Simplified to 2 terms: A\'C + AC.'
        },
        {
          stepNumber: 3,
          stepTitle: 'Apply Final Absorption / Factoring',
          formulaUsed: 'A\'C + AC = C(A\' + A) = C(1) = C',
          calculation: 'F = C · (A\' + A) = C · 1 = C',
          intermediateResult: 'The entire function reduces down to a single wire: F = C!'
        },
        {
          stepNumber: 4,
          stepTitle: 'Calculate Transistor Savings',
          formulaUsed: 'Canonical cost vs Optimized wire cost',
          calculation: 'Canonical: 3 NOT gates (6 T) + 4 AND-3 gates (24 T) + 1 OR-4 gate (8 T) = 38 transistors. Optimized: Direct wire connection (0 transistors).',
          intermediateResult: 'Saved 38 transistors (100% gate reduction).'
        }
      ],
      finalAnswer: 'Minimal Boolean Expression: F = C. Transistors saved: 38 CMOS transistors.',
      engineeringTakeaway: 'Boolean logic minimization directly shrinks chip silicon area, eliminates propagation delay, and reduces thermal wattage in microprocessor design.'
    },
    interactiveWorkbench: {
      calculatorType: 'booleanMatrix',
      title: '3-Input Boolean Gate & Majority Voter Workbench',
      formulaDisplay: 'Majority Function: F = (A · B) + (B · C) + (A · C)',
      defaultInputs: {
        inputA: 1,
        inputB: 0,
        inputC: 1,
        selectedGate: 'AND'
      }
    },
    vivaVoceQuestions: [
      {
        questionNumber: 1,
        question: 'Why are NAND and NOR gates designated as "Universal Gates"?',
        answer: 'NAND and NOR gates are universal because any Boolean function (AND, OR, NOT, XOR, XNOR) can be implemented solely using combinations of NAND or NOR gates without requiring any other gate type.',
        conceptTested: 'Functional Completeness of Logic Gates'
      },
      {
        questionNumber: 2,
        question: 'Explain propagation delay (t_pd) in digital circuits and its impact on clock frequency.',
        answer: 'Propagation delay is the finite physical time required for an input voltage transition to register as a stable output transition across transistor channels. The maximum combinational path delay t_max sets the theoretical upper limit on the CPU clock frequency: f_max ≤ 1 / (t_max + t_setup + t_skew).',
        conceptTested: 'Propagation Delay & Clock Margins'
      },
      {
        questionNumber: 3,
        question: 'How does an XOR gate calculate single-bit parity check in network packet framing?',
        answer: 'The XOR operation performs modulo-2 addition. Chaining bits through XOR gates (A ⊕ B ⊕ C ⊕ D) outputs 1 if an odd number of 1s are present, and 0 if even. If a transmission bit flips during transit, the receiver\'s recalculated parity mismatches the header, detecting the single-bit corruption.',
        conceptTested: 'Parity Generation & Error Detection'
      }
    ],
    gameplay: {
      objective: 'Configure logic gate switches (AND, OR, XOR, NOT) in real-time so that incoming binary data packets compute the exact target checksum required to bypass the firewall.',
      rules: [
        'Incoming bits arrive at 1-second intervals.',
        'Toggle gate input switches (0 or 1) before the packet reaches the terminal node.',
        'Mismatched parity bit drops the packet, deducting 10 shield integrity points.',
        'Complete 5 consecutive verified packet transmissions to unlock the next network layer.'
      ],
      controls: [
        'Click input pins to toggle logic state (0 / 1)',
        'Click gate selector to cycle through AND / OR / XOR / NOT',
        'Press Spacebar to accelerate packet burst'
      ],
      scoringSystem: '+50 pts per valid logic gate evaluation, +150 pts per cleared packet frame, multiplier for streak without parity errors.',
      pedagogicalOutcome: 'Intuitive mastery of truth tables, binary representation, and hardware-level signal propagation.'
    }
  },

  // ==========================================
  // TIER 3: AGE 15 (PRE-ENGINEERING APPRENTICES)
  // ==========================================
  {
    id: 'game-age-15',
    age: 15,
    tierLabel: 'Age 15 — Pre-Engineering Apprentices',
    title: 'Polymorphic Code Arena & 2-DOF Robot Arm',
    subtitle: 'Assemble object-oriented inheritance hierarchies and calculate spatial joint angles',
    curriculumCategory: 'Object-Oriented Programming & Spatial Kinematics',
    subjectMapping: 'KTU CST205 Java OOP & PCADT502 Robotics and Automation',
    facultyMentor: 'Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)',
    difficulty: 'Advanced',
    icon: 'Layers',
    colorGradient: 'from-purple-500 to-indigo-600',
    badge: 'OOP & Kinematics',
    academicFramework: {
      courseCode: 'CST205',
      courseTitle: 'Object Oriented Programming with Java',
      moduleNumber: 'Module 2 & 3',
      topicName: 'Polymorphic Dispatch, Abstract Classes, Interfaces & Planar Robot Kinematics',
      bloomsTaxonomyLevel: 'K4 (Analyze)',
      prerequisites: ['Basic trigonometry (sine, cosine)', 'Fundamental classes and objects'],
      creditWeight: 4
    },
    deepTheory: {
      coreConcept: 'Inheritance, Polymorphism & Forward Kinematics Coordinate Transform',
      whyItMatters: 'Combines computer science software architecture (extensibility, contracts, code reuse, open-closed principle) with mechanical robotics (converting joint servo rotation into 2D/3D Cartesian end-effector coordinates). Master this intersection to build autonomous cyber-physical systems.',
      syllabusAnchor: 'CST205 Module 2 (Polymorphism & Abstract Classes) & PCADT502 Module 1 (DH Representation & Kinematics)',
      keyFormulasOrRules: [
        'Dynamic Method Dispatch: BaseArm ref = new MagneticClampArm(); ref.engageTarget();',
        'Forward Kinematics X: X_ee = L1·cos(θ1) + L2·cos(θ1 + θ2).',
        'Forward Kinematics Y: Y_ee = L1·sin(θ1) + L2·sin(θ1 + θ2).',
        'Kinematic Singularity: det(J) = L1·L2·sin(θ2) = 0 (Occurs when θ2 = 0° or 180°).'
      ],
      mathematicalDerivation: {
        title: '2-DOF Planar Forward Kinematics & Jacobian Velocity Matrix',
        context: 'Deriving the Cartesian tip coordinate (X, Y) and linear velocities (v_x, v_y) for an articulated two-link planar manipulator.',
        latexFormulas: [
          'x = L_1 \\cos(\\theta_1) + L_2 \\cos(\\theta_1 + \\theta_2)',
          'y = L_1 \\sin(\\theta_1) + L_2 \\sin(\\theta_1 + \\theta_2)',
          '\\begin{bmatrix} \\dot{x} \\\\ \\dot{y} \\end{bmatrix} = \\begin{bmatrix} -L_1 S_1 - L_2 S_{12} & -L_2 S_{12} \\\\ L_1 C_1 + L_2 C_{12} & L_2 C_{12} \\end{bmatrix} \\begin{bmatrix} \\dot{\\theta}_1 \\\\ \\dot{\\theta}_2 \\end{bmatrix}',
          '\\det(J) = L_1 L_2 \\sin(\\theta_2)'
        ],
        derivationSteps: [
          'Step 1: Link 1 extends from origin (0, 0) to elbow (x1, y1) = (L1·cosθ1, L1·sinθ1).',
          'Step 2: Link 2 rotates relative to Link 1 by θ2, so absolute orientation is (θ1 + θ2). End effector tip is (x1 + L2·cos(θ1+θ2), y1 + L2·sin(θ1+θ2)).',
          'Step 3: Differentiate x and y with respect to time t using the chain rule to obtain the Jacobian matrix J.',
          'Step 4: The determinant of J is det(J) = (-L1 S1 - L2 S12)(L2 C12) - (-L2 S12)(L1 C1 + L2 C12) = L1 L2 (S12 C1 - C12 S1) = L1 L2 sin((θ1+θ2) - θ1) = L1 L2 sin(θ2).'
        ],
        invariantCondition: 'Workspace Reachability Boundary: The target (Xt, Yt) is reachable if and only if |L1 - L2| ≤ √(Xt² + Yt²) ≤ L1 + L2.'
      },
      formalAlgorithm: {
        name: 'Polymorphic Robotic Tooling Controller & Kinematic Solver',
        pseudocode: [
          'ABSTRACT CLASS RoboticArmModule:',
          '   ABSTRACT FUNCTION engage(Target T)',
          '   ABSTRACT FUNCTION getPayloadCapacity() -> Float',
          'END CLASS',
          'CLASS PrecisionLaserArm EXTENDS RoboticArmModule:',
          '   OVERRIDE engage(Target T): FireCalibratedLaser(T.coord)',
          'END CLASS',
          'FUNCTION SolveKinematics(L1, L2, θ1_deg, θ2_deg):',
          '   θ1_rad = θ1_deg * π / 180; θ2_rad = θ2_deg * π / 180',
          '   x = L1 * cos(θ1_rad) + L2 * cos(θ1_rad + θ2_rad)',
          '   y = L1 * sin(θ1_rad) + L2 * sin(θ1_rad + θ2_rad)',
          '   singularity = abs(sin(θ2_rad)) < 1e-4',
          '   RETURN {x: x, y: y, isSingular: singularity}',
          'END FUNCTION'
        ],
        timeComplexity: 'O(1) dynamic dispatch table lookup (vtable) and O(1) trigonometric evaluation.',
        spaceComplexity: 'O(1) memory footprint.',
        bestCase: 'O(1) target engagement.',
        worstCase: 'O(1) execution time.'
      },
      realWorldAnalogy: 'A universal vehicle chassis: The blueprint defines `drive()`. A sports car subclass accelerates with a combustion engine, while an electric rover subclass accelerates with dual brushless motors. The driver uses the same steering interface regardless of the underlying polymorphic implementation.',
      industryApplication: 'Surgical robotics (da Vinci surgical system teleoperation), automotive assembly weld cells (ABB & KUKA robotic arms), and skeletal animation kinematics in Unreal Engine 5.'
    },
    solvedNumericalExample: {
      problemStatement: 'A two-joint planar SCARA robot arm has link lengths L1 = 200 mm and L2 = 150 mm. The joints are currently positioned at angles θ1 = 30° and θ2 = 45°. Calculate: (1) The exact Cartesian coordinate (X, Y) of the end-effector tip, (2) The maximum theoretical reach of the arm, and (3) The determinant of the Jacobian matrix to test if the robot is in a kinematic singularity.',
      givenData: {
        'Link 1 Length (L1)': '200 mm',
        'Link 2 Length (L2)': '150 mm',
        'Joint 1 Angle (θ1)': '30°',
        'Joint 2 Angle (θ2)': '45°'
      },
      stepByStepSolution: [
        {
          stepNumber: 1,
          stepTitle: 'Compute Compound Angle & Trigonometric Ratios',
          formulaUsed: 'θ_total = θ1 + θ2',
          calculation: 'θ_total = 30° + 45° = 75°. cos(30°) = 0.8660, sin(30°) = 0.5000. cos(75°) = 0.2588, sin(75°) = 0.9659.',
          intermediateResult: 'Evaluated trigonometric values for 30° and 75°.'
        },
        {
          stepNumber: 2,
          stepTitle: 'Compute End-Effector X Coordinate',
          formulaUsed: 'X = L1·cos(θ1) + L2·cos(θ1 + θ2)',
          calculation: 'X = (200 × 0.8660) + (150 × 0.2588) = 173.20 + 38.82 = 212.02 mm',
          intermediateResult: 'End effector X = 212.02 mm.'
        },
        {
          stepNumber: 3,
          stepTitle: 'Compute End-Effector Y Coordinate',
          formulaUsed: 'Y = L1·sin(θ1) + L2·sin(θ1 + θ2)',
          calculation: 'Y = (200 × 0.5000) + (150 × 0.9659) = 100.00 + 144.89 = 244.89 mm',
          intermediateResult: 'End effector Y = 244.89 mm.'
        },
        {
          stepNumber: 4,
          stepTitle: 'Calculate Maximum Reach & Jacobian Singularity Determinant',
          formulaUsed: 'R_max = L1 + L2; det(J) = L1 · L2 · sin(θ2)',
          calculation: 'R_max = 200 + 150 = 350 mm. det(J) = 200 × 150 × sin(45°) = 30,000 × 0.7071 = 21,213.2 mm². Since det(J) ≠ 0, arm is fully controllable.',
          intermediateResult: 'Max reach = 350 mm. Jacobian determinant = 21,213.2 mm² (Non-singular).'
        }
      ],
      finalAnswer: 'End-Effector Tip: (X = 212.02 mm, Y = 244.89 mm). Max Reach: 350 mm. Jacobian Determinant: 21,213.2 mm² (Safe, non-singular).',
      engineeringTakeaway: 'Always verify det(J) ≠ 0 before executing inverse kinematic moves, otherwise joint motors will attempt to demand infinite torque.'
    },
    interactiveWorkbench: {
      calculatorType: 'kinematicsArm',
      title: '2-DOF Robotic Arm Forward Kinematics & Singularity Workbench',
      formulaDisplay: 'X = L1·cos(θ1) + L2·cos(θ1+θ2) | Y = L1·sin(θ1) + L2·sin(θ1+θ2)',
      defaultInputs: {
        link1Length: 200,
        link2Length: 150,
        joint1Angle: 30,
        joint2Angle: 45
      }
    },
    vivaVoceQuestions: [
      {
        questionNumber: 1,
        question: 'How does the Java Virtual Machine (JVM) implement dynamic method dispatch via the vtable?',
        answer: 'When a method is declared non-static and non-final, the compiler generates an `invokevirtual` bytecode instruction. At runtime, the JVM looks up the object\'s Virtual Method Table (vtable), an array of function pointers. It indexes into the vtable at a pre-calculated offset to find the address of the overridden subclass implementation in O(1) time.',
        conceptTested: 'Dynamic Method Dispatch & VTable Architecture'
      },
      {
        questionNumber: 2,
        question: 'What is a kinematic singularity in robotics, and why is it dangerous in automated manufacturing?',
        answer: 'A kinematic singularity occurs when the manipulator Jacobian loses rank (det(J) = 0), happening when links align collinear (e.g. θ2 = 0°). At a singularity, the robot loses degrees of freedom in Cartesian space, and inverse kinematics demands infinite joint velocity and infinite motor torque, causing dangerous hardware lockups or violent mechanical vibration.',
        conceptTested: 'Jacobian Rank & Kinematic Singularities'
      },
      {
        questionNumber: 3,
        question: 'Differentiate between method overloading and method overriding in terms of binding time and signatures.',
        answer: 'Method overloading is static polymorphism resolved at compile-time (early binding), requiring identical method names with different parameter signatures within the same class. Method overriding is dynamic polymorphism resolved at runtime (late binding), requiring identical method names and identical signatures between superclass and subclass.',
        conceptTested: 'Static vs Dynamic Polymorphism'
      }
    ],
    gameplay: {
      objective: 'Equip your robotic avatar with polymorphic modules (Sensor, Gripper, Laser) and solve the joint angles (θ1, θ2) to position the mechanical end-effector precisely over moving assembly line targets.',
      rules: [
        'Select the appropriate polymorphic subclass to match target physical properties.',
        'Adjust Joint 1 (θ1) and Joint 2 (θ2) sliders so the gripper tip enters the target zone within ±5 mm tolerance.',
        'Activate gripper to lock in target before it leaves the work envelope.',
        'Completing batches within cycle time rewards efficiency multipliers.'
      ],
      controls: [
        'Angle Sliders for θ1 (-90° to 90°) and θ2 (-120° to 120°)',
        'Subclass Selector (HeavyGripper, MagneticClamp, PrecisionLaser)',
        'Click "Dock & Engage" to verify kinematics'
      ],
      scoringSystem: '+100 pts per target acquired, distance bonus for sub-millimeter precision, penalty for workspace boundary violation.',
      pedagogicalOutcome: 'Direct tactile comprehension of trigonometric robot coordinate systems and clean OOP design principles.'
    }
  },

  // ==========================================
  // TIER 4: AGE 18 (ENGINEERING FRESHERS)
  // ==========================================
  {
    id: 'game-age-18',
    age: 18,
    tierLabel: 'Age 18 — Engineering Freshers',
    title: 'Subnet Speed Slicer & Dijkstra Packet Rush',
    subtitle: 'Partition classless IPv4 CIDR blocks and calculate shortest path routing trees against time',
    curriculumCategory: 'Computer Networks & Graph Search Algorithms',
    subjectMapping: 'KTU CST303 Computer Networks & CST305 Artificial Intelligence',
    facultyMentor: 'Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)',
    difficulty: 'Expert',
    icon: 'Network',
    colorGradient: 'from-amber-500 to-rose-600',
    badge: 'CIDR & Dijkstra OSPF',
    academicFramework: {
      courseCode: 'CST303',
      courseTitle: 'Computer Networks',
      moduleNumber: 'Module 3 & 4',
      topicName: 'Classless Inter-Domain Routing (CIDR), VLSM Subnet Design & Dijkstra Link-State OSPF',
      bloomsTaxonomyLevel: 'K5 (Evaluate)',
      prerequisites: ['Binary arithmetic & bitwise masking', 'Graph theory (vertices, weighted edges)'],
      creditWeight: 4
    },
    deepTheory: {
      coreConcept: 'Variable Length Subnet Masking (VLSM) & Dijkstra Shortest Path First (SPF)',
      whyItMatters: 'Global internet routing relies on classless IP prefix aggregation to prevent the exhaustion of the 32-bit IPv4 address space, while interior gateway protocols (OSPF) use Dijkstra\'s algorithm to compute loop-free, lowest-latency shortest-path trees across international enterprise backbones.',
      syllabusAnchor: 'CST303 Module 3 (Network Layer Addressing & Subnetting) & CST305 Module 1 (State Space Graph Search)',
      keyFormulasOrRules: [
        'Host Bits Calculation: h = 32 - PrefixLength.',
        'Usable Host Capacity: N_usable = 2^h - 2 (subtracting Network ID and Directed Broadcast ID).',
        'Subnet Block Step Size: BlockSize = 256 - SubnetMaskOctet = 2^h.',
        'Dijkstra Relaxation Invariant: IF (dist[u] + cost(u, v) < dist[v]) THEN dist[v] = dist[u] + cost(u, v), prev[v] = u.'
      ],
      mathematicalDerivation: {
        title: 'VLSM Power-of-Two Partitioning & Dijkstra Shortest-Path Proof by Contradiction',
        context: 'Proving that greedy node extraction in Dijkstra\'s algorithm guarantees the globally optimal shortest path on non-negative weighted graphs.',
        latexFormulas: [
          'h = \\lceil \\log_2(\\text{RequiredHosts} + 2) \\rceil',
          '\\text{Prefix} = 32 - h',
          'd(s, v) \\le d(s, u) + w(u, v)',
          'T(V, E) = O((|V| + |E|) \\log |V|) \\quad \\text{with Min-Heap}'
        ],
        derivationSteps: [
          'Step 1: Every IPv4 address is an unsigned 32-bit integer. A prefix of /n dedicates n bits to the Network Prefix and h = (32 - n) bits to host addressing.',
          'Step 2: Since all-zeros represents the Network ID and all-ones represents the Broadcast ID, usable host space is strictly 2^h - 2. Thus, h = ceil(log2(Hosts_needed + 2)).',
          'Step 3: Dijkstra Proof: Assume node u is the first extracted from priority queue with d[u] > δ(s, u). There must exist a path P from s to u. Let (x, y) be the first edge in P crossing from the visited set S to the unvisited set V \\ S.',
          'Step 4: Since edge weights are non-negative, d[x] = δ(s, x) and d[y] = δ(s, y) ≤ δ(s, u) < d[u]. But the min-heap extracts the minimum distance node, so d[u] ≤ d[y], yielding a direct contradiction: d[u] < d[u]. Hence d[u] = δ(s, u) is optimal.'
        ],
        invariantCondition: 'Non-negative edge weights w(u, v) ≥ 0. If negative edge weights exist, Dijkstra fails and Bellman-Ford O(|V|·|E|) must be employed.'
      },
      formalAlgorithm: {
        name: 'Dijkstra Shortest Path First (SPF) with Binary Min-Heap Priority Queue',
        pseudocode: [
          'FUNCTION Dijkstra(Graph G, Source s):',
          '   FOR each vertex v in G.Vertices DO:',
          '       dist[v] = INFINITY; prev[v] = NULL',
          '   dist[s] = 0',
          '   PriorityQueue Q = BuildMinHeapWithAllVertices()',
          '   WHILE Q is not empty DO:',
          '       u = Q.ExtractMin()',
          '       FOR each neighbor v of u DO:',
          '           alt = dist[u] + G.EdgeWeight(u, v)',
          '           IF alt < dist[v] THEN:',
          '               dist[v] = alt; prev[v] = u',
          '               Q.DecreaseKey(v, alt)',
          '   RETURN (dist, prev)',
          'END FUNCTION'
        ],
        timeComplexity: 'O((|V| + |E|) log |V|) using a binary min-heap; O(|V| log |V| + |E|) with Fibonacci heap.',
        spaceComplexity: 'O(|V|) for distance arrays and priority queue references.',
        bestCase: 'O(|V| log |V|) on sparse graphs where |E| ≈ |V|.',
        worstCase: 'O(|V|² log |V|) on dense graphs where |E| ≈ |V|².'
      },
      realWorldAnalogy: 'City civil engineering: Slicing a large 100-acre master plan into distinct residential neighborhoods with private gate codes (VLSM subnetting), and Google Maps recalculating optimal highway routes around road construction in real-time (Dijkstra SPF).',
      industryApplication: 'AWS & Azure Virtual Private Cloud (VPC) multi-tier subnetting architecture (Public, App, Database tiers), Cloudflare Anycast edge traffic routing, and Cisco/Juniper OSPF backbone routing.'
    },
    solvedNumericalExample: {
      problemStatement: 'An ISP allocates the network block 192.168.1.0/24 to a corporate client. Design a Variable Length Subnet Masking (VLSM) scheme to satisfy the following 4 departmental requirements in decreasing order: (1) Sales Department: 60 hosts, (2) Development Lab: 28 hosts, (3) Support Center: 14 hosts, (4) Point-to-Point Router Link: 2 hosts. Specify for each subnet: Required CIDR Prefix, Subnet Mask, Network ID, Usable IP Range, and Broadcast ID.',
      givenData: {
        'Base Allocated Block': '192.168.1.0/24',
        'Sales Hosts': 60,
        'Dev Hosts': 28,
        'Support Hosts': 14,
        'WAN Link Hosts': 2
      },
      stepByStepSolution: [
        {
          stepNumber: 1,
          stepTitle: 'Subnet 1: Sales Department (60 hosts)',
          formulaUsed: '2^h - 2 ≥ 60 => h = 6 bits => Prefix = 32 - 6 = /26 (Block size = 64)',
          calculation: 'Mask: 255.255.255.192. Network ID: 192.168.1.0/26. Range: 192.168.1.1 to 192.168.1.62. Broadcast ID: 192.168.1.63.',
          intermediateResult: 'Allocated 64 addresses (62 usable, 2 reserved).'
        },
        {
          stepNumber: 2,
          stepTitle: 'Subnet 2: Development Lab (28 hosts)',
          formulaUsed: '2^h - 2 ≥ 28 => h = 5 bits => Prefix = 32 - 5 = /27 (Block size = 32)',
          calculation: 'Next available start: 192.168.1.64. Mask: 255.255.255.224. Network ID: 192.168.1.64/27. Range: 192.168.1.65 to 192.168.1.94. Broadcast ID: 192.168.1.95.',
          intermediateResult: 'Allocated 32 addresses (30 usable, 2 reserved).'
        },
        {
          stepNumber: 3,
          stepTitle: 'Subnet 3: Support Center (14 hosts)',
          formulaUsed: '2^h - 2 ≥ 14 => h = 4 bits => Prefix = 32 - 4 = /28 (Block size = 16)',
          calculation: 'Next available start: 192.168.1.96. Mask: 255.255.255.240. Network ID: 192.168.1.96/28. Range: 192.168.1.97 to 192.168.1.110. Broadcast ID: 192.168.1.111.',
          intermediateResult: 'Allocated 16 addresses (14 usable, 2 reserved).'
        },
        {
          stepNumber: 4,
          stepTitle: 'Subnet 4: Point-to-Point WAN Link (2 hosts)',
          formulaUsed: '2^h - 2 ≥ 2 => h = 2 bits => Prefix = 32 - 2 = /30 (Block size = 4)',
          calculation: 'Next available start: 192.168.1.112. Mask: 255.255.255.252. Network ID: 192.168.1.112/30. Range: 192.168.1.113 to 192.168.1.114. Broadcast ID: 192.168.1.115.',
          intermediateResult: 'Allocated 4 addresses (2 usable, 2 reserved).'
        }
      ],
      finalAnswer: 'Sales: 192.168.1.0/26 (Mask 255.255.255.192, 62 usable). Dev: 192.168.1.64/27 (Mask 255.255.255.224, 30 usable). Support: 192.168.1.96/28 (Mask 255.255.255.240, 14 usable). WAN: 192.168.1.112/30 (Mask 255.255.255.252, 2 usable). Remaining unassigned pool: 192.168.1.116 - 192.168.1.255 (140 addresses available).',
      engineeringTakeaway: 'Always allocate VLSM subnets in descending order of host requirements to prevent fragmentation and overlapping address spaces.'
    },
    interactiveWorkbench: {
      calculatorType: 'vlsmSubnetter',
      title: 'VLSM IPv4 CIDR Subnet Calculator Workbench',
      formulaDisplay: 'Usable Hosts = 2^(32 - Prefix) - 2 | Mask = 256 - 2^(32 - Prefix)',
      defaultInputs: {
        baseIp: '192.168.1.0',
        requiredHosts: 60,
        selectedCidr: 26
      }
    },
    vivaVoceQuestions: [
      {
        questionNumber: 1,
        question: 'Why does Dijkstra\'s algorithm fail when a graph contains negative-weight edge cycles?',
        answer: 'Dijkstra relies on a greedy assumption: once a vertex u is extracted from the priority queue, its distance is finalized (d[u] = δ(s, u)). If negative edges exist, reaching u later through an additional negative link could decrease its cost, violating the invariant and leaving vertices with suboptimal distances.',
        conceptTested: 'Dijkstra Greediness & Negative Edge Bounds'
      },
      {
        questionNumber: 2,
        question: 'Why must exactly 2 IP addresses be subtracted when computing usable host capacity 2^h - 2?',
        answer: 'The first address in any subnet (where all host bits are binary 0s) is strictly reserved as the Subnet Identifier (Network ID). The last address (where all host bits are binary 1s) is strictly reserved as the Directed Broadcast Address. Neither can be assigned to an individual network interface card (NIC).',
        conceptTested: 'Network ID & Broadcast ID Invariants'
      },
      {
        questionNumber: 3,
        question: 'What is Route Aggregation (Supernetting), and how does CIDR mitigate global BGP routing table explosion?',
        answer: 'Route Aggregation combines multiple contiguous smaller classless subnets into a single shorter prefix advertisement (e.g. four /24 blocks into a single /22 block). Core Internet routers only store the aggregated /22 entry, reducing memory footprint, CPU lookup time, and routing flap oscillations.',
        conceptTested: 'Supernetting & BGP Prefix Aggregation'
      }
    ],
    gameplay: {
      objective: 'Given client host requirements, slice the designated IP block into exact CIDR subnets without wasting host space, then route critical packets through a congested 6-router topology using Dijkstra link costs.',
      rules: [
        'Round 1: Given required hosts (e.g., 60 hosts, 28 hosts), enter correct CIDR prefix (/26, /27) and subnet mask within 30 seconds.',
        'Round 2: Packet arrives at Router R1. Link metrics change dynamically due to simulated network congestion. Click adjacent routers in sequence along the true Dijkstra shortest path to deliver before TTL expires.',
        'Submitting invalid subnet masks or selecting sub-optimal routing hops deducts packet transmission credits.'
      ],
      controls: [
        'Prefix Length slider (/24 to /30)',
        'Interactive Router Network Canvas: Click router nodes to establish route',
        'Click "Verify & Broadcast" to dispatch packet'
      ],
      scoringSystem: '+200 pts per valid subnet division, +300 pts per optimal Dijkstra route found, time bonus for fast mathematical resolution.',
      pedagogicalOutcome: 'Fluency in binary subnetting math, IP address allocation, and algorithmic graph theory.'
    }
  },

  // ==========================================
  // TIER 5: AGE 21 (SENIOR / GRAD TECH LEADS)
  // ==========================================
  {
    id: 'game-age-21',
    age: 21,
    tierLabel: 'Age 21 — Senior / Grad Tech Leads',
    title: 'Distributed Deadlock Breaker & CPM Project Command',
    subtitle: 'Resolve concurrent thread lock cycles and balance Critical Path float and team velocity',
    curriculumCategory: 'Concurrent Systems & Software Project Management',
    subjectMapping: 'KTU CST205 Java Threads, EST-STM32 RTOS & PECST521 Software Project Management',
    facultyMentor: 'Jane Rose | Assistant Professor | Department of Computer Science and Engineering (CSE)',
    difficulty: 'Master',
    icon: 'Cpu',
    colorGradient: 'from-rose-500 to-indigo-600',
    badge: 'Deadlocks & CPM Optimization',
    academicFramework: {
      courseCode: 'PECST521',
      courseTitle: 'Software Project Management & Concurrent Systems',
      moduleNumber: 'Module 3 & 5',
      topicName: 'Resource Allocation Graphs, Deadlock Recovery, Critical Path Method (CPM) & Float Metrics',
      bloomsTaxonomyLevel: 'K6 (Create)',
      prerequisites: ['Operating system process synchronization', 'Activity network graphs (AON/AOA)'],
      creditWeight: 4
    },
    deepTheory: {
      coreConcept: 'Resource Allocation Graph (RAG) Deadlock Resolution & CPM Float Buffer Optimization',
      whyItMatters: 'Lead architects and project directors face two catastrophic threats to software delivery: distributed deadlocks that paralyze high-throughput cloud databases, and unmanaged critical path task slippages that trigger contractual default penalties and team burnout.',
      syllabusAnchor: 'CST205 Module 5 (Thread Concurrency & Deadlocks) & PECST521 Module 3 (CPM Network Scheduling & Float Analysis)',
      keyFormulasOrRules: [
        'Coffman\'s 4 Invariant Conditions: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.',
        'Banker\'s Safety Condition: Need[i][j] = Max[i][j] - Alloc[i][j] ≤ Work[j].',
        'CPM Forward Pass: ES_j = max(EF_i for i ∈ Pred(j)); EF_j = ES_j + Duration_j.',
        'CPM Backward Pass: LF_i = min(LS_j for j ∈ Succ(i)); LS_i = LF_i - Duration_i.',
        'Total Float (TF): TF_i = LS_i - ES_i = LF_i - EF_i; Critical Path: Set of activities where TF = 0.'
      ],
      mathematicalDerivation: {
        title: 'Topological Deadlock Cycle Invalidation & CPM Total/Free/Independent Float Equations',
        context: 'Deriving the quantitative criteria for preempting threads in single-instance Resource Allocation Graphs and calculating activity schedule buffers.',
        latexFormulas: [
          '\\text{Deadlock Cycle Condition: } \\exists C \\subseteq G(V, E) \\text{ where } C = (T_1, R_1, T_2, R_2, \\dots, T_k, R_k, T_1)',
          '\\text{Victim Score: } V(T_i) = \\min \\left( \\frac{\\text{Cost}(T_i)}{\\text{LocksHeld}(T_i) \\times \\text{Priority}(T_i)} \\right)',
          '\\text{Total Float: } TF_i = LS_i - ES_i = LF_i - EF_i',
          '\\text{Free Float: } FF_i = \\min_{j \\in \\text{Succ}(i)}(ES_j) - EF_i',
          '\\text{Independent Float: } IF_i = \\max(0, \\min_{j \\in \\text{Succ}(i)}(ES_j) - \\max_{k \\in \\text{Pred}(i)}(LF_k) - D_i)'
        ],
        derivationSteps: [
          'Step 1: In a single-instance Resource Allocation Graph (RAG), a directed cycle is both necessary and sufficient for deadlock (Holt\'s Theorem).',
          'Step 2: Breaking the cycle requires revoking at least one edge (T_i → R_j). Preemption selection minimizes rollback damage: aborting the thread with lowest cumulative CPU time and fewest held locks.',
          'Step 3: In an Activity-On-Node (AON) project schedule, Early Start (ES) of an activity is bounded by the slowest predecessor: ES_j = max(EF_pred).',
          'Step 4: Total Float (TF) is the absolute time an activity can slip without delaying the final project deadline. Free Float (FF) is the slippage allowed without delaying any immediate successor. Any activity with TF = 0 is strictly Critical.'
        ],
        invariantCondition: 'Critical Path Invariance: Every project network must possess at least one continuous critical path extending from the start node to the terminal end node with TF = 0.'
      },
      formalAlgorithm: {
        name: 'Tarjan\'s SCC Cycle Detector & CPM Two-Pass Float Resolver',
        pseudocode: [
          'FUNCTION DetectDeadlockCycle(Graph RAG):',
          '   Stack S; Index = 0; Cycles = []',
          '   FOR each node u in RAG DO:',
          '       IF u.index is UNDEFINED THEN StronglyConnect(u)',
          '   RETURN Cycles',
          'END FUNCTION',
          'FUNCTION SolveCPM(Activities):',
          '   // Forward Pass',
          '   FOR each Activity a in TopologicalSort(Activities) DO:',
          '       a.ES = (a.Pred.isEmpty) ? 0 : max(p.EF for p in a.Pred)',
          '       a.EF = a.ES + a.Duration',
          '   ProjectDuration = max(a.EF for a in Activities)',
          '   // Backward Pass',
          '   FOR each Activity a in ReverseTopologicalSort(Activities) DO:',
          '       a.LF = (a.Succ.isEmpty) ? ProjectDuration : min(s.LS for s in a.Succ)',
          '       a.LS = a.LF - a.Duration',
          '       a.TotalFloat = a.LS - a.ES',
          '       a.IsCritical = (a.TotalFloat == 0)',
          '   RETURN Activities',
          'END FUNCTION'
        ],
        timeComplexity: 'Deadlock Detection: O(|V| + |E|) via Tarjan\'s SCC. CPM Float Analysis: O(|V| + |E|) via two topological passes.',
        spaceComplexity: 'O(|V| + |E|) adjacency list and recursive call stack.',
        bestCase: 'O(|V| + |E|) linear resolution.',
        worstCase: 'O(|V| + |E|) linear resolution.'
      },
      realWorldAnalogy: 'Gridlock at an urban traffic intersection: 4 vehicles enter a 4-way box junction simultaneously, each waiting for the car ahead to advance (Circular Wait). Resolving it requires a police officer to back up (preempt) the least disruptive vehicle. In project management: Shipping an enterprise product where backend API delays immediately freeze QA, frontend, and regulatory compliance releases.',
      industryApplication: 'PostgreSQL and MySQL InnoDB latch contention detection and deadlock victim rollback, Linux kernel `lockdep` mutex static validation, and NASA / Boeing PERT defense procurement scheduling.'
    },
    solvedNumericalExample: {
      problemStatement: 'A distributed cloud migration program consists of 6 core activities: A (Architecture Setup, 3 days), B (Database Schema Migration, 4 days, pred: A), C (Containerization, 2 days, pred: A), D (Microservice API Refactor, 5 days, pred: B), E (Frontend Integration, 6 days, pred: C), and F (Production Cutover & Verification, 3 days, pred: D, E). Perform a complete CPM forward and backward pass to determine: (1) Early Start (ES) and Early Finish (EF) for all activities, (2) Late Start (LS) and Late Finish (LF), (3) Total Float (TF) and Free Float (FF) for each activity, and (4) The exact Critical Path and total project completion time.',
      givenData: {
        'Activity A': 'Duration 3d, Pred: None',
        'Activity B': 'Duration 4d, Pred: A',
        'Activity C': 'Duration 2d, Pred: A',
        'Activity D': 'Duration 5d, Pred: B',
        'Activity E': 'Duration 6d, Pred: C',
        'Activity F': 'Duration 3d, Pred: D, E'
      },
      stepByStepSolution: [
        {
          stepNumber: 1,
          stepTitle: 'Forward Pass (Calculate ES and EF)',
          formulaUsed: 'ES_j = max(EF_pred); EF_j = ES_j + Duration',
          calculation: 'A: ES=0, EF=3. B: ES=3, EF=7. C: ES=3, EF=5. D: ES=7, EF=12. E: ES=5, EF=11. F: ES=max(EF_D=12, EF_E=11)=12, EF=12+3=15.',
          intermediateResult: 'Total Project Duration = 15 days.'
        },
        {
          stepNumber: 2,
          stepTitle: 'Backward Pass (Calculate LF and LS)',
          formulaUsed: 'LF_i = min(LS_succ); LS_i = LF_i - Duration',
          calculation: 'F: LF=15, LS=12. D: LF=12, LS=7. E: LF=12, LS=6. B: LF=7, LS=3. C: LF=6, LS=4. A: LF=min(LS_B=3, LS_C=4)=3, LS=0.',
          intermediateResult: 'Established latest milestone boundaries without project slippage.'
        },
        {
          stepNumber: 3,
          stepTitle: 'Total Float & Free Float Analysis',
          formulaUsed: 'Total Float TF = LS - ES = LF - EF; Free Float FF = min(ES_succ) - EF',
          calculation: 'A: TF=0, FF=min(3,3)-3=0. B: TF=0, FF=7-7=0. C: TF=4-3=1, FF=5-5=0. D: TF=0, FF=12-12=0. E: TF=6-5=1, FF=12-11=1. F: TF=0, FF=15-15=0.',
          intermediateResult: 'Activities A, B, D, F have TF = 0. Activities C and E have TF = 1 day.'
        },
        {
          stepNumber: 4,
          stepTitle: 'Identify Critical Path',
          formulaUsed: 'Critical Path = Activities with TF = 0',
          calculation: 'Chain of zero-float tasks: A (3d) -> B (4d) -> D (5d) -> F (3d) = 3 + 4 + 5 + 3 = 15 days.',
          intermediateResult: 'Critical Path is A -> B -> D -> F.'
        }
      ],
      finalAnswer: 'Critical Path: A -> B -> D -> F. Total Project Duration: 15 days. Non-critical path A -> C -> E -> F has 1 day of Total Float (Buffer).',
      engineeringTakeaway: 'Engineers on activities C and E can be temporarily reallocated for up to 1 day to assist B or D without endangering the 15-day target completion deadline.'
    },
    interactiveWorkbench: {
      calculatorType: 'cpmNetwork',
      title: 'CPM Project Schedule & Total Float Workbench',
      formulaDisplay: 'Total Float = Late Start - Early Start | Free Float = min(ES_succ) - EF',
      defaultInputs: {
        actADuration: 3,
        actBDuration: 4,
        actCDuration: 2,
        actDDuration: 5,
        actEDuration: 6,
        actFDuration: 3
      }
    },
    vivaVoceQuestions: [
      {
        questionNumber: 1,
        question: 'Differentiate between Deadlock Prevention, Deadlock Avoidance, and Deadlock Detection/Recovery.',
        answer: 'Deadlock Prevention statically eliminates at least one of Coffman\'s 4 conditions at design time (e.g., global lock ordering). Deadlock Avoidance dynamically evaluates allocation requests at runtime using Banker\'s algorithm to never enter an unsafe state. Deadlock Detection allows deadlocks to occur, periodically inspects the Resource Allocation Graph for cycles, and initiates preemptive victim aborts.',
        conceptTested: 'Deadlock Handling Taxonomy'
      },
      {
        questionNumber: 2,
        question: 'Explain the difference between Total Float and Free Float, and why project managers buffer Free Float.',
        answer: 'Total Float is the maximum duration an activity can be delayed without delaying the final project finish date, but using it may consume float from downstream activities. Free Float is the duration an activity can be delayed without delaying the Early Start of ANY immediate successor task. Buffering Free Float protects project momentum without triggering panic across downstream teams.',
        conceptTested: 'Total vs Free Float Mechanics'
      },
      {
        questionNumber: 3,
        question: 'How does the Two-Phase Locking (2PL) protocol guarantee serializability, and why can it still produce deadlocks?',
        answer: '2PL mandates that a transaction must acquire all required locks during a Growing Phase and cannot acquire any new locks once it begins releasing them during the Shrinking Phase. This guarantees conflict serializability, but because transactions can hold resource R1 while requesting locked resource R2, circular wait deadlocks can still occur, requiring timeout or wait-die/wound-wait schemes.',
        conceptTested: 'Database Concurrency & 2PL Deadlocks'
      }
    ],
    gameplay: {
      objective: 'Analyze concurrent thread lock graphs to identify and break circular wait deadlocks using preemptive resource revoking, while concurrently managing a 5-activity CPM project network to absorb schedule delays without exceeding the release deadline.',
      rules: [
        'Threads (T1–T4) hold locks on Mutex resources (R1–R4). When a red circular wait cycle forms, click the optimal thread to abort/preempt and restore throughput with minimal cost.',
        'In the Project Management panel, task unexpected delays occur. Reallocate float buffers and engineer staffing without letting any Critical Path activity slip past day 0 float.',
        'Maintaining 99.99% system throughput and on-time sprint delivery achieves the Master Architect trophy.'
      ],
      controls: [
        'Click Thread Node in RAG graph to execute `Thread.interrupt()` or `ReleaseLock()`',
        'Slider to adjust resource priority weights',
        'CPM Staff Allocator: Drag engineer hours from non-critical activities (Float > 0) to Critical Path tasks'
      ],
      scoringSystem: '+300 pts per broken deadlock cycle without data corruption, +500 pts for delivering sprint within budget and zero critical path slippage.',
      pedagogicalOutcome: 'Mastery of concurrent thread synchronization, race condition remediation, and quantitative project critical path management.'
    }
  }
];
