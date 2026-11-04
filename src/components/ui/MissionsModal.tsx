import React from 'react';
import { 
  X, 
  Radio, 
  Target, 
  CheckCircle2, 
  ArrowLeft, 
  Layers, 
  Activity, 
  ShieldAlert 
} from 'lucide-react';
import { CURRENT_MISSIONS } from '../../data/portfolioData';
import { soundFX } from '../../audio/soundFX';

interface MissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MissionsModal: React.FC<MissionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-cyber-900/95 border border-neon-cyan/50 rounded-xl cyber-cut shadow-2xl shadow-neon-cyan/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-cyber-950/80 border-b border-neon-cyan/30">
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-neon-pink animate-pulse" />
            <div className="font-tech text-xs sm:text-sm text-slate-200 tracking-wider">
              <span className="text-neon-pink font-bold">MISSION CONTROL</span> // CURRENT LEARNING OPERATIONS
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

        {/* Status ticker */}
        <div className="px-4 sm:px-6 py-2 bg-cyber-950 border-b border-slate-800 flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-2 text-neon-cyan">
            <Activity className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
            <span>DIRECTIVE: CONTINUOUS FULL-STACK CAPABILITY EXPANSION</span>
          </div>
          <span className="text-neon-pink font-mono text-[10px]">
            [PROGRESS: OPTIMAL]
          </span>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CURRENT_MISSIONS.map((mission) => {
              return (
                <div
                  key={mission.id}
                  className="p-4 sm:p-5 bg-cyber-950/80 border border-slate-800 hover:border-neon-cyan/40 rounded-lg cyber-cut-sm flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30">
                        {mission.code}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyber-900 text-neon-pink border border-neon-pink/30">
                        {mission.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {mission.category}
                      </span>
                      <h4 className="text-base font-cyber font-bold text-slate-100 group-hover:text-neon-cyan transition-colors mt-0.5">
                        {mission.title}
                      </h4>
                    </div>

                    <p className="text-xs font-mono text-slate-400 leading-relaxed">
                      {mission.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-mono text-slate-500 block">
                        ACTIVE MILESTONES:
                      </span>
                      {mission.milestones.map((m, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-neon-cyan shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">MASTERY LEVEL</span>
                      <span className="text-neon-cyan font-bold">{mission.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full shadow-[0_0_8px_#00f3ff]"
                        style={{ width: `${mission.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mission Control Strategy Card */}
          <div className="p-4 sm:p-5 bg-cyber-950 border border-neon-cyan/20 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan">
                <Target className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-slate-200 font-bold block">CONTINUOUS UPGRADE PROTOCOL</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  &ldquo;Progress is continuous. Upgrade in progress... Transform ideas into resilient software.&rdquo;
                </p>
              </div>
            </div>

            <div className="text-[11px] px-3 py-1.5 rounded bg-cyber-900 border border-slate-700 text-neon-pink font-mono shrink-0">
              STATUS // ACTIVE DEPLOYMENT
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
          <span className="text-[10px] text-slate-500 font-mono">
            ESC TO DISMISS
          </span>
        </div>
      </div>
    </div>
  );
};

