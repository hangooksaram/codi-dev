import styled from '@emotion/styled';
import Link from 'next/link';
import theme from '../theme';
import { ReactNode } from 'react';

const NavigatorContainer = styled.div(({ current }: { current: boolean }) => ({
  backgroundColor: current ? theme.colors.primary.main : theme.colors.white,

  ':hover': !current
    ? {
        backgroundColor: theme.colors.background,
        color: theme.colors.primary.main,
      }
    : {},
}));

const StyledNavigator = styled(Link)(() => ({
  display: 'flex',
  cursor: 'pointer',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
}));

export const Navigator = ({
  current,
  href,
  ...linkAttributes
}: {
  current: boolean;
  href: string;
}) => (
  <NavigatorContainer current={current}>
    <StyledNavigator href={href} {...linkAttributes} />
  </NavigatorContainer>
);

const TopNavigatorContainer = styled(NavigatorContainer)(
  ({ current }: { current: boolean }) => ({
    color: current ? theme.colors.white : theme.colors.black,
    height: '100%',
  }),
);

export const StyledTopNavigator = styled(StyledNavigator)(() => ({
  width: '159px',
  height: '100%',
  alignItems: 'center',
}));

export const TopNavigator = ({
  current,
  children,
  href,
}: {
  current: boolean;
  children: ReactNode;
  href: string;
}) => (
  <TopNavigatorContainer current={current}>
    <StyledTopNavigator href={href}>{children}</StyledTopNavigator>
  </TopNavigatorContainer>
);

export const SideNavigatorContainer = styled(NavigatorContainer)(
  ({
    current,
    nested,
    nestedParent,
  }: {
    current: boolean;
    nested?: number;
    nestedParent?: boolean;
  }) => ({
    paddingLeft: nested ? `${40 * nested}px` : '40px',
    color: nestedParent
      ? theme.colors.primary.main
      : current
        ? theme.colors.white
        : theme.colors.gray.main,
  }),
);

export const StyledSideNavigator = styled(StyledNavigator)(() => ({
  width: '204px',
  height: '64px',
}));

interface SideNavigatorProps extends React.DOMAttributes<HTMLAnchorElement> {
  current: boolean;
  nested?: number;
  nestedParent?: boolean;
  children: ReactNode;
  href: string;
}

export const SideNavigator = ({
  current,
  nested,
  nestedParent,
  children,
  href,
  ...linkAttributes
}: SideNavigatorProps) => (
  <SideNavigatorContainer
    current={current}
    nested={nested}
    nestedParent={nestedParent}
  >
    <StyledSideNavigator href={href} {...linkAttributes}>
      {children}
    </StyledSideNavigator>
  </SideNavigatorContainer>
);
