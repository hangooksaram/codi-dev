import theme from "@/ui/theme";
import styled from "@emotion/styled";
import { Field } from "formik";

const FieldInput = styled(Field)(
  ({
    width,
    invalid,
    outline,
  }: {
    width: string;
    invalid: boolean | undefined;
    outline: string;
  }) => ({
    width: width ?? "100%",
    position: "relative",
    height: "50px",
    borderRadius: "10px",
    border: "1px solid",
    borderColor:
      invalid === true && invalid !== undefined
        ? theme.colors.error
        : theme.colors.gray.main,
    background: "var(--white, #fcfcfc)",
    boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.04)",
    paddingLeft: "30px",
    fontSize: "24px",
  })
);

export default FieldInput;
