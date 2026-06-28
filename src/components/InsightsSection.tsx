import { ThumbsUp, MessageSquare, ExternalLink, Linkedin } from 'lucide-react';
import { INSIGHTS } from '../data';
import { motion } from 'motion/react';

export default function InsightsSection() {
  return (
    <div className="bg-[#FAFBFD] min-h-screen">
      {/* Dark Navy Hero Section */}
      <section className="bg-[#0B1D2D] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D9A343] uppercase block mb-3 font-mono">
            INSIGHTS STREAM
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.15] tracking-tight max-w-4xl text-gray-50">
            Field notes from the practice.
          </h1>
          <p className="font-sans text-gray-300 text-sm md:text-base mt-4 max-w-2xl font-light">
            A curated stream from our LinkedIn channel — written by the senior team.
          </p>
        </div>
      </section>

      {/* Insights Stream Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSIGHTS.map((insight, index) => {
            const hasImage = !!insight.imageUrl;
            return (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={insight.id}
                id={`insight-card-${insight.id}`}
                className="bg-white border border-gray-100 rounded-none shadow-sm flex flex-col justify-between h-full hover:border-gray-300 transition-all duration-200"
              >
                <div>
                  {/* Optional Card Image */}
                  {hasImage ? (
                    <div className="overflow-hidden aspect-[4/3] bg-gray-50 border-b border-gray-100">
                      <img
                        src={insight.imageUrl}
                        alt="Insight visual"
                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : null}

                  {/* Profile Block */}
                  <div className="p-6 pb-4 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center space-x-3">
                      {/* Avatar initials badge */}
                      <div className="w-10 h-10 bg-[#0B1D2D] text-white flex items-center justify-center font-bold text-xs tracking-wider rounded-none font-mono">
                        {insight.author.avatarInitials}
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-xs text-gray-900 leading-tight">
                          {insight.author.name}
                        </h4>
                        <p className="font-sans text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-wider">
                          {insight.author.role}
                        </p>
                      </div>
                    </div>
                    {/* LinkedIn icon */}
                    <div className="text-gray-300">
                      <Linkedin className="w-4 h-4 fill-current stroke-0" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 pt-4">
                    <p className="font-sans text-gray-600 text-[14px] leading-relaxed font-light whitespace-pre-line">
                      {insight.text}
                    </p>
                  </div>
                </div>

                {/* Footer block */}
                <div className="p-6 pt-0">
                  <div className="border-t border-gray-100 pt-5 flex flex-col space-y-4">
                    {/* Date and Social Counts */}
                    <div className="flex items-center justify-between text-gray-400 text-[11px] font-mono uppercase tracking-wider">
                      <span>{insight.date}</span>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{insight.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{insight.comments}</span>
                        </span>
                      </div>
                    </div>

                    {/* LinkedIn Action Link */}
                    <div className="pt-1">
                      <a
                        href="#linkedin"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center space-x-1.5 text-[10px] font-bold tracking-widest text-[#0B1D2D] hover:text-[#D9A343] transition-colors uppercase"
                      >
                        <span>View on LinkedIn</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
