import React, { useState, useEffect, Component, ReactNode, ErrorInfo } from 'react';
import { SceneContainer } from './components/3d/SceneContainer';
import { CyberHUD } from './components/ui/CyberHUD';
import { Navigation } from './components/ui/Navigation';
import { BootLoader } from './components/ui/BootLoader';
import { ProfileModal } from './components/ui/ProfileModal';
import { ArsenalDrawer } from './components/ui/ArsenalDrawer';
import { ProjectsModal } from './components/ui/ProjectsModal';
import { GitHubIntelModal } from './components/ui/GitHubIntelModal';
import { MissionsModal } from './components/ui/MissionsModal';
import { ContactTerminal } from './components/ui/ContactTerminal';
import { Fallback2DView } from './components/ui/Fallback2DView';
import { NavSection, TechSkill } from './types';
import { soundFX } from './audio/soundFX';
import { ArrowLeft } from 'lucide-react';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("3D Canvas Error encountered, switching to accessible 2D mode:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function App() {
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<NavSection>('workstation');
  const [is3DMode, setIs3DMode] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(soundFX.getMuted());
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [selectedTech, setSelectedTech] = useState<TechSkill | null>(null);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIs3DMode(false);
      }
    } catch {
      setIs3DMode(false);
    }
  }, []);

  const handleNavigate = (section: NavSection) => {
    setCurrentSection(section);
  };

  const handleToggleAudio = () => {
    const muted = soundFX.toggleMute();
    setIsAudioMuted(muted);
  };

  const handleToggle3D = () => {
    setIs3DMode((prev) => !prev);
  };

  const handleToggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen w-full bg-cyber-950 text-slate-100 overflow-x-hidden select-none">
      
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none z-30 opacity-40" />

      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(2, 4, 11, 0.75) 100%)'
        }}
      />

      {/* Cinematic Opening Boot Sequence */}
      {isBooting ? (
        <BootLoader onComplete={() => setIsBooting(false)} />
      ) : (
        <>
          {/* Top Cyber HUD Bar */}
          <CyberHUD
            currentSection={currentSection}
            is3DMode={is3DMode}
            onToggle3DMode={handleToggle3D}
            isAudioMuted={isAudioMuted}
            onToggleAudio={handleToggleAudio}
            reducedMotion={reducedMotion}
            onToggleReducedMotion={handleToggleReducedMotion}
            onNavigate={handleNavigate}
          />

          {/* Primary View: 3D Workstation or Accessible 2D View */}
          {is3DMode ? (
            <SceneErrorBoundary
              fallback={
                <Fallback2DView
                  currentSection={currentSection}
                  onNavigate={handleNavigate}
                  onToggle3D={handleToggle3D}
                />
              }
            >
              <SceneContainer
                currentSection={currentSection}
                reducedMotion={reducedMotion}
                onNavigate={handleNavigate}
                onSelectTech={setSelectedTech}
                selectedTech={selectedTech}
              />

              {/* Floating Return Button when deep in a sub-section in 3D */}
              {currentSection !== 'workstation' && (
                <div className="fixed top-20 left-4 sm:left-6 z-30 animate-in fade-in slide-in-from-top-4 duration-300">
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      setCurrentSection('workstation');
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 bg-cyber-900/90 border border-neon-cyan/60 hover:border-neon-cyan text-neon-cyan hover:text-white rounded-lg cyber-cut-sm shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all font-tech text-xs cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>RETURN TO WORKSTATION OVERVIEW</span>
                  </button>
                </div>
              )}
            </SceneErrorBoundary>
          ) : (
            <Fallback2DView
              currentSection={currentSection}
              onNavigate={handleNavigate}
              onToggle3D={handleToggle3D}
            />
          )}

          {/* Interactive Modals triggered by holographic objects or nav bar */}
          <ProfileModal
            isOpen={currentSection === 'profile'}
            onClose={() => setCurrentSection('workstation')}
          />

          <ArsenalDrawer
            isOpen={currentSection === 'arsenal'}
            onClose={() => setCurrentSection('workstation')}
            selectedTech={selectedTech}
            onSelectTech={setSelectedTech}
          />

          <ProjectsModal
            isOpen={currentSection === 'projects'}
            onClose={() => setCurrentSection('workstation')}
          />

          <GitHubIntelModal
            isOpen={currentSection === 'github'}
            onClose={() => setCurrentSection('workstation')}
          />

          <MissionsModal
            isOpen={currentSection === 'missions'}
            onClose={() => setCurrentSection('workstation')}
          />

          <ContactTerminal
            isOpen={currentSection === 'contact'}
            onClose={() => setCurrentSection('workstation')}
          />

          {/* Bottom Futuristic Navigation Dock */}
          <Navigation
            currentSection={currentSection}
            onNavigate={handleNavigate}
          />
        </>
      )}

    </div>
  );
}

export default App;
