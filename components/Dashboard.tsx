
import React from 'react';
import { UserProfile, Transaction, TranslationDictionary } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, AlertTriangle, Briefcase, Receipt, ArrowUpRight, RefreshCcw } from 'lucide-react';
import { EXCHANGE_RATES } from '../constants';

interface DashboardProps {
  user: UserProfile;
  transactions: Transaction[];
  translations: TranslationDictionary['dashboard'];
}

const Dashboard: React.FC<DashboardProps> = ({ user, transactions, translations }) => {
  const convert = (amount: number) => { const rate = EXCHANGE_RATES[user.displayCurrency] || 1; return amount * rate; };
  const format = (amount: number) => { return new Intl.NumberFormat(user.language === 'ar' ? 'ar-SA' : 'en-US', { style: 'currency', currency: user.displayCurrency, maximumFractionDigits: 0 }).format(amount); };
  const rawData = [ { name: 'Jan', income: 40000, expense: 24000 }, { name: 'Feb', income: 30000, expense: 13980 }, { name: 'Mar', income: 20000, expense: 9800 }, { name: 'Apr', income: 27800, expense: 3908 }, { name: 'May', income: 18900, expense: 4800 }, { name: 'Jun', income: 23900, expense: 3800 }, { name: 'Jul', income: 34900, expense: 4300 } ];
  const data = rawData.map(d => ({ name: d.name, income: convert(d.income), expense: convert(d.expense) }));

  // Dynamic font sizing for large numbers
  const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="bg-[#0f172a] border border-slate-700 p-6 rounded-[2rem] hover:shadow-2xl transition-all hover:-translate-y-1 duration-300 min-h-[160px] flex flex-col justify-between group shadow-lg overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0 pr-2">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 group-hover:text-blue-400 transition-colors truncate">{title}</p>
            <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight drop-shadow-md leading-tight break-words">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl ${color || 'bg-white/5'} shadow-inner flex-shrink-0`}><Icon className="text-white" size={20} /></div>
      </div>
      <div className="flex items-center gap-2 mt-4"><div className="bg-emerald-500/20 p-1.5 rounded-full"><ArrowUpRight size={12} className="text-emerald-400" /></div><p className="text-[11px] text-emerald-400 font-mono font-bold">{sub}</p></div>
    </div>
  );

  const pendingOperations = [ { title: "Approve Salaries", date: "TODAY", type: "HR", priority: "High" }, user.zakatEnabled ? { title: "Q2 Zakat Filing", date: "TOMORROW", type: "TAX", priority: "Medium" } : null, { title: "Crypto Audit", date: "MAY 20", type: "AUDIT", priority: "Low" } ].filter(Boolean); 

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex justify-between items-end">
        <div><h2 className="text-3xl font-extrabold text-slate-800 uppercase tracking-widest">{translations.title}</h2><p className="text-slate-500 text-xs mt-1 font-bold">Live Feed • <span className="text-blue-600">{user.country}</span> Node</p></div>
        <div className="text-right"><span className="inline-flex items-center px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30 text-emerald-600 bg-emerald-50 rounded-full shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 shadow-[0_0_5px_#10b981]"></span>{user.filingFrequency} Reporting</span></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={translations.totalRevenue} value={format(convert(245000))} sub={`+12% ${translations.monthly}`} icon={DollarSign} color="bg-blue-600" />
        <StatCard title={translations.taxLiability} value={format(convert(12450))} sub={translations.paymentPending} icon={Receipt} color="bg-orange-500" />
        <StatCard title={translations.activeProjects} value="3" sub={translations.optimal} icon={Briefcase} color="bg-indigo-500" />
        <StatCard title={translations.compliance} value="98%" sub={translations.secure} icon={TrendingUp} color="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[420px]">
        {/* Chart */}
        <div className="lg:col-span-2 bg-[#0f172a] border border-slate-700 p-8 rounded-[2rem] flex flex-col relative overflow-hidden min-h-[350px] shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="flex items-center justify-between mb-6 relative z-10"><h3 className="text-sm font-bold text-white uppercase tracking-widest">{translations.cashFlow}</h3></div>
          <div className="flex-1 w-full min-h-0 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} itemStyle={{ fontSize: '12px', fontWeight: 600, fontFamily: 'Segoe UI, sans-serif' }} formatter={(value: number) => format(value)} />
                <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Ops */}
        <div className="bg-[#0f172a] border border-slate-700 p-8 rounded-[2rem] relative overflow-hidden flex flex-col h-full shadow-2xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 relative z-10">{translations.pendingOps}</h3>
            <div className="space-y-4 relative z-10 flex-1 overflow-y-auto custom-scrollbar pr-2">
                {pendingOperations.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-white/5 hover:border-blue-500/30 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                        <div><p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors uppercase">{item.title}</p><p className="text-[10px] text-slate-500 mt-1 font-mono">{item.date}</p></div>
                        {item.priority === 'High' && <div className="p-2 bg-amber-500/20 rounded-full"><AlertTriangle size={14} className="text-amber-500" /></div>}
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5"><div className="p-4 border border-blue-500/20 bg-blue-900/20 rounded-2xl relative overflow-hidden"><div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500"></div><div className="flex items-center gap-2 mb-2"><Briefcase size={12} className="text-blue-400" /><p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">AI Insight</p></div><p className="text-xs text-slate-400 leading-relaxed font-medium">"Expense optimization detected. Potential net profit increase: <span className="text-white font-bold text-glow">8%</span>."</p></div></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;