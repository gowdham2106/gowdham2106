import React, { useState, useEffect } from 'react';
import { X, User, Sparkles, BookOpen, Compass, ArrowLeft } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../../data/portfolioData';
import { soundFX } from '../../audio/soundFX';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'interests' | 'journey'>('about');
  const [typedHeader, setTypedHeader] = useState('');

  const fullHeader = '> ACCESSING NEURAL ARCHIVE: GOWDHAM_GOKUL.SYS... STATUS: VERIFIED';

  useEffect(() => {
    if (isOpen) {
      soundFX.playHoloOpen();
      setTypedHeader('');
      let idx = 0;
      const interval = setInterval(() => {
        if (idx <= fullHeader.length) {
          setTypedHeader(fullHeader.slice(0, idx));
          idx++;
        } else {
          clearInterval(interval);
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-4xl max-h-[88vh] flex flex-col bg-cyber-900/95 border border-neon-cyan/50 rounded-xl cyber-cut shadow-2xl shadow-neon-cyan/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-cyber-950/80 border-b border-neon-cyan/30">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-neon-cyan animate-pulse" />
            <div className="font-tech text-xs sm:text-sm text-slate-200 tracking-wider">
              <span className="text-neon-cyan font-bold">IDENTITY MATRIX</span> // GOWDHAM GOKUL
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

        {/* Animated Terminal Status Sub-bar */}
        <div className="px-4 sm:px-6 py-2 bg-cyber-950 border-b border-slate-800/80 font-mono text-[11px] text-neon-cyan flex items-center justify-between">
          <div className="truncate">
            {typedHeader}
            <span className="animate-ping">_</span>
          </div>
          <span className="hidden sm:inline text-slate-500 font-mono text-[10px]">
            [SEC::LEVEL_4]
          </span>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Identity Header Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:p-5 bg-cyber-950/70 border border-slate-800 rounded-lg cyber-cut-sm">
            <div className="md:col-span-2 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-mono bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/40 rounded">
                  {DEVELOPER_PROFILE.designation}
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-mono bg-neon-magenta/15 text-neon-magenta border border-neon-magenta/40 rounded">
                  {DEVELOPER_PROFILE.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-cyber font-bold text-slate-100 text-glow-cyan">
                {DEVELOPER_PROFILE.name}
              </h2>
              <p className="text-sm font-tech text-slate-300">
                {DEVELOPER_PROFILE.role}
              </p>
              <p className="text-xs font-mono text-neon-cyan/80 pt-1">
                &ldquo;{DEVELOPER_PROFILE.philosophy}&rdquo;
              </p>
            </div>

            <div className="flex flex-col justify-between p-3 bg-cyber-900/80 border border-neon-cyan/20 rounded font-tech text-xs space-y-2">
              <div>
                <span className="text-slate-400 block text-[10px]">CORE DIRECTIVE:</span>
                <span className="text-slate-200">{DEVELOPER_PROFILE.objective}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">SECTOR:</span>
                <span className="text-neon-cyan">{DEVELOPER_PROFILE.location}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'about', label: 'About & Philosophy', icon: User },
              { id: 'interests', label: 'Technical Interests', icon: Sparkles },
              { id: 'journey', label: 'Professional Journey', icon: Compass },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveTab(tab.id as any);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech rounded-t transition-all ${
                    isActive
                      ? 'bg-neon-cyan/15 border-b-2 border-neon-cyan text-neon-cyan font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="animate-in fade-in duration-300">
            {activeTab === 'about' && (
              <div className="space-y-4">
                <div className="p-4 bg-cyber-950/60 border border-slate-800 rounded-lg text-slate-300 text-sm leading-relaxed font-mono">
                  <p className="mb-3">{DEVELOPER_PROFILE.bio}</p>
                  <div className="p-3 bg-cyber-900/80 border-l-2 border-neon-magenta rounded-r">
                    <span className="text-neon-magenta font-bold block text-xs mb-1">DEVELOPER PHILOSOPHY:</span>
                    <span className="text-xs text-slate-300 italic">
                      &ldquo;{DEVELOPER_PROFILE.philosophy}&rdquo;
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-cyber-950/60 border border-neon-cyan/20 rounded">
                    <span className="text-xs font-tech text-neon-cyan block mb-1">ENGINEERING MINDSET</span>
                    <p className="text-xs text-slate-400 font-mono">
                      Deep commitment to clean code, testability, predictable architecture, and high UI performance.
                    </p>
                  </div>
                  <div className="p-3.5 bg-cyber-950/60 border border-neon-magenta/20 rounded">
                    <span className="text-xs font-tech text-neon-magenta block mb-1">CONTINUOUS EVOLUTION</span>
                    <p className="text-xs text-slate-400 font-mono">
                      Constantly pushing beyond the comfort zone to master enterprise backend paradigms and bleeding-edge frontend tech.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interests' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEVELOPER_PROFILE.technicalInterests.map((interest, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-3 p-3.5 bg-cyber-950/60 border border-slate-800 hover:border-neon-cyan/40 rounded-lg transition-all group"
                  >
                    <div className="p-2 bg-neon-cyan/10 border border-neon-cyan/30 rounded text-neon-cyan font-mono text-xs">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-tech text-slate-200 group-hover:text-neon-cyan transition-colors">
                        {interest}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-1">
                        Active study, implementation, and architectural design exploration.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'journey' && (
              <div className="space-y-4">
                {DEVELOPER_PROFILE.journey.map((step, i) => (
                  <div key={i} className="relative pl-6 pb-2 border-l border-neon-cyan/40 last:border-transparent">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f3ff]" />
                    <span className="text-[10px] font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded border border-neon-cyan/30">
                      {step.period}
                    </span>
                    <h4 className="text-base font-tech text-slate-200 font-bold mt-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
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
          <span className="text-[10px] text-slate-500 font-mono">
            PRESS [ESC] TO CLOSE
          </span>
        </div>
      </div>
    </div>
  );
};

