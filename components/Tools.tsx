import React, { useState } from 'react';
import { UserProfile, CryptoAsset, SalaryRequest, FeasibilityRequest } from '../types';
import { estimateSalary, runFeasibilityStudy, analyzeCryptoPortfolio, runFullAudit } from '../services/geminiService';
import { Loader2, Send, Wallet, TrendingUp, ShieldCheck, FileText, CheckCircle, Search } from 'lucide-react';
import { EXCHANGE_RATES } from '../constants';

// --- Shared UI Components ---
const ResultCard = ({ content, title }: { content: string; title: string }) => (
  <div className="bg-white border border-slate-100 shadow-lg shadow-slate-200/50 rounded-2xl p-8 mt-8 animate-fade-in">
    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
      <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
         <CheckCircle size={20} />
      </div>
      {title}
    </h3>
    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
      {content.split('\n').map((line, i) => {
          // Simple markdown-like parser for bolding
          if (line.startsWith('# ')) return <h2 key={i} className="text-2xl font-bold text-slate-900 mt-4 mb-2">{line.replace('# ', '')}</h2>;
          if (line.startsWith('## ')) return <h3 key={i} className="text-lg font-bold text-indigo-700 mt-4 mb-2">{line.replace('## ', '')}</h3>;
          if (line.includes('**')) {
              const parts = line.split('**');
              return <p key={i} className="mb-2">{parts.map((part, index) => index % 2 === 1 ? <strong key={index} className="text-slate-900">{part}</strong> : part)}</p>;
          }
          return <p key={i} className="mb-2">{line}</p>
      })}
    </div>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center p-16 text-slate-400">
    <div className="relative">
        <div className="absolute inset-0 bg-indigo-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <Loader2 className="animate-spin mb-6 text-indigo-600 relative z-10" size={48} />
    </div>
    <p className="text-sm font-medium text-indigo-900">AI is analyzing {Math.floor(Math.random() * 1000) + 500} data points...</p>
    <p className="text-xs text-slate-500 mt-2">Checking local compliance regulations</p>
  </div>
);

// --- HR Tool ---
export const HRTool: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [formData, setFormData] = useState<SalaryRequest>({
    jobTitle: '',
    experience: 2,
    level: 'Mid',
    age: 30,
    country: user.country
  });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await estimateSalary(formData, user.displayCurrency);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-pink-50 rounded-2xl text-pink-600 shadow-sm"><TrendingUp size={28} /></div>
        <div>
            <h2 className="text-3xl font-bold text-slate-900">Global Salary Estimator</h2>
            <p className="text-slate-500">Calculate competitive packages adjusted for <span className="font-semibold text-pink-600">{user.country}</span>.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm h-fit">
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title</label>
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all" 
                        value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} placeholder="e.g. Senior Software Engineer" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Experience (Years)</label>
                    <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all" 
                        value={formData.experience} onChange={e => setFormData({...formData, experience: parseInt(e.target.value)})} />
                </div>
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
                    <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all" 
                        value={formData.age} onChange={e => setFormData({...formData, age: parseInt(e.target.value)})} />
                </div>
            </div>
             <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Seniority Level</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all"
                    value={formData.level} onChange={e => setFormData({...formData, level: e.target.value as any})}>
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid-Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Expert">Expert</option>
                </select>
            </div>
            <button disabled={loading} type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-200 hover:shadow-pink-300 transform hover:-translate-y-0.5">
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Generate Estimate</>}
            </button>
        </form>

        <div className="space-y-4">
             {loading && <LoadingState />}
             {!loading && !result && (
                 <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl p-12 bg-slate-50/50">
                     <TrendingUp size={64} className="mb-6 opacity-20 text-slate-900" />
                     <p className="text-center font-medium">Enter job details to generate a complete<br/>AI salary breakdown.</p>
                 </div>
             )}
             {!loading && result && <ResultCard title="Salary Analysis" content={result} />}
        </div>
      </div>
    </div>
  );
};

// --- Feasibility Tool ---
export const FeasibilityTool: React.FC<{ user: UserProfile }> = ({ user }) => {
    const [formData, setFormData] = useState<FeasibilityRequest>({
        industry: '',
        capital: 50000,
        revenue: 100000,
        employees: 5,
        description: ''
    });
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Pass user with display currency so AI knows what to output
        const res = await runFeasibilityStudy(formData, user);
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
             <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 shadow-sm"><FileText size={28} /></div>
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Project Feasibility Study</h2>
                    <p className="text-slate-500">Deep-dive financial analysis for new ventures in <span className="font-semibold text-blue-600">{user.country}</span>.</p>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm mb-8">
                 <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-2 md:col-span-1 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Industry / Project Type</label>
                            <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" 
                                placeholder="e.g. Coffee Shop Franchise" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Capital ({user.displayCurrency})</label>
                                <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" 
                                    value={formData.capital} onChange={e => setFormData({...formData, capital: parseInt(e.target.value)})} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Est. Revenue ({user.displayCurrency})</label>
                                <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" 
                                    value={formData.revenue} onChange={e => setFormData({...formData, revenue: parseInt(e.target.value)})} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Employees</label>
                            <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" 
                                    value={formData.employees} onChange={e => setFormData({...formData, employees: parseInt(e.target.value)})} />
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1 space-y-6 flex flex-col">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Project Description</label>
                            <textarea rows={6} className="w-full h-[calc(100%-32px)] bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none transition-all" 
                                placeholder="Describe your business model, target location, and operational strategy..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                        </div>
                        <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-0.5">
                            {loading ? <Loader2 className="animate-spin" /> : "Generate Full Feasibility Report"}
                        </button>
                    </div>
                 </form>
            </div>

            {loading && <LoadingState />}
            {!loading && result && <ResultCard title="Feasibility Report" content={result} />}
        </div>
    );
};

// --- Crypto Tool ---
export const CryptoTool: React.FC<{ user: UserProfile, assets: CryptoAsset[] }> = ({ user, assets }) => {
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        setLoading(true);
        const res = await analyzeCryptoPortfolio(user, assets);
        setResult(res);
        setLoading(false);
    };

    const totalValue = assets.reduce((acc, curr) => acc + curr.valueUsd, 0);

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-purple-50 rounded-2xl text-purple-600 shadow-sm"><Wallet size={28} /></div>
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Crypto Portfolio & Tax</h2>
                    <p className="text-slate-500">Track assets and calculate tax obligations for <span className="font-semibold text-purple-600">{user.country}</span>.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {assets.map((asset) => (
                    <div key={asset.symbol} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-slate-900 text-lg">{asset.name}</span>
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded-full uppercase font-bold">{asset.symbol}</span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium">{asset.balance} coins</p>
                        </div>
                        <div className="text-right">
                             <p className="font-mono font-bold text-slate-900 text-lg">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(asset.valueUsd)}
                             </p>
                             <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">{asset.network}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 mb-8 text-white flex justify-between items-center shadow-lg shadow-purple-900/20">
                <div>
                    <p className="text-purple-200 text-sm font-medium mb-1">Total Portfolio Value</p>
                    <h3 className="text-4xl font-bold">${totalValue.toLocaleString()} USD</h3>
                </div>
                <button onClick={handleAnalyze} disabled={loading} className="bg-white text-purple-900 hover:bg-purple-50 px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg">
                    {loading ? <Loader2 className="animate-spin" /> : <><ShieldCheck size={20} /> Analyze Compliance</>}
                 </button>
            </div>

            {loading && <LoadingState />}
            {!loading && result && <ResultCard title="Portfolio Tax Analysis" content={result} />}
        </div>
    );
};