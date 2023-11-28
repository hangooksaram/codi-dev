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
    ...rest
  }: {
    variant: Button;
    width?: string;
    color?: string;
    size?: string;
    children?: ReactNode;
    fontSize?: ThemeFontSize;
    outline?: boolean;
  }) => ({
    width: width ?? "fit-content",
    minWidth: "39px",
    backgroundColor: color ?? theme.colors.primary,
    borderRadius: borderRadius(variant),
    height: height(variant, width, size),
    color: fontColor(color),
    border: outline ? `1px solid ${theme.colors.gray.main}` : "none",
    padding: variant === "round" ? "0px" : "0px 20px",
    fontSize: fontSize ? theme.fonts.size[fontSize] : theme.fonts.size.sm,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    outline: "none",
    ...rest,
    ":disabled": {
      backgroundColor: theme.colors.gray.dark,
      color: theme.colors.white,
      cursor: "default",
    },
    [device("mobile")]: {
      fontSize: theme.fonts.size.xs,
      padding: variant === "round" ? "0px" : "0px 12px",
    },
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
    case "square":
      return "50px";
    case "round":
      return width;
  }
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
