export interface ResearchPaper {
  id: string;
  subjectId: string;
  moduleId: number;
  title: string;
  authors: string;
  year: number;
  venue: string;
  doi: string;
  doiUrl: string;
  researchProblem: string;
  methodology: string;
  keyFindings: string;
  limitations: string;
  syllabusRelevance: string;
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-cerf-kahn',
    subjectId: 'cst303-computer-networks',
    moduleId: 1,
    title: 'A Protocol for Packet Network Intercommunication',
    authors: 'Vinton G. Cerf, Robert E. Kahn',
    year: 1974,
    venue: 'IEEE Transactions on Communications, Vol. COM-22, No. 5, pp. 637-648',
    doi: '10.1109/TCOM.1974.1092259',
    doiUrl: 'https://doi.org/10.1109/TCOM.1974.1092259',
    researchProblem: 'How to reliably interconnect disparate heterogeneous packet-switching networks without requiring centralized switching control or uniform physical MTUs.',
    methodology: 'Designed the Transmission Control Program (TCP) introducing process-to-process addressing (ports), sliding window flow control, packet fragmentation, and positive acknowledgment with retransmission.',
    keyFindings: 'Demonstrated packet encapsulation over heterogeneous links, laying the foundational architecture for the modern global TCP/IP Internet.',
    limitations: 'Original specification unified transport and network layer functionality into a single monolithic protocol prior to IP/TCP formal separation in RFC 791/793.',
    syllabusRelevance: 'CST303 Module 1 (OSI vs TCP/IP Architecture) & Module 4 (TCP Handshake and Segment Framing)'
  },
  {
    id: 'paper-jacobson-congestion',
    subjectId: 'cst303-computer-networks',
    moduleId: 4,
    title: 'Congestion Avoidance and Control',
    authors: 'Van Jacobson, Michael J. Karels',
    year: 1988,
    venue: 'ACM SIGCOMM Computer Communication Review, Vol. 18, No. 4, pp. 314-329',
    doi: '10.1145/52324.52356',
    doiUrl: 'https://doi.org/10.1145/52324.52356',
    researchProblem: 'Severe Internet throughput collapse in 1986 dropping link capacity by a factor of 1000 due to unconstrained packet injection into congested queues.',
    methodology: 'Formulated packet conservation principle and developed Slow Start, Additive Increase Multiplicative Decrease (AIMD), Fast Retransmit, and round-trip time variance estimation.',
    keyFindings: 'Eliminated congestion collapse in the ARPANET/NSFNET, proving that decentralized endpoint rate adaptation stabilizes network equilibrium.',
    limitations: 'Treats all packet drops as congestion signals, causing poor throughput across high-loss wireless links (addressed in modern BBR algorithms).',
    syllabusRelevance: 'CST303 Module 4 (TCP Congestion Control Algorithms, AIMD, Slow Start, Tahoe vs Reno)'
  },
  {
    id: 'paper-java-memory-model',
    subjectId: 'cst205-object-oriented-programming',
    moduleId: 2,
    title: 'The Java Memory Model',
    authors: 'Jeremy Manson, William Pugh, Sarita V. Adve',
    year: 2005,
    venue: 'ACM SIGPLAN Notices (POPL 2005), Vol. 40, No. 1, pp. 378-391',
    doi: '10.1145/1040305.1040336',
    doiUrl: 'https://doi.org/10.1145/1040305.1040336',
    researchProblem: 'Ambiguities and security flaws in Java original memory specification that permitted out-of-order writes and broke immutable String safety.',
    methodology: 'Formalized happens-before ordering semantics, volatile variable read/write barriers, and final field freeze semantics during constructor execution.',
    keyFindings: 'Guaranteed that properly synchronized programs exhibit sequential consistency and proved that final fields remain truly immutable post-construction.',
    limitations: 'Complex causality semantics for data races require advanced formal proofs for compiler optimization safety.',
    syllabusRelevance: 'CST205 Module 2 (final Keyword, Static Fields, Constructor Lifecycle) & Module 3 (Thread Safety)'
  },
  {
    id: 'paper-thrun-mapping',
    subjectId: 'pcadt502-robotics',
    moduleId: 1,
    title: 'Robotic Mapping: A Survey',
    authors: 'Sebastian Thrun',
    year: 2002,
    venue: 'Exploring Artificial Intelligence in the New Millennium, Morgan Kaufmann / IEEE Robotics',
    doi: '10.1016/B978-155860811-5/50004-9',
    doiUrl: 'https://doi.org/10.1016/B978-155860811-5/50004-9',
    researchProblem: 'Simultaneous Localization and Mapping (SLAM) for mobile robots operating in uncertain, unstructured physical environments.',
    methodology: 'Probabilistic robotics algorithms employing Extended Kalman Filters (EKF), Expectation Maximization (EM), and particle filter occupancy grids.',
    keyFindings: 'Provided a unified mathematical taxonomy for state estimation, sensor noise integration, and real-time landmark loop closure.',
    limitations: 'Computational quadratic scaling in high-feature dense point cloud environments.',
    syllabusRelevance: 'PCADT502 Module 1 (Coordinate Frames, Workspace Models) & Module 3 (LiDAR Vision and Perception)'
  },
  {
    id: 'paper-han-fpgrowth',
    subjectId: 'cst307-data-mining',
    moduleId: 1,
    title: 'Mining Frequent Patterns without Candidate Generation: A Frequent-Pattern Tree Approach',
    authors: 'Jiawei Han, Jian Pei, Yiwen Yin',
    year: 2000,
    venue: 'ACM SIGMOD Record, Vol. 29, No. 2, pp. 1-12',
    doi: '10.1145/342009.335372',
    doiUrl: 'https://doi.org/10.1145/342009.335372',
    researchProblem: 'Bottlenecks in Apriori algorithms that required scanning large databases repeatedly and generating millions of candidate itemsets.',
    methodology: 'Developed the FP-Tree (Frequent Pattern Tree) compact data structure and divide-and-conquer conditional pattern base recursive mining.',
    keyFindings: 'Demonstrated order-of-magnitude speedups over Apriori by compressing transaction databases into a compact memory tree with only 2 database passes.',
    limitations: 'FP-tree memory footprint can exceed physical RAM when minimum support is extremely low on sparse datasets.',
    syllabusRelevance: 'KTU Extra Resource "FP GROWTH Mining.pdf" & CST307 Module 1 Data Mining'
  }
];
