
export interface UserProfile {
  id: string;
  name: string;
  country: string;
  baseCurrency: string;
  displayCurrency: string; // The currency the user wants to see results in
  language: string;
  annualIncome: number;
  filingFrequency: 'Monthly' | 'Quarterly' | 'Annual';
  zakatEnabled: boolean;
  gosiEnabled: boolean;
  businessType: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  originalCurrency: string;
  category: string;
  type: 'income' | 'expense';
  source: 'Bank' | 'Crypto' | 'POS' | 'Manual';
}

export interface CryptoAsset {
  symbol: string;
  name: string;
  balance: number;
  valueUsd: number;
  network: string;
}

export interface FeasibilityRequest {
  industry: string;
  capital: number;
  revenue: number;
  employees: number;
  description: string;
}

export interface SalaryRequest {
  jobTitle: string;
  experience: number;
  level: 'Junior' | 'Mid' | 'Senior' | 'Expert';
  age: number;
  country: string;
}

export interface CountryConfig {
  name: string;
  code: string;
  currency: string;
  languages: { code: string; name: string; nativeName: string }[];
  flag: string;
}

export interface TranslationDictionary {
  nav: {
    dashboard: string;
    transactions: string;
    hr: string;
    feasibility: string;
    crypto: string;
    audit: string;
    settings: string;
    disconnect: string;
    status: string;
  };
  dashboard: {
    title: string;
    totalRevenue: string;
    taxLiability: string;
    activeProjects: string;
    compliance: string;
    cashFlow: string;
    pendingOps: string;
    monthly: string;
    paymentPending: string;
    optimal: string;
    secure: string;
  };
  onboarding: {
    title: string;
    desc: string;
    loginBtn: string;
    loginTitle: string;
    backBtn: string;
    subTitle: string;
    subDesc: string;
    subBtn: string;
    perYear: string;
    securedBy: string;
    features: string[];
  };
}
