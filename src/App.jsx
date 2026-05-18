import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Settings, 
  Smartphone, 
  Monitor, 
  Database, 
  LayoutDashboard, 
  Cloud, 
  Users,
  BookOpen,
  ChevronRight,
  ExternalLink,
  FileText,
  TrendingUp,
  ShieldAlert,
  GraduationCap,
  Globe,
  Key
} from 'lucide-react';

// --- STUNNING INLINE VEKTOR COFFEE BEAN ICON ---
const CoffeeBeanIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    className={className}
  >
    {/* Elegant tilted coffee bean shape */}
    <ellipse cx="12" cy="12" rx="9" ry="6.2" transform="rotate(-45 12 12)" />
    {/* Classic organic wave center crease */}
    <path d="M6 18c3.2-3.2 4.8-1.2 7.8-4.2s2.8-5 3.8-7.8" strokeLinecap="round" />
  </svg>
);

// --- CONTENT DATA ---
const PROJECT_INFO = {
  title: "BREWHA",
  subtitle: "Integrated POS, Inventory Management, and Online Ordering System for a Campus Coffee Kiosk",
  course: "ISTR21 213 - E-COMMERCE | System Proposal",
  date: "May 2026",
  proponents: [
    { name: "Camisora, Nicole O.", role: "Documentation Lead", id: "20241520" },
    { name: "Flores, Wendel N.", role: "Project Leader", id: "20241659" },
    { name: "Jabuhat, Al Clent N.", role: "QA / Tester", id: "20241519" },
    { name: "Oquias, Rhea Mae E.", role: "Researcher", id: "20241518" },
    { name: "Rojas, Earl Ritche T.", role: "System Analyst", id: "20241575" },
    { name: "Saldua, Jaderic T.", role: "Researcher", id: "20241705" }
  ]
};

const SYSTEM_LINKS = [
  { 
    label: "Online Storefront", 
    url: "https://brewha-cafe.web.app/", 
    icon: Smartphone, 
    desc: "Student & Faculty Web App", 
    type: "primary",
    creds: { user: "20241659", pass: "pass123", userLabel: "Student ID" }
  },
  { 
    label: "POS Terminal", 
    url: "https://brewha-cafe.web.app/pos.html", 
    icon: Monitor, 
    desc: "Cashier System", 
    type: "secondary",
    creds: { user: "pos", pass: "pass123", userLabel: "Username" }
  },
  { 
    label: "Admin Console", 
    url: "https://brewha-cafe.web.app/admin.html", 
    icon: LayoutDashboard, 
    desc: "Inventory & Sales Management", 
    type: "tertiary",
    creds: { user: "admin", pass: "pass123", userLabel: "Username" }
  },
  { 
    label: "Network Proposal", 
    url: "https://brewha-network.web.app/", 
    icon: Globe, 
    desc: "Infrastructure Design", 
    type: "network" 
  },
  { 
    label: "Full Research Paper", 
    url: "https://docs.google.com/document/d/1-AB60GtsIEoXuQAvhx9g9IcFGxvRbUWwzMM6J3Aila8/edit?usp=sharing", 
    icon: FileText, 
    desc: "Google Drive Document", 
    type: "paper" 
  }
];

const SECTIONS = [
  { id: 'introduction', label: 'Introduction & Background' },
  { id: 'problem-statement', label: 'Problem Statement' },
  { id: 'objectives', label: 'Objectives of the Study' },
  { id: 'scope-limitations', label: 'Scope & Limitations' },
  { id: 'significance', label: 'Significance of the Study' },
  { id: 'methodology', label: 'System Methodology' },
  { id: 'features', label: 'Features & Modules' },
  { id: 'references', label: 'References' },
  { id: 'team', label: 'Project Team' },
];

// --- ANIMATION HOOK ---
const useScrollFade = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.05 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return [domRef, isVisible];
};

