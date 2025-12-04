
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { HRTool, FeasibilityTool, CryptoTool } from './components/Tools';
import AuditView from './components/AuditView';
import Onboarding from './components/Onboarding';
import { MOCK_TRANSACTIONS, MOCK_CRYPTO, APP_SECTIONS, EXCHANGE_RATES, UI_TRANSLATIONS } from './constants';
import { UserProfile } from './types';
import { Menu, Search, Bell, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState(APP_SECTIONS.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Handle successful onboarding
  const handleOnboardingComplete = (newUser: UserProfile) => {
    setUser(newUser);
    setIsAuthenticated(true);
    // Force purple background styles on body to ensure background persists
    document.body.style.backgroundColor = '#020617';
    document.body.style.backgroundImage = 'radial-gradient(circle at 50% 0%, #581c87 0%, #2e1065 40%, #020617 100%)';
    document.body.style.color = '#e2e8f0';
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated || !user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Determine localization
  const currentLang = user.language;
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];
  const isRTL = currentLang === 'ar';

  const renderContent = () => {
    switch (activeTab) {
      case APP_SECTIONS.DASHBOARD:
        return <Dashboard user={user} transactions={MOCK_TRANSACTIONS} translations={t.dashboard} />;
      case APP_SECTIONS.HR:
        return <HRTool user={user} />;
      case APP_SECTIONS.FEASIBILITY:
        return <FeasibilityTool user={user} />;
      case APP_SECTIONS.CRYPTO:
        return <CryptoTool user={user} assets={MOCK_CRYPTO} />;
      case APP_SECTIONS.AUDIT:
        return <AuditView user={user} transactions={MOCK_TRANSACTIONS} />;
      case APP_SECTIONS.TRANSACTIONS:
        return (
          <div className="bg-[#050510]/50 backdrop-blur-md border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
               <h2 className="text-lg font-bold text-white font-['Sora'] uppercase tracking-widest">{t.nav.transactions}</h2>
            </div>
            <table className="w-full text-left">
              <thead className="bg-white/5 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                   <th className="px-6 py-4">Date</th>
                   <th className="px-6 py-4">Description</th>
                   <th className="px-6 py-4">Source</th>
                   <th className="px-6 py-4">Category</th>
                   <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-400">
                {MOCK_TRANSACTIONS.map((t) => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{t.date}</td>
                    <td className="px-6 py-4 font-bold text-white">{t.description}</td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 text-[10px] font-bold uppercase border ${
                           t.source === 'Crypto' ? 'border-purple-500/50 text-purple-400' :
                           t.source === 'Bank' ? 'border-blue-500/50 text-blue-400' :
                           'border-slate-500/50 text-slate-400'
                       }`}>{t.source}</span>
                    </td>
                    <td className="px-6 py-4">{t.category}</td>
                    <td className={`px-6 py-4 text-right font-bold font-mono ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString()} <span className="text-[10px] text-slate-500">{t.originalCurrency}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case APP_SECTIONS.SETTINGS:
          return (
             <div className="max-w-2xl mx-auto bg-[#050510]/60 backdrop-blur-md border border-white/10 p-8 relative">
                 <div className="absolute top-0 left-0 w-full h-0.5 bg-purple-500"></div>
                 <h2 className="text-xl font-bold text-white mb-8 font-['Sora'] uppercase tracking-widest">{t.nav.settings}</h2>
                 <div className="space-y-6">
                     <div>
                         <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Jurisdiction</label>
                         <div className="p-4 bg-black/40 border border-white/10 text-white font-mono text-sm">
                            {user.country}
                         </div>
                     </div>
                     
                     <div className="flex items-center justify-between p-5 bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
                         <div>
                             <h3 className="text-white font-bold text-sm">Zakat Protocol</h3>
                             <p className="text-slate-500 text-xs">Auto-calculate 2.5% asset deduction</p>
                         </div>
                         <button onClick={() => setUser({...user, zakatEnabled: !user.zakatEnabled})} className={`w-12 h-6 flex items-center p-1 transition-colors duration-300 border ${user.zakatEnabled ? 'bg-purple-500/20 border-purple-500' : 'bg-transparent border-slate-600'}`}>
                             <div className={`w-4 h-4 bg-white shadow-sm transition-transform duration-300 ${user.zakatEnabled ? (isRTL ? '-translate-x-6 bg-purple-500' : 'translate-x-6 bg-purple-500') : 'translate-x-0'}`} />
                         </button>
                     </div>

                     <div className="flex items-center justify-between p-5 bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
                         <div>
                             <h3 className="text-white font-bold text-sm">GOSI Compliance</h3>
                             <p className="text-slate-500 text-xs">Social insurance mandatory deduction</p>
                         </div>
                         <button onClick={() => setUser({...user, gosiEnabled: !user.gosiEnabled})} className={`w-12 h-6 flex items-center p-1 transition-colors duration-300 border ${user.gosiEnabled ? 'bg-purple-500/20 border-purple-500' : 'bg-transparent border-slate-600'}`}>
                             <div className={`w-4 h-4 bg-white shadow-sm transition-transform duration-300 ${user.gosiEnabled ? (isRTL ? '-translate-x-6 bg-purple-500' : 'translate-x-6 bg-purple-500') : 'translate-x-0'}`} />
                         </button>
                     </div>
                 </div>
             </div>
          );
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className={`flex h-screen bg-transparent text-slate-200 font-['Sora'] ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      
      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-64 transform transition-transform duration-300 md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')}`}>
         <Sidebar activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setMobileMenuOpen(false); }} onLogout={handleLogout} translations={t.nav} />
      </div>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-[#020205]/60 backdrop-blur-md flex items-center justify-between px-6 z-10">
            <div className="flex items-center gap-4">
                <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white">
                    <Menu size={24} />
                </button>
                <div className="relative hidden md:block w-96 group">
                    <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-white transition-colors`} size={16} />
                    <input type="text" placeholder="CMD+K SEARCH..." className={`w-full bg-[#050510]/50 border border-white/10 rounded-none py-2 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-xs text-white focus:ring-1 focus:ring-purple-500 placeholder-slate-600 transition-all font-mono`} />
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                {/* Currency Selector */}
                <div className="hidden md:flex items-center gap-2 bg-[#050510]/50 px-3 py-1.5 border border-white/10 hover:border-purple-500 transition-colors">
                   <Globe size={14} className="text-slate-400" />
                   <select 
                      value={user.displayCurrency}
                      onChange={(e) => setUser({...user, displayCurrency: e.target.value})}
                      className="bg-transparent text-[10px] font-bold text-white outline-none cursor-pointer uppercase tracking-wider"
                   >
                      {Object.keys(EXCHANGE_RATES).map(curr => (
                          <option key={curr} value={curr} className="bg-[#020205]">{curr}</option>
                      ))}
                   </select>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                        <Bell size={18} />
                    </button>
                    <div className="w-8 h-8 bg-white/10 flex items-center justify-center text-white text-xs font-bold border border-white/10">
                        {user.name.charAt(0)}
                    </div>
                </div>
            </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-6 md:p-10 custom-scrollbar bg-grid-pattern bg-fixed">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;