import styled from "@emotion/styled";
import theme from "../theme";
import FlexBox from "./FlexBox";
import Typography from "./Typography";
import { LabelType } from "@/types/ui";

export const LabelAdorement = styled.div(({ color }: { color?: string }) => ({
  width: "5px",
  height: "21px",
  borderRadius: "2px",
  marginRight: "15px",
  backgroundColor: color ?? theme.colors.primary,
}));

export const LabelText = styled.label`
  min-width: fit-content;
  font-size: ${theme.fonts.size.md};
  font-weight: ${theme.fonts.weight.extraBold};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;

export const Label = ({
  text,
  helpText,
  htmlFor,
  labelColor,
  type,
}: {
  text: string;
  helpText?: string;
  htmlFor?: string;
  labelColor?: string;
  type?: LabelType;
}) => {
  const labelStyle = type === "general" && {
    position: "absolute",
    opacity: 0,
  };

  return (
    <FlexBox
      justifyContent="flex-start"
      alignItems="center"
      {...{
        marginBottom: "20px",
        ...labelStyle,
      }}
    >
      <LabelAdorement color={labelColor} />
      <LabelText htmlFor={htmlFor}>{text}</LabelText>
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
