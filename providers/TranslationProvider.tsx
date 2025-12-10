'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import { type Locale, DEFAULT_LOCALE, getTranslations, SUPPORTED_LOCALES, type LocaleData } from '@/locales';
import en from '@/locales/en.json';

const LOCALE_STORAGE_KEY = 'vto-locale';

interface TranslationContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: typeof en;
    supportedLocales: LocaleData[];
}

const TranslationContext = createContext<TranslationContextValue | undefined>(undefined);

interface TranslationProviderProps {
    readonly children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
    const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
    const [translations, setTranslations] = useState<typeof en>(getTranslations(DEFAULT_LOCALE));

    // Load saved locale on mount
    useEffect(() => {
        const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
        if (savedLocale && SUPPORTED_LOCALES.some(l => l.code === savedLocale)) {
            setLocaleState(savedLocale);
            setTranslations(getTranslations(savedLocale));
        } else {
            // Try to detect browser language
            const browserLang = navigator.language.split('-')[0] as Locale;
            if (SUPPORTED_LOCALES.some(l => l.code === browserLang)) {
                setLocaleState(browserLang);
                setTranslations(getTranslations(browserLang));
            }
        }
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        setTranslations(getTranslations(newLocale));
        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);

        // Update HTML lang attribute
        document.documentElement.lang = newLocale;
    }, []);

    const contextValue = useMemo(() => ({
        locale,
        setLocale,
        t: translations,
        supportedLocales: SUPPORTED_LOCALES
    }), [locale, setLocale, translations]);

    return (
        <TranslationContext.Provider value={contextValue}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
}
