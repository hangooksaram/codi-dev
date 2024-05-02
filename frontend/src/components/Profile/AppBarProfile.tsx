'use client';

import Profile from '@icons/common/profile.svg';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { PROFILE_MENU } from '@/constants';
import { selectUser } from '@/features/user/userSlice';
import theme from '@/ui/theme';
import Dropdown from '@/ui/atoms/Dropdown';
import { signOut } from '@/api/signApi';

function AppBarProfile() {
  const [selected, setSelected] = useState();
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (selected) {
      if (selected === '로그아웃') {
        signOut();
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else {
        router.push(
          PROFILE_MENU(user.isProfile!).find((menu) => menu.name === selected)!
            .href!,
        );
      }
    }
    return () => setSelected(undefined);
  }, [selected]);

  return (
    <Dropdown
      id="profile-menu"
      type="menu"
      categories={PROFILE_MENU(user.isProfile !== false).map(
        ({ name }) => name,
      )}
      selectedCategory={selected!}
      setSelectedCategory={setSelected}
      left
    >
      {user.profileImageUrl ? (
        <StyledAppBarProfile
          id="profile-menu"
          src={user.profileImageUrl!}
          alt="내 프로필"
        />
      ) : (
        <StyledAppBarProfileNonUser>
          <Profile id="profile-menu" fill={theme.colors.white} />
        </StyledAppBarProfileNonUser>
      )}
    </Dropdown>
  );
}

const AppBarProfileStyles = {
  width: '42px',
  height: '42px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '100%',
  backgroundColor: `${theme.colors.gray.light}`,
  cursor: 'pointer',
  ':hover': {
    outline: `4px solid #F7C863`,
  },
};

const StyledAppBarProfile = styled.img(({ src }: { src?: string }) => ({
  ...AppBarProfileStyles,
  objectFit: 'cover',
}));

const StyledAppBarProfileNonUser = styled.div(() => ({
  ...AppBarProfileStyles,
}));

export default AppBarProfile;
