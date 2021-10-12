
import { CSSObject } from '@emotion/react';

const primary = '#57e9f2';
const secondary = '#45d4fb';
const white = '#fff';
const gray = 'rgb(220, 220, 220)';

export const formCSS: CSSObject = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem',
    marginBottom: '2rem',
  };

export const buttonCSS: CSSObject = {
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
  
    '&:hover': {
      transform: 'scale(1.1)',
      cursor: 'pointer',
      transition: 'all 150ms linear',
      filter: 'saturate(1.3)',
    },
  };

  
export const form__groupCSS: CSSObject = {
  position: 'relative',
  padding: '15px 0 0',
  marginTop: '10px',
  // width: 100%,
  margin: '0.5em',
};

export const form__fieldCSS: CSSObject = {
  fontSamily: 'inherit',
  width: '100%',
  border: 0,
  borderBottom: `2px solid ${gray}`,
  outline: 0,
  fontSize: '1.3rem',
  color: white,
  padding: '7px 0',
  background: 'transparent',
  transition: 'border-color 0.2s',

  '&::placeholder': {
    color: 'transparent',
  },

  '&:placeholder-shown + .formLabel': {
    fontSize: '1.3rem',
    cursor: 'text',
    top: '20px',

},

  '&:required,&:invalid': {
    boxShadow: 'none'
  },

  '&:focus': {
    paddingBottom: '6px',
    fontWeight: 700,
    borderWidth: '3px',
    borderImage: `linear-gradient(to right, ${primary}, ${secondary})`,
    borderImageSlice: 1,
  },
  

  '&:focus + .formLabel': {
      position: 'absolute',
      top: '-6px',
      display: 'block',
      transition: '0.2s',
      fontSize: '1rem',
      color: primary,
      fontWeight: 700,
  }

};

export const form__labelCSS: CSSObject = {
  position: 'absolute',
  top: '-6px',
  display: 'block',
  transition: '0.2s',
  fontSize: '1rem',
  color: gray,

  '&:focus-within': {
      backgroundColor: 'red',
      fontSize: '4rem',
  },
}
