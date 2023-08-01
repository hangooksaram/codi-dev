import styled from "@emotion/styled";
import theme from "../theme";

const Card = styled.div(
  ({
    width,
    height,
    color,
    padding,
  }: {
    width?: string;
    height?: string;
    color?: string;
    padding?: string;
  }) => ({
    width: width ?? "100%",
    height: height ?? "100%",
    backgroundColor: color ?? theme.colors.white,
    borderRadius: "20px",
    border: `1px solid ${theme.colors.gray.main}`,
    padding: padding,
  })
);

export default Card;
