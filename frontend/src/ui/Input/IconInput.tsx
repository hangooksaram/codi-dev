import { Component, ReactElement } from "react";
import Input from "./Input";
import styled from "@emotion/styled";
import { JsxElement } from "typescript";
import Image from "next/image";

const IconInputContainer = styled.div`
  position: relative;
`;

const IconInputAdornment = styled.div`
  position: absolute;
  left: 20px;
  top: 31%;
  width: 24px;
  height: 24px;
`;

const StyledIconInput = styled(Input)`
  padding-left: 60px;
`;

const IconInput = ({ imgComponent }: { imgComponent: JSX.Element }) => {
  return (
    <IconInputContainer>
      <StyledIconInput />
      <IconInputAdornment>{imgComponent}</IconInputAdornment>
    </IconInputContainer>
  );
};
export default IconInput;
