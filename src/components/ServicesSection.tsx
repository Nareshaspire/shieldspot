import { ShieldCheck, HardHat, Database, Zap, FileSliders, Eye } from 'lucide-react';

export default function ServicesSection() {
  const serviceItems = [
    {
      icon: <HardHat className="w-5 h-5 text-[#D9A343]" />,
      title: 'Predictive Risk Telemetry',
      subtitle: 'Anticipate environmental and mechanical safety threats before they escalate into incidents.',
      details: [
        'Real-time equipment thermal & vibration modeling',
        'Human fatigue and motion telemetry pattern audits',
        'Automated workspace environmental hazard warnings',
        'Unified risk platform mapping for control centers'
      ]
    },
    {
      icon: <Database className="w-5 h-5 text-[#D9A343]" />,
      title: 'Enterprise Workflow Systems',
      subtitle: 'Convert unstructured databases and raw historian feeds into crisp operational recommendations.',
      details: [
        'Secure connection adapters for legacy SCADA/EHR databases',
        'Intelligent agent orchestration for permit-to-work issuance',
        'Structured context routers for triage and dispatch decision trees',
        'Custom executive reporting synthesis with high privacy protection'
      ]
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#D9A343]" />,
      title: 'Security & Compliance Audits',
      subtitle: 'Rigorous validation to guarantee strict regulatory adherence and rock-solid confidentiality.',
      details: [
        'Deep alignment testing for model drift or operational edge cases',
        'Rigorous GDPR, PIPEDA, and HIPAA data isolation checks',
        'Local model hosting frameworks for air-gapped field facilities',
        'Formal security architecture reviews and executive safety signoffs'
      ]
    }
  ];

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-gray-700" />,
      name: 'Zero-Latency Logic',
      desc: 'Optimized for processing high-frequency data from edge sensor arrays.'
    },
    {
      icon: <FileSliders className="w-5 h-5 text-gray-700" />,
      name: 'Deterministic Rulesets',
      desc: 'AI recommendations bound by hard safety and absolute logic thresholds.'
    },
    {
      icon: <Eye className="w-5 h-5 text-gray-700" />,
      name: 'Explainable Actions',
      desc: 'Every model output compiles alongside its precise telemetry source.'
    }
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen">
      {/* Dark Navy Hero Section */}
      <section className="bg-[#0B1D2D] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D9A343] uppercase block mb-3 font-mono">
            CAPABILITIES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.15] tracking-tight max-w-4xl text-gray-50">
            Industrial intelligence. Hardened for heavy operations.
          </h1>
          <p className="font-sans text-gray-300 text-sm md:text-base mt-4 max-w-2xl font-light">
            We provide specialized engineering and strategic consulting services to integrate real-time telemetry with decision-making agents.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="space-y-12">
          {serviceItems.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-100 p-8 md:p-12 shadow-sm hover:border-gray-300 transition-colors flex flex-col lg:flex-row lg:items-start gap-8"
              id={`service-item-${idx}`}
            >
              <div className="lg:w-1/3">
                <div className="w-12 h-12 bg-amber-50 flex items-center justify-center border border-amber-100 mb-6">
                  {service.icon}
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#111827] mb-3">
                  {service.title}
                </h3>
                <p className="font-sans text-gray-500 text-sm font-light leading-relaxed">
                  {service.subtitle}
                </p>
              </div>

              <div className="lg:w-2/3 lg:pl-10 lg:border-l border-gray-100">
                <span className="block font-sans text-xs text-gray-400 font-bold uppercase tracking-wider mb-5">
                  CORE DELIVERABLES
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {service.details.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start text-[13px] text-gray-600 leading-relaxed font-light">
                      <span className="text-[#D9A343] mr-2.5 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features bar */}
      <section className="border-t border-gray-100 bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="font-sans text-xs text-gray-400 font-bold tracking-wider uppercase">
              OUR TECHNICAL GUARANTEE
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center px-6">
                <div className="w-10 h-10 bg-gray-50 rounded-none border border-gray-200 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-serif text-lg font-normal text-[#111827] mb-2">
                  {feature.name}
                </h4>
                <p className="font-sans text-gray-500 text-[13px] leading-relaxed font-light">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
