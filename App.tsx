
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { HRTool, FeasibilityTool, CryptoTool } from './components/Tools';
import AuditView from './components/AuditView';
import { Onboarding } from './components/Onboarding';
import { AccountsView, ProfitLossView, AddExpenseModal } from './components/AccountingViews';
import { SettingsView } from './components/SettingsView';
import { ExchangeRateView } from './components/ExchangeRateView';
import { MOCK_TRANSACTIONS, MOCK_CRYPTO, APP_SECTIONS, EXCHANGE_RATES, UI_TRANSLATIONS, MOCK_USER, COUNTRY_TO_LANGUAGES } from './constants';
import { UserProfile, Transaction, TranslationDictionary } from './types';
import { translateUIDictionary } from './services/geminiService';
import { Menu, Search, Bell, Globe, Plus, ChevronDown, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(APP_SECTIONS.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profiles, setProfiles] = useState<UserProfile[]>(() => { try { const saved = localStorage.getItem('novatax_profiles'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; } });
  const [activeUserId, setActiveUserId] = useState<string | null>(() => localStorage.getItem('novatax_active_user_id'));
  const user = profiles.find(p => p.id === activeUserId) || null;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isAddingProfile, setIsAddingProfile] = useState(false);

  // --- LOCALIZATION STATE ---
  const [currentTranslations, setCurrentTranslations] = useState<TranslationDictionary | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
      if (profiles.length > 0) localStorage.setItem('novatax_profiles', JSON.stringify(profiles));
      else localStorage.removeItem('novatax_profiles');
  }, [profiles]);

  useEffect(() => {
      if (activeUserId) localStorage.setItem('novatax_active_user_id', activeUserId);
      else localStorage.removeItem('novatax_active_user_id');
  }, [activeUserId]);

  // ISOLATION LOGIC: Ensure we load correct data for user, or EMPTY if new
  useEffect(() => {
      if (activeUserId) {
          try {
              const savedTx = localStorage.getItem(`novatax_transactions_${activeUserId}`);
              if (savedTx) {
                  setTransactions(JSON.parse(savedTx));
              } else {
                  // STRICT: Only load mock data for the original demo user 'u1'.
                  // All other users must start with empty data.
                  if (activeUserId === 'u1') setTransactions(MOCK_TRANSACTIONS);
                  else setTransactions([]);
              }
          } catch (e) { setTransactions([]); }
      } else { setTransactions([]); }
  }, [activeUserId]);

  useEffect(() => { if (activeUserId) localStorage.setItem(`novatax_transactions_${activeUserId}`, JSON.stringify(transactions)); }, [transactions, activeUserId]);

  // --- DYNAMIC AI TRANSLATION EFFECT ---
  useEffect(() => {
      const loadTranslations = async () => {
          if (!user) return;
          const lang = user.language;
          
          if (UI_TRANSLATIONS[lang]) {
              setCurrentTranslations(UI_TRANSLATIONS[lang]);
              return;
          }

          setIsTranslating(true);
          const translatedDict = await translateUIDictionary(UI_TRANSLATIONS['en'], lang);
          setCurrentTranslations(translatedDict);
          setIsTranslating(false);
      };

      loadTranslations();
  }, [user?.language]);

  const handleOnboardingComplete = (newUser: UserProfile) => {
    // Ensure ID is unique and not 'u1' to prevent mock data leak
    const userWithId = { ...newUser, id: newUser.id || `user_${Date.now()}` };
    
    // Explicitly wipe transactions in state before switching user to prevent leak
    setTransactions([]);
    
    setProfiles(prev => { 
        const exists = prev.find(p => p.id === userWithId.id); 
        if (exists) return prev; 
        return [...prev, userWithId]; 
    });
    
    setActiveUserId(userWithId.id);
    setIsAddingProfile(false);
  };

  const handleLogout = () => setActiveUserId(null);
  const handleUpdateUser = (updatedUser: UserProfile) => setProfiles(prev => prev.map(p => p.id === updatedUser.id ? updatedUser : p));
  const handleAddTransaction = (newTx: Transaction) => setTransactions(prev => [newTx, ...prev]);
  const handleResetData = () => { if (!activeUserId) return; setTransactions([]); localStorage.removeItem(`novatax_transactions_${activeUserId}`); window.location.reload(); };
  const handleAddProfile = () => setIsAddingProfile(true);
  const handleSwitchProfile = (id: string) => { 
      // Clear current view data first
      setTransactions([]);
      setActiveUserId(id); 
      setActiveTab(APP_SECTIONS.DASHBOARD); 
  };
  
  // Helper to get language display name reliably
  const getDisplayLanguage = (langCode: string) => {
      try {
          return new Intl.DisplayNames(['en'], { type: 'language' }).of(langCode) || langCode;
      } catch (e) {
          return langCode;
      }
  };

  if (!user || isAddingProfile) {
    return <Onboarding key={isAddingProfile ? 'add-profile' : 'init'} onComplete={handleOnboardingComplete} initialView={isAddingProfile ? 'setup' : 'intro'} />;
  }

  if (isTranslating || !currentTranslations) {
      return (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-slate-800 font-sans">
              <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
              <h2 className="text-xl font-bold uppercase tracking-widest">AI Translating Interface...</h2>
              <p className="text-sm text-slate-500 mt-2">Generating localized UI for <span className="font-bold text-blue-600">{getDisplayLanguage(user.language)}</span></p>
          </div>
      );
  }

  const t = currentTranslations;
  const isRTL = user.language === 'ar';

  const renderContent = () => {
    switch (activeTab) {
      case APP_SECTIONS.DASHBOARD: return <Dashboard user={user} transactions={transactions} translations={t.dashboard} />;
      case APP_SECTIONS.ACCOUNTS: return <AccountsView user={user} translations={t.accounting} />;
      case APP_SECTIONS.REPORTS: return <ProfitLossView user={user} translations={t.accounting} />;
      case APP_SECTIONS.EXCHANGE: return <ExchangeRateView user={user} />;
      case APP_SECTIONS.HR: return <HRTool user={user} />;
      case APP_SECTIONS.FEASIBILITY: return <FeasibilityTool user={user} />;
      case APP_SECTIONS.CRYPTO: return <CryptoTool user={user} assets={MOCK_CRYPTO} />;
      case APP_SECTIONS.AUDIT: return <AuditView user={user} transactions={transactions} />;
      case APP_SECTIONS.TRANSACTIONS: return (<div className="bg-[#0f172a] rounded-[2rem] overflow-hidden animate-fade-in border border-slate-700 shadow-xl"><div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/30"><h2 className="text-xl font-bold text-white uppercase tracking-widest">{t.nav.transactions}</h2><button onClick={() => setIsExpenseModalOpen(true)} className="flex items-center gap-2 px-6 py-3 btn-royal text-white text-[10px] font-bold uppercase tracking-widest transition-all rounded-xl shadow-lg bg-blue-600 hover:bg-blue-500"><Plus size={16} /> {t.accounting.addExpense}</button></div>{transactions.length === 0 ? (<div className="p-20 text-center text-slate-500 font-bold uppercase tracking-widest">No transactions recorded for this profile.</div>) : (<table className="w-full text-left"><thead className="bg-white/5 text-slate-300 text-[10px] uppercase font-bold tracking-widest"><tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Description</th><th className="px-4 py-3">Source</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Category</th><th className="px-4 py-3 text-right">Amount</th></tr></thead><tbody className="divide-y divide-white/5 text-sm text-slate-400">{transactions.map((t) => (<tr key={t.id} className="hover:bg-white/5 transition-colors group"><td className="px-4 py-3 font-mono text-xs">{t.date}</td><td className="px-4 py-3"><div className="font-bold text-white group-hover:text-blue-300 transition-colors">{t.description}</div></td><td className="px-4 py-3"><span className="px-2 py-1 rounded-lg text-[9px] font-bold uppercase border border-slate-700 bg-slate-800 text-slate-300">{t.source}</span></td><td className="px-4 py-3">{t.status && (<span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase flex items-center gap-2 w-fit ${t.status === 'Credit' ? 'bg-amber-900/30 text-amber-500' : 'bg-emerald-900/30 text-emerald-500'}`}>{t.status === 'Credit' ? 'CREDIT' : 'PAID'}</span>)}</td><td className="px-4 py-3"><span className="px-2 py-1 bg-white/5 rounded-lg text-xs">{t.category}</span></td><td className={`px-4 py-3 text-right font-bold font-mono text-base ${t.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>{t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString()} <span className="text-[10px] text-slate-500 font-sans font-semibold ml-1">{t.originalCurrency}</span></td></tr>))}</tbody></table>)}</div>);
      case APP_SECTIONS.SETTINGS: return (<SettingsView user={user} profiles={profiles} onUpdate={handleUpdateUser} onAddProfile={handleAddProfile} onSwitchProfile={handleSwitchProfile} onLogout={handleLogout} translations={t.profile} onReset={handleResetData} />);
      default: return <div>Section not found</div>;
    }
  };

  return (
    <div className={`flex h-screen bg-[#f8fafc] text-slate-800 font-sans overflow-hidden ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-72 transform transition-transform duration-300 md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')}`}><Sidebar activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setMobileMenuOpen(false); }} onLogout={handleLogout} translations={t.nav} /></div>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-24 flex items-center justify-between px-8 z-10 bg-white border-b border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
                <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-slate-600 p-2 bg-white border border-slate-200 rounded-xl shadow-sm"><Menu size={24} /></button>
                <div className="relative hidden md:block w-96 group"><Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors`} size={18} /><input type="text" placeholder="CMD+K SEARCH..." className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition-all font-mono shadow-sm outline-none`} /></div>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                    <button className="relative p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"><Bell size={18} /><span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-sm"></span></button>
                    <button onClick={() => setActiveTab(APP_SECTIONS.SETTINGS)} className="flex items-center gap-3 bg-white border border-slate-200 pr-4 pl-1 py-1 rounded-xl hover:border-blue-300 transition-all shadow-sm group">
                        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md group-hover:scale-105 transition-transform">{user.companyName ? user.companyName.charAt(0) : user.name.charAt(0)}</div>
                        <div className="text-left hidden md:block"><p className="text-[10px] font-bold text-slate-800 uppercase group-hover:text-blue-600 transition-colors">{user.companyName || 'Personal'}</p><p className="text-[9px] text-slate-400 font-bold">{user.name.split(' ')[0]}</p></div>
                    </button>
                </div>
            </div>
        </header>
        <div className="flex-1 overflow-auto px-8 pb-8 custom-scrollbar pt-8">{renderContent()}</div>
      </main>
      <AddExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} user={user} translations={t.accounting} onAdd={handleAddTransaction} />
    </div>
  );
};

export default App;
