import React, { useState, useEffect, useMemo, useRef } from 'react';
import { UserProfile } from '../types';
import { MOCK_USER, COUNTRY_TO_LANGUAGES, EXCHANGE_RATES, UI_TRANSLATIONS } from '../constants';
import { ChevronRight, Lock, Check, Loader2, MapPin, Globe, FastForward, Search, Terminal, CreditCard, ShieldCheck, Zap, X } from 'lucide-react';

interface OnboardingProps {
  onComplete: (user: UserProfile) => void;
}

type ViewState = 'intro' | 'globe' | 'access';

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [viewState, setViewState] = useState<ViewState>('intro');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Data State
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [availableLanguages, setAvailableLanguages] = useState<any[]>([]);
  const [localPrice, setLocalPrice] = useState<string>('75');
  const [localCurrency, setLocalCurrency] = useState<string>('USD');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Ref for scroll container
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get Sorted Countries
  const countryList = useMemo(() => {
      const all = Object.keys(COUNTRY_TO_LANGUAGES).filter(k => k !== 'Default').sort();
      if (!searchTerm) return all;
      return all.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  // --- 1. Intro Timer ---
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (viewState === 'intro') {
      timer = setTimeout(() => setViewState('globe'), 3500);
    }
    return () => clearTimeout(timer);
  }, [viewState]);

  // --- Handlers ---

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    
    // Config
    const config = COUNTRY_TO_LANGUAGES[country] || COUNTRY_TO_LANGUAGES['Default'];
    setAvailableLanguages(config);
    
    // Price Calc
    const currency = config[0].currency || 'USD';
    setLocalCurrency(currency);
    const rate = EXCHANGE_RATES[currency] || 1;
    const eurRate = EXCHANGE_RATES['EUR'] || 0.92;
    const price = (75 / eurRate) * rate;
    setLocalPrice(Math.round(price).toString());
  };

  const handleLanguageSelect = (lang: string) => {
      setSelectedLanguage(lang);
      // Wait for state to update before switching view ensures render picks up new lang
      setTimeout(() => setViewState('access'), 50);
  };

  const handleLogin = () => {
    const updatedUser = { 
        ...MOCK_USER, 
        country: selectedCountry || 'United States',
        language: selectedLanguage,
        baseCurrency: localCurrency,
        displayCurrency: localCurrency
    };
    onComplete(updatedUser);
  };

  // Get current translation or fallback to English
  const t = UI_TRANSLATIONS[selectedLanguage]?.onboarding || UI_TRANSLATIONS['en'].onboarding;
  const isRTL = selectedLanguage === 'ar';

  // --- Render ---

  if (viewState === 'intro') {
      return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent text-white p-4">
          <div className="flex flex-col items-center animate-float-up text-center">
            {/* Logo Image */}
            <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-30 rounded-full"></div>
                <img 
                    src="https://fit-4rce-x.s3.eu-north-1.amazonaws.com/NovaTax+_logo.jpg" 
                    alt="NovaTax AI" 
                    className="w-64 md:w-96 relative z-10 rounded-xl shadow-2xl shadow-black/50"
                />
            </div>
            
            <div className="flex items-center gap-3 mb-8">
               <Loader2 className="animate-spin text-purple-400" />
               <p className="text-purple-300 font-mono text-sm uppercase tracking-widest">System Initializing...</p>
            </div>
            
            <button 
                onClick={() => setViewState('globe')}
                className="text-slate-400 hover:text-white text-[10px] uppercase tracking-widest flex items-center gap-2 border border-white/5 hover:border-purple-500/50 px-4 py-2 rounded-full transition-all"
            >
                Skip Intro <FastForward size={10} />
            </button>
          </div>
        </div>
      );
  }

  return (
    // Removed bg-[#020205] to let the purple gradient from body shine through
    <div className="fixed inset-0 z-50 bg-transparent bg-grid-pattern overflow-hidden">
        <div className="h-full flex flex-col items-center justify-center relative z-10">
            
            {/* --- NODE SELECTION VIEW (SCROLL WHEEL) --- */}
            {viewState === 'globe' && (
                <div className="w-full h-full flex flex-col animate-fade-in relative">
                    {!selectedCountry ? (
                        <>
                            {/* Header */}
                            <div className="text-center pt-12 pb-6 z-20 flex-shrink-0">
                                <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-2 text-glow drop-shadow-lg">
                                    SELECT JURISDICTION
                                </h1>
                                <p className="text-purple-400 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                                    <Globe size={10} className="animate-pulse" />
                                    Global Jurisdictions Active: {countryList.length}
                                </p>
                            </div>
                            
                            {/* Search */}
                            <div className="w-full max-w-md mx-auto px-6 mb-4 z-20 flex-shrink-0">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search size={14} className="text-purple-400 group-focus-within:text-white transition-colors" />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="FILTER REGION..." 
                                        className="w-full bg-black/40 border border-purple-500/30 rounded-none py-2 pl-10 pr-4 text-xs text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-slate-400 transition-all font-mono uppercase tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        autoFocus
                                    />
                                    <div className="absolute top-0 right-0 h-full w-8 border-l border-purple-500/20 flex items-center justify-center">
                                         <Terminal size={12} className="text-purple-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Scroll Wheel Container */}
                            <div 
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto relative custom-scrollbar scroll-smooth perspective-container pb-24" 
                                style={{ 
                                    perspective: '1000px', 
                                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' 
                                }}
                            >
                                <div className="max-w-lg mx-auto py-12 px-4 space-y-2">
                                    {countryList.length === 0 && (
                                        <div className="text-center text-slate-500 font-mono py-12 uppercase tracking-widest border border-dashed border-white/10 p-8">
                                            No Jurisdiction Found
                                        </div>
                                    )}
                                    
                                    {countryList.map((country, index) => (
                                        <button 
                                            key={country} 
                                            onClick={() => handleCountrySelect(country)}
                                            className="w-full group relative flex items-center justify-between p-3 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] outline-none transform-style-3d hover:z-50"
                                        >
                                            {/* Background Plate - Sleek & Compact */}
                                            <div className="absolute inset-0 bg-black/40 border border-white/5 group-hover:border-purple-500 group-hover:bg-purple-900/20 skew-x-[-10deg] transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"></div>
                                            
                                            {/* Glowing Edge Line */}
                                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 group-hover:bg-purple-500 skew-x-[-10deg] transition-colors duration-300"></div>

                                            {/* Content */}
                                            <div className="relative z-10 flex items-center gap-4 skew-x-[-10deg] pl-4 w-full">
                                                <span className="text-2xl filter drop-shadow-[0_0_5px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-300">
                                                    {COUNTRY_TO_LANGUAGES[country][0].flag}
                                                </span>
                                                <div className="text-left flex-1">
                                                    <h3 className="text-sm font-bold text-slate-300 group-hover:text-white uppercase tracking-wider transition-colors font-['Sora']">
                                                        {country}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[9px] text-purple-300 font-mono bg-purple-500/10 px-1.5 border border-purple-500/20">
                                                            {COUNTRY_TO_LANGUAGES[country][0].currency}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                {/* Active Indicator */}
                                                <div className="w-6 h-6 flex items-center justify-center border border-white/10 bg-black/20 group-hover:border-purple-500 group-hover:bg-purple-600 transition-all duration-300">
                                                    <ChevronRight className="text-white/50 group-hover:text-white" size={12} />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        // Language Selection Popup
                        <div className="w-full h-full flex items-center justify-center p-4 bg-black/60 backdrop-blur-md z-50 animate-fade-in">
                            <div className="w-full max-w-sm animate-float-up relative">
                                <div className="glass-panel p-6 rounded-none border border-purple-500/30 relative shadow-[0_0_50px_rgba(168,85,247,0.2)] bg-[#050510]/90">
                                    <button 
                                        onClick={() => setSelectedCountry(null)} 
                                        className="absolute top-4 right-4 text-slate-500 hover:text-white text-[10px] uppercase font-bold tracking-widest hover:text-purple-400 transition-colors flex items-center gap-2 z-10"
                                    >
                                        <Globe size={14} /> CHANGE COUNTRY
                                    </button>
                                    
                                    <div className="mb-6 border-b border-white/10 pb-4">
                                        <p className="text-purple-400 text-[9px] uppercase tracking-widest mb-1 flex items-center gap-2">
                                            <MapPin size={10} /> Target Jurisdiction
                                        </p>
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">{selectedCountry}</h2>
                                    </div>
                                    
                                    <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Globe size={10} className="text-purple-400" /> Select Interface Language
                                    </p>
                                    
                                    <div className="grid grid-cols-1 gap-2">
                                        {availableLanguages.map((lang) => (
                                            <button key={lang.code} onClick={() => handleLanguageSelect(lang.code)}
                                                className="w-full py-3 bg-white/5 hover:bg-purple-600 border border-white/10 hover:border-purple-400 text-white hover:text-white font-bold uppercase tracking-widest transition-all group flex items-center px-4 gap-3 relative overflow-hidden cursor-pointer skew-x-[-5deg]">
                                                <span className="text-xl skew-x-[5deg]">{lang.flag}</span> 
                                                <span className="skew-x-[5deg] text-sm font-bold">{lang.nativeName}</span>
                                                <ChevronRight className="ml-auto opacity-50 group-hover:opacity-100 skew-x-[5deg]" size={14} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* --- ACCESS PAGE (Refined Layout) --- */}
            {viewState === 'access' && (
                <div className="w-full h-full overflow-y-auto custom-scrollbar relative z-20 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="min-h-full w-full flex flex-col items-center justify-start py-12 px-6">
                        <div className="w-full max-w-md flex flex-col gap-6 relative my-auto">
                            
                            {/* Back Button */}
                            <button 
                                onClick={() => setViewState('globe')} 
                                className={`self-start text-slate-400 hover:text-white text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 transition-colors mb-2`}
                            >
                                <ChevronRight size={12} className={isRTL ? "" : "rotate-180"} /> {t.backBtn}
                            </button>

                            {/* 1. APP DESCRIPTION */}
                            <div className="text-center space-y-5 pt-2">
                                 {/* Logo Icon */}
                                 <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-pulse-glow">
                                    <span className="text-3xl font-black text-purple-400">N</span>
                                 </div>
                                 <h1 className="text-3xl font-bold text-white uppercase tracking-tight">{t.title}</h1>
                                 <div className="bg-black/40 p-6 border border-white/10 shadow-2xl rounded-lg backdrop-blur-sm">
                                    <p className="text-slate-100 text-sm leading-relaxed font-mono text-justify">
                                        {t.desc}
                                    </p>
                                 </div>
                            </div>

                            {/* 2. LOGIN BUTTON */}
                            <div className="w-full">
                                 <button 
                                    onClick={() => setIsLoginOpen(true)}
                                    className="w-full py-4 bg-black/40 border border-purple-500 text-purple-400 font-bold uppercase tracking-widest transition-all hover:bg-purple-600 hover:text-white shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] flex items-center justify-center gap-3 group relative overflow-hidden"
                                 >
                                    <span className="relative z-10 text-sm">{t.loginBtn}</span>
                                    <Terminal size={16} className="relative z-10" />
                                    <div className={`absolute inset-0 bg-purple-500/20 transform -skew-x-12 ${isRTL ? '-translate-x-full group-hover:translate-x-0' : 'translate-x-full group-hover:translate-x-0'} transition-transform duration-300`}></div>
                                 </button>
                            </div>

                            {/* 3. SUBSCRIPTION CARD */}
                            <div className="glass-panel p-0.5 bg-gradient-to-br from-white/10 to-transparent group cursor-pointer relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 shadow-xl" onClick={() => setIsLoginOpen(true)}>
                                 <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                                    <Zap size={80} />
                                 </div>
                                 <div className="bg-black/60 p-6 h-full relative z-10">
                                      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-6">
                                          <div>
                                              <h3 className="text-white text-base font-bold uppercase tracking-widest flex items-center gap-2 mb-1">
                                                 <CreditCard size={16} className="text-purple-400" /> {t.subTitle}
                                              </h3>
                                              <p className="text-[10px] text-slate-400 uppercase tracking-widest">{t.subDesc}</p>
                                          </div>
                                          <div className={`text-${isRTL ? 'left' : 'right'}`}>
                                              <span className="block text-3xl font-bold text-white text-glow">{localPrice} <span className="text-sm text-purple-400">{localCurrency}</span></span>
                                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.perYear}</span>
                                          </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mb-6">
                                          {t.features.map((feat: string, i: number) => (
                                              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                                   <div className="mt-0.5 p-0.5 bg-purple-500/20 rounded-full">
                                                        <Check size={10} className="text-purple-400" />
                                                   </div>
                                                   <span>{feat}</span>
                                              </div>
                                          ))}
                                      </div>

                                      <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 clip-path-polygon">
                                          {t.subBtn} <ShieldCheck size={16} />
                                      </button>
                                 </div>
                            </div>

                            <div className="text-center pb-4">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                                    {t.securedBy}
                                </p>
                            </div>

                        </div>
                    </div>
                    
                    {/* --- LOGIN MODAL / OVERLAY --- */}
                    {isLoginOpen && (
                        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
                            <div className="w-full max-w-sm bg-[#050510] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative animate-float-up p-8">
                                <button 
                                    onClick={() => setIsLoginOpen(false)}
                                    className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-slate-500 hover:text-white transition-colors`}
                                >
                                    <X size={18} />
                                </button>
                                
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-1">{t.loginTitle}</h2>
                                    <p className="text-[10px] text-slate-500 font-mono">SECURE HANDSHAKE PROTOCOL</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] text-purple-400 font-bold uppercase tracking-widest">Protocol ID / Email</label>
                                        <input type="email" autoFocus className="w-full bg-black/40 border border-white/20 p-3 text-white placeholder-slate-600 outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all font-mono text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] text-purple-400 font-bold uppercase tracking-widest">Access Key</label>
                                        <input type="password" placeholder="••••••••••••" className="w-full bg-black/40 border border-white/20 p-3 text-white placeholder-slate-600 outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all font-mono text-sm" />
                                    </div>
                                    <button onClick={handleLogin} className="w-full py-4 mt-4 bg-purple-600 text-white font-bold uppercase tracking-widest hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-900/50">
                                        {t.loginBtn} <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

export default Onboarding;