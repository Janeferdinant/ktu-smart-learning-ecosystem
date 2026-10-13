import { Subject } from '../types/academic';

export const ACADEMIC_SUBJECTS: Subject[] = [
  {
    id: 'cst303-computer-networks',
    code: 'CST303',
    name: 'Computer Networks',
    department: 'Computer Science and Engineering',
    semester: 'S5 B.Tech',
    credits: 4,
    regulation: 'KTU 2019 Scheme',
    faculty: 'Jane Rose | Assistant Professor',
    description: 'Comprehensive study of computer networking principles, OSI/TCP-IP models, switching, routing protocols (OSPF, RIPv2), flow control, congestion avoidance, transport protocols, and socket programming.',
    icon: 'Network',
    gradient: 'from-blue-600 to-indigo-600',
    modules: [
      {
        id: 1,
        moduleNumber: 1,
        title: 'Introduction to Computer Networks & Physical Layer',
        description: 'Building network topologies, OSI 7-layer reference model, TCP/IP architecture, transmission media, circuit and packet switching fundamentals.',
        hoursAllocated: 9,
        keyTopics: [
          'OSI 7-Layer Architecture and Protocol Encapsulation',
          'TCP/IP 4-Layer Reference Model Comparison',
          'Transmission Media: Guided vs Unguided Characteristics',
          'Circuit Switching vs Packet Switching Delay Analysis',
          'Physical Layer Signaling, Bandwidth & Nyquist/Shannon Capacity'
        ],
        resources: [
          { id: 'cn-m1-notes', name: 'Module 1 Core Lecture Notes', type: 'notes', sizeBytes: 245000, filename: 'CST303_Module_1_Lecture_Notes.pdf', originalPath: 'subjects/cst303-computer-networks/modules/module-01/notes/lecture-notes.pdf' }
        ]
      },
      {
        id: 2,
        moduleNumber: 2,
        title: 'Data Link Layer & MAC Protocols',
        description: 'Framing techniques, error detection and correction (CRC, Hamming code), sliding window flow control protocols, and medium access control mechanisms.',
        hoursAllocated: 10,
        keyTopics: [
          'Framing: Bit-stuffing & Byte-stuffing Algorithms',
          'Error Detection: CRC Generator Polynomial & Checksums',
          'Sliding Window: Stop-and-Wait, Go-Back-N, Selective Repeat',
          'MAC Protocols: Pure ALOHA, Slotted ALOHA, CSMA/CD, CSMA/CA',
          'IEEE 802.3 Ethernet Standards and Switching Hubs'
        ],
        resources: [
          { id: 'cn-m2-notes', name: 'Module 2 Flow & MAC Control Notes', type: 'notes', sizeBytes: 312000, filename: 'CST303_Module_2_Data_Link.pdf', originalPath: 'subjects/cst303-computer-networks/modules/module-02/notes/data-link.pdf' }
        ]
      },
      {
        id: 3,
        moduleNumber: 3,
        title: 'Network Layer & Routing Protocols',
        description: 'IPv4 and IPv6 addressing, subnetting and CIDR, shortest path routing, Distance Vector (RIPv2), Link State (OSPF), and intra/inter-domain routing.',
        hoursAllocated: 10,
        keyTopics: [
          'IPv4 Header Format, Classless Addressing (CIDR), Subnetting',
          'IPv6 Address Space and Dual-Stack Transition Mechanisms',
          'Dijkstra Shortest Path Algorithm & Link State Routing (OSPF)',
          'Bellman-Ford Algorithm & Distance Vector Routing (RIPv2)',
          'Count-to-Infinity Problem, Split Horizon & Poison Reverse',
          'BGP Inter-domain Routing and Border Gateways'
        ],
        resources: [
          { id: 'cn-m3-ospf', name: 'OSPF Routing Protocol Lab Reference', type: 'lab', sizeBytes: 79946, filename: 'OSPF_Routing.pdf', originalPath: 'OSPF_Routing.pdf' },
          { id: 'cn-m3-rip', name: 'RIPv2 Distance Vector Routing Lab Reference', type: 'lab', sizeBytes: 77515, filename: 'RIPv2_Routing.pdf', originalPath: 'RIPv2_Routing.pdf' }
        ]
      },
      {
        id: 4,
        moduleNumber: 4,
        title: 'Transport Layer Protocols & Congestion Control',
        description: 'Connectionless UDP vs connection-oriented TCP, three-way handshake, state transitions, TCP sliding window, and Tahoe/Reno congestion control algorithms.',
        hoursAllocated: 9,
        keyTopics: [
          'Transport Layer Addressing and Port Multiplexing',
          'UDP Datagram Format and Real-Time Streaming Applications',
          'TCP Segment Structure and 3-Way Connection Handshake',
          'TCP Connection Teardown (FIN/ACK State Diagram)',
          'TCP Flow Control: Silly Window Syndrome and Clark Solution',
          'TCP Congestion Control: AIMD, Slow Start, Congestion Avoidance, Fast Retransmit'
        ],
        resources: [
          { id: 'cn-m4-pdf', name: 'Module 4 Master Transport Notes', type: 'notes', sizeBytes: 6826586, filename: 'MODULE 4 (1).pdf', originalPath: 'MODULE 4 (1).pdf' },
          { id: 'cn-m4-pptx', name: 'Module 4 Transport Layer Slide Deck', type: 'presentation', sizeBytes: 3431734, filename: 'module 4 mc (1).pptx', originalPath: 'module 4 mc (1).pptx' },
          { id: 'cn-m4-doc', name: 'Module 4 Comprehensive Study Document', type: 'notes', sizeBytes: 347736, filename: 'module 4.docx', originalPath: 'module 4.docx' }
        ]
      },
      {
        id: 5,
        moduleNumber: 5,
        title: 'Application Layer Services & Socket Programming',
        description: 'Domain Name System (DNS), HTTP/1.1 and HTTP/2, Electronic Mail (SMTP, POP3, IMAP), File Transfer Protocol (FTP), and client-server BSD socket programming.',
        hoursAllocated: 8,
        keyTopics: [
          'Domain Name System (DNS): Hierarchical Name Resolution',
          'Hypertext Transfer Protocol (HTTP): Persistent Connections & Cookies',
          'E-mail Architecture: SMTP, POP3, IMAP and MIME Headers',
          'File Transfer Protocol: Control and Data Connections',
          'Network Socket Programming: TCP Client-Server Sockets in C/Java'
        ],
        resources: [
          { id: 'cn-m5-notes', name: 'Module 5 Application Layer Notes', type: 'notes', sizeBytes: 289000, filename: 'CST303_Module_5_Application.pdf', originalPath: 'subjects/cst303-computer-networks/modules/module-05/notes/application.pdf' }
        ]
      }
    ],
    questionPapers: [
      { id: 'qp-dec2022-b1', title: 'CST303 University Question Paper - Dec 2022 (Set B1)', examMonthYear: 'December 2022', scheme: 'KTU 2019', category: 'university-pyq', hasSolution: true, filename: 'B1 CST303 CN QP - Dec 2022.pdf', sizeBytes: 70825 },
      { id: 'qp-dec2022-b1-1', title: 'CST303 University Question Paper - Dec 2022 (Set B1 Alt)', examMonthYear: 'December 2022', scheme: 'KTU 2019', category: 'university-pyq', hasSolution: true, filename: 'B1 CST303 CN QP1 - Dec 2022.pdf', sizeBytes: 70826 },
      { id: 'qp-dec2021', title: 'CST303 Computer Networks Regular Exam - Dec 2021', examMonthYear: 'December 2021', scheme: 'KTU 2019', category: 'university-pyq', hasSolution: true, filename: 'CST303 COMPUTER NETWORKS, DECEMBER 2021 (1).pdf', sizeBytes: 1868109 },
      { id: 'qp-2022-reg', title: 'CST303 University Question Paper 2022 Regular', examMonthYear: 'May 2022', scheme: 'KTU 2019', category: 'university-pyq', hasSolution: false, filename: 'Qp-2022.pdf', sizeBytes: 103950 },
      { id: 'qp-apr2018', title: 'S6 B.Tech Computer Networks Regular Exam - April 2018', examMonthYear: 'April 2018', scheme: 'KTU 2015', category: 'university-pyq', hasSolution: false, filename: 's6-b-tech-computer-networks-april-2018.pdf', sizeBytes: 71035 },
      { id: 'qp-may2019', title: 'S6 CS Computer Networks Regular Exam - May 2019', examMonthYear: 'May 2019', scheme: 'KTU 2015', category: 'university-pyq', hasSolution: false, filename: 's6-cs-computer-networks-may-2019-1.pdf', sizeBytes: 69399 },
      { id: 'qp-model-1', title: 'PCCST501 Computer Networks Model Exam Paper - Set 1', examMonthYear: 'Model Set 1', scheme: 'KTU 2019', category: 'model-paper', hasSolution: true, filename: 'PCCST501_Computer_Networks_Model_Paper_Set_1.pdf', sizeBytes: 36948 },
      { id: 'qp-model-2', title: 'PCCST501 Computer Networks Model Exam Paper - Set 2', examMonthYear: 'Model Set 2', scheme: 'KTU 2019', category: 'model-paper', hasSolution: true, filename: 'PCCST501_Computer_Networks_Model_Paper_Set_2.pdf', sizeBytes: 36234 },
      { id: 'qp-model-3', title: 'PCCST501 Computer Networks Model Exam Paper - Set 3', examMonthYear: 'Model Set 3', scheme: 'KTU 2019', category: 'model-paper', hasSolution: true, filename: 'PCCST501_Computer_Networks_Model_Paper_Set_3.pdf', sizeBytes: 36238 },
      { id: 'qp-model-4', title: 'PCCST501 Computer Networks Model Exam Paper - Set 4', examMonthYear: 'Model Set 4', scheme: 'KTU 2019', category: 'model-paper', hasSolution: true, filename: 'PCCST501_Computer_Networks_Model_Paper_Set_4.pdf', sizeBytes: 36440 },
      { id: 'qp-model-5', title: 'PCCST501 Computer Networks Model Exam Paper - Set 5', examMonthYear: 'Model Set 5', scheme: 'KTU 2019', category: 'model-paper', hasSolution: true, filename: 'PCCST501_Computer_Networks_Model_Paper_Set_5.pdf', sizeBytes: 36121 },
      { id: 'qp-second-series', title: 'Computer Networks Second Series Internal Question Bank', examMonthYear: 'Series II', scheme: 'KTU 2019', category: 'series-exam', hasSolution: true, filename: 'second series question bank.pdf', sizeBytes: 86883 }
    ],
    answerKeys: [
      {
        id: 'scheme-dec2022',
        title: 'CST303 Official Valuation Scheme & Answer Key - Dec 2022 (Set B2)',
        examMonthYear: 'December 2022',
        type: 'official-valuation-scheme',
        filename: 'B2 CST303 CN QP SCHEME1-Dec 2022.pdf',
        sizeBytes: 779143,
        keyHighlights: [
          'Detailed mark distribution per question sub-part',
          'Dijkstra shortest path matrix and step marks',
          'CRC division steps and remainder validation criteria',
          'TCP connection teardown finite state machine rubrics'
        ]
      },
      {
        id: 'scheme-draft1',
        title: 'CST303 Comprehensive University Draft Valuation Scheme 1',
        examMonthYear: 'December 2021 / 2022',
        type: 'draft-scheme',
        filename: 'CST303-DRAFT SCHEME1.pdf',
        sizeBytes: 697731,
        keyHighlights: [
          'Complete numerical solutions for Subnetting and CIDR',
          'Distance Vector routing update iteration tables',
          'Token Bucket vs Leaky Bucket traffic policing rubrics',
          'Socket API call sequence diagrams and parameter checks'
        ]
      }
    ]
  },
  {
    id: 'cst205-object-oriented-programming',
    code: 'CST205',
    name: 'Object Oriented Programming using Java',
    department: 'Computer Science and Engineering',
    semester: 'S3 / S4 B.Tech',
    credits: 4,
    regulation: 'KTU 2019 Scheme',
    faculty: 'Jane Rose | Assistant Professor',
    description: 'Object-oriented programming paradigm, JVM internals, garbage collection, class hierarchies, polymorphism, robust exception handling, Java Swing GUI, delegation event model, and JDBC query processing.',
    icon: 'Code2',
    gradient: 'from-amber-600 to-orange-600',
    modules: [
      {
        id: 1,
        moduleNumber: 1,
        title: 'OOP Concepts, Java Fundamentals & Language Basics',
        description: 'Procedure vs object-oriented paradigm, Java Virtual Machine (JVM), bytecode, primitive datatypes, wrapper classes, operators, control structures, and class loaders.',
        hoursAllocated: 10,
        keyTopics: [
          'OOP Pillars: Abstraction, Encapsulation, Inheritance, Polymorphism',
          'JVM Internal Architecture: ClassLoader, JVM Memory, Execution Engine',
          'Primitive Types, Literals, Operators and Type Casting Mechanics',
          'Wrapper Classes, Autoboxing and Unboxing Internals',
          'Class Definition, Constructors, this Keyword, and Access Specifiers',
          'Arrays, String, and Vector Collections'
        ],
        resources: [
          { id: 'oop-1-1', name: '1.1 Basic OOP Concepts', type: 'presentation', sizeBytes: 2411520, filename: '1.1 Basic OOP concepts.ppt', originalPath: 'oops/1.1 Basic OOP concepts.ppt' },
          { id: 'oop-1-2', name: '1.2 Introduction Java (upto JVM)', type: 'presentation', sizeBytes: 686592, filename: '1.2 Introduction java (upto JVM).ppt', originalPath: 'oops/1.2 Introduction java (upto JVM).ppt' },
          { id: 'oop-1-10', name: '1.10 Array, String & Vector Classes', type: 'presentation', sizeBytes: 226582, filename: '1.10 Array, String and Vector classes.pptx', originalPath: 'oops/1.10 Array, String and Vector classes.pptx' },
          { id: 'oop-1-12', name: '1.12 Constructor and this Keyword', type: 'presentation', sizeBytes: 290816, filename: '1.12 constructor this.ppt', originalPath: 'oops/1.12 constructor this.ppt' },
          { id: 'oop-1-14', name: '1.14 Abstract Classes and Contracts', type: 'presentation', sizeBytes: 178630, filename: '1.14  ABSTRACT CLASS.pptx', originalPath: 'oops/1.14  ABSTRACT CLASS.pptx' }
        ]
      },
      {
        id: 2,
        moduleNumber: 2,
        title: 'Inheritance, Polymorphism & Inner Classes',
        description: 'Subclassing, super keyword, method overriding, dynamic method dispatch, static bindings, final variables and methods, inner classes, and package organization.',
        hoursAllocated: 10,
        keyTopics: [
          'Inheritance Types and super Keyword Semantics',
          'Method Overloading vs Dynamic Method Overriding',
          'Constructor Calling Sequence in Class Hierarchies',
          'Static Members, Static Blocks and Math Utilities',
          'Final Keyword: Constants, Immutability & Preventing Subclassing',
          'Inner Classes: Member, Static Nested & Anonymous Classes'
        ],
        resources: [
          { id: 'oop-2-1', name: '2.1 Polymorphism & Method Overloading', type: 'presentation', sizeBytes: 150743, filename: '2.1 POLYMORPHISM-METHOD OVERLOADING, USING OBJECT AS PARAMETER.pptx', originalPath: 'oops/2.1 POLYMORPHISM-METHOD OVERLOADING, USING OBJECT AS PARAMETER.pptx' },
          { id: 'oop-2-2', name: '2.2 Returning Objects & Static Members', type: 'presentation', sizeBytes: 312582, filename: '2.2 returning objects,recursion static member.pptx', originalPath: 'oops/2.2 returning objects,recursion static member.pptx' },
          { id: 'oop-2-3', name: '2.3 Final Variables & Inner Classes', type: 'presentation', sizeBytes: 193220, filename: '2.3 final variables inner class.pptx', originalPath: 'oops/2.3 final variables inner class.pptx' },
          { id: 'oop-2-4', name: '2.4 Inheritance Hierarchies', type: 'presentation', sizeBytes: 314430, filename: '2.4 inheritance.pptx', originalPath: 'oops/2.4 inheritance.pptx' }
        ]
      },
      {
        id: 3,
        moduleNumber: 3,
        title: 'Interfaces & Exception Handling',
        description: 'Interface inheritance, multiple interface implementation, checked and unchecked exceptions, try-catch-finally blocks, throw/throws, and custom exceptions.',
        hoursAllocated: 9,
        keyTopics: [
          'Interfaces: Defining, Implementing, and Partial Implementations',
          'Multiple Interface Inheritance and Default/Static Interface Methods',
          'Throwable Hierarchy: Error vs Exception',
          'Checked vs Unchecked (Runtime) Exception Handling',
          'try-catch-finally Block Execution Flow and Resource Cleanup',
          'throw and throws Clauses in Method Signatures',
          'Creating Custom User-Defined Exception Classes'
        ],
        resources: [
          { id: 'oop-3-2', name: 'M3 - 2 Interfaces REVISED', type: 'presentation', sizeBytes: 258048, filename: 'M3 - 2 - Interfaces REVISED.ppt', originalPath: 'oops/M3 - 2 - Interfaces REVISED.ppt' },
          { id: 'oop-3-3', name: 'M3 - 3 Exception Handling Fundamentals', type: 'presentation', sizeBytes: 671600, filename: 'M3 - 3 (rev)EXCEPTION HANDLING(checked, unchecked, try,catch).pptx', originalPath: 'oops/M3 - 3 (rev)EXCEPTION HANDLING(checked, unchecked, try,catch).pptx' },
          { id: 'oop-3-5', name: 'M3 - 5 throw, throws & finally Deep Dive', type: 'presentation', sizeBytes: 277504, filename: 'M3 - 5 throw, throws and finally.ppt', originalPath: 'oops/M3 - 5 throw, throws and finally.ppt' },
          { id: 'oop-3-6', name: 'M3 - 6 User Defined Exceptions in OOP', type: 'presentation', sizeBytes: 49067, filename: 'M3-6 l create new user defined exception OOP.pptx', originalPath: 'oops/M3-6 l create new user defined exception OOP.pptx' }
        ]
      },
      {
        id: 4,
        moduleNumber: 4,
        title: 'AWT, Swings & Event Handling Architecture',
        description: 'Java Swing framework, Model-View-Controller (MVC) pattern, lightweight vs heavyweight components, layout managers, delegation event model, and event listeners.',
        hoursAllocated: 10,
        keyTopics: [
          'AWT vs Swings Architecture: Lightweight Components',
          'MVC Architecture in Java Swing Components',
          'Swing Containers: JFrame, JPanel, JDialog',
          'Atomic Swing Controls: JLabel, JButton, JTextField, JCheckBox',
          'Layout Managers: FlowLayout, BorderLayout, GridLayout, GridBagLayout',
          'Delegation Event Model: Event Sources, Event Objects, Event Listeners',
          'Handling ActionEvent, MouseEvent, KeyEvent, and WindowEvent'
        ],
        resources: [
          { id: 'oop-4-1', name: 'M4 - 1 Overview AWT & Swing Fundamentals', type: 'presentation', sizeBytes: 329798, filename: 'M4 -1 -Overview AWT  Swings fundamentals, Swing Key Features.pptx', originalPath: 'oops/M4 -1 -Overview AWT  Swings fundamentals, Swing Key Features.pptx' },
          { id: 'oop-4-2', name: 'M4 - 2 MVC Pattern & Swing Components', type: 'presentation', sizeBytes: 293601, filename: 'M4 -2 - MVC, Swing Controls, Components and Containers.pptx', originalPath: 'oops/M4 -2 - MVC, Swing Controls, Components and Containers.pptx' },
          { id: 'oop-4-3', name: 'M4 - 3 Swing Packages: JFrame, JLabel, Buttons', type: 'presentation', sizeBytes: 500109, filename: 'M4 -3 - Swing packagesExploring Swings –JFrame, JLabel, The Swing Buttons, JTextField - Copy.pptx', originalPath: 'oops/M4 -3 - Swing packagesExploring Swings –JFrame, JLabel, The Swing Buttons, JTextField - Copy.pptx' },
          { id: 'oop-4-5', name: 'M4 - 5 Swing Layout Managers Master Guide', type: 'presentation', sizeBytes: 399425, filename: 'M4 -5 Swing Layout Managers.pptx', originalPath: 'oops/M4 -5 Swing Layout Managers.pptx' },
          { id: 'oop-4-8', name: 'M4 - 8 Delegation Event Model & Listeners', type: 'presentation', sizeBytes: 268313, filename: 'M4 -8 REVISED -Sources of Events, Event Listener Interfaces, Using the Delegation.pptx', originalPath: 'oops/M4 -8 REVISED -Sources of Events, Event Listener Interfaces, Using the Delegation.pptx' },
          { id: 'oop-solid', name: 'SOLID Principles for OOP Design', type: 'notes', sizeBytes: 5567005, filename: 'SOLID principles module 4 oops.pdf', originalPath: 'EXTRA/SOLID principles module 4 oops.pdf' }
        ]
      },
      {
        id: 5,
        moduleNumber: 5,
        title: 'Database Connectivity (JDBC) & Query Processing',
        description: 'JDBC architecture, JDBC drivers (Type 1-4), DriverManager, Connection, Statement, PreparedStatement, ResultSet, transactions, and SQL query processing.',
        hoursAllocated: 7,
        keyTopics: [
          'JDBC Architecture: 2-tier and 3-tier Application Models',
          'JDBC Driver Types: Native-API, Network-Protocol, Pure Java Thin Driver',
          'Establishing Database Connections with DriverManager',
          'Executing SQL Statements: executeQuery(), executeUpdate(), execute()',
          'Navigating and Updating Data with ResultSet Objects',
          'Parameterized Queries with PreparedStatement against SQL Injection'
        ],
        resources: [
          { id: 'oop-5-9', name: 'M5 - 9 JDBC Architecture & SQL Query Execution', type: 'presentation', sizeBytes: 738233, filename: 'M5 - 9(revised)- JDBC overview, Creating and Executing Queries – create table,.pptx', originalPath: 'oops/M5 - 9(revised)- JDBC overview, Creating and Executing Queries – create table,.pptx' }
        ]
      }
    ],
    questionPapers: [
      { id: 'qp-oop-q1', title: 'CST205 OOP Java Question Bank Set 1', examMonthYear: 'Series I', scheme: 'KTU 2019', category: 'series-exam', hasSolution: true, filename: 'qstn 1.pdf', sizeBytes: 172745 },
      { id: 'qp-oop-q2', title: 'CST205 OOP Java Question Bank Set 2', examMonthYear: 'Series II', scheme: 'KTU 2019', category: 'series-exam', hasSolution: true, filename: 'qstn2.pdf', sizeBytes: 172744 },
      { id: 'qp-oop-q3', title: 'CST205 OOP Java Question Bank Set 3', examMonthYear: 'Series III', scheme: 'KTU 2019', category: 'series-exam', hasSolution: true, filename: 'q3.pdf', sizeBytes: 236906 }
    ],
    answerKeys: []
  },
  {
    id: 'pcadt502-robotics',
    code: 'PCADT502',
    name: 'Robotics and Autonomous Systems',
    department: 'Computer Science and Engineering',
    semester: 'S5 B.Tech',
    credits: 4,
    regulation: 'KTU 2019 Scheme',
    faculty: 'Jane Rose | Assistant Professor',
    description: 'Kinematics, coordinate transformations, actuators, sensors, path planning, and autonomous robotic navigation.',
    icon: 'Bot',
    gradient: 'from-emerald-600 to-teal-600',
    modules: [
      {
        id: 1,
        moduleNumber: 1,
        title: 'Robotics Foundations & Spatial Kinematics',
        description: 'Robot anatomy, degrees of freedom, end effectors, homogeneous transformation matrices, forward and inverse kinematics.',
        hoursAllocated: 10,
        keyTopics: [
          'Spatial Descriptions: Position, Orientation, and Frames',
          'Homogeneous Transformation Matrices & DH Parameters',
          'Forward Kinematics vs Inverse Kinematics Closed-Form Solutions',
          'Degrees of Freedom (DOF) and Robot Workspace Envelopes'
        ],
        resources: [
          { id: 'rob-m1', name: 'Module 1 Robotics Foundation Notes', type: 'notes', sizeBytes: 655767, filename: 'S5 PCADT502 Robotics Module 1.pdf', originalPath: 'S5 PCADT502 Robotics Module 1.pdf' }
        ]
      },
      {
        id: 2,
        moduleNumber: 2,
        title: 'Robot Actuators & Drive Systems',
        description: 'Electric motors, stepper drives, pneumatic and hydraulic power transmission in robotics.',
        hoursAllocated: 9,
        keyTopics: ['DC Servomotors', 'Stepper Motor PWM Control', 'Harmonic Drives', 'Sensor Feedback'],
        resources: []
      },
      {
        id: 3,
        moduleNumber: 3,
        title: 'Sensors, Vision & Perception',
        description: 'Range finders, LiDAR, ultrasonic sensors, computer vision pipeline, object tracking and SLAM.',
        hoursAllocated: 10,
        keyTopics: ['LiDAR Point Clouds', 'Camera Calibration', 'Feature Extraction', 'Visual Odometry'],
        resources: []
      },
      {
        id: 4,
        moduleNumber: 4,
        title: 'Trajectory Generation & Motion Planning',
        description: 'Polynomial trajectory interpolation, potential fields, PRM, and RRT exploration algorithms.',
        hoursAllocated: 9,
        keyTopics: ['Cubic Polynomial Trajectories', 'Artificial Potential Fields', 'Rapidly-exploring Random Trees (RRT)'],
        resources: []
      },
      {
        id: 5,
        moduleNumber: 5,
        title: 'Autonomous Mobile Robots & Control Architecture',
        description: 'Differential drive kinematics, ROS architecture, feedback control, and obstacle avoidance.',
        hoursAllocated: 8,
        keyTopics: ['Differential Drive Kinematics', 'Robot Operating System (ROS)', 'PID Trajectory Control'],
        resources: []
      }
    ],
    questionPapers: [],
    answerKeys: []
  },
  {
    id: 'pecst521-software-project-management',
    code: 'PECST521',
    name: 'Software Project Management',
    department: 'Computer Science and Engineering',
    semester: 'S5 B.Tech',
    credits: 3,
    regulation: 'KTU 2019 Scheme',
    faculty: 'Jane Rose | Assistant Professor',
    description: 'Software development lifecycle economics, project planning, cost estimation (COCOMO), risk management, and agile monitoring.',
    icon: 'Briefcase',
    gradient: 'from-purple-600 to-indigo-600',
    modules: [
      {
        id: 1,
        moduleNumber: 1,
        title: 'Introduction to SPM & Project Evaluation',
        description: 'Project vs operational work, contract management, cash flow forecasting, net present value (NPV), and internal rate of return (IRR).',
        hoursAllocated: 9,
        keyTopics: [
          'Software Project Management Scope and Challenges',
          'Cost-Benefit Evaluation: Payback Period, ROI, NPV Analysis',
          'Step-Wise Project Planning Framework',
          'Strategic Assessment and Technical Risk Evaluation'
        ],
        resources: [
          { id: 'spm-m1', name: 'Module 1 Software Project Management Notes', type: 'notes', sizeBytes: 551115, filename: 'S5 PECST521 SPM Module 1.pdf', originalPath: 'S5 PECST521 SPM Module 1.pdf' }
        ]
      },
      {
        id: 2,
        moduleNumber: 2,
        title: 'Project Planning & Effort Estimation',
        description: 'Work breakdown structures (WBS), Function Point Analysis (FPA), and algorithmic COCOMO models.',
        hoursAllocated: 10,
        keyTopics: ['Work Breakdown Structure (WBS)', 'COCOMO I and COCOMO II', 'Function Point Analysis (FPA)'],
        resources: []
      },
      {
        id: 3,
        moduleNumber: 3,
        title: 'Activity Planning & Scheduling',
        description: 'Critical Path Method (CPM), PERT network calculations, and resource allocation smoothing.',
        hoursAllocated: 9,
        keyTopics: ['Critical Path Method (CPM)', 'PERT Expected Durations', 'Gantt Charts & Resource Allocation'],
        resources: []
      },
      {
        id: 4,
        moduleNumber: 4,
        title: 'Risk Management & Quality Control',
        description: 'Risk identification, risk exposure matrices, mitigation strategies, and software quality metrics.',
        hoursAllocated: 9,
        keyTopics: ['Risk Breakdown Structure', 'Risk Exposure Calculation', 'Earned Value Management (EVM)'],
        resources: []
      },
      {
        id: 5,
        moduleNumber: 5,
        title: 'Managing People & Agile Software Teams',
        description: 'Team dynamics, motivation theories, Scrum sprint ceremonies, and contract closure.',
        hoursAllocated: 9,
        keyTopics: ['Maslow & Herzberg Motivation Models', 'Scrum Sprint Burndown Charts', 'Project Post-Mortem Reviews'],
        resources: []
      }
    ],
    questionPapers: [],
    answerKeys: []
  }
];
