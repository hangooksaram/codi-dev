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

export default function MyInfoLayout({
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
      name: "마이페이지",
      href: "/myInfo/",
    },
    // {
    //   iconComponent: <Verified fill={theme.colors.gray.main} />,
    //   currentIconComponent: <Verified fill={theme.colors.white} />,
    //   name: "코디 뱃지",
    //   href: "/myInfo/badges/",
    // },
    {
      iconComponent: <Link fill={theme.colors.gray.main} />,
      currentIconComponent: <Link fill={theme.colors.white} />,
      nestedParentIconComponent: <Link fill={theme.colors.primary} />,
      name: "멘토 센터",
      href: "/myInfo/mentorCenter/",
      nested: isMentor
        ? [
            { name: "멘토 프로필", href: "/myInfo/mentorCenter/profile/" },
            {
              name: "멘토링 일정 관리",
              href: "/myInfo/mentorCenter/schedule/",
            },
            { name: "멘토링 요청", href: "/myInfo/mentorCenter/apply/" },
          ]
        : [],
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
