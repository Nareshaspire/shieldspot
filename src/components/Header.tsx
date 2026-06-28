import { useState } from 'react';
import { Shield, Menu, X, ChevronDown } from 'lucide-react';
import { Tab } from '../types';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: { id: Tab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'insights', label: 'Insights' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  const languages = ['EN', 'DE', 'FR', 'ES', 'JP'];

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  const handleLangSelect = (lang: string) => {
    setSelectedLang(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => handleTabClick('home')}
            id="header-logo"
          >
            <div className="p-1.5 rounded-md text-[#D9A343] transition-colors">
              <Shield className="w-6 h-6 stroke-[1.75]" />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-[#111827]">
              ShieldSpot
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8 lg:space-x-10">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`relative py-7 text-[15px] font-medium tracking-tight transition-colors focus:outline-none cursor-pointer ${
                    isActive 
                      ? 'text-[#111827] font-semibold' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D9A343]" />
                  )}
                </button>
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
                className="flex items-center space-x-1 text-sm font-semibold text-gray-700 hover:text-gray-950 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md border border-gray-100"
              >
                <span>{selectedLang}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {langDropdownOpen && (
                <div 
                  id="language-menu"
                  className="absolute right-0 mt-2 w-24 bg-white border border-gray-100 shadow-md py-1 z-50 rounded animate-in fade-in slide-in-from-top-1 duration-100"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLangSelect(lang)}
                      id={`lang-select-${lang.toLowerCase()}`}
                      className={`block w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition-colors ${
                        selectedLang === lang ? 'text-[#D9A343] bg-amber-50/50' : 'text-gray-600'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Briefing CTA */}
            <button
              onClick={() => handleTabClick('contact')}
              id="cta-briefing-desktop"
              className="bg-[#D9A343] hover:bg-[#c49237] text-white font-sans font-semibold text-[14px] px-5 py-2.5 rounded shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              Book a Briefing
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-btn"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
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
        <div className="md:hidden bg-white border-b border-gray-100 animate-in fade-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  id={`mobile-nav-link-${item.id}`}
                  className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium transition-all ${
                    isActive
                      ? 'bg-amber-50/75 text-[#D9A343] font-semibold border-l-4 border-[#D9A343]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <div className="pt-4 border-t border-gray-100 px-4 flex flex-col space-y-3">
              <div className="flex items-center justify-between text-gray-600">
                <span className="text-sm font-medium">Language</span>
                <div className="flex flex-wrap gap-1">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLangSelect(lang)}
                      id={`mobile-lang-${lang.toLowerCase()}`}
                      className={`text-[11px] font-bold px-2 py-1 rounded transition-colors cursor-pointer ${
                        selectedLang === lang 
                          ? 'bg-amber-100 text-[#D9A343] border border-amber-200' 
                          : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => handleTabClick('contact')}
                id="cta-briefing-mobile"
                className="w-full text-center bg-[#D9A343] hover:bg-[#c49237] text-white font-semibold py-3 rounded shadow-sm"
              >
                Book a Briefing
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
