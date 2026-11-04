import React, { useState } from 'react';
import { X, Cpu, Server, Layout, Database, Wrench, ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { TECH_ARSENAL } from '../../data/portfolioData';
import { TechSkill } from '../../types';
import { soundFX } from '../../audio/soundFX';

interface ArsenalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTech: TechSkill | null;
  onSelectTech: (tech: TechSkill | null) => void;
}

export const ArsenalDrawer: React.FC<ArsenalDrawerProps> = ({
  isOpen,
  onClose,
  selectedTech,
  onSelectTech,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'backend' | 'frontend' | 'database' | 'tools'>('all');

  if (!isOpen) return null;

  const filteredSkills = activeCategory === 'all' 
    ? TECH_ARSENAL 
    : TECH_ARSENAL.filter(s => s.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Systems', icon: Cpu },
    { id: 'backend', label: 'Backend (.NET/C#)', icon: Server },
    { id: 'frontend', label: 'Frontend (React/TS)', icon: Layout },
    { id: 'database', label: 'Databases (SQL)', icon: Database },
    { id: 'tools', label: 'DevOps & Tools', icon: Wrench },
  ];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-cyber-900/95 border border-neon-cyan/50 rounded-xl cyber-cut shadow-2xl shadow-neon-cyan/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-cyber-950/80 border-b border-neon-cyan/30">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-neon-cyan animate-pulse" />
            <div className="font-tech text-xs sm:text-sm text-slate-200 tracking-wider">
              <span className="text-neon-cyan font-bold">TECH ARSENAL</span> // SYSTEM CAPABILITIES
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

        {/* Categories Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-cyber-950 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFX.playClick();
                  setActiveCategory(cat.id as any);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech rounded-md transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-bold shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Skills Grid (2 cols on md) */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredSkills.map((skill) => {
              const isSelected = selectedTech?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    soundFX.playClick();
                    onSelectTech(skill);
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  className={`p-3.5 rounded-lg border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-neon-cyan/15 border-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.35)]'
                      : 'bg-cyber-950/70 border-slate-800 hover:border-neon-cyan/40 hover:bg-cyber-950/90'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                        {skill.category}
                      </span>
                      <h4 className="text-base font-cyber font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
                        <span 
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: skill.color }}
                        />
                        {skill.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-900 border border-slate-700 text-neon-cyan">
                      {skill.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-mono my-2 line-clamp-2">
                    {skill.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-slate-800/80">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>MASTERY INDEX</span>
                      <span className="text-neon-cyan font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                          boxShadow: `0 0 8px ${skill.color}`
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Inspector Panel (1 col) */}
          <div className="flex flex-col p-5 bg-cyber-950/80 border border-neon-cyan/30 rounded-lg cyber-cut-sm justify-between">
            {selectedTech ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-mono text-neon-cyan">
                  <ShieldCheck className="w-4 h-4 text-neon-cyan" />
                  <span>3D ARTIFACT INSPECTOR</span>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    SYSTEM // {selectedTech.category}
                  </div>
                  <h3 className="text-2xl font-cyber font-bold text-slate-100 mt-1" style={{ color: selectedTech.color }}>
                    {selectedTech.name}
                  </h3>
                  <span className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-neon-cyan/40 text-neon-cyan">
                    STATUS: {selectedTech.status}
                  </span>
                </div>

                <div className="p-3 bg-cyber-900/90 rounded border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
                  {selectedTech.description}
                </div>

                <div className="space-y-2 font-mono text-xs text-slate-400">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Proficiency Score:</span>
                    <span className="text-neon-cyan font-bold">{selectedTech.level} / 100</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>3D Geometry:</span>
                    <span className="text-neon-magenta uppercase">{selectedTech.meshShape}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Workstation Orbit:</span>
                    <span className="text-slate-300">Active in 3D scene</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic font-tech">
                  * Hover over or inspect floating 3D artifacts in the main viewport for dynamic elevation & rotation.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3">
                <Cpu className="w-10 h-10 text-neon-cyan/40 animate-pulse" />
                <h4 className="text-sm font-tech text-slate-300 uppercase tracking-wider">
                  Select a Technology
                </h4>
                <p className="text-xs font-mono text-slate-500">
                  Click any skill or inspect the floating 3D holographic constellation to view runtime telemetry and usage.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 text-[10px] font-mono text-slate-500 text-center">
              SYSTEM MEMORY :: NEURAL REGISTRY 2106
            </div>
          </div>

        </div>

        {/* Footer */}
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
          <span className="text-[10px] text-slate-500 font-mono">
            ESC TO EXIT
          </span>
        </div>
      </div>
    </div>
  );
};

