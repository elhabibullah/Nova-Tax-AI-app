import { GoogleGenAI } from "@google/genai";
import { UserProfile, Transaction, CryptoAsset, SalaryRequest, FeasibilityRequest, TranslationDictionary } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to format currency
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
};

// Helper to get full language name from code universally
const getLanguageName = (code: string) => {
    try {
        const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
        return displayNames.of(code) || 'English';
    } catch (e) {
        return 'English';
    }
};

export const parseReceiptImage = async (base64Image: string, country: string): Promise<any> => {
    const model = "gemini-2.5-flash"; // Supports vision
    const base64Data = base64Image.split(',')[1] || base64Image;
    const prompt = `You are an advanced AI Receipt Scanner for accounting in ${country}. Analyze this image of a receipt/invoice. Extract the following data in JSON format: { "merchant": "Name of store/vendor", "date": "YYYY-MM-DD", "total": Number, "tax": Number (if visible, else 0), "category": "One of: Goods, Services, Food, Travel, Office, Utilities" }. Rules: If date is missing, use today's date. If tax is not separated, estimate based on ${country} standard VAT if applicable, otherwise 0. Return ONLY raw JSON. No markdown formatting.`;
    try {
        const response = await ai.models.generateContent({ model, contents: { parts: [{ inlineData: { mimeType: 'image/jpeg', data: base64Data } }, { text: prompt }] } });
        const text = response.text?.trim() || "{}";
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) { console.error("Receipt Scan Error:", error); return null; }
};

export const runFullAudit = async (user: UserProfile, transactions: Transaction[]): Promise<string> => {
  const model = "gemini-2.5-flash"; 
  const langName = getLanguageName(user.language);
  const txSummary = transactions.map(t => `- ${t.date}: ${t.description} (${t.amount} ${t.originalCurrency}) [${t.category}]`).join('\n');
  const prompt = `You are an international accounting expert. Analyze financial data for user in ${user.country}. Profile: Annual Income: ${formatCurrency(user.annualIncome, user.baseCurrency)}, Zakat: ${user.zakatEnabled}. Transactions: ${txSummary}. Task: Analyze VAT/Tax compliance, Zakat, anomalies, recommendations. Write response in ${langName}. Format Markdown.`;
  try { const response = await ai.models.generateContent({ model, contents: prompt }); return response.text || "Audit failed."; } catch (error) { return "Failed to generate audit report."; }
};

export const estimateSalary = async (req: SalaryRequest, userCurrency: string, langCode: string): Promise<string> => {
  const model = "gemini-2.5-flash";
  const langName = getLanguageName(langCode);
  const prompt = `Global HR expert. Estimate salary in ${req.country}. Job: ${req.jobTitle}, Level: ${req.level}, Exp: ${req.experience} yrs. Provide Annual Gross (${userCurrency}), Deductions, Net Monthly, Market Comparison. Write in ${langName}. Format Markdown.`;
  try { const response = await ai.models.generateContent({ model, contents: prompt }); return response.text || "Salary estimation failed."; } catch (error) { return "Failed to generate salary estimate."; }
};

export const analyzeCryptoPortfolio = async (user: UserProfile, assets: CryptoAsset[]): Promise<string> => {
  const model = "gemini-2.5-flash";
  const langName = getLanguageName(user.language);
  const assetSummary = assets.map(a => `- ${a.name} (${a.symbol}): ${a.balance} coins`).join('\n');
  const prompt = `Expert crypto tax accounting. Country: ${user.country}. Portfolio: ${assetSummary}. Task: Summarize value, explain ${user.country} crypto tax rules, risks, strategies. Write in ${langName}. Markdown.`;
  try { const response = await ai.models.generateContent({ model, contents: prompt }); return response.text || "Crypto analysis failed."; } catch (error) { return "Failed to analyze crypto portfolio."; }
};

export const getFeasibilitySuggestion = async (question: string, allAnswers: Record<string, string>, langCode: string): Promise<string> => {
  const model = "gemini-2.5-flash";
  const langName = getLanguageName(langCode);
  const filledContext = Object.entries(allAnswers).filter(([_, val]) => val && val.length > 0).map(([key, val]) => `${key}: ${val}`).join('\n');
  const prompt = `Business consultant AI. Context: ${filledContext}. Answer specific question: "${question}". Concise, professional answer for form field. Write in ${langName}.`;
  try { const response = await ai.models.generateContent({ model, contents: prompt }); return response.text?.trim() || ""; } catch (error) { return ""; }
};

export const runFeasibilityStudy = async (req: FeasibilityRequest, user: UserProfile): Promise<string> => {
  const model = "gemini-3-pro-preview"; 
  const langName = getLanguageName(user.language);
  const userInputs = Object.entries(req).map(([key, value]) => `**${key}**: ${value}`).join('\n');
  const prompt = `Professional AI Business Consultant. GENERATE ENTIRE DOCUMENT IN ${langName}. Translate headers. User Answers: ${userInputs}. Generate Feasibility Study & Business Plan. Structure: Executive Summary, Feasibility (Market, Technical, Financial, Legal, Risk), Business Plan (Company, Product, Market, Ops, Financial, Growth). Markdown format.`;
  try { const response = await ai.models.generateContent({ model, contents: prompt, config: { thinkingConfig: { thinkingBudget: 4096 } } }); return response.text || "Feasibility study failed."; } catch (error) { return "Failed to generate study."; }
};

export const predictTaxRate = async (country: string, itemDescription: string, category: string): Promise<number> => {
  const model = "gemini-2.5-flash";
  const prompt = `Current VAT/Sales Tax rate (decimal) for "${itemDescription}" (Category: ${category}) in "${country}"? Return ONLY number (e.g. 0.20).`;
  try { const response = await ai.models.generateContent({ model, contents: prompt }); return parseFloat(response.text?.trim() || '0') || 0; } catch (error) { return 0; }
};

export const translateUIDictionary = async (baseDict: TranslationDictionary, targetLangCode: string): Promise<TranslationDictionary> => {
    const model = "gemini-2.5-flash";
    const langName = getLanguageName(targetLangCode);
    
    // Strengthened Prompt to avoid hallucinations (e.g., Spanish when Russian requested)
    const prompt = `
        You are a professional software localization expert.
        Translate the following JSON UI dictionary from English to ${langName} (${targetLangCode}).
        
        CRITICAL INSTRUCTIONS:
        1. Keep the exact same JSON structure and keys.
        2. Only translate the values (strings).
        3. Maintain professional financial/accounting terminology.
        4. Return ONLY valid JSON.
        5. STRICTLY translate to ${langName}. Do NOT use any other language.
        
        Source JSON:
        ${JSON.stringify(baseDict)}
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        
        const text = response.text?.trim() || "{}";
        return JSON.parse(text) as TranslationDictionary;
    } catch (error) {
        console.error("Translation Error:", error);
        return baseDict; // Fallback to English if fails
    }
};