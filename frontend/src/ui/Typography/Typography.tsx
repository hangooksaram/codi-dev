import styled from "@emotion/styled";
import { Typography } from "../ui";

const Typography = ({
  variant,
  size,
  color,
  children,
  ...restStyles
}: Typography) => {
  const StyledTypography = styled
    .div(() => ({
      fontSize: size,
      color: color,
      ...restStyles,
    }))
    .withComponent(variant);
  return <StyledTypography>{children}</StyledTypography>;
};

export default Typography;
