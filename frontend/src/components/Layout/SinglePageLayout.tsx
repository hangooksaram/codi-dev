'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import theme, { device } from '@/ui/theme';

const Layout = styled.div(({ color }) => ({
  width: '100%',

  backgroundColor: theme.colors.background,
  [device('tablet')]: {
    height: 'calc(100vh - 59px)',
  },
}));

const StyledSinglePageLayoutSinglePageLayout = styled.main(({}) => ({
  width: '69%',
  margin: '0 auto',
  padding: '50px 0px',
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
