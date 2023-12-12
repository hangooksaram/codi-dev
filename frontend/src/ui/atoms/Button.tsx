import styled from "@emotion/styled";
import theme, { device } from "../theme";
import { Button, ThemeFontSize } from "../../types/ui";
import { ReactNode } from "react";

const Button = styled.button(
  ({
    variant,
    width,
    color,
    size,
    fontSize,
    children,
    outline,
    hoverDisabled,
    ...rest
  }: {
    variant: Button;
    width?: string;
    color?: string;
    size?: string;
    children?: ReactNode;
    fontSize?: ThemeFontSize;
    outline?: boolean;
    hoverDisabled?: boolean;
  }) => ({
    width: width ?? "fit-content",
    minWidth: "39px",
    backgroundColor: color ?? theme.colors.primary,
    borderRadius: borderRadius(variant),
    height: height(variant, width, size),
    color: fontColor(color),
    fontWeight: fontWeight(size),
    border: outline ? `1px solid ${theme.colors.gray.main}` : "none",
    padding: variant === "round" ? "0px" : "0px 20px",
    fontSize: fontSize ? theme.fonts.size[fontSize] : theme.fonts.size.sm,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    outline: "none",
    ":disabled": {
      backgroundColor: theme.colors.gray.dark,
      color: theme.colors.white,
      cursor: "default",
    },
    ":hover": !hoverDisabled ? hover(size) : {},
    [device("mobile")]: {
      fontSize: theme.fonts.size.xs,
      padding: variant === "round" ? "0px" : "0px 12px",
    },
    ...rest,
  })
);

const borderRadius = (variant: Button) => {
  switch (variant) {
    case "default":
      return "100px";
    case "round":
      return "100%";
    case "square":
      return "10px";
  }
};

const height = (variant: Button, width?: string, size?: string) => {
  if (size === "small") {
    return "39px";
  } else if (size === "big") return "70px";
  switch (variant) {
    case "default":
      return "50px";
    case "square":
      return "50px";
    case "round":
      return width;
  }
};

const fontWeight = (size?: string) => {
  if (size === "small") return theme.fonts.weight.regular;
  return theme.fonts.weight.extraBold;
};

const hover = (size?: string) => {
  if (size === "small")
    return {
      border: `2px solid ${theme.colors.primary}`,
      fontWeight: theme.fonts.weight.bold,
      backgroundColor: theme.colors.white,
      color: theme.colors.primary,
    };
  return {
    border: `2px solid ${theme.colors.primary}`,
    fontWeight: theme.fonts.weight.regular,
    backgroundColor: theme.colors.white,
    color: theme.colors.primary,
  };
};

const fontColor = (color?: string) => {
  switch (color) {
    case theme.colors.white:
      return theme.colors.gray.dark;
    case theme.colors.secondary:
      return theme.colors.black;
    case theme.colors.background:
      return theme.colors.primary;
    default:
      return theme.colors.white;
  }
};

export default Button;
