import React, { useState, useEffect } from 'react';
import { UserProfile, Transaction } from '../types';
import { runFullAudit } from '../services/geminiService';
import { Loader2, ShieldAlert } from 'lucide-react';

interface AuditViewProps {
  user: UserProfile;
  transactions: Transaction[];
}

const AuditView: React.FC<AuditViewProps> = ({ user, transactions }) => {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generate = async () => {
      const res = await runFullAudit(user, transactions);
      setReport(res);
      setLoading(false);
    };
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col pb-8">
       <div className="flex items-center gap-4 mb-8 flex-shrink-0">
          <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 shadow-sm"><ShieldAlert size={28} /></div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">AI Compliance Audit</h2>
            <p className="text-slate-500">Real-time analysis of <span className="font-semibold text-amber-600">{user.country}</span> regulations, Zakat, and VAT.</p>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white border border-slate-100 rounded-2xl p-8 shadow-sm relative custom-scrollbar">
          {loading ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 rounded-2xl">
                <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
                <p className="text-indigo-900 font-medium animate-pulse">Scanning transactions & regulations...</p>
             </div>
          ) : (
            <div className="prose prose-slate max-w-none">
                 {/* Simple renderer for markdown-like text from Gemini */}
                 {report?.split('\n').map((line, i) => {
                     if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-slate-900 mb-6 mt-8 pb-2 border-b border-slate-100">{line.replace('# ', '')}</h1>;
                     if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-indigo-700 mb-4 mt-8">{line.replace('## ', '')}</h2>;
                     if (line.startsWith('- ')) return <div key={i} className="flex gap-2 mb-2 text-slate-600"><span className="text-indigo-500">•</span> {line.replace('- ', '')}</div>;
                     if (line.includes('**')) {
                         const parts = line.split('**');
                         return <p key={i} className="mb-2 text-slate-600">{parts.map((part, index) => index % 2 === 1 ? <strong key={index} className="text-slate-900">{part}</strong> : part)}</p>;
                     }
                     return <p key={i} className="mb-2 text-slate-600">{line}</p>;
                 })}
            </div>
          )}
      </div>
    </div>
  );
};

export default AuditView;