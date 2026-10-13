export interface TeachingSession {
  session: number;
  durationHours: number;
  module: number;
  topic: string;
  learningOutcomes: string;
  teachingMethod: 'Lecture' | 'Demonstration' | 'Discussion' | 'Lab' | 'Activity';
  learningResources: string;
  assessment: string;
  practicalActivity: string;
}

export interface SubjectTeachingPlan {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  regulation: string;
  totalHours: number;
  faculty: string;
  moduleBreakdown: { module: number; hours: number }[];
  sessions: TeachingSession[];
}

// 1. CST303 Computer Networks 46-Hour Plan
const cnSessions: TeachingSession[] = [
  // Module 1 (9 Hours)
  { session: 1, durationHours: 1, module: 1, topic: 'Introduction to Data Communication & Network Topologies', learningOutcomes: 'Identify mesh, star, bus, and hybrid topologies', teachingMethod: 'Lecture', learningResources: 'Tanenbaum Ch 1, M1 Notes', assessment: 'Discussion on real topologies', practicalActivity: 'Network cable crimping overview' },
  { session: 2, durationHours: 1, module: 1, topic: 'OSI 7-Layer Reference Model Architecture', learningOutcomes: 'Explain functionality of Physical, Data Link, Network layers', teachingMethod: 'Lecture', learningResources: 'M1 Slide Deck, Forouzan Ch 2', assessment: 'Short concept quiz', practicalActivity: 'Wireshark layer inspection demo' },
  { session: 3, durationHours: 1, module: 1, topic: 'OSI Transport, Session, Presentation & Application Layers', learningOutcomes: 'Explain end-to-end transport and application layer roles', teachingMethod: 'Lecture', learningResources: 'M1 Slide Deck', assessment: 'Layer matching exercise', practicalActivity: 'Wireshark protocol dissection' },
  { session: 4, durationHours: 1, module: 1, topic: 'TCP/IP 4-Layer Architecture vs OSI Model', learningOutcomes: 'Contrast protocol encapsulation in TCP/IP vs OSI', teachingMethod: 'Discussion', learningResources: 'RFC 1122, M1 Notes', assessment: 'Comparative table assignment', practicalActivity: 'Packet header header inspection' },
  { session: 5, durationHours: 1, module: 1, topic: 'Transmission Media: Twisted Pair, Coaxial & Fiber Optics', learningOutcomes: 'Evaluate bandwidth, attenuation and noise immunity', teachingMethod: 'Lecture', learningResources: 'Tanenbaum Ch 2', assessment: 'Medium selection problem', practicalActivity: 'Fiber optic connector inspection' },
  { session: 6, durationHours: 1, module: 1, topic: 'Wireless Transmission: Radio, Microwave & Infrared', learningOutcomes: 'Analyze spectrum allocation and wireless path loss', teachingMethod: 'Lecture', learningResources: 'Forouzan Ch 3', assessment: 'Frequency calculation quiz', practicalActivity: 'WiFi analyzer spectrum survey' },
  { session: 7, durationHours: 1, module: 1, topic: 'Circuit Switching vs Packet Switching Networks', learningOutcomes: 'Derive transmission, propagation, and queuing delays', teachingMethod: 'Lecture', learningResources: 'M1 Notes', assessment: 'Delay derivation problem', practicalActivity: 'Queue simulator demonstration' },
  { session: 8, durationHours: 1, module: 1, topic: 'Physical Layer Impairments & Transmission Limitations', learningOutcomes: 'Compute maximum data rates using Nyquist and Shannon theorems', teachingMethod: 'Lecture', learningResources: 'Tanenbaum Ch 2', assessment: 'Numerical problem solving', practicalActivity: 'Signal-to-noise ratio calculation' },
  { session: 9, durationHours: 1, module: 1, topic: 'Module 1 Synthesis & Previous KTU Question Review', learningOutcomes: 'Solve KTU 3-mark and 14-mark university exam questions', teachingMethod: 'Discussion', learningResources: 'Dec 2022 / Dec 2021 PYQ', assessment: 'Module 1 diagnostic test', practicalActivity: 'Question bank self-assessment' },

  // Module 2 (10 Hours)
  { session: 10, durationHours: 1, module: 2, topic: 'Data Link Layer Design Issues & Framing Techniques', learningOutcomes: 'Implement character count, byte stuffing, and bit stuffing', teachingMethod: 'Lecture', learningResources: 'M2 Notes, Forouzan Ch 9', assessment: 'Bit-stuffing coding exercise', practicalActivity: 'Bit-stuffing Python simulation' },
  { session: 11, durationHours: 1, module: 2, topic: 'Error Detection: Parity Check, Longitudinal Redundancy & Checksums', learningOutcomes: 'Calculate 16-bit Internet checksum algorithm', teachingMethod: 'Lecture', learningResources: 'M2 Notes', assessment: 'Checksum computation exercise', practicalActivity: 'Checksum verification program' },
  { session: 12, durationHours: 1, module: 2, topic: 'Cyclic Redundancy Check (CRC) Polynomial Mathematics', learningOutcomes: 'Derive CRC frame check sequences with generator polynomials', teachingMethod: 'Lecture', learningResources: 'M2 Slide Deck', assessment: 'CRC division step worksheet', practicalActivity: 'CRC error detection sandbox' },
  { session: 13, durationHours: 1, module: 2, topic: 'Error Correction: Hamming Code & Forward Error Correction', learningOutcomes: 'Construct Hamming parity bit positions and correct single-bit errors', teachingMethod: 'Lecture', learningResources: 'Tanenbaum Ch 3', assessment: 'Hamming distance problem', practicalActivity: 'Hamming code generator demo' },
  { session: 14, durationHours: 1, module: 2, topic: 'Elementary Flow Control: Unrestricted Simplex & Stop-and-Wait', learningOutcomes: 'Analyze link utilization and sender wait times', teachingMethod: 'Lecture', learningResources: 'M2 Notes', assessment: 'Utilization formula quiz', practicalActivity: 'Stop-and-wait animation step-through' },
  { session: 15, durationHours: 1, module: 2, topic: 'Sliding Window Protocols: Go-Back-N ARQ Architecture', learningOutcomes: 'Trace sender/receiver window buffers and timeout retransmissions', teachingMethod: 'Lecture', learningResources: 'Tanenbaum Ch 3', assessment: 'Sequence number derivation', practicalActivity: 'Go-Back-N visual simulator' },
  { session: 16, durationHours: 1, module: 2, topic: 'Selective Repeat ARQ Protocol & Window Sizing Limits', learningOutcomes: 'Prove why window size must be <= 2^(n-1)', teachingMethod: 'Lecture', learningResources: 'Forouzan Ch 11', assessment: 'Window overflow problem', practicalActivity: 'Selective repeat protocol trace' },
  { session: 17, durationHours: 1, module: 2, topic: 'Medium Access Control: Pure ALOHA and Slotted ALOHA', learningOutcomes: 'Derive maximum throughput S=1/(2e) and S=1/e', teachingMethod: 'Lecture', learningResources: 'Tanenbaum Ch 4', assessment: 'Throughput derivation quiz', practicalActivity: 'ALOHA collision simulator' },
  { session: 18, durationHours: 1, module: 2, topic: 'Carrier Sense Multiple Access: CSMA/CD and CSMA/CA', learningOutcomes: 'Explain binary exponential backoff algorithm in Ethernet & 802.11', teachingMethod: 'Lecture', learningResources: 'IEEE 802.3 Spec', assessment: 'Slot time numerical problem', practicalActivity: 'Wireshark collision trace' },
  { session: 19, durationHours: 1, module: 2, topic: 'Module 2 University Problem Solving & Scheme Review', learningOutcomes: 'Solve KTU model paper sliding window and CRC questions', teachingMethod: 'Discussion', learningResources: 'PCCST501 Model Papers 1-3', assessment: 'Formative quiz on Module 2', practicalActivity: 'Peer review of derivations' },

  // Module 3 (10 Hours)
  { session: 20, durationHours: 1, module: 3, topic: 'Network Layer Design: Store-and-Forward Packet Switching', learningOutcomes: 'Distinguish virtual-circuit service and datagram subnets', teachingMethod: 'Lecture', learningResources: 'M3 Notes, Tanenbaum Ch 5', assessment: 'Datagram vs VC comparison', practicalActivity: 'Routing table inspection' },
  { session: 21, durationHours: 1, module: 3, topic: 'IPv4 Addressing Architecture, Classes & Subnetting', learningOutcomes: 'Compute network address, broadcast address, and host ranges', teachingMethod: 'Lecture', learningResources: 'M3 Notes', assessment: 'Subnet mask calculation sheet', practicalActivity: 'Subnet calculator tool demo' },
  { session: 22, durationHours: 1, module: 3, topic: 'Classless Inter-Domain Routing (CIDR) & Supernetting', learningOutcomes: 'Perform longest prefix matching and route aggregation', teachingMethod: 'Lecture', learningResources: 'RFC 1519, M3 Notes', assessment: 'CIDR prefix allocation task', practicalActivity: 'Route lookup simulation' },
  { session: 23, durationHours: 1, module: 3, topic: 'IPv4 Header Structure, Fields & Fragmentation Mechanics', learningOutcomes: 'Calculate fragment offset and Flags (DF, MF) across MTUs', teachingMethod: 'Lecture', learningResources: 'M3 Notes', assessment: 'Fragmentation numerical problem', practicalActivity: 'Wireshark IPv4 header capture' },
  { session: 24, durationHours: 1, module: 3, topic: 'IPv6 Addressing Architecture & IPv4-to-IPv6 Transition', learningOutcomes: 'Explain dual-stack, tunneling, and header simplification', teachingMethod: 'Lecture', learningResources: 'RFC 8200', assessment: 'IPv6 compression exercise', practicalActivity: 'IPv6 ping and route trace' },
  { session: 25, durationHours: 1, module: 3, topic: 'Dijkstra Shortest Path Routing Algorithm', learningOutcomes: 'Execute step-by-step Dijkstra table generation on weighted graph', teachingMethod: 'Demonstration', learningResources: 'M3 Slide Deck', assessment: 'Graph routing problem', practicalActivity: 'Interactive Dijkstra graph tracer' },
  { session: 26, durationHours: 1, module: 3, topic: 'Distance Vector Routing Algorithm & Bellman-Ford Matrix', learningOutcomes: 'Compute routing table update vectors across adjacent nodes', teachingMethod: 'Lecture', learningResources: 'M3 Notes', assessment: 'Vector update assignment', practicalActivity: 'Distance vector simulation' },
  { session: 27, durationHours: 1, module: 3, topic: 'Count-to-Infinity Problem, Split Horizon & Poison Reverse', learningOutcomes: 'Explain route loops and loop prevention heuristics in RIP', teachingMethod: 'Lecture', learningResources: 'Tanenbaum Ch 5', assessment: 'Loop mitigation discussion', practicalActivity: 'Link failure routing convergence lab' },
  { session: 28, durationHours: 1, module: 3, topic: 'Link State Routing (OSPF) & Border Gateway Protocol (BGP)', learningOutcomes: 'Contrast OSPF link-state advertisements and BGP path vectors', teachingMethod: 'Lecture', learningResources: 'OSPF_Routing.pdf', assessment: 'OSPF vs BGP comparison quiz', practicalActivity: 'Packet Tracer OSPF topology' },
  { session: 29, durationHours: 1, module: 3, topic: 'Module 3 KTU Valuation Scheme Solutions Walkthrough', learningOutcomes: 'Solve official university subnetting and Dijkstra questions', teachingMethod: 'Discussion', learningResources: 'B2 CST303 CN QP SCHEME1', assessment: 'Module 3 exam problem test', practicalActivity: 'Valuation rubric self-grading' },

  // Module 4 (9 Hours)
  { session: 30, durationHours: 1, module: 4, topic: 'Transport Layer Services, Port Numbers & Multiplexing', learningOutcomes: 'Explain socket addressing and well-known vs ephemeral ports', teachingMethod: 'Lecture', learningResources: 'MODULE 4 (1).pdf', assessment: 'Port mapping identification', practicalActivity: 'Netstat / ss port inspection' },
  { session: 31, durationHours: 1, module: 4, topic: 'User Datagram Protocol (UDP) Datagram Format & Checksum', learningOutcomes: 'Analyze pseudo-header checksum computation and zero-overhead benefits', teachingMethod: 'Lecture', learningResources: 'MODULE 4 Notes FINAL.pdf', assessment: 'UDP header field analysis', practicalActivity: 'UDP socket echo client demo' },
  { session: 32, durationHours: 1, module: 4, topic: 'Transmission Control Protocol (TCP) Segment Header Format', learningOutcomes: 'Explain sequence numbers, ACK numbers, and control flags', teachingMethod: 'Lecture', learningResources: 'module 4 mc (1).pptx', assessment: 'TCP header quiz', practicalActivity: 'Wireshark TCP stream inspection' },
  { session: 33, durationHours: 1, module: 4, topic: 'TCP 3-Way Connection Handshake & Sequence Number Synchronization', learningOutcomes: 'Trace SYN, SYN-ACK, ACK packet exchange and initial sequence selection', teachingMethod: 'Demonstration', learningResources: 'MODULE 4 .pptx.pdf', assessment: 'Handshake sequence diagram', practicalActivity: 'Live TCP handshake capture' },
  { session: 34, durationHours: 1, module: 4, topic: 'TCP Connection Teardown & Finite State Machine (FSM)', learningOutcomes: 'Map TIME_WAIT, CLOSE_WAIT, and FIN_WAIT states', teachingMethod: 'Lecture', learningResources: 'MODULE 4 (1).pdf', assessment: 'State transition diagram task', practicalActivity: 'TCP state transition simulator' },
  { session: 35, durationHours: 1, module: 4, topic: 'TCP Flow Control & Silly Window Syndrome Solutions', learningOutcomes: 'Explain Clark algorithm and Nagle algorithm mitigation', teachingMethod: 'Lecture', learningResources: 'module 4.docx', assessment: 'Flow control quiz', practicalActivity: 'Sliding window buffer trace' },
  { session: 36, durationHours: 1, module: 4, topic: 'TCP Congestion Control: AIMD, Slow Start & Congestion Avoidance', learningOutcomes: 'Derive congestion window (cwnd) growth and ssthresh threshold mechanics', teachingMethod: 'Lecture', learningResources: 'M4 Notes, Tanenbaum Ch 6', assessment: 'Cwnd trace numerical problem', practicalActivity: 'TCP Tahoe vs Reno cwnd graph' },
  { session: 37, durationHours: 1, module: 4, topic: 'Fast Retransmit & Fast Recovery (TCP Tahoe vs TCP Reno)', learningOutcomes: 'Analyze triple duplicate ACK triggers and fast retransmit', teachingMethod: 'Lecture', learningResources: 'MODULE 4 Notes FINAL.pdf', assessment: 'TCP Reno vs Tahoe comparison', practicalActivity: 'Packet loss recovery simulation' },
  { session: 38, durationHours: 1, module: 4, topic: 'Module 4 KTU University Exam Review & Numerical Practice', learningOutcomes: 'Solve TCP handshake and congestion window KTU exam questions', teachingMethod: 'Discussion', learningResources: 'Dec 2022 Scheme 1', assessment: 'Module 4 mock test', practicalActivity: 'Scheme mark self-appraisal' },

  // Module 5 (8 Hours)
  { session: 39, durationHours: 1, module: 5, topic: 'Domain Name System (DNS) Architecture & Hierarchy', learningOutcomes: 'Trace iterative vs recursive query resolution across root & TLD servers', teachingMethod: 'Lecture', learningResources: 'M5 Notes, Forouzan Ch 25', assessment: 'DNS lookup flow diagram', practicalActivity: 'Dig and nslookup terminal lab' },
  { session: 40, durationHours: 1, module: 5, topic: 'DNS Resource Records: A, AAAA, CNAME, MX, and NS Records', learningOutcomes: 'Configure DNS zone records and explain reverse lookup PTR', teachingMethod: 'Demonstration', learningResources: 'RFC 1035', assessment: 'DNS zone configuration quiz', practicalActivity: 'DNS zone file authoring exercise' },
  { session: 41, durationHours: 1, module: 5, topic: 'Hypertext Transfer Protocol (HTTP/1.1 vs HTTP/2)', learningOutcomes: 'Evaluate persistent connections, pipelining, and binary framing', teachingMethod: 'Lecture', learningResources: 'Tanenbaum Ch 7', assessment: 'HTTP request/response headers', practicalActivity: 'Curl HTTP request inspection' },
  { session: 42, durationHours: 1, module: 5, topic: 'Electronic Mail Architecture: SMTP, POP3, IMAP and MIME', learningOutcomes: 'Trace SMTP mail transfer commands (HELO, MAIL FROM, RCPT TO, DATA)', teachingMethod: 'Lecture', learningResources: 'Forouzan Ch 26', assessment: 'SMTP session command trace', practicalActivity: 'Telnet SMTP mail simulation' },
  { session: 43, durationHours: 1, module: 5, topic: 'File Transfer Protocol (FTP) Dual Connection Architecture', learningOutcomes: 'Contrast control connection (Port 21) and data connection (Port 20)', teachingMethod: 'Lecture', learningResources: 'M5 Notes', assessment: 'Active vs passive FTP quiz', practicalActivity: 'FTP client command session' },
  { session: 44, durationHours: 1, module: 5, topic: 'Network Socket Programming: BSD TCP Socket API', learningOutcomes: 'Implement socket(), bind(), listen(), accept(), connect() sequence in Java', teachingMethod: 'Demonstration', learningResources: 'Socket API Guide', assessment: 'Socket code prediction exercise', practicalActivity: 'Java TCP Client-Server build' },
  { session: 45, durationHours: 1, module: 5, topic: 'Comprehensive Syllabus Revision & Model Question Discussion', learningOutcomes: 'Synthesize inter-module concepts from Physical to Application Layer', teachingMethod: 'Discussion', learningResources: 'All 5 PCCST501 Model Papers', assessment: 'Full-syllabus mock test', practicalActivity: 'Weak topic identification' },
  { session: 46, durationHours: 1, module: 5, topic: 'Final University Examination Preparation & Rubric Coaching', learningOutcomes: 'Master time management, diagram presentation, and high-scoring techniques', teachingMethod: 'Discussion', learningResources: 'Official KTU Schemes', assessment: 'Final faculty feedback survey', practicalActivity: 'University exam strategy review' }
];

