import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '../data';
import { Sector, Tab } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CaseStudiesSectionProps {
  setActiveTab: (tab: Tab) => void;
  setPrefilledMessage: (msg: string) => void;
}

export default function CaseStudiesSection({ setActiveTab, setPrefilledMessage }: CaseStudiesSectionProps) {
  const [activeSector, setActiveSector] = useState<Sector>('ALL');

  const sectors: Sector[] = ['ALL', 'MINING', 'HEALTHCARE', 'HEAVY INDUSTRY'];

  const filteredCaseStudies = activeSector === 'ALL'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(cs => cs.sector === activeSector);

  return (
    <div className="bg-[#FAFBFD] min-h-screen">
      {/* Dark Navy Hero Section */}
      <section className="bg-[#0B1D2D] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D9A343] uppercase block mb-3 font-mono">
            CASE STUDY VAULT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.15] tracking-tight max-w-4xl text-gray-50">
            Engagements that moved the operational needle.
          </h1>
          <p className="font-sans text-gray-300 text-sm md:text-base mt-4 max-w-2xl font-light">
            A selection of placeholder engagements — full versions available under NDA.
          </p>
        </div>
      </section>

      {/* Filter and Content section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-100 pb-6" id="sector-filters">
          {sectors.map((sec) => {
            const isSelected = activeSector === sec;
            return (
              <button
                key={sec}
                onClick={() => setActiveSector(sec)}
                id={`filter-btn-${sec.replace(/\s+/g, '-').toLowerCase()}`}
                className={`text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B1D2D] text-white border border-[#0B1D2D]'
                    : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-900 hover:border-gray-400'
                }`}
              >
                {sec === 'ALL' ? 'ALL SECTORS' : sec}
              </button>
            );
          })}
        </div>

        {/* Case Studies Grid */}
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
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={cs.id}
                  id={`case-card-${cs.id}`}
                  className="bg-white border border-gray-100 rounded-none shadow-sm flex flex-col justify-between h-full hover:border-gray-300 transition-colors group"
                >
                  <div>
                    {/* Optional Image */}
                    {hasImage ? (
                      <div className="overflow-hidden aspect-[4/3] bg-gray-100 border-b border-gray-100">
                        <img
                          src={cs.imageUrl}
                          alt={cs.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : null}

                    {/* Content Area */}
                    <div className="p-8">
                      {/* Meta Tags */}
                      <div className="flex justify-between items-center text-[11px] font-bold tracking-wider font-mono uppercase mb-4">
                        <span className="text-[#D9A343]">{cs.sector}</span>
                        <span className="text-gray-400">{cs.region}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-[#111827] text-xl md:text-2xl font-normal leading-snug mb-3 group-hover:text-blue-950 transition-colors">
                        {cs.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="font-sans text-gray-500 text-[14px] leading-relaxed mb-6 font-light">
                        {cs.subtitle}
                      </p>

                      {/* Bullet points for text-only card */}
                      {!hasImage && cs.bullets && (
                        <ul className="space-y-2.5 mb-8 border-t border-gray-50 pt-5">
                          {cs.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start text-xs text-gray-600 font-medium">
                              <span className="text-[#D9A343] mr-2 text-sm leading-none">•</span>
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
                        setActiveTab('contact');
                      }}
                      className="inline-flex items-center space-x-1.5 text-[11px] font-bold tracking-widest text-gray-900 hover:text-[#D9A343] transition-colors uppercase bg-transparent border-0 cursor-pointer p-0"
                    >
                      <span>Read Overview</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#D9A343] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
