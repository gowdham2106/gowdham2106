import { TechSkill, ProjectItem, MissionItem } from '../types';

export const DEVELOPER_PROFILE = {
  name: 'Gowdham Gokul',
  codeName: 'GOWDHAM_GOKUL',
  designation: 'GRADUATE TRAINEE',
  role: 'Aspiring Full-Stack Developer',
  location: 'Neo-Kyoto // Digital Space',
  status: 'ONLINE // ACTIVE TRANSMISSION',
  objective: 'Transform ideas into high-performance software and architect scalable digital experiences.',
  philosophy: 'Explore the unknown. Engineer the solution. Build something meaningful.',
  bio: `Aspiring full-stack engineer driven by crafting robust backend systems and reactive, immersive user interfaces. Focused on .NET/C# ecosystems on the server side and modern React with TypeScript on the web layer. Continuously sharpening distributed database architecture, testing methodologies, and cloud deployments.`,
  technicalInterests: [
    'ASP.NET Core Web API & Clean Architecture',
    'Modern React & High-Performance UI/3D Graphics',
    'PostgreSQL Database Optimization & Relational Modeling',
    'Microservices & Event-Driven Systems',
    'Full-Lifecycle Software Engineering & CI/CD'
  ],
  journey: [
    {
      period: '2025 - Present',
      title: 'Graduate Trainee & Full-Stack Explorer',
      description: 'Mastering enterprise C#/.NET Core development, modern React micro-frontends, relational database tuning, and production engineering practices.'
    },
    {
      period: '2024 - 2025',
      title: 'Mission Mavericks Hub & ClaimShield Lead',
      description: 'Architected motor insurance claims automation and real-time team collaboration portals leveraging TypeScript, Supabase, and ASP.NET Core.'
    },
    {
      period: 'Foundation Era',
      title: 'Core Computing & Software Principles',
      description: 'Built strong fundamentals in data structures, algorithms, object-oriented programming, and relational database management systems.'
    }
  ]
};

