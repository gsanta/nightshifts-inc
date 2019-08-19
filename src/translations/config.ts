import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import hu from './hu.json';
import { initReactI18next } from 'react-i18next';
import _ from 'lodash';

const supportedLanguages: {abbr: string, file: any}[] = [
    {
        abbr: 'en',
        file: en
    },
    {
        abbr: 'hu',
        file: hu
    }
];

const resources: i18n.Resource = {};

supportedLanguages.forEach(lan => {
    resources[lan.abbr] = {
        translation: lan.file
    };
});


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(
        {
            resources: resources,

            fallbackLng: 'en',
            debug: true,

            interpolation: {
                escapeValue: false
            },
            detection: {
                order: ['querystring', 'navigator'],
            }
        },
        () => {
            const language = _.find(i18n.languages, (lan) => _.find(supportedLanguages, (suppLan) => suppLan.abbr === lan));
            // AppStore.dispatch(UpdateSettingsActions.request({ language: <'en' | 'hu'> language || 'en' }));
        }
    );

export default i18n;
