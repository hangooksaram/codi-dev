'use client';

import React, { Suspense, useState } from 'react';
import Schedule from '@icons/calendar/calendar-schedule.svg';
import Hamburger from '@icons/mentorCenter/hamburger.svg';
import MentorProfile from '@icons/mentorCenter/mentor-profile.svg';
import Menu from '@icons/mobile/mobile-menu.svg';
import SideBar, {
  MobileMenuButton,
  SideBarOverlay,
} from '@/components/NavBar/SideBar/SideBar';
import theme from '@/ui/theme';
import FlexBox from '@/ui/atoms/FlexBox';
import LayoutWithSideBar from '@/components/Layout/LayoutWithSideBar';
import MentorCenterLoading from './loading';

export default function MentorCenterClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const navigators = [
    {
      iconComponent: <Schedule fill={theme.colors.gray.main} />,
      currentIconComponent: <Schedule fill={theme.colors.white} />,
      name: '일정 관리',
      href: '/mentorCenter/schedule',
    },
    {
      iconComponent: <Hamburger fill={theme.colors.gray.main} />,
      currentIconComponent: <Hamburger fill={theme.colors.white} />,
      name: '요청 리스트',
      href: '/mentorCenter/apply',
      // adornment: data!.data.length > 0 ? <NewApplyBadge /> : undefined,
    },
    {
      iconComponent: <MentorProfile fill={theme.colors.gray.main} />,
      currentIconComponent: <MentorProfile fill={theme.colors.white} />,
      name: '멘토 프로필',
      href: '/mentorCenter/profile',
    },
  ];
  return (
    <FlexBox
      justifyContent="flex-start"
      alignItems="flex-start"
      {...{ backgroundColor: '#ECF1F6' }}
    >
      <>
        <SideBarOverlay open={open} onClick={() => setOpen(false)} />
        <MobileMenuButton
          variant="square"
          onClick={() => setOpen((prev) => !prev)}
          color={theme.colors.gray.main}
        >
          <Menu />
        </MobileMenuButton>
      </>
      <SideBar navigators={navigators} open={open} setOpen={setOpen} />
      <LayoutWithSideBar>
        <Suspense fallback={<MentorCenterLoading />}>{children}</Suspense>
      </LayoutWithSideBar>
    </FlexBox>
  );
}
