import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import de from './de.json';

export type Locale = 'en' | 'es' | 'fr' | 'de';

export interface LocaleData {
    code: Locale;
    name: string;
    nativeName: string;
    flag: string;
}

export const SUPPORTED_LOCALES: LocaleData[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
];

export const translations: Record<Locale, typeof en> = {
    en,
    es,
    fr,
    de,
};

export const DEFAULT_LOCALE: Locale = 'en';

export function getTranslations(locale: Locale): typeof en {
    return translations[locale] || translations[DEFAULT_LOCALE];
}

// Helper to get nested translation by dot notation
export function t(translations: typeof en, key: string): string {
    const keys = key.split('.');
    let result: unknown = translations;

    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = (result as Record<string, unknown>)[k];
        } else {
            return key; // Return key if translation not found
        }
    }

    return typeof result === 'string' ? result : key;
}
