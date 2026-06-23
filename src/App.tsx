import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Send, 
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BackgroundShader } from './components/BackgroundShader';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { SystemStats } from './components/SystemStats';
import { ProjectCard } from './components/ProjectCard';
import type { ProjectData } from './components/ProjectCard';
import { CertificateVault } from './components/CertificateVault';

// Tech Projects list replicating user's portfolio data
const PROJECTS: ProjectData[] = [
  {
    id: '1',
    title: 'AeroSafe: AI Aviation Risk Model',
    description: 'Advanced predictive modeling system for analyzing flight safety parameters and identifying risk vectors using neural networks.',
    tags: ['PYTHON', 'TENSORFLOW', 'SCIKIT-LEARN', 'PANDAS'],
    refCode: 'REF: AS_01',
    iconName: 'analytics',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    demoUrl: 'https://aerosaferisk3.vercel.app/home',
    sourceUrl: 'https://github.com/Praveenkumar-999/Aerosafe-a-flight-risk-predictor-using-machine-learning',
    colSpan: 'md:col-span-8'
  },
  {
    id: '2',
    title: 'Smart Car Pool Engine',
    description: 'Real-time transportation optimization engine utilizing React.js and MongoDB for coordination and pathing.',
    tags: ['REACT.JS', 'MONGODB', 'EXPRESS', 'NODE.JS'],
    refCode: 'REF: SP_02',
    iconName: 'directions_car',
    imageUrl: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80&w=800',
    demoUrl: 'https://github.com/Praveenkumar-999',
    sourceUrl: 'https://github.com/Praveenkumar-999',
    colSpan: 'md:col-span-4'
  },
  {
    id: '3',
    title: 'UflixStreamer: OTT Media Platform',
    description: 'High-fidelity MERN OTT streaming platform featuring real-time stream delivery, payment integration, and video playback.',
    tags: ['MERN STACK', 'REDUX', 'CLOUDINARY', 'STRIPE'],
    refCode: 'REF: UF_03',
    iconName: 'movie',
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8edd86?auto=format&fit=crop&q=80&w=800',
    demoUrl: 'https://github.com/Praveenkumar-999/UflixStreamer',
    sourceUrl: 'https://github.com/Praveenkumar-999/UflixStreamer',
    colSpan: 'md:col-span-4'
  },
  {
    id: '4',
    title: 'Academic Pathway CSE RGUKT',
    description: 'Specializing in Computer Science Engineering baseline algorithms, database architectures, and compiler design.',
    tags: ['C', 'JAVA', 'ALGORITHMS', 'DBMS'],
    refCode: 'REF: AP_04',
    iconName: 'school',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    colSpan: 'md:col-span-8'
  }
];

