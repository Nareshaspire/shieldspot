import { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import ServicesSection from './components/ServicesSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import InsightsSection from './components/InsightsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import { Tab } from './types';
import { Shield, ArrowUp, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  // Smooth scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

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

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSection setActiveTab={setActiveTab} />;
      case 'services':
        return <ServicesSection />;
      case 'case-studies':
        return (
          <CaseStudiesSection 
            setActiveTab={setActiveTab} 
            setPrefilledMessage={setPrefilledMessage} 
          />
        );
      case 'insights':
        return <InsightsSection />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return (
          <ContactSection 
            prefilledMessage={prefilledMessage} 
            setPrefilledMessage={setPrefilledMessage} 
          />
        );
      default:
        return <HomeSection setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-[#111827]">
      {/* Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-grow">
        {renderActiveSection()}
      </main>

      {/* Clean Corporate Footer */}
      <footer className="bg-[#0B1D2D] text-gray-400 border-t border-[#132c42] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Logo and Tagline */}
            <div className="md:col-span-4">
              <div className="flex items-center space-x-2.5 text-white mb-4">
                <Shield className="w-5 h-5 text-[#D9A343]" />
                <span className="font-sans font-bold text-lg tracking-tight">
                  ShieldSpot
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed font-light max-w-sm">
                Industrial AI Consulting and operational safety telemetry systems. Shift physical systems from lagging dashboards to pre-emptive foresight.
              </p>
            </div>

            {/* Quick Navigation links */}
            <div className="md:col-span-4 md:col-start-6">
              <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-gray-300 mb-4 font-mono">
                PRACTICES
              </h4>
              <ul className="space-y-2.5 text-[13px] font-light">
                <li>
                  <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('case-studies')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">
                    Case Study Vault
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('insights')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">
                    Insights Stream
                  </button>
                </li>
              </ul>
            </div>

            {/* Trust and Safety information */}
            <div className="md:col-span-3">
              <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-gray-300 mb-4 font-mono">
                SECURITY ASSURANCE
              </h4>
              <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">
                All customer engagements are governed by standardized bilateral NDA protocols and local air-gapped security container audits.
              </p>
              <div className="mt-4 inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-[#D9A343]">
                <span>✓ ISO 27001 ALIGNED</span>
              </div>
            </div>
          </div>

          {/* Lower Footer */}
          <div className="border-t border-[#132c42] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-light text-gray-500">
            <span>© {new Date().getFullYear()} ShieldSpot, Inc. All rights reserved.</span>
            <div className="flex space-x-6 mt-4 sm:mt-0 font-mono text-[11px] uppercase tracking-wider">
              <button 
                onClick={() => setActiveModal('privacy')} 
                className="hover:text-gray-300 cursor-pointer bg-transparent border-0 p-0"
              >
                Privacy Protocols
              </button>
              <span className="text-[#132c42]">|</span>
              <button 
                onClick={() => setActiveModal('terms')} 
                className="hover:text-gray-300 cursor-pointer bg-transparent border-0 p-0"
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
          className="fixed bottom-6 right-6 p-2.5 bg-white border border-gray-200 text-gray-700 rounded-none shadow-md hover:bg-gray-50 transition-all cursor-pointer z-40"
          id="scroll-to-top"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Interactive Policy Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1D2D]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white border border-gray-100 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200"
            id="policy-modal-container"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
              <span className="font-sans text-[11px] font-bold tracking-widest text-[#D9A343] uppercase font-mono">
                {activeModal === 'privacy' ? 'SHIELDSPOT PRIVACY PROTOCOLS' : 'BILATERAL NDA GENERAL TERMS'}
              </span>
              <button 
                onClick={() => setActiveModal(null)}
                id="close-modal-btn"
                className="p-1 hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer border-0 bg-transparent"
                title="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 font-sans text-[14px] leading-relaxed text-gray-600 space-y-5 font-light">
              {activeModal === 'privacy' ? (
                <>
                  <h3 className="font-serif text-2xl font-normal text-gray-900 leading-snug">
                    Strict isolation of industrial telemetry data.
                  </h3>
                  <p>
                    At ShieldSpot, we recognize that raw industrial data, medical records, and facility SCADA logs are highly sensitive assets. We treat your operational history with the same tier of integrity as financial registries.
                  </p>
                  <p className="font-semibold text-gray-900">
                    1. Telemetry Isolation & Security Boundaries
                  </p>
                  <p>
                    All telemetry ingestion models are localized within virtual sandboxes on dedicated servers. No raw metadata is transmitted to public multi-tenant APIs, and no model fine-tuning occurs on proprietary data.
                  </p>
                  <p className="font-semibold text-gray-900">
                    2. Local Air-Gapped Strategy
                  </p>
                  <p>
                    For mining and high-security civil environments, we deploy entirely offline local model architectures running within physical containers on your company's network, ensuring no byte of data ever leaves your intranet.
                  </p>
                  <p className="font-semibold text-gray-900">
                    3. Right to Complete Eradication
                  </p>
                  <p>
                    Upon termination of any audit or deployment contract, all cached historian datasets are completely scrubbed using DOD-compliant sanitization standards within 24 hours.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-serif text-2xl font-normal text-gray-900 leading-snug">
                    Standardized reciprocal non-disclosure frameworks.
                  </h3>
                  <p>
                    Before exchanging detailed telemetry blueprints, network layouts, or diagnostic history, both parties enter into a binding bilateral non-disclosure agreement.
                  </p>
                  <p className="font-semibold text-gray-900">
                    1. Definition of Confidential Material
                  </p>
                  <p>
                    Confidential information comprises all sensor logs, historian telemetry, custom workflow layouts, model thresholds, and engineering benchmarks provided during briefings.
                  </p>
                  <p className="font-semibold text-gray-900">
                    2. Protection and Permitted Usage
                  </p>
                  <p>
                    ShieldSpot will utilize provided datasets strictly to execute high-stakes risk audits. No metadata, code adapters, or system summaries will be shared with outside providers.
                  </p>
                  <p className="font-semibold text-gray-900">
                    3. NDA Inquiries & Execution
                  </p>
                  <p>
                    Introductory briefings are executed under clean unilateral or mutual NDA formats. You can request a standard digital NDA directly through our Briefing reservation form on the Contact section.
                  </p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-8 py-5 bg-gray-50 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                id="modal-ack-btn"
                className="bg-[#0B1D2D] hover:bg-[#152e44] text-white font-sans font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded transition-all cursor-pointer border-0"
              >
                Acknowledge and Close
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
