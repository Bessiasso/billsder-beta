import currencyFlag from "react-currency-flags";

export interface CurrencyData {
    code: string;
    symbol: string;
    name: string;
    flag?: string;
}

export const currencies: CurrencyData[] = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "$", name: "Canadian Dollar" },
    { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "SEK", symbol: "kr", name: "Swedish Krona" },
    { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
    { code: "MXN", symbol: "$", name: "Mexican Peso" },
    { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
    { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
    { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
    { code: "KRW", symbol: "₩", name: "South Korean Won" },
    { code: "TRY", symbol: "₺", name: "Turkish Lira" },
    { code: "RUB", symbol: "₽", name: "Russian Ruble" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "BRL", symbol: "R$", name: "Brazilian Real" },
    { code: "ZAR", symbol: "R", name: "South African Rand" },
    { code: "AED", symbol: "د.إ", name: "United Arab Emirates Dirham" },
    { code: "AFN", symbol: "؋", name: "Afghan Afghani" },
    { code: "XOF", symbol: "FCFA", name: "West African CFA Franc" },
    { code: "EGP", symbol: "E£", name: "Egyptian Pound" },
    { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
];

export function getCurrencySymbol(code: string): string {
    const currency = currencies.find((c) => c.code === code);
    return currency ? currency.symbol : "";
}

export function getCurrencyCodeFromSymbol(symbol: string): string {
    const currency = currencies.find((c) => c.symbol === symbol);
    return currency ? currency.code : "USD"; // Default to USD if not found
}
