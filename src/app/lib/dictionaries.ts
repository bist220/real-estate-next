import 'server-only'
import { LanguageType } from '../types/LocaleType'
 
const dictionaries = {
  en: () => import('../../../messages/en.json').then((module) => module.default),
  hi: () => import('../../../messages/hi.json').then((module) => module.default),
  mr: () => import('../../../messages/mr.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
    const intlLocale = new Intl.Locale(locale);
    const language = intlLocale.language;
    return dictionaries[language as LanguageType]()
}
