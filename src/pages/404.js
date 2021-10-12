import React from 'react';
import { notFoundPage } from '../locales/strings';

// TODO: dirty copy paste of MainLayout content to avoid crazy language switcher (because URL doesnt exist)

export default function NotFoundPage({ data, pageContext: { langCode } }) {
  const LOCAL = notFoundPage[langCode];

  return (
    <>
      <div className="CssGridNavContentFooter">
       
        <div className="gridContent styleContent">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '4rem',
            }}
          >
            <h1>{LOCAL.title}</h1>
            <p>{LOCAL.subtext}</p>
          </div>
        </div>
        <div className="gridFooter"></div>
      </div>
    </>
  );
}
