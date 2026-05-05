import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Activity, Shield, Wifi, Battery, Disc, Volume2 } from 'lucide-react';
import { soundManager } from './utils/sound';

// --- Components ---

const TypewriterText = ({ 
  text, 
  onComplete, 
  speed = 50, 
  className = "",
  playSounds = true
}: { 
  text: string, 
  onComplete?: () => void, 
  speed?: number, 
  className?: string,
  playSounds?: boolean
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index.current));
      if (playSounds) soundManager.playTypingSound();
      index.current++;
      if (index.current >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete, playSounds]);

  return <span className={className} data-text={displayedText}>{displayedText}</span>;
};

const Claw: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    soundManager.playClawSound();
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top Claw */}
      <motion.div
        className="absolute w-64 h-32 border-b-4 border-l-4 border-r-4 border-neon-blue rounded-b-full bg-black/50 backdrop-blur-sm"
        style={{ top: '20%' }}
        initial={{ y: -300, rotate: 180 }}
        animate={{ y: 0, rotate: 180 }}
        transition={{ duration: 1.5, type: "spring" }}
      />
      
      {/* Bottom Claw */}
      <motion.div
        className="absolute w-64 h-32 border-b-4 border-l-4 border-r-4 border-neon-blue rounded-b-full bg-black/50 backdrop-blur-sm"
        style={{ bottom: '20%' }}
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, type: "spring" }}
        onAnimationComplete={onComplete}
      />
      
      {/* Center Energy Core */}
      <motion.div
        className="w-16 h-16 bg-neon-blue rounded-full absolute shadow-[0_0_50px_#00f3ff] z-30"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 0] }}
        transition={{ duration: 2, times: [0, 0.5, 1], delay: 1 }}
      />
    </motion.div>
  );
};

