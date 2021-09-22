import browserLang from 'browser-lang';
import { navigate } from 'gatsby-link';
import { defaultLang, supportedLangs, LangCode, LangSettings } from './locales';

export const localLink = (langCode: LangCode, bareboneLink: string): string => {
  return supportedLangs[langCode].urlPrefix + bareboneLink;
};

export const languageAutoRedirect = (language, pathname: string) => {
  const supportedLangCodes: LangCode[] = Object.keys(
    supportedLangs
  ) as LangCode[];

  // Skip build, Browsers only
  if (typeof window !== 'undefined') {
    if (language === defaultLang) {
      // Expected LangCode
      const userPreferedLanguage: string =
        window.localStorage.getItem('language') ||
        browserLang({
          languages: supportedLangCodes,
          fallback: defaultLang,
        });

      if (userPreferedLanguage !== defaultLang) {
        const newUrl = `/${userPreferedLanguage.toLocaleLowerCase()}${pathname}`;
        window.localStorage.setItem('language', userPreferedLanguage);
        navigate(newUrl, { replace: true });
      }
    }
  }
};
