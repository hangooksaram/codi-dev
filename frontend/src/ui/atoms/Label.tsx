import styled from "@emotion/styled";
import theme from "../theme";
import FlexBox from "./FlexBox";
import Typography from "./Typography";

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
  min-width: fit-content;
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
