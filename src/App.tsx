import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import heroImage from './assets/hero.png';
import { ParticleSwarmBackground } from './components/ParticleSwarmBackground';
import './App.css';

// Tech Projects list replicating user's portfolio resume data
interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  sourceUrl?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: '1',
    title: 'AeroSafe – AI Aviation Risk Model',
    description: 'Developed an intelligent pre-flight risk assessment platform to improve aviation safety using Machine Learning and weather analytics. Built a CNN-based predictive model to analyze weather conditions and estimate flight risk levels. Integrated real-time weather data from external APIs for accurate risk evaluation.',
    tags: ['Python', 'TensorFlow', 'Scikit-Learn', 'Node.js', 'Express.js', 'MongoDB', 'Open-Meteo API'],
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    demoUrl: 'https://aerosaferisk3.vercel.app/home',
    sourceUrl: 'https://github.com/Praveenkumar-999/Aerosafe-a-flight-risk-predictor-using-machine-learning'
  },
  {
    id: '2',
    title: 'Smart Car Pooling System',
    description: 'Developed a web-based car pooling platform that connects drivers and passengers traveling on similar routes. Implemented user registration, ride posting, ride search, and booking functionalities. Designed route matching logic to help users find suitable shared rides.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80&w=800',
    demoUrl: 'https://github.com/Praveenkumar-999',
    sourceUrl: 'https://github.com/Praveenkumar-999'
  },
  {
    id: '3',
    title: 'PCMFLIX – OTT Streaming Platform',
    description: 'Developed a full-stack OTT streaming platform using the MERN Stack. Implemented secure user authentication and content management features. Designed responsive UI for seamless viewing experience, integrating REST APIs for content delivery.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Redux', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8edd86?auto=format&fit=crop&q=80&w=800',
    demoUrl: 'https://github.com/Praveenkumar-999/UflixStreamer',
    sourceUrl: 'https://github.com/Praveenkumar-999/UflixStreamer'
  },
  {
    id: '4',
    title: 'Varanasi Silks (VSilks)',
    description: 'Heritage silk saree & luxury artisanal textile e-commerce platform featuring curated collections, modern UI storefront, dynamic cart operations, and secure checkouts.',
    tags: ['React.js', 'Tailwind CSS', 'E-Commerce', 'Vercel'],
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    demoUrl: 'https://varanasi-silks.vercel.app/',
    sourceUrl: 'https://github.com/Praveenkumar-999/Vsilks'
  },
  {
    id: '5',
    title: 'PCMart: Electronics Storefront',
    description: 'High-efficiency electronic gadgets & computer components store featuring role management, dynamic shopping cart operations, and secure checkouts.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&q=80&w=800',
    demoUrl: 'https://pcmart-delta.vercel.app/',
    sourceUrl: 'https://github.com/Praveenkumar-999/PCmart'
  },
  {
    id: '6',
    title: 'Academic Pathway CSE RGUKT',
    description: 'Specializing in Computer Science Engineering baseline algorithms, database architectures, and compiler design implementations for academic curricula.',
    tags: ['C', 'Java', 'Algorithms', 'DBMS'],
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    demoUrl: 'https://github.com/Praveenkumar-999',
    sourceUrl: 'https://github.com/Praveenkumar-999'
  }
];

