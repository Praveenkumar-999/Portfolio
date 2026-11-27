import React, { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

const COMMAND_LIST = [
  { cmd: 'help', desc: 'Display all available command protocols.' },
  { cmd: 'about', desc: 'Declassify developer identity profile.' },
  { cmd: 'skills', desc: 'Scan systems for core technical competencies.' },
  { cmd: 'projects', desc: 'Query active codebase deployments.' },
  { cmd: 'contact', desc: 'Establish uplink communications channel details.' },
  { cmd: 'matrix', desc: 'Initialize matrix rain grid layout.' },
  { cmd: 'hack', desc: 'Simulate neural handshake mainframe decrypt.' },
  { cmd: 'clear', desc: 'Flush current interface terminal buffer.' }
];

export const InteractiveTerminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'SECURE PORTFOLIO SHELL v2.10', type: 'system' },
    { text: 'Initializing neural node connections...', type: 'system' },
    { text: 'Handshake complete. Status: SECURE_UPLINK_ONLINE.', type: 'success' },
    { text: 'Type "help" to view available terminal protocols.', type: 'output' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play synthetic interface sounds using Web Audio API
  const playSound = (type: 'type' | 'return' | 'error' | 'success' | 'laser') => {
    if (isMuted) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      if (type === 'type') {
        // High frequency click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } else if (type === 'return') {
        // Double blip
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'error') {
        // Low buzzer sound
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'success') {
        // Arpeggio chime
        const now = ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.18); // C6
        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        osc.start();
        osc.stop(now + 0.35);
      } else if (type === 'laser') {
        // Swoosh frequency fall
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(3000, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      console.warn("Audio feedback initialization failed: ", e);
    }
  };

  // Matrix Rain Animation
  useEffect(() => {
    if (!showMatrix) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = 350;

    const columns = Math.floor(canvas.width / 16);
    const yPositions = Array(columns).fill(0);
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';

    let intervalId: number;

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00f0ff';
      ctx.font = '14px monospace';

      for (let i = 0; i < yPositions.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = yPositions[i];

        // Randomly color some characters neon purple
        if (Math.random() > 0.94) {
          ctx.fillStyle = '#bc13fe';
        } else {
          ctx.fillStyle = '#00f0ff';
        }

        ctx.fillText(char, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 16;
        }
      }
    };

    intervalId = window.setInterval(drawMatrix, 35);

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, [showMatrix]);

  // Scroll to bottom on updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (cmdStr: string) => {
    const cleanedCmd = cmdStr.trim().toLowerCase();
    if (!cleanedCmd) return;

    playSound('return');
    setCmdHistory(prev => [...prev, cmdStr]);
    setCmdIndex(-1);

    const newHistory = [...history, { text: `> ${cmdStr}`, type: 'input' as const }];

    switch (cleanedCmd) {
      case 'help':
        setHistory([
          ...newHistory,
          { text: 'SYSTEM DEPLOYED COMMAND REGISTRY:', type: 'system' },
          ...COMMAND_LIST.map(c => ({
            text: `  ${c.cmd.padEnd(10)} - ${c.desc}`,
            type: 'output' as const
          }))
        ]);
        break;

      case 'clear':
        setHistory([]);
        setShowMatrix(false);
        break;

      case 'about':
        setHistory([
          ...newHistory,
          { text: 'IDENTIFICATION DECLASSIFIED:', type: 'system' },
          { text: '  NAME       : Praveenkumar Pamisetty', type: 'output' },
          { text: '  OCCUPATION : CSE Undergraduate & Full Stack (MERN) Developer', type: 'output' },
          { text: '  EXPERTISE  : Machine Learning Models, Data Analytics (Power BI / Tableau)', type: 'output' },
          { text: '  MISSION    : Building intelligent, reactive interfaces & scalable software pipelines.', type: 'output' },
          { text: '  CORE STACK : React.js, Node.js, Express, MongoDB, Python, TensorFlow, C, Java, SQL', type: 'output' }
        ]);
        playSound('success');
        break;

      case 'skills':
        setHistory([
          ...newHistory,
          { text: 'SYSTEM HARDWARE & LANGUAGE CAPABILITIES:', type: 'system' },
          { text: '  [██████████████████] 100% - Python / Javascript', type: 'success' },
          { text: '  [████████████████░░]  90% - React / Node.js / MongoDB', type: 'output' },
          { text: '  [████████████████░░]  88% - Machine Learning (TensorFlow / Keras)', type: 'output' },
          { text: '  [██████████████████]  92% - Data Analytics (Power BI / Tableau)', type: 'success' },
          { text: '  [██████████████░░░░]  80% - Java / C / SQL Datastores', type: 'output' }
        ]);
        playSound('success');
        break;

      case 'projects':
        setHistory([
          ...newHistory,
          { text: 'DEPLOYED MODULES DATABASE INVENTORY:', type: 'system' },
          { text: '  1. AeroSafe - AI Aviation Risk Analysis & Risk Vectors Predictive Model [TensorFlow/Python]', type: 'output' },
          { text: '  2. Varanasi Silks (VSilks) - Heritage silk saree & luxury e-commerce platform [React/Vercel]', type: 'output' },
          { text: '  3. PCMart - High-efficiency electronic gadgets & computer store [MERN Stack]', type: 'output' },
          { text: '  4. Smart Car Pool - Real-time transit coordination engine [React/MongoDB]', type: 'output' },
          { text: '  5. UflixStreamer - High-fidelity MERN OTT media streaming platform', type: 'output' },
          { text: '  Type: "hack" to simulate codebase encryption audit.', type: 'output' }
        ]);
        playSound('success');
        break;

      case 'contact':
        setHistory([
          ...newHistory,
          { text: 'SECURE TRANSMISSION COORDINATES:', type: 'system' },
          { text: '  DIRECT SECURE LINK: praveenpamisetty@gmail.com', type: 'output' },
          { text: '  UPLINK FREQUENCY  : +91 9392970526', type: 'output' },
          { text: '  GITHUB TERMINAL   : https://github.com/Praveenkumar-999', type: 'output' },
          { text: '  LINKEDIN GATEWAY  : https://linkedin.com/in/praveenpamisetty', type: 'output' },
          { text: '  GEOGRAPHIC HUB    : Jammalamadugu, AP, India', type: 'output' }
        ]);
        playSound('success');
        break;

      case 'matrix':
        setShowMatrix(true);
        setHistory([
          ...newHistory,
          { text: 'INITIALIZING SYNAPSE GRID... Matrix Rain enabled.', type: 'success' }
        ]);
        playSound('laser');
        break;

      case 'hack':
        setHistory([...newHistory, { text: 'BYPASSING MAINFRAME FIREWALL SECURITY...', type: 'system' }]);
        playSound('laser');
        simulateHacking();
        break;

      default:
        setHistory([
          ...newHistory,
          { text: `ERROR: Code [${cleanedCmd}] unrecognized. Type "help" for valid protocols.`, type: 'error' }
        ]);
        playSound('error');
        break;
    }
  };

  const simulateHacking = () => {
    let steps = [
      'Establishing secure handshake via port 443...',
      'Bypassing cloudflare proxy nodes...',
      'Decrypting Praveenkumar system files: [AeroSafe.py] [App.tsx] [Model.h5]',
      'Cracking certificate vaults... VERIFIED_BY_NXTWAVE: true',
      'System breach complete! Access Granted to portfolio nodes.'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setHistory(prev => [
          ...prev,
          {
            text: step,
            type: idx === steps.length - 1 ? 'success' : 'output'
          }
        ]);
        if (idx === steps.length - 1) {
          playSound('success');
        } else {
          playSound('type');
        }
      }, (idx + 1) * 700);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommandSubmit(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx >= cmdHistory.length) {
          setCmdIndex(-1);
          setInputVal('');
        } else {
          setCmdIndex(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        }
      }
    } else {
      playSound('type');
    }
  };

  return (
    <div className="glass-panel border border-[#00f0ff]/20 bg-[#131315]/80 overflow-hidden rounded-xl">
      {/* Terminal Title Bar */}
      <div className="bg-[#0e0e10] border-b border-[#00f0ff]/10 px-md py-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ffb4ab]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ebb2ff]"></div>
          <div className="w-3 h-3 rounded-full bg-[#00f0ff]"></div>
          <span className="font-code-md text-xs text-outline ml-2 select-none">root@praveen_terminal:~</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="flex items-center gap-1 font-label-caps text-[10px] text-primary hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-xs">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
            {isMuted ? 'UNMUTE_SYSTEM' : 'MUTE_SYSTEM'}
          </button>
          <span className="font-code-md text-[10px] text-[#00f0ff]/50 px-2 py-0.5 border border-[#00f0ff]/30 rounded">UPLINK_READY</span>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div className="p-md h-[380px] overflow-y-auto font-code-md text-sm space-y-2 select-text relative">
        {showMatrix && (
          <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
            <canvas ref={canvasRef} />
          </div>
        )}
        
        <div className="relative z-10 space-y-1.5">
          {history.map((line, i) => (
            <div 
              key={i} 
              className={`
                ${line.type === 'error' ? 'text-error' : ''}
                ${line.type === 'success' ? 'text-[#00f0ff] font-bold shadow-[#00f0ff]/5' : ''}
                ${line.type === 'system' ? 'text-secondary' : ''}
                ${line.type === 'input' ? 'text-on-background font-medium' : ''}
                ${line.type === 'output' ? 'text-[#b9cacb]' : ''}
              `}
            >
              {line.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* Terminal Input Box */}
      <div className="bg-[#0e0e10] p-md border-t border-[#00f0ff]/10 flex items-center gap-sm">
        <span className="font-code-md text-sm text-[#00f0ff] font-bold select-none">&gt;_</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter command (e.g. help, about, skills, matrix)..."
          className="flex-1 bg-transparent outline-none border-none text-[#e5e1e4] font-code-md text-sm placeholder-[#849495]/40"
          autoFocus
        />
        <button 
          onClick={() => { handleCommandSubmit(inputVal); setInputVal(''); }}
          className="bg-[#00f0ff] hover:bg-[#00dbe9] text-[#00363a] px-md py-1 font-label-caps text-xs rounded transition-colors"
        >
          EXECUTE
        </button>
      </div>
    </div>
  );
};
