import styled from "@emotion/styled";
import theme from "../../theme";
import { Button, ThemeFontSize } from "../../ui";
import { ReactNode } from "react";

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
    return "41px";
  } else if (size === "big") return "70px";
  switch (variant) {
    case "default":
    case "square":
      return "60px";
    case "round":
      return width;
  }
};

const Button = styled.button(
  ({
    variant,
    width,
    color,
    size,
    fontSize,
    children,
    outline,
    ...restProps
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
    minWidth: "fit-content",
    backgroundColor: color ?? theme.colors.primary,
    borderRadius: borderRadius(variant),
    height: height(variant, width, size),
    border: outline ? `1px solid ${theme.colors.gray.main}` : "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: color === theme.colors.white ? theme.colors.gray.dark : "white",
    cursor: "pointer",
    padding: variant === "round" ? "0px" : "0px 20px",
    fontSize: fontSize ? theme.fonts.size[fontSize] : theme.fonts.size.sm,
    outline: "none",
    ...restProps,
  })
);

export default Button;
