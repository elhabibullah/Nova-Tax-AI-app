
import React from 'react';
import { LayoutDashboard, Receipt, Users, Briefcase, Wallet, ShieldCheck, Settings, LogOut } from 'lucide-react';
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
    { id: APP_SECTIONS.TRANSACTIONS, label: translations.transactions, icon: Receipt },
    { id: APP_SECTIONS.HR, label: translations.hr, icon: Users },
    { id: APP_SECTIONS.FEASIBILITY, label: translations.feasibility, icon: Briefcase },
    { id: APP_SECTIONS.CRYPTO, label: translations.crypto, icon: Wallet },
    { id: APP_SECTIONS.AUDIT, label: translations.audit, icon: ShieldCheck },
    { id: APP_SECTIONS.SETTINGS, label: translations.settings, icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#020205] border-r border-white/5 flex flex-col h-full shadow-2xl">
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="text-[#00D1FF] font-extrabold text-lg">N</span>
        </div>
        <div>
            <h1 className="text-md font-bold text-white tracking-widest font-['Sora'] uppercase">NovaTax</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 group border-l-2 ${
                isActive
                  ? 'bg-white/5 text-[#00D1FF] border-[#00D1FF]'
                  : 'text-slate-500 hover:text-white hover:bg-white/5 border-transparent'
              }`}
            >
              <Icon size={16} className={`transition-colors ${isActive ? 'text-[#00D1FF]' : 'text-slate-600 group-hover:text-white'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase text-slate-500 hover:text-rose-500 transition-colors mb-4 tracking-widest">
             <LogOut size={14} /> {translations.disconnect}
        </button>
        <div className="bg-[#050510] border border-white/5 p-4 relative">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{translations.status}</p>
            <span className="text-[10px] text-[#00D1FF] font-bold">ONLINE</span>
          </div>
          <div className="w-full bg-slate-800 h-0.5 mb-2">
            <div className="bg-[#00D1FF] h-0.5 w-full shadow-[0_0_5px_#00D1FF]"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
