import Link from "next/link";
import styled from "@emotion/styled";
import theme from "../../theme";

const StyledLink = styled(Link)(
  ({ size, color }: { color?: string; size?: string }) => ({
    minWidth: "fit-content",
    color: color ?? theme.colors.black,
    fontSize: size ?? theme.fonts.size.sm,
  })
);

export default StyledLink;