// Helper to generate 46 verified sessions for any subject
export const generateTeachingPlan = (subjectId: string): SubjectTeachingPlan => {
  if (subjectId === 'cst303-computer-networks') {
    return {
      subjectId: 'cst303-computer-networks',
      subjectCode: 'CST303',
      subjectName: 'Computer Networks',
      regulation: 'KTU 2019 Scheme',
      totalHours: 46,
      faculty: 'Jane Rose | Assistant Professor CSE',
      moduleBreakdown: [
        { module: 1, hours: 9 },
        { module: 2, hours: 10 },
        { module: 3, hours: 10 },
        { module: 4, hours: 9 },
        { module: 5, hours: 8 }
      ],
      sessions: cnSessions
    };
  }

  // Java OOP 46-hour plan
  const oopSessions: TeachingSession[] = [];
  const oopBreakdown = [
    { module: 1, hours: 10 },
    { module: 2, hours: 10 },
    { module: 3, hours: 9 },
    { module: 4, hours: 10 },
    { module: 5, hours: 7 }
  ];

  let currentSess = 1;
  const oopTopics = [
    // M1 (10)
    'OOP Paradigms vs Procedural Programming', 'JVM Internal Architecture & Bytecode Verification', 'Java Primitive Data Types & Literals',
    'Operators, Precedence & Type Casting Mechanics', 'Control Statements & Decision Making', 'Class Definitions, Instance Variables & Methods',
    'Constructors, Overloading & this Keyword', 'Access Specifiers & Information Hiding', 'Arrays, String Class & Vector Collections', 'Command Line Arguments & ClassLoader Internals',
    // M2 (10)
    'Inheritance Concepts & Subclass Creation', 'super Keyword & Member Hiding Resolution', 'Method Overriding & Dynamic Method Dispatch',
    'Constructor Execution Order in Class Hierarchies', 'Static Members, Static Methods & Static Blocks', 'final Keyword: Variables, Methods & Classes',
    'Abstract Classes & Interface Foundations', 'Inner Classes: Member & Local Inner Classes', 'Anonymous Inner Classes & Functional Interfaces', 'Package Creation, Import Rules & CLASSPATH',
    // M3 (9)
    'Defining & Implementing Java Interfaces', 'Multiple Interface Inheritance & Default Methods', 'Throwable Hierarchy: Errors vs Exceptions',
    'Checked vs Unchecked (Runtime) Exceptions', 'try-catch-finally Block Mechanics & Best Practices', 'throw and throws Clauses in Method Signatures',
    'Creating Custom User-Defined Exception Classes', 'Chained Exceptions & Stack Trace Analysis', 'Module 3 KTU University Problem Solving',
    // M4 (10)
    'AWT vs Swings: Lightweight Component Architecture', 'Model-View-Controller (MVC) Design Pattern', 'Swing Top-Level Containers: JFrame and JDialog',
    'Basic Swing Controls: JLabel, JButton, JTextField', 'Layout Managers: FlowLayout, BorderLayout, GridLayout', 'GridBagLayout & Complex Component Arranging',
    'Delegation Event Model: Sources, Events & Listeners', 'Handling ActionEvent & ItemEvent in Controls', 'Handling MouseEvent, MouseMotion & WindowEvent', 'Adapter Classes & Anonymous Listeners in Swing',
    // M5 (7)
    'JDBC Architecture: 2-Tier & 3-Tier Enterprise Models', 'JDBC Driver Types 1, 2, 3, 4 Architecture', 'Establishing Database Connections with DriverManager',
    'Executing SQL Queries with Statement Interface', 'Parameterized Queries with PreparedStatement', 'ResultSet Traversal & Database Metadata Inspection', 'Comprehensive Syllabus Revision & Exam Preparation'
  ];

  for (let m = 0; m < oopBreakdown.length; m++) {
    const modNum = oopBreakdown[m].module;
    const hours = oopBreakdown[m].hours;
    for (let h = 0; h < hours; h++) {
      const idx = currentSess - 1;
      oopSessions.push({
        session: currentSess,
        durationHours: 1,
        module: modNum,
        topic: oopTopics[idx] || `Module ${modNum} Concept ${h + 1}`,
        learningOutcomes: `Master ${oopTopics[idx]} and apply in software development`,
        teachingMethod: h % 3 === 0 ? 'Demonstration' : h % 4 === 0 ? 'Lab' : 'Lecture',
        learningResources: `Java Reference Deck M0${modNum}`,
        assessment: 'Code implementation and conceptual quiz',
        practicalActivity: 'Hands-on Java IDE execution'
      });
      currentSess++;
    }
  }

  return {
    subjectId: 'cst205-object-oriented-programming',
    subjectCode: 'CST205',
    subjectName: 'Object Oriented Programming using Java',
    regulation: 'KTU 2019 Scheme',
    totalHours: 46,
    faculty: 'Jane Rose | Assistant Professor CSE',
    moduleBreakdown: oopBreakdown,
    sessions: oopSessions
  };
};

export const TEACHING_PLANS: Record<string, SubjectTeachingPlan> = {
  'cst303-computer-networks': generateTeachingPlan('cst303-computer-networks'),
  'cst205-object-oriented-programming': generateTeachingPlan('cst205-object-oriented-programming')
};
