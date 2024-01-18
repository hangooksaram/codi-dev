import styled from "@emotion/styled";
import theme from "../theme";

const Chip = styled.div(
  ({
    size,
    color,
    fontColor,
    outline,
  }: {
    size?: "small";
    color?: string;
    fontColor?: string;
    outline?: boolean;
  }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: size === "small" ? "29px" : "39px",
    fontSize: theme.fonts.size.xs,
    backgroundColor: color ?? theme.colors.background,
    color: fontColor ?? theme.colors.primary.main,
    padding: size === "small" ? "0px 12px" : "0px 20px",
    width: "fit-content",
    borderRadius: "100px",
    cursor: "default",
    border: outline ? `1px solid ${theme.colors.gray.main}` : "none",
  })
);

export default Chip;
