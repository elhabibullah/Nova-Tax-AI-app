
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { EXCHANGE_RATES, COUNTRY_TO_LANGUAGES } from '../constants';
import { ArrowRightLeft, TrendingUp, TrendingDown, Plus, Search } from 'lucide-react';

export const ExchangeRateView: React.FC<{ user: UserProfile }> = ({ user }) => {
    const [amount, setAmount] = useState<number>(1);
    const [baseCurrency, setBaseCurrency] = useState(user.displayCurrency);
    const [pinnedCurrencies, setPinnedCurrencies] = useState(['USD', 'EUR', 'GBP', 'AED', 'CNY', 'JPY']);

    const allCurrencies = Object.keys(EXCHANGE_RATES);
    const baseRate = EXCHANGE_RATES[baseCurrency] || 1;

    // Convert function: (Amount / BaseRate) * TargetRate
    const convert = (targetCurr: string) => {
        const targetRate = EXCHANGE_RATES[targetCurr] || 1;
        // Logic: 1 Base = (1/BaseRate) * TargetRate
        // So UserAmount Base = (Amount / BaseRate) * TargetRate
        return (amount / baseRate) * targetRate;
    };

    const getFlag = (curr: string) => {
        const entry = Object.values(COUNTRY_TO_LANGUAGES).find(list => list[0].currency === curr);
        return entry ? entry[0].flag : '🌐';
    };

    return (
        <div className="max-w-6xl mx-auto pb-12 animate-fade-in">
             <div className="flex items-center gap-6 mb-10">
                <div className="p-5 bg-blue-600 rounded-3xl text-white shadow-lg shadow-blue-500/30">
                    <ArrowRightLeft size={32} />
                </div>
                <div>
                    <h2 className="text-4xl font-bold text-slate-800 tracking-tight">Currency Exchange</h2>
                    <p className="text-slate-500 mt-1 text-lg">Live mid-market rates for <span className="font-bold text-blue-600">{baseCurrency}</span>.</p>
                </div>
            </div>

            {/* Converter Header */}
            <div className="glass-royal bg-[#0f172a] p-8 rounded-[2rem] mb-8 flex flex-col md:flex-row items-center gap-6 border border-slate-700 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                 
                 <div className="flex-1 w-full">
                     <label className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-2 block">Amount</label>
                     <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-800 border border-slate-600 rounded-2xl p-4 text-3xl font-bold text-white outline-none focus:border-blue-500 transition-colors font-mono"
                     />
                 </div>

                 <div className="flex-1 w-full">
                     <label className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-2 block">Base Currency</label>
                     <div className="relative">
                         <select 
                            value={baseCurrency} 
                            onChange={(e) => setBaseCurrency(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-2xl p-4 text-xl font-bold text-white outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                         >
                             {allCurrencies.map(c => <option key={c} value={c}>{getFlag(c)} {c}</option>)}
                         </select>
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▼</div>
                     </div>
                 </div>
            </div>

            {/* Rates Grid - XE Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pinnedCurrencies.map(curr => {
                    if(curr === baseCurrency) return null;
                    const val = convert(curr);
                    // Fake change for demo
                    const isUp = curr.charCodeAt(0) % 2 === 0; 
                    
                    return (
                        <div key={curr} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                             <div className="flex justify-between items-start mb-4">
                                 <div className="flex items-center gap-3">
                                     <span className="text-3xl">{getFlag(curr)}</span>
                                     <div>
                                         <h3 className="font-bold text-slate-800 text-xl">{curr}</h3>
                                         <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">1 {baseCurrency} = {(val/amount).toFixed(4)} {curr}</p>
                                     </div>
                                 </div>
                                 {isUp ? <TrendingUp className="text-emerald-500" size={20} /> : <TrendingDown className="text-rose-500" size={20} />}
                             </div>
                             <div className="flex items-baseline justify-between pt-4 border-t border-slate-100">
                                 <span className="text-3xl font-mono font-bold text-slate-800">{val.toFixed(2)}</span>
                                 <span className={`text-xs font-bold px-2 py-1 rounded-full ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                     {isUp ? '+' : '-'}{(Math.random()).toFixed(2)}%
                                 </span>
                             </div>
                        </div>
                    );
                })}
                
                {/* Add Currency Button */}
                <button className="border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors min-h-[180px]">
                    <div className="p-4 bg-slate-100 rounded-full mb-3 group-hover:bg-blue-50"><Plus size={24} /></div>
                    <span className="font-bold uppercase tracking-widest text-xs">Add Currency</span>
                </button>
            </div>
        </div>
    );
};
