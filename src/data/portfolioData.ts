export interface ProjectCertificate {
  title: string;
  issuer: string;
  program: string;
  period: string;
  issuedDate: string;
  certificateId: string;
  pdfUrl: string;
  previewImage: string;
}

export interface SimpleProject {
  id: string;
  title: string;
  category: 'UI/UX Design' | 'Web Development' | 'Python & C++' | 'Finance & AI';
  label: string;
  summary: string;
  details: string;
  tech: string[];
  image: string;
  isSample: boolean;
  certificate?: ProjectCertificate;
}

export interface SkillGroup {
  group: string;
  skills: string[];
}

export interface EducationStage {
  id: string;
  level: string;
  stream: string;
  status: string;
  summary: string;
  subjects: string[];
  isCurrent?: boolean;
  certificate?: ProjectCertificate;
}

export interface SocialLink {
  id: 'github' | 'linkedin';
  label: string;
  href: string;
  handle: string;
}

export const PROFILE_IMAGE = '/assets/aistudio/photo_4f85c345.jpeg';

export const CONTACT_EMAIL = 'gauriyete@gmail.com';

export const NASSCOM_CERTIFICATE: ProjectCertificate = {
  title: 'AI Specialist - BFSI Virtual Internship Certificate',
  issuer: 'nasscom FutureSkills Prime & SmartBridge',
  program: 'Virtual Internship Program · AI Specialist - BFSI',
  period: 'August 24, 2026 – September 26, 2026',
  issuedDate: 'November 18, 2026',
  certificateId: 'VIP-BFSI-2026-0266',
  pdfUrl: '/assets/aistudio/certificate_nasscom_50a03ee5.pdf',
  previewImage: '/assets/aistudio/certificate_nasscom_preview.jpg',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com',
    handle: 'github.com',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    handle: 'linkedin.com',
  },
];

export const EDUCATION_STREAM: EducationStage[] = [
  {
    id: 'btech-ce',
    level: 'Bachelor of Technology (B.Tech)',
    stream: 'Computer Engineering',
    status: 'Current Stream',
    summary:
      'Focusing on software engineering foundations, algorithmic problem solving, structured programming, and human-centered UI/UX design.',
    subjects: ['Data Structures', 'C & C++', 'Python', 'Web Development', 'UI/UX Design'],
    isCurrent: true,
  },
  {
    id: 'nasscom-ai-bfsi',
    level: 'nasscom FutureSkills Prime · SmartBridge',
    stream: 'Virtual Internship — AI Specialist (BFSI)',
    status: 'Verified Certificate',
    summary:
      'Completed industry-integrated virtual internship training with hands-on exposure to AI in Financial Services, Risk & Fraud Detection, Data Analytics for BFSI, and Insurance Workflows.',
    subjects: [
      'AI in Financial Services',
      'Risk & Fraud Detection',
      'Data Analytics for BFSI',
      'Insurance Workflows',
    ],
    certificate: NASSCOM_CERTIFICATE,
  },
  {
    id: 'hsc-science',
    level: 'Higher Secondary (Class XII)',
    stream: 'Science & Mathematics',
    status: 'Completed Stream',
    summary:
      'Built analytical and quantitative reasoning skills in mathematics and science ahead of undergraduate computer engineering studies.',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Logical Reasoning'],
  },
  {
    id: 'ssc-foundation',
    level: 'Secondary School (Class X)',
    stream: 'General Academic Foundation',
    status: 'Foundation Stream',
    summary:
      'Developed core academic discipline and early curiosity for technology, visual design, and structured problem solving.',
    subjects: ['Mathematics', 'Science', 'Computing Basics'],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    group: 'Design',
    skills: ['UI/UX Design', 'Creative Design', 'Wireframing'],
  },
  {
    group: 'Web Development',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    group: 'Programming',
    skills: ['Python', 'C', 'C++'],
  },
  {
    group: 'Computer Science',
    skills: ['Data Structures', 'Problem Solving'],
  },
];

