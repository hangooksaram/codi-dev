import styled from "@emotion/styled";

const Input = styled.input(({ width }: { width?: string }) => ({
  width: width ?? "100%",
  position: "relative",
  height: "60px",
  borderRadius: "10px",
  border: "1px solid var(--light-gray, #eeeff2)",
  background: "var(--white, #fcfcfc)",
  boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.04)",
  paddingLeft: "30px",
  fontSize: "24px",
}));

export default Input;
