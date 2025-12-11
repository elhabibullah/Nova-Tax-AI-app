
import React, { useState, useEffect } from 'react';
import { UserProfile, TranslationDictionary } from '../types';
import { Save, Building2, CreditCard, Users, MapPin, CheckCircle2, User, CalendarDays, AlertTriangle, Trash2, Plus, LogOut, Briefcase, Globe } from 'lucide-react';
import { COUNTRY_TO_LANGUAGES } from '../constants';

interface SettingsViewProps {
    user: UserProfile;
    profiles: UserProfile[];
    onUpdate: (user: UserProfile) => void;
    onAddProfile: () => void;
    onSwitchProfile: (id: string) => void;
    onLogout: () => void;
    translations: TranslationDictionary['profile'];
    onReset: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
    user, profiles, onUpdate, onAddProfile, onSwitchProfile, onLogout, translations, onReset 
}) => {
    // ... (State initialization same as before)
    const [formData, setFormData] = useState({
        name: user.name || '',
        companyName: user.companyName || '',
        businessStructure: user.businessStructure || '',
        incorporationDate: user.incorporationDate || '',
        vatNumber: user.vatNumber || '',
        companyNumber: user.companyNumber || '',
        bankName: user.bankDetails?.bankName || '',
        iban: user.bankDetails?.iban || '',
        accountHolder: user.bankDetails?.accountHolder || '',
        position: user.position || '',
        businessAddress: user.addresses?.business || '',
        privateAddress: user.addresses?.private || '',
        postalAddress: user.addresses?.postal || '',
        isPrivateSameAsBusiness: user.addresses?.isPrivateSameAsBusiness || false,
        country: user.country || 'United States',
        inviteEmail: ''
    });

    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

    useEffect(() => {
        setFormData({
            name: user.name || '',
            companyName: user.companyName || '',
            businessStructure: user.businessStructure || '',
            incorporationDate: user.incorporationDate || '',
            vatNumber: user.vatNumber || '',
            companyNumber: user.companyNumber || '',
            bankName: user.bankDetails?.bankName || '',
            iban: user.bankDetails?.iban || '',
            accountHolder: user.bankDetails?.accountHolder || '',
            position: user.position || '',
            businessAddress: user.addresses?.business || '',
            privateAddress: user.addresses?.private || '',
            postalAddress: user.addresses?.postal || '',
            isPrivateSameAsBusiness: user.addresses?.isPrivateSameAsBusiness || false,
            country: user.country || 'United States',
            inviteEmail: ''
        });
    }, [user]);

    useEffect(() => {
        if (formData.isPrivateSameAsBusiness) {
            setFormData(prev => ({ ...prev, privateAddress: prev.businessAddress }));
        }
    }, [formData.isPrivateSameAsBusiness, formData.businessAddress]);

    const handleSave = () => {
        setSaveStatus('saving');
        const updatedUser: UserProfile = {
            ...user,
            name: formData.name, 
            companyName: formData.companyName,
            businessStructure: formData.businessStructure,
            incorporationDate: formData.incorporationDate,
            vatNumber: formData.vatNumber,
            companyNumber: formData.companyNumber,
            position: formData.position,
            country: formData.country,
            addresses: { business: formData.businessAddress, private: formData.privateAddress, postal: formData.postalAddress, isPrivateSameAsBusiness: formData.isPrivateSameAsBusiness },
            bankDetails: { bankName: formData.bankName, iban: formData.iban, accountHolder: formData.accountHolder }
        };
        onUpdate(updatedUser);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 animate-fade-in relative">
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm"><Briefcase className="text-blue-600" /></div>
                    <div><h2 className="text-2xl font-extrabold text-slate-800 uppercase tracking-widest">{translations.title}</h2><p className="text-slate-500 text-xs">Manage entity registration & access</p></div>
                </div>
                <button onClick={onLogout} className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl border border-rose-500/50 text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors text-xs font-bold uppercase tracking-widest shadow-sm"><LogOut size={16} /> Logout</button>
            </div>

            <div className="bg-[#0f172a] rounded-[2rem] p-8 mb-8 border border-slate-700 shadow-xl">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Active Accounts ({profiles.length}/3)</h3>
                <div className="flex flex-wrap gap-4">
                    {profiles.map(p => (
                        <button key={p.id} onClick={() => onSwitchProfile(p.id)} className={`flex items-center gap-4 pl-3 pr-6 py-3 rounded-2xl border-2 transition-all ${user.id === p.id ? 'border-blue-500 bg-blue-900/40' : 'border-slate-700 bg-slate-900/50 hover:border-slate-500'}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-inner ${user.id === p.id ? 'bg-blue-600' : 'bg-slate-800'}`}>{p.companyName ? p.companyName.charAt(0) : p.name.charAt(0)}</div>
                            <div className="text-left"><p className="text-sm font-bold text-white">{p.companyName || 'Personal Account'}</p><p className="text-[10px] text-slate-400">{p.name}</p></div>
                            {user.id === p.id && <CheckCircle2 size={16} className="text-blue-400 ml-2" />}
                        </button>
                    ))}
                    {profiles.length < 3 && (
                        <button onClick={onAddProfile} className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-dashed border-slate-600 hover:border-blue-400 text-slate-500 hover:text-blue-400 transition-colors text-xs font-bold uppercase tracking-widest h-[66px]"><Plus size={18} /> Add Account</button>
                    )}
                </div>
            </div>

            <div className="bg-[#0f172a] text-white rounded-[2rem] p-10 space-y-10 relative overflow-visible border border-slate-700 shadow-xl">
                <div>
                    <h3 className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-6 flex items-center gap-2"><User size={16} /> {translations.identityProfile}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations.fullName}</label><input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-800 border border-slate-600 p-3 rounded-xl text-white text-sm outline-none font-semibold" /></div>
                        <div className="space-y-2"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations.position}</label><input type="text" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full bg-slate-800 border border-slate-600 p-3 rounded-xl text-white text-sm outline-none" /></div>
                    </div>
                </div>

                <div className="w-full h-px bg-white/10"></div>
                
                 <div>
                    <h3 className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-6 flex items-center gap-2"><Globe size={16} /> Jurisdiction & Address</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operating Jurisdiction</label>
                            <div className="relative">
                                <select 
                                    value={formData.country} 
                                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-600 p-3 rounded-xl text-white text-sm outline-none font-bold appearance-none cursor-pointer"
                                >
                                    {Object.keys(COUNTRY_TO_LANGUAGES).filter(k => k !== 'Default').sort().map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                            </div>
                        </div>
                        <div className="space-y-2"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations.businessAddr}</label><input type="text" value={formData.businessAddress} onChange={e => setFormData({...formData, businessAddress: e.target.value})} className="w-full bg-slate-800 border border-slate-600 p-3 rounded-xl text-white text-sm outline-none" placeholder="Street, City, Zip" /></div>
                        
                         <div className="flex items-center gap-2 py-2">
                             <input type="checkbox" checked={formData.isPrivateSameAsBusiness} onChange={e => setFormData({...formData, isPrivateSameAsBusiness: e.target.checked})} className="accent-blue-500 w-4 h-4 rounded" />
                             <span className="text-xs text-slate-500">Private address is same as business</span>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations.privateAddr}</label><input type="text" disabled={formData.isPrivateSameAsBusiness} value={formData.privateAddress} onChange={e => setFormData({...formData, privateAddress: e.target.value})} className={`w-full bg-slate-800 border border-slate-600 p-3 rounded-xl text-white text-sm outline-none ${formData.isPrivateSameAsBusiness ? 'opacity-50' : ''}`} /></div>
                             <div className="space-y-2"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{translations.postalAddr}</label><input type="text" value={formData.postalAddress} onChange={e => setFormData({...formData, postalAddress: e.target.value})} className="w-full bg-slate-800 border border-slate-600 p-3 rounded-xl text-white text-sm outline-none" /></div>
                         </div>
                    </div>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                 <div className="pt-4 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
                     <button onClick={() => setIsResetConfirmOpen(true)} className="w-full md:w-auto px-6 py-3 border border-rose-900/50 bg-rose-900/10 hover:bg-rose-900/30 text-rose-500 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 rounded-xl"><Trash2 size={14} /> {translations.dangerZone}</button>
                     {saveStatus === 'saved' ? (
                        <button disabled className="w-full md:w-auto bg-emerald-600 text-white px-8 py-3 font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 cursor-default rounded-xl"><CheckCircle2 size={16} /> Profile Saved</button>
                     ) : (
                        <button onClick={handleSave} disabled={saveStatus === 'saving'} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-3 font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"><Save size={16} /> Update Profile</button>
                     )}
                 </div>
            </div>
            
             {isResetConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
                    <div className="bg-[#0f172a] rounded-3xl w-full max-w-md p-10 shadow-2xl animate-float-up text-center border border-rose-500/30">
                        <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><AlertTriangle size={32} className="text-rose-500" /></div>
                        <h3 className="text-2xl font-bold text-white uppercase tracking-widest mb-4">{translations.resetData}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">{translations.resetWarning}</p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsResetConfirmOpen(false)} className="flex-1 py-4 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-colors rounded-xl">{translations.cancel}</button>
                            <button onClick={() => { onReset(); setIsResetConfirmOpen(false); }} className="flex-1 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-widest shadow-lg shadow-rose-900/40 transition-colors rounded-xl">{translations.confirmReset}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
