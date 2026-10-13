export interface GraphNode {
  id: string;
  label: string;
  category: 'subject' | 'module' | 'concept' | 'algorithm' | 'lab' | 'paper' | 'career';
  subjectId?: string;
  moduleId?: number;
  description: string;
  prerequisites?: string[];
  careerRelevance?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  relationship: 'prerequisite' | 'implements' | 'simulates' | 'references' | 'career_role';
}

export const GRAPH_NODES: GraphNode[] = [
  // Subject Roots
  { id: 'sub-cn', label: 'CST303 Computer Networks', category: 'subject', description: 'Core communication layers, protocols & socket APIs' },
  { id: 'sub-java', label: 'CST205 Java OOP', category: 'subject', description: 'Object-oriented programming, MVC Swing & JDBC' },
  { id: 'sub-robotics', label: 'PCADT502 Robotics', category: 'subject', description: 'Spatial kinematics, actuation & SLAM perception' },

  // Computer Networks Concepts & Algorithms
  { id: 'cn-osi', label: 'OSI 7-Layer Architecture', category: 'concept', subjectId: 'cst303-computer-networks', moduleId: 1, description: 'Hierarchical encapsulation and protocol layer decoupling' },
  { id: 'cn-crc', label: 'Cyclic Redundancy Check (CRC)', category: 'algorithm', subjectId: 'cst303-computer-networks', moduleId: 2, description: 'Polynomial division error detection in Data Link frames', prerequisites: ['cn-osi'] },
  { id: 'cn-sliding-window', label: 'Sliding Window (GBN & SR)', category: 'algorithm', subjectId: 'cst303-computer-networks', moduleId: 2, description: 'Flow control and pipelined packet transmissions', prerequisites: ['cn-crc'] },
  { id: 'cn-subnetting', label: 'CIDR & IPv4 Subnetting', category: 'concept', subjectId: 'cst303-computer-networks', moduleId: 3, description: 'Classless IP address space partitioning and prefix matching', prerequisites: ['cn-osi'] },
  { id: 'cn-dijkstra', label: 'Dijkstra SPF & OSPF', category: 'algorithm', subjectId: 'cst303-computer-networks', moduleId: 3, description: 'Link-state shortest path tree computation', prerequisites: ['cn-subnetting'] },
  { id: 'cn-bellman-ford', label: 'Bellman-Ford & RIPv2', category: 'algorithm', subjectId: 'cst303-computer-networks', moduleId: 3, description: 'Distance vector routing and split horizon loop prevention', prerequisites: ['cn-subnetting'] },
  { id: 'cn-tcp-handshake', label: 'TCP 3-Way Handshake', category: 'concept', subjectId: 'cst303-computer-networks', moduleId: 4, description: 'Reliable connection establishment and sequence synchronization', prerequisites: ['cn-subnetting'] },
  { id: 'cn-tcp-congestion', label: 'AIMD Congestion Control', category: 'algorithm', subjectId: 'cst303-computer-networks', moduleId: 4, description: 'Additive Increase Multiplicative Decrease & Fast Recovery', prerequisites: ['cn-tcp-handshake'] },
  { id: 'cn-socket-api', label: 'BSD Socket Programming', category: 'lab', subjectId: 'cst303-computer-networks', moduleId: 5, description: 'Client-server TCP/UDP communication endpoints in Java/C', prerequisites: ['cn-tcp-handshake', 'java-threading'] },

  // Java OOP Concepts
  { id: 'java-jvm', label: 'JVM Architecture & Memory', category: 'concept', subjectId: 'cst205-object-oriented-programming', moduleId: 1, description: 'Classloader subsystem, Heap, Method Area & GC' },
  { id: 'java-polymorphism', label: 'Dynamic Method Dispatch', category: 'concept', subjectId: 'cst205-object-oriented-programming', moduleId: 2, description: 'Runtime polymorphism and virtual method invocation', prerequisites: ['java-jvm'] },
  { id: 'java-exceptions', label: 'Exception Handling Hierarchy', category: 'concept', subjectId: 'cst205-object-oriented-programming', moduleId: 3, description: 'Checked vs Unchecked throwable handling and resource recovery', prerequisites: ['java-polymorphism'] },
  { id: 'java-swing-mvc', label: 'Java Swing MVC Architecture', category: 'concept', subjectId: 'cst205-object-oriented-programming', moduleId: 4, description: 'Delegation Event Model and graphical layout managers', prerequisites: ['java-polymorphism'] },
  { id: 'java-jdbc', label: 'JDBC Database Connectivity', category: 'concept', subjectId: 'cst205-object-oriented-programming', moduleId: 5, description: 'Connection pooling, PreparedStatements and SQL query processing', prerequisites: ['java-exceptions'] },
  { id: 'java-threading', label: 'Multithreading & Concurrency', category: 'concept', subjectId: 'cst205-object-oriented-programming', moduleId: 3, description: 'Thread lifecycle, synchronization monitors and race prevention' },

  // Career Roles
  { id: 'career-network-architect', label: 'Cloud Network Architect', category: 'career', description: 'Enterprise routing, VPC configuration, and BGP peering infrastructure', careerRelevance: 'CST303 Modules 1, 3, 4' },
  { id: 'career-backend-dev', label: 'Senior Java Backend Engineer', category: 'career', description: 'High-throughput microservices, Spring Boot, and JDBC/JPA systems', careerRelevance: 'CST205 Modules 2, 4, 5' },
  { id: 'career-robotics-eng', label: 'Robotics Perception Engineer', category: 'career', description: 'Autonomous vehicle navigation, ROS pipelines, and SLAM', careerRelevance: 'PCADT502 Modules 1, 3, 5' }
];

