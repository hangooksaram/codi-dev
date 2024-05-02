'use client';

import styled from '@emotion/styled';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import theme, { device } from '@/ui/theme';
import { selectUser } from '@/features/user/userSlice';
import { selectAuth } from '@/features/auth/authSlice';
import UserAppBarMenu from './AppBarMenu/UserAppBarMenu';
import NonUserAppBarMenu from './AppBarMenu/NonUserAppBarMenu';
import 'react-loading-skeleton/dist/skeleton.css';

function MobileAppBar() {
  const path = usePathname();
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  return (
    <StyledAppBar>
      {auth?.isLoggedIn && user.id && <UserAppBarMenu />}
      {auth?.isLoggedIn === false && <NonUserAppBarMenu />}
    </StyledAppBar>
  );
}

const StyledAppBar = styled.nav({
  display: 'none',
  width: '100%',
  padding: '0px 20px',
  position: 'sticky',

  alignItems: 'center',
  justifyContent: 'space-between',
  top: '0',
  zIndex: '999',
  height: '59px',
  backgroundColor: theme.colors.white,
  borderBottom: `1px solid ${theme.colors.gray.main}`,

  [device('smWeb')]: {
    display: 'flex',
  },
});

export default MobileAppBar;
