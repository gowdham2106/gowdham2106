import React, { useState, useEffect } from 'react';
import { 
  X, 
  GitBranch, 
  GitCommit, 
  Flame, 
  BookOpen, 
  Users, 
  ArrowLeft, 
  ExternalLink, 
  RefreshCw,
  Terminal,
  Activity
} from 'lucide-react';
import { fetchGitHubTelemetry, FALLBACK_GITHUB_DATA } from '../../data/mockGitHubData';
import { GitHubStatsData } from '../../types';
import { soundFX } from '../../audio/soundFX';

interface GitHubIntelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubIntelModal: React.FC<GitHubIntelModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<GitHubStatsData>(FALLBACK_GITHUB_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string>('JUST NOW');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchGitHubTelemetry('gowdham2106');
      setData(res);
      setLastSync(new Date().toLocaleTimeString());
    } catch {
      setData(FALLBACK_GITHUB_DATA);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      soundFX.playHoloOpen();
      loadData();
    }
  }, [isOpen]);

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
            <GitBranch className="w-5 h-5 text-neon-cyan animate-pulse" />
            <div className="font-tech text-xs sm:text-sm text-slate-200 tracking-wider">
              <span className="text-neon-cyan font-bold">GITHUB INTELLIGENCE</span> // TELEMETRY & AUDIT
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playClick();
                loadData();
              }}
              disabled={isLoading}
              className="p-1.5 text-slate-400 hover:text-neon-cyan hover:bg-neon-cyan/10 rounded transition-all"
              title="Refresh Telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-neon-cyan' : ''}`} />
            </button>
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
        </div>

        {/* Telemetry Status Bar */}
        <div className="px-4 sm:px-6 py-2 bg-cyber-950 border-b border-slate-800 flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-3 text-neon-cyan">
            <span>UPLINK: https://github.com/gowdham2106</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">SYNC: {lastSync}</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-green-950/80 text-green-400 border border-green-800 text-[10px]">
            API STATUS: 200 OK
          </span>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            
            <div className="p-4 bg-cyber-950/70 border border-slate-800 rounded-lg cyber-cut-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-mono">PUBLIC REPOSITORIES</span>
                <BookOpen className="w-4 h-4 text-neon-cyan" />
              </div>
              <div className="text-2xl sm:text-3xl font-cyber font-bold text-slate-100 text-glow-cyan">
                {data.publicRepos}
              </div>
              <span className="text-[10px] text-slate-500 font-mono">ClaimShield, Hub & more</span>
            </div>

            <div className="p-4 bg-cyber-950/70 border border-slate-800 rounded-lg cyber-cut-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-mono">ANNUAL COMMITS</span>
                <GitCommit className="w-4 h-4 text-neon-blue" />
              </div>
              <div className="text-2xl sm:text-3xl font-cyber font-bold text-slate-100">
                {data.totalCommitsYear}+
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Across all branches</span>
            </div>

            <div className="p-4 bg-cyber-950/70 border border-slate-800 rounded-lg cyber-cut-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-mono">CURRENT STREAK</span>
                <Flame className="w-4 h-4 text-neon-magenta animate-pulse" />
              </div>
              <div className="text-2xl sm:text-3xl font-cyber font-bold text-neon-magenta">
                {data.currentStreak} <span className="text-xs text-slate-400">DAYS</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Max Streak: {data.longestStreak} days</span>
            </div>

            <div className="p-4 bg-cyber-950/70 border border-slate-800 rounded-lg cyber-cut-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-mono">DEV NETWORK</span>
                <Users className="w-4 h-4 text-neon-purple" />
              </div>
              <div className="text-2xl sm:text-3xl font-cyber font-bold text-slate-100">
                {data.followers + data.following}
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{data.followers} Followers / {data.following} Following</span>
            </div>

          </div>

          {/* Languages & Activity Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Programming Languages Breakdown */}
            <div className="p-4 sm:p-5 bg-cyber-950/60 border border-neon-cyan/30 rounded-lg cyber-cut-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-tech text-neon-cyan">
                  <Activity className="w-4 h-4" />
                  <span>MOST USED LANGUAGES (CODE TELEMETRY)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">AGGREGATE</span>
              </div>

              {/* Stacked Bar */}
              <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex shadow-inner">
                {data.languages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                      boxShadow: `0 0 10px ${lang.color}`
                    }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              {/* Legend List */}
              <div className="space-y-2 pt-2">
                {data.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                      <span className="text-slate-200">{lang.name}</span>
                    </div>
                    <span className="text-slate-400 font-bold">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Contribution Matrix & Activity Stream */}
            <div className="p-4 sm:p-5 bg-cyber-950/60 border border-neon-magenta/30 rounded-lg cyber-cut-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-tech text-neon-magenta">
                  <Terminal className="w-4 h-4" />
                  <span>RECENT COMMITS & TELEMETRY STREAM</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">REALTIME AUDIT</span>
              </div>

              <div className="space-y-2.5">
                {data.recentEvents.map((evt, idx) => (
                  <div key={idx} className="p-2.5 bg-cyber-900/80 border border-slate-800 rounded font-mono text-xs hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="text-neon-cyan font-bold">{evt.repo}</span>
                      <span>{evt.date}</span>
                    </div>
                    <p className="text-slate-300 truncate">
                      &gt; {evt.message}
                    </p>
                  </div>
                ))}
              </div>

              {/* GitHub Card Link */}
              <a
                href="https://github.com/gowdham2106"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="w-full py-2.5 bg-cyber-900 border border-slate-700 hover:border-neon-cyan text-slate-200 hover:text-neon-cyan transition-all rounded text-xs font-tech flex items-center justify-center gap-2 mt-2"
              >
                <span>OPEN OFFICIAL GITHUB PROFILE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Telemetry Visual Readme Embed Badge */}
          <div className="p-4 bg-cyber-950/80 border border-slate-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-neon-cyan font-bold block">LIVE GITHUB API SYNCHRONIZED</span>
              <p className="text-slate-400 text-[11px]">
                Telemetry is retrieved directly from GitHub REST endpoints for user <code className="text-neon-magenta">gowdham2106</code>.
              </p>
            </div>
            <a
              href="https://github.com/gowdham2106?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan rounded hover:bg-neon-cyan hover:text-cyber-950 font-tech font-bold transition-all shrink-0 flex items-center gap-1.5"
            >
              <span>EXPLORE ALL REPOSITORIES</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
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

