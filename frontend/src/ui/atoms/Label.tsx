import styled from "@emotion/styled";

const StyledLabel = styled.label(() => ({
  position: "absolute",
  opacity: "0",
}));

const Label = ({ htmlFor, text }: { htmlFor: string; text: string }) => (
  <StyledLabel htmlFor={htmlFor}> {text}</StyledLabel>
);

export default Label;
