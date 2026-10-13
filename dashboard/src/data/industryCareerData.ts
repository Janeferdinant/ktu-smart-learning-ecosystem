export interface IndustryTool {
  id: string;
  name: string;
  category: string;
  subjectCode: string;
  description: string;
  enterpriseUsers: string[];
  docUrl: string;
}

export interface CareerRole {
  id: string;
  title: string;
  subjectCode: string;
  industryDomain: string;
  salaryRangeINR: string;
  salaryRangeUSD: string;
  salarySource: string;
  experienceLevel: 'Entry Level (0-2 yrs)' | 'Mid Level (3-6 yrs)' | 'Lead / Architect (7+ yrs)';
  keySkills: string[];
  skillsGapChecklist: string[];
  topEmployers: string[];
}

export interface StudentProjectIdea {
  id: string;
  title: string;
  subjectCode: string;
  complexity: 'Intermediate' | 'Advanced' | 'Capstone';
  description: string;
  techStack: string[];
  ktuModuleAlignment: string;
}

export const INDUSTRY_TOOLS: IndustryTool[] = [
  {
    id: 'tool-aws-vpc',
    name: 'AWS Virtual Private Cloud (VPC) & Direct Connect',
    category: 'Cloud Networking',
    subjectCode: 'CST303',
    description: 'Isolated virtual networks in AWS clouds, implementing subnets, route tables, internet gateways, and BGP Direct Connect peering.',
    enterpriseUsers: ['Netflix', 'Amazon', 'Airbnb', 'Reddit'],
    docUrl: 'https://docs.aws.amazon.com/vpc/'
  },
  {
    id: 'tool-wireshark',
    name: 'Wireshark Packet Analyzer',
    category: 'Network Forensics',
    subjectCode: 'CST303',
    description: 'Gold-standard open-source packet inspection tool analyzing TCP handshakes, TLS renegotiation, DNS queries, and flow control windows.',
    enterpriseUsers: ['Cisco', 'Google', 'Palo Alto Networks'],
    docUrl: 'https://www.wireshark.org/'
  },
  {
    id: 'tool-spring-boot',
    name: 'Spring Boot & Spring Data JPA',
    category: 'Enterprise Java',
    subjectCode: 'CST205',
    description: 'Enterprise framework implementing IoC, RESTful services, HikariCP JDBC connection pooling, and Hibernate ORM persistence.',
    enterpriseUsers: ['JPMorgan Chase', 'Uber', 'LinkedIn', 'Target'],
    docUrl: 'https://spring.io/projects/spring-boot'
  },
  {
    id: 'tool-ros2',
    name: 'Robot Operating System 2 (ROS 2 Humble / Iron)',
    category: 'Autonomous Robotics',
    subjectCode: 'PCADT502',
    description: 'DDS-based distributed middleware for multi-robot communications, sensor publisher-subscriber nodes, and SLAM navigation pipelines.',
    enterpriseUsers: ['Boston Dynamics', 'iRobot', 'Toyota Research Institute'],
    docUrl: 'https://docs.ros.org/'
  }
];

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'role-cloud-network-eng',
    title: 'Cloud Network & Infrastructure Architect',
    subjectCode: 'CST303',
    industryDomain: 'Cloud Computing & Telecom',
    salaryRangeINR: '16.0 - 32.0 LPA',
    salaryRangeUSD: '$135,000 - $210,000 / year',
    salarySource: 'Levels.fyi & AmbitionBox Tech Report 2026',
    experienceLevel: 'Mid Level (3-6 yrs)',
    keySkills: ['IPv4/IPv6 CIDR Subnetting', 'BGP Peering', 'AWS VPC / Azure VNet', 'OSPF/IS-IS Routing', 'Terraform'],
    skillsGapChecklist: [
      'Master TCP/IP 3-way handshake and packet capture debugging with Wireshark',
      'Understand enterprise BGP autonomous system routing beyond local subnets',
      'Learn Infrastructure-as-Code (Terraform) for provisioning virtual cloud routers'
    ],
    topEmployers: ['Cisco Systems', 'Amazon Web Services', 'Arista Networks', 'Google Cloud', 'TCS']
  },
  {
    id: 'role-backend-java-architect',
    title: 'Senior Java Backend Engineer / Microservices Architect',
    subjectCode: 'CST205',
    industryDomain: 'Fintech & Enterprise Software',
    salaryRangeINR: '14.0 - 28.0 LPA',
    salaryRangeUSD: '$120,000 - $185,000 / year',
    salarySource: 'Glassdoor India & Levels.fyi Benchmark',
    experienceLevel: 'Mid Level (3-6 yrs)',
    keySkills: ['Core Java (JVM Memory, Concurrency)', 'Spring Boot', 'JDBC & SQL Optimization', 'Kafka', 'Docker'],
    skillsGapChecklist: [
      'Transition from basic console Java to Maven/Gradle dependency management',
      'Master thread synchronization and concurrent data structures beyond single-threaded apps',
      'Learn connection pooling and parameterized query optimization in production databases'
    ],
    topEmployers: ['Oracle', 'Goldman Sachs', 'SAP', 'Infosys', 'Walmart Global Tech']
  },
  {
    id: 'role-robotics-perception',
    title: 'Autonomous Mobile Robotics (AMR) Perception Engineer',
    subjectCode: 'PCADT502',
    industryDomain: 'Robotics & Autonomous Systems',
    salaryRangeINR: '15.0 - 30.0 LPA',
    salaryRangeUSD: '$130,000 - $190,000 / year',
    salarySource: 'AmbitionBox Engineering Salary Index',
    experienceLevel: 'Mid Level (3-6 yrs)',
    keySkills: ['Spatial Kinematics (DH Parameters)', 'ROS 2', 'LiDAR Point Cloud Processing', 'OpenCV', 'C++ / Python'],
    skillsGapChecklist: [
      'Understand coordinate transformations and rotation matrices for multi-joint arms',
      'Implement sensor fusion using Extended Kalman Filter algorithms on real microcontrollers',
      'Gain practical experience with ROS 2 node architecture and Gazebo simulation'
    ],
    topEmployers: ['Addverb Technologies', 'GreyOrange', 'Tesla', 'KUKA Robotics']
  }
];

