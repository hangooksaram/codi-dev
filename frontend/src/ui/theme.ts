interface Colors {
  black: string;
  secondary: string;
  primary: string;
  info: string;
  error: string;
  gray: Gray;
  background: string;
  white: string;
}

interface Gray {
  dark: string;
  main: string;
  light: string;
}

interface FontSize {
  xl: '50px';
  lg: '32px';
  md: '22px';
  sm: '16px';
  xs: '14px';
}

interface FontWeight {
  black: number;
  extraBold: number;
  bold: number;
  regular: number;
}

export type Breakpoints = keyof typeof theme.breakpoints;


export interface CustomTheme {
  colors: Colors;
  fonts: {
    size: FontSize;
    weight: FontWeight;
  };
  breakpoints : Breakpoints;
}

const theme = {
  colors: {
    text:{
      normal: '#2d2e2f',
      strong : '#161718'
    },
    primary: {
      normal: '#334259',
      strong: '#2f3b4e',
      heavy :'#2b3543',
      text:'#fcfcfc'
    },
    secondary: {
      normal: '#4C9DF8',
      strong:'#4384cd',
      heavy :'#3a6ba2',
      light: '#8DC1FA',
      lighter: '#4C9DF8',
      lightest: '#F8FBFF',
    },
    assist: {
      normal: '#F7C863',
      strong:'#cca656',
      heavy:'#a18549'
    },
    error: '#E0291D',
    gray: {
      dark: '#a8a9af',
      main: '#c8c9d0',
      light: '#eeeff2',
    },
    background: '#ecf1f6',
    white: '#fcfcfc',
    notice: '#E0291D',
  },
  fonts: {
    size: {
      xl: 50,
      lg: 32,
      md: 22,
      sm: 16,
      xs: 14,
    },
    weight: {
      black: 900,
      extraBold: 800,
      bold: 700,
      regular: 400,
    },
  },
  breakpoints: {
    lgWeb: 1920,
    mdWeb: 1399,
    smWeb: 1100,
    tablet: 999,
    mobile: 450,
  },
} as const;

export const device = (device: Breakpoints) =>
  `@media (max-width: ${theme.breakpoints[device]}px)`;
export default theme;
