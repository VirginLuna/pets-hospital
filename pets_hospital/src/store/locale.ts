import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type Locale = 'zh-CN' | 'en-US';

export const defaultLocale: Locale = navigator.language.indexOf('zh') === 0 ? 'zh-CN' : 'en-US';

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const localeStore = create<LocaleState>()(
  devtools(
    persist(
      (set) => ({
        locale: defaultLocale,
        setLocale: (locale) => set((_state) => ({ locale: locale })),
      }),
      { name: 'locale' },
    ),
  ),
);
