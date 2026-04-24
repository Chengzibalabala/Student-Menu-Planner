import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Locale, t as translate } from "@/i18n";
import { ThemeColorKey } from "@/constants/themes";

interface SettingsContextState {
  locale: Locale;
  themeColor: ThemeColorKey;
  isHydrated: boolean;
  setLocale: (locale: Locale) => void;
  setThemeColor: (color: ThemeColorKey) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const SettingsContext = createContext<SettingsContextState | null>(null);

const STORAGE_KEY = "settings_v1";

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh-Hans");
  const [themeColor, setThemeColorState] = useState<ThemeColorKey>("red");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const data = JSON.parse(raw);
          if (data.locale) setLocaleState(data.locale);
          if (data.themeColor) setThemeColorState(data.themeColor);
        }
      } catch (e) {
        console.error("Failed to load settings", e);
      } finally {
        setIsHydrated(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ locale, themeColor }));
  }, [locale, themeColor, isHydrated]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const setThemeColor = useCallback((next: ThemeColorKey) => setThemeColorState(next), []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => translate(locale, key, params),
    [locale],
  );

  return (
    <SettingsContext.Provider
      value={{ locale, themeColor, isHydrated, setLocale, setThemeColor, t }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
