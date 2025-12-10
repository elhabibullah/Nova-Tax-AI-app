
export interface UserProfile {
  id: string;
  name: string;
  position?: string; 
  email?: string;
  role?: string;
  country: string;
  baseCurrency: string;
  displayCurrency: string; 
  language: string;
  annualIncome: number;
  filingFrequency: 'Monthly' | 'Quarterly' | 'Annual';
  zakatEnabled: boolean;
  gosiEnabled: boolean;
  businessType: string;
  
  // Company Details
  companyName?: string;
  incorporationDate?: string; // New: Retroactive start date
  businessStructure?: string; 
  vatNumber?: string;
  companyNumber?: string;
  
  // Addresses
  addresses?: {
      business: string;
      private?: string;
      postal?: string;
      isPrivateSameAsBusiness?: boolean;
  };

  bankDetails?: {
    bankName: string;
    iban: string;
    accountHolder: string;
  };
  accountantAccess?: string[]; 
}

export interface InvoiceLineItem {
    id: string;
    description: string;
    category: 'Goods' | 'Services' | 'Food' | 'Digital' | 'Exempt';
    quantity: number;
    unitPrice: number;
    taxRate: number;
    total: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string; 
  amount: number;
  taxAmount?: number;
  originalCurrency: string;
  category: string; 
  type: 'income' | 'expense';
  source: 'Bank' | 'Crypto' | 'POS' | 'Manual';
  status: 'Paid' | 'Credit';
  classification: 'Business' | 'Private' | 'Mixed';
  items?: InvoiceLineItem[];
  invoiceNumber?: string;
}

export interface AccountItem {
  id: string;
  name: string;
  category: string; 
  balance: number;
  type: 'Dr' | 'Cr';
}

export interface PnLItem {
  id: string;
  name: string;
  amount: number;
  children?: PnLItem[];
}

export interface CryptoAsset {
  symbol: string;
  name: string;
  balance: number;
  valueUsd: number;
  network: string;
  change24h?: number; // Added for live simulation
}

export interface FeasibilityRequest {
  [key: string]: string;
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
    accounts: string; 
    reports: string;
    exchange: string; // New
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
    // Registration Fields
    regTitle: string;
    regDesc: string;
    incDate: string;
    busAddr: string;
    privAddr: string;
    postAddr: string;
    sameAddr: string;
    completeSetup: string;
  };
  accounting: {
    accountsTitle: string;
    pnlTitle: string;
    sales: string;
    cogs: string;
    grossProfit: string;
    expenses: string;
    netProfit: string;
    addExpense: string;
    credit: string;
    paid: string;
    newInvoice: string;
    newBill: string;
    customerVendor: string;
    date: string;
    classification: string;
    business: string;
    personal: string;
    addItem: string;
    subtotal: string;
    tax: string;
    total: string;
    save: string;
    scanReceipt: string;
    dropReceipt: string;
    scanning: string;
  };
  profile: {
    title: string;
    identityProfile: string; 
    fullName: string;
    companyDetails: string;
    companyName: string;
    businessStructure: string; 
    vatNumber: string;
    companyNumber: string;
    bankDetails: string;
    bankName: string;
    iban: string;
    accountHolder: string;
    accessManagement: string;
    inviteAccountant: string;
    save: string;
    position: string; 
    addresses: string;
    businessAddr: string;
    privateAddr: string;
    postalAddr: string;
    incDate: string;
    dangerZone: string;
    resetData: string;
    resetWarning: string;
    confirmReset: string;
    cancel: string;
  };
  feasibility: {
      title: string;
      subtitle: string;
      noticeTitle: string;
      noticeDesc: string;
      step: string;
      of: string;
      prev: string;
      next: string;
      generate: string;
      download: string;
      edit: string;
      aiAssist: string;
      reportReady: string;
      sections: {
          s1: string; s2: string; s3: string; s4: string; s5: string;
          s6: string; s7: string; s8: string; s9: string; s10: string;
      };
      questions: {
          q1: string; q2: string; q3: string; q4: string;
          q5: string; q6: string; q7: string; q8: string; q9: string;
          q10: string; q11: string; q12: string; q13: string;
          q14: string; q15: string; q16: string; q17: string;
          q18: string; q19: string; q20: string; q21: string; q22: string;
          q23: string; q24: string; q25: string; q26: string;
          q27: string; q28: string; q29: string; q30: string;
          q31: string; q32: string; q33: string; q34: string;
          q35: string; q36: string; q37: string;
      };
  };
  audit: {
      title: string;
      selectYear: string;
      generate: string;
      generating: string;
      download: string;
      email: string;
      certTitle: string;
      certDesc: string;
      certBtn: string;
  }
}
