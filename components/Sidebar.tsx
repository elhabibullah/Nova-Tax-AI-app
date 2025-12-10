
import React from 'react';
import { LayoutDashboard, Receipt, Users, Briefcase, Wallet, ShieldCheck, Settings, LogOut, FileBarChart, Book, RefreshCcw } from 'lucide-react';
import { APP_SECTIONS } from '../constants';
import { TranslationDictionary } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  translations: TranslationDictionary['nav'];
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, translations }) => {
  const menuItems = [
    { id: APP_SECTIONS.DASHBOARD, label: translations.dashboard, icon: LayoutDashboard },
    { id: APP_SECTIONS.ACCOUNTS, label: translations.accounts, icon: Book },
    { id: APP_SECTIONS.REPORTS, label: translations.reports, icon: FileBarChart },
    { id: APP_SECTIONS.EXCHANGE, label: translations.exchange, icon: RefreshCcw }, // New Exchange Link
    { id: APP_SECTIONS.TRANSACTIONS, label: translations.transactions, icon: Receipt },
    { id: APP_SECTIONS.HR, label: translations.hr, icon: Users },
    { id: APP_SECTIONS.FEASIBILITY, label: translations.feasibility, icon: Briefcase },
    { id: APP_SECTIONS.CRYPTO, label: translations.crypto, icon: Wallet },
    { id: APP_SECTIONS.AUDIT, label: translations.audit, icon: ShieldCheck },
    { id: APP_SECTIONS.SETTINGS, label: translations.settings, icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 border-r-0 m-4 rounded-3xl flex flex-col h-[calc(100%-2rem)] shadow-2xl overflow-hidden relative border border-white/10">
      
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-extrabold text-xl">N</span>
        </div>
        <div>
            <h1 className="text-md font-bold text-white tracking-widest uppercase">NovaTax</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-2xl group ${
                isActive
                  ? 'bg-white text-blue-800 shadow-lg'
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={16} className={`transition-colors ${isActive ? 'text-blue-600' : 'text-blue-300 group-hover:text-white'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-6">
        <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[10px] font-bold uppercase text-blue-200 hover:text-white transition-all mb-4 tracking-widest border border-transparent hover:border-white/20 rounded-xl hover:bg-white/10">
             <LogOut size={14} /> {translations.disconnect}
        </button>
        <div className="bg-black/20 border border-white/10 rounded-2xl p-4 relative overflow-hidden">
          <div className="flex justify-between items-center mb-2 relative z-10">
            <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">{translations.status}</p>
            <span className="text-[10px] text-emerald-400 font-bold drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">ONLINE</span>
          </div>
          <div className="w-full bg-blue-900/50 h-1 rounded-full mb-1">
            <div className="bg-emerald-400 h-1 w-full rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
