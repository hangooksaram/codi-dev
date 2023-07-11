import Link from "next/link";
import styled from "@emotion/styled";
import theme from "../../theme";

const StyledLink = styled(Link)(({ color }: { color?: string }) => ({
  color: color ?? theme.colors.black,
}));

export default StyledLink;