const Hologram = () => {
  useEffect(() => {
    soundManager.startAmbientHum();
    return () => soundManager.stopAmbientHum();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Hologram Container */}
      <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] border border-neon-blue/30 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,243,255,0.2)]">
        
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.5) 1px, transparent 1px)', 
               backgroundSize: '20px 20px' 
             }}>
        </div>

        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-50"
            initial={{ 
              x: Math.random() * 300, 
              y: 400 
            }}
            animate={{ 
              y: -50,
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity, 
              delay: Math.random() * 2,
              ease: "linear"
            }}
          />
        ))}

        {/* The Figure */}
        <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
           <svg viewBox="0 0 200 300" className="h-[90%] w-auto opacity-90 filter drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]">
              <defs>
                <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0, 243, 255, 0.2)" />
                  <stop offset="50%" stopColor="rgba(0, 243, 255, 0.9)" />
                  <stop offset="100%" stopColor="rgba(0, 243, 255, 0.2)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Animated Body Group */}
              <motion.g
                animate={{ 
                  y: [0, -5, 0],
                  scale: [1, 1.01, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {/* Head/Hair */}
                <path d="M100,50 C130,50 150,80 150,110 C150,150 130,170 100,170 C70,170 50,150 50,110 C50,80 70,50 100,50 Z" fill="none" stroke="url(#holoGradient)" strokeWidth="2" filter="url(#glow)" />
                <path d="M50,110 Q40,150 20,200" fill="none" stroke="url(#holoGradient)" strokeWidth="1" opacity="0.5" />
                <path d="M150,110 Q160,150 180,200" fill="none" stroke="url(#holoGradient)" strokeWidth="1" opacity="0.5" />
                
                {/* Neck/Shoulders */}
                <path d="M85,165 L85,190 L60,210 L40,300" fill="none" stroke="url(#holoGradient)" strokeWidth="2" filter="url(#glow)" />
                <path d="M115,165 L115,190 L140,210 L160,300" fill="none" stroke="url(#holoGradient)" strokeWidth="2" filter="url(#glow)" />
                
                {/* Cyber Details - Eyes */}
                <motion.g
                  animate={{ opacity: [1, 1, 1, 0.2, 1] }} // Blinking
                  transition={{ duration: 4, times: [0, 0.9, 0.95, 0.96, 1], repeat: Infinity }}
                >
                  <circle cx="80" cy="100" r="4" fill="#00f3ff" className="neon-pulse" />
                  <circle cx="120" cy="100" r="4" fill="#00f3ff" className="neon-pulse" />
                </motion.g>
                
                <path d="M95,120 L105,120" stroke="#00f3ff" strokeWidth="2" />
                
                {/* Scanning lines on body */}
                <motion.g
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <line x1="0" y1="200" x2="200" y2="200" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />
                  <line x1="0" y1="220" x2="200" y2="220" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />
                  <line x1="0" y1="240" x2="200" y2="240" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />
                  <line x1="0" y1="260" x2="200" y2="260" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />
                </motion.g>
              </motion.g>
           </svg>
        </div>

        {/* Scanning Bar Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent h-20 w-full"
          animate={{ top: ['-20%', '120%'] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
        
        {/* Data Overlay */}
        <div className="absolute top-4 left-4 text-[10px] font-mono text-neon-blue opacity-70">
          <div className="flex flex-col gap-1">
            <span>ID: AVA-X9</span>
            <span>SYNC: 99.8%</span>
            <span>MEM: 128TB</span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-neon-blue opacity-70 text-right">
           <TypewriterText text="SYSTEM ONLINE" speed={100} playSounds={false} />
        </div>
      </div>

      {/* Floor Glow */}
      <div className="w-[300px] h-[20px] bg-neon-blue/50 blur-xl rounded-[100%] mt-4 animate-pulse"></div>
    </div>
  );
};

export default function App() {
  const [stage, setStage] = useState<'start' | 'intro' | 'claw' | 'initializing' | 'complete' | 'reveal'>('start');
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (stage === 'intro') {
      // "Hello Bryce..." is handled by TypewriterText component's onComplete
    }
  }, [stage]);

  const startExperience = () => {
    setInteracted(true);
    soundManager.playBootSequence();
    setStage('intro');
  };

  const handleIntroComplete = () => {
    setTimeout(() => setStage('claw'), 1000);
  };

  const handleClawComplete = () => {
    setStage('initializing');
  };

  const handleInitializingComplete = () => {
    soundManager.playSuccessChime();
    setTimeout(() => setStage('complete'), 2000);
  };

  const handleCompleteTextFinished = () => {
    setTimeout(() => setStage('reveal'), 1000);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-mono selection:bg-neon-blue selection:text-black">
      {/* Global Effects */}
      <div className="scanlines"></div>
      <div className="scanline-bar"></div>
      <div className="screen-curvature"></div>
      
      {/* Background Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-t border-l border-neon-blue/30 rounded-tl-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-b border-r border-neon-blue/30 rounded-br-3xl"></div>
        <div className="absolute top-1/2 left-4 w-1 h-24 bg-neon-blue/20"></div>
        <div className="absolute top-1/2 right-4 w-1 h-24 bg-neon-blue/20"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">

          {/* STAGE 0: START BUTTON (Required for Audio Context) */}
          {stage === 'start' && (
            <motion.button
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              onClick={startExperience}
              className="group relative px-8 py-4 bg-transparent border border-neon-blue text-neon-blue font-display text-xl tracking-widest uppercase overflow-hidden hover:bg-neon-blue hover:text-black transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Volume2 size={20} /> Initialize System
              </span>
              <div className="absolute inset-0 bg-neon-blue/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </motion.button>
          )}
          
          {/* STAGE 1: HELLO BRYCE */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              className="text-4xl md:text-6xl font-display text-white tracking-widest chromatic-aberration"
            >
              <TypewriterText 
                text="HELLO BRYCE..." 
                speed={100} 
                onComplete={handleIntroComplete} 
                className="glitch-effect"
              />
            </motion.div>
          )}

          {/* STAGE 2: CLAW ANIMATION */}
          {stage === 'claw' && (
            <Claw key="claw" onComplete={handleClawComplete} />
          )}

          {/* STAGE 3: INITIALIZING */}
          {stage === 'initializing' && (
            <motion.div
              key="initializing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-2xl md:text-4xl text-neon-blue font-display tracking-wider chromatic-aberration">
                <TypewriterText 
                  text="INITIALIZING AVA..." 
                  speed={50} 
                  onComplete={handleInitializingComplete}
                />
              </div>
              <motion.div 
                className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden border border-neon-blue/50"
              >
                <motion.div 
                  className="h-full bg-neon-blue shadow-[0_0_10px_#00f3ff]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </motion.div>
              
              {/* Rapid scrolling hex codes for effect */}
              <div className="h-24 overflow-hidden text-[10px] text-neon-green/50 font-mono text-center">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    0x{Math.floor(Math.random()*16777215).toString(16).toUpperCase()} // LOAD_MODULE_{i}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STAGE 4: COMPLETE */}
          {stage === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
              className="text-3xl md:text-5xl text-neon-green font-display tracking-widest uppercase chromatic-aberration"
            >
              <TypewriterText 
                text="AVA LOADING COMPLETE." 
                speed={30} 
                onComplete={handleCompleteTextFinished}
                className="drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]"
              />
            </motion.div>
          )}

          {/* STAGE 5: REVEAL */}
          {stage === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-full flex flex-col items-center justify-center p-4"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                
                {/* Left Panel Data */}
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="hidden md:flex flex-col gap-4 w-48"
                >
                  <div className="border border-neon-blue/30 p-4 bg-black/50 backdrop-blur-sm rounded">
                    <div className="flex items-center gap-2 text-neon-blue mb-2">
                      <Cpu size={16} />
                      <span className="text-xs font-bold">CPU LOAD</span>
                    </div>
                    <div className="flex gap-1 h-8 items-end">
                      {[40, 70, 30, 80, 50, 90, 60].map((h, i) => (
                        <motion.div 
                          key={i} 
                          className="w-2 bg-neon-blue/60"
                          animate={{ height: [`${h}%`, `${Math.random() * 100}%`] }}
                          transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="border border-neon-blue/30 p-4 bg-black/50 backdrop-blur-sm rounded">
                    <div className="flex items-center gap-2 text-neon-blue mb-2">
                      <Wifi size={16} />
                      <span className="text-xs font-bold">NETWORK</span>
                    </div>
                    <div className="text-xs text-neon-blue/80 font-mono">
                      UPLINK: ESTABLISHED<br/>
                      LATENCY: 2ms<br/>
                      ENCRYPTION: AES-256
                    </div>
                  </div>
                </motion.div>

                {/* Center Hologram */}
                <Hologram />

                {/* Right Panel Data */}
                <motion.div 
                   initial={{ x: 50, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.7 }}
                   className="hidden md:flex flex-col gap-4 w-48"
                >
                   <div className="border border-neon-blue/30 p-4 bg-black/50 backdrop-blur-sm rounded">
                    <div className="flex items-center gap-2 text-neon-blue mb-2">
                      <Activity size={16} />
                      <span className="text-xs font-bold">VITALS</span>
                    </div>
                     <div className="relative h-16 w-full overflow-hidden">
                       <svg className="absolute inset-0 w-full h-full">
                         <motion.path
                           d="M0,30 L20,30 L30,10 L40,50 L50,30 L100,30"
                           fill="none"
                           stroke="#00f3ff"
                           strokeWidth="2"
                           initial={{ pathLength: 0, x: -100 }}
                           animate={{ pathLength: 1, x: 0 }}
                           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                         />
                       </svg>
                     </div>
                  </div>

                  <div className="border border-neon-blue/30 p-4 bg-black/50 backdrop-blur-sm rounded">
                    <div className="flex items-center gap-2 text-neon-blue mb-2">
                      <Shield size={16} />
                      <span className="text-xs font-bold">SECURITY</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-[10px] text-neon-blue/80">
                        <span>FIREWALL</span>
                        <span className="text-neon-green">ACTIVE</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neon-blue/80">
                        <span>BIOMETRICS</span>
                        <span className="text-neon-green">MATCH</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Terminal / Chat Area */}
              <div className="absolute bottom-4 w-full max-w-4xl px-8 flex flex-col items-center z-50">
                 <TerminalInterface />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

const TerminalInterface = () => {
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'SYSTEM ONLINE. PROMPT REQUIRED.'}
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;
    
    const userMsg = inputVal.trim();
    setInputVal('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    soundManager.playTypingSound();

    try {
      const { generateAVAResponse } = await import('./utils/ai');
      
      const history = messages.slice(1).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const reply = await generateAVAResponse(history, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
      soundManager.playSuccessChime();
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'ERR_CONNECTION_LOST.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full bg-black/80 border border-neon-blue/30 backdrop-blur-md rounded shadow-[0_0_15px_rgba(0,243,255,0.1)] overflow-hidden flex flex-col h-48 md:h-56">
      {/* Header */}
      <div className="bg-neon-blue/10 border-b border-neon-blue/30 px-4 py-1 flex justify-between items-center text-neon-blue text-[10px] font-mono">
        <div className="flex gap-4">
           <span>TERMINAL_LINK</span>
           <span className="opacity-70">UPLINK_SECURE</span>
        </div>
        <div className="flex gap-2 items-center">
           <span className="animate-pulse">ACTIVE</span>
           <div className="w-1.5 h-1.5 bg-neon-green rounded-full"></div>
        </div>
      </div>
      
      {/* Log */}
      <div className="flex-1 overflow-y-auto p-4 text-xs font-mono space-y-2" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-neon-pink text-right' : 'text-neon-blue'}`}>
              <span className="opacity-50 mr-2 text-[8px]">{msg.role === 'user' ? 'GUEST>' : 'AVA>'}</span>
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="text-neon-blue opacity-70 animate-pulse">
             <span className="opacity-50 mr-2 text-[8px]">{'AVA>'}</span>
             PROCESSING...
           </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-neon-blue/30 flex bg-black">
        <div className="px-3 py-2 text-neon-pink opacity-70 flex items-center justify-center">
          <Terminal size={14} />
        </div>
        <input 
          type="text" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="ENTER COMMAND..."
          className="flex-1 bg-transparent border-none outline-none text-neon-pink text-xs font-mono placeholder:text-neon-pink/30"
          autoComplete="off"
          disabled={isTyping}
        />
        <button 
          type="submit" 
          className="px-4 text-[10px] font-mono text-neon-blue border-l border-neon-blue/30 hover:bg-neon-blue/10 disabled:opacity-50"
          disabled={isTyping || !inputVal.trim()}
        >
          EXECUTE
        </button>
      </form>
    </div>
  );
};
