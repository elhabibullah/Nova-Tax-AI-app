
import React, { useState, useEffect, useCallback } from 'react';
import { AccountItem, PnLItem, UserProfile, TranslationDictionary, Transaction, InvoiceLineItem } from '../types';
import { ChevronRight, ChevronDown, CheckCircle, PlusCircle, CreditCard, Banknote, Save, Trash2, Tag, Percent, Sparkles, Loader2, UploadCloud, Scan, FileText } from 'lucide-react';
import { MOCK_ACCOUNTS, MOCK_PROFIT_LOSS, TAX_RATES } from '../constants';
import { predictTaxRate, parseReceiptImage } from '../services/geminiService';

// --- Chart of Accounts View ---
export const AccountsView: React.FC<{ user: UserProfile, translations: TranslationDictionary['accounting'] }> = ({ user, translations }) => {
    return (
        <div className="max-w-6xl mx-auto pb-12 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest mb-1">{translations.accountsTitle}</h2>
                    <p className="text-slate-500 text-xs font-semibold">Categorized ledger balances</p>
                </div>
            </div>

            <div className="bg-[#0f172a] rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] grid grid-cols-12 gap-4 p-6 border-b border-white/10 text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                        <div className="col-span-6">Account Name</div>
                        <div className="col-span-3">Category</div>
                        <div className="col-span-3 text-right">Balance</div>
                    </div>
                    <div className="divide-y divide-white/5 min-w-[600px]">
                        {MOCK_ACCOUNTS.map((acc) => (
                            <div key={acc.id} className="grid grid-cols-12 gap-4 p-6 hover:bg-white/5 transition-colors group cursor-pointer items-center">
                                <div className="col-span-6 flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${acc.type === 'Cr' ? 'bg-purple-500 shadow-purple-500' : 'bg-emerald-500 shadow-emerald-500'}`}></div>
                                    <span className="text-white font-bold text-sm group-hover:text-purple-300 transition-colors">{acc.name}</span>
                                    <ChevronRight size={14} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <div className="col-span-3">
                                    <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">{acc.category}</span>
                                </div>
                                <div className="col-span-3 text-right">
                                    <span className="font-mono text-white text-sm">
                                        {new Intl.NumberFormat(user.language === 'ar' ? 'ar-SA' : 'en-US', { style: 'currency', currency: user.displayCurrency }).format(acc.balance)}
                                    </span>
                                    <span className="ml-2 text-[10px] text-slate-500 font-bold">{acc.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Profit & Loss Report View ---
interface PnLRowProps {
    item: PnLItem;
    level: number;
    currency: string;
    translations: any;
}

const PnLRow: React.FC<PnLRowProps> = ({ item, level, currency, translations }) => {
    const [expanded, setExpanded] = useState(true);
    const hasChildren = item.children && item.children.length > 0;
    
    // Translation mapper for mock data keys
    const getName = (key: string) => {
        const map: any = {
            'Sales': translations.sales,
            'Cost Of Good Sold': translations.cogs,
            'Expense': translations.expenses,
            'Profit and Loss': translations.pnlTitle
        };
        return map[key] || key;
    };

    return (
        <div className="animate-fade-in">
            <div 
                className={`flex items-center justify-between py-4 pr-6 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer select-none`}
                style={{ paddingLeft: `${level * 24 + 24}px` }}
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-3">
                    {hasChildren ? (
                        expanded ? <ChevronDown size={14} className="text-purple-400" /> : <ChevronRight size={14} className="text-slate-500" />
                    ) : <div className="w-3.5" />}
                    <span className={`text-sm ${level === 0 ? 'text-white font-bold uppercase tracking-wider' : 'text-slate-300'}`}>
                        {getName(item.name)}
                    </span>
                </div>
                <div className="font-mono text-sm text-white">
                     {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(item.amount)}
                </div>
            </div>
            {expanded && hasChildren && (
                <div>
                    {item.children!.map(child => (
                        <PnLRow key={child.id} item={child} level={level + 1} currency={currency} translations={translations} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const ProfitLossView: React.FC<{ user: UserProfile, translations: TranslationDictionary['accounting'] }> = ({ user, translations }) => {
    const grossProfit = (MOCK_PROFIT_LOSS.children?.find(c => c.id === 'sales')?.amount || 0) - (MOCK_PROFIT_LOSS.children?.find(c => c.id === 'cogs')?.amount || 0);
    const totalExpenses = MOCK_PROFIT_LOSS.children?.find(c => c.id === 'exp')?.amount || 0;
    const netProfit = grossProfit - totalExpenses;

    return (
        <div className="max-w-4xl mx-auto pb-12 animate-fade-in">
             <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest mb-1">{translations.pnlTitle}</h2>
                    <p className="text-slate-500 text-xs font-semibold">Income Statement (YTD)</p>
                </div>
            </div>

            <div className="bg-[#0f172a] rounded-3xl overflow-hidden mb-8 shadow-2xl border border-slate-700">
                 <PnLRow item={MOCK_PROFIT_LOSS} level={0} currency={user.displayCurrency} translations={translations} />
                 
                 {/* Summary Footer */}
                 <div className="p-8 bg-white/5 border-t border-white/10 space-y-4">
                     <div className="flex justify-between items-center">
                         <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{translations.grossProfit}</span>
                         <span className="text-lg font-mono text-white">{new Intl.NumberFormat('en-US', { style: 'currency', currency: user.displayCurrency }).format(grossProfit)}</span>
                     </div>
                      <div className="flex justify-between items-center">
                         <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{translations.expenses}</span>
                         <span className="text-lg font-mono text-rose-400">-{new Intl.NumberFormat('en-US', { style: 'currency', currency: user.displayCurrency }).format(totalExpenses)}</span>
                     </div>
                     <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"></div>
                     <div className="flex justify-between items-center">
                         <span className="text-base font-bold text-white uppercase tracking-widest">{translations.netProfit}</span>
                         <span className="text-3xl font-bold font-mono text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: user.displayCurrency }).format(netProfit)}
                         </span>
                     </div>
                 </div>
            </div>
        </div>
    );
};

// --- Advanced Invoice / Transaction Editor ---
export const AddExpenseModal: React.FC<{ 
    isOpen: boolean, 
    onClose: () => void, 
    user: UserProfile,
    translations: TranslationDictionary['accounting'],
    onAdd: (tx: Transaction) => void
}> = ({ isOpen, onClose, user, translations, onAdd }) => {
    
    // --- State ---
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [classification, setClassification] = useState<'Business' | 'Private' | 'Mixed'>('Business');
    const [status, setStatus] = useState<'Paid' | 'Credit'>('Paid');
    const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
        { id: '1', description: '', category: 'Goods', quantity: 1, unitPrice: 0, taxRate: 0, total: 0 }
    ]);
    const [aiLoading, setAiLoading] = useState<string | null>(null);
    const [scanning, setScanning] = useState(false);

    // --- AI Tax Logic Engine ---
    const handleDescriptionBlur = async (id: string, description: string, category: string) => {
        if (!description) return;
        setAiLoading(id);
        const predictedRate = await predictTaxRate(user.country, description, category);
        setLineItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, taxRate: predictedRate, total: item.quantity * item.unitPrice };
            }
            return item;
        }));
        setAiLoading(null);
    };

    const calculateTax = (category: string) => {
        const countryRules = TAX_RATES[user.country] || TAX_RATES['United States']; 
        if (category === 'Food') return countryRules.reduced;
        if (category === 'Exempt') return 0;
        return countryRules.standard;
    };

    const updateLineItem = (id: string, field: keyof InvoiceLineItem, value: any) => {
        setLineItems(prev => prev.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                if (field === 'quantity' || field === 'unitPrice') updated.total = updated.quantity * updated.unitPrice;
                if (field === 'category') updated.taxRate = calculateTax(value);
                return updated;
            }
            return item;
        }));
    };

    const addLineItem = () => {
        const newItem: InvoiceLineItem = {
            id: Date.now().toString(), description: '', category: 'Goods', quantity: 1, unitPrice: 0, taxRate: calculateTax('Goods'), total: 0
        };
        setLineItems([...lineItems, newItem]);
    };

    const removeLineItem = (id: string) => {
        setLineItems(lineItems.filter(i => i.id !== id));
    };

    // --- Receipt Scanning Logic ---
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setScanning(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            const data = await parseReceiptImage(base64, user.country);
            if (data) {
                if (data.merchant) setDescription(data.merchant);
                if (data.date) setDate(data.date);
                if (data.total) {
                     setLineItems([{
                         id: Date.now().toString(),
                         description: 'Scanned Item',
                         category: data.category || 'Goods',
                         quantity: 1,
                         unitPrice: data.total,
                         taxRate: 0, // Simplified for scan
                         total: data.total
                     }]);
                }
            }
            setScanning(false);
        };
        reader.readAsDataURL(file);
    };

    // --- Calculations ---
    const subtotal = lineItems.reduce((acc, item) => acc + item.total, 0);
    const totalTax = lineItems.reduce((acc, item) => acc + (item.total * item.taxRate), 0);
    const grandTotal = subtotal + totalTax;

    const handleSave = () => {
        const newTx: Transaction = {
            id: Date.now().toString(), date, description: description || (type === 'income' ? 'New Sale' : 'New Expense'), amount: grandTotal, taxAmount: totalTax, originalCurrency: user.displayCurrency, category: lineItems[0].category || 'General', type, source: 'Manual', status, classification, items: lineItems
        };
        onAdd(newTx);
        setDescription(''); setLineItems([{ id: Date.now().toString(), description: '', category: 'Goods', quantity: 1, unitPrice: 0, taxRate: 0, total: 0 }]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 animate-fade-in overflow-y-auto">
             <div className="w-full max-w-3xl bg-[#0f172a] border border-slate-700 rounded-3xl relative animate-float-up flex flex-col my-auto shadow-2xl max-h-[90vh]">
                
                {/* Header & Type Switcher */}
                <div className="flex border-b border-white/10 flex-shrink-0">
                    <button onClick={() => setType('income')} className={`flex-1 py-5 text-sm font-bold uppercase tracking-widest transition-all ${type === 'income' ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-500 hover:text-white'}`}>{translations.newInvoice}</button>
                    <button onClick={() => setType('expense')} className={`flex-1 py-5 text-sm font-bold uppercase tracking-widest transition-all ${type === 'expense' ? 'bg-rose-500/10 text-rose-400 border-b-2 border-rose-500' : 'text-slate-500 hover:text-white'}`}>{translations.newBill}</button>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 min-h-0">
                    
                    {/* AI Receipt Scanner Zone */}
                    <div className="mb-8 relative group">
                        <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${scanning ? 'border-purple-500 bg-purple-500/10' : 'border-slate-700 hover:border-purple-400 hover:bg-white/5'}`}>
                            {scanning ? (
                                <div className="flex flex-col items-center gap-3 animate-pulse">
                                    <Scan size={32} className="text-purple-400" />
                                    <p className="text-xs font-bold uppercase tracking-widest text-purple-300">{translations.scanning}</p>
                                </div>
                            ) : (
                                <div className="relative">
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                                    <div className="flex flex-col items-center gap-3 relative z-10">
                                        <div className="p-3 bg-purple-500/20 rounded-full text-purple-400 group-hover:scale-110 transition-transform"><UploadCloud size={24} /></div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">{translations.scanReceipt}</p>
                                        <p className="text-[10px] text-slate-500">{translations.dropReceipt}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Top Meta Data */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="space-y-2"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations.customerVendor}</label><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full input-liquid p-3 text-white text-sm outline-none" /></div>
                        <div className="space-y-2"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations.date}</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full input-liquid p-3 text-white text-sm outline-none" /></div>
                        <div className="space-y-2 sm:col-span-2 lg:col-span-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations.classification}</label><div className="flex input-liquid p-1 rounded-xl bg-slate-800 border border-slate-700">{['Business', 'Private', 'Mixed'].map(c => (<button key={c} onClick={() => setClassification(c as any)} className={`flex-1 text-[10px] font-bold uppercase py-2 rounded-lg transition-all ${classification === c ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>{c}</button>))}</div></div>
                    </div>

                    {/* Line Items Table */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Line Items</h3>
                             <div className="flex items-center gap-2 text-[10px] text-purple-300 bg-purple-900/30 border border-purple-500/20 px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                                <Sparkles size={12} className="text-purple-400" />
                                <span>AI Tax Active</span>
                             </div>
                        </div>
                        
                        <div className="space-y-3">
                            {/* Desktop Headers */}
                            <div className="hidden sm:grid grid-cols-12 gap-2 px-4 pb-2 border-b border-white/10 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                <div className="col-span-4">Item</div><div className="col-span-2">Type</div><div className="col-span-2 text-center">Qty</div><div className="col-span-2 text-right">Price</div><div className="col-span-2 text-right">Total</div>
                            </div>
                            
                            {lineItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                                    <div className="col-span-1 sm:col-span-4"><input type="text" placeholder="Description..." value={item.description} onChange={(e) => updateLineItem(item.id, 'description', e.target.value)} onBlur={() => handleDescriptionBlur(item.id, item.description, item.category)} className="w-full bg-transparent text-white text-sm outline-none placeholder-slate-600" /></div>
                                    <div className="col-span-1 sm:col-span-2"><select value={item.category} onChange={(e) => updateLineItem(item.id, 'category', e.target.value)} className="w-full bg-transparent text-xs text-slate-300 outline-none cursor-pointer p-1 border border-white/10 rounded-lg"><option value="Goods" className="bg-slate-900">Goods</option><option value="Services" className="bg-slate-900">Services</option><option value="Food" className="bg-slate-900">Food</option><option value="Exempt" className="bg-slate-900">Exempt</option></select></div>
                                    <div className="flex gap-2 sm:contents col-span-1 sm:col-span-6">
                                        <div className="sm:col-span-2"><input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value))} className="w-full bg-white/5 sm:bg-transparent p-2 sm:p-0 rounded-lg text-white text-sm text-center outline-none" /></div>
                                        <div className="sm:col-span-2 text-right"><input type="number" placeholder="Price" value={item.unitPrice} onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value))} className="w-full bg-white/5 sm:bg-transparent p-2 sm:p-0 rounded-lg text-white text-sm text-right outline-none font-mono" /></div>
                                        <div className="sm:col-span-2 text-right flex justify-between items-center pl-4 w-full">
                                            <span className="text-sm text-white font-mono">{item.total.toFixed(2)}</span>
                                            {lineItems.length > 1 && <button onClick={() => removeLineItem(item.id)} className="text-slate-600 hover:text-rose-500 transition-opacity ml-2"><Trash2 size={14} /></button>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={addLineItem} className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-purple-400 transition-colors px-4"><PlusCircle size={14} /> {translations.addItem}</button>
                    </div>

                </div>

                {/* Footer & Totals */}
                <div className="p-6 md:p-8 bg-white/5 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 flex-shrink-0">
                     <div className="flex items-center gap-4">
                        <button onClick={() => setStatus('Paid')} className={`flex-1 py-4 rounded-2xl border border-white/10 hover:border-emerald-500/50 text-white font-bold uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-1 ${status === 'Paid' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : ''}`}><Banknote size={20} /><span className="text-[10px]">{translations.paid}</span></button>
                        <button onClick={() => setStatus('Credit')} className={`flex-1 py-4 rounded-2xl border border-white/10 hover:border-amber-500/50 text-white font-bold uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-1 ${status === 'Credit' ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : ''}`}><CreditCard size={20} /><span className="text-[10px]">{translations.credit}</span></button>
                     </div>
                     <div className="space-y-3">
                         <div className="flex justify-between items-center text-xs text-slate-400"><span>{translations.subtotal}</span><span className="font-mono">{subtotal.toFixed(2)}</span></div>
                         <div className="flex justify-between items-center text-xs text-purple-400"><span>{translations.tax}</span><span className="font-mono">{totalTax.toFixed(2)}</span></div>
                         <div className="w-full h-px bg-white/10 my-2"></div>
                         <div className="flex justify-between items-center text-xl font-bold text-white"><span>{translations.total}</span><span className="font-mono text-white">{grandTotal.toFixed(2)} <span className="text-xs text-slate-500">{user.displayCurrency}</span></span></div>
                         <button onClick={handleSave} className={`w-full mt-4 py-4 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg transform hover:-translate-y-1 ${type === 'income' ? 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-emerald-500/30' : 'bg-gradient-to-r from-rose-600 to-rose-400 shadow-rose-500/30'} text-white`}>
                             <Save size={18} /> {translations.save}
                         </button>
                     </div>
                </div>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all z-50">✕</button>
             </div>
        </div>
    );
};
