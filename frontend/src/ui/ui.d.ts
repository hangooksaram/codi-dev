export type Button = "default" | "square" | "round" | undefined;
export interface Flex {
  direction?: "row" | "column";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
  alignItems?: "center" | "flex-start" | "flex-end" | "space-between";
  rowGap?: string;
  columnGap?: string;
}

export interface Typography {
  variant: "div" | "span" | "h1" | "h2" | "h3";
  size: "xl" | "lg" | "md" | "sm" | "xs";
  color?: string;
  children: string;
}
