import { buildLegacyTheme } from 'sanity';

const props = {
  '--my-white': '#d3d3d3',
  '--my-black': 'black',
  '--primary': '#cbbddf'
};

export const defaultTheme = buildLegacyTheme({
  // Base theme colors
  '--black': props['--my-black'],
  '--white': props['--my-white'],

  // --gray
  // --gray-base

  '--component-bg': props['--primary'],
  // --component-text-color

  '--brand-primary': props['--primary']

  // --default-button-color
  // --default-button-primar-color
  // --default-button-success-color
  // --default-button-warning-color
  // --default-button-danger-color

  // --state-info-color
  // --state-success-color
  // --state-warning-color
  // --state-danger-color

  // --main-navigation-color
  // --main-navigation-color--inverted

  // --focus-color
});
