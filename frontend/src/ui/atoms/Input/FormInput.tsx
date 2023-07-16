import FlexBox from "@/ui/atoms/Layout/FlexBox";
import theme from "@/ui/theme";
import styled from "@emotion/styled";
import Typography from "../Typography/Typography";

export const StyledFormInputContainer = styled.div`
  width: 100%;
`;

export const FormLabelAdorement = styled.div`
  width: 5px;
  height: 21px;
  border-radius: 2px;
  margin-right: 15px;
  background-color: ${theme.colors.primary};
`;

export const FormLabelText = styled.label`
  font-size: ${theme.fonts.size.md};
  font-weight: ${theme.fonts.weight.extraBold};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;

export const FormLabel = ({
  text,
  helpText,
  htmlFor,
}: {
  text: string;
  helpText?: string;
  htmlFor?: string;
}) => {
  return (
    <FlexBox
      justifyContent="flex-start"
      alignItems="center"
      {...{ marginBottom: "20px" }}
    >
      <FormLabelAdorement />
      <FormLabelText htmlFor={htmlFor}>{text}</FormLabelText>
      <Typography
        variant="div"
        color={theme.colors.gray.main}
        {...{ marginLeft: "10px" }}
      >
        {helpText!}
      </Typography>
    </FlexBox>
  );
};

const FormInputContainer = ({
  text,
  helpText,
  children,
  htmlFor,
}: {
  text: string;
  htmlFor?: string;
  helpText?: string;
  children: React.ReactNode;
}) => {
  return (
    <StyledFormInputContainer>
      <FormLabel text={text} helpText={helpText} htmlFor={htmlFor} />
      <FlexBox justifyContent="space-between" {...{ width: "100%" }}>
        {children}
      </FlexBox>
    </StyledFormInputContainer>
  );
};

export default FormInputContainer;
