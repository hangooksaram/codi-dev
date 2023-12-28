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
      iconComponent: <Profile fill={theme.colors.gray.main} />,
      currentIconComponent: <Profile fill={theme.colors.white} />,
      name: "일정 관리",
      href: "/mentorCenter/schedule/",
    },
    {
      iconComponent: <Profile fill={theme.colors.gray.main} />,
      currentIconComponent: <Profile fill={theme.colors.white} />,
      name: "요청 리스트",
      href: "/mentorCenter/apply/",
    },
    {
      iconComponent: <Profile fill={theme.colors.gray.main} />,
      currentIconComponent: <Profile fill={theme.colors.white} />,
      name: "프로필 수정",
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
