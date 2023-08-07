import Container from "@/ui/atoms/Container";
import theme from "@/ui/theme";
import styled from "@emotion/styled";
import { ReactNode } from "react";

const ContainerWithBackground = ({ children }: { children: ReactNode }) => (
  <Background>
    <StyledContainer>{children}</StyledContainer>
  </Background>
);

const Background = styled.div({
  backgroundColor: theme.colors.background,
});

const StyledContainer = styled(Container)({
  backgroundColor: theme.colors.white,
  padding: "80px 60px",
});

export default ContainerWithBackground;
