import styled from "@emotion/styled";

const Card = styled.div(
  ({ color, padding }: { color?: string; padding?: string }) => ({
    borderRadius: "20px",
    backgroundColor: color ?? "white",
    padding: padding,
  })
);

export default Card;