export const GRAPH_EDGES: GraphEdge[] = [
  // Subject Connections
  { source: 'sub-cn', target: 'cn-osi', relationship: 'implements' },
  { source: 'cn-osi', target: 'cn-crc', relationship: 'prerequisite' },
  { source: 'cn-crc', target: 'cn-sliding-window', relationship: 'prerequisite' },
  { source: 'cn-osi', target: 'cn-subnetting', relationship: 'prerequisite' },
  { source: 'cn-subnetting', target: 'cn-dijkstra', relationship: 'prerequisite' },
  { source: 'cn-subnetting', target: 'cn-bellman-ford', relationship: 'prerequisite' },
  { source: 'cn-subnetting', target: 'cn-tcp-handshake', relationship: 'prerequisite' },
  { source: 'cn-tcp-handshake', target: 'cn-tcp-congestion', relationship: 'prerequisite' },
  { source: 'cn-tcp-handshake', target: 'cn-socket-api', relationship: 'simulates' },

  { source: 'sub-java', target: 'java-jvm', relationship: 'implements' },
  { source: 'java-jvm', target: 'java-polymorphism', relationship: 'prerequisite' },
  { source: 'java-polymorphism', target: 'java-exceptions', relationship: 'prerequisite' },
  { source: 'java-polymorphism', target: 'java-swing-mvc', relationship: 'prerequisite' },
  { source: 'java-exceptions', target: 'java-jdbc', relationship: 'prerequisite' },
  { source: 'java-jvm', target: 'java-threading', relationship: 'prerequisite' },
  { source: 'java-threading', target: 'cn-socket-api', relationship: 'prerequisite' },

  // Careers
  { source: 'cn-dijkstra', target: 'career-network-architect', relationship: 'career_role' },
  { source: 'cn-tcp-congestion', target: 'career-network-architect', relationship: 'career_role' },
  { source: 'java-jdbc', target: 'career-backend-dev', relationship: 'career_role' },
  { source: 'java-swing-mvc', target: 'career-backend-dev', relationship: 'career_role' },
  { source: 'sub-robotics', target: 'career-robotics-eng', relationship: 'career_role' }
];
