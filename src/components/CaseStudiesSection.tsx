import { useState, useEffect } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchCaseStudies } from '../lib/firebase';
import { Sector, CaseStudy } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CaseStudiesSectionProps {
  setPrefilledMessage: (msg: string) => void;
}

export default function CaseStudiesSection({ setPrefilledMessage }: CaseStudiesSectionProps) {
  const [activeSector, setActiveSector] = useState<Sector>('ALL');
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchCaseStudies();
      setCaseStudies(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const sectors: Sector[] = ['ALL', 'MINING', 'HEALTHCARE', 'HEAVY INDUSTRY'];

  const filteredCaseStudies = activeSector === 'ALL'
    ? caseStudies
    : caseStudies.filter(cs => cs.sector === activeSector);

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
              CASE STUDY VAULT
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] tracking-tight max-w-4xl text-white">
              Engagements that moved the <span className="text-gradient">operational needle</span>.
            </h1>
            <p className="font-sans text-gray-400 text-base md:text-lg mt-6 max-w-2xl font-light leading-relaxed">
              A selection of placeholder engagements — full versions available under NDA.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Content section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-white/10 pb-6" id="sector-filters">
          {sectors.map((sec) => {
            const isSelected = activeSector === sec;
            return (
              <button
                key={sec}
                onClick={() => setActiveSector(sec)}
                id={`filter-btn-${sec.replace(/\s+/g, '-').toLowerCase()}`}
                className={`text-[11px] font-bold tracking-widest uppercase px-6 py-2.5 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-accent text-white shadow-[0_0_15px_rgba(0,230,118,0.4)] border-0'
                    : 'glass text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {sec === 'ALL' ? 'ALL SECTORS' : sec}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#00e676] animate-spin" />
          </div>
        )}

        {/* Case Studies Grid */}
        {!loading && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
          <AnimatePresence mode="popLayout">
            {filteredCaseStudies.map((cs) => {
              const hasImage = !!cs.imageUrl;
              return (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={cs.id}
                  id={`case-card-${cs.id}`}
                  className="glass rounded-2xl flex flex-col justify-between h-full hover:shadow-[0_15px_40px_rgba(0,230,118,0.1)] hover:bg-white/10 transition-all duration-300 group border-t border-white/20 overflow-hidden"
                >
                  <div>
                    {/* Optional Image */}
                    {hasImage ? (
                      <div className="overflow-hidden aspect-[4/3] bg-black/50 border-b border-white/10 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
                        <img
                          src={cs.imageUrl}
                          alt={cs.title}
                          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 opacity-80 group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : null}

                    {/* Content Area */}
                    <div className="p-8 relative z-20">
                      {/* Meta Tags */}
                      <div className="flex justify-between items-center text-[10px] font-bold tracking-widest font-sans uppercase mb-5">
                        <span className="text-[#00e676]">{cs.sector}</span>
                        <span className="text-gray-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">{cs.region}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-white text-xl md:text-2xl font-semibold leading-snug mb-4 group-hover:text-[#00e676] transition-colors">
                        {cs.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="font-sans text-gray-400 text-[14px] leading-relaxed mb-6 font-light">
                        {cs.subtitle}
                      </p>

                      {/* Bullet points for text-only card */}
                      {!hasImage && cs.bullets && (
                        <ul className="space-y-3 mb-8 border-t border-white/10 pt-6">
                          {cs.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start text-[13px] text-gray-300 font-light leading-relaxed">
                              <span className="text-[#00e676] mr-3 font-bold mt-1 shadow-[#00e676] drop-shadow-md">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="px-8 pb-8 pt-0">
                    <button
                      onClick={() => {
                        setPrefilledMessage(`Requesting Briefing & NDA Details for Case Study: ${cs.title} [Sector: ${cs.sector}, Region: ${cs.region}]`);
                        navigate('/contact');
                      }}
                      className="inline-flex items-center space-x-2 text-[11px] font-bold tracking-widest text-white hover:text-[#00e676] transition-colors uppercase bg-transparent border-0 cursor-pointer p-0 group/btn"
                    >
                      <span>Read Overview</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover/btn:text-[#00e676] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
        )}
      </section>
    </div>
  );
}
