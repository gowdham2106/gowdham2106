import React, { useEffect } from 'react';
import { 
  Monitor, 
  User, 
  Cpu, 
  FolderKanban, 
  GitBranch, 
  Radio, 
  Send 
} from 'lucide-react';
import { NavSection } from '../../types';
import { soundFX } from '../../audio/soundFX';

interface NavigationProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
}

interface NavItem {
  id: NavSection;
  label: string;
  icon: React.FC<{ className?: string }>;
  hotkey: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'workstation', label: 'Workstation', icon: Monitor, hotkey: '1' },
  { id: 'profile', label: 'Identity', icon: User, hotkey: '2' },
  { id: 'arsenal', label: 'Arsenal', icon: Cpu, hotkey: '3' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, hotkey: '4' },
  { id: 'github', label: 'Intel', icon: GitBranch, hotkey: '5' },
  { id: 'missions', label: 'Missions', icon: Radio, hotkey: '6' },
  { id: 'contact', label: 'Uplink', icon: Send, hotkey: '7' },
];

export const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        soundFX.playClick();
        onNavigate('workstation');
        return;
      }

      const match = NAV_ITEMS.find(item => item.hotkey === e.key);
      if (match) {
        soundFX.playClick();
        onNavigate(match.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate]);

  return (
    <nav 
      aria-label="Cyberpunk Navigation Dock"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] sm:w-auto"
    >
      <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-2 p-1.5 sm:p-2 bg-cyber-900/90 backdrop-blur-xl border border-neon-cyan/30 rounded-xl sm:rounded-2xl shadow-2xl shadow-neon-cyan/10">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                soundFX.playClick();
                onNavigate(item.id);
              }}
              onMouseEnter={() => soundFX.playHover()}
              className={`relative flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg font-tech text-xs transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-neon-cyan/25 to-neon-blue/20 text-neon-cyan border border-neon-cyan/60 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
              title={`${item.label} [Press ${item.hotkey}]`}
            >
              <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110 text-neon-cyan animate-pulse' : ''}`} />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
                {item.label}
              </span>
              <span className="hidden xl:inline text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-500 font-mono">
                {item.hotkey}
              </span>

              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-neon-cyan rounded-full shadow-[0_0_8px_#00f3ff]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

