import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['en', 'ru'],
        fallbackLng: "en",
        debug: false,
        detection: {
            order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
            caches: ['cookie', 'localStorage']
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },


    });


export default i18n;