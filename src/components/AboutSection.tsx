import { Shield, Hammer, Users } from 'lucide-react';

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
      icon: <Shield className="w-5 h-5 text-[#D9A343]" />,
      title: 'Safety Determinism',
      description: 'We believe models should operate within strict physical limits. We write hard compliance checks that override models in risky operational states.'
    },
    {
      icon: <Hammer className="w-5 h-5 text-[#D9A343]" />,
      title: 'Empirical baselines',
      description: 'We never deploy general chatbots or unanchored models. Every workflow is benchmarked against rigorous historical telemetry streams.'
    },
    {
      icon: <Users className="w-5 h-5 text-[#D9A343]" />,
      title: 'Frictionless Integration',
      description: 'Our agents sit transparently on top of your existing historical records systems. No massive overhauls or expensive tooling migrations required.'
    }
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen">
      {/* Dark Navy Hero Section */}
      <section className="bg-[#0B1D2D] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D9A343] uppercase block mb-3 font-mono">
            COMPANY DETAILS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.15] tracking-tight max-w-4xl text-gray-50">
            Engineered by operators. Trusted by industry leaders.
          </h1>
          <p className="font-sans text-gray-300 text-sm md:text-base mt-4 max-w-2xl font-light">
            Founded in 2022, ShieldSpot translates cutting-edge predictive intelligence into safe, robust, and field-tested physical workflows.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 font-normal tracking-tight mb-6">
              Our core mission: Shifting physical operations from lagging dashboards to pre-emptive foresight.
            </h2>
            <div className="space-y-4 font-sans text-gray-600 text-[14px] leading-relaxed font-light">
              <p>
                In high-stakes industrial, mining, and healthcare environments, standard data dashboards are fundamentally flawed: they report lagging indicators. By the time a metric breaches safety limits, the incident has already occurred.
              </p>
              <p>
                At ShieldSpot, we bridge the gap between cutting-edge AI models and high-frequency real-world telemetry. We package predictive reasoning into discrete, reliable, and compliant workflow agents designed strictly for heavy operations.
              </p>
              <p>
                We operate under strict confidentiality protocols, protecting proprietary operational history under robust NDA frameworks.
              </p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 p-8 shadow-sm">
            <span className="block font-sans text-[11px] font-bold tracking-widest text-[#D9A343] uppercase mb-6 font-mono">
              THE SHIELDSPOT PARADIGM
            </span>
            <div className="space-y-6">
              {values.map((val, idx) => (
                <div key={idx} className="flex space-x-4">
                  <div className="w-10 h-10 bg-amber-50 flex items-center justify-center border border-amber-100 shrink-0">
                    {val.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-gray-900 font-normal">
                      {val.title}
                    </h4>
                    <p className="font-sans text-gray-500 text-xs leading-relaxed font-light mt-1">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="border-t border-gray-100 bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#D9A343] uppercase block mb-3 font-mono">
              SENIOR TEAM
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-[#111827]">
              Field-tested advisors guiding your AI strategy.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, idx) => (
              <div key={idx} className="bg-[#FAFBFD] border border-gray-100 p-8 shadow-sm flex flex-col justify-between" id={`leader-${idx}`}>
                <div>
                  <div className="w-12 h-12 bg-[#0B1D2D] text-white flex items-center justify-center font-bold text-sm tracking-widest font-mono mb-6">
                    {leader.initials}
                  </div>
                  <h3 className="font-sans font-bold text-base text-gray-900 leading-tight">
                    {leader.name}
                  </h3>
                  <p className="font-sans text-[11px] text-[#D9A343] font-bold uppercase tracking-wider mt-1 mb-4">
                    {leader.role}
                  </p>
                  <p className="font-sans text-gray-500 text-xs md:text-[13px] leading-relaxed font-light">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
