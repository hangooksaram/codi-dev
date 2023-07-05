import styled from "@emotion/styled";
import theme from "../theme";
import { Button } from "../ui";
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
    case "default" || "square":
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
  }: {
    variant: Button;
    width?: string;
    color?: string;
    size?: string;
  }) => ({
    width: width ?? "100%",
    backgroundColor: color ?? theme.colors.primary,
    borderRadius: borderRadius(variant),
    height: size === "small" ? "30px" : height(variant, width),
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    cursor: "pointer",
  })
);

export default Button;
