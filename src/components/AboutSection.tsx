import { Shield, Hammer, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  const leadership = [
    {
      name: 'Dr. Arthur Vance',
      role: 'Chief Scientific Officer',
      bio: 'Formerly Principal Telemetry Analyst at Rio Tinto. Over 15 years of experience designing real-time risk platforms for deep mining facilities.',
      initials: 'AV'
    },
    {
      name: 'Sarah Lin, P.Eng.',
      role: 'Managing Partner',
      bio: 'Former Operations Director for EMEA Health Networks. Specialized in clinical system orchestration and HIPAA/PIPEDA safety integrations.',
      initials: 'SL'
    },
    {
      name: 'Marcus Thorne',
      role: 'Head of Engineering',
      bio: 'Formerly Industrial Systems Architect. Expert in building low-latency SCADA connection adapters and air-gapped container logic.',
      initials: 'MT'
    }
  ];

  const values = [
    {
      icon: <Shield className="w-5 h-5 text-[#00e676]" />,
      title: 'Safety Determinism',
      description: 'We believe models should operate within strict physical limits. We write hard compliance checks that override models in risky operational states.'
    },
    {
      icon: <Hammer className="w-5 h-5 text-[#00e676]" />,
      title: 'Empirical baselines',
      description: 'We never deploy general chatbots or unanchored models. Every workflow is benchmarked against rigorous historical telemetry streams.'
    },
    {
      icon: <Users className="w-5 h-5 text-[#00e676]" />,
      title: 'Frictionless Integration',
      description: 'Our agents sit transparently on top of your existing historical records systems. No massive overhauls or expensive tooling migrations required.'
    }
  ];

  return (
    <div className="bg-transparent min-h-screen relative">
      {/* Dark Navy Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00b4d8]/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full glass border border-[#00b4d8]/30 text-[10px] font-bold tracking-[0.2em] text-[#00b4d8] uppercase mb-4 font-sans">
              COMPANY DETAILS
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] tracking-tight max-w-4xl text-white">
              Engineered by operators. Trusted by <span className="text-gradient">industry leaders</span>.
            </h1>
            <p className="font-sans text-gray-400 text-base md:text-lg mt-6 max-w-2xl font-light leading-relaxed">
              Founded in 2022, ShieldSpot translates cutting-edge predictive intelligence into safe, robust, and field-tested physical workflows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight mb-8 leading-snug">
              Our core mission: Shifting physical operations from lagging dashboards to <span className="text-gradient drop-shadow-md">pre-emptive foresight</span>.
            </h2>
            <div className="space-y-6 font-sans text-gray-400 text-[15px] leading-relaxed font-light">
              <p>
                In high-stakes industrial and mining environments across emerging economies, organizations face a critical "data vacuum." Relying on manual checklists and reactive dashboards is fundamentally flawed: by the time a metric breaches safety limits, the incident has already occurred.
              </p>
              <p>
                At ShieldSpot, we bridge the gap between fragmented data ecosystems and high-frequency real-world telemetry. We package predictive reasoning—powered by Edge Computing and Explainable AI (XAI)—into discrete, reliable workflow agents designed strictly for heavy operations.
              </p>
              <p>
                We operate under strict confidentiality protocols, protecting proprietary operational history under robust NDA frameworks.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-10 border-t border-white/20 shadow-[0_15px_40px_rgba(0,230,118,0.05)]"
          >
            <span className="block font-sans text-[11px] font-bold tracking-widest text-[#00b4d8] uppercase mb-8">
              THE SHIELDSPOT PARADIGM
            </span>
            <div className="space-y-8">
              {values.map((val, idx) => (
                <div key={idx} className="flex space-x-5 group">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                    {val.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-white font-semibold">
                      {val.title}
                    </h4>
                    <p className="font-sans text-gray-400 text-[13px] leading-relaxed font-light mt-2">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="border-t border-white/10 glass bg-black/20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full glass border border-[#00b4d8]/30 text-[10px] font-bold tracking-[0.2em] text-[#00b4d8] uppercase mb-4 font-sans">
              SENIOR TEAM
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">
              Field-tested advisors guiding your AI strategy.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {leadership.map((leader, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                key={idx} 
                className="glass rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:bg-white/10 transition-colors border-t border-white/20" 
                id={`leader-${idx}`}
              >
                <div>
                  <div className="w-14 h-14 glass rounded-full flex items-center justify-center font-bold text-[15px] tracking-widest font-sans mb-6 text-[#00e676] border border-[#00e676]/30 shadow-inner">
                    {leader.initials}
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white leading-tight">
                    {leader.name}
                  </h3>
                  <p className="font-sans text-[11px] text-[#00b4d8] font-bold uppercase tracking-widest mt-2 mb-5">
                    {leader.role}
                  </p>
                  <p className="font-sans text-gray-400 text-[14px] leading-relaxed font-light">
                    {leader.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
