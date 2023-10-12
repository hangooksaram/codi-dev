import { LabelType } from "@/types/ui";
import FlexBox from "@/ui/atoms/FlexBox";
import { Label } from "@/ui/atoms/Label";
import styled from "@emotion/styled";

export const StyledLabeledInputContainer = styled.div`
  width: 100%;
`;

const LabeledInputContainer = ({
  text,
  helpText,
  children,
  htmlFor,
  labelColor,
  type = "form",
}: {
  text: string;
  htmlFor?: string;
  helpText?: string;
  children?: React.ReactNode;
  labelColor?: string;
  type?: LabelType;
}) => {
  return (
    <StyledLabeledInputContainer>
      <Label
        text={text}
        helpText={helpText}
        htmlFor={htmlFor}
        labelColor={labelColor}
        type={type}
      />
      <FlexBox justifyContent="space-between">{children}</FlexBox>
    </StyledLabeledInputContainer>
  );
};

export default LabeledInputContainer;
