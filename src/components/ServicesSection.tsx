import { ShieldCheck, HardHat, Database, Zap, FileSliders, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export default function ServicesSection() {
  const serviceItems = [
    {
      icon: <HardHat className="w-6 h-6 text-[#00e676]" />,
      title: 'Predictive Risk Telemetry',
      subtitle: 'Anticipate environmental and mechanical safety threats before they escalate into incidents.',
      details: [
        'Edge-computed equipment thermal & vibration modeling',
        'Wearable biometric telemetry for fatigue & hydration audits',
        'Automated workspace environmental hazard warnings',
        'Zero-latency anomaly detection for remote mining and civil sites'
      ]
    },
    {
      icon: <Database className="w-6 h-6 text-[#00b4d8]" />,
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
      icon: <ShieldCheck className="w-6 h-6 text-[#00e676]" />,
      title: 'Security & Compliance Audits',
      subtitle: 'Rigorous validation to guarantee strict regulatory adherence and rock-solid confidentiality.',
      details: [
        'Deep alignment testing for model drift and XAI verification',
        'Rigorous DPDPA, GDPR, and HIPAA data isolation checks',
        'Local edge-model hosting frameworks for air-gapped field facilities',
        'Formal security architecture reviews and executive safety signoffs'
      ]
    }
  ];

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-[#00e676]" />,
      name: 'Zero-Latency Logic',
      desc: 'Optimized for processing high-frequency data from edge sensor arrays.'
    },
    {
      icon: <FileSliders className="w-5 h-5 text-[#00b4d8]" />,
      name: 'Deterministic Rulesets',
      desc: 'AI recommendations bound by hard safety and absolute logic thresholds.'
    },
    {
      icon: <Eye className="w-5 h-5 text-[#00e676]" />,
      name: 'Explainable Actions',
      desc: 'Every model output compiles alongside its precise telemetry source.'
    }
  ];

  return (
    <div className="bg-transparent min-h-screen relative">
      {/* Dark Navy Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00e676]/5 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full glass border border-[#00e676]/30 text-[10px] font-bold tracking-[0.2em] text-[#00e676] uppercase mb-4 font-sans">
              CAPABILITIES
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] tracking-tight max-w-4xl text-white">
              Industrial intelligence. <span className="text-gradient">Hardened</span> for heavy operations.
            </h1>
            <p className="font-sans text-gray-400 text-base md:text-lg mt-6 max-w-2xl font-light leading-relaxed">
              We provide specialized engineering and strategic consulting services to integrate real-time telemetry with decision-making agents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="space-y-12">
          {serviceItems.map((service, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              key={idx} 
              className="glass rounded-3xl p-8 md:p-12 hover:shadow-[0_15px_40px_rgba(0,230,118,0.1)] hover:bg-white/10 transition-all duration-300 flex flex-col lg:flex-row lg:items-start gap-10 border-t border-white/20"
              id={`service-item-${idx}`}
            >
              <div className="lg:w-1/3">
                <div className="w-14 h-14 glass rounded-xl flex items-center justify-center mb-6 shadow-inner">
                  {service.icon}
                </div>
                <h3 className="font-serif text-3xl font-semibold text-white mb-4">
                  {service.title}
                </h3>
                <p className="font-sans text-gray-400 text-[15px] font-light leading-relaxed">
                  {service.subtitle}
                </p>
              </div>

              <div className="lg:w-2/3 lg:pl-10 lg:border-l border-white/10">
                <span className="block font-sans text-[11px] text-[#00b4d8] font-bold uppercase tracking-[0.15em] mb-6">
                  CORE DELIVERABLES
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  {service.details.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start text-[14px] text-gray-300 leading-relaxed font-light">
                      <span className="text-[#00e676] mr-3 font-bold mt-1 shadow-[#00e676] drop-shadow-md">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features bar */}
      <section className="border-t border-white/10 glass bg-black/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full glass border border-[#00b4d8]/30 text-[10px] font-bold tracking-[0.2em] text-[#00b4d8] uppercase">
              OUR TECHNICAL GUARANTEE
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="text-center px-6"
              >
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  {feature.icon}
                </div>
                <h4 className="font-serif text-xl font-semibold text-white mb-3">
                  {feature.name}
                </h4>
                <p className="font-sans text-gray-400 text-[14px] leading-relaxed font-light">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
