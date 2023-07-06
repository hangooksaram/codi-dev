import styled from "@emotion/styled";
import { Typography } from "../ui";
import theme from "../theme";

const Typography = ({
  variant,
  size,
  color,
  children,
  ...restStyles
}: Typography) => {
  const StyledTypography = styled
    .div(() => ({
      fontSize: theme.fonts.size[size],
      color: color,
      ...restStyles,
    }))
    .withComponent(variant);
  return <StyledTypography>{children}</StyledTypography>;
};

export default Typography;
