
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { UserProfile } from '../types';
import { MOCK_USER, COUNTRY_TO_LANGUAGES, EXCHANGE_RATES, UI_TRANSLATIONS } from '../constants';
import { ChevronRight, Loader2, MapPin, Globe, FastForward, Search, Terminal, CreditCard, ShieldCheck, Zap, X, Building2, User, CalendarDays, CheckCircle, Check, Lock } from 'lucide-react';
import { translateUIDictionary } from '../services/geminiService';

interface OnboardingProps {
  onComplete: (user: UserProfile) => void;
  initialView?: 'intro' | 'setup'; 
}

type ViewState = 'intro' | 'globe' | 'access' | 'setup';

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, initialView = 'intro' }) => {
  const [viewState, setViewState] = useState<ViewState>(initialView);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Data State - Reset on mount if coming in fresh
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [availableLanguages, setAvailableLanguages] = useState<any[]>([]);
  const [localPrice, setLocalPrice] = useState<string>('75');
  const [localCurrency, setLocalCurrency] = useState<string>('USD');
  const [searchTerm, setSearchTerm] = useState('');
  
  // New: AI Translation state for Onboarding UI
  const [localizedDict, setLocalizedDict] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const [regData, setRegData] = useState({
      companyName: '',
      businessStructure: '',
      incorporationDate: '',
      businessAddress: '',
      privateAddress: '',
      postalAddress: '',
      isPrivateSameAsBusiness: false,
      name: '',
      position: ''
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Force reset if starting in setup mode (Add Profile)
  useEffect(() => {
      if (initialView === 'setup') {
          setRegData({ companyName: '', businessStructure: '', incorporationDate: '', businessAddress: '', privateAddress: '', postalAddress: '', isPrivateSameAsBusiness: false, name: '', position: '' });
          setSelectedCountry('United States'); 
      }
  }, [initialView]);

  const countryList = useMemo(() => {
      const all = Object.keys(COUNTRY_TO_LANGUAGES).filter(k => k !== 'Default').sort();
      if (!searchTerm) return all;
      return all.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  useEffect(() => {
    if (regData.isPrivateSameAsBusiness) {
        setRegData(prev => ({ ...prev, privateAddress: prev.businessAddress }));
    }
  }, [regData.isPrivateSameAsBusiness, regData.businessAddress]);

  // Intro timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (viewState === 'intro') {
      timer = setTimeout(() => setViewState('globe'), 3500);
    }
    return () => clearTimeout(timer);
  }, [viewState]);

  // Trigger translation when language changes
  useEffect(() => {
      const fetchTranslation = async () => {
          // If supported, use static. If not, use AI.
          if (UI_TRANSLATIONS[selectedLanguage]) {
              setLocalizedDict(UI_TRANSLATIONS[selectedLanguage].onboarding);
              return;
          }
          setIsTranslating(true);
          const fullDict = await translateUIDictionary(UI_TRANSLATIONS['en'], selectedLanguage);
          setLocalizedDict(fullDict.onboarding);
          setIsTranslating(false);
      };
      
      if (selectedLanguage) fetchTranslation();
  }, [selectedLanguage]);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    const config = COUNTRY_TO_LANGUAGES[country] || COUNTRY_TO_LANGUAGES['Default'];
    setAvailableLanguages(config);
    // Use the first language of the country as default
    const defaultLang = config[0].code;
    setSelectedLanguage(defaultLang);
    
    const currency = config[0].currency || 'USD';
    setLocalCurrency(currency);
    const rate = EXCHANGE_RATES[currency] || 1;
    const eurRate = EXCHANGE_RATES['EUR'] || 0.92;
    const price = (75 / eurRate) * rate;
    setLocalPrice(Math.round(price).toString());
  };

  const handleLanguageSelect = (lang: string) => {
      setSelectedLanguage(lang);
      setTimeout(() => setViewState('access'), 50);
  };

  const handleLogin = () => {
    const updatedUser = { 
        ...MOCK_USER, 
        country: selectedCountry || 'United States',
        language: selectedLanguage,
        baseCurrency: localCurrency,
        displayCurrency: localCurrency,
        zakatEnabled: selectedCountry === 'Saudi Arabia' || selectedCountry === 'United Arab Emirates', 
    };
    onComplete(updatedUser);
  };

  const handleSubscribe = () => { setViewState('setup'); };

  const handleCompleteRegistration = () => {
      const newUser: UserProfile = {
          ...MOCK_USER,
          id: `user_${Date.now()}`,
          country: selectedCountry || 'United States',
          language: selectedLanguage,
          baseCurrency: localCurrency,
          displayCurrency: localCurrency,
          zakatEnabled: selectedCountry === 'Saudi Arabia' || selectedCountry === 'United Arab Emirates', 
          name: regData.name || 'New User',
          position: regData.position,
          companyName: regData.companyName,
          businessStructure: regData.businessStructure,
          incorporationDate: regData.incorporationDate,
          addresses: { business: regData.businessAddress, private: regData.privateAddress, postal: regData.postalAddress, isPrivateSameAsBusiness: regData.isPrivateSameAsBusiness }
      };
      onComplete(newUser);
  };

  const t = localizedDict || UI_TRANSLATIONS['en'].onboarding;
  const isRTL = selectedLanguage === 'ar';

  if (viewState === 'intro') {
      return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617] text-white p-4 font-sans">
          <div className="flex flex-col items-center animate-float-up text-center w-full">
            <div className="relative mb-8 group w-full max-w-[1200px] flex justify-center">
                <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-30 rounded-full animate-pulse"></div>
                <img src="https://fit-4rce-x.s3.eu-north-1.amazonaws.com/NovaTax__logo-invisible-background.png" alt="NovaTax AI" className="w-[95%] md:w-[900px] relative z-10 object-contain logo-glow" />
            </div>
            <div className="flex items-center gap-3 mb-8">
               <Loader2 className="animate-spin text-blue-400" />
               <p className="text-blue-300 text-sm">Initializing System...</p>
            </div>
          </div>
        </div>
      );
  }

  if (viewState === 'setup') {
      return (
          <div className="fixed inset-0 z-50 bg-[#f8fafc] overflow-y-auto custom-scrollbar text-slate-800" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="max-w-3xl mx-auto p-6 animate-fade-in pt-6"> {/* Reduced top padding */}
                  <div className="text-center mb-8"> {/* Reduced margin */}
                      <img src="https://fit-4rce-x.s3.eu-north-1.amazonaws.com/NovaTax__logo-invisible-background.png" className="w-48 mx-auto mb-6 opacity-100 logo-glow invert filter brightness-0" />
                      <h2 className="text-3xl font-extrabold text-slate-800 uppercase tracking-widest mb-2">{t.regTitle}</h2>
                      <p className="text-slate-500 text-sm">{t.regDesc}</p>
                  </div>

                  <div className="bg-white p-10 rounded-[2rem] relative overflow-hidden shadow-xl border border-slate-100">
                      <div className="mb-8"><h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2"><User size={16}/> Identity</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><input type="text" placeholder="Full Name" value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm outline-none focus:border-blue-500" /><input type="text" placeholder="Position (CEO, Founder)" value={regData.position} onChange={e => setRegData({...regData, position: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm outline-none focus:border-blue-500" /></div></div>
                      <div className="mb-8"><h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2"><Building2 size={16}/> Entity Details</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4"><input type="text" placeholder="Company Name" value={regData.companyName} onChange={e => setRegData({...regData, companyName: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm outline-none focus:border-blue-500" /><input type="text" placeholder="Legal Structure (LLC, etc.)" value={regData.businessStructure} onChange={e => setRegData({...regData, businessStructure: e.target.value})} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm outline-none focus:border-blue-500" /></div><div className="mb-4"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{t.incDate}</label><input type="date" value={regData.incorporationDate} onChange={e => setRegData({...regData, incorporationDate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm outline-none focus:border-blue-500" /></div></div>
                      <div className="mb-8"><h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2"><MapPin size={16}/> Addresses</h3><div className="space-y-4"><div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{t.busAddr}</label><input type="text" value={regData.businessAddress} onChange={e => setRegData({...regData, businessAddress: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm outline-none focus:border-blue-500" placeholder="Street, City, Zip" /></div><div className="flex items-center gap-2"><input type="checkbox" checked={regData.isPrivateSameAsBusiness} onChange={e => setRegData({...regData, isPrivateSameAsBusiness: e.target.checked})} className="accent-blue-500 w-4 h-4 rounded" /><span className="text-xs text-slate-500">{t.sameAddr}</span></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{t.privAddr}</label><input type="text" disabled={regData.isPrivateSameAsBusiness} value={regData.privateAddress} onChange={e => setRegData({...regData, privateAddress: e.target.value})} className={`w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm outline-none focus:border-blue-500 ${regData.isPrivateSameAsBusiness ? 'opacity-50' : ''}`} /></div><div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{t.postAddr} (Optional)</label><input type="text" value={regData.postalAddress} onChange={e => setRegData({...regData, postalAddress: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 text-sm outline-none focus:border-blue-500" /></div></div></div></div>
                      <button onClick={handleCompleteRegistration} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-xl uppercase tracking-widest transition-all mt-4 text-sm shadow-xl hover:scale-[1.01]">{t.completeSetup}</button>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#020617] overflow-hidden text-slate-200 font-sans">
        <div className="h-full flex flex-col items-center justify-center relative z-10">
            {viewState === 'globe' && (
                <div className="w-full h-full flex flex-col animate-fade-in relative">
                    {!selectedCountry ? (
                        <>
                            <div className="text-center pt-16 pb-8 z-20 flex-shrink-0 flex flex-col items-center">
                                <img src="https://fit-4rce-x.s3.eu-north-1.amazonaws.com/NovaTax__logo-invisible-background.png" alt="NovaTax AI" className="w-56 md:w-96 object-contain mb-6 logo-glow" />
                                <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-900/20"><Globe size={10} className="animate-pulse" /> 195+ Countries Available</p>
                            </div>
                            <div className="w-full max-w-md mx-auto px-6 mb-8 z-20 flex-shrink-0">
                                <div className="relative group">
                                    <Search size={16} className="absolute inset-y-0 left-4 my-auto text-blue-400 group-focus-within:text-white transition-colors" />
                                    <input type="text" placeholder="SEARCH COUNTRY..." className="w-full bg-[#1e293b] border border-slate-700 rounded-xl py-4 pl-12 pr-6 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-400 transition-all font-mono uppercase tracking-wider shadow-lg" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} autoFocus />
                                </div>
                            </div>
                            <div ref={scrollRef} className="flex-1 overflow-y-auto relative custom-scrollbar scroll-smooth perspective-container pb-24">
                                <div className="max-w-lg mx-auto py-12 px-4 space-y-3">
                                    {countryList.map((country) => (
                                        <button key={country} onClick={() => handleCountrySelect(country)} className="w-full group relative flex items-center justify-between p-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                                            <div className="absolute inset-0 bg-[#0f172a] border border-slate-800 rounded-xl group-hover:bg-blue-900/30 group-hover:border-blue-500/50 transition-all duration-300 shadow-md"></div>
                                            <div className="relative z-10 flex items-center gap-4 pl-2 w-full">
                                                <span className="text-3xl">{COUNTRY_TO_LANGUAGES[country][0].flag}</span>
                                                <div className="text-left flex-1"><h3 className="text-sm font-bold text-slate-200 group-hover:text-white uppercase tracking-wider transition-colors">{country}</h3></div>
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-white/5 group-hover:bg-blue-600 transition-all duration-300"><ChevronRight className="text-white/50 group-hover:text-white" size={14} /></div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl z-50 animate-fade-in">
                            <div className="w-full max-w-sm animate-float-up relative">
                                <div className="bg-[#0f172a] p-8 rounded-[2rem] border border-blue-500/30 relative shadow-[0_0_80px_rgba(37,99,235,0.2)]">
                                    <button onClick={() => setSelectedCountry(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all"><X size={14} /></button>
                                    <div className="text-center mb-8"><div className="text-6xl mb-4 drop-shadow-lg">{COUNTRY_TO_LANGUAGES[selectedCountry][0].flag}</div><h3 className="text-xl font-bold text-white uppercase tracking-widest">{selectedCountry}</h3></div>
                                    <div className="space-y-3 mb-8">{availableLanguages.map((lang) => (<button key={lang.code} onClick={() => handleLanguageSelect(lang.code)} className={`w-full p-4 rounded-xl border ${selectedLanguage === lang.code ? 'border-blue-500 bg-blue-600/20 text-white' : 'border-white/10 text-slate-400 hover:border-white/30 hover:bg-white/5'} uppercase tracking-widest text-xs font-bold transition-all`}>{lang.nativeName} ({lang.name})</button>))}</div>
                                    <button onClick={() => setViewState('access')} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">Confirm Access <ChevronRight size={14} /></button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {viewState === 'access' && (
                <div className="w-full h-full animate-fade-in relative z-20 flex flex-col bg-[#020617]" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="absolute top-8 left-8 z-30"><button onClick={() => setViewState('globe')} className="text-white/50 hover:text-white flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10"><ChevronRight className="rotate-180" size={14} /> {t.backBtn}</button></div>
                    <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-20 flex flex-col overflow-y-auto custom-scrollbar">
                         {isTranslating ? (
                             <div className="flex flex-col items-center justify-center h-full">
                                <Loader2 className="animate-spin text-blue-500 mb-4" size={32} />
                                <p className="text-white font-bold uppercase tracking-widest">AI Translating Interface...</p>
                             </div>
                         ) : (
                         <div className="flex flex-col flex-shrink-0 min-h-min space-y-16">
                            <div className="space-y-8">
                                 <img src="https://fit-4rce-x.s3.eu-north-1.amazonaws.com/NovaTax__logo-invisible-background.png" alt="NovaTax AI" className="w-full max-w-3xl object-contain mb-8 logo-glow" />
                                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-xl">{t.title}</h1>
                                <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl drop-shadow-md border-l-4 border-blue-500 pl-6">{t.desc}</p>
                            </div>
                            <div className="w-full max-w-md">
                                <button onClick={() => setIsLoginOpen(true)} className="w-full bg-[#1e293b] hover:bg-white/10 text-white border border-white/20 font-bold py-4 text-xs rounded-xl uppercase tracking-widest transition-all mb-4 shadow-lg">{t.loginBtn}</button>
                            </div>
                            
                            {/* SUBSCRIPTION CARD - Clean Slab (No Borders) */}
                            <div className="w-full bg-[#0f172a] p-10 rounded-[2.5rem] relative overflow-hidden group transition-shadow duration-500 hover:shadow-2xl shadow-lg">
                                <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white uppercase tracking-widest mb-3">{t.subTitle}</h3>
                                        <p className="text-sm text-slate-400 mb-8 leading-relaxed">{t.subDesc}</p>
                                        <div className="flex flex-col gap-4">
                                            {t.features.map((feature: string, i: number) => (
                                                <div key={i} className="flex items-center gap-4 group/item">
                                                    <CheckCircle size={18} className="text-blue-400 font-bold" />
                                                    <span className="text-sm text-slate-200 font-medium tracking-wide group-hover/item:text-white transition-colors">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center bg-black/40 p-8 rounded-[2rem] min-w-[240px] shadow-inner relative overflow-hidden">
                                        <span className="text-4xl font-bold text-white font-mono relative z-10 drop-shadow-lg">{localCurrency} {localPrice}</span>
                                        <span className="text-[10px] text-blue-300 uppercase tracking-widest mb-6 relative z-10 font-bold">{t.perYear}</span>
                                        <button onClick={handleSubscribe} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 text-[11px] rounded-xl uppercase tracking-widest transition-all shadow-lg relative z-10">{t.subBtn}</button>
                                    </div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-2 text-slate-500"><Lock size={16} /><span className="text-[10px] uppercase tracking-widest font-bold">Secured by Stripe</span></div>
                                </div>
                            </div>
                        </div>
                         )}
                    </div>
                </div>
            )}
        </div>
        
        {isLoginOpen && (
            <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
                <div className="w-full max-w-md bg-[#0f172a] rounded-[2rem] p-10 shadow-2xl relative animate-float-up border border-blue-500/20">
                    <button onClick={() => setIsLoginOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all">✕</button>
                    <div className="text-center mb-10"><h3 className="text-2xl font-bold text-white uppercase tracking-widest">{t.loginTitle}</h3></div>
                    <div className="space-y-6">
                        <div><label className="block text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2">Email</label><input type="email" placeholder="EMAIL" defaultValue="elhabibullah@gmail.com" className="w-full bg-slate-800 border border-slate-600 p-4 rounded-xl text-white text-sm outline-none font-sans" /></div>
                            <div><label className="block text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2">Password</label><input type="password" placeholder="••••••••" defaultValue="Fzpzrkfk" className="w-full bg-slate-800 border border-slate-600 p-4 rounded-xl text-white text-sm outline-none font-sans" /></div>
                        <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg mt-6">{t.loginBtn}</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