export const STUDENT_PROJECT_IDEAS: StudentProjectIdea[] = [
  {
    id: 'proj-1',
    title: 'Distributed Peer-to-Peer Encrypted File Sharing System',
    subjectCode: 'CST303',
    complexity: 'Capstone',
    description: 'Build a decentralized file distribution application using BSD TCP sockets, chunk hashing, concurrent socket pooling, and flow control.',
    techStack: ['Java Sockets', 'SHA-256', 'Multi-threaded Concurrency', 'Swing/JavaFX GUI'],
    ktuModuleAlignment: 'CST303 Modules 4 & 5 (TCP Protocol, Socket Programming)'
  },
  {
    id: 'proj-2',
    title: 'Enterprise Student Management System with JDBC Connection Pooling',
    subjectCode: 'CST205',
    complexity: 'Intermediate',
    description: 'Implement a desktop/backend CRUD application following MVC architecture with JDBC PreparedStatement security, custom exception recovery, and report exports.',
    techStack: ['Java Swing MVC', 'JDBC Driver', 'PostgreSQL / MySQL', 'Design Patterns'],
    ktuModuleAlignment: 'CST205 Modules 3, 4, 5 (Exceptions, Swing GUI, JDBC)'
  },
  {
    id: 'proj-3',
    title: 'Autonomous Maze Solving Mobile Robot with Obstacle Avoidance',
    subjectCode: 'PCADT502',
    complexity: 'Capstone',
    description: 'Develop a differential drive robotic platform using ultrasonic and LiDAR sensor feedback with real-time shortest path Dijkstra / A* route planning.',
    techStack: ['STM32 ARM Cortex-M', 'C / C++', 'Sensors', 'Kinematics Algorithms'],
    ktuModuleAlignment: 'PCADT502 Modules 1 & 4 (Kinematics, Trajectory Generation)'
  }
];
