
import React from 'react';
import { UserProfile, Transaction, TranslationDictionary } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, AlertTriangle, Briefcase, Receipt, ArrowUpRight } from 'lucide-react';
import { EXCHANGE_RATES } from '../constants';

interface DashboardProps {
  user: UserProfile;
  transactions: Transaction[];
  translations: TranslationDictionary['dashboard'];
}

const Dashboard: React.FC<DashboardProps> = ({ user, transactions, translations }) => {
  const convert = (amount: number) => {
    const rate = EXCHANGE_RATES[user.displayCurrency] || 1;
    return amount * rate;
  };

  const format = (amount: number) => {
    return new Intl.NumberFormat(user.language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: user.displayCurrency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const rawData = [
    { name: 'Jan', income: 40000, expense: 24000 },
    { name: 'Feb', income: 30000, expense: 13980 },
    { name: 'Mar', income: 20000, expense: 9800 },
    { name: 'Apr', income: 27800, expense: 3908 },
    { name: 'May', income: 18900, expense: 4800 },
    { name: 'Jun', income: 23900, expense: 3800 },
    { name: 'Jul', income: 34900, expense: 4300 },
  ];

  const data = rawData.map(d => ({
    name: d.name,
    income: convert(d.income),
    expense: convert(d.expense)
  }));

  const StatCard = ({ title, value, sub, icon: Icon }: any) => (
    <div className="glass-panel p-6 rounded-none shadow-none hover:border-white/20 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        <div className="p-2 bg-white/5 rounded-none">
          <Icon className="text-[#00D1FF]" size={18} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ArrowUpRight size={12} className="text-emerald-500" />
        <p className="text-[10px] text-emerald-500 font-mono">{sub}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest">{translations.title}</h2>
          <p className="text-slate-500 text-xs mt-1">Live Feed • <span className="text-[#00D1FF]">{user.country}</span> Node</p>
        </div>
        <div className="text-right">
             <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30 text-emerald-500 bg-emerald-500/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 shadow-[0_0_5px_#10b981]"></span>
                {user.filingFrequency} Reporting
             </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title={translations.totalRevenue}
          value={format(convert(245000))} 
          sub={`+12% ${translations.monthly}`}
          icon={DollarSign} 
        />
        <StatCard 
          title={translations.taxLiability}
          value={format(convert(12450))} 
          sub={translations.paymentPending} 
          icon={Receipt} 
        />
        <StatCard 
          title={translations.activeProjects}
          value="3" 
          sub={translations.optimal} 
          icon={Briefcase} 
        />
        <StatCard 
          title={translations.compliance}
          value="98%" 
          sub={translations.secure}
          icon={TrendingUp} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        <div className="lg:col-span-2 glass-panel p-6 rounded-none flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">{translations.cashFlow}</h3>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00D1FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} dx={-10} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#020205', border: '1px solid #1e293b', color: '#fff' }} 
                    itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                    formatter={(value: number) => format(value)}
                />
                <Area type="monotone" dataKey="income" stroke="#00D1FF" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-none">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">{translations.pendingOps}</h3>
            <div className="space-y-3">
                {[
                    { title: "Approve Salaries", date: "TODAY", type: "HR", priority: "High" },
                    { title: "Q2 Zakat Filing", date: "TOMORROW", type: "TAX", priority: "Medium" },
                    { title: "Crypto Audit", date: "MAY 20", type: "AUDIT", priority: "Low" }
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-white/5 hover:border-[#00D1FF] transition-colors cursor-pointer group bg-white/5">
                        <div>
                            <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors uppercase">{item.title}</p>
                            <p className="text-[10px] text-slate-500 mt-1 font-mono">{item.date}</p>
                        </div>
                        {item.priority === 'High' && <AlertTriangle size={14} className="text-amber-500" />}
                    </div>
                ))}
                
                <div className="mt-6 p-4 border border-[#00D1FF]/20 bg-[#00D1FF]/5">
                    <div className="flex items-center gap-2 mb-2">
                        <Briefcase size={12} className="text-[#00D1FF]" />
                        <p className="text-[10px] font-bold text-[#00D1FF] uppercase tracking-widest">AI Insight</p>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono">"Expense optimization detected. Potential net profit increase: <span className="text-white">8%</span>."</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
