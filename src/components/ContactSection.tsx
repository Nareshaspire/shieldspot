import React, { useState } from 'react';
import { Mail, ShieldCheck, MapPin, CheckCircle, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactSectionProps {
  prefilledMessage?: string;
  setPrefilledMessage?: (msg: string) => void;
}

export default function ContactSection({ prefilledMessage = '', setPrefilledMessage }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    sector: 'Heavy Industry',
    message: '',
    requireNDA: false,
  });

  // Sync prefilled message if it changes
  React.useEffect(() => {
    if (prefilledMessage) {
      setFormData((prev) => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledMessage]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.company || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    // Success simulation
    setIsSubmitted(true);
    if (setPrefilledMessage) {
      setPrefilledMessage('');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      sector: 'Heavy Industry',
      message: '',
      requireNDA: false,
    });
    setIsSubmitted(false);
    if (setPrefilledMessage) {
      setPrefilledMessage('');
    }
  };

  const locations = [
    { city: 'Sydney', region: 'APAC Operations', address: 'Barangaroo Ave, NSW 2000' },
    { city: 'New York', region: 'Americas Operations', address: 'Hudson Yards, NY 10001' },
    { city: 'London', region: 'EMEA Operations', address: 'Broadgate Tower, EC2M 2QS' },
  ];

  return (
    <div className="bg-transparent min-h-screen relative">
      {/* Dark Navy Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00e676]/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full glass border border-[#00e676]/30 text-[10px] font-bold tracking-[0.2em] text-[#00e676] uppercase mb-4 font-sans">
              ENGAGEMENTS & INQUIRIES
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] tracking-tight max-w-4xl text-white">
              Initiate a telemetry <span className="text-gradient">alignment briefing</span>.
            </h1>
            <p className="font-sans text-gray-400 text-base md:text-lg mt-6 max-w-2xl font-light leading-relaxed">
              We conduct customized operational briefings under strict NDA to evaluate your telemetry compatibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid containing Details and Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Details / Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <h2 className="font-serif text-3xl text-white font-medium tracking-tight mb-6 leading-snug">
              Establish a <span className="text-gradient drop-shadow-sm">secure line</span> of inquiry.
            </h2>
            <p className="font-sans text-gray-400 text-[15px] leading-relaxed font-light mb-10">
              We respond to qualified inquiries from COOs, safety directors, and technical operations leaders. All introductory consultations are backed by standard mutual non-disclosure frameworks.
            </p>

            {/* Email contact */}
            <div className="flex items-center space-x-5 mb-12 border-b border-white/10 pb-10">
              <div className="w-12 h-12 glass rounded-full border border-white/10 flex items-center justify-center shrink-0 shadow-inner hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-[#00e676]" />
              </div>
              <div>
                <span className="block font-sans text-[10px] text-[#00b4d8] font-bold uppercase tracking-[0.15em] mb-1">
                  SECURE OFFICE INBOX
                </span>
                <a 
                  href="mailto:briefings@shieldspot.com" 
                  className="font-sans text-base font-semibold text-white hover:text-[#00e676] transition-colors"
                >
                  briefings@shieldspot.com
                </a>
              </div>
            </div>

            {/* Hub Locations */}
            <div>
              <span className="block font-sans text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-8">
                OPERATIONAL HUBS
              </span>
              <div className="space-y-8">
                {locations.map((loc, idx) => (
                  <div key={idx} className="flex space-x-4 group">
                    <div className="w-8 h-8 glass rounded-full flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#00b4d8] transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-[13px] text-white leading-tight">
                        {loc.city} <span className="text-[#00b4d8] font-medium font-sans text-[11px] ml-1.5 uppercase tracking-widest">/ {loc.region}</span>
                      </h4>
                      <p className="font-sans text-[13px] text-gray-400 font-light mt-1.5">
                        {loc.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form / Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="glass rounded-3xl p-8 md:p-12 shadow-[0_15px_40px_rgba(0,230,118,0.05)] border-t border-white/20 relative min-h-[450px] flex flex-col justify-center">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-7" id="briefing-form">
                  <div className="border-b border-white/10 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#00e676] uppercase">
                      BRIEFING RESERVATION
                    </span>
                    <span className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full glass border border-amber-500/30 text-amber-500 font-sans text-[10px] uppercase font-bold tracking-widest shadow-inner">
                      <span>★</span>
                      <span>NDA PROTECTED</span>
                    </span>
                  </div>

                  {error && (
                    <div className="bg-red-950/30 border border-red-500/50 text-red-300 text-[13px] px-5 py-4 rounded-xl font-sans font-medium flex items-center shadow-inner">
                      {error}
                    </div>
                  )}

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label htmlFor="form-name" className="block text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#00e676] focus:bg-white/10 px-5 py-3 text-[14px] text-white outline-none transition-all rounded-xl font-sans shadow-inner placeholder:text-gray-600"
                        placeholder="e.g. Arthur Vance"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-email" className="block text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#00e676] focus:bg-white/10 px-5 py-3 text-[14px] text-white outline-none transition-all rounded-xl font-sans shadow-inner placeholder:text-gray-600"
                        placeholder="vance@company.com"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company and Sector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label htmlFor="form-company" className="block text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2.5">
                        Company / Enterprise *
                      </label>
                      <input
                        type="text"
                        id="form-company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#00e676] focus:bg-white/10 px-5 py-3 text-[14px] text-white outline-none transition-all rounded-xl font-sans shadow-inner placeholder:text-gray-600"
                        placeholder="e.g. Rio Tinto"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-sector" className="block text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2.5">
                        Primary Sector
                      </label>
                      <select
                        id="form-sector"
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#00e676] focus:bg-white/10 px-5 py-3 text-[14px] text-white outline-none transition-all rounded-xl font-sans shadow-inner appearance-none"
                      >
                        <option value="Heavy Industry" className="bg-gray-900">Heavy Industry</option>
                        <option value="Mining" className="bg-gray-900">Mining</option>
                        <option value="Healthcare" className="bg-gray-900">Healthcare</option>
                        <option value="Government / Other" className="bg-gray-900">Government / Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Textarea: Briefing Focus */}
                  <div>
                    <label htmlFor="form-message" className="block text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2.5">
                      Briefing Focus / Telemetry Backbones *
                    </label>
                    <textarea
                      id="form-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#00e676] focus:bg-white/10 px-5 py-4 text-[14px] text-white outline-none transition-all rounded-xl font-sans leading-relaxed shadow-inner placeholder:text-gray-600 resize-none"
                      placeholder="Outline any legacy database architectures (e.g. SCADA historian, clinical EHR) and predictive targets."
                    />
                  </div>

                  {/* Require NDA Checkbox */}
                  <div className="flex items-start bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center h-5 mt-0.5">
                      <input
                        type="checkbox"
                        id="form-nda"
                        checked={formData.requireNDA}
                        onChange={(e) => setFormData({ ...formData, requireNDA: e.target.checked })}
                        className="w-4 h-4 text-[#00e676] bg-black border-white/20 rounded focus:ring-[#00e676] focus:ring-offset-gray-900 cursor-pointer"
                      />
                    </div>
                    <div className="ml-4 text-[13px] leading-relaxed">
                      <label htmlFor="form-nda" className="font-sans text-gray-300 cursor-pointer font-light select-none">
                        Require a signed unilateral NDA before presenting specific telemetry layouts
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      id="form-submit-btn"
                      className="w-full bg-gradient-accent text-white font-sans font-semibold text-[13px] tracking-[0.2em] uppercase py-4 rounded-xl shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] hover:scale-[1.02] transition-all duration-300 cursor-pointer flex items-center justify-center space-x-3"
                    >
                      <ShieldCheck className="w-5 h-5 text-white drop-shadow-md" />
                      <span>Request Briefing Slot</span>
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-10"
                  id="form-success-alert"
                >
                  <div className="w-20 h-20 glass rounded-full border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  
                  <span className="inline-block font-sans text-[11px] font-bold tracking-[0.2em] text-[#00e676] uppercase mb-4">
                    TRANSMISSION SUCCESSFUL
                  </span>
                  
                  <h3 className="font-serif text-3xl text-white font-medium tracking-tight mb-5">
                    Inquiry registered securely.
                  </h3>
                  
                  <p className="font-sans text-gray-400 text-[15px] leading-relaxed font-light max-w-md mx-auto mb-10">
                    An operational representative from our {formData.sector} group will review your request. We will transmit an introductory NDA package to <strong className="text-white font-medium">{formData.email}</strong> within 12 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                    {formData.requireNDA && (
                      <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[12px] font-medium font-sans px-4 py-2.5 rounded-full shadow-inner">
                        <FileText className="w-4 h-4" />
                        <span>NDA Drafting Pending</span>
                      </div>
                    )}
                    
                    <button
                      onClick={handleReset}
                      id="reset-form-btn"
                      className="inline-flex items-center justify-center text-[12px] font-bold text-gray-400 hover:text-white transition-colors tracking-[0.15em] uppercase font-sans bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-2.5 rounded-full cursor-pointer"
                    >
                      New Transmission
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
