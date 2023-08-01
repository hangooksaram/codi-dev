import styled from "@emotion/styled";
import theme from "../theme";

const Chip = styled.div(({ size }: { size?: "small" }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: size === "small" ? "31px" : "39px",
  fontSize: theme.fonts.size.xs,
  backgroundColor: theme.colors.background,
  color: theme.colors.primary,
  padding: "0px 20px",
  width: "fit-content",
  borderRadius: "100px",
  cursor: "default",
}));

export default Chip;