export const PROJECTS: SimpleProject[] = [
  {
    id: 'personal-finance-advisor-bot',
    title: 'Personal Finance Advisor Bot',
    category: 'Finance & AI',
    label: 'Finance & AI · nasscom FutureSkills Prime',
    summary:
      'An interactive AI finance assistant built around BFSI workflows to help users review monthly budgets, track spending habits, and plan savings goals through natural Q&A.',
    details:
      'Developed alongside the nasscom FutureSkills Prime & SmartBridge AI Specialist (BFSI) track. Lets users ask questions about category budgets, identify overspending patterns, and receive structured financial guidance inside a clean conversational interface.',
    tech: ['Python', 'JavaScript', 'AI in Financial Services', 'UI/UX Design'],
    image: '/src/assets/images/project_finance_bot_1795530511239.jpg',
    isSample: false,
    certificate: NASSCOM_CERTIFICATE,
  },
  {
    id: 'financial-analytics',
    title: 'Financial Analytics',
    category: 'Finance & AI',
    label: 'Finance & AI · nasscom FutureSkills Prime',
    summary:
      'A structured BFSI and personal finance analytics workspace visualizing income vs. expenses, category spending trends, risk signals, and monthly savings rates.',
    details:
      'Focuses on turning financial transaction datasets into readable visual insights — highlighting cash-flow balance, expense categories, and BFSI data analytics workflows supported by the nasscom FutureSkills Prime Virtual Internship.',
    tech: ['Python', 'Data Analytics', 'BFSI Workflows', 'JavaScript'],
    image: '/src/assets/images/project_financial_analytics_1795530511211.jpg',
    isSample: false,
    certificate: NASSCOM_CERTIFICATE,
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    category: 'Web Development',
    label: 'Sample Entry · Web Design',
    summary:
      'A clean, responsive personal website presenting my background, technical skills, and curated project work.',
    details:
      'Built to provide visitors with an uncluttered overview of my studies in Computer Engineering and my interest in UI/UX design. Focused on readable typography, fast loading, and clear mobile-to-desktop responsiveness.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    image: '/src/assets/images/project_portfolio_universe_1795528780225.jpg',
    isSample: true,
  },
  {
    id: 'uiux-collection',
    title: 'UI/UX Creative Design Collection',
    category: 'UI/UX Design',
    label: 'Sample Entry · Interface Studies',
    summary:
      'Wireframes and interface explorations focused on layout clarity, hierarchy, and intuitive user flows.',
    details:
      'A curated sample set of low-to-high fidelity interface screens exploring mobile navigation patterns, spacing grids, and accessible color contrast across everyday web and mobile concepts.',
    tech: ['UI/UX Design', 'Wireframing', 'Prototyping'],
    image: '/src/assets/images/project_uiux_collection_1795528780537.jpg',
    isSample: true,
  },
  {
    id: 'coding-tracker',
    title: 'Coding Practice Tracker',
    category: 'Web Development',
    label: 'Sample Entry · Study Tool',
    summary:
      'A straightforward tracker concept for organizing solved Data Structures problems and weekly study notes.',
    details:
      'Designed as a practical student workflow tool to categorize coding exercises by topic, record edge cases, and keep track of consistent problem-solving practice across languages.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Data Structures'],
    image: '/src/assets/images/project_coding_tracker_1795528781700.jpg',
    isSample: true,
  },
  {
    id: 'python-cpp-lab',
    title: 'Python & C++ Programming Projects',
    category: 'Python & C++',
    label: 'Sample Entry · Coursework & Logic',
    summary:
      'Console utilities and algorithmic implementations covering file handling, OOP, and core data structures.',
    details:
      'A sample collection of structured programming exercises in Python, C, and C++, demonstrating stacks, queues, linked structures, and modular command-line utilities built during B.Tech coursework.',
    tech: ['Python', 'C', 'C++', 'Data Structures'],
    image: '/src/assets/images/project_python_cpp_lab_1795528782175.jpg',
    isSample: true,
  },
];
