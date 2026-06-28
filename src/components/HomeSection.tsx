import { ArrowRight, Activity, Shield, Cpu, Target } from 'lucide-react';
import { Tab } from '../types';
import { motion } from 'motion/react';

interface HomeSectionProps {
  setActiveTab: (tab: Tab) => void;
}

export default function HomeSection({ setActiveTab }: HomeSectionProps) {
  const stats = [
    { label: 'Incident Warning Lead Time', value: '48-72h' },
    { label: 'Reduction in Safety Dashboard Lag', value: '80%' },
    { label: 'Faster Permit-to-Work Issuance', value: '60%' },
    { label: 'Durable Enterprise Compliance', value: '100%' },
  ];

  const pillars = [
    {
      icon: <Activity className="w-6 h-6 text-[#D9A343]" />,
      title: 'Operational Telemetry',
      description: 'Shift from lagging indicators to predictive modeling. We parse and model real-time telemetry stream from heavy machinery and facility environments.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#D9A343]" />,
      title: 'Enterprise AI Workflows',
      description: 'Re-engineer decision-making processes. We design custom AI workflow agents that sit natively on top of existing industrial historical or medical records systems.',
    },
    {
      icon: <Target className="w-6 h-6 text-[#D9A343]" />,
      title: 'Measurable Counterfactuals',
      description: 'We do not build speculative models. Every AI deployment starts with a clearly-defined operational decision and is scored against precise empirical baselines.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 bg-[#FAFBFD]">
        <div className="absolute inset-0 bg-[radial-gradient(#d9a343_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#D9A343] uppercase block mb-4 font-mono">
              INDUSTRIAL AI CONSULTING
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-normal leading-[1.1] tracking-tight text-[#111827]">
              Predictive intelligence for high-stakes physical operations.
            </h1>
            <p className="font-sans text-gray-500 text-base md:text-[19px] mt-6 leading-relaxed max-w-2xl font-light">
              We design, deploy, and audit enterprise-grade AI workflow systems that turn real-time operational telemetry into measurable safety and performance outcomes.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActiveTab('contact')}
                className="bg-[#0B1D2D] hover:bg-[#152e44] text-white font-sans font-semibold text-[14px] px-7 py-3.5 rounded shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Book a Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('case-studies')}
                className="bg-white hover:bg-gray-50 text-gray-800 font-sans font-semibold text-[14px] px-7 py-3.5 rounded border border-gray-200 shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center"
              >
                Explore Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="border-l-2 border-[#D9A343] pl-5">
                <span className="block font-serif text-3xl md:text-4xl lg:text-[40px] font-normal text-[#111827]">
                  {stat.value}
                </span>
                <span className="block font-sans text-xs text-gray-400 font-medium tracking-wider uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#D9A343] uppercase block mb-3 font-mono">
              METHODOLOGY
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight text-[#111827]">
              The ShieldSpot operational paradigm.
            </h2>
            <p className="font-sans text-gray-500 text-sm md:text-base mt-4 font-light leading-relaxed">
              Programs fail when they treat AI as a general-purpose writing or reasoning engine rather than a specialized loop optimizer. We focus exclusively on embedding intelligence into the mechanical and operational workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="bg-[#FAFBFD] border border-gray-100 p-8 hover:border-gray-300 transition-colors">
                <div className="mb-5 bg-white w-12 h-12 flex items-center justify-center border border-gray-100 shadow-sm">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-xl font-normal text-[#111827] mb-3">
                  {pillar.title}
                </h3>
                <p className="font-sans text-gray-500 text-xs md:text-[13px] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Banner Section */}
      <section className="bg-[#0B1D2D] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal leading-snug text-gray-100">
            "The best Enterprise AI programs do not start with a model. They start with an operational decision."
          </h2>
          <button 
            onClick={() => setActiveTab('insights')}
            className="mt-6 text-[11px] font-bold tracking-[0.2em] text-[#D9A343] hover:text-amber-400 uppercase inline-flex items-center space-x-1.5 font-mono cursor-pointer"
          >
            <span>Read our Insights stream</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
