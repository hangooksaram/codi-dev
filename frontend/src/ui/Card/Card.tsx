import styled from "@emotion/styled";

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
    borderRadius: "20px",
    backgroundColor: color ?? "white",
    padding: padding,
  })
);

export default Card;
