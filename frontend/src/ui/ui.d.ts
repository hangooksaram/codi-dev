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

export type Button = "default" | "square" | "round" | undefined;
export interface FlexBox {
  direction?: "row" | "column";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
  alignItems?: "center" | "flex-start" | "flex-end" | "space-between";
  rowGap?: string;
  columnGap?: string;
  children: ReactNode;
  wrap?: boolean;
}

export interface Typography {
  variant: "div" | "span" | "h1" | "h2" | "h3";
  size?: string;
  weight?: number;
  color?: string;
  align?: "left" | "right" | "center";
  children: string;
}

export interface Dropdown {
  width?: string;
  title?: string;
  type?: "menu" | "form";
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}
