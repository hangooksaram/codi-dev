import styled from "@emotion/styled";
import theme from "../../theme";
import { Button, ThemeFontSize } from "../../ui";
import { isVariableDeclaration } from "typescript";

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

const height = (variant: Button, width?: string) => {
  switch (variant) {
    case "default":
    case "square":
      return "64px";
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
  }: {
    variant: Button;
    width?: string;
    color?: string;
    size?: string;
    fontSize?: ThemeFontSize;
  }) => ({
    width: width ?? "fit-content",
    backgroundColor: color ?? theme.colors.primary,
    borderRadius: borderRadius(variant),
    height: size === "small" ? "41px" : height(variant, width),
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    cursor: "pointer",
    padding: variant === "round" ? "0px" : "0px 20px",
    fontSize: fontSize ? theme.fonts.size[fontSize] : theme.fonts.size.sm,
  })
);

export default Button;
