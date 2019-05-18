import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import hu from './hu.json';
import { initReactI18next } from 'react-i18next';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            hu: {
                translation: hu
            }
        },

        fallbackLng: 'hu',
        debug: true,

        interpolation: {
            escapeValue: false
        },
    });
    // .changeLanguage('en', (err, t) => {
    //     if (err) {
    //         return console.log('something went wrong loading', err);
    //     }
    // });

export default i18n;
