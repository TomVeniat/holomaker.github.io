import React from 'react';
import { CSSObject } from '@emotion/react';
import { Link, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import MainLayout from '../layout/MainLayout';
import SEO from '../bits/SEO/SEO';
import { indexPageStrings } from '../locales/strings';


import { breakpointKey } from '../components/styles';


const buttonCSS: CSSObject = {
  backgroundImage:
    'linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)',
  borderRadius: '100rem',
  border: 'none',
  fontWeight: 900,
  // backgroundColor: 'black',
  color: 'black',
  padding: '1em 2em 1em 2em',
  margin: '1em',
  transition: 'all 150ms linear',
  filter: 'saturate(1)',
  textDecoration: 'none',

  '&:hover': {
    transform: 'scale(1.1)',
    cursor: 'pointer',
    transition: 'all 150ms linear',
    filter: 'saturate(1.3)',
    textDecoration: 'none',
  },
};

const containerCSS: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
};
const titleCSS: CSSObject = {
  fontSize: '2em',
  color: 'white'
};
const subtitleCSS: CSSObject = {
  color: 'white',
  fontSize: '1em',
}

export default function SubscriptionConfirmed({ data, pageContext: { langCode }, location }) {
  const LOCAL = indexPageStrings[langCode];

  return (
    <MainLayout language={langCode} location={{ ...location }}>
      <SEO title={'Subscription Confirmed'} langCode={langCode} />
      <div css={containerCSS}>
      <h1 css={titleCSS}>Subscription confirmed!</h1>
      <p css={subtitleCSS}>You will receive a confirmation mail shortly</p>
      <Link to='/' css={buttonCSS}>Go back Home</Link>
      </div>
       
    </MainLayout>
  );
}
