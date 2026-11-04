import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Mail, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowLeft, 
  ShieldCheck, 
  Radio,
  MapPin
} from 'lucide-react';
import { CONTACT_INFO } from '../../data/portfolioData';
import { soundFX } from '../../audio/soundFX';

interface ContactTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactTerminal: React.FC<ContactTerminalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [isTransmitted, setIsTransmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) return;

    soundFX.playClick();
    setIsTransmitted(true);
    setTimeout(() => {
      // Clear form
      setMessage('');
      setSenderName('');
      setSenderEmail('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-cyber-900/95 border border-neon-cyan/50 rounded-xl cyber-cut shadow-2xl shadow-neon-cyan/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-cyber-950/80 border-b border-neon-cyan/30">
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-neon-cyan animate-pulse" />
            <div className="font-tech text-xs sm:text-sm text-slate-200 tracking-wider">
              <span className="text-neon-cyan font-bold">COMMUNICATION UPLINK</span> // ESTABLISH CONNECTION
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

        {/* Telemetry Bar */}
        <div className="px-4 sm:px-6 py-2 bg-cyber-950 border-b border-slate-800 flex items-center justify-between font-mono text-[11px]">
          <span className="text-neon-cyan truncate">
            &gt; {CONTACT_INFO.terminalGreeting}
          </span>
          <span className="text-green-400 font-mono text-[10px] hidden sm:inline">
            [UPLINK: ENCRYPTED // READY]
          </span>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Direct Channels */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                PRIMARY TRANSMISSION CHANNELS
              </span>
              <h3 className="text-xl font-cyber font-bold text-slate-100 text-glow-cyan">
                Connect Directly
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Available for full-time graduate opportunities, full-stack projects, and engineering collaborations.
              </p>
            </div>

            {/* Email Card */}
            <div className="p-4 bg-cyber-950/80 border border-slate-800 hover:border-neon-cyan/50 rounded-lg cyber-cut-sm transition-all space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-tech text-neon-cyan">
                  <Mail className="w-4 h-4" />
                  <span>DIRECT EMAIL</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-neon-cyan transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'COPIED!' : 'COPY'}</span>
                </button>
              </div>
              <a 
                href={`mailto:${CONTACT_INFO.email}`} 
                onClick={() => soundFX.playClick()}
                className="font-mono text-sm text-slate-200 hover:text-neon-cyan break-all block transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
              <span className="text-[10px] font-mono text-slate-500 block">
                Average response time: &lt; 24 Hours
              </span>
            </div>

            {/* GitHub Card */}
            <div className="p-4 bg-cyber-950/80 border border-slate-800 hover:border-neon-cyan/50 rounded-lg cyber-cut-sm transition-all space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-tech text-neon-blue">
                  <Github className="w-4 h-4" />
                  <span>GITHUB PROFILE & SOURCE</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <a 
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="font-mono text-sm text-slate-200 hover:text-neon-cyan break-all block transition-colors"
              >
                https://github.com/gowdham2106
              </a>
              <span className="text-[10px] font-mono text-slate-500 block">
                Public repositories, code audits & commit logs
              </span>
            </div>

            {/* LinkedIn Card */}
            <div className="p-4 bg-cyber-950/80 border border-slate-800 hover:border-neon-cyan/50 rounded-lg cyber-cut-sm transition-all space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-tech text-neon-purple">
                  <Linkedin className="w-4 h-4" />
                  <span>LINKEDIN NETWORK</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <a 
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="font-mono text-sm text-slate-200 hover:text-neon-cyan break-all block transition-colors"
              >
                https://www.linkedin.com/in/gowdhamgokuldas/
              </a>
              <span className="text-[10px] font-mono text-slate-500 block">
                Professional journey, endorsements & connect
              </span>
            </div>

            {/* Location & Status */}
            <div className="flex items-center gap-2 p-3 bg-cyber-950 rounded border border-slate-800 text-xs font-mono text-slate-400">
              <MapPin className="w-4 h-4 text-neon-magenta shrink-0" />
              <span>Location: {CONTACT_INFO.location}</span>
            </div>
          </div>

          {/* Interactive Message Dispatch Terminal */}
          <div className="p-5 bg-cyber-950/70 border border-neon-cyan/30 rounded-lg cyber-cut-sm flex flex-col justify-between">
            {isTransmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 py-10 animate-in fade-in duration-300">
                <ShieldCheck className="w-12 h-12 text-green-400 animate-bounce" />
                <h4 className="text-lg font-cyber font-bold text-slate-100 text-glow-cyan">
                  TRANSMISSION RECEIVED
                </h4>
                <p className="text-xs font-mono text-slate-300 max-w-xs">
                  Your message has been encrypted and delivered to Gowdham Gokul&apos;s queue. Thank you for connecting.
                </p>
                <button
                  onClick={() => setIsTransmitted(false)}
                  className="mt-4 px-4 py-2 bg-cyber-900 border border-neon-cyan text-neon-cyan rounded text-xs font-tech"
                >
                  SEND ANOTHER DISPATCH
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-neon-cyan">MESSAGE TRANSMITTER</span>
                  <h4 className="text-base font-cyber font-bold text-slate-200">
                    Dispatch Instant Transmission
                  </h4>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 block">
                    NAME / CALLSIGN
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Alex Hunter // Recruiter"
                    className="w-full px-3 py-2 bg-cyber-900/90 border border-slate-700 focus:border-neon-cyan text-slate-100 rounded text-xs font-mono outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 block">
                    RETURN FREQUENCY (EMAIL)
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="e.g. alex@techcorp.com"
                    className="w-full px-3 py-2 bg-cyber-900/90 border border-slate-700 focus:border-neon-cyan text-slate-100 rounded text-xs font-mono outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 block">
                    TRANSMISSION PAYLOAD
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Greetings Gowdham, we would love to discuss a full-stack developer role..."
                    className="w-full px-3 py-2 bg-cyber-900/90 border border-slate-700 focus:border-neon-cyan text-slate-100 rounded text-xs font-mono outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-cyber-950 font-cyber font-bold text-xs uppercase tracking-wider cyber-cut transition-all hover:from-neon-magenta hover:to-neon-pink flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}

            <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 text-center">
              [SECURITY: END-TO-END TLS ENCRYPTION ACTIVE]
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

