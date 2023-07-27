import styled from "@emotion/styled";
import theme from "../theme";
import { Typography } from "../ui";

const Typography = ({
  variant,
  size,
  color,
  weight,
  align,
  children,
  ...rest
}: Typography) => {
  const StyledTypography = styled
    .div(() => ({
      minWidth: "fit-content",
      fontSize: size ?? "16px",
      color: color ?? theme.colors.black,
      textAlign: align ?? "left",
      height: "fit-content",
      fontWeight: weight,
      wordBreak: "break-word",
      ...rest,
    }))
    .withComponent(variant);
  return <StyledTypography>{children}</StyledTypography>;
};

export default Typography;
