import fs from 'fs';
import path from 'path';
import NextI18Next from 'next-i18next-serverless';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const locales = fs.existsSync(
  path.join(serverRuntimeConfig.PROJECT_ROOT, './locales/en/common.json')
);
const publicLocales = fs.readFileSync(
  path.join(serverRuntimeConfig.PROJECT_ROOT, './public/locales/en/common.json')
);

console.log('locales exists: ', locales);
console.log('publicLocales exists: ', publicLocales);

export const NextI18NextInstance = new NextI18Next({
  projectRoot: serverRuntimeConfig.PROJECT_ROOT,
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  partialBundledLanguages: false,
  ns: ['common'],
  defaultNS: 'common',
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  lng: 'en'
});

/* Optionally, export class methods as named exports */
export const {
  appWithTranslation,
  useTranslation,
  withTranslation,
  i18n
} = NextI18NextInstance;
