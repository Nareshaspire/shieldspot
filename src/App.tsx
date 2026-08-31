import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import ServicesSection from './components/ServicesSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import InsightsSection from './components/InsightsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import { Shield, ArrowUp, X } from 'lucide-react';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  // Smooth scroll to top on path change is usually handled by a wrapper component, 
  // but we can rely on standard browser behavior or add a small ScrollToTop component later.

  // Monitor scroll height to show back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#050505] text-[#e5e5e5] font-sans antialiased selection:bg-[#00d2ff] selection:text-white relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#00e676]/10 blur-[120px] mix-blend-screen animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#00b4d8]/10 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Navigation Header */}
        <Header />

        {/* Main View Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeSection />} />
            <Route path="/services" element={<ServicesSection />} />
            <Route path="/case-studies" element={<CaseStudiesSection setPrefilledMessage={setPrefilledMessage} />} />
            <Route path="/insights" element={<InsightsSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/contact" element={<ContactSection prefilledMessage={prefilledMessage} setPrefilledMessage={setPrefilledMessage} />} />
          </Routes>
        </main>

      {/* Glassmorphic Footer */}
      <footer className="relative z-10 glass border-x-0 border-b-0 border-t-white/10 mt-auto py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Logo and Tagline */}
            <div className="md:col-span-4">
              <div className="flex items-center space-x-2.5 mb-4">
                <Shield className="w-6 h-6 text-[#00e676]" />
                <span className="font-serif font-bold text-xl tracking-tight text-white">
                  ShieldSpot
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed font-light max-w-sm">
                Industrial AI Consulting and operational safety telemetry systems. Shift physical systems from lagging dashboards to pre-emptive foresight.
              </p>
            </div>

            {/* Quick Navigation links */}
            <div className="md:col-span-4 md:col-start-6">
              <h4 className="font-sans font-bold text-[10px] tracking-widest uppercase text-gray-500 mb-5">
                PRACTICES
              </h4>
              <ul className="space-y-3 text-[13px] font-light">
                {[
                  { path: '/', label: 'home' },
                  { path: '/services', label: 'services' },
                  { path: '/case-studies', label: 'case studies' },
                  { path: '/insights', label: 'insights' }
                ].map((tab) => (
                  <li key={tab.path}>
                    <Link 
                      to={tab.path} 
                      className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer bg-transparent border-0 p-0 text-left capitalize inline-block"
                    >
                      {tab.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust and Safety information */}
            <div className="md:col-span-3">
              <h4 className="font-sans font-bold text-[10px] tracking-widest uppercase text-gray-500 mb-5">
                SECURITY ASSURANCE
              </h4>
              <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">
                All customer engagements are governed by standardized bilateral NDA protocols and local air-gapped security container audits.
              </p>
              <div className="mt-5 inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-gradient">
                <Shield className="w-3 h-3 text-[#00e676]" />
                <span>ISO 27001 ALIGNED</span>
              </div>
            </div>
          </div>

          {/* Lower Footer */}
          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-light text-gray-500">
            <span>© {new Date().getFullYear()} ShieldSpot, Inc. All rights reserved.</span>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <button 
                onClick={() => setActiveModal('privacy')} 
                className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                Privacy Protocols
              </button>
              <button 
                onClick={() => setActiveModal('terms')} 
                className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                Bilateral NDA Terms
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 glass glass-hover text-white rounded-full shadow-[0_0_15px_rgba(0,230,118,0.3)] z-40 transition-all"
          id="scroll-to-top"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Interactive Policy Modals ... (Unchanged) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div 
            className="glass rounded-2xl border border-white/20 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-[0_0_40px_rgba(0,230,118,0.1)] relative animate-in zoom-in-95 duration-300"
            id="policy-modal-container"
          >
            {/* Header */}
            <div className="sticky top-0 glass border-b border-white/10 px-8 py-5 flex items-center justify-between z-10">
              <span className="font-sans text-[11px] font-bold tracking-widest text-gradient uppercase">
                {activeModal === 'privacy' ? 'SHIELDSPOT PRIVACY PROTOCOLS' : 'BILATERAL NDA GENERAL TERMS'}
              </span>
              <button 
                onClick={() => setActiveModal(null)}
                id="close-modal-btn"
                className="p-1.5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all cursor-pointer border-0 bg-transparent"
                title="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 font-sans text-[14px] leading-relaxed text-gray-300 space-y-5 font-light">
              {activeModal === 'privacy' ? (
                <>
                  <h3 className="font-serif text-2xl font-medium text-white leading-snug">
                    Strict isolation of industrial telemetry data.
                  </h3>
                  <p>
                    At ShieldSpot, we recognize that raw industrial data, medical records, and facility SCADA logs are highly sensitive assets. We treat your operational history with the same tier of integrity as financial registries.
                  </p>
                  <p className="font-semibold text-white">
                    1. Telemetry Isolation & Security Boundaries
                  </p>
                  <p>
                    All telemetry ingestion models are localized within virtual sandboxes on dedicated servers. No raw metadata is transmitted to public multi-tenant APIs, and no model fine-tuning occurs on proprietary data.
                  </p>
                  <p className="font-semibold text-white">
                    2. Local Air-Gapped Strategy
                  </p>
                  <p>
                    For mining and high-security civil environments, we deploy entirely offline local model architectures running within physical containers on your company's network, ensuring no byte of data ever leaves your intranet.
                  </p>
                  <p className="font-semibold text-white">
                    3. Right to Complete Eradication
                  </p>
                  <p>
                    Upon termination of any audit or deployment contract, all cached historian datasets are completely scrubbed using DOD-compliant sanitization standards within 24 hours.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-serif text-2xl font-medium text-white leading-snug">
                    Standardized reciprocal non-disclosure frameworks.
                  </h3>
                  <p>
                    Before exchanging detailed telemetry blueprints, network layouts, or diagnostic history, both parties enter into a binding bilateral non-disclosure agreement.
                  </p>
                  <p className="font-semibold text-white">
                    1. Definition of Confidential Material
                  </p>
                  <p>
                    Confidential information comprises all sensor logs, historian telemetry, custom workflow layouts, model thresholds, and engineering benchmarks provided during briefings.
                  </p>
                  <p className="font-semibold text-white">
                    2. Protection and Permitted Usage
                  </p>
                  <p>
                    ShieldSpot will utilize provided datasets strictly to execute high-stakes risk audits. No metadata, code adapters, or system summaries will be shared with outside providers.
                  </p>
                  <p className="font-semibold text-white">
                    3. NDA Inquiries & Execution
                  </p>
                  <p>
                    Introductory briefings are executed under clean unilateral or mutual NDA formats. You can request a standard digital NDA directly through our Briefing reservation form on the Contact section.
                  </p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-8 py-5 bg-white/5 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                id="modal-ack-btn"
                className="bg-gradient-accent hover:opacity-90 text-white font-sans font-bold text-xs tracking-wide px-6 py-2.5 rounded-full shadow-[0_0_15px_rgba(0,230,118,0.4)] transition-all cursor-pointer border-0"
              >
                Acknowledge and Close
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </Router>
  );
}
