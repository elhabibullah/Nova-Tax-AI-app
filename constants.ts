
import { UserProfile, Transaction, CryptoAsset, CountryConfig, TranslationDictionary, AccountItem, PnLItem } from './types';

// Supported Countries Configuration - Full Global List
export const COUNTRY_DATA: CountryConfig[] = []; 

// Comprehensive Global Mapping for the Scroll Wheel (196+ Countries)
export const COUNTRY_TO_LANGUAGES: Record<string, { code: string; name: string; nativeName: string; flag?: string, currency?: string }[]> = {
    // North America
    'United States': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', currency: 'USD' }],
    'Canada': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇨🇦', currency: 'CAD' }, { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇨🇦', currency: 'CAD' }],
    'Mexico': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇲🇽', currency: 'MXN' }],
    
    // Europe
    'United Kingdom': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', currency: 'GBP' }],
    'France': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'EUR' }],
    'Germany': [{ code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', currency: 'EUR' }],
    'Italy': [{ code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', currency: 'EUR' }],
    'Spain': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', currency: 'EUR' }],
    'Netherlands': [{ code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', currency: 'EUR' }, { code: 'en', name: 'English', nativeName: 'English', flag: '🇳🇱', currency: 'EUR' }],
    'Belgium': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇧🇪', currency: 'EUR' }, { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇧🇪', currency: 'EUR' }, { code: 'en', name: 'English', nativeName: 'English', flag: '🇧🇪', currency: 'EUR' }],
    'Switzerland': [{ code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇨🇭', currency: 'CHF' }, { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇨🇭', currency: 'CHF' }],
    'Belarus': [{ code: 'be', name: 'Belarusian', nativeName: 'Беларуская', flag: '🇧🇾', currency: 'BYN' }, { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇧🇾', currency: 'BYN' }],
    'Russia': [{ code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', currency: 'RUB' }],
    'Ukraine': [{ code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', currency: 'UAH' }],
    'Poland': [{ code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', currency: 'PLN' }],
    'Sweden': [{ code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', currency: 'SEK' }],
    'Norway': [{ code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', currency: 'NOK' }],
    'Denmark': [{ code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', currency: 'DKK' }],
    'Finland': [{ code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', currency: 'EUR' }],
    'Greece': [{ code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', currency: 'EUR' }],
    'Portugal': [{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', currency: 'EUR' }],
    'Ireland': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇪', currency: 'EUR' }],
    'Austria': [{ code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇦🇹', currency: 'EUR' }],
    'Czech Republic': [{ code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', currency: 'CZK' }],
    'Hungary': [{ code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', currency: 'HUF' }],
    'Romania': [{ code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', currency: 'RON' }],
    'Bulgaria': [{ code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', currency: 'BGN' }],
    'Croatia': [{ code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', currency: 'EUR' }],
    'Serbia': [{ code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', currency: 'RSD' }],
    'Slovakia': [{ code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', currency: 'EUR' }],
    'Slovenia': [{ code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', currency: 'EUR' }],
    'Estonia': [{ code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪', currency: 'EUR' }],
    'Latvia': [{ code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻', currency: 'EUR' }],
    'Lithuania': [{ code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹', currency: 'EUR' }],
    'Iceland': [{ code: 'is', name: 'Icelandic', nativeName: 'Íslenska', flag: '🇮🇸', currency: 'ISK' }],
    'Luxembourg': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇱🇺', currency: 'EUR' }, { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇱🇺', currency: 'EUR' }],
    'Malta': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇲🇹', currency: 'EUR' }],
    'Cyprus': [{ code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇨🇾', currency: 'EUR' }],
    'Albania': [{ code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱', currency: 'ALL' }],
    'Bosnia and Herzegovina': [{ code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦', currency: 'BAM' }],
    'North Macedonia': [{ code: 'mk', name: 'Macedonian', nativeName: 'Македонски', flag: '🇲🇰', currency: 'MKD' }],
    'Moldova': [{ code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇲🇩', currency: 'MDL' }],

    // Middle East
    'United Arab Emirates': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪', currency: 'AED' }, { code: 'en', name: 'English', nativeName: 'English', flag: '🇦🇪', currency: 'AED' }],
    'Saudi Arabia': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', currency: 'SAR' }, { code: 'en', name: 'English', nativeName: 'English', flag: '🇸🇦', currency: 'SAR' }],
    'Qatar': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇶🇦', currency: 'QAR' }, { code: 'en', name: 'English', nativeName: 'English', flag: '🇶🇦', currency: 'QAR' }],
    'Kuwait': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇰🇼', currency: 'KWD' }],
    'Bahrain': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇧🇭', currency: 'BHD' }],
    'Oman': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇴🇲', currency: 'OMR' }],
    'Jordan': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇯🇴', currency: 'JOD' }],
    'Lebanon': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇱🇧', currency: 'LBP' }],
    'Israel': [{ code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', currency: 'ILS' }],
    'Turkey': [{ code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', currency: 'TRY' }],
    'Egypt': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇪🇬', currency: 'EGP' }],
    'Iraq': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇮🇶', currency: 'IQD' }],
    'Iran': [{ code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', currency: 'IRR' }],
    'Yemen': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇾🇪', currency: 'YER' }],

    // Asia
    'China': [{ code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', currency: 'CNY' }],
    'Japan': [{ code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', currency: 'JPY' }],
    'South Korea': [{ code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', currency: 'KRW' }],
    'India': [{ code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', currency: 'INR' }, { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳', currency: 'INR' }],
    'Singapore': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇸🇬', currency: 'SGD' }, { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇸🇬', currency: 'SGD' }],
    'Malaysia': [{ code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', currency: 'MYR' }],
    'Indonesia': [{ code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', currency: 'IDR' }],
    'Thailand': [{ code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', currency: 'THB' }],
    'Vietnam': [{ code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', currency: 'VND' }],
    'Philippines': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇵🇭', currency: 'PHP' }, { code: 'tl', name: 'Tagalog', nativeName: 'Filipino', flag: '🇵🇭', currency: 'PHP' }],
    'Pakistan': [{ code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', currency: 'PKR' }, { code: 'en', name: 'English', nativeName: 'English', flag: '🇵🇰', currency: 'PKR' }],
    'Bangladesh': [{ code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', currency: 'BDT' }],
    'Kazakhstan': [{ code: 'kk', name: 'Kazakh', nativeName: 'Қазақша', flag: '🇰🇿', currency: 'KZT' }, { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇰🇿', currency: 'KZT' }],
    'Uzbekistan': [{ code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', flag: '🇺🇿', currency: 'UZS' }],
    'Azerbaijan': [{ code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿', currency: 'AZN' }],
    'Sri Lanka': [{ code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰', currency: 'LKR' }],
    'Nepal': [{ code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', currency: 'NPR' }],
    'Hong Kong': [{ code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇭🇰', currency: 'HKD' }, { code: 'en', name: 'English', nativeName: 'English', flag: '🇭🇰', currency: 'HKD' }],
    'Taiwan': [{ code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇹🇼', currency: 'TWD' }],
    'Cambodia': [{ code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', flag: '🇰🇭', currency: 'KHR' }],
    'Mongolia': [{ code: 'mn', name: 'Mongolian', nativeName: 'Монгол', flag: '🇲🇳', currency: 'MNT' }],

    // South America
    'Brazil': [{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', currency: 'BRL' }],
    'Argentina': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇦🇷', currency: 'ARS' }],
    'Chile': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇨🇱', currency: 'CLP' }],
    'Colombia': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇨🇴', currency: 'COP' }],
    'Peru': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇵🇪', currency: 'PEN' }],
    'Venezuela': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇻🇪', currency: 'VES' }],
    'Ecuador': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇨', currency: 'USD' }],
    'Bolivia': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇧🇴', currency: 'BOB' }],
    'Paraguay': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇵🇾', currency: 'PYG' }],
    'Uruguay': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇺🇾', currency: 'UYU' }],

    // Africa
    'South Africa': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇿🇦', currency: 'ZAR' }],
    'Nigeria': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇳🇬', currency: 'NGN' }],
    'Kenya': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇰🇪', currency: 'KES' }, { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', currency: 'KES' }],
    'Morocco': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇲🇦', currency: 'MAD' }, { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇲🇦', currency: 'MAD' }],
    'Algeria': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇩🇿', currency: 'DZD' }, { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇩🇿', currency: 'DZD' }],
    'Tunisia': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇹🇳', currency: 'TND' }],
    'Ghana': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇭', currency: 'GHS' }],
    'Ethiopia': [{ code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', currency: 'ETB' }],
    'Tanzania': [{ code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿', currency: 'TZS' }],
    'Uganda': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇬', currency: 'UGX' }],
    'Senegal': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇸🇳', currency: 'XOF' }],
    'Ivory Coast': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇨🇮', currency: 'XOF' }],
    'Cameroon': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇨🇲', currency: 'XAF' }, { code: 'en', name: 'English', nativeName: 'English', flag: '🇨🇲', currency: 'XAF' }],

    // Oceania
    'Australia': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇦🇺', currency: 'AUD' }],
    'New Zealand': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇳🇿', currency: 'NZD' }],
    'Fiji': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇫🇯', currency: 'FJD' }],
    'Papua New Guinea': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇵🇬', currency: 'PGK' }],

    // Default Fallback
    'Default': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🌐', currency: 'USD' }]
};

export const STRIPE_KEY = process.env.STRIPE_KEY;
export const STRIPE_PRICE_ID = 'price_1PqXy...'; // Placeholder until provided

export const TAX_RATES: Record<string, { standard: number; reduced: number; name: string }> = {
    'Belgium': { standard: 0.21, reduced: 0.06, name: 'VAT' },
    'France': { standard: 0.20, reduced: 0.055, name: 'TVA' },
    'United Kingdom': { standard: 0.20, reduced: 0.05, name: 'VAT' },
    'United Arab Emirates': { standard: 0.05, reduced: 0.00, name: 'VAT' },
    'Saudi Arabia': { standard: 0.15, reduced: 0.00, name: 'VAT' },
    'United States': { standard: 0.08, reduced: 0.00, name: 'Sales Tax' },
    'Germany': { standard: 0.19, reduced: 0.07, name: 'MwSt' },
    'Netherlands': { standard: 0.21, reduced: 0.09, name: 'BTW' },
    'Italy': { standard: 0.22, reduced: 0.10, name: 'IVA' },
    'Spain': { standard: 0.21, reduced: 0.10, name: 'IVA' },
    'Russia': { standard: 0.20, reduced: 0.10, name: 'VAT' },
    'Belarus': { standard: 0.20, reduced: 0.10, name: 'VAT' },
    'Kazakhstan': { standard: 0.12, reduced: 0.00, name: 'VAT' },
    'Uzbekistan': { standard: 0.12, reduced: 0.00, name: 'VAT' },
    'Brazil': { standard: 0.17, reduced: 0.00, name: 'ICMS' }
};

export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Abdelwahid Habibullah Adam Banu Hashim',
  position: 'Founder and CEO',
  email: 'elhabibullah@gmail.com',
  companyName: 'Banu Hashim Enterprise',
  businessStructure: 'LLC Single Owner',
  country: 'United Arab Emirates',
  baseCurrency: 'AED',
  displayCurrency: 'AED',
  language: 'en',
  annualIncome: 500000,
  filingFrequency: 'Quarterly',
  zakatEnabled: true,
  gosiEnabled: false,
  businessType: 'Consulting',
  bankDetails: {
    bankName: 'Emirates NBD',
    iban: 'AE0000000000000000000',
    accountHolder: 'Banu Hashim Enterprise'
  },
  addresses: {
      business: 'Dubai Silicon Oasis, Dubai, UAE',
      private: 'Dubai Silicon Oasis, Dubai, UAE',
      postal: 'PO Box 12345',
      isPrivateSameAsBusiness: true
  }
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-03-15', description: 'Cloud Server Costs', amount: 2450, originalCurrency: 'USD', category: 'Technology', type: 'expense', source: 'Bank', status: 'Paid', classification: 'Business' },
  { id: 't2', date: '2024-03-12', description: 'Client Retainer Payment', amount: 12500, originalCurrency: 'USD', category: 'Services', type: 'income', source: 'Bank', status: 'Paid', classification: 'Business' },
  { id: 't3', date: '2024-03-10', description: 'Office Supplies', amount: 320, originalCurrency: 'USD', category: 'Operations', type: 'expense', source: 'Manual', status: 'Paid', classification: 'Business' },
  { id: 't4', date: '2024-03-05', description: 'Consulting Project Alpha', amount: 8400, originalCurrency: 'USD', category: 'Services', type: 'income', source: 'Crypto', status: 'Paid', classification: 'Business' },
];

export const MOCK_ACCOUNTS: AccountItem[] = [
    { id: 'a1', name: 'Sales Account', category: 'Revenue', balance: 259277.00, type: 'Cr' },
    { id: 'a2', name: 'Purchase Account', category: 'Cost of Sales', balance: 12230.00, type: 'Dr' },
    { id: 'a3', name: 'HSBC Savings', category: 'Bank', balance: 94959.16, type: 'Dr' },
    { id: 'a4', name: 'Petty Cash', category: 'Cash', balance: 2500.00, type: 'Dr' },
];

export const MOCK_PROFIT_LOSS: PnLItem = {
    id: 'root', name: 'Profit and Loss', amount: 0,
    children: [
        { id: 'sales', name: 'Sales', amount: 259277.00 },
        { id: 'cogs', name: 'Cost Of Good Sold', amount: 28030.00 },
        { 
            id: 'exp', name: 'Expense', amount: 206950.20,
            children: [
                { id: 'e1', name: 'Office Rent', amount: 20000.00 },
                { id: 'e2', name: 'Staff Salary', amount: 6000.00 },
                { id: 'e3', name: 'Office Electricity', amount: 6000.00 }
            ]
        }
    ]
};

export const MOCK_CRYPTO: CryptoAsset[] = [
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.45, valueUsd: 28500, network: 'Bitcoin', change24h: 2.5 },
    { symbol: 'ETH', name: 'Ethereum', balance: 4.2, valueUsd: 12800, network: 'Ethereum', change24h: -1.2 },
    { symbol: 'SOL', name: 'Solana', balance: 145, valueUsd: 14500, network: 'Solana', change24h: 5.4 }
];

export const APP_SECTIONS = {
  DASHBOARD: 'dashboard',
  TRANSACTIONS: 'transactions',
  ACCOUNTS: 'accounts',
  REPORTS: 'reports',
  EXCHANGE: 'exchange',
  HR: 'hr',
  FEASIBILITY: 'feasibility',
  CRYPTO: 'crypto',
  AUDIT: 'audit',
  SETTINGS: 'settings'
};

export const EXCHANGE_RATES: Record<string, number> = {
  'USD': 1, 'EUR': 0.92, 'GBP': 0.79, 'AED': 3.67, 'SAR': 3.75, 'INR': 83.5, 'CNY': 7.23, 'JPY': 151.5, 'CAD': 1.36, 'AUD': 1.52, 'CHF': 0.91, 'RUB': 92.5
};

const FEASIBILITY_EN = {
    title: 'Project Feasibility & Business Plan',
    subtitle: 'Complete the 10-step wizard.',
    noticeTitle: 'Optimization Notice',
    noticeDesc: 'To generate the most accurate professional Feasibility Study, this wizard contains 37 detailed questions. Please answer as many as possible. The AI "Magic Wand" will use your previous answers to intelligently suggest new ones.',
    step: 'Step', of: 'of', prev: 'Previous', next: 'Next Section', generate: 'Generate Full Report', download: 'Download PDF Report', edit: 'Edit Inputs', aiAssist: 'AI Magic Assist', reportReady: 'Feasibility Report Ready',
    sections: {
        s1: 'Section 1 — Project Identity', s2: 'Section 2 — Founder Information', s3: 'Section 3 — Market Information', s4: 'Section 4 — Product / Service Information', s5: 'Section 5 — Operational Requirements',
        s6: 'Section 6 — Legal and Regulatory', s7: 'Section 7 — Financial Inputs', s8: 'Section 8 — Marketing Strategy', s9: 'Section 9 — Risks', s10: 'Section 10 — Vision & Timeline'
    },
    questions: {
        q1: '1. What is the project name?', q2: '2. In which country will the project operate?', q3: '3. In which city or region?', q4: '4. What is the type of business? (food, tech, services…)',
        q5: '5. What is your full name?', q6: '6. What is your position? (e.g. Founder, CEO)', q7: '7. What is your experience or background? (short description)', q8: '8. What skills do you have that are relevant to this project?', q9: '9. How much capital do you currently have available to start?',
        q10: '10. Who is your target customer?', q11: '11. How strong do you expect the demand to be?', q12: '12. Who are your main competitors?', q13: '13. What is your unique value proposition?',
        q14: '14. Describe your product or service clearly.', q15: '15. What are the main features or benefits?', q16: '16. What price do you plan to sell at?', q17: '17. What is your expected production capacity?',
        q18: '18. What equipment or tools do you need?', q19: '19. What raw materials or supplies do you need?', q20: '20. What kind of location is required?', q21: '21. How many employees will you need, and what are their roles?', q22: '22. Do you already know your suppliers? (optional)',
        q23: '23. Do you know the licenses required in your country?', q24: '24. What business structure do you plan to choose?',
        q25: '25. What is your available startup budget?', q26: '26. What do you estimate as your monthly operational costs?', q27: '27. How many units do you expect to sell per month?', q28: '28. What is your expected price per unit?', q29: '29. Do you have a planned marketing budget?',
        q30: '30. Who is your target audience?', q31: '31. Through which channels will you sell?', q32: '32. What promotion methods will you use?',
        q33: '33. What risks do you think your business may face?', q34: '34. What is your personal risk tolerance? (low / medium / high)',
        q35: '35. What is your long-term goal for this business?', q36: '36. When do you plan to launch?', q37: '37. Do you have future growth plans?'
    }
};

const FEASIBILITY_FR = {
    title: 'Faisabilité du Projet & Plan d\'Affaires',
    subtitle: 'Complétez l\'assistant en 10 étapes.',
    noticeTitle: 'Avis d\'Optimisation',
    noticeDesc: 'Pour générer l\'étude de faisabilité professionnelle la plus précise, cet assistant contient 37 questions détaillées. Veuillez en répondre autant que possible. La "Baguette Magique" IA utilisera vos réponses précédentes pour suggérer intelligemment de nouvelles.',
    step: 'Étape', of: 'sur', prev: 'Précédent', next: 'Section Suivante', generate: 'Générer le Rapport Complet', download: 'Télécharger le Rapport PDF', edit: 'Modifier les Entrées', aiAssist: 'Assistance Magique IA', reportReady: 'Rapport de Faisabilité Prêt',
    sections: {
        s1: 'Section 1 — Identité du Projet', s2: 'Section 2 — Informations sur le Fondateur', s3: 'Section 3 — Informations sur le Marché', s4: 'Section 4 — Informations Produit / Service', s5: 'Section 5 — Exigences Opérationnelles',
        s6: 'Section 6 — Juridique et Réglementaire', s7: 'Section 7 — Données Financières', s8: 'Section 8 — Stratégie Marketing', s9: 'Section 9 — Risques', s10: 'Section 10 — Vision & Calendrier'
    },
    questions: {
        q1: '1. Quel est le nom du projet ?', q2: '2. Dans quel pays le projet opérera-t-il ?', q3: '3. Dans quelle ville ou région ?', q4: '4. Quel est le type d\'entreprise ? (alimentation, tech, services…)',
        q5: '5. Quel est votre nom complet ?', q6: '6. Quel est votre poste ? (ex: Fondateur, PDG)', q7: '7. Quelle est votre expérience ou parcours ? (brève description)', q8: '8. Quelles compétences avez-vous qui sont pertinentes pour ce projet ?', q9: '9. De quel capital disposez-vous actuellement pour commencer ?',
        q10: '10. Qui est votre client cible ?', q11: '11. Quelle demande prévoyez-vous ?', q12: '12. Qui sont vos principaux concurrents ?', q13: '13. Quelle est votre proposition de valeur unique ?',
        q14: '14. Décrivez clairement votre produit ou service.', q15: '15. Quelles sont les principales caractéristiques ou avantages ?', q16: '16. À quel prix prévoyez-vous de vendre ?', q17: '17. Quelle est votre capacité de production prévue ?',
        q18: '18. De quels équipements ou outils avez-vous besoin ?', q19: '19. De quelles matières premières ou fournitures avez-vous besoin ?', q20: '20. Quel type d\'emplacement est requis ?', q21: '21. De combien d\'employés aurez-vous besoin et quels sont leurs rôles ?', q22: '22. Connaissez-vous déjà vos fournisseurs ? (optionnel)',
        q23: '23. Connaissez-vous les licences requises dans votre pays ?', q24: '24. Quelle structure juridique prévoyez-vous de choisir ?',
        q25: '25. Quel est votre budget de démarrage disponible ?', q26: '26. À combien estimez-vous vos coûts opérationnels mensuels ?', q27: '27. Combien d\'unités prévoyez-vous de vendre par mois ?', q28: '28. Quel est votre prix prévu par unité ?', q29: '29. Avez-vous un budget marketing prévu ?',
        q30: '30. Qui est votre public cible ?', q31: '31. Par quels canaux vendrez-vous ?', q32: '32. Quelles méthodes de promotion utiliserez-vous ?',
        q33: '33. Quels risques pensez-vous que votre entreprise pourrait rencontrer ?', q34: '34. Quelle est votre tolérance au risque personnelle ? (faible / moyenne / élevée)',
        q35: '35. Quel est votre objectif à long terme pour cette entreprise ?', q36: '36. Quand prévoyez-vous de lancer ?', q37: '37. Avez-vous des plans de croissance futurs ?'
    }
};

const FEASIBILITY_AR = {
    title: 'دراسة الجدوى وخطة العمل',
    subtitle: 'أكمل المعالج المكون من 10 خطوات.',
    noticeTitle: 'إشعار التحسين',
    noticeDesc: 'لإنشاء دراسة جدوى احترافية دقيقة، يحتوي هذا المعالج على 37 سؤالاً مفصلاً. يرجى الإجابة على أكبر عدد ممكن. ستستخدم "العصا السحرية" للذكاء الاصطناعي إجاباتك السابقة لاقتراح إجابات جديدة بذكاء.',
    step: 'خطوة', of: 'من', prev: 'السابق', next: 'القسم التالي', generate: 'إنشاء التقرير الكامل', download: 'تحميل التقرير PDF', edit: 'تعديل المدخلات', aiAssist: 'المساعدة السحرية', reportReady: 'تقرير الجدوى جاهز',
    sections: {
        s1: 'القسم 1 — هوية المشروع', s2: 'القسم 2 — معلومات المؤسس', s3: 'القسم 3 — معلومات السوق', s4: 'القسم 4 — معلومات المنتج / الخدمة', s5: 'القسم 5 — المتطلبات التشغيلية',
        s6: 'القسم 6 — القانونية والتنظيمية', s7: 'القسم 7 — المدخلات المالية', s8: 'القسم 8 — استراتيجية التسويق', s9: 'القسم 9 — المخاطر', s10: 'القسم 10 — الرؤية والجدول الزمني'
    },
    questions: {
        q1: '1. ما هو اسم المشروع؟', q2: '2. في أي دولة سيعمل المشروع؟', q3: '3. في أي مدينة أو منطقة؟', q4: '4. ما هو نوع العمل؟ (طعام، تكنولوجيا، خدمات...)',
        q5: '5. ما هو اسمك الكامل؟', q6: '6. ما هو منصبك؟ (مثل المؤسس، الرئيس التنفيذي)', q7: '7. ما هي خبرتك أو خلفيتك؟ (وصف قصير)', q8: '8. ما هي المهارات التي تمتلكها وذات صلة بهذا المشروع؟', q9: '9. كم رأس المال المتوفر لديك حاليًا للبدء؟',
        q10: '10. من هو عميلك المستهدف؟', q11: '11. ما مدى قوة الطلب المتوقعة؟', q12: '12. من هم منافسوك الرئيسيون؟', q13: '13. ما هي القيمة الفريدة التي تقدمها؟',
        q14: '14. صف منتجك أو خدمتك بوضوح.', q15: '15. ما هي الميزات أو الفوائد الرئيسية؟', q16: '16. ما هو السعر الذي تخطط للبيع به؟', q17: '17. ما هي طاقتك الإنتاجية المتوقعة؟',
        q18: '18. ما هي المعدات أو الأدوات التي تحتاجها؟', q19: '19. ما هي المواد الخام أو الإمدادات التي تحتاجها؟', q20: '20. ما نوع الموقع المطلوب؟', q21: '21. كم عدد الموظفين الذين ستحتاجهم، وما هي أدوارهم؟', q22: '22. هل تعرف مورديك بالفعل؟ (اختياري)',
        q23: '23. هل تعرف التراخيص المطلوبة في بلدك؟', q24: '24. ما هو الهيكل التجاري الذي تخطط لاختياره؟',
        q25: '25. ما هي ميزانية البدء المتاحة لديك؟', q26: '26. ما تقديرك لتكاليف التشغيل الشهرية؟', q27: '27. كم وحدة تتوقع بيعها شهريًا؟', q28: '28. ما هو السعر المتوقع لكل وحدة؟', q29: '29. هل لديك ميزانية تسويق مخططة؟',
        q30: '30. من هو جمهورك المستهدف؟', q31: '31. من خلال أي قنوات ستبيع؟', q32: '32. ما طرق الترويج التي ستستخدمها؟',
        q33: '33. ما هي المخاطر التي تعتقد أن عملك قد يواجهها؟', q34: '34. ما هو تحملك الشخصي للمخاطر؟ (منخفض / متوسط / مرتفع)',
        q35: '35. ما هو هدفك طويل المدى لهذا العمل؟', q36: '36. متى تخطط للإطلاق؟', q37: '37. هل لديك خطط نمو مستقبلية؟'
    }
};

const FEASIBILITY_DE = {
    title: 'Projektmachbarkeit & Businessplan',
    subtitle: 'Schließen Sie den 10-Schritte-Assistenten ab.',
    noticeTitle: 'Optimierungshinweis',
    noticeDesc: 'Um die genaueste professionelle Machbarkeitsstudie zu erstellen, enthält dieser Assistent 37 detaillierte Fragen. Bitte beantworten Sie so viele wie möglich. Der KI-"Zauberstab" verwendet Ihre vorherigen Antworten, um intelligent neue vorzuschlagen.',
    step: 'Schritt', of: 'von', prev: 'Zurück', next: 'Nächster Abschnitt', generate: 'Vollständigen Bericht erstellen', download: 'PDF-Bericht herunterladen', edit: 'Eingaben bearbeiten', aiAssist: 'KI-Zauberstab', reportReady: 'Machbarkeitsbericht Bereit',
    sections: {
        s1: 'Abschnitt 1 — Projektidentität', s2: 'Abschnitt 2 — Gründerinformationen', s3: 'Abschnitt 3 — Marktinformationen', s4: 'Abschnitt 4 — Produkt- / Serviceinformationen', s5: 'Abschnitt 5 — Betriebsanforderungen',
        s6: 'Abschnitt 6 — Rechtliches und Regulatorisches', s7: 'Abschnitt 7 — Finanzielle Eingaben', s8: 'Abschnitt 8 — Marketingstrategie', s9: 'Abschnitt 9 — Risiken', s10: 'Abschnitt 10 — Vision & Zeitplan'
    },
    questions: {
        q1: '1. Wie lautet der Projektname?', q2: '2. In welchem Land wird das Projekt tätig sein?', q3: '3. In welcher Stadt oder Region?', q4: '4. Welche Art von Geschäft ist es? (Lebensmittel, Tech, Dienstleistungen…)',
        q5: '5. Wie lautet Ihr vollständiger Name?', q6: '6. Was ist Ihre Position? (z.B. Gründer, CEO)', q7: '7. Was ist Ihre Erfahrung oder Ihr Hintergrund? (kurze Beschreibung)', q8: '8. Welche Fähigkeiten haben Sie, die für dieses Projekt relevant sind?', q9: '9. Wie viel Kapital haben Sie derzeit zur Verfügung, um zu starten?',
        q10: '10. Wer ist Ihr Zielkunde?', q11: '11. Wie stark schätzen Sie die Nachfrage ein?', q12: '12. Wer sind Ihre Hauptkonkurrenten?', q13: '13. Was ist Ihr Alleinstellungsmerkmal?',
        q14: '14. Beschreiben Sie Ihr Produkt oder Ihre Dienstleistung deutlich.', q15: '15. Was sind die Hauptmerkmale oder Vorteile?', q16: '16. Zu welchem Preis planen Sie zu verkaufen?', q17: '17. Was ist Ihre erwartete Produktionskapazität?',
        q18: '18. Welche Ausrüstung oder Werkzeuge benötigen Sie?', q19: '19. Welche Rohstoffe oder Materialien benötigen Sie?', q20: '20. Welche Art von Standort ist erforderlich?', q21: '21. Wie viele Mitarbeiter werden Sie benötigen und was sind ihre Rollen?', q22: '22. Kennen Sie bereits Ihre Lieferanten? (optional)',
        q23: '23. Kennen Sie die in Ihrem Land erforderlichen Lizenzen?', q24: '24. Welche Unternehmensstruktur planen Sie zu wählen?',
        q25: '25. Was ist Ihr verfügbares Startbudget?', q26: '26. Was schätzen Sie als Ihre monatlichen Betriebskosten?', q27: '27. Wie viele Einheiten erwarten Sie pro Monat zu verkaufen?', q28: '28. Was ist Ihr erwarteter Preis pro Einheit?', q29: '29. Haben Sie ein geplantes Marketingbudget?',
        q30: '30. Wer ist Ihre Zielgruppe?', q31: '31. Über welche Kanäle werden Sie verkaufen?', q32: '32. Welche Werbemethoden werden Sie verwenden?',
        q33: '33. Welche Risiken glauben Sie, könnte Ihr Unternehmen haben?', q34: '34. Was ist Ihre persönliche Risikotoleranz? (niedrig / mittel / hoch)',
        q35: '35. Was ist Ihr langfristiges Ziel für dieses Unternehmen?', q36: '36. Wann planen Sie den Start?', q37: '37. Haben Sie zukünftige Wachstumspläne?'
    }
};

export const UI_TRANSLATIONS: Record<string, TranslationDictionary> = {
  'en': {
    nav: {
      dashboard: 'Dashboard', transactions: 'Transactions', accounts: 'List of Accounts', reports: 'Profit & Loss', exchange: 'Exchange Rates', hr: 'HR & Salaries', feasibility: 'Feasibility', crypto: 'Crypto Assets', audit: 'AI Audit', settings: 'Settings', disconnect: 'Sign Out', status: 'STATUS'
    },
    dashboard: {
      title: 'Dashboard', totalRevenue: 'Total Revenue', taxLiability: 'Tax Liability', activeProjects: 'Active Projects', compliance: 'Compliance', cashFlow: 'Cash Flow Protocol', pendingOps: 'Pending Operations', monthly: 'MONTHLY', paymentPending: 'PAYMENT PENDING', optimal: 'OPTIMAL', secure: 'SECURE'
    },
    onboarding: {
      title: 'NovaTax AI', 
      desc: 'NovaTax AI is an advanced, AI-driven global accounting and HR platform designed to automate financial management for individuals and businesses without the need for a human accountant. The system integrates international tax rules, crypto management, audit capabilities, feasibility studies, salary calculations, and localized regulations, adapting automatically to each user’s country, income, and reporting frequency.',
      loginBtn: 'Sign In', loginTitle: 'Sign In', backBtn: 'Back', subTitle: 'Entity Registration', subDesc: 'Full Protocol Access License', subBtn: 'Subscribe', perYear: 'Per Year', securedBy: 'Secured by Stripe',
      features: ['Global Tax Compliance Engine', 'Real-time Zakat & GOSI Auto-calc', 'Crypto Portfolio Audit & Tax', 'AI Feasibility Study Generator', 'HR & Payroll Auto-Pilot', 'Multi-Jurisdiction Filing', 'Audit Risk Detection', 'Secure Decentralized Storage'],
      regTitle: 'Entity Registration', regDesc: 'Complete your business profile to activate the protocol.', incDate: 'Incorporation Date', busAddr: 'Business Address', privAddr: 'Private Address', postAddr: 'Postal Address', sameAddr: 'Private address is same as business', completeSetup: 'Complete Registration'
    },
    accounting: {
        accountsTitle: 'Chart of Accounts',
        pnlTitle: 'Profit and Loss Statement',
        sales: 'Sales', cogs: 'Cost of Goods Sold', grossProfit: 'Gross Profit', expenses: 'Operating Expenses', netProfit: 'Net Profit', addExpense: 'Record Transaction', credit: 'Credit (Payable)', paid: 'Paid (Cash/Bank)',
        newInvoice: 'New Invoice (Income)', newBill: 'New Bill (Expense)', customerVendor: 'Customer / Vendor', date: 'Date', classification: 'Classification', business: 'Business', personal: 'Private', addItem: 'Add Line Item', subtotal: 'Subtotal', tax: 'Tax', total: 'Total', save: 'Save Transaction',
        scanReceipt: 'AI Receipt Scanner', dropReceipt: 'Drag & Drop or Click to Upload', scanning: 'Analyzing...'
    },
    profile: {
        title: 'Entity Configuration', identityProfile: 'Identity Profile', fullName: 'Full Name', companyDetails: 'Company Details', companyName: 'Registered Company Name', businessStructure: 'Legal Structure (LLC, etc.)', vatNumber: 'Tax/VAT Number', companyNumber: 'Registration Number', bankDetails: 'Bank Account (IBAN)', bankName: 'Bank Name', iban: 'IBAN Number', accountHolder: 'Account Holder Name', accessManagement: 'Access Management', inviteAccountant: 'Invite Accountant (Email)', save: 'Update Profile', position: 'Your Position (CEO, Founder...)',
        addresses: 'Registered Addresses', businessAddr: 'Business Address (Mandatory)', privateAddr: 'Private Address', postalAddr: 'Postal Address', incDate: 'Gründungsdatum / Start',
        dangerZone: 'Danger Zone', resetData: 'Reset All Financial Data', resetWarning: 'Are you sure? This action is NOT REVERSIBLE. All transactions and accounting records will be permanently deleted.', confirmReset: 'Yes, Delete Everything', cancel: 'Cancel'
    },
    feasibility: FEASIBILITY_EN,
    audit: {
      title: 'AI Compliance Audit', selectYear: 'Select Fiscal Year', generate: 'Run Full Audit', generating: 'Analyzing Transactions & Regulations...', download: 'Download Report', email: 'Email Report',
      certTitle: 'Official Certification Required?', certDesc: 'To use this audit for bank loans or government filing, it requires a stamp from a Chartered Accountant. Submit this report to our Partner Network for legal validation.', certBtn: 'Request Certified Review'
    }
  },
  'fr': {
    nav: {
      dashboard: 'Tableau de Bord', transactions: 'Transactions', accounts: 'Plan Comptable', reports: 'Compte de Résultat', exchange: 'Taux de Change', hr: 'RH & Salaires', feasibility: 'Faisabilité', crypto: 'Actifs Crypto', audit: 'Audit IA', settings: 'Paramètres', disconnect: 'Déconnexion', status: 'STATUT'
    },
    dashboard: {
      title: 'Tableau de Bord', totalRevenue: 'Revenu Total', taxLiability: 'Dette Fiscale', activeProjects: 'Projets Actifs', compliance: 'Conformité', cashFlow: 'Protocole de Trésorerie', pendingOps: 'Opérations en Attente', monthly: 'MENSUEL', paymentPending: 'PAIEMENT EN ATTENTE', optimal: 'OPTIMAL', secure: 'SÉCURISÉ'
    },
    onboarding: {
      title: 'NovaTax AI',
      desc: 'NovaTax AI est une plateforme avancée de comptabilité et de RH pilotée par l\'IA...',
      loginBtn: 'Connexion', loginTitle: 'Connexion', backBtn: 'Retour', subTitle: 'Enregistrement de l\'Entité', subDesc: 'Licence d\'Accès Complet au Protocole', subBtn: 'S\'abonner', perYear: 'Par An', securedBy: 'Sécurisé par Stripe',
      features: ['Moteur de Conformité Fiscale Mondiale', 'Calcul Auto Zakat & GOSI en Temps Réel', 'Audit et Taxe de Portefeuille Crypto', 'Générateur d\'Études de Faisabilité IA', 'RH & Paie Automatisés', 'Déclaration Multi-Juridictionnelle', 'Détection des Risques d\'Audit', 'Stockage Décentralisé Sécurisé'],
      regTitle: 'Enregistrement de l\'Entité', regDesc: 'Complétez votre profil d\'entreprise pour activer le protocole.', incDate: 'Date de Création', busAddr: 'Adresse Professionnelle', privAddr: 'Adresse Privée', postAddr: 'Adresse Postale', sameAddr: 'L\'adresse privée est identique à l\'adresse professionnelle', completeSetup: 'Terminer l\'Inscription'
    },
    accounting: {
        accountsTitle: 'Plan Comptable',
        pnlTitle: 'Compte de Résultat',
        sales: 'Ventes', cogs: 'Coût des Marchandises Vendues', grossProfit: 'Marge Brute', expenses: 'Dépenses d\'Exploitation', netProfit: 'Bénéfice Net', addExpense: 'Enregistrer une Transaction', credit: 'Crédit (À Payer)', paid: 'Payé (Espèces/Banque)',
        newInvoice: 'Nouvelle Facture (Revenu)', newBill: 'Nouvelle Facture (Dépense)', customerVendor: 'Client / Fournisseur', date: 'Date', classification: 'Classification', business: 'Professionnel', personal: 'Privé', addItem: 'Ajouter une Ligne', subtotal: 'Sous-total', tax: 'Taxe', total: 'Total', save: 'Enregistrer la Transaction',
        scanReceipt: 'Scanner de Reçus IA', dropReceipt: 'Glisser-Déposer ou Cliquer', scanning: 'Analyse en cours...'
    },
    profile: {
        title: 'Configuration de l\'Entité', identityProfile: 'Profil d\'Identité', fullName: 'Nom Complet', companyDetails: 'Détails de l\'Entreprise', companyName: 'Nom de l\'Entreprise', businessStructure: 'Statut Juridique (SARL, SAS...)', vatNumber: 'Numéro de TVA', companyNumber: 'Numéro d\'Enregistrement', bankDetails: 'Coordonnées Bancaires (IBAN)', bankName: 'Nom de la Banque', iban: 'Numéro IBAN', accountHolder: 'Titulaire du Compte', accessManagement: 'Gestion des Accès', inviteAccountant: 'Inviter un Comptable (Email)', save: 'Mettre à Jour', position: 'Votre Poste (PDG, Fondateur...)',
        addresses: 'Adresses Enregistrées', businessAddr: 'Adresse Professionnelle (Obligatoire)', privateAddr: 'Adresse Privée', postalAddr: 'Adresse Postale', incDate: 'Date de Création / Début',
        dangerZone: 'Zone de Danger', resetData: 'Réinitialiser Toutes les Données Financières', resetWarning: 'Êtes-vous sûr ? Cette action est IRRÉVERSIBLE. Toutes les transactions et les enregistrements comptables seront définitivement supprimés.', confirmReset: 'Oui, Tout Supprimer', cancel: 'Annuler'
    },
    feasibility: FEASIBILITY_FR,
    audit: {
      title: 'Audit de Conformité IA', selectYear: 'Sélectionner l\'Année Fiscale', generate: 'Lancer l\'Audit Complet', generating: 'Analyse des Transactions & Règlements...', download: 'Télécharger le Rapport', email: 'Envoyer par Email',
      certTitle: 'Certification Officielle Requise ?', certDesc: 'Pour utiliser cet audit pour des prêts bancaires ou des déclarations gouvernementales, il nécessite le cachet d\'un Expert-Comptable. Soumettez ce rapport à notre Réseau de Partenaires pour validation légale.', certBtn: 'Demander une Révision Certifiée'
    }
  },
  'ar': {
      nav: {
      dashboard: 'لوحة القيادة', transactions: 'المعاملات', accounts: 'دليل الحسابات', reports: 'الربح والخسارة', exchange: 'أسعار الصرف', hr: 'الموارد البشرية والرواتب', feasibility: 'دراسة الجدوى', crypto: 'الأصول المشفرة', audit: 'تدقيق الذكاء الاصطناعي', settings: 'الإعدادات', disconnect: 'تسجيل الخروج', status: 'الحالة'
    },
    dashboard: {
      title: 'لوحة القيادة', totalRevenue: 'إجمالي الإيرادات', taxLiability: 'الالتزام الضريبي', activeProjects: 'المشاريع النشطة', compliance: 'الامتثال', cashFlow: 'بروتوكول التدفق النقدي', pendingOps: 'العمليات المعلقة', monthly: 'شهرياً', paymentPending: 'الدفع معلق', optimal: 'مثالي', secure: 'آمن'
    },
    onboarding: {
      title: 'نوفاتاكس للذكاء الاصطناعي',
      desc: 'نوفاتاكس هو منصة محاسبة وموارد بشرية عالمية متقدمة تعتمد على الذكاء الاصطناعي...',
      loginBtn: 'تسجيل الدخول', loginTitle: 'تسجيل الدخول', backBtn: 'رجوع', subTitle: 'تسجيل الكيان', subDesc: 'رخصة الوصول الكامل للبروتوكول', subBtn: 'اشتراك', perYear: 'سنوياً', securedBy: 'مؤمن بواسطة Stripe',
      features: ['محرك الامتثال الضريبي العالمي', 'حساب الزكاة والتأمنيات الاجتماعية تلقائياً', 'تدقيق وضرائب محفظة العملات المشفرة', 'مولد دراسة الجدوى بالذكاء الاصطناعي', 'الموارد البشرية وكشوف المرتبات الآلية', 'الإيداع متعدد الاختصاصات', 'كشف مخاطر التدقيق', 'تخزين لامركزي آمن'],
      regTitle: 'تسجيل الكيان', regDesc: 'أكمل ملف تعريف عملك لتفعيل البروتوكول.', incDate: 'تاريخ التأسيس', busAddr: 'عنوان العمل', privAddr: 'العنوان الخاص', postAddr: 'العنوان البريدي', sameAddr: 'العنوان الخاص هو نفس عنوان العمل', completeSetup: 'إكمال التسجيل'
    },
    accounting: {
        accountsTitle: 'دليل الحسابات',
        pnlTitle: 'بيان الربح والخسارة',
        sales: 'المبيعات', cogs: 'تكلفة البضائع المباعة', grossProfit: 'إجمالي الربح', expenses: 'نفقات التشغيل', netProfit: 'صافي الربح', addExpense: 'تسجيل معاملة', credit: 'آجل (دائن)', paid: 'مدفوع (نقد/بنك)',
        newInvoice: 'فاتورة جديدة (إيراد)', newBill: 'فاتورة جديدة (مصروف)', customerVendor: 'العميل / المورد', date: 'التاريخ', classification: 'التصنيف', business: 'عمل', personal: 'خاص', addItem: 'إضافة بند', subtotal: 'المجموع الفرعي', tax: 'الضريبة', total: 'الإجمالي', save: 'حفظ المعاملة',
        scanReceipt: 'ماسح الإيصالات الذكي', dropReceipt: 'اسحب وأفلت أو انقر للتحميل', scanning: 'جاري التحليل...'
    },
    profile: {
        title: 'تكوين الكيان', identityProfile: 'ملف الهوية', fullName: 'الاسم الكامل', companyDetails: 'تفاصيل الشركة', companyName: 'اسم الشركة المسجل', businessStructure: 'الهيكل القانوني (ذ.م.م، إلخ)', vatNumber: 'الرقم الضريبي', companyNumber: 'رقم السجل التجاري', bankDetails: 'تفاصيل البنك (IBAN)', bankName: 'اسم البنك', iban: 'رقم الآيبان', accountHolder: 'اسم صاحب الحساب', accessManagement: 'إدارة الوصول', inviteAccountant: 'دعوة محاسب (البريد الإلكتروني)', save: 'تحديث الملف', position: 'منصبك (الرئيس التنفيذي، المؤسس...)',
        addresses: 'العناوين المسجلة', businessAddr: 'عنوان العمل (إلزامي)', privateAddr: 'العنوان الخاص', postalAddr: 'العنوان البريدي', incDate: 'تاريخ التأسيس / البدء',
        dangerZone: 'منطقة الخطر', resetData: 'إعادة تعيين جميع البيانات المالية', resetWarning: 'هل أنت متأكد؟ هذا الإجراء لا رجعة فيه. سيتم حذف جميع المعاملات والسجلات المحاسبية بشكل دائم.', confirmReset: 'نعم، احذف كل شيء', cancel: 'إلغاء'
    },
    feasibility: FEASIBILITY_AR,
    audit: {
      title: 'تدقيق الامتثال بالذكاء الاصطناعي', selectYear: 'اختر السنة المالية', generate: 'بدء التدقيق الكامل', generating: 'تحليل المعاملات واللوائح...', download: 'تحميل التقرير', email: 'إرسال بالبريد',
      certTitle: 'هل الشهادة الرسمية مطلوبة؟', certDesc: 'لاستخدام هذا التدقيق للقروض المصرفية أو الملفات الحكومية، يتطلب ختم محاسب قانوني. أرسل هذا التقرير إلى شبكة شركائنا للتحقق القانوني.', certBtn: 'طلب مراجعة معتمدة'
    }
  },
  'de': {
      nav: {
      dashboard: 'Dashboard', transactions: 'Transaktionen', accounts: 'Kontenplan', reports: 'Gewinn & Verlust', exchange: 'Wechselkurse', hr: 'HR & Gehälter', feasibility: 'Machbarkeit', crypto: 'Krypto-Assets', audit: 'KI-Audit', settings: 'Einstellungen', disconnect: 'Abmelden', status: 'STATUS'
    },
    dashboard: {
      title: 'Dashboard', totalRevenue: 'Gesamtumsatz', taxLiability: 'Steuerschuld', activeProjects: 'Aktive Projekte', compliance: 'Compliance', cashFlow: 'Cashflow-Protokoll', pendingOps: 'Ausstehende Ops', monthly: 'MONATLICH', paymentPending: 'ZAHLUNG AUSSTEHEND', optimal: 'OPTIMAL', secure: 'SICHER'
    },
    onboarding: {
      title: 'NovaTax AI',
      desc: 'NovaTax AI ist eine fortschrittliche, KI-gesteuerte globale Buchhaltungs- und HR-Plattform...',
      loginBtn: 'Anmelden', loginTitle: 'Anmelden', backBtn: 'Zurück', subTitle: 'Unternehmensregistrierung', subDesc: 'Volle Protokoll-Zugangslizenz', subBtn: 'Abonnieren', perYear: 'Pro Jahr', securedBy: 'Gesichert durch Stripe',
      features: ['Globale Steuer-Compliance-Engine', 'Echtzeit Zakat & GOSI Auto-Calc', 'Krypto-Portfolio-Audit & Steuer', 'KI-Machbarkeitsstudien-Generator', 'HR & Lohnbuchhaltung Auto-Pilot', 'Multi-Jurisdiktions-Filing', 'Audit-Risikoerkennung', 'Sichere dezentrale Speicherung'],
      regTitle: 'Unternehmensregistrierung', regDesc: 'Vervollständigen Sie Ihr Unternehmensprofil, um das Protokoll zu aktivieren.', incDate: 'Gründungsdatum', busAddr: 'Geschäftsadresse', privAddr: 'Privatadresse', postAddr: 'Postanschrift', sameAddr: 'Privatadresse ist gleich Geschäftsadresse', completeSetup: 'Registrierung abschließen'
    },
    accounting: {
        accountsTitle: 'Kontenplan',
        pnlTitle: 'Gewinn- und Verlustrechnung',
        sales: 'Umsatzerlöse', cogs: 'Herstellungskosten', grossProfit: 'Bruttogewinn', expenses: 'Betriebsausgaben', netProfit: 'Reingewinn', addExpense: 'Transaktion erfassen', credit: 'Kredit (Verbindlichkeit)', paid: 'Bezahlt (Bar/Bank)',
        newInvoice: 'Neue Rechnung (Einnahme)', newBill: 'Neue Rechnung (Ausgabe)', customerVendor: 'Kunde / Lieferant', date: 'Datum', classification: 'Klassifizierung', business: 'Geschäftlich', personal: 'Privat', addItem: 'Position hinzufügen', subtotal: 'Zwischensumme', tax: 'Steuer', total: 'Gesamt', save: 'Transaktion speichern',
        scanReceipt: 'KI-Belegscanner', dropReceipt: 'Drag & Drop oder Klicken zum Hochladen', scanning: 'Analyse läuft...'
    },
    profile: {
        title: 'Unternehmenskonfiguration', identityProfile: 'Identitätsprofil', fullName: 'Vollständiger Name', companyDetails: 'Firmendetails', companyName: 'Registrierter Firmenname', businessStructure: 'Rechtsform (GmbH, etc.)', vatNumber: 'Steuernummer', companyNumber: 'Handelsregisternummer', bankDetails: 'Bankverbindung (IBAN)', bankName: 'Bankname', iban: 'IBAN-Nummer', accountHolder: 'Kontoinhaber', accessManagement: 'Zugriffsverwaltung', inviteAccountant: 'Buchhalter einladen (E-Mail)', save: 'Profil aktualisieren', position: 'Ihre Position (CEO, Gründer...)',
        addresses: 'Registrierte Adressen', businessAddr: 'Geschäftsadresse (Pflichtfeld)', privateAddr: 'Privatadresse', postalAddr: 'Postanschrift', incDate: 'Gründungsdatum / Start',
        dangerZone: 'Gefahrenzone', resetData: 'Alle Finanzdaten zurücksetzen', resetWarning: 'Sind Sie sicher? Diese Aktion ist NICHT RÜCKGÄNGIG zu machen. Alle Transaktionen und Buchhaltungsunterlagen werden dauerhaft gelöscht.', confirmReset: 'Ja, alles löschen', cancel: 'Abbrechen'
    },
    feasibility: FEASIBILITY_DE,
    audit: {
      title: 'KI-Compliance-Audit', selectYear: 'Geschäftsjahr auswählen', generate: 'Vollständiges Audit starten', generating: 'Transaktionen & Vorschriften analysieren...', download: 'Bericht herunterladen', email: 'Per E-Mail senden',
      certTitle: 'Offizielle Zertifizierung Erforderlich?', certDesc: 'Um dieses Audit für Bankkredite oder behördliche Einreichungen zu verwenden, ist ein Stempel eines Wirtschaftsprüfers erforderlich. Senden Sie diesen Bericht an unser Partnernetzwerk zur rechtlichen Validierung.', certBtn: 'Zertifizierte Überprüfung anfordern'
    }
  }
};
