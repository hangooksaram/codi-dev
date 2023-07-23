import styled from "@emotion/styled";
import theme from "../../theme";

const Chip = styled.div(({ size }: { size?: "small" }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: size === "small" ? "31px" : "39px",
  padding: "0px 20px",
  width: "fit-content",
  fontSize: theme.fonts.size.xs,
  backgroundColor: theme.colors.background,
  color: theme.colors.info,
  borderRadius: "100px",
  cursor: "default",
}));

export default Chip;
