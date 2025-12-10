import React, { useState, useEffect, useMemo } from 'react';
import { UserProfile, CryptoAsset, SalaryRequest, TranslationDictionary } from '../types';
import { estimateSalary, runFeasibilityStudy, analyzeCryptoPortfolio, getFeasibilitySuggestion } from '../services/geminiService';
import { getCryptoPrices } from '../services/marketDataService';
import { Loader2, Send, Wallet, TrendingUp, TrendingDown, ShieldCheck, FileText, CheckCircle, Search, ChevronRight, ChevronLeft, ChevronDown, Sparkles, Download, Edit3, Globe } from 'lucide-react';
import { UI_TRANSLATIONS, COUNTRY_TO_LANGUAGES } from '../constants';
import jsPDF from 'jspdf';

const ResultCard = ({ content, title }: { content: string; title: string }) => {
  const processedContent = content
    .replace(/\*\*/g, '')
    .replace(/#/g, '')
    .split('\n');

  return (
    <div className="bg-[#0f172a] text-white border-2 border-slate-700 shadow-2xl rounded-3xl p-10 mt-10 animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 relative z-10">
        <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <CheckCircle size={24} />
        </div>
        {title}
      </h3>
      <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed font-sans relative z-10">
        {processedContent.map((line, i) => (
          <p key={i} className="mb-2">{line}</p>
        ))}
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center p-20 text-slate-400 animate-fade-in">
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
      <Loader2 className="animate-spin text-blue-600 relative z-10" size={64} />
    </div>
    <p className="text-lg font-bold text-slate-800 tracking-widest uppercase">AI is analyzing complex market data points...</p>
    <p className="text-sm text-blue-600 mt-2 font-mono">Checking local compliance & calculating scenarios</p>
  </div>
);

export const HRTool: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [formData, setFormData] = useState<SalaryRequest>({ jobTitle: '', experience: 2, level: 'Mid', age: 30, country: user.country });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const countryOptions = useMemo(() => Object.keys(COUNTRY_TO_LANGUAGES).filter(k => k !== 'Default').sort(), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const res = await estimateSalary(formData, user.displayCurrency, user.language);
    setResult(res); setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-fade-in">
      <div className="flex items-center gap-6 mb-10">
        <div className="p-5 bg-cyan-600 rounded-2xl text-white shadow-lg"><TrendingUp size={32} /></div>
        <div><h2 className="text-4xl font-bold text-slate-800 tracking-tight">Global Salary Estimator</h2><p className="text-slate-500 mt-1 text-lg">Calculate competitive packages adjusted for <span className="font-bold text-cyan-600">{formData.country}</span>.</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="space-y-8 bg-[#0f172a] p-10 rounded-[2.5rem] h-fit text-white shadow-2xl border border-slate-700">
          <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Target Jurisdiction</label><div className="relative group"><Globe className="absolute left-4 top-4 text-cyan-400" size={20} /><select className="w-full bg-slate-800 border border-slate-600 rounded-xl pl-12 pr-10 py-4 text-white outline-none cursor-pointer font-bold appearance-none text-sm" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })}>{countryOptions.map(c => <option key={c} value={c}>{c}</option>)}</select><ChevronDown className="absolute right-4 top-4 text-slate-500 pointer-events-none" size={20} /></div></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Job Title</label><div className="relative group"><Search className="absolute left-4 top-4 text-slate-500" size={20} /><input required type="text" className="w-full bg-slate-800 border border-slate-600 rounded-xl pl-12 pr-6 py-4 text-white outline-none placeholder-slate-500" value={formData.jobTitle} onChange={e => setFormData({ ...formData, jobTitle: e.target.value })} placeholder="e.g. Senior Software Engineer" /></div></div>
          <div className="grid grid-cols-2 gap-6"><div><label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Experience</label><input type="number" className="w-full bg-slate-800 border border-slate-600 rounded-xl px-6 py-4 text-white text-center" value={formData.experience} onChange={e => setFormData({ ...formData, experience: parseInt(e.target.value) })} /></div><div><label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Age</label><input type="number" className="w-full bg-slate-800 border border-slate-600 rounded-xl px-6 py-4 text-white text-center" value={formData.age} onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) })} /></div></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Level</label><div className="relative"><select className="w-full bg-slate-800 border border-slate-600 rounded-xl px-6 py-4 text-white appearance-none cursor-pointer" value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value as any })}><option value="Junior">Junior</option><option value="Mid">Mid-Level</option><option value="Senior">Senior</option><option value="Expert">Expert</option></select><ChevronDown className="absolute right-4 top-4 text-slate-500 pointer-events-none" size={20} /></div></div>
          <button disabled={loading} type="submit" className="w-full btn-royal bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-sm shadow-lg mt-4">{loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Generate Estimate</>}</button>
        </form>
        <div className="space-y-4">
          {loading && <LoadingState />}
          {!loading && !result && <div className="h-full flex flex-col items-center justify-center text-slate-400 border border-slate-300 rounded-[2.5rem] p-12 bg-white"><TrendingUp size={80} className="mb-8 opacity-20 text-blue-600" /><p className="text-center font-bold uppercase tracking-widest text-sm text-slate-600">Enter job details to generate a complete<br />AI salary breakdown.</p></div>}
          {!loading && result && <ResultCard title="Salary Analysis" content={result} />}
        </div>
      </div>
    </div>
  );
};