export default function App() {
  const [typingText, setTypingText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [sendStep, setSendStep] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  // Terminal Typing Phrases
  const phrases = [
    "Establishing secure network socket connection...",
    "Initializing WebGL silk shader background...",
    "Loading MERN stack dependency frameworks...",
    "Compiling neural risk assessment algorithms...",
    "System analysis: Praveenkumar Pamisetty initialized."
  ];

  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: number;

    const type = () => {
      const current = phrases[phraseIdx];
      if (!current) return;

      if (isDeleting) {
        setTypingText(current.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setTypingText(current.substring(0, charIdx + 1));
        charIdx++;
      }

      let delay = isDeleting ? 30 : 60;

      if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        delay = 2500; // Hold full sentence
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 500; // Gap before typing next
      }

      timeoutId = window.setTimeout(type, delay);
    };

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  // Handle encrypted message upload pipeline simulation
  const handleUplinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSending(true);
    setSendProgress(5);
    setSendStep('NEGOTIATING HANDSHAKE PROTOCOLS...');

    const steps = [
      { progress: 15, step: 'GENERATING AES-256 SYMMETRIC PACKET...' },
      { progress: 40, step: 'ESTABLISHING SECURE GATEWAY SOCKET TUNNEL...' },
      { progress: 65, step: 'ROUTING ENCRYPTED PAYLOAD VIA CLOUD PROXY...' },
      { progress: 85, step: 'SYNCHRONIZING SECURE RECIPIENT DECRYPT...' },
      { progress: 100, step: 'TRANSMISSION COMPLETE. ACK RECEIVED.' }
    ];

    steps.forEach((s, i) => {
      setTimeout(() => {
        setSendProgress(s.progress);
        setSendStep(s.step);

        if (s.progress === 100) {
          // Trigger victory confetti!
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#00f0ff', '#bc13fe', '#e5e1e4']
          });

          setTimeout(() => {
            setIsSending(false);
            setForm({ name: '', email: '', message: '' });
          }, 1500);
        }
      }, (i + 1) * 800);
    });
  };

  return (
    <div className="relative min-h-screen font-body-md text-[#e5e1e4]">
      {/* Background WebGL noise canvas */}
      <BackgroundShader />

      {/* Top Header Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#131315]/40 backdrop-blur-xl border-b border-[#3b494b]/20">
        <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
          <div className="font-label-caps text-sm font-bold text-[#00f0ff] tracking-widest flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]"></span>
            PRAVEEN_NODE_V2.10
          </div>
          
          <div className="hidden md:flex gap-lg">
            <a className="font-label-caps text-[10px] text-[#b9cacb] hover:text-[#00f0ff] transition-colors" href="#modules">Projects</a>
            <a className="font-label-caps text-[10px] text-[#b9cacb] hover:text-[#00f0ff] transition-colors" href="#sectors">Skills</a>
            <a className="font-label-caps text-[10px] text-[#b9cacb] hover:text-[#00f0ff] transition-colors" href="#credentials">Vault</a>
            <a className="font-label-caps text-[10px] text-[#b9cacb] hover:text-[#00f0ff] transition-colors" href="#transmission">Contact</a>
          </div>

          <a 
            className="bg-[#00f0ff] text-[#00363a] px-lg py-2 font-label-caps text-[10px] rounded-lg hover:opacity-85 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)]" 
            href="mailto:O210468@rguktong.ac.in"
          >
            Connect_Uplink
          </a>
        </div>
      </nav>

      {/* Left Sidebar Layout */}
      <aside className="fixed left-0 top-0 h-full w-72 hidden xl:flex flex-col py-lg px-md bg-[#1c1b1d]/40 backdrop-blur-2xl border-r border-[#3b494b]/15 z-40">
        <div className="mb-xxl pt-xl px-md">
          <div className="font-label-caps text-xs text-[#00f0ff] mb-1 font-bold tracking-widest">PRAVEENKUMAR</div>
          <div className="font-code-md text-xs text-outline opacity-60">CSE Undergraduate</div>
        </div>

        {/* Sidebar Nav anchors */}
        <div className="flex flex-col gap-sm">
          <a className="flex items-center gap-md p-md bg-[#bc13fe]/10 text-[#ebb2ff] border-l-4 border-[#bc13fe] rounded-r-lg transition-all" href="#root">
            <span className="material-symbols-outlined text-md">terminal</span>
            <span className="font-code-md text-sm">Main_Frame</span>
          </a>
          <a className="flex items-center gap-md p-md text-outline hover:bg-[#353437]/30 hover:text-[#00f0ff] rounded-lg transition-all" href="#modules">
            <span className="material-symbols-outlined text-md">grid_view</span>
            <span className="font-code-md text-sm">Deployed_Modules</span>
          </a>
          <a className="flex items-center gap-md p-md text-outline hover:bg-[#353437]/30 hover:text-[#00f0ff] rounded-lg transition-all" href="#sectors">
            <span className="material-symbols-outlined text-md">memory</span>
            <span className="font-code-md text-sm">Core_Skills</span>
          </a>
          <a className="flex items-center gap-md p-md text-outline hover:bg-[#353437]/30 hover:text-[#00f0ff] rounded-lg transition-all" href="#credentials">
            <span className="material-symbols-outlined text-md">verified</span>
            <span className="font-code-md text-sm">Certificates</span>
          </a>
          <a className="flex items-center gap-md p-md text-outline hover:bg-[#353437]/30 hover:text-[#00f0ff] rounded-lg transition-all" href="#transmission">
            <span className="material-symbols-outlined text-md">satellite_alt</span>
            <span className="font-code-md text-sm">Transmission</span>
          </a>
        </div>

        {/* Diagnostic Panel & Visualizer */}
        <div className="mt-auto px-md space-y-md">
          {/* Neon Audio Frequency Animation */}
          <div className="p-md glass-panel bg-[#201f21]/20 border border-[#00f0ff]/10">
            <div className="text-[9px] font-label-caps text-outline mb-3">SYNAPSE_SIGNAL_HZ</div>
            <div className="flex items-end justify-center gap-1 h-8">
              <div className="w-1.5 bg-[#00f0ff] rounded-t visualizer-bar" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1.5 bg-[#bc13fe] rounded-t visualizer-bar" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-1.5 bg-[#00f0ff] rounded-t visualizer-bar" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 bg-[#00f0ff] rounded-t visualizer-bar" style={{ animationDelay: '0.6s' }}></div>
              <div className="w-1.5 bg-[#bc13fe] rounded-t visualizer-bar" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-1.5 bg-[#00f0ff] rounded-t visualizer-bar" style={{ animationDelay: '0.7s' }}></div>
              <div className="w-1.5 bg-[#ebb2ff] rounded-t visualizer-bar" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          <div className="p-md glass-panel bg-[#201f21]/30 border border-[#3b494b]/10 space-y-2">
            <div className="text-[9px] font-label-caps text-outline">SYSTEM_LOCAL</div>
            <div className="flex items-center gap-sm">
              <MapPin size={12} className="text-[#00f0ff]" />
              <div className="text-[11px] font-code-md text-on-surface">Jammalamadugu, AP</div>
            </div>
            <div className="flex items-center gap-sm">
              <Phone size={12} className="text-[#00f0ff]" />
              <div className="text-[11px] font-code-md text-on-surface">+91 9392970526</div>
            </div>
          </div>

          <a 
            href="mailto:O210468@rguktong.ac.in"
            className="w-full flex items-center justify-center gap-2 border border-[#00f0ff] text-[#00f0ff] py-3 font-label-caps text-xs rounded-lg hover:bg-[#00f0ff]/10 active:scale-95 transition-all text-center"
          >
            <FileText size={14} />
            DOWNLOAD_CV
          </a>
        </div>
      </aside>

      {/* Main content body */}
      <main className="xl:pl-72 pt-24 min-h-screen px-4 md:px-lg max-w-container-max mx-auto space-y-xxl pb-xxl">
        
        {/* Hero Section */}
        <section className="relative py-xl md:py-xxl flex flex-col justify-center min-h-[75vh]" id="root">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
            
            {/* Left Bio info */}
            <div className="lg:col-span-7 space-y-lg">
              <div className="font-label-caps text-xs text-[#00f0ff] flex items-center gap-md font-bold tracking-widest">
                <span className="w-12 h-[1px] bg-[#00f0ff]"></span>
                ESTABLISHED_ENCRYPTED_HANDSHAKE
              </div>
              
              <h1 className="font-display-lg-mobile md:font-display-lg text-4xl md:text-6xl text-primary font-black tracking-tighter leading-tight">
                PRAVEENKUMAR <br/>
                <span className="text-[#00f0ff] drop-shadow-[0_0_12px_rgba(0,240,255,0.1)]">PAMISETTY</span>
              </h1>

              {/* Typing simulation */}
              <div className="font-code-md text-xs text-[#b9cacb] bg-[#0e0e10]/60 backdrop-blur-md p-lg border-l-4 border-[#00f0ff] rounded-r-xl max-w-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                <span className="terminal-cursor">{typingText}</span>
              </div>

              <p className="font-body-lg text-md md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Computer Science undergraduate skilled in Full Stack development (MERN Stack), Machine Learning networks, and interactive Data Analytics. Architecting digital solutions with modular precision.
              </p>
            </div>

            {/* Right Graphic Slot */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#00f0ff]/20 blur-3xl rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 glass-panel rounded-full p-2 border-[#00f0ff]/35 relative z-10 overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#201f21]/80 flex items-center justify-center overflow-hidden border border-[#00f0ff]/10">
                    <Cpu className="text-[120px] w-32 h-32 text-[#00f0ff]/20 group-hover:scale-110 group-hover:text-[#00f0ff]/30 transition-all duration-700" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#00f0ff] text-[#00363a] p-2 rounded-full shadow-lg">
                    <span className="material-symbols-outlined text-sm font-bold">verified</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Real-time System Metrics */}
        <section className="space-y-md">
          <div className="border-b border-[#3b494b]/20 pb-sm">
            <span className="font-label-caps text-xs text-[#00f0ff] font-bold tracking-widest">DIAGNOSTIC_UPLINK</span>
          </div>
          <SystemStats />
        </section>

        {/* Interactive Shell Terminal */}
        <section className="space-y-md">
          <div className="border-b border-[#3b494b]/20 pb-sm flex justify-between items-center">
            <span className="font-label-caps text-xs text-[#bc13fe] font-bold tracking-widest">TERMINAL_INTERRUPT_SHELL</span>
            <span className="font-code-md text-[10px] text-outline">v2.10 - SECURE</span>
          </div>
          <InteractiveTerminal />
        </section>

        {/* Deployed Modules / Projects */}
        <section className="space-y-lg" id="modules">
          <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-[#3b494b]/20 pb-sm gap-md">
            <div>
              <h2 className="font-headline-md text-2xl text-primary font-bold">DEPLOYED_CODE_MODULES</h2>
              <p className="font-code-md text-xs text-outline">Active research and development implementations</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
              <span className="font-code-md text-[10px] text-primary-fixed">ALL_SYSTEMS_OPTIMAL</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
            {PROJECTS.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-xl" id="sectors">
          <div className="border-b border-[#3b494b]/20 pb-sm">
            <h2 className="font-headline-md text-2xl text-primary font-bold">CORE_SYSTEM_COMPETENCIES</h2>
            <p className="font-code-md text-xs text-outline">Quantified developer language and system tools capability index</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            
            {/* Tech grid categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="p-lg glass-panel relative">
                <div className="corner-decor"></div>
                <div className="text-[10px] font-label-caps text-[#00f0ff] font-semibold mb-3">LANGUAGES</div>
                <div className="flex flex-wrap gap-2">
                  {['PYTHON', 'JS / TS', 'JAVA', 'C / C++', 'SQL', 'HTML / CSS'].map((l) => (
                    <span key={l} className="bg-[#201f21]/70 px-2.5 py-1 text-xs font-code-md rounded border border-[#3b494b]/20 hover:border-[#00f0ff]/40 transition-colors">
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-lg glass-panel relative">
                <div className="corner-decor"></div>
                <div className="text-[10px] font-label-caps text-[#bc13fe] font-semibold mb-3">FULL_STACK</div>
                <div className="flex flex-wrap gap-2">
                  {['REACT.JS', 'NODE.JS', 'EXPRESS', 'MONGODB', 'REDUX', 'TAILWIND'].map((f) => (
                    <span key={f} className="bg-[#201f21]/70 px-2.5 py-1 text-xs font-code-md rounded border border-[#3b494b]/20 hover:border-[#bc13fe]/40 transition-colors">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Scanning Progress meters */}
            <div className="space-y-lg bg-[#201f21]/10 p-lg rounded-xl border border-[#3b494b]/10">
              
              <div className="space-y-sm">
                <div className="flex justify-between font-code-md text-xs">
                  <span className="text-[#00f0ff] font-bold">FULL_STACK_MERN (Node, Express, Mongo)</span>
                  <span className="text-secondary-fixed-dim">90%</span>
                </div>
                <div className="h-3 bg-[#0e0e10] w-full rounded-full overflow-hidden progress-bar-scan border border-[#3b494b]/20">
                  <div className="h-full bg-gradient-to-r from-[#bc13fe] to-[#00f0ff] w-[90%] rounded-full"></div>
                </div>
              </div>

              <div className="space-y-sm">
                <div className="flex justify-between font-code-md text-xs">
                  <span className="text-[#00f0ff] font-bold">MACHINE_LEARNING (TensorFlow, Scikit)</span>
                  <span className="text-secondary-fixed-dim">88%</span>
                </div>
                <div className="h-3 bg-[#0e0e10] w-full rounded-full overflow-hidden progress-bar-scan border border-[#3b494b]/20">
                  <div className="h-full bg-gradient-to-r from-[#bc13fe] to-[#00f0ff] w-[88%] rounded-full"></div>
                </div>
              </div>

              <div className="space-y-sm">
                <div className="flex justify-between font-code-md text-xs">
                  <span className="text-[#00f0ff] font-bold">DATA_ANALYTICS (Power BI, Tableau)</span>
                  <span className="text-secondary-fixed-dim">92%</span>
                </div>
                <div className="h-3 bg-[#0e0e10] w-full rounded-full overflow-hidden progress-bar-scan border border-[#3b494b]/20">
                  <div className="h-full bg-gradient-to-r from-[#bc13fe] to-[#00f0ff] w-[92%] rounded-full"></div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Validated Credentials / Certificates */}
        <section className="space-y-lg" id="credentials">
          <div className="border-b border-[#3b494b]/20 pb-sm">
            <h2 className="font-headline-md text-2xl text-primary font-bold text-center">VALIDATED_ACADEMIC_VAULT</h2>
            <p className="font-code-md text-xs text-outline text-center">Cryptographically secure verified certifications and badges</p>
          </div>
          <CertificateVault />
        </section>

        {/* Secure Message Transmission contact form */}
        <section className="max-w-2xl mx-auto space-y-lg" id="transmission">
          <div className="border-b border-[#3b494b]/20 pb-sm text-center">
            <h2 className="font-headline-md text-2xl text-primary font-bold">SECURE_TRANSMISSION_UPLINK</h2>
            <p className="font-code-md text-xs text-outline">Establish communications via encrypted socket tunnel</p>
          </div>

          <div className="glass-panel p-lg md:p-xl relative rounded-2xl bg-[#131315]/80 border-[#00f0ff]/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <div className="corner-decor"></div>

            {isSending ? (
              /* Sending overlay animation state */
              <div className="py-xl flex flex-col justify-center items-center text-center space-y-lg">
                <div className="w-16 h-16 rounded-full border-4 border-[#3b494b]/30 border-t-[#00f0ff] animate-spin flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.15)]" />
                <div className="space-y-sm">
                  <div className="font-code-md text-sm text-[#00f0ff] font-bold">{sendStep}</div>
                  <div className="w-64 h-2 bg-[#0e0e10] border border-[#3b494b]/30 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-[#bc13fe] to-[#00f0ff] transition-all duration-300 rounded-full" 
                      style={{ width: `${sendProgress}%` }}
                    />
                  </div>
                  <div className="font-code-md text-xs text-outline">{sendProgress}% COMPLETED</div>
                </div>
              </div>
            ) : (
              /* Regular form layout */
              <form onSubmit={handleUplinkSubmit} className="space-y-lg font-code-md">
                
                <div className="space-y-xs">
                  <label className="text-[10px] font-label-caps text-[#00f0ff]">ORIGIN_IDENTIFIER_NAME</label>
                  <input 
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter identifying signature..."
                    className="w-full bg-[#201f21]/70 border border-[#3b494b]/30 p-md text-sm rounded-lg focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-colors placeholder-[#849495]/40"
                  />
                </div>

                <div className="space-y-xs">
                  <label className="text-[10px] font-label-caps text-[#00f0ff]">RETURN_ADDRESS_EMAIL</label>
                  <input 
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter secure SMTP email endpoint..."
                    className="w-full bg-[#201f21]/70 border border-[#3b494b]/30 p-md text-sm rounded-lg focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-colors placeholder-[#849495]/40"
                  />
                </div>

                <div className="space-y-xs">
                  <label className="text-[10px] font-label-caps text-[#00f0ff]">ENCRYPTED_MESSAGE_BODY</label>
                  <textarea 
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide detailed transmission dispatch details..."
                    className="w-full bg-[#201f21]/70 border border-[#3b494b]/30 p-md text-sm rounded-lg focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-colors placeholder-[#849495]/40 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#00f0ff] text-[#00363a] py-3 rounded-lg font-label-caps text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] font-semibold"
                >
                  <Send size={16} />
                  TRANSMIT_DISPATCH
                </button>

              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#3b494b]/20 pt-xxl flex flex-col md:flex-row justify-between items-start gap-xl" id="transmission">
          <div className="space-y-md">
            <div className="font-code-md text-sm text-on-surface-variant font-bold">PAMISETTY_SYSTEMS // CORE_V2.10</div>
            <div className="flex items-center gap-sm text-outline">
              <MapPin size={12} />
              <span className="text-xs font-code-md">Jammalamadugu, AP, India</span>
            </div>
            <p className="font-body-md text-sm text-outline max-w-sm">
              Designing digital ecosystems and machine learning nodes that stand the test of time. Available for collaborative ventures.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-xl w-full md:w-auto">
            <div className="space-y-sm">
              <div className="font-label-caps text-[10px] text-[#00f0ff] font-bold">TRANSMISSION_CHANNELS</div>
              <a href="https://github.com/Praveenkumar-999" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-code-md text-xs text-outline hover:text-[#00f0ff] transition-colors">
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                GIT_HUB_REPOS
              </a>
              <a href="https://linkedin.com/in/praveenpamisetty" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-code-md text-xs text-outline hover:text-[#00f0ff] transition-colors">
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                LINKED_IN_GATEWAY
              </a>
            </div>

            <div className="space-y-sm">
              <div className="font-label-caps text-[10px] text-[#00f0ff] font-bold">DIRECT_UPLINK</div>
              <div className="font-code-md text-xs text-outline flex items-center gap-1.5">
                <Mail size={12} />
                O210468@rguktong.ac.in
              </div>
              <div className="font-code-md text-xs text-outline flex items-center gap-1.5">
                <Phone size={12} />
                +91 9392970526
              </div>
            </div>
          </div>
        </footer>

        {/* Global Encryption Status line */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#3b494b]/20 pt-lg gap-lg text-center md:text-left select-none text-[10px] font-label-caps text-outline">
          <div>© 2026 PRAVEENKUMAR PAMISETTY. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="font-code-md text-[#00f0ff] font-bold">SYSTEM_ONLINE // END_TO_END_ENCRYPTED</span>
          </div>
        </div>

      </main>
    </div>
  );
}
