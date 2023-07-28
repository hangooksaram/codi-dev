import { ComponentProps, ReactNode } from "react";

export type gray = {
  dark;
};

export type ThemeColors =
  | "black"
  | "secondary"
  | "primary"
  | "info"
  | "error"
  | "background"
  | "white"
  | "gray"
  | "background"
  | "white";

export type ThemeFontSize = "xl" | "lg" | "md" | "sm" | "xs";
export type ThemeFontWeight = "black" | "extraBold" | "bold" | "regular";

export interface Input {
  width?: string;
  outline?: boolean;
  invalid?: boolean | undefined;
}

export interface Textarea {
  width?: string;
  outline?: boolean;
  invalid?: boolean | undefined;
}

export type Button = "default" | "square" | "round" | undefined;
export interface FlexBox {
  width?: string;
  direction?: "row" | "column";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
  alignItems?: "center" | "flex-start" | "flex-end" | "space-between";
  rowGap?: string;
  columnGap?: string;
  children: ReactNode;
  isWrap?: boolean | undefined;
}

export interface Typography {
  variant: "div" | "span" | "h1" | "h2" | "h3" | "label";
  size?: string;
  weight?: number;
  color?: string;
  align?: "left" | "right" | "center";
  children: string | number;
}

export interface Dropdown {
  width?: string;
  title?: string;
  type?: "menu" | "form";
  contentType?: "list" | "grid";
  categories: string[] | number[];
  invalid?: boolean | undefined;
  selectedCategory: string | number;
  children?: ReactNode;

  setSelectedCategory: (category: T) => void;
}
