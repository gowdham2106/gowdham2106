import React, { useState } from 'react';
import { 
  User, 
  Cpu, 
  FolderKanban, 
  GitBranch, 
  Radio, 
  Send, 
  ExternalLink, 
  Github, 
  Mail, 
  CheckCircle2, 
  Flame, 
  BookOpen, 
  Terminal,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { DEVELOPER_PROFILE, TECH_ARSENAL, PROJECTS, CURRENT_MISSIONS, CONTACT_INFO } from '../../data/portfolioData';
import { FALLBACK_GITHUB_DATA } from '../../data/mockGitHubData';
import { NavSection } from '../../types';
import { soundFX } from '../../audio/soundFX';

interface Fallback2DViewProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onToggle3D: () => void;
}

export const Fallback2DView: React.FC<Fallback2DViewProps> = ({
  currentSection,
  onNavigate,
  onToggle3D,
}) => {
  const [selectedTechCategory, setSelectedTechCategory] = useState<'all' | 'backend' | 'frontend' | 'database' | 'tools'>('all');

  const filteredTech = selectedTechCategory === 'all'
    ? TECH_ARSENAL
    : TECH_ARSENAL.filter(t => t.category === selectedTechCategory);

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 font-mono">
      
      {/* 2D Mode Notice Banner */}
      <div className="p-4 bg-cyber-900/90 border border-neon-cyan/40 rounded-xl cyber-cut flex flex-col sm:flex-row items-center justify-between gap-4 box-glow-cyan">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-neon-cyan/20 border border-neon-cyan text-neon-cyan">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-cyber font-bold text-slate-100 flex items-center gap-2">
              <span>ACCESSIBLE 2D HUD MODE ACTIVE</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-green-950 text-green-400 border border-green-800">
                HIGH PERFORMANCE
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-tech">
              Rendering optimized 2D interface for fast loading and reduced motion.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundFX.playClick();
            onToggle3D();
          }}
          className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-blue text-cyber-950 font-cyber font-bold text-xs uppercase tracking-wider rounded cyber-cut-sm hover:from-neon-magenta hover:to-neon-pink transition-all shrink-0 shadow-[0_0_15px_rgba(0,243,255,0.4)]"
        >
          SWITCH TO 3D WORKSTATION
        </button>
      </div>

      {/* Hero Developer Profile */}
      <section id="identity" className="p-6 sm:p-8 bg-cyber-900/70 border border-slate-800 rounded-xl cyber-cut relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/40 rounded">
              {DEVELOPER_PROFILE.designation}
            </span>
            <span className="px-2.5 py-0.5 bg-neon-magenta/15 text-neon-magenta border border-neon-magenta/40 rounded">
              {DEVELOPER_PROFILE.status}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-cyber font-black tracking-wider text-slate-100 text-glow-cyan">
            {DEVELOPER_PROFILE.name}
          </h1>
          <p className="text-lg font-tech text-neon-magenta tracking-wide">
            {DEVELOPER_PROFILE.role}
          </p>

          <p className="text-sm text-slate-300 leading-relaxed font-mono">
            {DEVELOPER_PROFILE.bio}
          </p>

          <div className="p-3.5 bg-cyber-950/80 border-l-2 border-neon-cyan rounded-r text-xs text-slate-300 italic">
            &ldquo;{DEVELOPER_PROFILE.philosophy}&rdquo;
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={CONTACT_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs flex items-center gap-2 transition-colors"
            >
              <Github className="w-4 h-4 text-neon-cyan" />
              <span>GitHub Profile</span>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-neon-pink" />
              <span>Contact Direct</span>
            </a>
          </div>
        </div>
      </section>

      {/* Tech Arsenal Section */}
      <section id="arsenal" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-neon-cyan tracking-widest block uppercase">
              MODULE // 02
            </span>
            <h2 className="text-2xl font-cyber font-bold text-slate-100">
              Technology Arsenal
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['all', 'backend', 'frontend', 'database', 'tools'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTechCategory(cat as any)}
                className={`px-3 py-1 text-xs font-tech rounded capitalize transition-all ${
                  selectedTechCategory === cat
                    ? 'bg-neon-cyan/20 border border-neon-cyan text-neon-cyan'
                    : 'bg-cyber-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className="p-4 bg-cyber-900/60 border border-slate-800 hover:border-neon-cyan/50 rounded-lg cyber-cut-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{tech.category}</span>
                  <h4 className="text-base font-cyber font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color }} />
                    {tech.name}
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-950 border border-slate-700 text-neon-cyan">
                  {tech.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 my-2.5 line-clamp-2">
                {tech.description}
              </p>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>PROFICIENCY</span>
                  <span className="text-neon-cyan font-bold">{tech.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${tech.level}%`, backgroundColor: tech.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="space-y-6">
        <div>
          <span className="text-[10px] font-mono text-neon-magenta tracking-widest block uppercase">
            MODULE // 03
          </span>
          <h2 className="text-2xl font-cyber font-bold text-slate-100">
            Project Universe
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="p-6 bg-cyber-900/80 border rounded-xl cyber-cut flex flex-col justify-between space-y-4"
              style={{ borderColor: `${proj.accentColor}55` }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-950 border text-neon-cyan" style={{ borderColor: proj.accentColor }}>
                    {proj.number}
                  </span>
                  <span className="text-[10px] font-mono text-green-400">
                    {proj.status}
                  </span>
                </div>

                <h3 className="text-2xl font-cyber font-bold text-slate-100" style={{ color: proj.accentColor }}>
                  {proj.title}
                </h3>
                <p className="text-xs font-tech text-slate-300">
                  {proj.subtitle}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {proj.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    KEY MODULES:
                  </span>
                  {proj.modules.map((mod, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-cyber-950 border border-slate-800 rounded text-[11px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-neon-cyan/15 hover:bg-neon-cyan hover:text-cyber-950 text-neon-cyan border border-neon-cyan font-cyber font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>ACCESS GITHUB REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub Intelligence Telemetry */}
      <section id="github" className="p-6 bg-cyber-900/70 border border-slate-800 rounded-xl cyber-cut space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-neon-cyan tracking-widest block uppercase">
              MODULE // 04
            </span>
            <h2 className="text-2xl font-cyber font-bold text-slate-100">
              GitHub Intelligence
            </h2>
          </div>
          <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neon-cyan hover:underline flex items-center gap-1"
          >
            <span>@gowdham2106</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-cyber-950 rounded border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block">REPOSITORIES</span>
            <span className="text-xl font-cyber font-bold text-neon-cyan">{FALLBACK_GITHUB_DATA.publicRepos}</span>
          </div>
          <div className="p-3 bg-cyber-950 rounded border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block">ANNUAL COMMITS</span>
            <span className="text-xl font-cyber font-bold text-neon-blue">{FALLBACK_GITHUB_DATA.totalCommitsYear}+</span>
          </div>
          <div className="p-3 bg-cyber-950 rounded border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block">CURRENT STREAK</span>
            <span className="text-xl font-cyber font-bold text-neon-magenta">{FALLBACK_GITHUB_DATA.currentStreak} Days</span>
          </div>
          <div className="p-3 bg-cyber-950 rounded border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block">LONGEST STREAK</span>
            <span className="text-xl font-cyber font-bold text-neon-purple">{FALLBACK_GITHUB_DATA.longestStreak} Days</span>
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section id="missions" className="space-y-4">
        <div>
          <span className="text-[10px] font-mono text-neon-magenta tracking-widest block uppercase">
            MODULE // 05
          </span>
          <h2 className="text-2xl font-cyber font-bold text-slate-100">
            Current Operations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRENT_MISSIONS.map((m) => (
            <div key={m.id} className="p-4 bg-cyber-900/60 border border-slate-800 rounded-lg cyber-cut-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neon-cyan font-bold">{m.code}: {m.title}</span>
                <span className="text-slate-400">{m.progress}%</span>
              </div>
              <p className="text-xs text-slate-400">
                {m.description}
              </p>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-neon-cyan" style={{ width: `${m.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="p-6 bg-cyber-900/80 border border-neon-cyan/40 rounded-xl cyber-cut space-y-4">
        <span className="text-[10px] font-mono text-neon-cyan tracking-widest block uppercase">
          MODULE // 06
        </span>
        <h2 className="text-2xl font-cyber font-bold text-slate-100">
          Establish Connection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="p-4 bg-cyber-950 rounded border border-slate-800 hover:border-neon-cyan transition-colors block text-center space-y-1"
          >
            <Mail className="w-5 h-5 text-neon-cyan mx-auto mb-2" />
            <span className="text-xs font-bold text-slate-200 block">Direct Email</span>
            <span className="text-[11px] text-slate-400 break-all">{CONTACT_INFO.email}</span>
          </a>

          <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-cyber-950 rounded border border-slate-800 hover:border-neon-cyan transition-colors block text-center space-y-1"
          >
            <Github className="w-5 h-5 text-neon-blue mx-auto mb-2" />
            <span className="text-xs font-bold text-slate-200 block">GitHub</span>
            <span className="text-[11px] text-slate-400">@gowdham2106</span>
          </a>

          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-cyber-950 rounded border border-slate-800 hover:border-neon-cyan transition-colors block text-center space-y-1"
          >
            <User className="w-5 h-5 text-neon-purple mx-auto mb-2" />
            <span className="text-xs font-bold text-slate-200 block">LinkedIn</span>
            <span className="text-[11px] text-slate-400">Gowdham Gokul</span>
          </a>
        </div>
      </section>

    </div>
  );
};

