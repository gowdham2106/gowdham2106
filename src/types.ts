export type NavSection = 
  | 'workstation' 
  | 'profile' 
  | 'arsenal' 
  | 'projects' 
  | 'github' 
  | 'missions' 
  | 'contact';

export interface TechSkill {
  name: string;
  category: 'backend' | 'frontend' | 'database' | 'tools';
  level: number;
  status: string;
  description: string;
  iconName: string;
  color: string;
  meshShape: 'cube' | 'octahedron' | 'torus' | 'cylinder' | 'sphere' | 'icosahedron';
  position: [number, number, number];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  domain: string;
  type: string;
  description: string;
  backend?: string;
  frontend?: string;
  database?: string;
  techStack: string[];
  features: string[];
  modules: string[];
  githubUrl: string;
  accentColor: string;
  status: string;
  architectureNotes: string;
}

export interface MissionItem {
  id: string;
  code: string;
  title: string;
  category: string;
  progress: number;
  status: 'ACTIVE' | 'IN_PROGRESS' | 'OPTIMIZING';
  description: string;
  milestones: string[];
}

export interface GitHubStatsData {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalCommitsYear: number;
  currentStreak: number;
  longestStreak: number;
  languages: { name: string; percentage: number; color: string }[];
  recentEvents: { type: string; repo: string; date: string; message: string }[];
}

