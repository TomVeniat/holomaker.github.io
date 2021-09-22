import { keyframes } from '@emotion/react';

function hexToName(H: string): string {
  // Convert hex to RGB first
  let r: any = 0,
    g: any = 0,
    b: any = 0;
  if (H.length == 4) {
    r = '0x' + H[1] + H[1];
    g = '0x' + H[2] + H[2];
    b = '0x' + H[3] + H[3];
  } else if (H.length == 7) {
    r = '0x' + H[1] + H[2];
    g = '0x' + H[3] + H[4];
    b = '0x' + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  // alert(l);
  if (l === 100) {
    return 'white';
  }

  if (350 < h || h <= 15) {
    return 'red';
  } else if (15 < h && h <= 40) {
    return 'orange';
  } else if (40 < h && h <= 65) {
    return 'yellow';
  } else if (65 < h && h <= 160) {
    return 'green';
  } else if (160 < h && h <= 200) {
    return 'cyan';
  } else if (200 < h && h <= 240) {
    return 'blue';
  } else if (240 < h && h <= 290) {
    return 'magenta';
  } else if (290 < h && h <= 350) {
    return 'pink';
  } else {
    return '';
  }
}

function hexToHSL(H: string, extraSat = 0, extraLight = 0): string {
  // Convert hex to RGB first
  let r: any = 0,
    g: any = 0,
    b: any = 0;
  if (H.length == 4) {
    r = '0x' + H[1] + H[1];
    g = '0x' + H[2] + H[2];
    b = '0x' + H[3] + H[3];
  } else if (H.length == 7) {
    r = '0x' + H[1] + H[2];
    g = '0x' + H[3] + H[4];
    b = '0x' + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return (
    'hsl(' +
    h +
    ',' +
    Math.max(0, Math.min(100, s + extraSat)) +
    '%,' +
    Math.max(0, Math.min(100, l + extraLight)) +
    '%)'
  );
}

const endlessRotate = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

const endlessRotateInverted = keyframes({
  from: {
    transform: 'rotate(360deg)',
  },
  to: {
    transform: 'rotate(0deg)',
  },
});

const laserGlow = keyframes({
  '0%': {
    // filter: 'blur(1px)',
    opacity: 1,
  },
  '50%': {
    // filter: 'blur(2px)',
    opacity: 0.9,
  },
  '100%': {
    // filter: 'blur(1px)',
    opacity: 1,
  },
});

export const ColumnsCSS = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const LaserCSS = (accentColor) => {
  return {
    marginTop: '10rem',
    marginBottom: '10rem',
    width: '80vw',
    height: '0.1rem',
    borderRadius: '1rem',
    background: `${hexToHSL(accentColor, 100, 100)}`,
    boxShadow: `0 0 20px 10px ${hexToHSL(
      accentColor,
      100,
      0
    )},  0 0 50px 20px ${hexToHSL(
      accentColor,
      -20,
      0
    )},  0 0 110px 60px ${hexToHSL(accentColor, 100, 0)}`,

    // 0 0  hsl(21deg 100% 50%), 0 0 50px 20px hsl(21deg 88% 46%), 0 0 110px 60px hsl(21 56% 50% / 1)
    animation: `${laserGlow} 100ms linear infinite`,
    zIndex: 10,
  };
};

export const LaserDotCSS = (accentColor, glow) => {
  return {
    marginTop: '5rem',
    marginBottom: '5rem',
    width: '1rem',
    height: '1rem',
    borderRadius: '1rem',
    background: `${hexToHSL(accentColor, 70, 70)}`,
    boxShadow: `0 0 20px 10px ${hexToHSL(
      accentColor,
      100,
      0
    )},  0 0 50px 20px ${hexToHSL(
      accentColor,
      -20,
      0
    )},  0 0 110px 60px ${hexToHSL(accentColor, 100, 0)}`,

    // 0 0  hsl(21deg 100% 50%), 0 0 50px 20px hsl(21deg 88% 46%), 0 0 110px 60px hsl(21 56% 50% / 1)
    animation: glow
      ? `${laserGlow} 100ms linear infinite`
      : `${laserGlow} 1s linear infinite`,
    filter: glow ? '' : 'blur(2px)',
    zIndex: 10,
  };
};

const complexRotate = keyframes({
  '0%': {
    transform: 'rotateY(0deg), rotateX(0deg)',
  },

  '100%': {
    transform: 'rotateY(360deg) rotateX(360deg)',
  },
});

const complexRotate2 = keyframes({
  '0%': {
    transform: 'rotateY(0deg), rotateX(0deg)',
  },

  '100%': {
    transform: 'rotateY(180deg) rotateX(40deg)',
  },
});

const firstJoinROtate = keyframes({
  '0%': {
    transform: 'rotate( 10deg)',
  },
  '50%': {
    transform: 'rotate( -10deg)',
  },
  '100%': {
    transform: 'rotate( 10deg)',
  },
});

export const cubesceneCSS = (width: number, height: number) => {
  return {
    width: `${width}em`,
    height: `${height}em`,
    perspective: '600px',
    // animation: `${firstJoinROtate} 10s linear infinite`,
    position: 'absolute',
    zIndex: 0,
    animation: `${laserGlow} 200ms linear infinite`,
    // filter: 'blur(1px)',
  };
};

export const cubeCSS = (invertMovement: boolean) => {
  return {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transformStyle: 'preserve-3d',
    animation: invertMovement
      ? `${complexRotate} 20s linear infinite normal`
      : `${complexRotate2} 20s linear infinite alternate`,
  };
};

//
//
const firstColor = 'white';
const secondColor = 'white';
const transpa1 = '5%';
const transpa2 = '95%';
const wire = true;
export const cube__faceCSS = (face, width: number, height: number) => {
  let transform = '';
  let color = 'transparent';
  let image = '';
  let boxShadow = wire ? 'inset 0 0 0 1px white' : '';
  switch (face) {
    case 'front':
      // color = '#57E9F2';
      transform = `rotateY( 0deg) translateZ(${-width / 2}em)`;
      // boxShadow = `inset 0 0 0 1px ${firstColor}`;

      break;
    case 'right':
      transform = `rotateY( 90deg) translateZ(${-width / 2}em)`;
      // boxShadow = 'inset 0 0 0 1px #57E9F2';
      // image = `linear-gradient(90deg, ${secondColor} 0%,transparent ${transpa1},   transparent ${transpa2}, ${firstColor} 100%)`;
      break;
    case 'left':
      transform = `rotateY(-90deg) translateZ(${-width / 2}em)`;
      // image = `linear-gradient(90deg, ${firstColor}  0%,transparent ${transpa1},   transparent ${transpa2}, ${secondColor} 100%)`;
      // boxShadow = 'inset 0 0 0 1px #57E9F2';
      break;
    case 'back':
      transform = `rotateY(180deg) translateZ(${-width / 2}em)`;

      // color = `${secondColor}`;
      // boxShadow = `inset 0 0 0 4px ${secondColor}`;
      break;
    case 'top':
      transform = `rotateX( 90deg) translateZ(${-height + width / 2}em)`;
      // image = `linear-gradient(0deg, ${secondColor}   0%,transparent ${transpa1},   transparent ${transpa2}, ${firstColor} 100%)`;
      // boxShadow = 'inset 0 0 0 4px #57E9F2';
      // image = 'linear-gradient(${secondColor} 0%,transparent ${transpa1},   transparent ${transpa2}, ${firstColor} 100%)`;
      break;
    case 'bottom':
      // image = `linear-gradient(0deg, ${firstColor}   0%,transparent ${transpa1},   transparent ${transpa2}, ${secondColor}  100%)`;
      transform = `rotateX(-90deg) translateZ(${-width / 2}em)`;
      break;
  }
  let trueHeight = face === 'top' || face === 'bottom' ? width : height;
  return {
    position: 'absolute',
    width: `${width}em`,
    height: `${trueHeight}em`,
    // boxShadow: '0 0 20px 2px white',
    // border: border,
    boxShadow: boxShadow,
    transform: transform,
    backgroundColor: color,
    backgroundBlendMode: 'additive',
    backgroundImage: image,
  };
};

// This is an horizontal Monolith

// const complexRotate = keyframes({

//   '0%': {
//     transform: 'rotateY( 0deg)',
//   },

//   '100%': {
//     transform: 'rotateY(360deg)',
//   },
// });

// const firstJoinROtate = keyframes({
//   '0%': {
//     transform: 'rotate( 70deg)',
//   },
//   '50%': {
//     transform: 'rotate( 100deg)',
//   },
//   '100%': {
//     transform: 'rotate( 70deg)',
//   },
// });

// const width = 3;
// const height = 15;

// export const cubesceneCSS =  {
//   width: `${width}em`,
//   height: `${height}em`,
//   perspective: '600px',
//   transform: 'rotate( 80deg)',
//   animation: `${firstJoinROtate} 10s linear infinite`,
//   position: 'absolute',
// };

// export const cubeCSS = {
//   width: '100%',
//   height: '100%',
//   position: 'absolute',
//   transformStyle: 'preserve-3d',
//   animation: `${complexRotate} 10s linear infinite`,
// };

// export const cube__faceCSS = (face) => {

//   let transform = '';
//   switch(face) {
//     case 'front':
//     transform = `rotateY( 0deg) translateZ(${-width/2}em)`;
//     break;
//     case 'right':
//       transform = `rotateY( 90deg) translateZ(${-width/2}em)`;
//       break;
//     case 'left':
//       transform = `rotateY(-90deg) translateZ(${-width/2}em)`;
//       break;
//     case 'back':
//       transform = `rotateY(180deg) translateZ(${-width/2}em)`;
//       break;
//     case 'top':
//       transform = `rotateX( 90deg) translateZ(${-height+width/2}em)`;
//       break;
//     case 'bottom':
//     transform = `rotateX(-90deg) translateZ(${-width/2}em)`;
//     break;
//   }
//   let trueHeight = (face==='top' || face==='bottom') ? width : height;
//   return {
//   position: 'absolute',
//   width: `${width}em`,
//   height: `${trueHeight}em`,
//    boxShadow: '0 0 20px 2px white',
//   border: 'solid 1px rgb(200,200,200)',
//   transform: transform
//   };
// }
