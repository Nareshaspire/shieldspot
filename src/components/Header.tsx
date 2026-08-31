import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/insights', label: 'Insights' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  const languages = ['EN', 'DE', 'FR', 'ES', 'JP'];

  const handleCloseMobileMenu = () => {
    setIsOpen(false);
  };

  const handleLangSelect = (lang: string) => {
    setSelectedLang(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass border-x-0 border-t-0 border-b-white/10 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-2.5 cursor-pointer group"
            id="header-logo"
            onClick={handleCloseMobileMenu}
          >
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
              <Shield className="w-6 h-6 text-[#00e676]" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-white group-hover:text-gradient transition-all">
              ShieldSpot
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8 lg:space-x-10">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  id={`nav-link-${item.label.toLowerCase()}`}
                  className={`relative py-7 text-[15px] font-medium tracking-tight transition-all focus:outline-none cursor-pointer ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-accent rounded-t-full shadow-[0_0_10px_rgba(0,230,118,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Actions */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Language dropdown (interactive) */}
            <div className="relative cursor-pointer">
              <button 
                id="language-dropdown-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all"
              >
                <span>{selectedLang}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {langDropdownOpen && (
                <div 
                  id="language-menu"
                  className="absolute right-0 mt-2 w-24 glass rounded-xl shadow-[0_0_30px_rgba(0,230,118,0.15)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLangSelect(lang)}
                      id={`lang-select-${lang.toLowerCase()}`}
                      className={`block w-full text-left px-4 py-2 text-xs font-semibold hover:bg-white/10 transition-colors ${
                        selectedLang === lang ? 'text-[#00e676] bg-white/5' : 'text-gray-400'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Briefing CTA */}
            <Link
              to="/contact"
              id="cta-briefing-desktop"
              className="bg-gradient-accent hover:opacity-90 text-white font-sans font-bold text-[14px] px-6 py-2.5 rounded-full shadow-[0_0_15px_rgba(0,230,118,0.4)] transition-all duration-300 cursor-pointer hover:scale-105"
            >
              Book a Briefing
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-btn"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleCloseMobileMenu}
                  id={`mobile-nav-link-${item.label.toLowerCase()}`}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white font-bold border-l-4 border-[#00e676]'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-white/10 px-4 flex flex-col space-y-4">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-sm font-medium">Language</span>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLangSelect(lang)}
                      id={`mobile-lang-${lang.toLowerCase()}`}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                        selectedLang === lang 
                          ? 'bg-white/10 text-[#00e676] border border-[#00e676]/30' 
                          : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              
              <Link
                to="/contact"
                onClick={handleCloseMobileMenu}
                id="cta-briefing-mobile"
                className="w-full text-center bg-gradient-accent text-white font-bold py-3.5 rounded-full shadow-[0_0_15px_rgba(0,230,118,0.4)] hover:opacity-90 transition-opacity inline-block"
              >
                Book a Briefing
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
