export type QuestionType =
  | 'mcq'
  | 'multi-select'
  | 'true-false'
  | 'numerical'
  | 'code-output'
  | 'debugging';

export interface QuizQuestion {
  id: string;
  subjectId: string;
  moduleId: number;
  type: QuestionType;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | string[] | number | boolean;
  explanation: string;
  points: number;
  topicRef: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // CST303 Computer Networks
  {
    id: 'cn-q1',
    subjectId: 'cst303-computer-networks',
    moduleId: 1,
    type: 'mcq',
    difficulty: 'beginner',
    question: 'In the OSI 7-layer reference model, which layer is responsible for hop-to-hop node delivery, physical addressing, and error detection on the local link?',
    options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
    correctAnswer: 'Data Link Layer',
    explanation: 'The Data Link Layer transforms raw transmission facilities into a reliable link, performing framing, physical MAC addressing, and CRC error checking.',
    points: 1,
    topicRef: 'OSI 7-Layer Architecture'
  },
  {
    id: 'cn-q2',
    subjectId: 'cst303-computer-networks',
    moduleId: 1,
    type: 'numerical',
    difficulty: 'intermediate',
    question: 'A noiseless 4 kHz channel is used to transmit binary signals. What is the maximum theoretical channel capacity in kbps according to Nyquist theorem?',
    options: ['4 kbps', '8 kbps', '16 kbps', '32 kbps'],
    correctAnswer: '8 kbps',
    explanation: 'Nyquist theorem gives Maximum Data Rate = 2 * B * log2(V). Here B = 4000 Hz, V = 2 levels. Rate = 2 * 4000 * 1 = 8000 bps = 8 kbps.',
    points: 2,
    topicRef: 'Nyquist Theorem & Channel Capacity'
  },
  {
    id: 'cn-q3',
    subjectId: 'cst303-computer-networks',
    moduleId: 2,
    type: 'multi-select',
    difficulty: 'intermediate',
    question: 'Which of the following statements regarding Sliding Window protocols are correct? (Select all that apply)',
    options: [
      'In Go-Back-N, the receiver window size is strictly equal to 1',
      'In Selective Repeat, the sender and receiver window sizes can both be greater than 1',
      'Go-Back-N requires independent acknowledgments for every frame without cumulative ACK',
      'Selective Repeat requires timer management for individual unacknowledged frames'
    ],
    correctAnswer: [
      'In Go-Back-N, the receiver window size is strictly equal to 1',
      'In Selective Repeat, the sender and receiver window sizes can both be greater than 1',
      'Selective Repeat requires timer management for individual unacknowledged frames'
    ],
    explanation: 'Go-Back-N uses cumulative ACK and a receiver window of 1, whereas Selective Repeat buffers out-of-order frames within a receiver window > 1 and tracks individual timers.',
    points: 3,
    topicRef: 'Sliding Window Protocols (GBN vs SR)'
  },
  {
    id: 'cn-q4',
    subjectId: 'cst303-computer-networks',
    moduleId: 2,
    type: 'true-false',
    difficulty: 'beginner',
    question: 'In Ethernet CSMA/CD, if a collision is detected during transmission, the transmitting node immediately emits a 32-bit to 48-bit jam signal and aborts transmission.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'When a collision is detected, the transmitting station enforces the collision by sending a jam signal so that all competing nodes detect the collision.',
    points: 1,
    topicRef: 'CSMA/CD Collision Handling'
  },
  {
    id: 'cn-q5',
    subjectId: 'cst303-computer-networks',
    moduleId: 3,
    type: 'numerical',
    difficulty: 'advanced',
    question: 'An IPv4 host has address 192.168.10.138/27. What is the broadcast address of this subnet?',
    options: ['192.168.10.127', '192.168.10.159', '192.168.10.255', '192.168.10.191'],
    correctAnswer: '192.168.10.159',
    explanation: '/27 has subnet mask 255.255.255.224 (block size 32). 138 falls in range 128 to 159. Network address is 192.168.10.128, broadcast address is 192.168.10.159.',
    points: 2,
    topicRef: 'Subnetting and CIDR'
  },
  {
    id: 'cn-q6',
    subjectId: 'cst303-computer-networks',
    moduleId: 3,
    type: 'mcq',
    difficulty: 'intermediate',
    question: 'In Distance Vector Routing, which technique prevents two-node routing loops by not sending routing information back on the interface from which it was learned?',
    options: ['Link State Advertisement', 'Split Horizon', 'Dijkstra Metric', 'Path Vector Filtering'],
    correctAnswer: 'Split Horizon',
    explanation: 'Split Horizon prevents route loops by omitting routes learned from a neighbor when sending routing table updates back to that same neighbor.',
    points: 2,
    topicRef: 'Distance Vector Routing Loops'
  },
  {
    id: 'cn-q7',
    subjectId: 'cst303-computer-networks',
    moduleId: 4,
    type: 'mcq',
    difficulty: 'intermediate',
    question: 'In TCP Tahoe congestion control, when a packet loss is detected via triple duplicate ACKs, what does the congestion window (cwnd) reset to?',
    options: ['Half of the current cwnd', 'ssthresh', '1 Maximum Segment Size (MSS)', 'No change, cwnd increases linearly'],
    correctAnswer: '1 Maximum Segment Size (MSS)',
    explanation: 'TCP Tahoe always drops cwnd to 1 MSS on any loss (timeout or triple duplicate ACKs). TCP Reno introduces Fast Recovery to halve cwnd without resetting to 1.',
    points: 2,
    topicRef: 'TCP Congestion Control (Tahoe vs Reno)'
  },
  {
    id: 'cn-q8',
    subjectId: 'cst303-computer-networks',
    moduleId: 5,
    type: 'mcq',
    difficulty: 'beginner',
    question: 'Which DNS record type maps an alias or canonical domain name to another domain name?',
    options: ['A Record', 'MX Record', 'CNAME Record', 'PTR Record'],
    correctAnswer: 'CNAME Record',
    explanation: 'A Canonical Name (CNAME) record maps an alias hostname to its canonical true domain name in DNS.',
    points: 1,
    topicRef: 'DNS Resource Records'
  },