const FEASIBILITY_STRUCTURE = [
  { id: 's1', questions: [{ id: "projectName", qId: 'q1', type: "text" }, { id: "projectCountry", qId: 'q2', type: "text" }, { id: "projectCity", qId: 'q3', type: "text" }, { id: "businessType", qId: 'q4', type: "text" }] },
  { id: 's2', questions: [{ id: "founderName", qId: 'q5', type: "text" }, { id: "founderPosition", qId: 'q6', type: "text" }, { id: "founderBackground", qId: 'q7', type: "textarea" }, { id: "founderSkills", qId: 'q8', type: "textarea" }, { id: "founderCapital", qId: 'q9', type: "text" }] },
  { id: 's3', questions: [{ id: "targetCustomer", qId: 'q10', type: "text" }, { id: "marketDemand", qId: 'q11', type: "text" }, { id: "competitors", qId: 'q12', type: "textarea" }, { id: "valueProp", qId: 'q13', type: "textarea" }] },
  { id: 's4', questions: [{ id: "productDesc", qId: 'q14', type: "textarea" }, { id: "mainFeatures", qId: 'q15', type: "textarea" }, { id: "pricePoint", qId: 'q16', type: "text" }, { id: "capacity", qId: 'q17', type: "text" }] },
  { id: 's5', questions: [{ id: "equipment", qId: 'q18', type: "textarea" }, { id: "rawMaterials", qId: 'q19', type: "textarea" }, { id: "locationType", qId: 'q20', type: "text" }, { id: "employees", qId: 'q21', type: "textarea" }, { id: "suppliers", qId: 'q22', type: "textarea" }] },
  { id: 's6', questions: [{ id: "licenses", qId: 'q23', type: "textarea" }, { id: "structure", qId: 'q24', type: "text" }] },
  { id: 's7', questions: [{ id: "budget", qId: 'q25', type: "text" }, { id: "monthlyCosts", qId: 'q26', type: "text" }, { id: "monthlySales", qId: 'q27', type: "text" }, { id: "unitPrice", qId: 'q28', type: "text" }, { id: "marketingBudget", qId: 'q29', type: "text" }] },
  { id: 's8', questions: [{ id: "targetAudience", qId: 'q30', type: "textarea" }, { id: "salesChannels", qId: 'q31', type: "text" }, { id: "promoMethods", qId: 'q32', type: "textarea" }] },
  { id: 's9', questions: [{ id: "businessRisks", qId: 'q33', type: "textarea" }, { id: "riskTolerance", qId: 'q34', type: "text" }] },
  { id: 's10', questions: [{ id: "longTermGoal", qId: 'q35', type: "textarea" }, { id: "launchDate", qId: 'q36', type: "text" }, { id: "growthPlans", qId: 'q37', type: "textarea" }] }
];

