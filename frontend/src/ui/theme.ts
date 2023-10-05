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
  xl: string;
  lg: string;
  md: string;
  sm: string;
  xs: string;
}

interface FontWeight {
  black: number;
  extraBold: number;
  bold: number;
  regular: number;
}

export interface CustomTheme {
  colors: Colors;
  fonts: {
    size: FontSize;
    weight: FontWeight;
  };
}

const theme = {
  colors: {
    black: "#161718",
    secondary: "#F7C863",
    primary: "#334259",
    info: "#4C9DF8",
    error: "#E0291D",
    gray: {
      dark: "#a8a9af",
      main: "#c8c9d0",
      light: "#eeeff2",
    },
    background: "#ecf1f6",
    white: "#fcfcfc",
  },
  fonts: {
    size: {
      xl: "50px",
      lg: "34px",
      md: "24px",
      sm: "16px",
      xs: "16px",
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
};

export const device = (device: keyof typeof theme.breakpoints) =>
  `@media (max-width: ${theme.breakpoints[device]}px)`;
export default theme;
