import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

import { defaultLocale, localeStore } from '../store/locale';

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (
        language: any,
        namespace: any,
        callback: (arg0: null, arg1: { default: any; welcome: string } | null) => void,
      ) => {
        switch (language) {
          case 'zh-CN':
            import('../locale/zh-CN.json')
              .then((resources) => {
                callback(null, resources);
              })
              .catch((error) => {
                callback(error, null);
              });
            break;
          case 'en-US':
            import('../locale/en-US.json')
              .then((resources) => {
                callback(null, resources);
              })
              .catch((error) => {
                callback(error, null);
              });
            break;
        }
      },
    ),
  )
  .init({
    lng: localeStore.getState().locale,
    fallbackLng: defaultLocale,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
