
import { createClient } from '@supabase/supabase-js';
import { UserProfile, Transaction } from '../types';

// Initialize with the keys injected via vite.config.ts
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// --- Profiles Logic ---

export const loadProfiles = async (): Promise<UserProfile[]> => {
    try {
        const { data, error } = await supabase.from('novatax_profiles').select('*');
        if (error) {
            console.error('Supabase: Error loading profiles', error);
            // Fallback to local storage if table doesn't exist yet
            const saved = localStorage.getItem('novatax_profiles');
            return saved ? JSON.parse(saved) : [];
        }
        return data.map((row: any) => row.data as UserProfile);
    } catch (e) {
        console.warn("Supabase connection failed, falling back to local.", e);
        return [];
    }
};

export const upsertProfile = async (profile: UserProfile) => {
    // Save to local as backup
    const saved = localStorage.getItem('novatax_profiles');
    const profiles = saved ? JSON.parse(saved) : [];
    const newProfiles = profiles.some((p: any) => p.id === profile.id) 
        ? profiles.map((p: any) => p.id === profile.id ? profile : p)
        : [...profiles, profile];
    localStorage.setItem('novatax_profiles', JSON.stringify(newProfiles));

    // Save to Supabase
    const { error } = await supabase.from('novatax_profiles').upsert({ id: profile.id, data: profile });
    if (error) console.error('Supabase: Error saving profile', error);
};

// --- Transactions Logic ---

export const loadTransactions = async (userId: string): Promise<Transaction[]> => {
    try {
        const { data, error } = await supabase.from('novatax_transactions').select('*').eq('user_id', userId);
        if (error) {
            console.error('Supabase: Error loading transactions', error);
            const saved = localStorage.getItem(`novatax_transactions_${userId}`);
            return saved ? JSON.parse(saved) : [];
        }
        // If data is empty but we have local data, migrate it?
        // For now, just return what DB has or empty.
        return data.map((row: any) => row.data as Transaction);
    } catch (e) {
        return [];
    }
};

export const saveTransaction = async (userId: string, transaction: Transaction) => {
    // Local backup
    const saved = localStorage.getItem(`novatax_transactions_${userId}`);
    const txs = saved ? JSON.parse(saved) : [];
    const newTxs = [transaction, ...txs]; // Prepend
    localStorage.setItem(`novatax_transactions_${userId}`, JSON.stringify(newTxs));

    // Supabase
    const { error } = await supabase.from('novatax_transactions').upsert({
        id: transaction.id,
        user_id: userId,
        data: transaction
    });
    if (error) console.error('Supabase: Error saving transaction', error);
};

export const wipeTransactions = async (userId: string) => {
    localStorage.removeItem(`novatax_transactions_${userId}`);
    const { error } = await supabase.from('novatax_transactions').delete().eq('user_id', userId);
    if (error) console.error('Supabase: Error wiping transactions', error);
};