const INTERESTS = [
  {
    title: 'Films',
    description: 'Deep-diving into cinematic storytelling, visual direction, and screenplays. I appreciate complex narratives, editing techniques, and the art of modern film composition.',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Chess',
    description: 'Analyzing complex patterns, positions, and defensive configurations. I enjoy studying chess sequences and strategic positioning to train tactical calculations.',
    imageUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Poster Design',
    description: 'Blending vector shapes, minimal grid theories, and striking modern typography to design impactful poster visual concepts that capture direct viewer attention.',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Literature',
    description: 'Exploring philosophical themes, structural narrative styles, and storytelling mechanics. Deep reading drives my focus and creative structural reasoning.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Writing & Art',
    description: 'Translating abstract thoughts, creative stand-up setups, and visual compositions into physical and digital creative drafts, constantly experimenting with new forms.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Books',
    description: 'Reading across history, sci-fi, and technical deep-dives. Books expand my mental framework, inspire lateral thinking, and provide structured views on diverse subjects.',
    imageUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600&auto=format&fit=crop'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// ISOLATED SUBCOMPONENTS TO PREVENT GLOBAL APP RE-RENDERS & FIX PERFORMANCE FREEZES
// ─────────────────────────────────────────────────────────────────────────────

// 1. Theme Switcher Component
function ThemeSwitcher() {
  const [activeAccent, setActiveAccent] = useState('#0056ff');

  useEffect(() => {
    const savedAccent = localStorage.getItem('portfolio-accent');
    if (savedAccent) {
      applyTheme(savedAccent);
      setActiveAccent(savedAccent);
    }
  }, []);

  const applyTheme = (accentHex: string) => {
    const root = document.documentElement;
    root.style.setProperty('--color-electric-blue', accentHex);
    const r = parseInt(accentHex.slice(1, 3), 16);
    const g = parseInt(accentHex.slice(3, 5), 16);
    const b = parseInt(accentHex.slice(5, 7), 16);
    const darkerHex = '#' + 
      Math.max(0, Math.floor(r * 0.5)).toString(16).padStart(2, '0') +
      Math.max(0, Math.floor(g * 0.5)).toString(16).padStart(2, '0') +
      Math.max(0, Math.floor(b * 0.5)).toString(16).padStart(2, '0');
    root.style.setProperty('--color-slate-blue', darkerHex);
    root.style.setProperty('--glow-blue', `0 0 40px rgba(${r}, ${g}, ${b}, 0.35)`);
    root.style.setProperty('--border-glass-glow', `rgba(${r}, ${g}, ${b}, 0.25)`);
    const pBar = document.getElementById('scrollProgressBar');
    if (pBar) {
      pBar.style.background = `linear-gradient(90deg, ${accentHex} 0%, var(--color-violet-glow) 50%, #00f0ff 100%)`;
      pBar.style.boxShadow = `0 0 8px ${accentHex}, 0 0 18px rgba(${r}, ${g}, ${b}, 0.4)`;
    }
  };

  const handleThemeChange = (accentHex: string, e: React.MouseEvent<HTMLButtonElement>) => {
    applyTheme(accentHex);
    setActiveAccent(accentHex);
    localStorage.setItem('portfolio-accent', accentHex);
    
    document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
    e.currentTarget.classList.add('active');

    // Close palette
    const palette = document.getElementById('themePalette');
    const toggle = document.getElementById('themeToggleBtn');
    toggle?.classList.remove('active');
    palette?.classList.remove('open');
  };

  return (
    <div className="theme-switcher" id="themeSwitcher">
      <button 
        className="theme-toggle-btn" 
        onClick={() => {
          const toggle = document.getElementById('themeToggleBtn');
          const palette = document.getElementById('themePalette');
          toggle?.classList.toggle('active');
          palette?.classList.toggle('open');
        }}
        id="themeToggleBtn" 
        aria-label="Change accent color"
      >
        <i className="fa-solid fa-palette"></i>
      </button>
      <div className="theme-palette" id="themePalette">
        <button className={`theme-swatch ${activeAccent === '#0056ff' ? 'active' : ''}`} data-accent="#0056ff" data-name="Electric Blue" aria-label="Electric Blue" style={{ ['--swatch' as any]: '#0056ff' }} onClick={(e) => handleThemeChange('#0056ff', e)}></button>
        <button className={`theme-swatch ${activeAccent === '#e07252' ? 'active' : ''}`} data-accent="#e07252" data-name="Terracotta" aria-label="Terracotta" style={{ ['--swatch' as any]: '#e07252' }} onClick={(e) => handleThemeChange('#e07252', e)}></button>
        <button className={`theme-swatch ${activeAccent === '#4f3beb' ? 'active' : ''}`} data-accent="#4f3beb" data-name="Violet Glow" aria-label="Violet Glow" style={{ ['--swatch' as any]: '#4f3beb' }} onClick={(e) => handleThemeChange('#4f3beb', e)}></button>
        <button className={`theme-swatch ${activeAccent === '#10b981' ? 'active' : ''}`} data-accent="#10b981" data-name="Emerald" aria-label="Emerald" style={{ ['--swatch' as any]: '#10b981' }} onClick={(e) => handleThemeChange('#10b981', e)}></button>
        <button className={`theme-swatch ${activeAccent === '#f43f5e' ? 'active' : ''}`} data-accent="#f43f5e" data-name="Rose" aria-label="Rose" style={{ ['--swatch' as any]: '#f43f5e' }} onClick={(e) => handleThemeChange('#f43f5e', e)}></button>
      </div>
    </div>
  );
}

// 2. Header and Navigation Menu Component
function HeaderAndNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="nav-container">
          <a href="#hero" className="nav-logo" id="nav-logo">
            <span className="logo-text">Praveenkumar</span><span className="logo-accent">.</span>
          </a>

          <nav className="nav-pills" aria-label="Main Navigation">
            <div className="nav-indicator"></div>
            <a href="#hero" className="nav-pill active" id="pill-home">Home</a>
            <a href="#about" className="nav-pill" id="pill-work">About</a>
            <a href="#projects" className="nav-pill" id="pill-projects">Projects</a>
            <a href="#interests" className="nav-pill" id="pill-interests">Interests</a>
            <a href="#contact" className="nav-pill" id="pill-contact">Contact</a>
          </nav>

          <a href="/resume.html" className="nav-resume-btn" id="nav-resume-btn" target="_blank" rel="noopener noreferrer">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>Resume</span>
          </a>

          <button 
            className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`} 
            aria-label="Toggle Menu" 
            aria-expanded={isMenuOpen} 
            id="mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${isMenuOpen ? 'active' : ''}`} id="mobile-drawer">
        <nav className="mobile-nav">
          <a href="#hero" className="mobile-link active" data-index="0" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#about" className="mobile-link" data-index="1" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#projects" className="mobile-link" data-index="2" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#interests" className="mobile-link" data-index="3" onClick={() => setIsMenuOpen(false)}>Interests</a>
          <a href="#contact" className="mobile-link" data-index="4" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <a href="/resume.html" className="mobile-resume-btn" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
            <i className="fa-solid fa-arrow-up-right-from-square"></i> View Resume
          </a>
        </nav>
      </div>
    </>
  );
}

// 3. Rotating Headline Tagline Component
function RotatingText() {
  const [index, setIndex] = useState(0);
  const words = ['Developer.', 'Analyst.', 'Problem Solver.', 'Thinker.', 'Creator.'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-rotating-text">
      {words.map((word, idx) => {
        let className = "rotating-word";
        if (idx === index) className += " active";
        else if (idx === (index - 1 + words.length) % words.length) className += " exit";
        return <span key={word} className={className}>{word}</span>;
      })}
    </div>
  );
}

