'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import theme, { device } from '@/ui/theme';
import Container from '@/ui/atoms/Container';
import MobileBackButton from '../Mobile/MobileBackButton';

const Layout = styled.div(({ background }: { background?: string }) => ({
  width: '100%',
  backgroundColor: background ?? theme.colors.background,
}));

const StyledSinglePageLayoutSinglePageLayout = styled(Container)(({}) => ({
  padding: '50px 0px',

  [device('tablet')]: {
    padding: '30px 0px',
  },
}));

function SinglePageLayout({
  background,
  children,
}: {
  background?: string;
  children: ReactNode;
}) {
  return (
    <Layout background={background}>
      <StyledSinglePageLayoutSinglePageLayout>
        <MobileBackButton />
        {children}
      </StyledSinglePageLayoutSinglePageLayout>
    </Layout>
  );
}

export default SinglePageLayout;
