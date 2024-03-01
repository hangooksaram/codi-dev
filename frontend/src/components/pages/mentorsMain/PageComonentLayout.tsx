import styled from '@emotion/styled';
import { ReactNode } from 'react';
import theme, { device } from '@/ui/theme';

export function PageComponentLayout({
  color,
  children,
}: {
  color?: string;
  children: ReactNode;
}) {
  return (
    <Layout color={color}>
      <StyledPageComponentLayout>{children}</StyledPageComponentLayout>
    </Layout>
  );
}

const Layout = styled.div(({ color }) => ({
  width: '100%',
  backgroundColor: color || `${theme.colors.white}`,
  height: 'auto',
  padding: '50px 0px',
}));

const StyledPageComponentLayout = styled.div(() => ({
  width: '69%',
  margin: '0 auto',
  [device('tablet')]: {
    width: '90%',
  },
}));