export const TECH_ARSENAL: TechSkill[] = [
  // Backend
  {
    name: 'C#',
    category: 'backend',
    level: 90,
    status: 'OPTIMIZED',
    description: 'Object-oriented core language powering resilient enterprise backends, LINQ queries, and high-throughput systems.',
    iconName: 'Code2',
    color: '#9333ea', // purple
    meshShape: 'cube',
    position: [-2.2, 1.4, -0.6]
  },
  {
    name: 'ASP.NET Core',
    category: 'backend',
    level: 88,
    status: 'ACTIVE_DEPLOY',
    description: 'Modern, cross-platform framework for building high-speed Web APIs, dependency injection architectures, and secure auth services.',
    iconName: 'Server',
    color: '#00f3ff', // cyan
    meshShape: 'octahedron',
    position: [-1.4, 1.9, -0.8]
  },
  {
    name: '.NET',
    category: 'backend',
    level: 85,
    status: 'SYSTEM_CORE',
    description: 'Unified ecosystem runtime, Entity Framework Core ORM, robust concurrency primitives, and asynchronous workflows.',
    iconName: 'Cpu',
    color: '#a855f7',
    meshShape: 'icosahedron',
    position: [-0.6, 2.2, -1.0]
  },
  {
    name: 'REST API',
    category: 'backend',
    level: 92,
    status: 'ESTABLISHED',
    description: 'Designing structured HTTP RESTful endpoints, OpenAPI/Swagger contracts, rate limiting, and standard response envelopes.',
    iconName: 'Network',
    color: '#0066ff',
    meshShape: 'torus',
    position: [-1.8, 0.7, -0.4]
  },

  // Frontend
  {
    name: 'React',
    category: 'frontend',
    level: 92,
    status: 'PRODUCTION',
    description: 'Component-driven reactive user interfaces, custom hooks, context state management, and virtual DOM performance tuning.',
    iconName: 'Atom',
    color: '#00f3ff',
    meshShape: 'torus',
    position: [0.6, 2.2, -1.0]
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    level: 90,
    status: 'STRICT_MODE',
    description: 'Type-safe programming preventing runtime crashes, strict interface declarations, generics, and seamless editor intellisense.',
    iconName: 'FileCode',
    color: '#3b82f6',
    meshShape: 'octahedron',
    position: [1.4, 1.9, -0.8]
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    level: 92,
    status: 'NATIVE',
    description: 'Modern ESNext syntax, asynchronous event loop, promises, DOM manipulation, and dynamic client-side scripting.',
    iconName: 'Terminal',
    color: '#eab308',
    meshShape: 'cube',
    position: [2.2, 1.4, -0.6]
  },
  {
    name: 'HTML & CSS',
    category: 'frontend',
    level: 95,
    status: 'FOUNDATION',
    description: 'Semantic markup, accessible DOM trees, responsive CSS Grid, Flexbox, Tailwind CSS utilities, and futuristic visual effects.',
    iconName: 'Layout',
    color: '#ff007f',
    meshShape: 'cylinder',
    position: [1.8, 0.7, -0.4]
  },

  // Database
  {
    name: 'PostgreSQL',
    category: 'database',
    level: 86,
    status: 'RELATIONAL_PRIME',
    description: 'Advanced open-source relational database with indexing, complex joins, JSONB queries, ACID compliance, and connection pooling.',
    iconName: 'Database',
    color: '#38bdf8',
    meshShape: 'cylinder',
    position: [-2.6, 0.1, -0.2]
  },
  {
    name: 'SQL',
    category: 'database',
    level: 88,
    status: 'QUERY_ENGINE',
    description: 'Structured queries, schema modeling, stored procedures, view generation, transaction isolation, and performance profiling.',
    iconName: 'Binary',
    color: '#60a5fa',
    meshShape: 'sphere',
    position: [-1.4, -0.2, 0.1]
  },
  {
    name: 'Supabase',
    category: 'database',
    level: 84,
    status: 'BAAS_CLOUD',
    description: 'Real-time database subscriptions, Row Level Security (RLS) policies, authentication triggers, and serverless edge storage.',
    iconName: 'Zap',
    color: '#22c55e',
    meshShape: 'icosahedron',
    position: [-0.3, -0.3, 0.3]
  },

  // Tools
  {
    name: 'Git',
    category: 'tools',
    level: 92,
    status: 'VCS_CONTROL',
    description: 'Branching strategies, commit rebasing, cherry-picking, conflict resolution, and distributed version control.',
    iconName: 'GitBranch',
    color: '#f97316',
    meshShape: 'octahedron',
    position: [0.3, -0.3, 0.3]
  },
  {
    name: 'GitHub',
    category: 'tools',
    level: 94,
    status: 'CLOUD_ORIGIN',
    description: 'Remote repository management, automated GitHub Actions CI/CD workflows, issue tracking, and collaborative pull requests.',
    iconName: 'Github',
    color: '#e2e8f0',
    meshShape: 'sphere',
    position: [1.4, -0.2, 0.1]
  },
  {
    name: 'VS Code',
    category: 'tools',
    level: 95,
    status: 'PRIMARY_COCKPIT',
    description: 'Configured workstation with high-productivity extensions, integrated debugger, terminal pipelines, and custom cyberpunk styling.',
    iconName: 'Code',
    color: '#0284c7',
    meshShape: 'cube',
    position: [2.6, 0.1, -0.2]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'claimshield',
    number: 'PROJECT // 01',
    title: 'ClaimShield',
    subtitle: 'Motor Insurance Claims Intelligence Platform',
    domain: 'Motor Insurance & FinTech',
    type: 'Full-Stack Claims Management Platform',
    description: 'An enterprise-grade motor insurance claims application engineered to automate incident reporting, streamline verification pipelines, and expedite claim payouts with real-time audit trails.',
    backend: 'ASP.NET Core (C# REST API)',
    frontend: 'React + TypeScript',
    database: 'PostgreSQL Relational DB',
    techStack: ['ASP.NET Core', 'C#', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Entity Framework Core'],
    modules: [
      'Incident & Claim Lifecycle Management',
      'Policy Validation & Coverage Checking',
      'Secure Document & Image Upload Pipeline',
      'AI-Assisted Claim Context & Damage Evaluation'
    ],
    features: [
      'Comprehensive claim filing workflow with multi-step validation and document verification.',
      'Instant policy lookup cross-referencing deductible limits and vehicle coverage tiers.',
      'Encrypted evidence upload system handling inspection photos, repair estimates, and police reports.',
      'AI-ready modular context processor preparing standardized claims summaries for fast adjuster adjudication.',
      'REST API backend implementing clean architecture, JWT auth, and transactional safety.'
    ],
    githubUrl: 'https://github.com/gowdham2106/claimshield',
    accentColor: '#00f3ff',
    status: 'SYSTEM STABLE // CODE ACCESS ACTIVE',
    architectureNotes: 'Built using decoupled Layered Architecture: Core Domain, Application Logic, Infrastructure Layer with EF Core, and React Single Page App frontend.'
  },
  {
    id: 'maverick-hub',
    number: 'PROJECT // 02',
    title: 'Mission Mavericks Hub',
    subtitle: 'Team Collaboration & Agile Project Command Portal',
    domain: 'Project Management & Team Telemetry',
    type: 'Real-Time Collaboration Portal',
    description: 'A futuristic project management and team collaboration hub built to orchestrate squad sprints, centralize technical documentation, and monitor milestone delivery in real time.',
    frontend: 'React + TypeScript',
    database: 'Supabase (PostgreSQL + RLS + Realtime)',
    techStack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion'],
    modules: [
      'Squad Command Dashboard',
      'Project Journey & Milestone Tracking',
      'Centralized Knowledge Base & Docs',
      'Live Team Collaboration Channels'
    ],
    features: [
      'Dynamic project journey tracker charting roadmap phases, delivery velocity, and blocker tickets.',
      'Interactive squad dashboard with member statuses, active assignments, and sprint countdowns.',
      'Real-time data synchronization utilizing Supabase WebSocket change subscriptions.',
      'Granular Row-Level Security (RLS) guaranteeing data privacy between distinct project teams.',
      'Markdown-powered documentation engine for technical specifications and engineering guides.'
    ],
    githubUrl: 'https://github.com/gowdham2106/maverick-hub',
    accentColor: '#ff007f',
    status: 'DEPLOYED // COLLABORATION ONLINE',
    architectureNotes: 'Reactive client-first architecture connected via Supabase client SDK with offline cache resiliency and automated security policies.'
  }
];

export const CURRENT_MISSIONS: MissionItem[] = [
  {
    id: 'm1',
    code: 'OPS-01',
    title: 'Mastering ASP.NET Core Ecosystem',
    category: 'Backend Architecture',
    progress: 88,
    status: 'ACTIVE',
    description: 'Deep diving into high-throughput asynchronous Web APIs, custom middleware pipelines, Clean Architecture patterns, and EF Core query execution plan optimization.',
    milestones: [
      'Clean Architecture & CQRS Pattern Implementation',
      'JWT Authentication & Claims-based Authorization',
      'EF Core Migration Strategy & Index Tuning'
    ]
  },
  {
    id: 'm2',
    code: 'OPS-02',
    title: 'Advancing React & TypeScript Systems',
    category: 'Frontend Engineering',
    progress: 92,
    status: 'ACTIVE',
    description: 'Honing reactive state management, custom hook composition, TypeScript advanced generics, and immersive WebGL 3D rendering with Three.js and Fiber.',
    milestones: [
      'Strict Type Safety & Generic Component Design',
      'Interactive 3D Canvas Integration',
      'Bundle Optimization & Lazy-loading Boundaries'
    ]
  },
  {
    id: 'm3',
    code: 'OPS-03',
    title: 'Exploring Scalable Database Architecture',
    category: 'Data Engineering',
    progress: 84,
    status: 'IN_PROGRESS',
    description: 'Modeling normalized relational schemas, designing partitioned PostgreSQL tables, implementing transactions, and configuring Supabase edge policies.',
    milestones: [
      'Relational Normalization & Foreign Key Integrity',
      'PostgreSQL Index Tuning (B-Tree, GIN, GiST)',
      'Supabase Row Level Security Architecture'
    ]
  },
  {
    id: 'm4',
    code: 'OPS-04',
    title: 'Software Testing & Quality Assurance',
    category: 'Reliability',
    progress: 78,
    status: 'IN_PROGRESS',
    description: 'Constructing automated unit testing suites in xUnit / Moq for .NET services and Jest / Vitest for React components to ensure zero-regression releases.',
    milestones: [
      'xUnit Unit & Integration Tests for .NET APIs',
      'Component Rendering Tests with React Testing Library',
      'API Contract Verification & Mocking Services'
    ]
  },
  {
    id: 'm5',
    code: 'OPS-05',
    title: 'Deployment & Cloud Infrastructure',
    category: 'DevOps & Cloud',
    progress: 80,
    status: 'OPTIMIZING',
    description: 'Exploring Docker containerization, containerized ASP.NET backends, automated GitHub Actions CI/CD deployment pipelines, and cloud platform hosting.',
    milestones: [
      'Multi-Stage Dockerfile Packaging',
      'Automated GitHub Actions Build & Test Workflows',
      'Cloud Deployment & Environment Secret Management'
    ]
  }
];

export const CONTACT_INFO = {
  github: 'https://github.com/gowdham2106',
  linkedin: 'https://www.linkedin.com/in/gowdham-gokul/', // standard direct link or placeholder
  email: 'gowdhamgokul2106@gmail.com',
  location: 'Tamil Nadu, India // Remote Available',
  availability: 'Open for Full-Stack Opportunities, Graduate Roles & High-Impact Projects',
  terminalGreeting: 'ESTABLISH NEURAL UPLINK WITH GOWDHAM GOKUL'
};
