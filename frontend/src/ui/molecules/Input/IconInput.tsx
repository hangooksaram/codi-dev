import { ReactNode } from "react";
import styled from "@emotion/styled";

const StyledIconInputContainer = styled.div`
  width: 100%;
  position: relative;
  input {
    padding-left: 60px;
  }
`;

const IconInputAdornment = styled.div`
  position: absolute;
  left: 20px;
  top: 31%;
  width: 24px;
  height: 24px;
`;

const IconInputContainer = ({
  iconComponent,
  children,
}: {
  iconComponent: JSX.Element;
  children: ReactNode;
}) => {
  return (
    <StyledIconInputContainer>
      {children}
      <IconInputAdornment>{iconComponent}</IconInputAdornment>
    </StyledIconInputContainer>
  );
};
export default IconInputContainer;
