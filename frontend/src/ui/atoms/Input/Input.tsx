import theme from "@/ui/theme";
import styled from "@emotion/styled";

const Input = styled.input(
  ({ width, outline }: { width?: string; outline?: string }) => ({
    width: width ?? "100%",
    position: "relative",
    height: "50px",
    borderRadius: "10px",
    border: "1px solid",
    borderColor:
      outline === "true" ? theme.colors.gray.main : theme.colors.gray.light,
    background: "var(--white, #fcfcfc)",
    boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.04)",
    paddingLeft: "30px",
    fontSize: theme.fonts.size.sm,
    ":disabled": {
      color: "red",
    },
    "::placeholder": {
      color: theme.colors.gray.dark,
    },
  })
);

export default Input;
