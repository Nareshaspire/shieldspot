import { ArrowRight, Activity, Cpu, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TelemetrySandbox from './TelemetrySandbox';

export default function HomeSection() {
  const stats = [
    { label: 'Incident Warning Lead Time', value: '48-72h' },
    { label: 'Reduction in Safety Dashboard Lag', value: '80%' },
    { label: 'Faster Permit-to-Work Issuance', value: '60%' },
    { label: 'Durable Enterprise Compliance', value: '100%' },
  ];

  const pillars = [
    {
      icon: <Activity className="w-6 h-6 text-[#00e676]" />,
      title: 'Edge-Deployed Telemetry',
      description: 'Shift from lagging indicators to predictive modeling. We parse and model real-time telemetry directly at the edge, overcoming fragmented data ecosystems and ensuring zero-latency anomaly detection.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#00b4d8]" />,
      title: 'Explainable AI (XAI)',
      description: 'Re-engineer decision-making with transparent models. Our XAI workflows provide strict SHAP-value breakdowns, ensuring safety officers can trust and verify every predictive intervention.',
    },
    {
      icon: <Target className="w-6 h-6 text-[#00e676]" />,
      title: 'Measurable Counterfactuals',
      description: 'We do not build speculative models. Every AI deployment starts with a clearly-defined operational decision and is scored against precise empirical baselines.',
    },
  ];

  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="inline-block py-1 px-3 rounded-full glass border border-[#00e676]/30 text-[11px] font-bold tracking-widest text-[#00e676] uppercase mb-6 font-sans">
              INDUSTRIAL AI CONSULTING
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg">
              Predictive intelligence for <span className="text-gradient">high-stakes</span> physical operations.
            </h1>
            <p className="font-sans text-gray-400 text-lg md:text-xl mt-8 leading-relaxed max-w-2xl font-light">
              We design, deploy, and audit enterprise-grade AI workflow systems that turn real-time operational telemetry into measurable safety and performance outcomes.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              <Link
                to="/contact"
                className="bg-gradient-accent hover:opacity-90 text-white font-sans font-bold text-[15px] px-8 py-4 rounded-full shadow-[0_0_20px_rgba(0,230,118,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Book a Briefing</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/case-studies"
                className="glass glass-hover text-white font-sans font-semibold text-[15px] px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center"
              >
                Explore Case Studies
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 max-w-5xl mx-auto"
          >
            <TelemetrySandbox />
          </motion.div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="border-y border-white/10 glass bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="border-l-[3px] border-[#00b4d8] pl-6"
              >
                <span className="block font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {stat.value}
                </span>
                <span className="block font-sans text-xs text-gray-400 font-semibold tracking-widest uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mb-20"
          >
            <span className="inline-block py-1 px-3 rounded-full glass border border-[#00e676]/30 text-[10px] font-bold tracking-[0.2em] text-[#00e676] uppercase mb-4 font-sans">
              METHODOLOGY
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              The ShieldSpot <span className="text-gradient">paradigm.</span>
            </h2>
            <p className="font-sans text-gray-400 text-base md:text-lg mt-6 font-light leading-relaxed">
              Programs fail when they treat AI as a general-purpose writing or reasoning engine rather than a specialized loop optimizer. We focus exclusively on embedding intelligence into the mechanical and operational workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="glass rounded-2xl p-8 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,230,118,0.15)] hover:bg-white/10 transition-all duration-300 border-t border-white/20"
              >
                <div className="mb-6 w-14 h-14 rounded-xl glass flex items-center justify-center shadow-inner">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-4">
                  {pillar.title}
                </h3>
                <p className="font-sans text-gray-400 text-[14px] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Banner Section */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="absolute inset-0 bg-gradient-accent opacity-20"></div>
        <div className="absolute inset-0 glass backdrop-blur-2xl border-y border-white/20"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white">
            "The best Enterprise AI programs do not start with a model. They start with an <span className="text-gradient drop-shadow-md">operational decision</span>."
          </h2>
          <Link 
            to="/insights"
            className="mt-10 py-2 px-6 rounded-full glass border border-white/20 hover:bg-white/10 text-[12px] font-bold tracking-[0.2em] text-[#00e676] uppercase inline-flex items-center space-x-2 font-sans transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(0,230,118,0.4)]"
          >
            <span>Read our Insights stream</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
