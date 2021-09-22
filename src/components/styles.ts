
export const breakpointKey = (value: string): string => {
  if (value === 'small') {
    return `@media (max-width: 61em)`;
  } else if (value === 'normal') {
    return `@media (min-width: 61em)`;
  } else {
    console.warn('Breakpoint mixin supports: small, normal');
    return '';
  }
};