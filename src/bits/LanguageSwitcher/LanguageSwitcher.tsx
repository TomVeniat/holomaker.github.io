import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './LanguageSwitcher.scss';
import { LangCode, supportedLangs } from '../../locales/locales';

const updateDefaultLanguage = (defaultLanguage: LangCode): void => {
  // console.log('update language to ', defaultLanguage)
  window.localStorage.setItem('language', defaultLanguage);
};

interface OwnProps {
  currentLangCode: LangCode;
  currentUrl: string;
}
export default function LanguageSwitcher({
  currentLangCode,
  currentUrl,
}: OwnProps) {
  // Compute current language from URL directly
  return (
    <div className={'Container'}>
      {Object.keys(supportedLangs).map((langCode: string, index: number) => {
        // alert(this.props.currentUrl);
        const baseUrl = currentUrl
          .replace(supportedLangs[currentLangCode].urlPrefix, '') // Remove language prefix
          .replace('//', '/'); // Avoid possible double slash
        return (
          <Link
            key={index}
            to={baseUrl}
            onClick={() => {
              updateDefaultLanguage(langCode as LangCode);
            }}
          >
            {supportedLangs[langCode].humanName}
          </Link>
        );
      })}
    </div>
  );
}