// 4. Projects Section Accordion Component
function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="projects" id="projects">
      <div className="parallax-text" data-speed="-0.18">WORK</div>
      <div className="liquid-glass-blob blob-projects"></div>
      <div className="liquid-glass-blob blob-projects-2"></div>
      <div className="liquid-glass-blob blob-projects-3"></div>
      <div className="section-container">
        <div className="section-header">
          <span className="tagline">// CREATIVE WORKS</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div className="projects-accordion">
          {PROJECTS.map((proj, idx) => (
            <div 
              key={proj.id}
              className={`accordion-item ${activeProject === idx ? 'active' : ''}`}
              onMouseEnter={() => {
                if (window.innerWidth > 820) {
                  setActiveProject(idx);
                }
              }}
              onClick={() => {
                setActiveProject(idx);
                if (window.innerWidth <= 820) {
                  const element = document.getElementById(`proj-${idx}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              id={`proj-${idx}`}
            >
              <div className="accordion-content">
                <div className="project-bg-image" style={{ backgroundImage: `url(${proj.imageUrl})` }}></div>
                <div className="accordion-details">
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <div className="project-tech">
                    {proj.tags.map(t => <span key={t}>{t}</span>)}
                  </div>
                  <div className="project-links">
                    {proj.demoUrl && (
                      <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
                        <span>Live Demo</span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    )}
                    {proj.sourceUrl && (
                      <a href={proj.sourceUrl} target="_blank" rel="noopener noreferrer" className="proj-link" style={{ marginLeft: '12px' }}>
                        <span>Source Code</span>
                        <i className="fa-brands fa-github"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestones Subsection */}
        <div className="achievements-section">
          <h3 className="subsection-title">Key Milestones & Achievements</h3>
          <div className="achievements-grid">
            <div className="achievement-card">
              <i className="fa-solid fa-code"></i>
              <h4>Full-Stack MERN</h4>
              <p>Built multiple scalable, secure full-stack web applications utilizing the MERN stack with modern authentication and state management.</p>
            </div>
            <div className="achievement-card">
              <i className="fa-solid fa-brain"></i>
              <h4>AI & ML Projects</h4>
              <p>Participated in specialized AI workshops, training neural networks and CNN risk models using Python and TensorFlow.</p>
            </div>
            <div className="achievement-card">
              <i className="fa-solid fa-graduation-cap"></i>
              <h4>Academic Pursuits</h4>
              <p>Currently pursuing B.Tech in Computer Science Engineering at RGUKT, building baseline database and network designs.</p>
            </div>
            <div className="achievement-card">
              <i className="fa-solid fa-rocket"></i>
              <h4>Continuous Learning</h4>
              <p>Active developer constantly researching modern frameworks, SaaS architectures, cloud platforms, and data analytics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. Interests Section Accordion Component
function InterestsSection() {
  const [activeInterest, setActiveInterest] = useState(0);

  return (
    <section className="beyond-code" id="interests">
      <div className="parallax-text" data-speed="0.14">PASSIONS</div>
      <div className="liquid-glass-blob blob-beyond"></div>
      <div className="section-container">
        <div className="section-header">
          <span className="tagline">// MY PASSIONS</span>
          <h2 className="section-title">Beyond The Code</h2>
        </div>

        <div className="interests-accordion">
          {INTERESTS.map((interest, idx) => (
            <div 
              key={interest.title}
              className={`interest-accordion-item ${activeInterest === idx ? 'active' : ''}`}
              onMouseEnter={() => {
                if (window.innerWidth > 820) {
                  setActiveInterest(idx);
                }
              }}
              onClick={() => {
                setActiveInterest(idx);
                if (window.innerWidth <= 820) {
                  const element = document.getElementById(`interest-${idx}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              id={`interest-${idx}`}
            >
              <div className="interest-accordion-content">
                <div className="project-bg-image" style={{ backgroundImage: `url(${interest.imageUrl})` }}></div>
                <div className="interest-details">
                  <h3>{interest.title}</h3>
                  <p>{interest.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. Contact Form Component
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState({ text: '', type: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setForm({ name: '', email: '', message: '' });
      setFeedback({ text: `Thank you, ${form.name}! Your message has been sent successfully.`, type: 'success' });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0056ff', '#4f3beb', '#00f0ff']
      });

      setTimeout(() => {
        setFeedback({ text: '', type: '' });
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleContactSubmit}>
        <div className="form-row">
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              id="name" 
              required 
              placeholder=" " 
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoComplete="name"
            />
            <label htmlFor="name">Your Name</label>
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              id="email" 
              required 
              placeholder=" " 
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
            <label htmlFor="email">Your Email</label>
          </div>
        </div>
        <div className="form-group">
          <textarea 
            name="message" 
            id="message" 
            rows={5} 
            required 
            placeholder=" "
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>
          <label htmlFor="message">Your Message</label>
        </div>
        <button type="submit" className="submit-btn" disabled={isSending}>
          <span>{isSending ? 'Sending...' : 'Send Message'}</span>
          <i className={isSending ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-paper-plane'}></i>
        </button>
      </form>
      {feedback.text && (
        <div className={`form-feedback ${feedback.type}`}>
          {feedback.text}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APPLICATION COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {

  useEffect(() => {
    let lenisInstance: any = null;
    let handleScrollHeader: any = null;
    let handleScrollSpy: any = null;
    let handleResizeIndicator: any = null;
    let handleMouseMoveHeading: any = null;
    let handleMouseMoveAboutTitle: any = null;
    let updateProgress: any = null;
    let updateGeoParallax: any = null;
    let observer: IntersectionObserver | null = null;

    // 1. Lenis Smooth Scroll
    // @ts-ignore
    if (typeof Lenis !== 'undefined') {
      // @ts-ignore
      lenisInstance = new Lenis({
        duration: 1.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1.2,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        if (lenisInstance) lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // @ts-ignore
      if (typeof ScrollTrigger !== 'undefined') {
        // @ts-ignore
        ScrollTrigger.update();
        // @ts-ignore
        lenisInstance.on('scroll', () => ScrollTrigger.update());
      }
    }

    // 2. Header Scroll Effect
    const header = document.querySelector('.header');
    handleScrollHeader = () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScrollHeader, { passive: true });

    // 3. Navigation Scroll Spy & Indicator
    const sections = document.querySelectorAll('section[id]');
    const navPills = document.querySelectorAll('.nav-pill');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const indicator = document.querySelector('.nav-indicator') as HTMLElement;
    const track = document.querySelector('.nav-pills') as HTMLElement;

    let activePill = document.querySelector('.nav-pill.active') || navPills[0];

    const animateIndicator = (target: Element | null) => {
      if (!target || !indicator || !track) return;
      const trackRect = track.getBoundingClientRect();
      const pillRect = target.getBoundingClientRect();
      const x = pillRect.left - trackRect.left;
      const y = pillRect.top - trackRect.top;

      // @ts-ignore
      if (typeof gsap !== 'undefined') {
        // @ts-ignore
        gsap.to(indicator, {
          x: x,
          y: y,
          width: pillRect.width,
          height: pillRect.height,
          duration: 0.52,
          ease: 'power4.out',
          overwrite: 'auto'
        });
      }
    };

    const updateActivePill = (newPill: Element) => {
      if (!newPill || newPill === activePill) return;
      activePill.classList.remove('active');
      newPill.classList.add('active');
      activePill = newPill;
      if (!track?.classList.contains('is-hovered')) {
        animateIndicator(activePill);
      }
    };

    // Pre-cache nav pills to eliminate querying inside the scroll listener
    const pillMap = new Map<string, Element>();
    sections.forEach(sec => {
      const id = sec.getAttribute('id');
      if (id) {
        const pill = document.querySelector(`.nav-pill[href="#${id}"]`);
        if (pill) pillMap.set(id, pill);
      }
    });

    handleScrollSpy = () => {
      const scrollY = window.scrollY;
      sections.forEach(current => {
        const height = (current as HTMLElement).offsetHeight;
        const top = (current as HTMLElement).offsetTop - 120;
        const id = current.getAttribute('id');
        if (id && scrollY > top && scrollY <= top + height) {
          const pill = pillMap.get(id);
          if (pill) updateActivePill(pill);
          mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    navPills.forEach(pill => {
      pill.addEventListener('mouseenter', () => {
        track?.classList.add('is-hovered');
        animateIndicator(pill);
      });
    });

    track?.addEventListener('mouseleave', () => {
      track?.classList.remove('is-hovered');
      animateIndicator(activePill);
    });

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleResizeIndicator = () => animateIndicator(activePill);
    window.addEventListener('resize', handleResizeIndicator);
    setTimeout(() => animateIndicator(activePill), 400);

    // 4. ParticleSwarm background rendered via React Three Fiber Component instead of 2D canvas

    // 5. Section Reveal Observer (Optimized with unobserve)
    const revealSections = document.querySelectorAll('section[id]');
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sec = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          sec.classList.add('reveal-active');
          const delay = sec.id === 'about' ? 2200 : 600;
          
          // @ts-ignore
          if (sec.revealTimeout) clearTimeout(sec.revealTimeout);
          // @ts-ignore
          sec.revealTimeout = setTimeout(() => {
            sec.classList.add('revealed');
          }, delay);

          if (sec.id !== 'about') {
            observer?.unobserve(sec);
          }
        } else if (sec.id === 'about') {
          // @ts-ignore
          if (sec.revealTimeout) clearTimeout(sec.revealTimeout);
          sec.classList.remove('reveal-active');
          sec.classList.remove('revealed');
        }
      });
    }, { root: null, threshold: 0.05, rootMargin: '0px 0px -10px 0px' });
    revealSections.forEach(s => observer?.observe(s));

    // 6. GSAP scroll parallax triggers
    // @ts-ignore
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      // @ts-ignore
      gsap.registerPlugin(ScrollTrigger);
      // @ts-ignore
      let mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        // @ts-ignore
        gsap.to('.hero-bg-heading-wrapper', {
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
          yPercent: -20,
          xPercent: -15,
          opacity: 0.08,
          ease: 'none'
        });
        // @ts-ignore
        gsap.to('.portrait-wrapper', {
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
          yPercent: 12,
          scale: 0.92,
          opacity: 0.05,
          ease: 'none'
        });
        // @ts-ignore
        gsap.to(['.hero-left-content', '.hero-right-content'], {
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '45% top',
            scrub: 1.0,
          },
          yPercent: -35,
          opacity: 0,
          ease: 'none'
        });
        // @ts-ignore
        gsap.to('.scroll-down-hint', {
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '20% top',
            scrub: 1.0,
          },
          yPercent: -15,
          opacity: 0,
          ease: 'none'
        });
        // @ts-ignore
        gsap.to('.about-bg-title', {
          scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
          yPercent: -30,
          xPercent: -8,
          opacity: 0.1,
          ease: 'none'
        });
        // @ts-ignore
        gsap.to('.about-left', {
          scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
          yPercent: -8,
          ease: 'none'
        });
        // @ts-ignore
        gsap.to('.about-right', {
          scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
          yPercent: -8,
          ease: 'none'
        });
      });

      // Mouse Parallax text
      const bgHeading = document.querySelector('.hero-bg-heading');
      if (bgHeading) {
        let isLoaded = false;
        // @ts-ignore
        gsap.fromTo(bgHeading, 
          { x: '180px', opacity: 0 }, 
          { 
            x: '0px', 
            opacity: 0.9, 
            duration: 2.2, 
            ease: 'power4.out',
            onComplete: () => { isLoaded = true; }
          }
        );
        handleMouseMoveHeading = (e: MouseEvent) => {
          if (!isLoaded || window.innerWidth <= 768) return;
          const xPercent = (e.clientX / window.innerWidth) - 0.5;
          const yPercent = (e.clientY / window.innerHeight) - 0.5;
          // @ts-ignore
          gsap.to(bgHeading, {
            x: xPercent * -40,
            y: yPercent * -20,
            duration: 1.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        };
        window.addEventListener('mousemove', handleMouseMoveHeading);
      }

      // About background title mouse move
      const aboutBgTitle = document.querySelector('.about-bg-title');
      if (aboutBgTitle) {
        handleMouseMoveAboutTitle = (e: MouseEvent) => {
          const xPercent = (e.clientX / window.innerWidth) - 0.5;
          const yPercent = (e.clientY / window.innerHeight) - 0.5;
          // @ts-ignore
          gsap.to(aboutBgTitle, {
            x: xPercent * -30,
            y: yPercent * -15,
            duration: 1.4,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        };
        window.addEventListener('mousemove', handleMouseMoveAboutTitle);
      }

      // Mood board pins GSAP Parallax
      const pinParallaxConfigs = [
        { selector: '.pin-films', yPercent: -45, rotate: -3 },
        { selector: '.pin-posters', yPercent: -60, rotate: 2 },
        { selector: '.pin-chess', yPercent: 40, rotate: -1.5 },
        { selector: '.pin-literature', yPercent: -50, rotate: 1 },
        { selector: '.pin-writing', yPercent: -55, rotate: -2 },
        { selector: '.pin-dev', yPercent: -30, rotate: 1.5 }
      ];
      pinParallaxConfigs.forEach(config => {
        const pin = document.querySelector(config.selector);
        if (pin) {
          // @ts-ignore
          gsap.set(pin, { rotation: config.rotate });
          // @ts-ignore
          gsap.to(pin, {
            scrollTrigger: {
              trigger: pin,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            },
            yPercent: config.yPercent,
            ease: 'none'
          });
        }
      });
    }

    // 7. Scroll progress indicator bar
    const progressBar = document.getElementById('scrollProgressBar');
    updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBar) progressBar.style.width = scrollPercent + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // 9. Scroll Geo Parallax (shapes)
    const shapes = document.querySelectorAll('.geo-shape');
    const shapeData = Array.from(shapes).map(el => {
      const speed = parseFloat((el as HTMLElement).dataset.speed || '0.05');
      return { el: el as HTMLElement, speed };
    });
    updateGeoParallax = () => {
      const scrollY = window.scrollY;
      shapeData.forEach(({ el, speed }) => {
        const yOffset = scrollY * speed;
        const rotation = scrollY * speed * 0.3;
        el.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
      });
    };
    window.addEventListener('scroll', updateGeoParallax, { passive: true });
    updateGeoParallax();

    // 10. Smooth Scrolling anchor link transitions
    document.querySelectorAll('.nav-pill, .mobile-link, .scroll-btn, .nav-logo').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (e.currentTarget as HTMLElement).getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const offset = targetId === '#hero' ? 0 : -75;
          const targetY = targetSection.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
        }
      });
    });

    // Cleanup
    return () => {
      if (handleScrollHeader) window.removeEventListener('scroll', handleScrollHeader);
      if (handleScrollSpy) window.removeEventListener('scroll', handleScrollSpy);
      if (handleResizeIndicator) window.removeEventListener('resize', handleResizeIndicator);
      if (handleMouseMoveHeading) window.removeEventListener('mousemove', handleMouseMoveHeading);
      if (handleMouseMoveAboutTitle) window.removeEventListener('mousemove', handleMouseMoveAboutTitle);
      if (updateProgress) window.removeEventListener('scroll', updateProgress);
      if (updateGeoParallax) window.removeEventListener('scroll', updateGeoParallax);
      if (observer) observer.disconnect();
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-bar" id="scrollProgressBar"></div>

      {/* Theme Accent Switcher */}
      <ThemeSwitcher />

      {/* Ambient Glowing Spheres Background */}
      <div className="ambient-bg">
        {/* Pinterest-Inspired Organic Gradient Blobs */}
        <div className="pinterest-blobs-layer">
          <div className="pinterest-blob blob-peach"></div>
          <div className="pinterest-blob blob-amber"></div>
          <div className="pinterest-blob blob-plum"></div>
          <div className="pinterest-blob blob-slate"></div>
        </div>

        {/* Designer Drafting Dot Grid Pattern */}
        <div className="pinterest-dot-grid"></div>

        {/* Pinterest-Style Floating Passion Pins (Mood Board) */}
        <div className="pinterest-mood-board">
          {/* Pin 1: Films */}
          <div className="pinterest-pin pin-films" style={{ top: '18vh', left: '6%' }}>
            <div className="pin-inner">
              <div className="pin-header">
                <span className="pin-dot"></span>
                <span className="pin-label">mood.01 // films</span>
              </div>
              <svg className="pin-svg" viewBox="0 0 100 120" fill="none" stroke="currentColor">
                <rect x="10" y="10" width="80" height="80" rx="6" strokeWidth="1.2" opacity="0.6" />
                <circle cx="50" cy="50" r="24" strokeWidth="1.2" />
                <circle cx="50" cy="50" r="8" strokeDasharray="2,2" strokeWidth="1" />
                <line x1="10" y1="98" x2="90" y2="98" strokeWidth="1" opacity="0.4" />
                <rect x="15" y="15" width="6" height="8" rx="1" strokeWidth="0.8" opacity="0.4" />
                <rect x="79" y="15" width="6" height="8" rx="1" strokeWidth="0.8" opacity="0.4" />
                <rect x="15" y="77" width="6" height="8" rx="1" strokeWidth="0.8" opacity="0.4" />
                <rect x="79" y="77" width="6" height="8" rx="1" strokeWidth="0.8" opacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Pin 2: Poster Design */}
          <div className="pinterest-pin pin-posters" style={{ top: '90vh', right: '8%' }}>
            <div className="pin-inner">
              <div className="pin-header">
                <span className="pin-dot"></span>
                <span className="pin-label">design.02 // grid</span>
              </div>
              <svg className="pin-svg" viewBox="0 0 100 140" fill="none" stroke="currentColor">
                <rect x="10" y="10" width="80" height="120" rx="4" strokeWidth="1.2" opacity="0.6" />
                <line x1="25" y1="10" x2="25" y2="130" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.4" />
                <line x1="50" y1="10" x2="50" y2="130" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.4" />
                <line x1="75" y1="10" x2="75" y2="130" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.4" />
                <text x="32" y="45" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="28" fill="currentColor" opacity="0.8">P</text>
                <text x="52" y="75" fontFamily="'Outfit', sans-serif" fontWeight="300" fontSize="22" fill="currentColor" opacity="0.6">P</text>
                <rect x="32" y="90" width="40" height="4" fill="currentColor" opacity="0.4" />
                <rect x="32" y="100" width="25" height="2" fill="currentColor" opacity="0.3" />
                <circle cx="25" cy="25" r="4" fill="currentColor" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* Pin 3: Chess */}
          <div className="pinterest-pin pin-chess" style={{ top: '165vh', left: '8%' }}>
            <div className="pin-inner">
              <div className="pin-header">
                <span className="pin-dot"></span>
                <span className="pin-label">logic.03 // chess</span>
              </div>
              <svg className="pin-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <rect x="10" y="10" width="80" height="80" rx="3" strokeWidth="1.2" opacity="0.6" />
                <line x1="30" y1="10" x2="30" y2="90" strokeWidth="0.8" opacity="0.3" />
                <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.8" opacity="0.3" />
                <line x1="70" y1="10" x2="70" y2="90" strokeWidth="0.8" opacity="0.3" />
                <line x1="10" y1="30" x2="90" y2="30" strokeWidth="0.8" opacity="0.3" />
                <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.8" opacity="0.3" />
                <line x1="10" y1="70" x2="90" y2="70" strokeWidth="0.8" opacity="0.3" />
                <circle cx="40" cy="40" r="5" strokeWidth="1.2" fill="currentColor" opacity="0.8" />
                <circle cx="60" cy="60" r="5" strokeWidth="1.2" />
                <circle cx="20" cy="20" r="3" strokeWidth="1" fill="currentColor" opacity="0.8" />
                <circle cx="80" cy="80" r="3" strokeWidth="1" />
                <path d="M 40 40 Q 50 20 80 80" strokeWidth="1" strokeDasharray="3,3" stroke="currentColor" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* Pin 4: Literature */}
          <div className="pinterest-pin pin-literature" style={{ top: '245vh', right: '6%' }}>
            <div className="pin-inner">
              <div className="pin-header">
                <span className="pin-dot"></span>
                <span className="pin-label">lore.04 // books</span>
              </div>
              <svg className="pin-svg" viewBox="0 0 100 120" fill="none" stroke="currentColor">
                <path d="M 50 90 C 35 90 20 80 15 75 L 15 25 C 20 30 35 40 50 40 C 65 40 80 30 85 25 L 85 75 C 80 80 65 90 50 90 Z" strokeWidth="1.2" opacity="0.6" />
                <line x1="50" y1="40" x2="50" y2="90" strokeWidth="1.2" opacity="0.6" />
                <line x1="30" y1="18" x2="50" y2="8" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.4" />
                <line x1="50" y1="8" x2="70" y2="15" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.4" />
                <circle cx="30" cy="18" r="1.5" fill="currentColor" opacity="0.8" />
                <circle cx="50" cy="8" r="2.5" fill="currentColor" opacity="0.9" />
                <circle cx="70" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* Pin 5: Writing & Art */}
          <div className="pinterest-pin pin-writing" style={{ top: '325vh', left: '7%' }}>
            <div className="pin-inner">
              <div className="pin-header">
                <span className="pin-dot"></span>
                <span className="pin-label">art.05 // logic</span>
              </div>
              <svg className="pin-svg" viewBox="0 0 100 130" fill="none" stroke="currentColor">
                <path d="M 10 100 Q 30 20 50 80 T 90 40" strokeWidth="1.2" strokeLinecap="round" />
                <rect x="44" y="30" width="12" height="20" rx="6" strokeWidth="1.2" opacity="0.8" />
                <line x1="44" y1="40" x2="56" y2="40" strokeWidth="0.8" opacity="0.6" />
                <path d="M 40 40 C 40 52 60 52 60 40" strokeWidth="1" opacity="0.8" />
                <line x1="50" y1="52" x2="50" y2="85" strokeWidth="1.2" opacity="0.8" />
                <path d="M 35 85 L 65 85" strokeWidth="1.2" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* Pin 6: Web Dev */}
          <div className="pinterest-pin pin-dev" style={{ top: '395vh', right: '9%' }}>
            <div className="pin-inner">
              <div className="pin-header">
                <span className="pin-dot"></span>
                <span className="pin-label">code.06 // stack</span>
              </div>
              <svg className="pin-svg" viewBox="0 0 100 110" fill="none" stroke="currentColor">
                <rect x="10" y="10" width="80" height="90" rx="5" strokeWidth="1.2" opacity="0.6" />
                <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.5" />
                <circle cx="28" cy="20" r="2" fill="currentColor" opacity="0.5" />
                <circle cx="36" cy="20" r="2" fill="currentColor" opacity="0.5" />
                <line x1="10" y1="30" x2="90" y2="30" strokeWidth="1" opacity="0.4" />
                <line x1="50" y1="45" x2="30" y2="65" strokeWidth="0.8" opacity="0.5" />
                <line x1="50" y1="45" x2="70" y2="65" strokeWidth="0.8" opacity="0.5" />
                <line x1="30" y1="65" x2="30" y2="85" strokeWidth="0.8" opacity="0.5" />
                <circle cx="50" cy="45" r="4" strokeWidth="1.2" fill="currentColor" opacity="0.8" />
                <circle cx="30" cy="65" r="3" strokeWidth="1" />
                <circle cx="70" cy="65" r="3" strokeWidth="1" />
                <circle cx="30" cy="85" r="2" strokeWidth="0.8" fill="currentColor" opacity="0.6" />
              </svg>
            </div>
          </div>
        </div>



        {/* Cinematic Noise Texture Overlay */}
        <div className="noise-overlay"></div>

        {/* Scroll-Animated Floating Geometric Background Elements */}
        <div className="scroll-geo-layer" id="scrollGeoLayer">
          <svg className="geo-shape geo-ring" data-speed="0.08" style={{ top: '12vh', left: '8%' }} viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.12" strokeDasharray="8,6" />
          </svg>
          <svg className="geo-shape geo-ring" data-speed="-0.06" style={{ top: '55vh', right: '6%' }} viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
            <circle cx="80" cy="80" r="40" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.06" strokeDasharray="4,8" />
          </svg>
          <svg className="geo-shape geo-ring" data-speed="0.12" style={{ top: '140vh', left: '5%' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.10" strokeDasharray="12,4" />
          </svg>
          <svg className="geo-shape geo-ring" data-speed="-0.09" style={{ top: '280vh', right: '10%' }} viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="60" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.07" />
          </svg>
          <svg className="geo-shape geo-cross" data-speed="0.10" style={{ top: '35vh', right: '14%' }} viewBox="0 0 40 40">
            <line x1="20" y1="5" x2="20" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.15" />
            <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.15" />
          </svg>
          <svg className="geo-shape geo-cross" data-speed="-0.07" style={{ top: '110vh', left: '12%' }} viewBox="0 0 30 30">
            <line x1="15" y1="3" x2="15" y2="27" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />
            <line x1="3" y1="15" x2="27" y2="15" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />
          </svg>
        </div>
      </div>

      {/* Header & Navigation */}
      <HeaderAndNav />

      <main>
        {/* Hero Section */}
        <section className="hero" id="hero">
          <div className="hero-container">
            {/* Left content */}
            <div className="hero-left-content">
              <div className="hero-top-text">
                <h1 className="hero-greeting">
                  <span className="greeting-hi">Hi</span> <span className="greeting-im">I'm</span>
                </h1>
                <h2 className="hero-name">
                  <span className="name-first">Praveenkumar</span> <span className="name-last">Pamisetty</span>
                </h2>
              </div>
              <div className="hero-mobile-roles">
                <span className="role-pill">Web Developer</span>
                <span className="role-pill-separator">•</span>
                <span className="role-pill">Data Analyst</span>
              </div>
              <p className="hero-description-text">
                I blend structured software engineering with data analytics to build immersive, responsive web experiences. Specializing in MERN stack development and machine learning integrations.
              </p>
              <div className="hero-cta">
                <a href="/resume.html" className="hero-resume-btn" target="_blank" rel="noopener noreferrer">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  <span>View Resume</span>
                </a>
                <a href="#projects" className="hero-projects-btn">
                  <i className="fa-solid fa-briefcase"></i>
                  <span>View Projects</span>
                </a>
              </div>
            </div>

            {/* Portrait background wrapper */}
            <div className="hero-bg-heading-wrapper">
              <div className="hero-bg-heading">PORTFOLIO</div>
            </div>
            <div className="hero-portrait-layer">
              <div className="portrait-wrapper">
                <div className="portrait-glow"></div>
                <div className="portrait-arc"></div>
                <img src={heroImage} alt="Praveenkumar Pamisetty Portrait" className="portrait-image" />
              </div>
            </div>

            {/* Right typography */}
            <div className="hero-right-content">
              <span className="role-tag">WEB DEVELOPER &</span>
              <div className="role-main">
                <span className="role-word">DATA</span>
                <span className="role-word">ANALYST</span>
              </div>
            </div>
          </div>

          <div className="scroll-down-hint">
            <a href="#about" className="scroll-btn" aria-label="Scroll Down">
              <span className="scroll-mouse"><span className="scroll-wheel"></span></span>
              <span className="scroll-text">SCROLL DOWN</span>
            </a>
          </div>
        </section>

        {/* About Section */}
        <section className="about" id="about">
          <div className="about-bg-title-wrapper">
            <div className="about-bg-title">ABOUT ME</div>
          </div>

          <div className="about-left">
            <div className="about-portrait-wrap">
              <div className="about-arc"></div>
              <div className="about-orb"></div>
              <img src={heroImage} alt="Praveenkumar Pamisetty Profile" className="about-portrait" />
            </div>
          </div>

          <div className="about-container">
            <div className="about-spacer"></div>
            <div className="about-right">
              <div className="about-heading-row">
                <div className="about-title-block">
                  <div className="about-title-line1">ABOUT</div>
                  <div className="about-title-line2">ME.</div>
                </div>
                <div className="about-tagline-block">
                  <RotatingText />
                  <span className="about-tagline-bar"></span>
                </div>
              </div>

              <p className="about-para">
                I'm a Computer Science undergraduate who loves building intelligent systems and beautiful experiences. I specialize in Full Stack Development (MERN Stack) and Machine Learning networks, turning complex technical challenges into simple, human-centered solutions.
              </p>

              <div className="about-skill-cards">
                <div className="about-skill-card">
                  <i className="fa-solid fa-code about-skill-icon"></i>
                  <h4>DEVELOPMENT</h4>
                  <p>Building clean, scalable full-stack web applications and interactive systems.</p>
                </div>
                <div className="about-skill-card">
                  <i className="fa-solid fa-brain about-skill-icon"></i>
                  <h4>AI / ML</h4>
                  <p>Designing neural risk assessment and predictive models that adapt and scale.</p>
                </div>
                <div className="about-skill-card">
                  <i className="fa-solid fa-chart-simple about-skill-icon"></i>
                  <h4>ANALYTICS</h4>
                  <p>Translating complex business metrics into intuitive data visualizations.</p>
                </div>
                <div className="about-skill-card">
                  <i className="fa-solid fa-chess-knight about-skill-icon"></i>
                  <h4>STRATEGY</h4>
                  <p>Logical and strategic thinking that shapes the way I build software nodes.</p>
                </div>
              </div>

              <div className="about-quote">
                <span className="about-quote-mark">&ldquo;</span>
                <p>Whether I'm training a model, designing an interface, or coding an API route—I love the process of thinking deeply and architecting modular precision.</p>
                <div className="about-quote-dots">
                  <span></span><span></span><span></span>
                  <span></span><span></span><span></span>
                  <span></span><span></span><span></span>
                </div>
              </div>

              {/* Stats */}
              <div className="about-stats">
                <div className="about-stat">
                  <span className="about-stat-num">6+</span>
                  <span className="about-stat-label">PROJECTS</span>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat">
                  <span className="about-stat-num">3+</span>
                  <span className="about-stat-label">YEARS DEV</span>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat">
                  <span className="about-stat-num">12+</span>
                  <span className="about-stat-label">TECH SKILLS</span>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat">
                  <span className="about-stat-num">∞</span>
                  <span className="about-stat-label">CURIOSITY</span>
                </div>
              </div>

              {/* Spoken Languages */}
              <div className="about-languages">
                <h4 className="about-languages-title"><i className="fa-solid fa-language"></i> Languages I Speak</h4>
                <div className="about-languages-grid">
                  <div className="about-lang-item">
                    <span className="about-lang-name">Telugu</span>
                    <span className="about-lang-bar native"></span>
                    <span className="about-lang-level">Native</span>
                  </div>
                  <div className="about-lang-item">
                    <span className="about-lang-name">English</span>
                    <span className="about-lang-bar fluent"></span>
                    <span className="about-lang-level">Fluent</span>
                  </div>
                  <div className="about-lang-item">
                    <span className="about-lang-name">Hindi</span>
                    <span className="about-lang-bar fluent"></span>
                    <span className="about-lang-level">Fluent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills" id="skills">
          <div className="parallax-text" data-speed="0.12">SKILLS</div>
          <div className="liquid-glass-blob blob-skills"></div>
          <div className="liquid-glass-blob blob-skills-2"></div>
          <ParticleSwarmBackground />
          <div className="section-container">
            <div className="section-header">
              <span className="tagline">// EXPERTISE</span>
              <h2 className="section-title">Skills & Technologies</h2>
            </div>

            <div className="skills-grid">
              <div className="skills-card">
                <div className="skills-header">
                  <i className="fa-solid fa-code"></i>
                  <h3>Programming Languages</h3>
                </div>
                <div className="skills-tags">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Java</span>
                  <span className="skill-tag">C</span>
                  <span className="skill-tag">JavaScript</span>
                </div>
              </div>

              <div className="skills-card">
                <div className="skills-header">
                  <i className="fa-solid fa-globe"></i>
                  <h3>Web Development</h3>
                </div>
                <div className="skills-tags">
                  <span className="skill-tag">HTML</span>
                  <span className="skill-tag">CSS</span>
                  <span className="skill-tag">React.js</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Express.js</span>
                  <span className="skill-tag">Tailwind CSS</span>
                </div>
              </div>

              <div className="skills-card">
                <div className="skills-header">
                  <i className="fa-solid fa-database"></i>
                  <h3>Databases</h3>
                </div>
                <div className="skills-tags">
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">SQL</span>
                </div>
              </div>

              <div className="skills-card">
                <div className="skills-header">
                  <i className="fa-solid fa-brain"></i>
                  <h3>Machine Learning</h3>
                </div>
                <div className="skills-tags">
                  <span className="skill-tag">TensorFlow</span>
                  <span className="skill-tag">Scikit-Learn</span>
                  <span className="skill-tag">NumPy</span>
                  <span className="skill-tag">Pandas</span>
                </div>
              </div>

              <div className="skills-card">
                <div className="skills-header">
                  <i className="fa-solid fa-toolbox"></i>
                  <h3>Tools & Platforms</h3>
                </div>
                <div className="skills-tags">
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">GitHub</span>
                  <span className="skill-tag">Jupyter Notebook</span>
                  <span className="skill-tag">VS Code</span>
                  <span className="skill-tag">Power BI</span>
                  <span className="skill-tag">Tableau</span>
                </div>
              </div>

              <div className="skills-card">
                <div className="skills-header">
                  <i className="fa-solid fa-network-wired"></i>
                  <h3>Core Concepts</h3>
                </div>
                <div className="skills-tags">
                  <span className="skill-tag">Data Structures</span>
                  <span className="skill-tag">Algorithms</span>
                  <span className="skill-tag">DBMS</span>
                  <span className="skill-tag">Operating Systems</span>
                  <span className="skill-tag">Computer Networks</span>
                  <span className="skill-tag">REST APIs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <ProjectsSection />

        {/* Interests Section */}
        <InterestsSection />

        {/* Contact Section */}
        <section className="contact" id="contact">
          <div className="parallax-text" data-speed="-0.12">CONNECT</div>
          <div className="liquid-glass-blob blob-contact"></div>
          <div className="liquid-glass-blob blob-contact-2"></div>
          <div className="section-container">
            <div className="section-header">
              <span className="tagline">// LET'S COLLABORATE</span>
              <h2 className="section-title">Get In Touch</h2>
            </div>

            <div className="contact-grid">
              <div className="contact-info">
                <h3>Let's start a conversation</h3>
                <p className="contact-intro">I'm currently open to internship, full-time positions, and collaborative projects. Whether you want to discuss a new software idea, machine learning, or just say hello, drop me a message!</p>

                <div className="contact-methods">
                  <div className="method-card">
                    <i className="fa-solid fa-envelope"></i>
                    <div className="method-details">
                      <span>EMAIL ME</span>
                      <a href="mailto:praveenpamisetty@gmail.com">praveenpamisetty@gmail.com</a>
                    </div>
                  </div>
                  <div className="method-card">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="method-details">
                      <span>LOCATION</span>
                      <span>Jammalamadugu, AP, India</span>
                    </div>
                  </div>
                </div>

                <div className="social-links">
                  <a href="https://github.com/Praveenkumar-999" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                  <a href="https://linkedin.com/in/praveenpamisetty" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
                  <a href="mailto:praveenpamisetty@gmail.com" aria-label="Email"><i className="fa-solid fa-envelope"></i></a>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="footer-logo">Praveenkumar Pamisetty</span>
            <p>Designing digital paths through code and data analytics.</p>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Praveenkumar Pamisetty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
