import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldCheck, Cpu, Play, ChevronRight, Zap } from 'lucide-react';
import { soundFX } from '../../audio/soundFX';

interface BootLoaderProps {
  onComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [bootPhase, setBootPhase] = useState<'diagnostics' | 'welcome' | 'ready'>('diagnostics');
  const [logIndex, setLogIndex] = useState(0);
  const enterButtonRef = useRef<HTMLButtonElement>(null);

  const diagnosticLogs = [
    'SYS_KERNEL_INIT: Mounting Neo-Kyoto neural core...',
    'NET_SOCKET: Establishing encrypted WebSocket handshake...',
    'SHADERS_COMPILE: Building 3D procedural workstation buffers...',
    'ASSETS_LOAD: Initializing C# / .NET / React Holographic modules...',
    'TELEMETRY: Verifying GitHub & Claims database status [OK]...',
    'ALL_SYSTEMS_ONLINE: Neural pipeline calibrated.'
  ];

  const handleEnter = () => {
    try {
      soundFX.playClick();
    } catch {}
    onComplete();
  };

  // Keyboard navigation: Enter or Space will instantly enter!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Snappy progress loader (approx 1.2s total)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBootPhase('welcome');
          return 100;
        }
        const jump = Math.floor(Math.random() * 15) + 8;
        const next = Math.min(prev + jump, 100);
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) {
      const idx = Math.min(
        Math.floor((progress / 100) * diagnosticLogs.length),
        diagnosticLogs.length - 1
      );
      setLogIndex(idx);
    } else {
      setLogIndex(diagnosticLogs.length - 1);
    }
  }, [progress, diagnosticLogs.length]);

  // Phase transition to 'ready' after welcome reveals
  useEffect(() => {
    if (bootPhase === 'welcome') {
      try {
        soundFX.playBoot();
      } catch {}
      const timer = setTimeout(() => {
        setBootPhase('ready');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [bootPhase]);

  // Auto-focus button when ready
  useEffect(() => {
    if (bootPhase === 'ready' && enterButtonRef.current) {
      enterButtonRef.current.focus();
    }
  }, [bootPhase]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-950 p-4 select-none pointer-events-auto">
      
      {/* Background CRT scanlines - separated with pointer-events-none so it NEVER blocks clicks */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-40 z-0" />
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none z-0" />

      {/* Cyber Corner Decors */}
      <div className="absolute top-6 left-6 text-neon-cyan/50 font-mono text-xs hidden sm:block pointer-events-none">
        [SYS::LOC::35.6762° N, 139.6503° E]
      </div>
      
      {/* Skip Button in Corner */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleEnter}
          className="px-3 py-1.5 bg-cyber-900/80 hover:bg-neon-cyan/20 border border-slate-700 hover:border-neon-cyan text-slate-400 hover:text-neon-cyan text-xs font-mono rounded transition-all cursor-pointer flex items-center gap-1"
        >
          <span>FAST ENTER</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Terminal Card */}
      <div className="relative z-10 w-full max-w-xl p-6 sm:p-8 bg-cyber-900/95 border border-neon-cyan/60 rounded-xl cyber-cut shadow-2xl shadow-neon-cyan/20 pointer-events-auto">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neon-cyan/30 mb-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-neon-cyan animate-pulse" />
            <span className="font-tech text-xs sm:text-sm tracking-widest text-slate-200">
              NEURAL_TERMINAL // BOOT_SEQUENCE
            </span>
          </div>
          <span className="font-mono text-xs text-neon-cyan font-bold">
            {progress}%
          </span>
        </div>

        {/* Diagnostic Logs during boot */}
        {bootPhase === 'diagnostics' && (
          <div className="space-y-4 mb-6">
            <div className="h-28 overflow-hidden font-mono text-xs text-slate-300 bg-cyber-950/90 p-3 rounded border border-slate-800">
              {diagnosticLogs.slice(0, logIndex + 1).map((log, i) => (
                <div key={i} className="flex items-start gap-2 py-0.5 text-slate-300">
                  <span className="text-neon-cyan font-bold">&gt;</span>
                  <span className={i === logIndex ? 'text-neon-cyan' : 'text-slate-400'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-tech text-slate-400">
                <span>BUFFERING 3D SHADERS & MODELS</span>
                <span>{progress} / 100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-magenta transition-all duration-150 shadow-[0_0_12px_#00f3ff]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Quick Skip Prompt */}
            <div className="text-center pt-2">
              <button
                onClick={handleEnter}
                className="text-[11px] font-tech text-slate-400 hover:text-neon-cyan underline transition-colors cursor-pointer"
              >
                Press Enter or click here to skip straight to workstation &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Revealed Identity & Welcome Screen */}
        {(bootPhase === 'welcome' || bootPhase === 'ready') && (
          <div className="text-center py-3 space-y-5 animate-in fade-in duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-cyan/15 border border-neon-cyan/50 rounded-full text-neon-cyan text-xs font-tech">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NEURAL LINK ESTABLISHED</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-neon-cyan font-tech tracking-widest uppercase">
                &ldquo;Welcome to my digital universe.&rdquo;
              </p>
              <p className="text-[11px] text-slate-400 font-tech">
                Initializing developer profile...
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <h1 className="text-3xl sm:text-4xl font-extrabold font-cyber tracking-wider text-slate-100 text-glow-cyan">
                GOWDHAM GOKUL
              </h1>
              <p className="text-xs sm:text-sm font-tech tracking-widest text-neon-magenta mt-1 uppercase font-semibold">
                GRADUATE TRAINEE // FULL-STACK DEVELOPER
              </p>
            </div>

            <div className="pt-3">
              <button
                ref={enterButtonRef}
                type="button"
                onClick={handleEnter}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-magenta hover:to-neon-pink text-cyber-950 font-cyber font-bold text-sm tracking-widest uppercase cyber-cut shadow-[0_0_25px_rgba(0,243,255,0.7)] hover:shadow-[0_0_35px_rgba(255,0,127,0.8)] transition-all duration-300 cursor-pointer w-full sm:w-auto"
                style={{ pointerEvents: 'auto' }}
              >
                <Cpu className="w-4 h-4 text-cyber-950 transition-transform group-hover:rotate-90 duration-500" />
                <span>ENTER WORKSTATION</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
              
              <div className="text-[11px] text-slate-400 font-mono mt-3 flex items-center justify-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
                <span>Click the button above or press <strong className="text-neon-cyan font-bold">[ ENTER ]</strong> / <strong className="text-neon-cyan font-bold">[ SPACE ]</strong></span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
