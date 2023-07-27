import theme from "@/ui/theme";
import { Input } from "@/ui/ui";
import styled from "@emotion/styled";

export const borderStyle = (
  invalid: boolean | undefined,
  outline: boolean | undefined
) => {
  if (invalid === true) {
    return theme.colors.error;
  }
  if (outline) return theme.colors.gray.main;
  return theme.colors.gray.light;
};

const Input = styled.input(({ width, outline, invalid }: Input) => ({
  width: width ?? "100%",
  position: "relative",
  height: "50px",
  borderRadius: "10px",
  border: "1px solid",
  borderColor: borderStyle(invalid, outline),
  background: "var(--white, #fcfcfc)",
  boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.04)",
  paddingLeft: "30px",
  fontSize: theme.fonts.size.sm,
  "::placeholder": {
    color: theme.colors.gray.dark,
  },
}));

export default Input;
