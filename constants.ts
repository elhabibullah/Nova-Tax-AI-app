

import { UserProfile, Transaction, CryptoAsset, CountryConfig, TranslationDictionary } from './types';

// Supported Countries Configuration - Full Global List
export const COUNTRY_DATA: CountryConfig[] = []; 

// Comprehensive Global Mapping for the Scroll Wheel (195+ Countries) with MULTI-LANGUAGE Support
export const COUNTRY_TO_LANGUAGES: Record<string, { code: string; name: string; nativeName: string; flag?: string, currency?: string }[]> = {
    'Afghanistan': [{ code: 'ps', name: 'Pashto', nativeName: 'پښتو', flag: '🇦🇫', currency: 'AFN' }],
    'Albania': [{ code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱', currency: 'ALL' }],
    'Algeria': [
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇩🇿', currency: 'DZD' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'DZD' }
    ],
    'Andorra': [{ code: 'ca', name: 'Catalan', nativeName: 'Català', flag: '🇦🇩', currency: 'EUR' }],
    'Angola': [{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇦🇴', currency: 'AOA' }],
    'Antigua and Barbuda': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇦🇬', currency: 'XCD' }],
    'Argentina': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇦🇷', currency: 'ARS' }],
    'Armenia': [{ code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', flag: '🇦🇲', currency: 'AMD' }],
    'Australia': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇦🇺', currency: 'AUD' }],
    'Austria': [{ code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇦🇹', currency: 'EUR' }],
    'Azerbaijan': [{ code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿', currency: 'AZN' }],
    'Bahamas': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇧🇸', currency: 'BSD' }],
    'Bahrain': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇧🇭', currency: 'BHD' }],
    'Bangladesh': [{ code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', currency: 'BDT' }],
    'Barbados': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇧🇧', currency: 'BBD' }],
    'Belarus': [{ code: 'be', name: 'Belarusian', nativeName: 'Беларуская', flag: '🇧🇾', currency: 'BYN' }],
    'Belgium': [
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇧🇪', currency: 'EUR' }, 
        { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇧🇪', currency: 'EUR' },
        { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇧🇪', currency: 'EUR' }
    ],
    'Belize': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇧🇿', currency: 'BZD' }],
    'Benin': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇧🇯', currency: 'XOF' }],
    'Bhutan': [{ code: 'dz', name: 'Dzongkha', nativeName: 'རྫོང་ཁ', flag: '🇧🇹', currency: 'BTN' }],
    'Bolivia': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇧🇴', currency: 'BOB' }],
    'Bosnia and Herzegovina': [{ code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦', currency: 'BAM' }],
    'Botswana': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇧🇼', currency: 'BWP' }],
    'Brazil': [{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', currency: 'BRL' }],
    'Brunei': [{ code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇧🇳', currency: 'BND' }],
    'Bulgaria': [{ code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', currency: 'BGN' }],
    'Burkina Faso': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇧🇫', currency: 'XOF' }],
    'Burundi': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇧🇮', currency: 'BIF' }],
    'Cabo Verde': [{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇨🇻', currency: 'CVE' }],
    'Cambodia': [{ code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', flag: '🇰🇭', currency: 'KHR' }],
    'Cameroon': [
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'XAF' },
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', currency: 'XAF' }
    ],
    'Canada': [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇨🇦', currency: 'CAD' }, 
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'CAD' }
    ],
    'Central African Republic': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇨🇫', currency: 'XAF' }],
    'Chad': [
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'XAF' },
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', currency: 'XAF' }
    ],
    'Chile': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇨🇱', currency: 'CLP' }],
    'China': [{ code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', currency: 'CNY' }],
    'Colombia': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇨🇴', currency: 'COP' }],
    'Comoros': [
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇰🇲', currency: 'KMF' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'KMF' }
    ],
    'Congo (DRC)': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇨🇩', currency: 'CDF' }],
    'Congo (Republic)': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇨🇬', currency: 'XAF' }],
    'Costa Rica': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇨🇷', currency: 'CRC' }],
    'Croatia': [{ code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', currency: 'EUR' }],
    'Cuba': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇨🇺', currency: 'CUP' }],
    'Cyprus': [
        { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇨🇾', currency: 'EUR' },
        { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', currency: 'EUR' }
    ],
    'Czech Republic': [{ code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', currency: 'CZK' }],
    'Denmark': [{ code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', currency: 'DKK' }],
    'Djibouti': [
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'DJF' },
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇩🇯', currency: 'DJF' }
    ],
    'Dominica': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇩🇲', currency: 'XCD' }],
    'Dominican Republic': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇩🇴', currency: 'DOP' }],
    'East Timor': [{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇹🇱', currency: 'USD' }],
    'Ecuador': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇨', currency: 'USD' }],
    'Egypt': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇪🇬', currency: 'EGP' }],
    'El Salvador': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇸🇻', currency: 'USD' }],
    'Equatorial Guinea': [
        { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇬🇶', currency: 'XAF' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'XAF' }
    ],
    'Eritrea': [{ code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', flag: '🇪🇷', currency: 'ERN' }],
    'Estonia': [{ code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪', currency: 'EUR' }],
    'Eswatini': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇸🇿', currency: 'SZL' }],
    'Ethiopia': [{ code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', currency: 'ETB' }],
    'Fiji': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇫🇯', currency: 'FJD' }],
    'Finland': [{ code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', currency: 'EUR' }],
    'France': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'EUR' }],
    'Gabon': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇬🇦', currency: 'XAF' }],
    'Gambia': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇲', currency: 'GMD' }],
    'Georgia': [{ code: 'ka', name: 'Georgian', nativeName: 'ქართული', flag: '🇬🇪', currency: 'GEL' }],
    'Germany': [{ code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', currency: 'EUR' }],
    'Ghana': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇭', currency: 'GHS' }],
    'Greece': [{ code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', currency: 'EUR' }],
    'Grenada': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇩', currency: 'XCD' }],
    'Guatemala': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇬🇹', currency: 'GTQ' }],
    'Guinea': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇬🇳', currency: 'GNF' }],
    'Guinea-Bissau': [{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇬🇼', currency: 'XOF' }],
    'Guyana': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇾', currency: 'GYD' }],
    'Haiti': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇭🇹', currency: 'HTG' }],
    'Honduras': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇭🇳', currency: 'HNL' }],
    'Hong Kong': [{ code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇭🇰', currency: 'HKD' }, { code: 'en', name: 'English', nativeName: 'English', flag: '🇭🇰', currency: 'HKD' }],
    'Hungary': [{ code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', currency: 'HUF' }],
    'Iceland': [{ code: 'is', name: 'Icelandic', nativeName: 'Íslenska', flag: '🇮🇸', currency: 'ISK' }],
    'India': [{ code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', currency: 'INR' }, { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', currency: 'INR' }],
    'Indonesia': [{ code: 'id', name: 'Indonesian', nativeName: 'Bahasa', flag: '🇮🇩', currency: 'IDR' }],
    'Iran': [{ code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', currency: 'IRR' }],
    'Iraq': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇮🇶', currency: 'IQD' }],
    'Ireland': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇪', currency: 'EUR' }],
    'Israel': [{ code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', currency: 'ILS' }],
    'Italy': [{ code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', currency: 'EUR' }],
    'Ivory Coast': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇨🇮', currency: 'XOF' }],
    'Jamaica': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇯🇲', currency: 'JMD' }],
    'Japan': [{ code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', currency: 'JPY' }],
    'Jordan': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇯🇴', currency: 'JOD' }],
    'Kazakhstan': [
        { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ', flag: '🇰🇿', currency: 'KZT' },
        { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', currency: 'KZT' }
    ],
    'Kenya': [
        { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', currency: 'KES' },
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', currency: 'KES' }
    ],
    'Kiribati': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇰🇮', currency: 'AUD' }],
    'Kuwait': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇰🇼', currency: 'KWD' }],
    'Kyrgyzstan': [{ code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча', flag: '🇰🇬', currency: 'KGS' }],
    'Laos': [{ code: 'lo', name: 'Lao', nativeName: 'ລາວ', flag: '🇱🇦', currency: 'LAK' }],
    'Latvia': [{ code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻', currency: 'EUR' }],
    'Lebanon': [
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇱🇧', currency: 'LBP' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'LBP' }
    ],
    'Lesotho': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇱🇸', currency: 'LSL' }],
    'Liberia': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇱🇷', currency: 'LRD' }],
    'Libya': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇱🇾', currency: 'LYD' }],
    'Liechtenstein': [{ code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇱🇮', currency: 'CHF' }],
    'Lithuania': [{ code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹', currency: 'EUR' }],
    'Luxembourg': [
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇱🇺', currency: 'EUR' },
        { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', currency: 'EUR' }
    ],
    'Madagascar': [
        { code: 'mg', name: 'Malagasy', nativeName: 'Malagasy', flag: '🇲🇬', currency: 'MGA' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'MGA' }
    ],
    'Malawi': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇲🇼', currency: 'MWK' }],
    'Malaysia': [{ code: 'ms', name: 'Malay', nativeName: 'Bahasa', flag: '🇲🇾', currency: 'MYR' }],
    'Maldives': [{ code: 'dv', name: 'Divehi', nativeName: 'ދިވެހި', flag: '🇲🇻', currency: 'MVR' }],
    'Mali': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇲🇱', currency: 'XOF' }],
    'Malta': [{ code: 'mt', name: 'Maltese', nativeName: 'Malti', flag: '🇲🇹', currency: 'EUR' }],
    'Marshall Islands': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇲🇭', currency: 'USD' }],
    'Mauritania': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇲🇷', currency: 'MRU' }],
    'Mauritius': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇲🇺', currency: 'MUR' }],
    'Mexico': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇲🇽', currency: 'MXN' }],
    'Micronesia': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇫🇲', currency: 'USD' }],
    'Moldova': [{ code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇲🇩', currency: 'MDL' }],
    'Monaco': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇲🇨', currency: 'EUR' }],
    'Mongolia': [{ code: 'mn', name: 'Mongolian', nativeName: 'Монгол', flag: '🇲🇳', currency: 'MNT' }],
    'Montenegro': [{ code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇲🇪', currency: 'EUR' }],
    'Morocco': [
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇲🇦', currency: 'MAD' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'MAD' }
    ],
    'Mozambique': [{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇲🇿', currency: 'MZN' }],
    'Myanmar': [{ code: 'my', name: 'Burmese', nativeName: 'မြန်မာစာ', flag: '🇲🇲', currency: 'MMK' }],
    'Namibia': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇳🇦', currency: 'NAD' }],
    'Nauru': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇳🇷', currency: 'AUD' }],
    'Nepal': [{ code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', currency: 'NPR' }],
    'Netherlands': [{ code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', currency: 'EUR' }],
    'New Zealand': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇳🇿', currency: 'NZD' }],
    'Nicaragua': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇳🇮', currency: 'NIO' }],
    'Niger': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇳🇪', currency: 'XOF' }],
    'Nigeria': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇳🇬', currency: 'NGN' }],
    'North Macedonia': [{ code: 'mk', name: 'Macedonian', nativeName: 'Македонски', flag: '🇲🇰', currency: 'MKD' }],
    'Norway': [{ code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', currency: 'NOK' }],
    'Oman': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇴🇲', currency: 'OMR' }],
    'Pakistan': [
        { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', currency: 'PKR' },
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', currency: 'PKR' }
    ],
    'Palau': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇵🇼', currency: 'USD' }],
    'Palestine': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇵🇸', currency: 'ILS' }],
    'Panama': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇵🇦', currency: 'PAB' }],
    'Papua New Guinea': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇵🇬', currency: 'PGK' }],
    'Paraguay': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇵🇾', currency: 'PYG' }],
    'Peru': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇵🇪', currency: 'PEN' }],
    'Philippines': [
        { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭', currency: 'PHP' },
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', currency: 'PHP' }
    ],
    'Poland': [{ code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', currency: 'PLN' }],
    'Portugal': [{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', currency: 'EUR' }],
    'Qatar': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇶🇦', currency: 'QAR' }],
    'Romania': [{ code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', currency: 'RON' }],
    'Russia': [{ code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', currency: 'RUB' }],
    'Rwanda': [
        { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda', flag: '🇷🇼', currency: 'RWF' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'RWF' },
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', currency: 'RWF' }
    ],
    'Saint Kitts and Nevis': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇰🇳', currency: 'XCD' }],
    'Saint Lucia': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇱🇨', currency: 'XCD' }],
    'Saint Vincent and the Grenadines': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇻🇨', currency: 'XCD' }],
    'Samoa': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇼🇸', currency: 'WST' }],
    'San Marino': [{ code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇸🇲', currency: 'EUR' }],
    'Sao Tome and Principe': [{ code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇸🇹', currency: 'STN' }],
    'Saudi Arabia': [
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', currency: 'SAR' }, 
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', currency: 'SAR' }
    ],
    'Senegal': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇸🇳', currency: 'XOF' }],
    'Serbia': [{ code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', currency: 'RSD' }],
    'Seychelles': [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇸🇨', currency: 'SCR' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'SCR' }
    ],
    'Sierra Leone': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇸🇱', currency: 'SLL' }],
    'Singapore': [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇸🇬', currency: 'SGD' },
        { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', currency: 'SGD' },
        { code: 'ms', name: 'Malay', nativeName: 'Bahasa', flag: '🇲🇾', currency: 'SGD' }
    ],
    'Slovakia': [{ code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', currency: 'EUR' }],
    'Slovenia': [{ code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', currency: 'EUR' }],
    'Solomon Islands': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇸🇧', currency: 'SBD' }],
    'Somalia': [{ code: 'so', name: 'Somali', nativeName: 'Soomaaliga', flag: '🇸🇴', currency: 'SOS' }],
    'South Africa': [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇿🇦', currency: 'ZAR' },
        { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦', currency: 'ZAR' }
    ],
    'South Korea': [{ code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', currency: 'KRW' }],
    'South Sudan': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇸🇸', currency: 'SSP' }],
    'Spain': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', currency: 'EUR' }],
    'Sri Lanka': [
        { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰', currency: 'LKR' },
        { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇱🇰', currency: 'LKR' }
    ],
    'Sudan': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇩', currency: 'SDG' }],
    'Suriname': [{ code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇸🇷', currency: 'SRD' }],
    'Sweden': [{ code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', currency: 'SEK' }],
    'Switzerland': [
        { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇨🇭', currency: 'CHF' }, 
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇨🇭', currency: 'CHF' },
        { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇨🇭', currency: 'CHF' }
    ],
    'Syria': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇾', currency: 'SYP' }],
    'Taiwan': [{ code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇹🇼', currency: 'TWD' }],
    'Tajikistan': [{ code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ', flag: '🇹🇯', currency: 'TJS' }],
    'Tanzania': [
        { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿', currency: 'TZS' },
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', currency: 'TZS' }
    ],
    'Thailand': [{ code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', currency: 'THB' }],
    'Togo': [{ code: 'fr', name: 'French', nativeName: 'Français', flag: '🇹🇬', currency: 'XOF' }],
    'Tonga': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇹🇴', currency: 'TOP' }],
    'Trinidad and Tobago': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇹🇹', currency: 'TTD' }],
    'Tunisia': [
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇹🇳', currency: 'TND' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', currency: 'TND' }
    ],
    'Turkey': [{ code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', currency: 'TRY' }],
    'Turkmenistan': [{ code: 'tk', name: 'Turkmen', nativeName: 'Türkmençe', flag: '🇹🇲', currency: 'TMT' }],
    'Tuvalu': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇹🇻', currency: 'AUD' }],
    'Uganda': [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇬', currency: 'UGX' },
        { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿', currency: 'UGX' }
    ],
    'Ukraine': [{ code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', currency: 'UAH' }],
    'United Arab Emirates': [
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪', currency: 'AED' }, 
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', currency: 'AED' }
    ],
    'United Kingdom': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', currency: 'GBP' }],
    'United States': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', currency: 'USD' }],
    'Uruguay': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇺🇾', currency: 'UYU' }],
    'Uzbekistan': [{ code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', flag: '🇺🇿', currency: 'UZS' }],
    'Vanuatu': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇻🇺', currency: 'VUV' }],
    'Vatican City': [{ code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇻🇦', currency: 'EUR' }],
    'Venezuela': [{ code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇻🇪', currency: 'VES' }],
    'Vietnam': [{ code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', currency: 'VND' }],
    'Yemen': [{ code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇾🇪', currency: 'YER' }],
    'Zambia': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇿🇲', currency: 'ZMW' }],
    'Zimbabwe': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇿🇼', currency: 'ZWL' }],
    'Default': [{ code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', currency: 'USD' }]
};

export const UI_TRANSLATIONS: Record<string, TranslationDictionary> = {
  'en': {
    nav: {
      dashboard: 'Dashboard', transactions: 'Transactions', hr: 'HR & Salaries', feasibility: 'Feasibility', crypto: 'Crypto Assets', audit: 'AI Audit', settings: 'Settings', disconnect: 'Disconnect', status: 'STATUS'
    },
    dashboard: {
      title: 'Dashboard', totalRevenue: 'Total Revenue', taxLiability: 'Tax Liability', activeProjects: 'Active Projects', compliance: 'Compliance', cashFlow: 'Cash Flow Protocol', pendingOps: 'Pending Operations', monthly: 'MONTHLY', paymentPending: 'PAYMENT PENDING', optimal: 'OPTIMAL', secure: 'SECURE'
    },
    onboarding: {
      title: 'NovaTax AI', 
      desc: 'NovaTax AI is an advanced, AI-driven global accounting and HR platform designed to automate financial management for individuals and businesses without the need for a human accountant. The system integrates international tax rules, crypto management, audit capabilities, feasibility studies, salary calculations, and localized regulations, adapting automatically to each user’s country, income, and reporting frequency.',
      loginBtn: 'Login to Protocol', loginTitle: 'Terminal Authentication', backBtn: 'Back', subTitle: 'Entity Registration', subDesc: 'Full Protocol Access License', subBtn: 'Initialize Subscription', perYear: 'Per Year', securedBy: 'Secured by NovaTax Decentralized Protocol v2.5',
      features: ['Global Tax Compliance Engine', 'Real-time Zakat & GOSI Auto-calc', 'Crypto Portfolio Audit & Tax', 'AI Feasibility Study Generator', 'HR & Payroll Auto-Pilot', 'Multi-Jurisdiction Filing', 'Audit Risk Detection', 'Secure Decentralized Storage']
    }
  },
  'ar': {
    nav: {
      dashboard: 'لوحة القيادة', transactions: 'المعاملات', hr: 'الموارد البشرية', feasibility: 'دراسات الجدوى', crypto: 'الأصول الرقمية', audit: 'التدقيق الذكي', settings: 'الإعدادات', disconnect: 'خروج', status: 'الحالة'
    },
    dashboard: {
      title: 'لوحة القيادة', totalRevenue: 'إجمالي الإيرادات', taxLiability: 'الالتزام الضريبي', activeProjects: 'المشاريع النشطة', compliance: 'الامتثال', cashFlow: 'بروتوكول التدفق النقدي', pendingOps: 'عمليات معلقة', monthly: 'شهرياً', paymentPending: 'بانتظار الدفع', optimal: 'مثالي', secure: 'آمن'
    },
    onboarding: {
      title: 'نوفاتاكس AI', 
      desc: 'NovaTax AI هي منصة محاسبة وموارد بشرية عالمية متقدمة تعتمد على الذكاء الاصطناعي، مصممة لأتمتة الإدارة المالية للأفراد والشركات دون الحاجة إلى محاسب بشري. يدمج النظام قواعد الضرائب الدولية، وإدارة العملات المشفرة، وقدرات التدقيق، ودراسات الجدوى، وحسابات الرواتب، واللوائح المحلية، حيث يتكيف تلقائيًا مع بلد كل مستخدم، ودخله، وتواتر التقارير.',
      loginBtn: 'تسجيل الدخول', loginTitle: 'محطة المصادقة', backBtn: 'رجوع', subTitle: 'تسجيل المنشأة', subDesc: 'ترخيص الوصول الكامل', subBtn: 'بدء الاشتراك', perYear: 'سنوياً', securedBy: 'مؤمن بواسطة بروتوكول نوفاتاكس اللامركزي v2.5',
      features: ['محرك الامتثال الضريبي العالمي', 'حساب تلقائي للزكاة والتأمينات', 'تدقيق ضرائب العملات الرقمية', 'مولد دراسات الجدوى بالذكاء الاصطناعي', 'إدارة الموارد البشرية والرواتب', 'إيداع متعدد الولايات القضائية', 'كشف مخاطر التدقيق', 'تخزين لامركزي آمن']
    }
  },
  'fr': {
    nav: {
      dashboard: 'Tableau de Bord', transactions: 'Transactions', hr: 'RH & Salaires', feasibility: 'Faisabilité', crypto: 'Crypto Actifs', audit: 'Audit IA', settings: 'Paramètres', disconnect: 'Déconnexion', status: 'STATUT'
    },
    dashboard: {
      title: 'Tableau de Bord', totalRevenue: 'Revenu Total', taxLiability: 'Passif Fiscal', activeProjects: 'Projets Actifs', compliance: 'Conformité', cashFlow: 'Flux de Trésorerie', pendingOps: 'Opérations en Attente', monthly: 'MENSUEL', paymentPending: 'PAIEMENT EN ATTENTE', optimal: 'OPTIMAL', secure: 'SÉCURISÉ'
    },
    onboarding: {
      title: 'NovaTax AI', 
      desc: 'NovaTax AI est une plateforme mondiale avancée de comptabilité et de RH pilotée par l\'IA, conçue pour automatiser la gestion financière des particuliers et des entreprises sans avoir besoin d\'un comptable humain. Le système intègre les règles fiscales internationales, la gestion des cryptomonnaies, les capacités d\'audit, les études de faisabilité, les calculs de salaire et les réglementations locales, s\'adaptant automatiquement au pays, aux revenus et à la fréquence de déclaration de chaque utilisateur.',
      loginBtn: 'Connexion au Protocole', loginTitle: 'Authentification Terminal', backBtn: 'Retour', subTitle: 'Enregistrement Entité', subDesc: 'Licence d\'Accès Complet', subBtn: 'Initialiser l\'Abonnement', perYear: 'Par An', securedBy: 'Sécurisé par Protocole Décentralisé NovaTax v2.5',
      features: ['Moteur de Conformité Fiscale', 'Calcul Auto Zakat & GOSI', 'Audit Portefeuille Crypto', 'Générateur d\'Études de Faisabilité', 'Gestion RH & Paie Auto', 'Déclaration Multi-Juridiction', 'Détection des Risques d\'Audit', 'Stockage Décentralisé Sécurisé']
    }
  },
  'de': {
    nav: {
      dashboard: 'Dashboard', transactions: 'Transaktionen', hr: 'HR & Gehälter', feasibility: 'Machbarkeit', crypto: 'Krypto-Assets', audit: 'KI-Audit', settings: 'Einstellungen', disconnect: 'Trennen', status: 'STATUS'
    },
    dashboard: {
      title: 'Dashboard', totalRevenue: 'Gesamtumsatz', taxLiability: 'Steuerschuld', activeProjects: 'Aktive Projekte', compliance: 'Compliance', cashFlow: 'Cashflow-Protokoll', pendingOps: 'Ausstehende Ops', monthly: 'MONATLICH', paymentPending: 'ZAHLUNG AUSSTEHEND', optimal: 'OPTIMAL', secure: 'SICHER'
    },
    onboarding: {
      title: 'NovaTax AI', 
      desc: 'NovaTax AI ist eine fortschrittliche, KI-gesteuerte globale Buchhaltungs- und HR-Plattform, die entwickelt wurde, um das Finanzmanagement für Einzelpersonen und Unternehmen zu automatisieren, ohne dass ein menschlicher Buchhalter erforderlich ist. Das System integriert internationale Steuerregeln, Krypto-Management, Audit-Funktionen, Machbarkeitsstudien, Gehaltsberechnungen und lokale Vorschriften und passt sich automatisch an das Land, das Einkommen und die Meldehäufigkeit jedes Benutzers an.',
      loginBtn: 'Anmelden', loginTitle: 'Terminal-Authentifizierung', backBtn: 'Zurück', subTitle: 'Entitätsregistrierung', subDesc: 'Volle Protokolllizenz', subBtn: 'Abonnement Starten', perYear: 'Pro Jahr', securedBy: 'Gesichert durch NovaTax Dezentrales Protokoll v2.5',
      features: ['Globaler Steuer-Compliance-Motor', 'Echtzeit Zakat & GOSI Auto-Calc', 'Krypto-Portfolio Audit & Steuer', 'KI-Machbarkeitsstudien-Generator', 'HR & Lohnbuchhaltung Auto-Pilot', 'Multi-Jurisdiktions-Einreichung', 'Audit-Risikoerkennung', 'Sicherer Dezentraler Speicher']
    }
  },
  'es': {
    nav: {
      dashboard: 'Tablero', transactions: 'Transacciones', hr: 'RRHH y Salarios', feasibility: 'Viabilidad', crypto: 'Criptoactivos', audit: 'Auditoría IA', settings: 'Ajustes', disconnect: 'Desconectar', status: 'ESTADO'
    },
    dashboard: {
      title: 'Tablero', totalRevenue: 'Ingresos Totales', taxLiability: 'Responsabilidad Fiscal', activeProjects: 'Proyectos Activos', compliance: 'Cumplimiento', cashFlow: 'Flujo de Caja', pendingOps: 'Operaciones Pendientes', monthly: 'MENSUAL', paymentPending: 'PAGO PENDIENTE', optimal: 'ÓPTIMO', secure: 'SEGURO'
    },
    onboarding: {
      title: 'NovaTax AI', 
      desc: 'NovaTax AI es una plataforma global avanzada de contabilidad y recursos humanos impulsada por IA, diseñada para automatizar la gestión financiera de individuos y empresas sin necesidad de un contador humano. El sistema integra reglas fiscales internacionales, gestión de criptomonedas, capacidades de auditoría, estudios de viabilidad, cálculos salariales y regulaciones locales, adaptándose automáticamente al país, ingresos y frecuencia de informes de cada usuario.',
      loginBtn: 'Iniciar Sesión', loginTitle: 'Autenticación de Terminal', backBtn: 'Atrás', subTitle: 'Registro de Entidad', subDesc: 'Licencia de Acceso Completo', subBtn: 'Iniciar Suscripción', perYear: 'Por Año', securedBy: 'Asegurado por Protocolo Descentralizado NovaTax v2.5',
      features: ['Motor de Cumplimiento Fiscal', 'Cálculo Auto de Zakat y GOSI', 'Auditoría de Cripto y Impuestos', 'Generador de Viabilidad con IA', 'Piloto Automático de RRHH', 'Presentación Multi-Jurisdicción', 'Detección de Riesgos', 'Almacenamiento Descentralizado']
    }
  },
   'pt': {
    nav: {
      dashboard: 'Painel', transactions: 'Transações', hr: 'RH & Salários', feasibility: 'Viabilidade', crypto: 'Criptoativos', audit: 'Auditoria IA', settings: 'Configurações', disconnect: 'Desconectar', status: 'STATUS'
    },
    dashboard: {
      title: 'Painel', totalRevenue: 'Receita Total', taxLiability: 'Passivo Fiscal', activeProjects: 'Projetos Ativos', compliance: 'Conformidade', cashFlow: 'Fluxo de Caixa', pendingOps: 'Operações Pendentes', monthly: 'MENSAL', paymentPending: 'PAGAMENTO PENDENTE', optimal: 'ÓTIMO', secure: 'SEGURO'
    },
    onboarding: {
      title: 'NovaTax AI', 
      desc: 'NovaTax AI é uma plataforma global avançada de contabilidade e RH impulsionada por IA, projetada para automatizar a gestão financeira de indivíduos e empresas sem a necessidade de um contador humano. O sistema integra regras fiscais internacionais, gestão de criptomoedas, capacidades de auditoria, estudos de viabilidade, cálculos salariais e regulamentações locais, adaptando-se automaticamente ao país, renda e frequência de relatórios de cada usuário.',
      loginBtn: 'Entrar no Protocolo', loginTitle: 'Autenticação do Terminal', backBtn: 'Voltar', subTitle: 'Registro de Entidade', subDesc: 'Licença de Acesso Completo', subBtn: 'Iniciar Assinatura', perYear: 'Por Ano', securedBy: 'Seguro pelo Protocolo Descentralizado NovaTax v2.5',
      features: ['Motor de Conformidade Fiscal', 'Cálculo Auto Zakat & GOSI', 'Auditoria de Cripto e Impostos', 'Gerador de Estudo de Viabilidade', 'Piloto Automático de RH', 'Arquivamento Multi-Jurisdição', 'Detecção de Risco de Auditoria', 'Armazenamento Descentralizado']
    }
  },
  'zh': {
    nav: {
      dashboard: '仪表板', transactions: '交易', hr: '人力资源与薪资', feasibility: '可行性', crypto: '加密资产', audit: 'AI审计', settings: '设置', disconnect: '断开连接', status: '状态'
    },
    dashboard: {
      title: '仪表板', totalRevenue: '总收入', taxLiability: '纳税义务', activeProjects: '活跃项目', compliance: '合规性', cashFlow: '现金流协议', pendingOps: '待处理操作', monthly: '每月', paymentPending: '待付款', optimal: '最佳', secure: '安全'
    },
    onboarding: {
      title: 'NovaTax AI', 
      desc: 'NovaTax AI 是一个先进的、由人工智能驱动的全球会计和人力资源平台，旨在为个人和企业自动化财务管理，无需人工会计师。该系统集成了国际税收规则、加密管理、审计功能、可行性研究、薪资计算和本地化法规，自动适应每个用户的国家、收入和报告频率。',
      loginBtn: '登录协议', loginTitle: '终端认证', backBtn: '返回', subTitle: '实体注册', subDesc: '完全访问许可', subBtn: '初始化订阅', perYear: '每年', securedBy: '由 NovaTax 去中心化协议 v2.5 保护',
      features: ['全球税务合规引擎', '实时天课和社保自动计算', '加密投资组合审计与税务', 'AI可行性研究生成器', '人力资源与薪资自动驾驶', '多司法管辖区申报', '审计风险检测', '安全去中心化存储']
    }
  }
};

// Mock Exchange Rates (Base: USD)
export const EXCHANGE_RATES: Record<string, number> = {
  'USD': 1, 'EUR': 0.92, 'GBP': 0.79, 'SAR': 3.75, 'AED': 3.67, 'JPY': 155.0, 'CAD': 1.36, 'AUD': 1.52,
  'INR': 83.5, 'CNY': 7.23, 'BRL': 5.15, 'MXN': 16.9, 'RUB': 92.5, 'KRW': 1350, 'TRY': 32.2, 'CHF': 0.91,
  'SEK': 10.8, 'SGD': 1.35, 'HKD': 7.82, 'NZD': 1.66, 'QAR': 3.64, 'KWD': 0.31, 'ARS': 880, 'PLN': 3.96,
  'DKK': 6.9, 'NOK': 10.9, 'EGP': 47.5, 'IDR': 16000, 'MYR': 4.75, 'THB': 36.8, 'ZAR': 18.5,
  'AFN': 70, 'ALL': 95, 'DZD': 134, 'AOA': 830, 'AMD': 387, 'AZN': 1.7, 'BSD': 1, 'BHD': 0.37, 'BDT': 110,
  'BBD': 2, 'BYN': 3.2, 'BZD': 2, 'XOF': 605, 'BTN': 83, 'BOB': 6.9, 'BAM': 1.8, 'BWP': 13.5, 'BND': 1.35,
  'BGN': 1.8, 'BIF': 2850, 'CVE': 102, 'KHR': 4000, 'XAF': 605, 'CLP': 950, 'COP': 3800, 'KMF': 455,
  'CDF': 2750, 'CRC': 500, 'CUP': 24, 'CZK': 23, 'DJF': 177, 'XCD': 2.7, 'DOP': 58, 'ERN': 15, 'SZL': 18,
  'ETB': 56, 'FJD': 2.2, 'GMD': 68, 'GEL': 2.6, 'GHS': 13, 'GTQ': 7.7, 'GNF': 8600, 'GYD': 209, 'HTG': 132,
  'HNL': 24, 'HUF': 360, 'ISK': 138, 'IRR': 42000, 'IQD': 1300, 'ILS': 3.7, 'JMD': 155, 'JOD': 0.7, 'KZT': 445,
  'KES': 130, 'KGS': 89, 'LAK': 21000, 'LBP': 89000, 'LSL': 18, 'LRD': 190, 'LYD': 4.8, 'MGA': 4500, 'MWK': 1700,
  'MVR': 15, 'MTL': 0.4, 'MRU': 39, 'MUR': 46, 'MDL': 17, 'MNT': 3400, 'MAD': 10, 'MZN': 63, 'MMK': 2100,
  'NAD': 18, 'NPR': 133, 'NIO': 36, 'NGN': 1300, 'MKD': 57, 'OMR': 0.38, 'PKR': 278, 'PAB': 1, 'PGK': 3.8,
  'PYG': 7400, 'PEN': 3.7, 'PHP': 57, 'RON': 4.6, 'RWF': 1290, 'WST': 2.7, 'STN': 22, 'SCR': 13, 'SLL': 22000,
  'SOS': 570, 'SSP': 130, 'LKR': 300, 'SDG': 600, 'SRD': 34, 'SYP': 13000, 'TWD': 32, 'TJS': 10, 'TZS': 2500,
  'TOP': 2.3, 'TTD': 6.7, 'TND': 3.1, 'TMT': 3.5, 'UGX': 3800, 'UAH': 39, 'UYU': 38, 'UZS': 12600, 'VUV': 120,
  'VES': 36, 'VND': 25000, 'YER': 250, 'ZMW': 26, 'ZWL': 13
};

export const MOCK_USER: UserProfile = {
  id: 'u_001',
  name: 'Amira Al-Fayed',
  country: 'Saudi Arabia',
  baseCurrency: 'SAR',
  displayCurrency: 'SAR',
  language: 'en',
  annualIncome: 450000,
  filingFrequency: 'Quarterly',
  zakatEnabled: true,
  gosiEnabled: true,
  businessType: 'Tech Startup',
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-05-15', description: 'AWS Service Bill', amount: 320, originalCurrency: 'USD', category: 'Software', type: 'expense', source: 'Bank' },
  { id: 't2', date: '2024-05-18', description: 'Client Payment - Project X', amount: 15000, originalCurrency: 'SAR', category: 'Revenue', type: 'income', source: 'Bank' },
  { id: 't3', date: '2024-05-20', description: 'Office Equipment', amount: 3500, originalCurrency: 'SAR', category: 'Assets', type: 'expense', source: 'POS' },
  { id: 't4', date: '2024-05-22', description: 'Consulting Fee', amount: 5000, originalCurrency: 'USDT', category: 'Revenue', type: 'income', source: 'Crypto' },
  { id: 't5', date: '2024-05-25', description: 'Freelancer Payout', amount: 2000, originalCurrency: 'SAR', category: 'Salaries', type: 'expense', source: 'Bank' },
];

export const MOCK_CRYPTO: CryptoAsset[] = [
  { symbol: 'BTC', name: 'Bitcoin', balance: 0.45, valueUsd: 29000, network: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum', balance: 12.5, valueUsd: 38000, network: 'ERC-20' },
  { symbol: 'USDT', name: 'Tether', balance: 15000, valueUsd: 15000, network: 'TRC-20' },
  { symbol: 'SOL', name: 'Solana', balance: 150, valueUsd: 22500, network: 'Solana' },
];

export const APP_SECTIONS = {
  DASHBOARD: 'dashboard',
  TRANSACTIONS: 'transactions',
  HR: 'hr',
  FEASIBILITY: 'feasibility',
  CRYPTO: 'crypto',
  AUDIT: 'audit',
  SETTINGS: 'settings',
};