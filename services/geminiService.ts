import { GoogleGenAI } from "@google/genai";
import { UserProfile, Transaction, CryptoAsset, SalaryRequest, FeasibilityRequest } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to format currency
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
};

export const runFullAudit = async (user: UserProfile, transactions: Transaction[]): Promise<string> => {
  const model = "gemini-2.5-flash"; 
  
  const txSummary = transactions.map(t => 
    `- ${t.date}: ${t.description} (${t.amount} ${t.originalCurrency}) [${t.category}]`
  ).join('\n');

  const prompt = `
    You are an international accounting and taxation expert (NovaTax AI).
    Analyze the following financial data for a user in ${user.country}.
    
    User Profile:
    - Annual Income: ${formatCurrency(user.annualIncome, user.baseCurrency)}
    - Zakat Enabled: ${user.zakatEnabled}
    - GOSI (Social Security) Enabled: ${user.gosiEnabled}
    - Filing Frequency: ${user.filingFrequency}
    
    Recent Transactions:
    ${txSummary}
    
    Task:
    1. Analyze VAT/Tax compliance based on ${user.country} rules.
    2. Calculate estimated Zakat (2.5%) if enabled.
    3. Check for anomalies in transactions.
    4. Provide financial health recommendations.
    
    Format the output in clear Markdown with headers, bullet points, and bold text for key figures.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Audit generation failed.";
  } catch (error) {
    console.error("Audit Error:", error);
    return "Failed to generate audit report. Please check your API key.";
  }
};

export const estimateSalary = async (req: SalaryRequest, userCurrency: string): Promise<string> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    You are a global HR and payroll expert. Estimate the salary for the following position in ${req.country}.
    
    Job Details:
    - Title: ${req.jobTitle}
    - Level: ${req.level}
    - Experience: ${req.experience} years
    - Age: ${req.age}
    
    Task:
    Provide a detailed salary breakdown including:
    1. Annual Gross Salary range (in ${userCurrency}).
    2. Estimated deductions (Income Tax, Social Security/GOSI).
    3. Net Monthly Salary.
    4. Market comparison (Low/Avg/High).
    
    Format as a professional Markdown summary.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Salary estimation failed.";
  } catch (error) {
    console.error("Salary Error:", error);
    return "Failed to generate salary estimate.";
  }
};

export const analyzeCryptoPortfolio = async (user: UserProfile, assets: CryptoAsset[]): Promise<string> => {
  const model = "gemini-2.5-flash"; // Flash is sufficient for portfolio summary

  const assetSummary = assets.map(a => 
    `- ${a.name} (${a.symbol}): ${a.balance} coins (~$${a.valueUsd.toLocaleString()} USD)`
  ).join('\n');

  const prompt = `
    You are an expert in international tax and crypto accounting.
    User Country: ${user.country}
    
    Portfolio:
    ${assetSummary}
    
    Task:
    1. Summarize total portfolio value.
    2. Explain general crypto tax rules for ${user.country} (e.g. Capital Gains Tax).
    3. Identify potential risks (volatility, concentration).
    4. Recommend tax saving strategies.
    
    Output in Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Crypto analysis failed.";
  } catch (error) {
    console.error("Crypto Error:", error);
    return "Failed to analyze crypto portfolio.";
  }
};

export const runFeasibilityStudy = async (req: FeasibilityRequest, user: UserProfile): Promise<string> => {
  // Use Pro model for complex reasoning and feasibility
  const model = "gemini-3-pro-preview"; 

  const prompt = `
    You are a global financial and feasibility expert. Conduct a feasibility study for a new project in ${user.country}.
    
    Project Details:
    - Industry: ${req.industry}
    - Capital Available: ${formatCurrency(req.capital, user.displayCurrency)}
    - Est. Annual Revenue: ${formatCurrency(req.revenue, user.displayCurrency)}
    - Headcount: ${req.employees} employees
    - Description: ${req.description}
    - Local Factors: Zakat (${user.zakatEnabled}), GOSI (${user.gosiEnabled})
    
    Task:
    1. Executive Summary.
    2. Financial Viability (ROI, Break-even analysis).
    3. Regulatory Checklist for ${user.country} (Licenses, Saudization/Localization if applicable).
    4. Risk Assessment (High/Medium/Low).
    5. Actionable Recommendations.
    
    Format using Markdown with clear sections.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 2048 } // Enable thinking for deeper analysis
      }
    });
    return response.text || "Feasibility study failed.";
  } catch (error) {
    console.error("Feasibility Error:", error);
    return "Failed to generate feasibility study.";
  }
};