export const FeasibilityTool: React.FC<{ user: UserProfile }> = ({ user }) => {
  const t = UI_TRANSLATIONS[user.language]?.feasibility || UI_TRANSLATIONS['en'].feasibility;
  const isRTL = user.language === 'ar';
  const [answers, setAnswers] = useState<Record<string, string>>({ projectCountry: user.country });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [suggestionLoading, setSuggestionLoading] = useState<string | null>(null);
  const [emailSending, setEmailSending] = useState(false);

  const handleInputChange = (id: string, value: string) => setAnswers(prev => ({ ...prev, [id]: value }));
  const handleNext = () => { if (currentSection < FEASIBILITY_STRUCTURE.length - 1) { setCurrentSection(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const handleBack = () => { if (currentSection > 0) { setCurrentSection(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const handleSubmit = async () => { setLoading(true); const res = await runFeasibilityStudy(answers, user); setResult(res); setLoading(false); };

  const handleMagicSuggest = async (questionId: string, label: string) => {
    if (!answers['projectName'] && !answers['businessType']) {
      alert("Please fill in Section 1 (Project Name & Business Type) first so AI has context!");
      return;
    }
    setSuggestionLoading(questionId);
    const suggestion = await getFeasibilitySuggestion(label, answers, user.language);
    if (suggestion) setAnswers(prev => ({ ...prev, [questionId]: suggestion }));
    setSuggestionLoading(null);
  };

  const handleDownloadPDF = () => {
    setEmailSending(true);
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text("Feasibility Study", 20, 20);
      doc.setFontSize(10);
      const splitText = doc.splitTextToSize(result || '', 170);
      let y = 55;
      splitText.forEach((line: string) => {
        if (y > 270) { doc.addPage(); y = 20; }
        const cleanLine = line.replace(/\*\*/g, '');
        doc.text(cleanLine, 20, y);
        y += 6;
      });
      doc.save('report.pdf');
      setEmailSending(false);
    }, 1500);
  };

  const handleEdit = () => { setResult(null); setCurrentSection(0); };
  const progress = ((currentSection + 1) / FEASIBILITY_STRUCTURE.length) * 100;
  const isLastSection = currentSection === FEASIBILITY_STRUCTURE.length - 1;

  if (result) return <div className="max-w-6xl mx-auto pb-12 animate-fade-in"><div className="flex flex-col items-center justify-center mb-12"><img src="https://fit-4rce-x.s3.eu-north-1.amazonaws.com/NovaTax__logo-invisible-background.png" className="w-96 object-contain mb-8" /><h2 className="text-4xl font-bold text-slate-800">{t.reportReady}</h2></div><div className="flex gap-6 mb-8 justify-center"><button onClick={handleEdit} className="px-8 py-4 bg-white border border-slate-300 text-slate-700 font-bold rounded-2xl flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"><Edit3 size={18} /> {t.edit}</button><button onClick={handleDownloadPDF} disabled={emailSending} className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg">{emailSending ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}{emailSending ? 'Generating...' : t.download}</button></div><ResultCard title={t.title} content={result} /></div>;
  if (loading) return <LoadingState />;

  const sectionData = FEASIBILITY_STRUCTURE[currentSection];
  const sectionTitle = t.sections[`s${currentSection + 1}` as keyof typeof t.sections];

  return (
    <div className="max-w-4xl mx-auto pb-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex justify-center mb-16"><img src="https://fit-4rce-x.s3.eu-north-1.amazonaws.com/NovaTax__logo-invisible-background.png" className="w-96 object-contain" /></div>
      <div className="flex items-center gap-6 mb-10"><div className="p-5 bg-blue-600 rounded-3xl text-white shadow-lg"><FileText size={32} /></div><div><h2 className="text-3xl font-bold text-slate-800">{t.title}</h2><p className="text-slate-500 mt-1">{t.subtitle}</p></div></div>
      <div className="bg-[#0f172a] rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-700 relative text-white">
        <div className="w-full h-1.5 bg-slate-800"><div className="h-full bg-blue-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div></div>
        <div className="p-8 md:p-16">
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10"><h3 className="text-2xl font-bold text-white">{sectionTitle}</h3><span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">{t.step} {currentSection + 1} {t.of} {FEASIBILITY_STRUCTURE.length}</span></div>
          <div className="space-y-10">
            {sectionData.questions.map((q) => { 
                const label = t.questions[q.qId as keyof typeof t.questions]; 
                return (
                    <div key={q.id}>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-bold text-slate-300">{label}</label>
                            <button onClick={() => handleMagicSuggest(q.id, label)} disabled={suggestionLoading === q.id} className="text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 border border-blue-500/20">{suggestionLoading === q.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}{t.aiAssist}</button>
                        </div>
                        {q.type === 'textarea' ? (
                            <textarea rows={5} className="w-full bg-slate-800 border border-slate-600 rounded-2xl p-5 text-white focus:border-blue-500 outline-none" value={answers[q.id] || ''} onChange={(e) => handleInputChange(q.id, e.target.value)} />
                        ) : (
                            <input type="text" className="w-full bg-slate-800 border border-slate-600 rounded-2xl p-5 text-white focus:border-blue-500 outline-none" value={answers[q.id] || ''} onChange={(e) => handleInputChange(q.id, e.target.value)} />
                        )}
                    </div>
                ); 
            })}
          </div>
          
          <div className="flex justify-between mt-16 pt-10 border-t border-white/10">
            <button 
              onClick={handleBack} 
              disabled={currentSection === 0} 
              className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-2 ${
                currentSection === 0 
                  ? 'text-slate-600 cursor-not-allowed' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              {t.prev}
            </button>
            
            {isLastSection ? (
              <button 
                onClick={handleSubmit} 
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:bg-blue-500"
              >
                {t.generate} 
                <Send size={18} />
              </button>
            ) : (
              <button 
                onClick={handleNext} 
                className="px-10 py-4 bg-white text-blue-900 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-200"
              >
                {t.next} 
                {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CryptoTool: React.FC<{ user: UserProfile, assets: CryptoAsset[] }> = ({ user, assets }) => {
  const [liveAssets, setLiveAssets] = useState(assets);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // New Live Data Fetcher
  useEffect(() => {
    const fetchLivePrices = async () => {
        const prices = await getCryptoPrices();
        if (Object.keys(prices).length > 0) {
             setLiveAssets(prev => prev.map(asset => {
                 const marketData = prices[asset.symbol];
                 if (marketData) {
                     return { 
                         ...asset, 
                         valueUsd: marketData.price * asset.balance, 
                         change24h: marketData.change 
                     };
                 }
                 return asset;
             }));
        }
    };
    
    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = async () => { setLoading(true); const res = await analyzeCryptoPortfolio(user, liveAssets); setResult(res); setLoading(false); };
  const totalValue = liveAssets.reduce((acc, curr) => acc + curr.valueUsd, 0);

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-fade-in">
      <div className="flex items-center gap-6 mb-10">
        <div className="p-5 bg-indigo-600 rounded-2xl text-white shadow-lg"><Wallet size={32} /></div>
        <div><h2 className="text-4xl font-bold text-slate-800 tracking-tight">Crypto Portfolio & Tax</h2><p className="text-slate-500 mt-1 text-lg">Live Market Feed • <span className="font-bold text-indigo-600">{user.country}</span> Compliance</p></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {liveAssets.map((asset) => {
          const isUp = (asset.change24h || 0) >= 0;
          return (
            <div key={asset.symbol} className="bg-[#0f172a] rounded-[2rem] p-8 border border-slate-700 shadow-xl group hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2"><span className="font-bold text-white text-xl">{asset.name}</span><span className="px-2.5 py-1 bg-white/10 text-slate-300 text-[10px] rounded-full uppercase font-bold tracking-wider">{asset.symbol}</span></div>
                  <p className="text-slate-400 text-sm font-medium">{asset.balance} coins</p>
                </div>
                <div className={`p-3 rounded-2xl ${asset.symbol === 'BTC' ? 'bg-orange-500/20 text-orange-400' : 'bg-indigo-500/20 text-indigo-400'}`}><Wallet size={20} /></div>
              </div>
              <div className="text-right border-t border-white/10 pt-4">
                <p className="font-mono font-bold text-white text-2xl">${asset.valueUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <div className="flex justify-end items-center gap-1 mt-1">
                  {isUp ? <TrendingUp size={12} className="text-emerald-400" /> : <TrendingDown size={12} className="text-rose-400" />}
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>{Math.abs(asset.change24h || 0).toFixed(2)}% (24H)</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#0f172a] rounded-[2.5rem] p-10 mb-10 text-white flex justify-between items-center relative overflow-hidden shadow-2xl border border-indigo-900">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/20 to-indigo-900/20 z-0"></div>
        <div className="relative z-10">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live Portfolio Value</p>
          <h3 className="text-5xl font-bold font-mono text-white drop-shadow-lg">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-2xl text-slate-400">USD</span></h3>
        </div>
        <button onClick={handleAnalyze} disabled={loading} className="bg-white text-indigo-900 hover:bg-indigo-50 px-10 py-5 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-lg relative z-10 uppercase tracking-widest text-xs">{loading ? <Loader2 className="animate-spin" /> : <><ShieldCheck size={20} /> Analyze Compliance</>}</button>
      </div>
      {loading && <LoadingState />}
      {!loading && result && <ResultCard title="Portfolio Tax Analysis" content={result} />}
    </div>
  );
};