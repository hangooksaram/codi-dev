import FlexBox from "@/ui/atoms/FlexBox";
import { FormLabel } from "@/ui/atoms/Label";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import styled from "@emotion/styled";

export const StyledFormInputContainer = styled.div`
  width: 100%;
`;

const FormInputContainer = ({
  text,
  helpText,
  children,
  htmlFor,
  labelColor,
}: {
  text: string;
  htmlFor?: string;
  helpText?: string;
  children?: React.ReactNode;
  labelColor?: string;
}) => {
  return (
    <StyledFormInputContainer>
      <FormLabel
        text={text}
        helpText={helpText}
        htmlFor={htmlFor}
        labelColor={labelColor}
      />
      <FlexBox justifyContent="space-between">{children}</FlexBox>
    </StyledFormInputContainer>
  );
};

export default FormInputContainer;
