export interface QuestionPartASolution {
  questionNumber: string;
  module: number;
  marks: number;
  questionText: string;
  solutionText: string;
  formulaOrCode?: string;
  keywords?: string[];
}

export interface QuestionPartBSolution {
  questionNumber: string;
  module: number;
  marks: number;
  questionText: string;
  solutionSteps: string[];
  formulaOrCode?: string;
  diagramOrTable?: string;
  finalAnswer?: string;
}

export interface QuestionPaperDemoConfig {
  type: 'dijkstra' | 'crc' | 'cidr' | 'tcp-congestion' | 'token-bucket' | 'hamming';
  title: string;
  instructions: string;
  initialState?: Record<string, any>;
}

export interface ValuationRubricItem {
  question: string;
  marksAllocated: number;
  criteria: string[];
}

export interface QuestionPaperCompanion {
  paperId: string;
  title: string;
  examMonthYear: string;
  scheme: string;
  solution: {
    overview: string;
    partA: QuestionPartASolution[];
    partB: QuestionPartBSolution[];
  };
  demo: QuestionPaperDemoConfig;
  answerKey: {
    schemeTitle: string;
    totalMarks: number;
    partAMarksDistribution: string;
    partBMarksDistribution: string;
    rubrics: ValuationRubricItem[];
    examinerChecklist: string[];
  };
}

