import { ReactNode } from "react";
import { FormLabel } from "../atoms/Label";
import styled from "@emotion/styled";
import { device } from "../theme";

const LabelBox = ({
  width,
  text,
  helpText,
  children,
}: {
  width?: string;
  text: string;
  helpText?: string;
  children?: ReactNode;
}) => {
  return (
    <StyledLabelBox>
      <FormLabel text={text} helpText={helpText} />
      {children}
    </StyledLabelBox>
  );
};

const StyledLabelBox = styled.div(({ width }: { width?: string }) => ({
  width: width ?? "100%",
  [device("tablet")]: {
    width: "100%",
  },
}));

export default LabelBox;