// --- COMPONENTS ---
const FadeInSection = ({ children, delay = "delay-0", className = "" }) => {
  const [ref, isVisible] = useScrollFade();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? `opacity-100 translate-y-0 ${delay}` : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  // Inspector Lock Logic
  const [isBusted, setIsBusted] = useState(false);

  useEffect(() => {
    const triggerRedirect = () => {
      setIsBusted(true);

      // Redirect after detection
      window.location.href = "https://brewha-documentation.web.app/";
    };

    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          ["I", "i", "J", "j", "C", "c"].includes(e.key)) ||
        (e.ctrlKey && ["U", "u"].includes(e.key))
      ) {
        e.preventDefault();
        triggerRedirect();
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerRedirect();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 250; // Offset for headers

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-amber-200 selection:text-stone-900">
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-[#FDFBF7]/95 backdrop-blur-md z-50 border-b border-stone-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-[#2d1b10] text-xl tracking-tight">
          <CoffeeBeanIcon className="w-6 h-6 text-amber-700" />
          <span>BREWHA Docs</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 text-stone-600 hover:text-[#2d1b10] hover:bg-stone-100 rounded-lg transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Elegant Backdrop Layer when Mobile Menu is Open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Responsive Grid/Flex Layout */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto pt-16 lg:pt-0">
        
        {/* Sidebar Navigation */}
        <aside className={`
          fixed lg:sticky top-0 lg:top-8 h-[calc(100vh-2rem)] w-72 p-6 lg:bg-transparent bg-white lg:border-none border-r border-stone-200
          transition-transform duration-300 ease-in-out z-40 overflow-y-auto shrink-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="hidden lg:flex flex-col items-start gap-1 font-bold text-stone-900 tracking-tight mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2d1b10] text-white mb-3 shadow-lg hover:rotate-12 transition-transform duration-300 cursor-pointer">
              <CoffeeBeanIcon className="w-8 h-8 text-amber-500" />
            </div>
            <div className="text-2xl tracking-wide font-extrabold text-[#2d1b10]">BREWHA</div>
            <div className="text-xs text-stone-400 tracking-widest uppercase font-mono">ECOMMERCE PROPOSAL</div>
          </div>
          
          <nav className="space-y-1 mb-8">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-3 px-3">Sections</h3>
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-amber-100/50 text-amber-900 font-semibold'
                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span className="text-sm truncate">{section.label}</span>
                {activeSection === section.id && <ChevronRight size={14} className="text-amber-700 shrink-0" />}
              </button>
            ))}
          </nav>

          {/* Quick Access Sidebar Section */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-400 px-3">System Access</h3>
            <div className="space-y-1">
              {SYSTEM_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                >
                  <link.icon size={14} className="text-amber-700 shrink-0" />
                  <span className="truncate">{link.label}</span>
                  <ExternalLink size={10} className="ml-auto opacity-55 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="p-4 bg-stone-100 rounded-xl border border-stone-200/60">
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono mb-1">Presented to</p>
              <p className="text-xs text-stone-800 font-bold">Ms. Melanie Porquez</p>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono mt-3 mb-1">Course</p>
              <p className="text-xs text-stone-600 leading-tight font-medium">{PROJECT_INFO.course}</p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-12 lg:py-20 max-w-full lg:max-w-4xl overflow-hidden">
          
          {/* Hero Header */}
          <div className="mb-16 relative">
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl -z-10"></div>
            <FadeInSection>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/60 text-amber-900 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
                Official System Proposal Document
              </div>
              
              {/* Custom Branded Circular Logo Area */}
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2d1b10] text-white shadow-lg shrink-0">
                  <CoffeeBeanIcon className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2d1b10] tracking-tight leading-none mb-1">
                    {PROJECT_INFO.title}
                  </h1>
                  <p className="text-xs text-amber-800 font-bold uppercase tracking-widest font-mono">
                    Integrated Enterprise Suite
                  </p>
                </div>
              </div>

              <p className="text-lg sm:text-xl text-stone-600 font-medium leading-relaxed max-w-3xl mb-8">
                {PROJECT_INFO.subtitle}
              </p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-stone-500 font-medium pb-8 border-b border-stone-200/80">
                <span className="flex items-center gap-2"><BookOpen size={16} className="text-amber-700" /> Academic Term Project</span>
                <span className="hidden md:inline text-stone-300">|</span>
                <span className="flex items-center gap-2"><Users size={16} className="text-amber-700" /> BSIS 2 - B Proponents</span>
                <span className="hidden md:inline text-stone-300">|</span>
                <span className="flex items-center gap-2 text-stone-700 bg-amber-50 px-2.5 py-1 rounded font-mono text-xs">{PROJECT_INFO.date}</span>
              </div>
            </FadeInSection>
          </div>

          {/* SYSTEM MODULE LAUNCHPAD BLOCK */}
          <FadeInSection className="mb-20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Direct Application Portal Access</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SYSTEM_LINKS.map((link, idx) => {
                let borderTheme = "hover:border-amber-500 hover:shadow-lg hover:shadow-amber-100/50";
                let badgeColor = "bg-stone-100 text-stone-700";
                
                if (link.type === "primary") badgeColor = "bg-amber-100 text-amber-950";
                if (link.type === "secondary") badgeColor = "bg-orange-100 text-orange-950";
                if (link.type === "tertiary") badgeColor = "bg-emerald-100 text-emerald-950";
                if (link.type === "network") badgeColor = "bg-indigo-100 text-indigo-950 border border-indigo-200";
                if (link.type === "paper") badgeColor = "bg-blue-100 text-blue-950 border border-blue-200";

                return (
                  <div key={idx} className={`relative flex flex-col justify-between h-full bg-white border border-stone-200/80 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 ${borderTheme}`}>
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-stone-50 text-stone-700">
                          <link.icon size={20} className="text-stone-800" />
                        </div>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-stone-400 hover:text-[#2d1b10] transition-colors"
                          aria-label={`Open link to ${link.label}`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                      <span className={`inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded mb-2 ${badgeColor}`}>
                        {link.desc}
                      </span>
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <h4 className="font-extrabold text-stone-900 group-hover:text-amber-900 transition-colors text-sm">
                          {link.label}
                        </h4>
                      </a>
                    </div>

                    {/* Conditional Credential Box */}
                    {link.creds ? (
                      <div className="mt-4 pt-3 border-t border-stone-100 bg-stone-50/50 p-2 rounded-lg text-[11px] font-medium text-stone-600">
                        <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
                          <Key size={10} />
                          <span>Sample Login:</span>
                        </div>
                        <div className="font-mono text-[10px] space-y-0.5">
                          <div><span className="text-stone-400">{link.creds.userLabel}:</span> <span className="bg-stone-200/50 px-1 py-0.2 rounded font-bold text-stone-900">{link.creds.user}</span></div>
                          <div><span className="text-stone-400">Password:</span> <span className="bg-stone-200/50 px-1 py-0.2 rounded font-bold text-stone-900">{link.creds.pass}</span></div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 min-h-[44px] border-t border-transparent" />
                    )}
                  </div>
                );
              })}
            </div>
          </FadeInSection>

          {/* Academic Content Sections */}
          <div className="space-y-24">
            
            {/* Introduction & Background */}
            <section id="introduction" className="scroll-mt-24">
              <FadeInSection>
                <div className="flex items-center gap-4 mb-6 text-stone-900 border-b border-stone-200/80 pb-4">
                  <BookOpen className="text-amber-700" size={28} />
                  <h2 className="text-3xl font-black text-[#2d1b10] tracking-tight">Introduction & Background</h2>
                </div>
                
                <div className="text-stone-600 leading-relaxed space-y-6 text-base md:text-lg">
                  <h3 className="text-lg font-bold text-stone-800 mt-4 mb-2">Introduction</h3>
                  <p>
                    On-campus dining and food retail services represent critical operational focal points in secondary and tertiary educational ecosystems. With hundreds or thousands of students, faculty members, and administrative staff members shifting between classes within tight intervals, university-based food service kiosks operate under acute, highly consolidated demand patterns.
                  </p>
                  <p>
                    Traditional coffee shop environments depend strongly on conversational ordering, sequential queue processing, and local checkout mechanisms. However, the high-velocity requirements of university schedules demand innovative configurations of commercial touchpoints. The application of standard transactional processes during peak class intervals often leads to system delays, queue stagnation, and customer dissatisfaction.
                  </p>
                  
                  <h3 className="text-lg font-bold text-stone-800 mt-6 mb-2">Background of the Study</h3>
                  <p>
                    Within a modern collegiate landscape, digital interventions serve to optimize user utility and business continuity. Historically, the <strong>BREWHA Kiosk</strong> has managed operations through classic manual, high-touch processes. While this configuration permits immediate face-to-face interaction, it inherently limits operational scalability, restricts concurrent transactional processes, and produces fragmented structural records.
                  </p>
                  <p>
                    The proposed <strong>BREWHA Enterprise Platform</strong> represents a paradigm shift from traditional localized kiosks to a multi-tiered cloud ecosystem. By combining point-of-sale functionality with consumer-facing remote ordering channels and self-synchronizing inventory tracking, the system establishes a modernized paradigm for high-velocity campus commerce.
                  </p>
                </div>
              </FadeInSection>
            </section>

            {/* Problem Statement */}
            <section id="problem-statement" className="scroll-mt-24">
              <FadeInSection>
                <div className="flex items-center gap-4 mb-6 text-stone-900 border-b border-stone-200/80 pb-4">
                  <AlertCircle className="text-red-600" size={28} />
                  <h2 className="text-3xl font-black text-[#2d1b10] tracking-tight">Problem Statement</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-lg text-stone-600 leading-relaxed">
                    The operational constraints currently experienced by the Brewha campus kiosk stem from isolated business workflows. These challenges can be synthesized into the following structural pain points:
                  </p>

                  <div className="grid gap-4">
                    {[
                      {
                        title: "Inefficient Queue Dynamics & Peak Saturation",
                        desc: "Congestion during recess, lunchtime, and class shifts leads to long physical queues. Order capture delays bottleneck wait-times, resulting in customer abandonment.",
                        icon: ShieldAlert,
                        color: "border-l-red-500"
                      },
                      {
                        title: "Fragmented Inventory Controls",
                        desc: "Manual ingredient tallies are prone to human calculation errors. Real-time ingredient usage is not tied directly to POS checkouts, causing unannounced stockouts of critical menu items.",
                        icon: Database,
                        color: "border-l-orange-500"
                      },
                      {
                        title: "Lack of Integrated Remote Channels",
                        desc: "The kiosk operates in a localized physical-only model. Students must wait in line twice—once to place their order and once to receive it—precluding remote preorder patterns.",
                        icon: Smartphone,
                        color: "border-l-amber-500"
                      },
                      {
                        title: "Information Asymmetry in Accounting",
                        desc: "The separation of sales records, physical cash logs, and ledger items inhibits end-of-day reconciliations, leading to inaccuracies in financial and analytical reporting."
                      }
                    ].map((item, idx) => (
                      <div key={idx} className={`bg-stone-50 border-l-4 ${item.color || 'border-l-stone-400'} p-5 rounded-r-xl`}>
                        <h4 className="font-extrabold text-stone-900 text-base mb-1">{item.title}</h4>
                        <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </section>

            {/* Objectives */}
            <section id="objectives" className="scroll-mt-24">
              <FadeInSection>
                <div className="flex items-center gap-4 mb-6 text-stone-900 border-b border-stone-200/80 pb-4">
                  <Target className="text-emerald-700" size={28} />
                  <h2 className="text-3xl font-black text-[#2d1b10] tracking-tight">Objectives of the Study</h2>
                </div>
                
                <div className="space-y-6 text-stone-600 leading-relaxed text-base md:text-lg">
                  <p>
                    The general objective of this research is to conceptualize, design, and demonstrate a robust web-enabled system that unites sales processing, inventory control, and consumer remote ordering.
                  </p>
                  
                  <h3 className="text-lg font-bold text-stone-800 mt-4 mb-2">Specific Objectives:</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { title: "Develop Student Storefront App", text: "To implement a secure, responsive PWA for mobile pre-orders with live order status updates." },
                      { title: "Implement Cloud-Based POS Terminal", text: "To equip cashiers with an instantly responsive web-based terminal that handles in-store cash sales." },
                      { title: "Automate Inventory Auditing", text: "To track core stock levels (coffee beans, milk variants, cups) and automatically subtract items as orders complete." },
                      { title: "Provide Analytical Admin Reporting", text: "To synthesize real-time transactional metrics into an accessible dashboard showing gross revenues and transaction counts." }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white border border-stone-200/80 p-5 rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="text-emerald-600 shrink-0 mt-1" size={18} />
                          <div>
                            <h4 className="font-extrabold text-stone-950 text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-stone-600 leading-normal">{item.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </section>

            {/* Scope & Limitations */}
            <section id="scope-limitations" className="scroll-mt-24">
              <FadeInSection>
                <div className="flex items-center gap-4 mb-6 text-stone-900 border-b border-stone-200/80 pb-4">
                  <Layers className="text-sky-700" size={28} />
                  <h2 className="text-3xl font-black text-[#2d1b10] tracking-tight">Scope & Limitations</h2>
                </div>
                
                <div className="space-y-6 text-stone-600 leading-relaxed text-base md:text-lg">
                  <p>
                    Understanding the parameters of system deployment is crucial for specifying testing protocols, boundary criteria, and realistic expectations regarding operational scaling.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-2xl">
                      <h4 className="font-extrabold text-emerald-950 text-base mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">✓</span>
                        Functional Boundaries (Scope)
                      </h4>
                      <ul className="space-y-2.5 text-xs text-stone-700">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 mt-0.5">•</span>
                          <span><strong>Multi-Module Suite:</strong> Features customized viewports for cashiers, business administrators, and student/faculty end-users.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 mt-0.5">•</span>
                          <span><strong>Inventory Deductions:</strong> Programmatically deducts espresso beans, flavor syrups, cups, and milks based on bill of materials.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-700 mt-0.5">•</span>
                          <span><strong>Real-time State Sync:</strong> Instant sync powered by cloud state streaming.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl">
                      <h4 className="font-extrabold text-rose-950 text-base mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs">✗</span>
                        Operational Limits (Limitations)
                      </h4>
                      <ul className="space-y-2.5 text-xs text-stone-700">
                        <li className="flex items-start gap-2">
                          <span className="text-rose-700 mt-0.5">•</span>
                          <span><strong>No Native Logistics:</strong> The system does not interface with third-party logistics or external courier networks.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-rose-700 mt-0.5">•</span>
                          <span><strong>Campus Boundaries:</strong> Fulfillment remains localized strictly to manual, over-the-counter pickup points.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-rose-700 mt-0.5">•</span>
                          <span><strong>Standard Payment Hooks:</strong> Excludes raw hardware payment integrations, depending instead on custom digital balance simulations and over-the-counter settlement verification.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </section>

            {/* Significance of the Study */}
            <section id="significance" className="scroll-mt-24">
              <FadeInSection>
                <div className="flex items-center gap-4 mb-6 text-stone-900 border-b border-stone-200/80 pb-4">
                  <GraduationCap className="text-amber-800" size={28} />
                  <h2 className="text-3xl font-black text-[#2d1b10] tracking-tight">Significance of the Study</h2>
                </div>
                
                <div className="space-y-6 text-stone-600 leading-relaxed text-base md:text-lg">
                  <p>
                    The design, configuration, and implementation of the BREWHA platform yield multi-faceted structural advantages for various institutional entities:
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        title: "To Campus Consumers (Students & Faculty)",
                        desc: "Minimizes schedule friction during peak breaks. Offers full remote visibility on menu availability, product configurations, and current preparation times, enhancing overall campus life utility."
                      },
                      {
                        title: "To Kiosk Management & Operators",
                        desc: "Improves order capacity and transaction speed. Protects inventory assets from shrinkage and stockouts through automated, transparent, and accurate real-time inventory auditing."
                      },
                      {
                        title: "To Institutional Administrators",
                        desc: "Ensures complete financial oversight. Provides analytical models to support strategic planning around campus traffic, purchasing patterns, and sales optimization."
                      },
                      {
                        title: "To Future Researchers & Systems Developers",
                        desc: "Serves as a practical benchmark for deploying distributed, lightweight, multi-client web ecosystems in localized food service paradigms."
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 hover:bg-stone-50 rounded-xl transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2.5"></div>
                        <div>
                          <h4 className="font-extrabold text-stone-900 text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-stone-600 leading-normal">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </section>

            {/* System Methodology */}
            <section id="methodology" className="scroll-mt-24">
              <FadeInSection>
                <div className="flex items-center gap-4 mb-8 text-stone-900 border-b border-stone-200/80 pb-4">
                  <Settings className="text-[#2d1b10]" size={28} />
                  <h2 className="text-3xl font-black text-[#2d1b10] tracking-tight">System Methodology</h2>
                </div>
                
                <p className="text-stone-600 mb-8 leading-relaxed text-base md:text-lg">
                  The BREWHA system development cycle implements a structured, 7-phase software engineering model to align system capabilities with on-field kiosk realities.
                </p>

                <div className="relative border-l border-amber-200 ml-4 lg:ml-8 space-y-12">
                  {[
                    { phase: "Planning", desc: "Formulated the feasibility study, evaluated technical trade-offs of lightweight web frameworks, planned resource requirements, and set milestones for concurrent module developments." },
                    { phase: "Requirements Analysis", desc: "Interrogated actual kiosk workflows to construct comprehensive operational user stories representing cashier transactions, customer ordering patterns, and back-office stock audit flows." },
                    { phase: "System Design", desc: "Configured entity relationship diagrams (ERDs) and designed scalable JSON structures to define cloud schemas. Designed responsive UI wireframes with Tailwind CSS patterns." },
                    { phase: "Development", desc: "Constructed application logic. Implemented Firebase auth processes, developed UI states, and structured core relational rules in our real-time database schema." },
                    { phase: "Testing", desc: "Conducted testing protocols spanning unit verification for subroutines, integration testing of point-of-sale data streams, and simulated multi-client concurrency tests to assess system stability." },
                    { phase: "Deployment", desc: "Released live system builds hosted securely under Google Cloud’s global CDN infrastructure. Instantly updated application assets to handle live traffic requests." },
                    { phase: "Maintenance", desc: "Established monitoring practices for system exceptions, refined cache policies, and optimized performance to support consistent, low-latency client experiences." }
                  ].map((step, idx) => (
                    <div key={idx} className="relative pl-8 group">
                      <div className="absolute -left-[5.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-amber-600 group-hover:scale-125 group-hover:bg-[#2d1b10] transition-all duration-300"></div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 font-bold block mb-1">Phase 0{idx + 1}</span>
                      <h4 className="text-lg font-extrabold text-stone-900 mb-1">{step.phase}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </FadeInSection>
            </section>

            {/* Features & Modules */}
            <section id="features" className="scroll-mt-24">
              <FadeInSection>
                <div className="flex items-center gap-4 mb-8 text-stone-900 border-b border-stone-200/80 pb-4">
                  <LayoutDashboard className="text-[#2d1b10]" size={28} />
                  <h2 className="text-3xl font-black text-[#2d1b10] tracking-tight">Features & Modules</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: Smartphone, title: "Web-Based Online Ordering", desc: "Students can browse the live digital menu, customize beverages (size, milk type, sweetness), and submit order requests for pick-up. Features a persistent shopping cart and real-time prep stage tracking.", color: "text-blue-500", bg: "bg-blue-50" },
                    { icon: Monitor, title: "Point of Sale (POS) Terminal", desc: "Equips the front-line cashier with an optimized interface to process manual in-store transactions, compute changes, print virtual receipt ledgers, and trigger immediate back-end inventory alerts.", color: "text-amber-600", bg: "bg-amber-50" },
                    { icon: Database, title: "Inventory Management Module", desc: "Maintains real-time logs of raw goods. Deducts corresponding metrics (espresso shots, flavor syrup pumps, cups) automatically when a purchase completes, preventing out-of-stock ordering.", color: "text-emerald-500", bg: "bg-emerald-50" },
                    { icon: LayoutDashboard, title: "Administrative Dashboard", desc: "Provides high-fidelity structural metrics showing daily transaction volumes, popular items, and automated flags highlighting items reaching critical minimum thresholds.", color: "text-[#2d1b10]", bg: "bg-stone-100" },
                    { icon: Cloud, title: "Real-Time Cloud Synchronization", desc: "Designed around standard real-time listeners, guaranteeing that transactional changes made by any POS client or end-user instantly reflect across all dashboards in less than one second.", color: "text-purple-500", bg: "bg-purple-50" },
                  ].map((feature, idx) => (
                    <FadeInSection key={idx} delay={`delay-${idx * 100}`} className={idx === 4 ? "md:col-span-2 md:w-3/4 md:mx-auto" : ""}>
                      <div className="group bg-white rounded-2xl p-6 border border-stone-200 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-100/30 transition-all duration-300 h-full">
                        <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                          <feature.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-stone-900 mb-2">{feature.title}</h3>
                        <p className="text-xs text-stone-600 leading-relaxed">{feature.desc}</p>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </FadeInSection>
            </section>

            {/* References */}
            <section id="references" className="scroll-mt-24">
              <FadeInSection>
                <div className="flex items-center gap-4 mb-6 text-stone-900 border-b border-stone-200/80 pb-4">
                  <TrendingUp className="text-stone-700" size={28} />
                  <h2 className="text-3xl font-black text-[#2d1b10] tracking-tight">References</h2>
                </div>
                
                <div className="space-y-6 text-xs text-stone-600 leading-relaxed font-mono">
                  {[
                    "Alinsunurin, A. S. B., et al. (2023). Analysis of point of sale system implementation in coffee shop. ResearchGate. https://www.researchgate.net/publication/372175469_Analysis_of_Point_of_Sale_System_Implementation_in_Coffee_Shop",
                    "Darunday, J. M., et al. (2022). Inventory management practices of a home-grown coffee business: A roadmap for attaining sustainable competitive advantage. ResearchGate. https://www.researchgate.net/publication/362821598_INVENTORY_MANAGEMENT_PRACTICES_OF_A_HOME-GROWN_COFFEE_BUSINESS_A_ROADMAP_FOR_ATTAINING_SUSTAINABLE_COMPETITIVE_ADVANTAGE",
                    "Point of sale system implementation in coffee shop. (2023). Directory of Open Access Journals (DOAJ). https://doaj.org/article/6024e02ae24e462fba6f80d4bb09cf"
                  ].map((refText, idx) => (
                    <div key={idx} className="p-4 bg-stone-50 border border-stone-200/60 rounded-xl">
                      <p className="break-words">{refText}</p>
                    </div>
                  ))}
                </div>
              </FadeInSection>
            </section>

            {/* Team */}
            <section id="team" className="scroll-mt-24 pb-16">
              <FadeInSection>
                <div className="flex items-center gap-4 mb-8 text-stone-900 border-b border-stone-200/80 pb-4">
                  <Users className="text-[#2d1b10]" size={28} />
                  <h2 className="text-3xl font-black text-[#2d1b10] tracking-tight">Project Team</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PROJECT_INFO.proponents.map((member, idx) => (
                    <FadeInSection key={idx} delay={`delay-${idx * 50}`}>
                      <div className="p-5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-amber-400 transition-all duration-300">
                        <h4 className="font-bold text-stone-900 text-sm">{member.name}</h4>
                        <div className="flex flex-col gap-2 mt-3">
                          <span className="self-start text-[10px] font-bold tracking-wider px-2 py-0.5 bg-[#2d1b10] text-amber-400 rounded">
                            {member.role}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            ID: {member.id}
                          </span>
                        </div>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </FadeInSection>
            </section>
            
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-12 text-center text-stone-400 text-xs">
        <p className="mb-2">© {PROJECT_INFO.date} {PROJECT_INFO.title} Project Team • BSIS 2 - B</p>
        <p className="text-[10px] text-stone-400">Integrated Coffee Kiosk Commerce Solution</p>
      </footer>
    </div>
  );
}
