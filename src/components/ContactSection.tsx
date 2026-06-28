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
    <div className="bg-[#FAFBFD] min-h-screen">
      {/* Dark Navy Hero Section */}
      <section className="bg-[#0B1D2D] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#D9A343] uppercase block mb-3 font-mono">
            ENGAGEMENTS & INQUIRIES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.15] tracking-tight max-w-4xl text-gray-50">
            Initiate a telemetry alignment briefing.
          </h1>
          <p className="font-sans text-gray-300 text-sm md:text-base mt-4 max-w-2xl font-light">
            We conduct customized operational briefings under strict NDA to evaluate your telemetry compatibility.
          </p>
        </div>
      </section>

      {/* Grid containing Details and Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Details / Left Column */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-2xl text-gray-900 font-normal tracking-tight mb-6">
              Establish a secure line of inquiry.
            </h2>
            <p className="font-sans text-gray-500 text-sm leading-relaxed font-light mb-8">
              We respond to qualified inquiries from COOs, safety directors, and technical operations leaders. All introductory consultations are backed by standard mutual non-disclosure frameworks.
            </p>

            {/* Email contact */}
            <div className="flex items-center space-x-3.5 mb-10 border-b border-gray-100 pb-8">
              <div className="w-10 h-10 bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#D9A343]" />
              </div>
              <div>
                <span className="block font-sans text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  SECURE OFFICE INBOX
                </span>
                <a 
                  href="mailto:briefings@shieldspot.com" 
                  className="font-sans text-sm font-semibold text-gray-900 hover:text-[#D9A343] transition-colors"
                >
                  briefings@shieldspot.com
                </a>
              </div>
            </div>

            {/* Hub Locations */}
            <div>
              <span className="block font-sans text-xs text-gray-400 font-bold uppercase tracking-wider mb-6">
                OPERATIONAL HUBS
              </span>
              <div className="space-y-6">
                {locations.map((loc, idx) => (
                  <div key={idx} className="flex space-x-3.5">
                    <div className="text-gray-400 mt-0.5 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs text-gray-900 leading-tight">
                        {loc.city} <span className="text-gray-400 font-medium font-mono text-[10px] ml-1">/ {loc.region}</span>
                      </h4>
                      <p className="font-sans text-xs text-gray-500 font-light mt-1">
                        {loc.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form / Right Column */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-100 p-8 md:p-10 shadow-sm relative min-h-[450px] flex flex-col justify-center">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6" id="briefing-form">
                  <div className="border-b border-gray-100 pb-5 mb-5 flex items-center justify-between">
                    <span className="font-sans text-[11px] font-bold tracking-widest text-[#D9A343] uppercase font-mono">
                      BRIEFING RESERVATION
                    </span>
                    <span className="text-gray-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                      ★ NDA PROTECTED
                    </span>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-700 text-xs px-4 py-3 rounded-none font-sans font-medium">
                      {error}
                    </div>
                  )}

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="form-name" className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FAFBFD] border border-gray-200 focus:border-[#D9A343] px-4 py-2.5 text-sm outline-none transition-colors rounded-none font-sans"
                        placeholder="e.g. Arthur Vance"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-email" className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAFBFD] border border-gray-200 focus:border-[#D9A343] px-4 py-2.5 text-sm outline-none transition-colors rounded-none font-sans"
                        placeholder="vance@company.com"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company and Sector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="form-company" className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                        Company / Enterprise *
                      </label>
                      <input
                        type="text"
                        id="form-company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-[#FAFBFD] border border-gray-200 focus:border-[#D9A343] px-4 py-2.5 text-sm outline-none transition-colors rounded-none font-sans"
                        placeholder="e.g. Rio Tinto"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-sector" className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                        Primary Sector
                      </label>
                      <select
                        id="form-sector"
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full bg-[#FAFBFD] border border-gray-200 focus:border-[#D9A343] px-4 py-2.5 text-sm outline-none transition-colors rounded-none font-sans text-gray-700"
                      >
                        <option value="Heavy Industry">Heavy Industry</option>
                        <option value="Mining">Mining</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Government / Other">Government / Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Textarea: Briefing Focus */}
                  <div>
                    <label htmlFor="form-message" className="block text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">
                      Briefing Focus / Telemetry Backbones *
                    </label>
                    <textarea
                      id="form-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAFBFD] border border-gray-200 focus:border-[#D9A343] px-4 py-2.5 text-sm outline-none transition-colors rounded-none font-sans leading-relaxed"
                      placeholder="Outline any legacy database architectures (e.g. SCADA historian, clinical EHR) and predictive targets."
                    />
                  </div>

                  {/* Require NDA Checkbox */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id="form-nda"
                        checked={formData.requireNDA}
                        onChange={(e) => setFormData({ ...formData, requireNDA: e.target.checked })}
                        className="w-4 h-4 text-[#D9A343] bg-gray-50 border-gray-200 rounded-none focus:ring-amber-500 cursor-pointer"
                      />
                    </div>
                    <div className="ml-3 text-xs leading-none">
                      <label htmlFor="form-nda" className="font-sans text-gray-500 cursor-pointer font-light select-none">
                        Require a signed unilateral NDA before presenting specific telemetry layouts
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="form-submit-btn"
                      className="w-full bg-[#0B1D2D] hover:bg-[#152e44] text-white font-sans font-semibold text-[13px] tracking-widest uppercase py-3.5 rounded shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#D9A343]" />
                      <span>Request Briefing Slot</span>
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8"
                  id="form-success-alert"
                >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  
                  <span className="inline-block font-sans text-[11px] font-bold tracking-widest text-[#D9A343] uppercase mb-2 font-mono">
                    TRANSMISSION SUCCESSFUL
                  </span>
                  
                  <h3 className="font-serif text-2xl text-gray-900 font-normal tracking-tight mb-4">
                    Inquiry registered securely.
                  </h3>
                  
                  <p className="font-sans text-gray-500 text-sm leading-relaxed font-light max-w-md mx-auto mb-8">
                    An operational representative from our {formData.sector} group will review your request. We will transmit an introductory NDA package to <strong className="text-gray-900">{formData.email}</strong> within 12 hours.
                  </p>

                  <div className="flex justify-center space-x-4">
                    {formData.requireNDA && (
                      <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-100 text-amber-800 text-[11px] font-medium font-sans px-3.5 py-2">
                        <FileText className="w-3.5 h-3.5 text-[#D9A343]" />
                        <span>NDA Drafting Pending</span>
                      </div>
                    )}
                    
                    <button
                      onClick={handleReset}
                      id="reset-form-btn"
                      className="inline-flex items-center justify-center text-xs font-bold text-gray-500 hover:text-gray-900 underline tracking-wider uppercase font-mono bg-transparent border-0 cursor-pointer"
                    >
                      New Transmission
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
