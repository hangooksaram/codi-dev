import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Container from '@/ui/atoms/Container';
import theme, { device } from '@/ui/theme';

function ContainerWithBackground({ children }: { children: ReactNode }) {
  return (
    <Background>
      <StyledContainer>{children}</StyledContainer>
    </Background>
  );
}

const Background = styled.div({
  backgroundColor: theme.colors.background,
});

const StyledContainer = styled(Container)({
  backgroundColor: theme.colors.white,
  width: '78%',
  minHeight: '100vh',
  padding: '80px 60px',
  [device('tablet')]: {
    width: '100%',
    padding: '80px 20px',
  },
});

export default ContainerWithBackground;
