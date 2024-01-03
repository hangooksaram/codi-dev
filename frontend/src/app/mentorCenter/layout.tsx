"use client";
import React, { useState } from "react";
import SideBar, {
  MobileMenuButton,
  SideBarOverlay,
} from "@/components/NavBar/SideBar/SideBar";
import Profile from "@icons/common/profile.svg";
import Verified from "@icons/common/verified.svg";
import Link from "@icons/common/link.svg";
import theme, { device } from "@/ui/theme";
import FlexBox from "@/ui/atoms/FlexBox";
import styled from "@emotion/styled";
import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import Schedule from "@icons/calendar/calendar-schedule.svg";
import Hamburger from "@icons/mentorCenter/hamburger.svg";
import MentorProfile from "@icons/mentorCenter/mentor-profile.svg";
import Menu from "@icons/mobile/mobile-menu.svg";

export default function MentorCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const isMentor = useSelector(selectUser).isMentor;
  const navigators = [
    {
      iconComponent: <Schedule fill={theme.colors.gray.main} />,
      currentIconComponent: <Schedule fill={theme.colors.white} />,
      name: "일정 관리",
      href: "/mentorCenter/schedule/",
    },
    {
      iconComponent: <Hamburger fill={theme.colors.gray.main} />,
      currentIconComponent: <Hamburger fill={theme.colors.white} />,
      name: "요청 리스트",
      href: "/mentorCenter/apply/",
    },
    {
      iconComponent: <MentorProfile fill={theme.colors.gray.main} />,
      currentIconComponent: <MentorProfile fill={theme.colors.white} />,
      name: "멘토 프로필",
      href: "/mentorCenter/profile/",
    },
  ];
  return (
    <FlexBox justifyContent="flex-start" alignItems="flex-start">
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
      <LayoutWithSideBar>{children}</LayoutWithSideBar>
    </FlexBox>
  );
}
