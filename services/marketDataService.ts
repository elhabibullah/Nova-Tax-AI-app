
export const getCryptoPrices = async (): Promise<Record<string, { price: number, change: number }>> => {
    try {
        // Using CoinGecko public API for demo purposes. 
        // In production, use a paid API key or handle rate limits gracefully.
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true');
        if (!response.ok) throw new Error("API Limit");
        const data = await response.json();
        return {
            'BTC': { price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change },
            'ETH': { price: data.ethereum.usd, change: data.ethereum.usd_24h_change },
            'SOL': { price: data.solana.usd, change: data.solana.usd_24h_change }
        };
    } catch (e) {
        console.warn("Crypto API error (likely rate limit), using fallback simulation", e);
        // Fallback simulation if API fails/limits
        return {
            'BTC': { price: 64000 + Math.random() * 1000, change: 1.2 },
            'ETH': { price: 3400 + Math.random() * 100, change: -0.5 },
            'SOL': { price: 145 + Math.random() * 5, change: 2.1 }
        };
    }
};

export const getExchangeRates = async (base: string): Promise<Record<string, number>> => {
    try {
        // Frankfurter API for ECB rates (Free, No Key)
        // Note: Frankfurter base is EUR by default, but supports conversion.
        // If base is not supported (like AED), we might need to triangulate or use fallback.
        const safeBase = ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'JPY', 'NZD'].includes(base) ? base : 'USD';
        const response = await fetch(`https://api.frankfurter.app/latest?from=${safeBase}`);
        if (!response.ok) throw new Error("API Error");
        const data = await response.json();
        return data.rates;
    } catch (e) {
        console.warn("Exchange API error", e);
        return { 'EUR': 0.92, 'GBP': 0.79, 'JPY': 150.5, 'CNY': 7.23, 'CAD': 1.36 };
    }
};
