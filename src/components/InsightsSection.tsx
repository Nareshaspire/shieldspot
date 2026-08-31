import { useState, useEffect } from 'react';
import { ThumbsUp, MessageSquare, ExternalLink, Linkedin, Loader2 } from 'lucide-react';
import { fetchInsights } from '../lib/firebase';
import { Insight } from '../types';
import { motion } from 'motion/react';

export default function InsightsSection() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchInsights();
      setInsights(data);
      setLoading(false);
    };
    loadData();
  }, []);
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
              INSIGHTS STREAM
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] tracking-tight max-w-4xl text-white">
              Field notes from <span className="text-gradient">the practice</span>.
            </h1>
            <p className="font-sans text-gray-400 text-base md:text-lg mt-6 max-w-2xl font-light leading-relaxed">
              A curated stream from our LinkedIn channel — written by the senior team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-[#00e676] animate-spin" />
        </div>
      )}

      {/* Insights Stream Cards Grid */}
      {!loading && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((insight, index) => {
              const hasImage = !!insight.imageUrl;
            return (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={insight.id}
                id={`insight-card-${insight.id}`}
                className="glass rounded-2xl flex flex-col justify-between h-full hover:shadow-[0_15px_40px_rgba(0,230,118,0.1)] hover:bg-white/10 transition-all duration-300 group border-t border-white/20 overflow-hidden"
              >
                <div>
                  {/* Optional Card Image */}
                  {hasImage ? (
                    <div className="overflow-hidden aspect-[4/3] bg-black/50 border-b border-white/10 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
                      <img
                        src={insight.imageUrl}
                        alt="Insight visual"
                        className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : null}

                  {/* Profile Block */}
                  <div className="p-6 pb-4 flex items-center justify-between border-b border-white/10 relative z-20">
                    <div className="flex items-center space-x-3">
                      {/* Avatar initials badge */}
                      <div className="w-10 h-10 glass rounded-full flex items-center justify-center font-bold text-xs tracking-wider text-[#00e676] font-sans border border-[#00e676]/30 shadow-inner">
                        {insight.author.avatarInitials}
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-[13px] text-white leading-tight">
                          {insight.author.name}
                        </h4>
                        <p className="font-sans text-[10px] text-[#00b4d8] font-bold mt-1 uppercase tracking-[0.1em]">
                          {insight.author.role}
                        </p>
                      </div>
                    </div>
                    {/* LinkedIn icon */}
                    <div className="text-gray-400 group-hover:text-[#00e676] transition-colors">
                      <Linkedin className="w-4 h-4 fill-current stroke-0" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 pt-5 relative z-20">
                    <p className="font-sans text-gray-300 text-[14px] leading-relaxed font-light whitespace-pre-line group-hover:text-white transition-colors">
                      {insight.text}
                    </p>
                  </div>
                </div>

                {/* Footer block */}
                <div className="p-6 pt-0 relative z-20">
                  <div className="border-t border-white/10 pt-5 flex flex-col space-y-4">
                    {/* Date and Social Counts */}
                    <div className="flex items-center justify-between text-gray-400 text-[11px] font-sans uppercase tracking-widest font-semibold">
                      <span>{insight.date}</span>
                      <div className="flex items-center space-x-5">
                        <span className="flex items-center space-x-1.5 hover:text-[#00e676] transition-colors cursor-pointer">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{insight.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1.5 hover:text-[#00e676] transition-colors cursor-pointer">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{insight.comments}</span>
                        </span>
                      </div>
                    </div>

                    {/* LinkedIn Action Link */}
                    <div className="pt-2">
                      <a
                        href="#linkedin"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center space-x-1.5 text-[10px] font-bold tracking-widest text-white hover:text-[#00e676] transition-colors uppercase group/link"
                      >
                        <span>View on LinkedIn</span>
                        <ExternalLink className="w-3 h-3 text-gray-500 group-hover/link:text-[#00e676] transition-colors" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
      )}
    </div>
  );
}
