'use client';

import { ReactNode } from 'react';
import Footer from '../Footer/MainFooter';
import styled from '@emotion/styled';
import { MOBILE_NAVIGATION_HEIGHT } from '@/constants';
import { device } from '@/ui/theme';

const AppLayout = ({ children }: { children: ReactNode }) => (
  <StyledAppLayout suppressHydrationWarning={true}>
    {children}
    <Footer />
  </StyledAppLayout>
);

const StyledAppLayout = styled.body(() => ({
  [device('smWeb')]: {
    paddingBottom: `${MOBILE_NAVIGATION_HEIGHT}px`,
  },
}));
export default AppLayout;
