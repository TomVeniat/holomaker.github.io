import React from 'react';
import { notFoundPage } from '../locales/strings';
import { NavbarSlim } from '../bits/NavbarSlim/NavbarSlim';
import { NavbarData } from '../layout/Data';

// TODO: dirty copy paste of MainLayout content to avoid crazy language switcher (because URL doesnt exist)

export default function NotFoundPage({ data, pageContext: { langCode } }) {
  const LOCAL = notFoundPage[langCode];

  return (
    <>
      <div className="CssGridNavContentFooter">
        <nav className="gridNavBar">
          <NavbarSlim links={NavbarData[langCode].links} />
        </nav>
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
