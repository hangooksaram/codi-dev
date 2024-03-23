import styled from '@emotion/styled';
import { usePathname, useRouter } from 'next/navigation';
import { MOBILE_NAVIGATIONS, MOBILE_NAVIGATION_HEIGHT } from '@/constants';
import Button from '@/ui/atoms/Button';
import Card from '@/ui/atoms/Card';
import FlexBox from '@/ui/atoms/FlexBox';
import theme, { device } from '@/ui/theme';

function MobileBottomNavigation() {
  const router = useRouter();
  const path = usePathname();
  return (
    <StyledMobileBottomNavigation>
      <MobileBottomNavigationContent>
        <FlexBox columnGap="10px">
          {MOBILE_NAVIGATIONS.map(({ icon: Icon, text, link }, index) => {
            const current = link === '/' ? path === '/' : path.includes(link);
            return (
              <MobileMenuButton
                width="69px"
                variant="default"
                key={index}
                onClick={() => router.push(link)}
                selected={current}
                hoverDisabled
              >
                <Icon
                  fill={
                    current ? theme.colors.primary.main : theme.colors.gray.main
                  }
                />
                {text}
              </MobileMenuButton>
            );
          })}
        </FlexBox>
      </MobileBottomNavigationContent>
    </StyledMobileBottomNavigation>
  );
}

const StyledMobileBottomNavigation = styled.nav({
  width: '100%',
  position: 'fixed',
  bottom: '0',
  zIndex: '1',
  height: `${MOBILE_NAVIGATION_HEIGHT}px`,
  backgroundColor: theme.colors.background,
  display: 'none',
  [device('smWeb')]: {
    display: 'block',
  },
});

const MobileBottomNavigationContent = styled(Card)({
  width: '94%',
  height: '87px',
  display: 'flex',
  margin: '0 auto',
  marginTop: '20px',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: `0px 2px 6px 0px rgba(0, 0, 0, 0.04)`,
  background: theme.colors.white,
});

const MobileMenuButton = styled(Button)(
  ({ selected }: { selected: boolean }) => ({
    height: '67px',
    borderRadius: '20px',
    background: selected ? theme.colors.background : theme.colors.white,
    border: 'none',
    color: selected ? theme.colors.primary.main : theme.colors.gray.main,
    fontSize: theme.fonts.size.xs,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px',
  }),
);

export default MobileBottomNavigation;