  // CST205 Java OOP Questions
  {
    id: 'oop-q1',
    subjectId: 'cst205-object-oriented-programming',
    moduleId: 1,
    type: 'code-output',
    difficulty: 'intermediate',
    question: 'What is the output of the following Java program?',
    codeSnippet: `public class Test {\n    public static void main(String[] args) {\n        Integer a = 127;\n        Integer b = 127;\n        Integer c = 128;\n        Integer d = 128;\n        System.out.println((a == b) + " " + (c == d));\n    }\n}`,
    options: ['true true', 'true false', 'false false', 'Compilation Error'],
    correctAnswer: 'true false',
    explanation: 'Java caches Integer objects in the range -128 to 127. Values within this range reference the same cached object (a == b is true). 128 exceeds the cache, allocating distinct objects on the heap (c == d is false).',
    points: 2,
    topicRef: 'Wrapper Class Autoboxing & Caching'
  },
  {
    id: 'oop-q2',
    subjectId: 'cst205-object-oriented-programming',
    moduleId: 2,
    type: 'code-output',
    difficulty: 'advanced',
    question: 'Predict the console output of the following inheritance hierarchy execution:',
    codeSnippet: `class Base {\n    Base() { System.out.print("B "); }\n}\nclass Derived extends Base {\n    Derived() {\n        this(5);\n        System.out.print("D1 ");\n    }\n    Derived(int x) {\n        System.out.print("D2 ");\n    }\n}\npublic class App {\n    public static void main(String[] args) {\n        new Derived();\n    }\n}`,
    options: ['B D2 D1', 'D2 D1 B', 'B D1 D2', 'D1 D2 B'],
    correctAnswer: 'B D2 D1',
    explanation: 'new Derived() invokes this(5). Derived(int) implicitly calls super() first, printing "B ". Then Derived(int) body prints "D2 ". Finally original Derived() constructor completes, printing "D1 ".',
    points: 3,
    topicRef: 'Constructor Chaining and Execution Order'
  },
  {
    id: 'oop-q3',
    subjectId: 'cst205-object-oriented-programming',
    moduleId: 3,
    type: 'debugging',
    difficulty: 'intermediate',
    question: 'Identify why the following Java method fails to compile:',
    codeSnippet: `void testMethod() {\n    try {\n        int x = 10 / 0;\n    } catch (Exception e) {\n        System.out.println("Exception");\n    } catch (ArithmeticException ae) {\n        System.out.println("ArithmeticException");\n    }\n}`,
    options: [
      'ArithmeticException cannot be caught after generic Exception because it is already handled (Unreachable Code error)',
      'Division by zero causes a compiler error and cannot compile inside try block',
      'Missing finally block after try-catch',
      'ArithmeticException is an unchecked exception and cannot be caught'
    ],
    correctAnswer: 'ArithmeticException cannot be caught after generic Exception because it is already handled (Unreachable Code error)',
    explanation: 'Catch blocks must be arranged from most specific (subclass) to most general (superclass). Catching Exception first shadows ArithmeticException, creating an unreachable code error.',
    points: 2,
    topicRef: 'Exception Catch Block Hierarchy'
  },
  {
    id: 'oop-q4',
    subjectId: 'cst205-object-oriented-programming',
    moduleId: 4,
    type: 'mcq',
    difficulty: 'beginner',
    question: 'Which layout manager is the default layout manager for a standard javax.swing.JPanel container?',
    options: ['BorderLayout', 'FlowLayout', 'GridLayout', 'CardLayout'],
    correctAnswer: 'FlowLayout',
    explanation: 'JPanel defaults to FlowLayout (centering components in rows), while JFrame content panes default to BorderLayout.',
    points: 1,
    topicRef: 'Swing Layout Managers'
  }
];
