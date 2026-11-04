import React, { useState } from 'react';
import { 
  X, 
  FolderKanban, 
  ExternalLink, 
  Github, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  ChevronRight,
  Database,
  Server,
  Layout
} from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectItem } from '../../types';
import { soundFX } from '../../audio/soundFX';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProjectId?: string;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  isOpen,
  onClose,
  activeProjectId,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    activeProjectId || PROJECTS[0].id
  );

  if (!isOpen) return null;

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-cyber-900/95 border border-neon-cyan/50 rounded-xl cyber-cut shadow-2xl shadow-neon-cyan/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-cyber-950/80 border-b border-neon-cyan/30">
          <div className="flex items-center gap-3">
            <FolderKanban className="w-5 h-5 text-neon-cyan animate-pulse" />
            <div className="font-tech text-xs sm:text-sm text-slate-200 tracking-wider">
              <span className="text-neon-cyan font-bold">PROJECT UNIVERSE</span> // HOLOGRAPHIC ARCHIVES
            </div>
          </div>
          <button
            onClick={() => {
              soundFX.playHoloClose();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-neon-pink hover:bg-neon-pink/10 rounded transition-all"
            title="Return to Workstation [Esc]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Selector Tabs */}
        <div className="px-4 sm:px-6 py-2 bg-cyber-950 border-b border-slate-800 flex items-center gap-2">
          {PROJECTS.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedProjectId(proj.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-tech rounded-md transition-all ${
                  isSelected
                    ? 'bg-neon-cyan/20 border border-neon-cyan text-slate-100 font-bold shadow-[0_0_12px_rgba(0,243,255,0.35)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: proj.accentColor }} 
                />
                <span>{proj.title}</span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                  [{proj.domain.split('&')[0].trim()}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Project Banner */}
          <div 
            className="p-5 sm:p-6 bg-gradient-to-br from-cyber-950 via-cyber-900 to-cyber-950 border rounded-xl cyber-cut relative overflow-hidden"
            style={{ borderColor: `${currentProject.accentColor}55` }}
          >
            {/* Ambient Background Glow */}
            <div 
              className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: currentProject.accentColor }}
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-mono bg-slate-900 border text-neon-cyan rounded" style={{ borderColor: currentProject.accentColor }}>
                    {currentProject.number}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono bg-cyber-900 text-slate-300 rounded border border-slate-700">
                    {currentProject.domain}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono bg-green-950/60 text-green-400 rounded border border-green-800">
                    {currentProject.status}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-cyber font-bold text-slate-100 tracking-wide" style={{ textShadow: `0 0 15px ${currentProject.accentColor}66` }}>
                  {currentProject.title}
                </h2>
                <p className="text-sm font-tech text-slate-300">
                  {currentProject.subtitle}
                </p>
              </div>

              {/* Working GitHub Button */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="group relative inline-flex items-center gap-2 px-5 py-3 bg-neon-cyan/20 border-2 text-slate-100 font-cyber font-bold text-xs tracking-wider uppercase cyber-cut transition-all duration-300 hover:bg-neon-cyan hover:text-cyber-950"
                  style={{ borderColor: currentProject.accentColor }}
                >
                  <Github className="w-4 h-4 text-neon-cyan group-hover:text-cyber-950 transition-colors" />
                  <span>ACCESS GITHUB REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className="mt-4 text-sm font-mono text-slate-300 leading-relaxed max-w-4xl pt-3 border-t border-slate-800/80">
              {currentProject.description}
            </p>
          </div>

          {/* Architecture Breakdown & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Backend Tech */}
            <div className="p-4 bg-cyber-950/70 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2 text-xs font-tech text-neon-cyan mb-2">
                <Server className="w-4 h-4" />
                <span>BACKEND ARCHITECTURE</span>
              </div>
              <p className="text-sm font-mono text-slate-200">
                {currentProject.backend || 'Serverless BaaS with Realtime WebSockets'}
              </p>
              <div className="mt-2 text-[11px] text-slate-400 font-mono">
                {currentProject.id === 'claimshield' ? 'RESTful endpoints, JWT auth, Entity Framework Core ORM.' : 'Supabase edge workers & database triggers.'}
              </div>
            </div>

            {/* Frontend Tech */}
            <div className="p-4 bg-cyber-950/70 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2 text-xs font-tech text-neon-pink mb-2">
                <Layout className="w-4 h-4" />
                <span>FRONTEND INTERFACE</span>
              </div>
              <p className="text-sm font-mono text-slate-200">
                {currentProject.frontend || 'React + TypeScript'}
              </p>
              <div className="mt-2 text-[11px] text-slate-400 font-mono">
                Tailwind CSS, responsive dashboards, type-safe state pipelines.
              </div>
            </div>

            {/* Database Tech */}
            <div className="p-4 bg-cyber-950/70 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2 text-xs font-tech text-neon-purple mb-2">
                <Database className="w-4 h-4" />
                <span>DATA PERSISTENCE</span>
              </div>
              <p className="text-sm font-mono text-slate-200">
                {currentProject.database || 'PostgreSQL'}
              </p>
              <div className="mt-2 text-[11px] text-slate-400 font-mono">
                Relational schemas, foreign-key integrity, Row-Level Security.
              </div>
            </div>

          </div>

          {/* Features and Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Core Modules */}
            <div className="p-4 sm:p-5 bg-cyber-950/60 border border-neon-cyan/20 rounded-lg cyber-cut-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-tech text-neon-cyan">
                <Layers className="w-4 h-4" />
                <span>INTEGRATED SYSTEM MODULES</span>
              </div>
              <div className="space-y-2">
                {currentProject.modules.map((mod, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 bg-cyber-900/80 border border-slate-800 rounded font-tech text-xs text-slate-200">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-neon-cyan/15 text-neon-cyan font-mono text-[10px]">
                      0{i+1}
                    </span>
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Feature Highlights */}
            <div className="p-4 sm:p-5 bg-cyber-950/60 border border-neon-magenta/20 rounded-lg cyber-cut-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-tech text-neon-magenta">
                <Sparkles className="w-4 h-4" />
                <span>KEY CAPABILITIES & SECURITY</span>
              </div>
              <ul className="space-y-2">
                {currentProject.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-neon-magenta shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Tech Stack Badges */}
          <div className="p-4 bg-cyber-950/70 border border-slate-800 rounded-lg space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
              DEPLOYED COMPONENT TECH STACK
            </span>
            <div className="flex flex-wrap gap-2">
              {currentProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-cyber-900 border border-neon-cyan/30 rounded text-xs font-mono text-slate-200 hover:border-neon-cyan transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-cyber-950/90 border-t border-slate-800">
          <button
            onClick={() => {
              soundFX.playHoloClose();
              onClose();
            }}
            className="flex items-center gap-2 text-xs font-tech text-neon-cyan hover:text-glow-cyan"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO WORKSTATION</span>
          </button>
          
          <a
            href={currentProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            className="flex items-center gap-1.5 text-xs font-tech text-neon-pink hover:text-glow-pink"
          >
            <span>VIEW CODE ON GITHUB</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