export const QUESTION_PAPER_COMPANIONS: Record<string, QuestionPaperCompanion> = {
  'qp-dec2022-b1': {
    paperId: 'qp-dec2022-b1',
    title: 'CST303 University Question Paper - Dec 2022 (Set B1)',
    examMonthYear: 'December 2022',
    scheme: 'KTU 2019',
    solution: {
      overview: 'Comprehensive university examination testing OSI protocol stacks, CRC polynomial division, Dijkstra shortest path routing, and TCP congestion control dynamics.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 1,
          marks: 3,
          questionText: 'Distinguish between circuit switching and packet switching with regard to latency and bandwidth allocation.',
          solutionText: 'Circuit switching pre-reserves an exclusive dedicated physical circuit end-to-end (guaranteeing constant bandwidth and zero jitter after setup, but wasting unused capacity). Packet switching decomposes messages into discrete routed packets that share links dynamically (maximizing statistical multiplexing efficiency but introducing variable queuing delay and packet loss).',
          formulaOrCode: 'T_packet = N * (Transmission_Delay + Propagation_Delay + Queuing_Delay)',
          keywords: ['Dedicated channel', 'Statistical multiplexing', 'Queuing jitter']
        },
        {
          questionNumber: 'Q2',
          module: 1,
          marks: 3,
          questionText: 'State Nyquist and Shannon channel capacity theorems. What is the fundamental difference?',
          solutionText: 'Nyquist theorem defines maximum data rate in a noiseless channel with bandwidth B and discrete signal levels V: C = 2B * log2(V). Shannon theorem establishes the theoretical maximum bound on a noisy Gaussian channel with signal-to-noise ratio SNR: C = B * log2(1 + SNR). Nyquist considers signal level quantization; Shannon bounds physical thermal noise.',
          formulaOrCode: 'C_Nyquist = 2B*log2(V)  vs  C_Shannon = B*log2(1 + SNR)',
          keywords: ['Bandwidth B', 'Signal levels V', 'Signal-to-Noise Ratio (SNR)']
        },
        {
          questionNumber: 'Q3',
          module: 2,
          marks: 3,
          questionText: 'Explain the working of 1-bit Sliding Window (Stop-and-Wait ARQ) protocol.',
          solutionText: 'Sender transmits a single frame with 1-bit sequence number (0 or 1) and starts a retransmission timer. Receiver responds with ACK containing the next expected sequence number. If ACK arrives before timeout, sequence bit toggles. If timeout expires or a damaged frame is detected, sender retransmits the same frame.',
          formulaOrCode: 'Efficiency = 1 / (1 + 2*a), where a = Propagation_Time / Transmission_Time',
          keywords: ['Sequence bit', 'Timeout timer', 'ACK toggle']
        },
        {
          questionNumber: 'Q4',
          module: 3,
          marks: 3,
          questionText: 'Define count-to-infinity problem in Distance Vector Routing and name two solutions.',
          solutionText: 'When a link breaks, neighboring routers slowly increment routing metric step-by-step to infinity because of mutual cyclic misdirection. Solutions: (1) Split Horizon (do not advertise routes back to the neighbor they were learned from), and (2) Poison Reverse (advertise inaccessible routes with metric 16/infinity).',
          formulaOrCode: 'Infinity_Metric = 16 hops (RIP standard)',
          keywords: ['Routing loops', 'Split Horizon', 'Poison Reverse']
        },
        {
          questionNumber: 'Q5',
          module: 4,
          marks: 3,
          questionText: 'Explain the significance of the 3-Way Handshake in TCP connection establishment.',
          solutionText: '3-Way Handshake synchronizes initial sequence numbers (ISN) between client and server to prevent stale duplicates from old crashed connections from disrupting new sessions: (1) Client sends SYN with seq=x, (2) Server responds SYN-ACK with seq=y, ack=x+1, (3) Client returns ACK with seq=x+1, ack=y+1.',
          formulaOrCode: 'Client -> SYN(x) -> Server -> SYN(y)+ACK(x+1) -> Client -> ACK(y+1)',
          keywords: ['ISN synchronization', 'Duplicate protection', 'SYN / ACK']
        }
      ],
      partB: [
        {
          questionNumber: 'Q11',
          module: 2,
          marks: 14,
          questionText: 'A bit stream 1101011011 is transmitted using standard CRC method with generator polynomial G(x) = x^4 + x + 1. Compute: (1) Transmitted code word, and (2) Verify error detection if the 3rd bit from left gets inverted.',
          solutionSteps: [
            'Step 1: Convert generator polynomial to binary: G(x) = x^4 + 0*x^3 + 0*x^2 + 1*x^1 + 1 = 10011 (degree r = 4).',
            'Step 2: Append r=4 zeroes to message M: 1101011011 0000.',
            'Step 3: Perform Modulo-2 binary division of 11010110110000 by 10011 using XOR subtraction without borrowing.',
            'Step 4: Remainder obtained = 1110. Code word transmitted T = M + R = 11010110111110.',
            'Step 5: Error Injection: Invert 3rd bit -> Received bit stream: 11110110111110. Divide by 10011. Non-zero remainder detected: 0101 != 0. Frame is rejected!'
          ],
          formulaOrCode: 'T(x) = M(x)*x^r + R(x); where R(x) = (M(x)*x^r) mod G(x)',
          diagramOrTable: '11010110110000 / 10011 => Quotient: 1100001010, Remainder: 1110',
          finalAnswer: 'Transmitted Frame: 11010110111110. Error Syndrome: Non-zero remainder 0101 detected; packet correctly discarded.'
        },
        {
          questionNumber: 'Q13',
          module: 3,
          marks: 14,
          questionText: 'Apply Dijkstra algorithm on a 6-node network to compute the shortest path tree from source node A to all other nodes. Show iteration matrix.',
          solutionSteps: [
            'Step 1: Initialization: Set Tentative dist[A]=0, Permanent set S={A}, dist[B]=4, dist[C]=2, dist[D]=inf, dist[E]=inf, dist[F]=inf.',
            'Step 2: Iteration 1: Min tentative node is C (dist 2). Add C to S. Relax neighbors: dist[D] = min(inf, 2+8) = 10, dist[E] = min(inf, 2+5) = 7.',
            'Step 3: Iteration 2: Min tentative node is B (dist 4). Add B to S. Relax neighbor: dist[D] = min(10, 4+5) = 9.',
            'Step 4: Iteration 3: Min tentative node is E (dist 7). Add E to S. Relax neighbors: dist[F] = min(inf, 7+4) = 11.',
            'Step 5: Iteration 4: Min tentative node is D (dist 9). Relax neighbor: dist[F] = min(11, 9+1) = 10.',
            'Step 6: Iteration 5: Min tentative node is F (dist 10). Add F to S. All nodes permanent.'
          ],
          formulaOrCode: 'dist[v] = min(dist[v], dist[u] + weight(u, v))',
          finalAnswer: 'Shortest Paths: A-C (cost 2), A-B (cost 4), A-C-E (cost 7), A-B-D (cost 9), A-B-D-F (cost 10).'
        }
      ]
    },
    demo: {
      type: 'dijkstra',
      title: 'Dijkstra Shortest Path First Interactive Route Explorer',
      instructions: 'Click nodes or drag cost weights to observe greedy edge relaxation in real time matching KTU Exam Question 13.',
      initialState: { source: 'A', target: 'F', defaultPath: 'A -> B -> D -> F' }
    },
    answerKey: {
      schemeTitle: 'KTU Valuation Scheme - CST303 Dec 2022 (Set B1)',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks (Part A/B choice) = 70 Marks',
      rubrics: [
        {
          question: 'Q1 (Circuit vs Packet Switching)',
          marksAllocated: 3,
          criteria: [
            '1 mark for definition of circuit vs packet switching',
            '1 mark for latency/jitter comparison',
            '1 mark for bandwidth utilization/multiplexing efficiency'
          ]
        },
        {
          question: 'Q11 (CRC Polynomial Calculation)',
          marksAllocated: 14,
          criteria: [
            '2 marks for polynomial representation to binary (10011) and zero augmentation',
            '6 marks for accurate step-by-step modulo-2 binary division without borrowing',
            '2 marks for remainder identification (1110) and final transmitted frame',
            '4 marks for error verification with inverted bit showing non-zero remainder'
          ]
        },
        {
          question: 'Q13 (Dijkstra Shortest Path Tree)',
          marksAllocated: 14,
          criteria: [
            '2 marks for initial distance vector assignment',
            '8 marks for iteration-by-iteration node relaxation table',
            '4 marks for final shortest path tree and individual destination costs'
          ]
        }
      ],
      examinerChecklist: [
        'Ensure modulo-2 division applies XOR rules without carrying/borrowing.',
        'In Dijkstra, verify candidate set S updates strictly monotonically.',
        'Accept alternative correct tie-breaking orders in Dijkstra provided cost matrix holds.'
      ]
    }
  },

  'qp-dec2022-b1-1': {
    paperId: 'qp-dec2022-b1-1',
    title: 'CST303 University Question Paper - Dec 2022 (Set B1 Alt)',
    examMonthYear: 'December 2022',
    scheme: 'KTU 2019',
    solution: {
      overview: 'Alternative question paper variant emphasizing data link framing, Go-Back-N ARQ, IP subnet division, and Leaky Bucket traffic policing.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 1,
          marks: 3,
          questionText: 'What is bit stuffing? Where is it applied in HDLC protocol?',
          solutionText: 'Bit stuffing prevents flag collision (01111110). Whenever the sender encounters five consecutive 1s in the data payload, it automatically inserts an extra 0. The receiver inspects the stream and deletes any 0 appearing immediately after five 1s.',
          formulaOrCode: 'Data: 01111110 -> Stuffed: 011111010',
          keywords: ['Flag byte 01111110', 'Five consecutive 1s', 'Destuffing']
        },
        {
          questionNumber: 'Q2',
          module: 2,
          marks: 3,
          questionText: 'Compare Go-Back-N and Selective Repeat ARQ window sizes.',
          solutionText: 'For an m-bit sequence number space (size 2^m), Go-Back-N allows a maximum sender window of 2^m - 1 with receiver window = 1. Selective Repeat divides the sequence space equally: W_sender = W_receiver <= 2^(m-1) to avoid sequence overlap ambiguities.',
          formulaOrCode: 'GBN: Ws <= 2^m - 1; SR: Ws + Wr <= 2^m',
          keywords: ['Window bounds', 'Receiver window size', 'Sequence space']
        },
        {
          questionNumber: 'Q3',
          module: 3,
          marks: 3,
          questionText: 'What is the role of ARP (Address Resolution Protocol)?',
          solutionText: 'ARP maps an known 32-bit logical IPv4 address into its corresponding 48-bit physical MAC address on a local broadcast network link using ARP Request (broadcast) and ARP Reply (unicast).',
          formulaOrCode: 'IP Address (Layer 3) -> ARP -> MAC Address (Layer 2)',
          keywords: ['Logical to Physical', 'Broadcast request', 'Unicast reply']
        },
        {
          questionNumber: 'Q4',
          module: 4,
          marks: 3,
          questionText: 'Differentiate between Leaky Bucket and Token Bucket traffic shaping algorithms.',
          solutionText: 'Leaky Bucket outputs packets at an absolute strictly constant rate regardless of burstiness, discarding overflow. Token Bucket accumulates authorization tokens up to bucket capacity, allowing controlled burst transmission while enforcing average rate limits.',
          formulaOrCode: 'Burst_Time = C / (M - r)',
          keywords: ['Constant rate', 'Burst accumulation', 'Token tokens']
        },
        {
          questionNumber: 'Q5',
          module: 5,
          marks: 3,
          questionText: 'Explain the purpose of DNS iterative and recursive queries.',
          solutionText: 'In a recursive query, the local DNS resolver assumes full burden of contacting root, TLD, and authoritative name servers until it returns the final IP. In an iterative query, the contacted server directly responds with the referral address of the next DNS server to contact.',
          formulaOrCode: 'Client -> Recursive -> Local DNS -> Iterative -> Root -> TLD -> Auth',
          keywords: ['Referral', 'Recursive resolution', 'Root/TLD']
        }
      ],
      partB: [
        {
          questionNumber: 'Q12',
          module: 3,
          marks: 14,
          questionText: 'An ISP assigns you IP address block 192.168.10.0/24. Subnet this network to satisfy 4 departments requiring 60, 28, 14, and 12 hosts respectively. Provide subnet addresses, broadcast addresses, and subnet masks.',
          solutionSteps: [
            'Department A (60 hosts): Needs 2^h - 2 >= 60 => h=6 (64 total). Prefix: /26. Mask: 255.255.255.192. Subnet: 192.168.10.0/26. Usable: 192.168.10.1 - 192.168.10.62. Broadcast: 192.168.10.63.',
            'Department B (28 hosts): Needs 2^h - 2 >= 28 => h=5 (32 total). Prefix: /27. Mask: 255.255.255.224. Subnet: 192.168.10.64/27. Usable: 192.168.10.65 - 192.168.10.94. Broadcast: 192.168.10.95.',
            'Department C (14 hosts): Needs 2^h - 2 >= 14 => h=4 (16 total). Prefix: /28. Mask: 255.255.255.240. Subnet: 192.168.10.96/28. Usable: 192.168.10.97 - 192.168.10.110. Broadcast: 192.168.10.111.',
            'Department D (12 hosts): Needs 2^h - 2 >= 12 => h=4 (16 total). Prefix: /28. Mask: 255.255.255.240. Subnet: 192.168.10.112/28. Usable: 192.168.10.113 - 192.168.10.126. Broadcast: 192.168.10.127.'
          ],
          formulaOrCode: 'Host_Capacity = 2^(32-Prefix) - 2',
          finalAnswer: 'All 4 departments allocated with zero overlap and zero address wastage.'
        },
        {
          questionNumber: 'Q14',
          module: 4,
          marks: 14,
          questionText: 'Explain TCP congestion control mechanisms: Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery with window progression graphs.',
          solutionSteps: [
            'Phase 1: Slow Start: cwnd starts at 1 MSS and doubles every RTT (exponential growth cwnd = cwnd * 2) until threshold ssthresh is reached.',
            'Phase 2: Congestion Avoidance: Once cwnd >= ssthresh, growth transitions to linear AIMD (Additive Increase cwnd = cwnd + 1 MSS per RTT).',
            'Phase 3: Fast Retransmit: Upon receiving 3 duplicate ACKs, sender assumes single packet loss and immediately retransmits without waiting for coarse RTO timeout.',
            'Phase 4: Fast Recovery: ssthresh is halved to cwnd/2, cwnd is set to ssthresh + 3 MSS, and linear growth resumes without dropping cwnd back to 1.'
          ],
          formulaOrCode: 'AIMD: cwnd(t+1) = cwnd(t) + 1  (Increase)  /  ssthresh = cwnd / 2  (Loss)',
          finalAnswer: 'Provides optimal network stability, prevents congestion collapse, and maximizes TCP throughput.'
        }
      ]
    },
    demo: {
      type: 'cidr',
      title: 'CIDR Variable Length Subnet Masking (VLSM) Slicer',
      instructions: 'Enter required host numbers to dynamically partition IP blocks and calculate network, usable host, and broadcast addresses matching Question 12.',
      initialState: { baseIp: '192.168.10.0', prefix: 24 }
    },
    answerKey: {
      schemeTitle: 'KTU Valuation Scheme - CST303 Dec 2022 (Set B1 Alt)',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks = 70 Marks',
      rubrics: [
        {
          question: 'Q12 (VLSM Subnet Allocation)',
          marksAllocated: 14,
          criteria: [
            '4 marks for Department A (/26 subnet, broadcast, and range calculation)',
            '4 marks for Department B (/27 subnet, broadcast, and range calculation)',
            '3 marks for Department C (/28 subnet and boundaries)',
            '3 marks for Department D (/28 subnet and boundaries)'
          ]
        },
        {
          question: 'Q14 (TCP Congestion Control)',
          marksAllocated: 14,
          criteria: [
            '3 marks for Slow Start exponential growth equation and ssthresh transition',
            '4 marks for Congestion Avoidance AIMD linear slope',
            '3 marks for 3 Duplicate ACKs detection and Fast Retransmit',
            '4 marks for Fast Recovery and annotated cwnd vs RTT progression graph'
          ]
        }
      ],
      examinerChecklist: [
        'Verify subnet boundaries are powers-of-two contiguous blocks.',
        'Check that 3 Duplicate ACKs is distinguished from timeout expiration.'
      ]
    }
  },

  'qp-dec2021': {
    paperId: 'qp-dec2021',
    title: 'CST303 Computer Networks Regular Exam - Dec 2021',
    examMonthYear: 'December 2021',
    scheme: 'KTU 2019',
    solution: {
      overview: 'Regular university semester exam focusing on sliding window protocols, CRC calculations, IP header structure, and TCP connection state teardown.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 1,
          marks: 3,
          questionText: 'Explain the function of the Presentation and Session layers in the OSI model.',
          solutionText: 'Session layer establishes, manages, and terminates dialog checkpoints between applications. Presentation layer formats, compresses, and encrypts/decrypts data (e.g. ASCII, TLS, JPEG) ensuring syntactic interoperability.',
          keywords: ['Dialog management', 'Data encryption', 'Compression']
        },
        {
          questionNumber: 'Q2',
          module: 2,
          marks: 3,
          questionText: 'What is pure ALOHA efficiency? Why is Slotted ALOHA double in performance?',
          solutionText: 'Pure ALOHA has maximum efficiency 1/(2e) ≈ 18.4% because vulnerable period is 2*T. Slotted ALOHA restricts transmissions to discrete clock boundaries, halving vulnerable interval to T and doubling efficiency to 1/e ≈ 36.8%.',
          formulaOrCode: 'S_pure = G * e^(-2G) (max 18.4%)  vs  S_slotted = G * e^(-G) (max 36.8%)',
          keywords: ['Vulnerable period', '18.4% vs 36.8%', 'Time slots']
        },
        {
          questionNumber: 'Q3',
          module: 3,
          marks: 3,
          questionText: 'Describe the fields of IPv4 header used for packet fragmentation.',
          solutionText: 'Identification (16-bit sequence identifying original datagram), Flags (3-bit: DF=Don\'t Fragment, MF=More Fragments), and Fragment Offset (13-bit: indicates data position in 8-byte units).',
          formulaOrCode: 'Offset_units = Byte_position / 8',
          keywords: ['Identification', 'MF flag', 'Fragment offset']
        },
        {
          questionNumber: 'Q4',
          module: 4,
          marks: 3,
          questionText: 'What causes Silly Window Syndrome in TCP? How does Clark\'s solution prevent it?',
          solutionText: 'Caused when receiver application reads data slowly, advertising tiny window updates (e.g., 1 byte), causing sender to transmit tiny packets with massive 40-byte TCP/IP header overhead. Clark\'s solution forces receiver to delay advertising window until buffer space equals min(MSS, half buffer size).',
          formulaOrCode: 'Advertised_Window = 0 until Buffer >= min(MSS, Total_Buffer/2)',
          keywords: ['1-byte window', 'Header overhead', 'MSS threshold']
        },
        {
          questionNumber: 'Q5',
          module: 5,
          marks: 3,
          questionText: 'Distinguish between HTTP persistent and non-persistent connections.',
          solutionText: 'Non-persistent HTTP (1.0) opens a separate TCP connection per embedded asset (costing 2 RTTs + TCP teardown each). Persistent HTTP (1.1) keeps a single TCP pipe open across multiple consecutive GET requests, utilizing pipelining.',
          formulaOrCode: 'T_non_persistent = 2*RTT * N  vs  T_persistent = 2*RTT + N*RTT',
          keywords: ['Separate TCP per object', 'Pipelining', 'RTT reduction']
        }
      ],
      partB: [
        {
          questionNumber: 'Q11',
          module: 2,
          marks: 14,
          questionText: 'Generate Hamming Code (7, 4) for data word 1011. Show parity bit insertion and error correction for bit 5 inversion.',
          solutionSteps: [
            'Step 1: 4 data bits (d1, d2, d3, d4) = 1, 0, 1, 1. Parity bits positioned at powers of 2: p1 (pos 1), p2 (pos 2), p4 (pos 4).',
            'Step 2: Bit layout (pos 1-7): p1, p2, d1, p4, d2, d3, d4.',
            'Step 3: Calculate parity bits (Even Parity): p1 = d1 ⊕ d2 ⊕ d4 = 1 ⊕ 0 ⊕ 1 = 0; p2 = d1 ⊕ d3 ⊕ d4 = 1 ⊕ 1 ⊕ 1 = 1; p4 = d2 ⊕ d3 ⊕ d4 = 0 ⊕ 1 ⊕ 1 = 0.',
            'Step 4: Transmitted 7-bit codeword: 0 1 1 0 0 1 1.',
            'Step 5: Error Injection at Position 5 (d2 flips 0->1): Received codeword = 0 1 1 0 1 1 1.',
            'Step 6: Syndrome Calculation: s1 = p1 ⊕ d1 ⊕ d2 ⊕ d4 = 0 ⊕ 1 ⊕ 1 ⊕ 1 = 1. s2 = p2 ⊕ d1 ⊕ d3 ⊕ d4 = 1 ⊕ 1 ⊕ 1 ⊕ 1 = 0. s4 = p4 ⊕ d2 ⊕ d3 ⊕ d4 = 0 ⊕ 1 ⊕ 1 ⊕ 1 = 1. Syndrome = s4 s2 s1 = 101 (binary 5). Bit 5 is flipped and corrected back to 0!'
          ],
          formulaOrCode: 'Syndrome = (s4*4 + s2*2 + s1*1)',
          finalAnswer: 'Encoded Word: 0110011. Syndrome indicates error at bit position 5; bit successfully inverted to recover original data 1011.'
        },
        {
          questionNumber: 'Q13',
          module: 4,
          marks: 14,
          questionText: 'Illustrate TCP Connection Teardown using Finite State Machine (FSM) sequence diagram with TIME_WAIT state analysis.',
          solutionSteps: [
            'Step 1: Active closer initiates shutdown by sending FIN (seq=u). State transitions from ESTABLISHED to FIN_WAIT_1.',
            'Step 2: Passive closer receives FIN, sends ACK (ack=u+1). State transitions to CLOSE_WAIT. Active closer enters FIN_WAIT_2.',
            'Step 3: Passive closer finishes flushing remaining buffered data, then issues its own FIN (seq=w, ack=u+1) and enters LAST_ACK.',
            'Step 4: Active closer receives FIN, sends final ACK (ack=w+1) and enters TIME_WAIT state for 2*MSL (Maximum Segment Lifetime = 120s).',
            'Step 5: TIME_WAIT prevents lingering delayed packets from previous connection from corrupting newly opened incarnation sessions and guarantees final ACK delivery.'
          ],
          formulaOrCode: 'TIME_WAIT_Duration = 2 * MSL (typically 120 seconds)',
          finalAnswer: 'FSM cleanly terminates bidirectional full-duplex TCP stream with zero segment contamination.'
        }
      ]
    },
    demo: {
      type: 'hamming',
      title: 'Hamming (7, 4) Error Correction Visualizer',
      instructions: 'Enter a 4-bit data word, inject single-bit noise, and watch the syndrome calculation automatically detect and flip the corrupted bit.',
      initialState: { data: '1011', errorPos: 5 }
    },
    answerKey: {
      schemeTitle: 'KTU Valuation Scheme - CST303 Dec 2021',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks = 70 Marks',
      rubrics: [
        {
          question: 'Q11 (Hamming Code Encoding & Correction)',
          marksAllocated: 14,
          criteria: [
            '2 marks for parity positions identification (1, 2, 4)',
            '6 marks for parity bit equations and correct codeword generation',
            '3 marks for error bit parity recalculation',
            '3 marks for binary syndrome to decimal position mapping and correction'
          ]
        },
        {
          question: 'Q13 (TCP Teardown & TIME_WAIT)',
          marksAllocated: 14,
          criteria: [
            '4 marks for 4-step packet handshake (FIN, ACK, FIN, ACK)',
            '6 marks for client and server state diagram transitions',
            '4 marks for 2*MSL TIME_WAIT mathematical justification'
          ]
        }
      ],
      examinerChecklist: [
        'Check even parity equations align with power-of-two coverage.',
        'Verify TIME_WAIT state duration justification is explicitly stated.'
      ]
    }
  },

  'qp-2022-reg': {
    paperId: 'qp-2022-reg',
    title: 'CST303 University Question Paper 2022 Regular',
    examMonthYear: 'May 2022',
    scheme: 'KTU 2019',
    solution: {
      overview: 'May 2022 regular examination covering link-state routing convergence, CSMA/CD backoff algorithm, and TCP socket programming.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 1,
          marks: 3,
          questionText: 'Explain the working of 1-persistent and p-persistent CSMA.',
          solutionText: 'In 1-persistent CSMA, a station continuously listens to the carrier; as soon as it becomes idle, it transmits with probability 1.0 (leading to collisions when multiple stations wait). In p-persistent CSMA, when channel is idle, station transmits with probability p and defers to next slot with probability (1-p).',
          keywords: ['Continuous carrier sense', 'Probability p', 'Slot deferral']
        },
        {
          questionNumber: 'Q2',
          module: 2,
          marks: 3,
          questionText: 'State the minimum frame size requirement in IEEE 802.3 Ethernet. Why is it 64 bytes?',
          solutionText: 'To ensure a transmitting station detects collision before it finishes transmitting the frame: Transmission_Time >= 2 * Propagation_Delay. For 10 Mbps over 2.5 km with repeaters, 2 * Tp ≈ 51.2 µs, which corresponds to 512 bits = 64 bytes.',
          formulaOrCode: 'T_trans >= 2 * T_prop => Frame_Min = 2 * T_prop * Bandwidth = 64 bytes',
          keywords: ['Round-trip slot time', 'Collision detection', '512 bits']
        },
        {
          questionNumber: 'Q3',
          module: 3,
          marks: 3,
          questionText: 'What is the format and utility of an ICMP Echo Request/Reply message?',
          solutionText: 'Used by ping and traceroute diagnostic tools to verify Layer 3 connectivity. ICMP header contains: Type (8 for Echo Request, 0 for Echo Reply), Code 0, Checksum, Identifier, and Sequence Number.',
          keywords: ['Type 8/0', 'Ping diagnostic', 'Echo response']
        },
        {
          questionNumber: 'Q4',
          module: 4,
          marks: 3,
          questionText: 'What is UDP Pseudo Header? Why is it included in checksum computation?',
          solutionText: 'A 12-byte virtual header containing Source IP, Destination IP, Protocol (17), and UDP length. Including it verifies that the packet has not been misrouted to the wrong destination IP by lower network layers.',
          keywords: ['IP addresses in checksum', 'Misrouting protection', '12 bytes']
        },
        {
          questionNumber: 'Q5',
          module: 5,
          marks: 3,
          questionText: 'List the sequential system calls for a TCP server in BSD socket programming.',
          solutionText: 'socket() -> bind() -> listen() -> accept() -> read()/write() -> close().',
          formulaOrCode: 'int sockfd = socket(AF_INET, SOCK_STREAM, 0); bind(...); listen(sockfd, backlog);',
          keywords: ['socket', 'bind', 'listen', 'accept']
        }
      ],
      partB: [
        {
          questionNumber: 'Q11',
          module: 1,
          marks: 14,
          questionText: 'Describe Binary Exponential Backoff algorithm in CSMA/CD with collision resolution calculation.',
          solutionSteps: [
            'Step 1: Upon collision i (1 <= i <= 16), transmission is aborted and jam signal is broadcast.',
            'Step 2: Backoff interval k is randomly chosen from range 0 <= k <= 2^c - 1, where c = min(i, 10).',
            'Step 3: Station waits k * Slot_Time (51.2 microseconds in 10Base5) before re-attempting carrier sense.',
            'Step 4: After 10 collisions, backoff window freezes at 2^10 - 1 = 1023 slots.',
            'Step 5: If collisions reach 16, packet transmission fails completely and error is reported to upper layer.'
          ],
          formulaOrCode: 'Wait_Time = k * 51.2 µs;  k ∈ [0, 2^min(i, 10) - 1]',
          finalAnswer: 'Dynamically adapts backoff window to network load, preventing repetitive synchronized collisions.'
        },
        {
          questionNumber: 'Q14',
          module: 4,
          marks: 14,
          questionText: 'Explain TCP Reno Congestion Control with mathematical formulation of AIMD and fast recovery.',
          solutionSteps: [
            'Step 1: Additive Increase: For every successful window of ACKs, cwnd increases by 1 MSS: cwnd = cwnd + 1 / cwnd for each ACK.',
            'Step 2: Multiplicative Decrease: Upon packet loss indication (3 dup ACKs), ssthresh = max(cwnd / 2, 2 MSS).',
            'Step 3: Fast Recovery: cwnd is set to ssthresh + 3 MSS, preventing catastrophic drop to 1 MSS seen in TCP Tahoe.',
            'Step 4: New ACK arrival exits fast recovery, resetting cwnd to ssthresh and returning to linear congestion avoidance.'
          ],
          formulaOrCode: 'W(t) = W(t - 1) + 1/W(t - 1)  vs  W(loss) = W / 2',
          finalAnswer: 'TCP Reno achieves 75% higher sustained bandwidth utilization over legacy TCP Tahoe.'
        }
      ]
    },
    demo: {
      type: 'tcp-congestion',
      title: 'TCP AIMD Congestion Control Progression Simulator',
      instructions: 'Adjust packet loss rate and round-trip time to visualize Slow Start exponential ramp, AIMD sawtooth pattern, and Fast Retransmit window adjustments.',
      initialState: { ssthresh: 16, initialCwnd: 1 }
    },
    answerKey: {
      schemeTitle: 'KTU Valuation Scheme - CST303 May 2022',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks = 70 Marks',
      rubrics: [
        {
          question: 'Q11 (Binary Exponential Backoff)',
          marksAllocated: 14,
          criteria: [
            '3 marks for collision jam signal and slot time definition',
            '5 marks for k selection range equation [0, 2^min(i, 10) - 1]',
            '3 marks for 10th and 16th collision limits',
            '3 marks for numerical calculation'
          ]
        },
        {
          question: 'Q14 (TCP Reno AIMD)',
          marksAllocated: 14,
          criteria: [
            '4 marks for Additive Increase equation per RTT',
            '4 marks for Multiplicative Decrease ssthresh halving',
            '6 marks for Fast Recovery state transition vs TCP Tahoe'
          ]
        }
      ],
      examinerChecklist: [
        'Confirm distinction between slot time (51.2 µs) and propagation time.',
        'Verify that Tahoe drops to 1 MSS whereas Reno halves cwnd.'
      ]
    }
  },

  'qp-apr2018': {
    paperId: 'qp-apr2018',
    title: 'S6 B.Tech Computer Networks Regular Exam - April 2018',
    examMonthYear: 'April 2018',
    scheme: 'KTU 2015',
    solution: {
      overview: 'KTU 2015 Scheme classical comprehensive exam covering OSI Layer 2 bridging, Link State vs Distance Vector, and Leaky Bucket traffic shaping.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 1,
          marks: 3,
          questionText: 'What are the design issues for layers in network architecture?',
          solutionText: 'Key issues: Addressing (identifying sender/receiver), Error Control (detection/correction), Flow Control (matching fast sender to slow receiver), and Multiplexing (sharing physical link).',
          keywords: ['Addressing', 'Error control', 'Flow control']
        },
        {
          questionNumber: 'Q2',
          module: 2,
          marks: 3,
          questionText: 'Explain Byte Stuffing with an example.',
          solutionText: 'When character-oriented framing uses FLAG bytes, an ESC (Escape) byte is inserted before any data byte that happens to have the same pattern as FLAG or ESC.',
          formulaOrCode: 'Original: FLAG -> Stuffed: ESC FLAG',
          keywords: ['FLAG byte', 'ESC insertion', 'Delimiter escaping']
        },
        {
          questionNumber: 'Q3',
          module: 3,
          marks: 3,
          questionText: 'Differentiate between interior and exterior routing protocols.',
          solutionText: 'IGP (Interior Gateway Protocol like OSPF, RIP) routes traffic within a single Autonomous System under common administrative control. EGP (Exterior Gateway Protocol like BGP) exchanges reachability between separate Autonomous Systems.',
          keywords: ['Intra-AS vs Inter-AS', 'OSPF/RIP vs BGP']
        },
        {
          questionNumber: 'Q4',
          module: 4,
          marks: 3,
          questionText: 'What is the role of Port Numbers in Transport Layer?',
          solutionText: '16-bit Port numbers provide process-to-process multiplexing and demultiplexing, identifying the exact application endpoint on a multi-tasking host.',
          keywords: ['Process addressing', '16-bit port', 'Demultiplexing']
        },
        {
          questionNumber: 'Q5',
          module: 5,
          marks: 3,
          questionText: 'Explain the working of SMTP mail transfer protocol.',
          solutionText: 'Push protocol running on TCP port 25 using plain-text ASCII commands (HELO, MAIL FROM, RCPT TO, DATA, QUIT) to deliver email between mail transfer agents (MTAs).',
          keywords: ['Port 25', 'Push protocol', 'MTA transfer']
        }
      ],
      partB: [
        {
          questionNumber: 'Q12',
          module: 4,
          marks: 14,
          questionText: 'A Leaky Bucket has capacity 10 MB and output leak rate of 2 MB/sec. A burst of data arrives at 10 MB/sec for 1 second. Calculate: (1) Time to empty bucket, and (2) Minimum bucket capacity to prevent loss if burst lasts 2 seconds.',
          solutionSteps: [
            'Step 1: During the 1-second burst: Inflow = 10 MB. Outflow = 2 MB. Net accumulation in bucket = 10 - 2 = 8 MB.',
            'Step 2: Since 8 MB <= 10 MB bucket capacity, zero packets are discarded.',
            'Step 3: After burst stops, remaining 8 MB drains at 2 MB/sec: Time = 8 MB / 2 MB/sec = 4 seconds.',
            'Step 4: Total emptying time from start of burst = 1s + 4s = 5 seconds.',
            'Step 5: For a 2-second burst at 10 MB/sec: Inflow = 20 MB. Output during burst = 2s * 2 MB/sec = 4 MB. Net accumulation = 20 - 4 = 16 MB. Minimum required capacity = 16 MB.'
          ],
          formulaOrCode: 'Accumulation = Burst_Duration * (Inflow_Rate - Outflow_Rate)',
          finalAnswer: 'Time to empty = 5 seconds. Minimum bucket capacity required for 2s burst = 16 MB.'
        },
        {
          questionNumber: 'Q13',
          module: 3,
          marks: 14,
          questionText: 'Compare Link State Routing (OSPF) and Distance Vector Routing (RIP) across convergence speed, scalability, and routing overhead.',
          solutionSteps: [
            'Convergence: OSPF achieves immediate convergence via Dijkstra SPF upon topology change, whereas RIP converges slowly and suffers from count-to-infinity.',
            'Information Dissemination: OSPF broadcasts full link-state packets (LSA) to entire area; RIP shares entire distance vector only with immediate neighbors.',
            'Routing Metrics: OSPF uses cost inversely proportional to link bandwidth; RIP strictly counts hop counts (capped at 15).',
            'Loop Freedom: OSPF shortest path tree guarantees loop-free paths; RIP requires split horizon and poison reverse heuristics.'
          ],
          formulaOrCode: 'OSPF: O((V+E) log V) SPF  vs  RIP: O(V * E) Bellman-Ford',
          finalAnswer: 'OSPF is vastly superior for scalable enterprise and datacenter networks; RIP is restricted to small legacy topologies.'
        }
      ]
    },
    demo: {
      type: 'token-bucket',
      title: 'Leaky Bucket vs Token Bucket Traffic Shaper Demo',
      instructions: 'Configure packet burst rates and bucket leak limits to observe real-time buffer queues and packet drop thresholds matching Question 12.',
      initialState: { capacity: 10, leakRate: 2, burstRate: 10 }
    },
    answerKey: {
      schemeTitle: 'KTU Valuation Scheme - S6 Computer Networks April 2018',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks = 70 Marks',
      rubrics: [
        {
          question: 'Q12 (Leaky Bucket Numerical)',
          marksAllocated: 14,
          criteria: [
            '4 marks for 1-second burst accumulation calculation (8 MB)',
            '4 marks for drain time calculation (4s post-burst = 5s total)',
            '6 marks for 2-second burst accumulation and 16 MB capacity derivation'
          ]
        },
        {
          question: 'Q13 (OSPF vs RIP Comparison)',
          marksAllocated: 14,
          criteria: [
            '4 marks for convergence speed and count-to-infinity comparison',
            '4 marks for metrics and advertisement scope',
            '6 marks for algorithm complexity and scalability table'
          ]
        }
      ],
      examinerChecklist: [
        'Verify that total drain time accounts for the burst duration.',
        'Ensure hop count limit of 15 is explicitly cited for RIP.'
      ]
    }
  },

  'qp-may2019': {
    paperId: 'qp-may2019',
    title: 'S6 CS Computer Networks Regular Exam - May 2019',
    examMonthYear: 'May 2019',
    scheme: 'KTU 2015',
    solution: {
      overview: 'May 2019 examination exploring CRC polynomials, token ring media access, BGP exterior routing, and socket programming.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 1,
          marks: 3,
          questionText: 'What is Manchester encoding? How does it achieve self-synchronization?',
          solutionText: 'Manchester encoding transitions at the middle of every bit interval: low-to-high represents 1, high-to-low represents 0. Because a voltage transition occurs in every bit cell, the receiver clock stays synchronized with zero DC bias.',
          keywords: ['Mid-bit transition', 'Clock synchronization', 'No DC component']
        },
        {
          questionNumber: 'Q2',
          module: 2,
          marks: 3,
          questionText: 'Explain the working of Selective Repeat ARQ receiver window.',
          solutionText: 'The receiver maintains a window of size W and accepts out-of-order frames within the window, returning ACK for each valid frame. Frames are held in buffer and passed in order to network layer once missing frames arrive.',
          keywords: ['Out-of-order buffer', 'Individual ACK', 'Wr = Ws']
        },
        {
          questionNumber: 'Q3',
          module: 3,
          marks: 3,
          questionText: 'What is NAT (Network Address Translation)? Why is it required?',
          solutionText: 'NAT translates private non-routable IP addresses (RFC 1918) within a local network to a single public routable IP using port mapping (NAPT), conserving global IPv4 space and providing security.',
          keywords: ['Private to Public', 'RFC 1918', 'IPv4 conservation']
        },
        {
          questionNumber: 'Q4',
          module: 4,
          marks: 3,
          questionText: 'Differentiate between flow control and congestion control in computer networks.',
          solutionText: 'Flow control is an end-to-end mechanism where receiver limits sender rate to avoid buffer overflow (advertised window). Congestion control is a global network mechanism where sender limits rate to prevent switch queue collapse.',
          keywords: ['End-to-end vs Global', 'Receiver buffer vs Network pipes']
        },
        {
          questionNumber: 'Q5',
          module: 5,
          marks: 3,
          questionText: 'What is the role of MIME in electronic mail?',
          solutionText: 'MIME (Multipurpose Internet Mail Extensions) extends standard 7-bit ASCII SMTP to support binary audio, video, images, multi-part attachments, and non-ASCII character sets using Base64 encoding.',
          keywords: ['Base64 encoding', 'Binary attachments', 'Non-ASCII character sets']
        }
      ],
      partB: [
        {
          questionNumber: 'Q11',
          module: 2,
          marks: 14,
          questionText: 'Given message M = 1010001101 and polynomial G(x) = x^5 + x^4 + x^2 + 1. Calculate transmitted frame using CRC.',
          solutionSteps: [
            'Step 1: G(x) = 1*x^5 + 1*x^4 + 0*x^3 + 1*x^2 + 0*x^1 + 1 = 110101 (degree r = 5).',
            'Step 2: Append r=5 zeroes to message M: 1010001101 00000.',
            'Step 3: Execute Modulo-2 binary long division using XOR operations.',
            'Step 4: Remainder R calculated = 01110.',
            'Step 5: Transmitted Frame T = M + R = 1010001101 01110.'
          ],
          formulaOrCode: 'T = M * 2^r XOR R',
          finalAnswer: 'Transmitted Frame: 101000110101110.'
        },
        {
          questionNumber: 'Q13',
          module: 3,
          marks: 14,
          questionText: 'Explain the working of BGP (Border Gateway Protocol) and path vector routing.',
          solutionSteps: [
            'Step 1: BGP operates as a Path Vector exterior routing protocol over TCP port 179.',
            'Step 2: Instead of raw link costs, BGP advertises complete sequence of Autonomous System Numbers (AS-Path: e.g., AS100 -> AS200 -> AS300).',
            'Step 3: Loop Prevention: If an AS sees its own AS number in the incoming AS-Path attribute, it immediately discards the advertisement.',
            'Step 4: Policy-Based Routing: Administrators select paths based on business agreements, peering contracts, and shortest AS-hop length.'
          ],
          formulaOrCode: 'AS-Path: [AS_1, AS_2, ..., AS_k]',
          finalAnswer: 'Path vector guarantees loop-free global inter-domain routing across thousands of ISPs.'
        }
      ]
    },
    demo: {
      type: 'crc',
      title: 'CRC-16 Polynomial Checksum Generator & Bit Inverter',
      instructions: 'Input custom binary data streams and generator polynomials to inspect modulo-2 division, remainder computation, and corrupted bit detection matching Question 11.',
      initialState: { data: '1010001101', poly: '110101' }
    },
    answerKey: {
      schemeTitle: 'KTU Valuation Scheme - S6 CS May 2019',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks = 70 Marks',
      rubrics: [
        {
          question: 'Q11 (CRC Polynomial Calculation)',
          marksAllocated: 14,
          criteria: [
            '3 marks for polynomial conversion to binary (110101)',
            '7 marks for modulo-2 division step work',
            '4 marks for remainder (01110) and final code word'
          ]
        },
        {
          question: 'Q13 (BGP Path Vector Routing)',
          marksAllocated: 14,
          criteria: [
            '4 marks for Path Vector concept over TCP 179',
            '4 marks for AS-Path attribute loop prevention mechanism',
            '6 marks for policy routing rules and peering relationships'
          ]
        }
      ],
      examinerChecklist: [
        'Ensure polynomial degree r=5 requires 5 appended zeroes.',
        'Verify AS-Path attribute mechanism is detailed for loop prevention.'
      ]
    }
  },

  'qp-model-1': {
    paperId: 'qp-model-1',
    title: 'PCCST501 Computer Networks Model Exam Paper - Set 1',
    examMonthYear: 'Model Set 1',
    scheme: 'KTU 2019',
    solution: {
      overview: 'Curated university model examination evaluating core module 1 and 2 competencies: Shannon theorem, CRC-CCITT, and Sliding Window performance.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 1,
          marks: 3,
          questionText: 'A channel has 4 kHz bandwidth and SNR of 30 dB. What is the maximum Shannon data rate?',
          solutionText: 'SNR(dB) = 10 * log10(SNR) => 30 dB => SNR = 10^(30/10) = 1000. Shannon capacity C = B * log2(1 + SNR) = 4000 * log2(1001) ≈ 4000 * 9.967 = 39,869 bps ≈ 39.87 kbps.',
          formulaOrCode: 'C = B * log2(1 + SNR) = 4000 * log2(1001) = 39.87 kbps',
          keywords: ['30 dB to 1000 ratio', 'Shannon capacity', '39.87 kbps']
        },
        {
          questionNumber: 'Q2',
          module: 2,
          marks: 3,
          questionText: 'State advantages of Fiber Optic cable over Copper Coaxial cable.',
          solutionText: 'Immunity to Electromagnetic Interference (EMI), vastly superior bandwidth-distance product, significantly lower attenuation losses, and zero electrical spark risk in hazardous zones.',
          keywords: ['EMI immunity', 'Lower attenuation', 'High bandwidth']
        },
        {
          questionNumber: 'Q3',
          module: 2,
          marks: 3,
          questionText: 'Calculate line utilization for Stop-and-Wait protocol with 1000-bit frame, 1 Mbps link, and 25 ms propagation delay.',
          solutionText: 'Transmission time Tt = 1000 bits / 1,000,000 bps = 1 ms. Propagation time Tp = 25 ms. Parameter a = Tp / Tt = 25 / 1 = 25. Utilization U = 1 / (1 + 2*a) = 1 / (1 + 50) = 1/51 ≈ 1.96%.',
          formulaOrCode: 'U = 1 / (1 + 2*a) = 1 / (1 + 2 * (25/1)) = 1.96%',
          keywords: ['1 ms transmission', '25 ms propagation', '1.96% utilization']
        },
        {
          questionNumber: 'Q4',
          module: 3,
          marks: 3,
          questionText: 'What is the role of TTL (Time To Live) in IPv4 header?',
          solutionText: 'Prevents packets from looping endlessly in networks due to routing misconfigurations. Every router that forwards the packet decrements TTL by 1. When TTL reaches 0, the packet is discarded and an ICMP Time Exceeded message is returned.',
          keywords: ['Routing loops', 'Decrement by 1', 'ICMP Time Exceeded']
        },
        {
          questionNumber: 'Q5',
          module: 4,
          marks: 3,
          questionText: 'Why does UDP have less overhead than TCP?',
          solutionText: 'UDP is connectionless with an 8-byte header and zero handshake, flow control, or retransmission machinery. TCP carries a 20-byte header, state machines, ACK processing, and congestion management.',
          keywords: ['8-byte header', 'Connectionless', 'No handshakes']
        }
      ],
      partB: [
        {
          questionNumber: 'Q11',
          module: 2,
          marks: 14,
          questionText: 'Demonstrate CRC error detection for message M = 1101011111 with generator polynomial G(x) = x^4 + x^3 + 1.',
          solutionSteps: [
            'Step 1: G(x) = x^4 + x^3 + 0*x^2 + 0*x + 1 = 11001 (r = 4).',
            'Step 2: Append 4 zeroes: 1101011111 0000.',
            'Step 3: Modulo-2 division of 11010111110000 by 11001 yields Remainder R = 0011.',
            'Step 4: Transmitted codeword: 11010111110011.',
            'Step 5: Error check: Divide codeword by 11001 at receiver. Remainder = 0000. Data verified!'
          ],
          formulaOrCode: 'T(x) = M(x)*x^4 + R(x)',
          finalAnswer: 'Transmitted Codeword: 11010111110011. Zero remainder confirms integrity.'
        },
        {
          questionNumber: 'Q13',
          module: 3,
          marks: 14,
          questionText: 'Apply Dijkstra routing algorithm on a weighted mesh topology with 5 nodes.',
          solutionSteps: [
            'Step 1: Node 1 to neighbors: Node 2 (weight 2), Node 3 (weight 5). Permanent: Node 1.',
            'Step 2: Node 2 (cost 2) becomes permanent. Relax neighbors: Node 3 via Node 2 cost = 2+2=4 < 5. Node 4 via Node 2 cost = 2+7=9.',
            'Step 3: Node 3 (cost 4) becomes permanent. Relax Node 5 via Node 3 cost = 4+3=7. Node 4 via Node 3 cost = 4+1=5 < 9.',
            'Step 4: Node 4 (cost 5) becomes permanent. Relax Node 5 via Node 4 cost = 5+1=6 < 7.',
            'Step 5: Node 5 (cost 6) becomes permanent.'
          ],
          formulaOrCode: 'dist[v] = min(dist[v], dist[u] + w(u,v))',
          finalAnswer: 'Optimal Costs from Node 1: N2=2, N3=4, N4=5, N5=6.'
        }
      ]
    },
    demo: {
      type: 'dijkstra',
      title: 'Dijkstra Shortest Path Interactive Mesh Optimizer',
      instructions: 'Click nodes to trace minimum tentative distances and candidate set S updates matching Model Paper Set 1.',
      initialState: { source: '1', target: '5' }
    },
    answerKey: {
      schemeTitle: 'Valuation Scheme - Model Paper Set 1',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks = 70 Marks',
      rubrics: [
        {
          question: 'Q1 (Shannon Channel Capacity)',
          marksAllocated: 3,
          criteria: [
            '1 mark for SNR conversion to linear scale (1000)',
            '1 mark for Shannon capacity formula',
            '1 mark for final result (39.87 kbps)'
          ]
        },
        {
          question: 'Q11 (CRC Modulo-2 Division)',
          marksAllocated: 14,
          criteria: [
            '3 marks for generator conversion (11001)',
            '7 marks for division work',
            '4 marks for remainder (0011) and verification'
          ]
        }
      ],
      examinerChecklist: [
        'Confirm SNR 30dB calculation uses 10^(30/10)=1000.',
        'Accept answers within rounding margin 39.8 - 39.9 kbps.'
      ]
    }
  },

  'qp-model-2': {
    paperId: 'qp-model-2',
    title: 'PCCST501 Computer Networks Model Exam Paper - Set 2',
    examMonthYear: 'Model Set 2',
    scheme: 'KTU 2019',
    solution: {
      overview: 'Focuses on IP Classless Inter-Domain Routing (CIDR), sliding window Go-Back-N, and distance vector routing.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 1,
          marks: 3,
          questionText: 'What is attenuation? How is it expressed mathematically in dB?',
          solutionText: 'Attenuation is the loss of signal energy as it propagates through a transmission medium. Expressed in decibels: dB = 10 * log10(P2 / P1), where P1 is input power and P2 is output power.',
          formulaOrCode: 'dB = 10 * log10(P_out / P_in)',
          keywords: ['Signal loss', 'Decibels formula', 'P_out / P_in']
        },
        {
          questionNumber: 'Q2',
          module: 2,
          marks: 3,
          questionText: 'Why can the sender window size not exceed 2^m - 1 in Go-Back-N protocol?',
          solutionText: 'If window size were 2^m, when all ACKs are lost, the sender retransmits the old window. The receiver would be unable to distinguish whether the incoming frame is a duplicate of the old window or the start of the next cycle.',
          keywords: ['Ambiguity', 'Lost ACK confusion', '2^m - 1 bound']
        },
        {
          questionNumber: 'Q3',
          module: 3,
          marks: 3,
          questionText: 'What is an Autonomous System (AS)? Name three types.',
          solutionText: 'An Autonomous System is a collection of IP networks and routers under the control of one administrative entity with a common routing policy. Types: Stub AS, Multihomed AS, Transit AS.',
          keywords: ['Common administration', 'Stub, Multihomed, Transit']
        },
        {
          questionNumber: 'Q4',
          module: 4,
          marks: 3,
          questionText: 'Explain the role of TCP Receive Window (rwnd) field.',
          solutionText: 'A 16-bit field in TCP header that conveys the available buffer space at the receiver in bytes, implementing dynamic flow control to prevent sender from overrunning receiver memory.',
          keywords: ['Receiver buffer space', 'Flow control', '16-bit rwnd']
        },
        {
          questionNumber: 'Q5',
          module: 5,
          marks: 3,
          questionText: 'What is the role of an FTP control connection vs data connection?',
          solutionText: 'FTP uses two separate connections: Control connection on port 21 remains open throughout session for commands/responses; Data connection on port 20 is opened and closed dynamically for each individual file transfer.',
          keywords: ['Port 21 control', 'Port 20 data', 'Out-of-band']
        }
      ],
      partB: [
        {
          questionNumber: 'Q12',
          module: 3,
          marks: 14,
          questionText: 'Subnet network 200.100.50.0/24 into 4 equal subnets. For each subnet, find: (1) Subnet mask, (2) Subnet address, (3) Usable host range, and (4) Broadcast address.',
          solutionSteps: [
            'Step 1: 4 subnets requires 2^2 = 4, so borrow 2 bits from host portion. New prefix: /24 + 2 = /26.',
            'Step 2: Subnet mask = 255.255.255.192. Block size = 256 - 192 = 64 addresses per subnet.',
            'Subnet 0: Net: 200.100.50.0/26, Usable: 200.100.50.1 - 200.100.50.62, Broadcast: 200.100.50.63.',
            'Subnet 1: Net: 200.100.50.64/26, Usable: 200.100.50.65 - 200.100.50.126, Broadcast: 200.100.50.127.',
            'Subnet 2: Net: 200.100.50.128/26, Usable: 200.100.50.129 - 200.100.50.190, Broadcast: 200.100.50.191.',
            'Subnet 3: Net: 200.100.50.192/26, Usable: 200.100.50.193 - 200.100.50.254, Broadcast: 200.100.50.255.'
          ],
          formulaOrCode: 'Subnet_Count = 2^2 = 4; Host_Capacity = 2^(32-26) - 2 = 62',
          finalAnswer: 'All 4 subnets cleanly created with 62 usable hosts each.'
        },
        {
          questionNumber: 'Q14',
          module: 4,
          marks: 14,
          questionText: 'Explain Leaky Bucket vs Token Bucket algorithms with mathematical burst tolerance derivation.',
          solutionSteps: [
            'Step 1: Leaky bucket enforces strictly constant output rate r regardless of burst.',
            'Step 2: Token bucket accumulates tokens up to capacity C at token generation rate r.',
            'Step 3: When a burst arrives at maximum transmission rate M > r, tokens are consumed: Burst duration S = C / (M - r).',
            'Step 4: Maximum burst volume transmitted = M * S = (C * M) / (M - r).'
          ],
          formulaOrCode: 'S = C / (M - r)',
          finalAnswer: 'Token bucket smoothly accommodates transient bursts without discarding traffic.'
        }
      ]
    },
    demo: {
      type: 'cidr',
      title: 'Equal Subnet Allocation & CIDR Calculator',
      instructions: 'Divide class C network 200.100.50.0/24 into equal subnets and examine bitmask allocation matching Model Paper Set 2.',
      initialState: { baseIp: '200.100.50.0', prefix: 24, targetSubnets: 4 }
    },
    answerKey: {
      schemeTitle: 'Valuation Scheme - Model Paper Set 2',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks = 70 Marks',
      rubrics: [
        {
          question: 'Q12 (4-way Subnetting)',
          marksAllocated: 14,
          criteria: [
            '2 marks for borrowing 2 bits and /26 mask (255.255.255.192)',
            '3 marks each for Subnet 0, Subnet 1, Subnet 2, Subnet 3'
          ]
        },
        {
          question: 'Q14 (Token Bucket Burst Math)',
          marksAllocated: 14,
          criteria: [
            '4 marks for token bucket mechanism explanation',
            '6 marks for burst duration derivation S = C / (M - r)',
            '4 marks for comparative summary'
          ]
        }
      ],
      examinerChecklist: [
        'Ensure broadcast and network IDs are not included in usable host ranges.',
        'Verify burst duration calculation correctly applies token generation rate r.'
      ]
    }
  },

  'qp-model-3': {
    paperId: 'qp-model-3',
    title: 'PCCST501 Computer Networks Model Exam Paper - Set 3',
    examMonthYear: 'Model Set 3',
    scheme: 'KTU 2019',
    solution: {
      overview: 'Rigorous analytical examination on HDLC framing, Hamming single-error correction, OSPF link state routing, and TCP state machine.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 1,
          marks: 3,
          questionText: 'What is the function of the Physical Layer in computer networks?',
          solutionText: 'Transmits raw uninterpreted bits over physical media. Defines mechanical, electrical, functional, and procedural characteristics of physical interfaces (pinouts, voltages, modulation).',
          keywords: ['Raw bits', 'Electrical/mechanical specs', 'Media transmission']
        },
        {
          questionNumber: 'Q2',
          module: 2,
          marks: 3,
          questionText: 'Explain the concept of Piggybacking in bidirectional communication.',
          solutionText: 'The technique of attaching acknowledgment information (ACK) to an outgoing data frame instead of sending a standalone ACK frame, reducing channel overhead and increasing throughput.',
          keywords: ['ACK in data frame', 'Header optimization', 'Reduced overhead']
        },
        {
          questionNumber: 'Q3',
          module: 3,
          marks: 3,
          questionText: 'Explain the difference between IP unicast, multicast, and broadcast.',
          solutionText: 'Unicast: 1-to-1 transmission to a single interface. Multicast: 1-to-many transmission to subscribed group members (Class D 224.0.0.0/4). Broadcast: 1-to-all transmission to every host on subnet (255.255.255.255).',
          keywords: ['1-to-1', '1-to-group', '1-to-all']
        },
        {
          questionNumber: 'Q4',
          module: 4,
          marks: 3,
          questionText: 'What is Maximum Transmission Unit (MTU)? How does it trigger IP fragmentation?',
          solutionText: 'MTU is the largest packet payload size a physical data link layer can encapsulate (e.g. 1500 bytes for Ethernet). When an IP packet exceeds outgoing link MTU, it must be split into fragments.',
          keywords: ['Link payload limit', '1500 bytes Ethernet', 'Fragmentation']
        },
        {
          questionNumber: 'Q5',
          module: 5,
          marks: 3,
          questionText: 'How does Cookie management maintain state over stateless HTTP?',
          solutionText: 'Server sends a Set-Cookie header with session ID in HTTP response. The browser stores it and automatically returns it in subsequent request headers (Cookie: session_id=...), enabling session tracking.',
          keywords: ['Set-Cookie header', 'Session ID', 'State over HTTP']
        }
      ],
      partB: [
        {
          questionNumber: 'Q11',
          module: 2,
          marks: 14,
          questionText: 'Construct Hamming (7, 4) code for data 0110. Invert bit 3 and demonstrate error detection and correction.',
          solutionSteps: [
            'Step 1: Data bits: d1=0, d2=1, d3=1, d4=0.',
            'Step 2: Parity positions: p1 (pos 1), p2 (pos 2), p4 (pos 4). Positions: p1, p2, d1, p4, d2, d3, d4.',
            'Step 3: Parity calculations: p1 = d1 ⊕ d2 ⊕ d4 = 0 ⊕ 1 ⊕ 0 = 1. p2 = d1 ⊕ d3 ⊕ d4 = 0 ⊕ 1 ⊕ 0 = 1. p4 = d2 ⊕ d3 ⊕ d4 = 1 ⊕ 1 ⊕ 0 = 0.',
            'Step 4: Codeword: 1 1 0 0 1 1 0.',
            'Step 5: Invert bit 3 (d1 flips from 0 to 1): Received: 1 1 1 0 1 1 0.',
            'Step 6: Syndrome: s1 = 1⊕1⊕1⊕0 = 1. s2 = 1⊕1⊕1⊕0 = 1. s4 = 0⊕1⊕1⊕0 = 0. Syndrome = s4 s2 s1 = 011 (decimal 3). Bit 3 is flipped back to 0!'
          ],
          formulaOrCode: 'Syndrome = s4*4 + s2*2 + s1*1 = 3',
          finalAnswer: 'Corrected Codeword: 1100110. Original data 0110 recovered.'
        },
        {
          questionNumber: 'Q13',
          module: 3,
          marks: 14,
          questionText: 'Execute Dijkstra algorithm on a 5-node topology from source node S to all destinations.',
          solutionSteps: [
            'Step 1: S initialized to 0; all other nodes infinite.',
            'Step 2: Connect S to A (cost 3), B (cost 5). A is permanent at cost 3.',
            'Step 3: Relax neighbors of A: C = 3+2=5, D = 3+6=9.',
            'Step 4: Nodes B and C tied at cost 5. Pick B (permanent). Relax B neighbors.',
            'Step 5: Pick C (permanent). Relax C to D: 5+3=8 < 9.',
            'Step 6: Node D permanent at cost 8.'
          ],
          formulaOrCode: 'dist[D] = min(9, 5+3) = 8',
          finalAnswer: 'Optimal Costs: S=0, A=3, B=5, C=5, D=8.'
        }
      ]
    },
    demo: {
      type: 'hamming',
      title: 'Interactive Hamming Code Error Recovery Workbench',
      instructions: 'Input 0110 to trace parity bit insertion and syndrome bit calculation matching Model Paper Set 3.',
      initialState: { data: '0110', errorPos: 3 }
    },
    answerKey: {
      schemeTitle: 'Valuation Scheme - Model Paper Set 3',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks = 70 Marks',
      rubrics: [
        {
          question: 'Q11 (Hamming 7,4 Code)',
          marksAllocated: 14,
          criteria: [
            '2 marks for parity placement scheme',
            '6 marks for parity calculations (p1=1, p2=1, p4=0)',
            '3 marks for error bit syndrome calculation (011 = 3)',
            '3 marks for bit restoration'
          ]
        },
        {
          question: 'Q13 (Dijkstra SPF Trace)',
          marksAllocated: 14,
          criteria: [
            '4 marks for initialization vector',
            '6 marks for iteration-by-iteration node relaxation',
            '4 marks for final shortest path costs'
          ]
        }
      ],
      examinerChecklist: [
        'Verify even parity bit equations are properly formatted.',
        'Confirm syndrome decimal conversion correctly maps to bit error position.'
      ]
    }
  },

  'qp-model-4': {
    paperId: 'qp-model-4',
    title: 'PCCST501 Computer Networks Model Exam Paper - Set 4',
    examMonthYear: 'Model Set 4',
    scheme: 'KTU 2019',
    solution: {
      overview: 'Focuses on TCP 3-way handshake, congestion avoidance, IPv4 CIDR division, and application layer protocols.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 1,
          marks: 3,
          questionText: 'What is star topology? State two key advantages over bus topology.',
          solutionText: 'In star topology, every node connects directly to a central hub or switch. Advantages: (1) Single cable fault does not bring down the network, (2) Easy fault isolation and centralized management.',
          keywords: ['Central switch', 'Fault isolation', 'No shared bus']
        },
        {
          questionNumber: 'Q2',
          module: 2,
          marks: 3,
          questionText: 'Explain the working of Cyclic Redundancy Check (CRC).',
          solutionText: 'Treats binary bit sequences as algebraic polynomials with coefficients in GF(2). Sender appends r zeroes, divides by generator polynomial G(x), and transmits message + remainder. If receiver division yields non-zero remainder, frame is corrupted.',
          keywords: ['Polynomial division', 'Modulo-2 arithmetic', 'Zero remainder test']
        },
        {
          questionNumber: 'Q3',
          module: 3,
          marks: 3,
          questionText: 'What is the role of the Subnet Mask in IP networking?',
          solutionText: 'A 32-bit mask of continuous 1s followed by 0s that a router bitwise ANDs with a destination IP address to isolate the network prefix from the host identifier.',
          keywords: ['Bitwise AND', 'Network prefix', 'Host ID isolation']
        },
        {
          questionNumber: 'Q4',
          module: 4,
          marks: 3,
          questionText: 'Why is TCP called a reliable stream transport protocol?',
          solutionText: 'Guarantees in-order, error-free delivery of byte streams through sequence numbers, cumulative ACKs, checksums, and automatic timeout retransmission.',
          keywords: ['In-order delivery', 'Cumulative ACK', 'Retransmission']
        },
        {
          questionNumber: 'Q5',
          module: 5,
          marks: 3,
          questionText: 'Explain the concept of Web Caching and conditional GET.',
          solutionText: 'Proxies store copies of recent web assets. Client requests include If-Modified-Since header; if asset has not changed, server returns lightweight 304 Not Modified without sending payload body.',
          keywords: ['304 Not Modified', 'If-Modified-Since', 'Proxy caching']
        }
      ],
      partB: [
        {
          questionNumber: 'Q11',
          module: 2,
          marks: 14,
          questionText: 'Compute CRC codeword for message M = 11100011 with generator G(x) = x^3 + x + 1.',
          solutionSteps: [
            'Step 1: Generator binary: G(x) = 1*x^3 + 0*x^2 + 1*x + 1 = 1011 (r = 3).',
            'Step 2: Append 3 zeroes: 11100011 000.',
            'Step 3: Modulo-2 division of 11100011000 by 1011.',
            'Step 4: Division yields Remainder R = 110.',
            'Step 5: Transmitted Codeword: 11100011 110.'
          ],
          formulaOrCode: 'T = M * 2^3 XOR R = 11100011110',
          finalAnswer: 'Transmitted Codeword: 11100011110.'
        },
        {
          questionNumber: 'Q14',
          module: 4,
          marks: 14,
          questionText: 'Explain TCP Congestion Control AIMD and Slow Start with window evolution graph.',
          solutionSteps: [
            'Step 1: Slow Start: cwnd grows exponentially by 1 MSS for each ACK: cwnd = cwnd * 2 per RTT.',
            'Step 2: When cwnd >= ssthresh, Congestion Avoidance begins: cwnd increases by 1 MSS per RTT (linear growth).',
            'Step 3: Loss detection via 3 Duplicate ACKs: ssthresh = cwnd / 2, Fast Retransmit, and Fast Recovery.',
            'Step 4: Loss detection via Timeout: ssthresh = cwnd / 2, cwnd drops back to 1 MSS, restart Slow Start.'
          ],
          formulaOrCode: 'AIMD: Linear Increase + Multiplicative Halving',
          finalAnswer: 'Maintains stability across internet links with dynamic fair bandwidth sharing.'
        }
      ]
    },
    demo: {
      type: 'tcp-congestion',
      title: 'TCP Congestion Control Sawtooth Visualizer',
      instructions: 'Run the interactive simulation to observe Slow Start exponential ramp and AIMD linear increase matching Model Paper Set 4.',
      initialState: { ssthresh: 16 }
    },
    answerKey: {
      schemeTitle: 'Valuation Scheme - Model Paper Set 4',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks = 70 Marks',
      rubrics: [
        {
          question: 'Q11 (CRC Calculation)',
          marksAllocated: 14,
          criteria: [
            '3 marks for generator polynomial conversion (1011)',
            '7 marks for division execution',
            '4 marks for remainder (110) and codeword'
          ]
        },
        {
          question: 'Q14 (TCP AIMD)',
          marksAllocated: 14,
          criteria: [
            '4 marks for Slow Start equation',
            '4 marks for Congestion Avoidance linear growth',
            '6 marks for graph and 3 dup ACK vs timeout comparison'
          ]
        }
      ],
      examinerChecklist: [
        'Confirm distinction between timeout and 3 dup ACKs behavior.',
        'Ensure ssthresh halving formula ssthresh = max(cwnd/2, 2*MSS) is clearly shown.'
      ]
    }
  },

  'qp-model-5': {
    paperId: 'qp-model-5',
    title: 'PCCST501 Computer Networks Model Exam Paper - Set 5',
    examMonthYear: 'Model Set 5',
    scheme: 'KTU 2019',
    solution: {
      overview: 'Model examination covering VLSM subnetting, distance vector routing count-to-infinity, and BSD socket programming.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 1,
          marks: 3,
          questionText: 'What is propagation delay vs transmission delay in networking?',
          solutionText: 'Transmission delay is the time to push all packet bits onto the wire: T_trans = Packet_Size / Bandwidth. Propagation delay is the time for a bit to travel through the medium at speed of light: T_prop = Distance / Propagation_Speed.',
          formulaOrCode: 'T_trans = L / R  vs  T_prop = d / v',
          keywords: ['L / R bandwidth', 'd / v media speed']
        },
        {
          questionNumber: 'Q2',
          module: 2,
          marks: 3,
          questionText: 'State the difference between Flow Control and Error Control in Data Link Layer.',
          solutionText: 'Flow control manages transmission rate to prevent sender from overwhelming receiver buffer (Sliding Window). Error control detects and corrects frame corruption and lost frames (CRC, ARQ).',
          keywords: ['Buffer overrun prevention', 'Corruption detection']
        },
        {
          questionNumber: 'Q3',
          module: 3,
          marks: 3,
          questionText: 'What is Classless Inter-Domain Routing (CIDR)? What problem did it solve?',
          solutionText: 'Replaced rigid Class A, B, C boundaries with arbitrary-length prefix masking (e.g. /21). Solved rapid IPv4 address exhaustion and explosive global routing table expansion.',
          keywords: ['Prefix length /N', 'IPv4 exhaustion solution', 'Aggregation']
        },
        {
          questionNumber: 'Q4',
          module: 4,
          marks: 3,
          questionText: 'Explain the working of TCP Nagle algorithm.',
          solutionText: 'Combines multiple small outgoing data chunks into a single segment: if unacknowledged data exists on connection, buffer outgoing data until buffer holds a full MSS or ACK arrives, preventing tinygram overhead.',
          keywords: ['Small packets buffering', 'Full MSS threshold', 'Tinygram solution']
        },
        {
          questionNumber: 'Q5',
          module: 5,
          marks: 3,
          questionText: 'What is the role of DNS CNAME and MX records?',
          solutionText: 'CNAME (Canonical Name) creates an alias pointing to another domain name. MX (Mail Exchanger) specifies the mail server responsible for receiving emails for the domain along with priority.',
          keywords: ['Domain alias', 'Mail server routing', 'Priority value']
        }
      ],
      partB: [
        {
          questionNumber: 'Q12',
          module: 3,
          marks: 14,
          questionText: 'Given block 172.16.0.0/16, create 8 equal subnets. Calculate subnet mask, first subnet range, and last subnet range.',
          solutionSteps: [
            'Step 1: 8 subnets requires borrowing 3 bits (2^3 = 8). New prefix: /16 + 3 = /19.',
            'Step 2: Subnet Mask: 255.255.224.0. Third octet block size: 256 - 224 = 32.',
            'Step 3: Subnet 1: Network ID 172.16.0.0/19. Usable Host Range: 172.16.0.1 to 172.16.31.254. Broadcast: 172.16.31.255.',
            'Step 4: Subnet 8: Network ID 172.16.224.0/19. Usable Host Range: 172.16.224.1 to 172.16.255.254. Broadcast: 172.16.255.255.'
          ],
          formulaOrCode: 'Block_Size = 256 - 224 = 32 in third octet',
          finalAnswer: 'Mask: 255.255.224.0 (/19). 8 subnets with 8,190 usable hosts each.'
        },
        {
          questionNumber: 'Q13',
          module: 3,
          marks: 14,
          questionText: 'Explain Distance Vector Routing and the Count-to-Infinity problem with Poison Reverse solution.',
          solutionSteps: [
            'Step 1: Distance vector uses Bellman-Ford algorithm: each router shares its full routing table with direct neighbors periodically.',
            'Step 2: When link between A and B fails, B cannot reach A. B advertises inf, but neighbor C tells B it can reach A with cost 2, causing cyclic increment.',
            'Step 3: Routers increment cost step-by-step: 2, 3, 4, ... up to 16 (infinity) before recognizing link is down.',
            'Step 4: Split Horizon with Poison Reverse: If router C routes traffic to A through B, C tells B that its distance to A is infinity (16), breaking the cycle instantly.'
          ],
          formulaOrCode: 'Poison_Reverse: dist_to_A_advertised_to_B = 16',
          finalAnswer: 'Poison reverse stops 2-node routing loops immediately.'
        }
      ]
    },
    demo: {
      type: 'cidr',
      title: 'Class B Subnetting & CIDR Slicer',
      instructions: 'Partition 172.16.0.0/16 into 8 subnets and verify third-octet step calculations matching Model Paper Set 5.',
      initialState: { baseIp: '172.16.0.0', prefix: 16, targetSubnets: 8 }
    },
    answerKey: {
      schemeTitle: 'Valuation Scheme - Model Paper Set 5',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks = 70 Marks',
      rubrics: [
        {
          question: 'Q12 (Class B Subnetting)',
          marksAllocated: 14,
          criteria: [
            '3 marks for borrowing 3 bits and /19 mask (255.255.224.0)',
            '5 marks for Subnet 1 network, broadcast, and range',
            '6 marks for Subnet 8 calculation'
          ]
        },
        {
          question: 'Q13 (Count-to-Infinity & Poison Reverse)',
          marksAllocated: 14,
          criteria: [
            '4 marks for Bellman-Ford distance vector exchange mechanism',
            '5 marks for Count-to-Infinity failure mode illustration',
            '5 marks for Poison Reverse heuristic solution'
          ]
        }
      ],
      examinerChecklist: [
        'Check that block size is applied to the 3rd octet.',
        'Verify Split Horizon with Poison Reverse route metric 16 is explicitly mentioned.'
      ]
    }
  },

  'qp-second-series': {
    paperId: 'qp-second-series',
    title: 'Computer Networks Second Series Internal Question Bank',
    examMonthYear: 'Series II',
    scheme: 'KTU 2019',
    solution: {
      overview: 'Internal assessment examination bank covering Transport and Network layer topics: TCP connection lifecycle, CIDR, and socket APIs.',
      partA: [
        {
          questionNumber: 'Q1',
          module: 3,
          marks: 3,
          questionText: 'What is the format of an IPv4 address? How does subnetting work?',
          solutionText: 'An IPv4 address is 32 bits long, divided into network and host portions. Subnetting borrows bits from the host portion to create internal hierarchical subdivisions.',
          keywords: ['32 bits', 'Network ID', 'Host ID borrowing']
        },
        {
          questionNumber: 'Q2',
          module: 4,
          marks: 3,
          questionText: 'State the difference between TCP and UDP headers.',
          solutionText: 'TCP header is minimum 20 bytes with sequence numbers, ACK numbers, flags, and window size. UDP header is 8 bytes containing only Source Port, Dest Port, Length, and Checksum.',
          keywords: ['20 bytes vs 8 bytes', 'Reliability fields']
        },
        {
          questionNumber: 'Q3',
          module: 4,
          marks: 3,
          questionText: 'What is the role of TCP SYN flood attack? How do SYN Cookies protect against it?',
          solutionText: 'Attacker sends floods of SYN packets without completing the 3rd ACK, exhausting server half-open connection tables. SYN Cookies encode connection state into the initial sequence number, storing zero server memory until client completes handshake.',
          keywords: ['Half-open queue exhaustion', 'SYN cookies in ISN']
        },
        {
          questionNumber: 'Q4',
          module: 3,
          marks: 3,
          questionText: 'What is OSPF Link State Advertisement (LSA)?',
          solutionText: 'Packets flooded by OSPF routers describing the state of their direct links, interfaces, and neighbor costs, allowing every router in the area to construct an identical topology graph.',
          keywords: ['Link state flooding', 'Area topology graph']
        },
        {
          questionNumber: 'Q5',
          module: 5,
          marks: 3,
          questionText: 'Explain the function of accept() system call in TCP server programming.',
          solutionText: 'Blocks until a client connection arrives in the listen queue, extracts the connection, and creates a new connected socket descriptor dedicated to communication with that client.',
          keywords: ['Blocks on listen queue', 'New connected socket descriptor']
        }
      ],
      partB: [
        {
          questionNumber: 'Q6',
          module: 3,
          marks: 14,
          questionText: 'Perform VLSM subnetting on 192.168.1.0/24 for three subnets requiring 100, 50, and 25 hosts.',
          solutionSteps: [
            'Step 1: Subnet 1 (100 hosts): Needs 2^7 - 2 = 126 hosts. Prefix: /25. Mask: 255.255.255.128. Range: 192.168.1.1 - 192.168.1.126. Broadcast: 192.168.1.127.',
            'Step 2: Subnet 2 (50 hosts): Needs 2^6 - 2 = 62 hosts. Prefix: /26. Mask: 255.255.255.192. Range: 192.168.1.129 - 192.168.1.190. Broadcast: 192.168.1.191.',
            'Step 3: Subnet 3 (25 hosts): Needs 2^5 - 2 = 30 hosts. Prefix: /27. Mask: 255.255.255.224. Range: 192.168.1.193 - 192.168.1.222. Broadcast: 192.168.1.223.'
          ],
          formulaOrCode: 'Prefix = 32 - ceil(log2(H + 2))',
          finalAnswer: 'All 3 subnets allocated sequentially with zero address waste.'
        },
        {
          questionNumber: 'Q7',
          module: 4,
          marks: 14,
          questionText: 'Describe TCP 3-Way Handshake connection establishment and 4-way teardown with packet timing diagrams.',
          solutionSteps: [
            'Step 1: Establishment: Client sends SYN(seq=x). Server replies SYN(seq=y)+ACK(ack=x+1). Client sends ACK(seq=x+1, ack=y+1). Both enter ESTABLISHED.',
            'Step 2: Active Close: Client sends FIN(seq=u). Server sends ACK(ack=u+1). Client enters FIN_WAIT_2.',
            'Step 3: Passive Close: Server sends FIN(seq=w). Client sends ACK(ack=w+1).',
            'Step 4: Client enters TIME_WAIT (2*MSL) to ensure final ACK delivery before closing socket.'
          ],
          formulaOrCode: 'SYN -> SYN-ACK -> ACK  and  FIN -> ACK -> FIN -> ACK',
          finalAnswer: 'Standard RFC 793 reliable full-duplex session management.'
        }
      ]
    },
    demo: {
      type: 'cidr',
      title: 'VLSM Slicer & Subnet Range Visualizer',
      instructions: 'Input host constraints (100, 50, 25) to generate variable-length subnet masks matching Series II Question 6.',
      initialState: { baseIp: '192.168.1.0', prefix: 24 }
    },
    answerKey: {
      schemeTitle: 'Valuation Scheme - Series Exam II',
      totalMarks: 100,
      partAMarksDistribution: '10 Questions × 3 Marks = 30 Marks',
      partBMarksDistribution: '5 Modules × 14 Marks = 70 Marks',
      rubrics: [
        {
          question: 'Q6 (VLSM Calculation)',
          marksAllocated: 14,
          criteria: [
            '5 marks for Subnet 1 (/25 mask and range)',
            '5 marks for Subnet 2 (/26 mask and range)',
            '4 marks for Subnet 3 (/27 mask and range)'
          ]
        },
        {
          question: 'Q7 (TCP Handshake and Teardown)',
          marksAllocated: 14,
          criteria: [
            '6 marks for 3-way handshake packet sequence and state flags',
            '8 marks for 4-way teardown timing diagram and TIME_WAIT justification'
          ]
        }
      ],
      examinerChecklist: [
        'Confirm that sequence and acknowledgment numbers increment correctly by 1.',
        'Verify TIME_WAIT state duration justification (2*MSL) is explicitly provided.'
      ]
    }
  }
};
