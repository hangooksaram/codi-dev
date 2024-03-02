'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import theme, { device } from '@/ui/theme';
import Container from '@/ui/atoms/Container';

const Layout = styled.div(() => ({
  width: '100%',
  backgroundColor: theme.colors.background,
}));

const StyledSinglePageLayoutSinglePageLayout = styled(Container)(({}) => ({
  padding: '50px 0px',

  [device('tablet')]: {
    padding: '30px 0px',
  },
}));

function SinglePageLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <StyledSinglePageLayoutSinglePageLayout>
        {children}
      </StyledSinglePageLayoutSinglePageLayout>
    </Layout>
  );
}

export default SinglePageLayout;
