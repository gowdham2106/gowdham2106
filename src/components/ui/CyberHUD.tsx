import React from 'react';
import { Volume2, VolumeX, Eye, Terminal, Github, ExternalLink, Zap } from 'lucide-react';
import { soundFX } from '../../audio/soundFX';
import { NavSection } from '../../types';

interface CyberHUDProps {
  currentSection: NavSection;
  is3DMode: boolean;
  onToggle3DMode: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onNavigate: (section: NavSection) => void;
}

export const CyberHUD: React.FC<CyberHUDProps> = ({
  currentSection,
  is3DMode,
  onToggle3DMode,
  isAudioMuted,
  onToggleAudio,
  reducedMotion,
  onToggleReducedMotion,
  onNavigate,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-3 md:p-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: System Status & User Identification */}
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          <button
            onClick={() => onNavigate('workstation')}
            className="flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-cyber-900/90 border border-neon-cyan/40 hover:border-neon-cyan text-slate-200 transition-all duration-300 cyber-cut-sm group"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping absolute opacity-75"></span>
              <span className="w-2 h-2 rounded-full bg-neon-cyan"></span>
            </div>
            <div className="text-left font-tech">
              <div className="text-xs text-neon-cyan tracking-wider font-semibold group-hover:text-glow-cyan flex items-center gap-1">
                <span>GOWDHAM_GOKUL</span>
                <span className="text-[10px] text-slate-400">v2.4</span>
              </div>
              <div className="text-[10px] text-slate-400 tracking-widest hidden sm:block">
                SYS::ONLINE // NEO-KYOTO
              </div>
            </div>
          </button>

          {/* Current Section Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-cyber-900/70 border border-slate-700/60 text-xs font-tech text-slate-300 cyber-cut-sm">
            <Terminal className="w-3.5 h-3.5 text-neon-cyan" />
            <span className="text-slate-500">NODE:</span>
            <span className="text-neon-cyan font-bold uppercase tracking-wider">{currentSection}</span>
          </div>
        </div>

        {/* Center: Cyber Status Ticker (Desktop) */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-cyber-900/60 border border-neon-cyan/20 rounded-sm font-tech text-[11px] text-slate-300 pointer-events-auto">
          <Zap className="w-3.5 h-3.5 text-neon-pink animate-pulse" />
          <span className="text-slate-400">STACK:</span>
          <span className="text-neon-cyan">.NET 9</span>
          <span className="text-slate-600">|</span>
          <span className="text-neon-cyan">REACT 18</span>
          <span className="text-slate-600">|</span>
          <span className="text-neon-cyan">POSTGRESQL</span>
          <span className="text-slate-600">|</span>
          <span className="text-neon-pink">AI CLAIMSHIELD</span>
        </div>

        {/* Right: Controls & Uplinks */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          {/* GitHub Direct Link */}
          <a
            href="https://github.com/gowdham2106"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            className="p-2 sm:px-3 sm:py-1.5 bg-cyber-900/90 border border-slate-700 hover:border-neon-cyan text-slate-300 hover:text-neon-cyan transition-all cyber-cut-sm flex items-center gap-1.5 text-xs font-tech"
            title="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-cyan" />
            <span className="hidden sm:inline">gowdham2106</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          {/* 3D / 2D Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              onToggle3DMode();
            }}
            className={`px-2.5 py-1.5 text-xs font-tech cyber-cut-sm transition-all flex items-center gap-1.5 ${
              is3DMode 
                ? 'bg-neon-cyan/15 border border-neon-cyan text-neon-cyan box-glow-cyan' 
                : 'bg-cyber-900 border border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle between 3D Workstation and Fast 2D HUD"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="font-semibold">{is3DMode ? '3D' : '2D'}</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => {
              onToggleAudio();
            }}
            className={`p-2 text-xs font-tech cyber-cut-sm transition-all ${
              !isAudioMuted 
                ? 'bg-neon-pink/15 border border-neon-pink text-neon-pink' 
                : 'bg-cyber-900 border border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
            title={isAudioMuted ? "Enable Cyber Sound Synthesizer" : "Mute Sound"}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          </button>
        </div>

      </div>
    </header>
  );
};

