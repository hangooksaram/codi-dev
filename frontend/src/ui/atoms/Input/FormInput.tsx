import FlexBox from "@/ui/atoms/Layout/FlexBox";
import theme from "@/ui/theme";
import styled from "@emotion/styled";
import Typography from "../Typography/Typography";

export const StyledFormInputContainer = styled.div`
  width: 100%;
`;

export const FormLabelAdorement = styled.div(
  ({ color }: { color?: string }) => ({
    width: "5px",
    height: "21px",
    borderRadius: "2px",
    marginRight: "15px",
    backgroundColor: color ?? theme.colors.primary,
  })
);

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
  labelColor,
}: {
  text: string;
  helpText?: string;
  htmlFor?: string;
  labelColor?: string;
}) => {
  return (
    <FlexBox
      justifyContent="flex-start"
      alignItems="center"
      {...{ marginBottom: "20px" }}
    >
      <FormLabelAdorement color={labelColor} />
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
  labelColor,
}: {
  text: string;
  htmlFor?: string;
  helpText?: string;
  children: React.ReactNode;
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
