import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { themeKey } from '../hook/useTheme';

const defaultTheme = 'red' as themeKey;

export type ColorScheme = 'light' | 'dark';

interface ThemeState {
  theme: themeKey;
  scheme: ColorScheme;
  setTheme: (theme: themeKey) => void;
  setScheme: (scheme: ColorScheme) => void;
}

export const themeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: defaultTheme,
        scheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        setTheme: (theme) => set((_state) => ({ theme: theme })),
        setScheme: (scheme) => set((_state) => ({ scheme: scheme })),
      }),
      { name: 'theme' },
    ),
  ),
);
