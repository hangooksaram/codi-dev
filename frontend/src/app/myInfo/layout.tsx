"use client";
import React from "react";
import SideBar from "@/components/NavBar/SideBar";
import Profile from "@icons/common/profile.svg";
import Verified from "@icons/common/verified.svg";
import Link from "@icons/common/link.svg";
import theme, { device } from "@/ui/theme";
import FlexBox from "@/ui/atoms/FlexBox";
import styled from "@emotion/styled";
import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";

export default function MyInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mentorId = useSelector(selectUser).mentorId;
  const navigators = [
    {
      iconComponent: <Profile fill={theme.colors.gray.main} />,
      currentIconComponent: <Profile fill={theme.colors.white} />,
      name: "마이페이지",
      href: "/myInfo/",
    },
    {
      iconComponent: <Verified fill={theme.colors.gray.main} />,
      currentIconComponent: <Verified fill={theme.colors.white} />,
      name: "코디 뱃지",
      href: "/myInfo/badges/",
    },
    {
      iconComponent: <Link fill={theme.colors.gray.main} />,
      currentIconComponent: <Link fill={theme.colors.white} />,
      nestedParentIconComponent: <Link fill={theme.colors.primary} />,
      name: "멘토 센터",
      href: "/myInfo/mentorCenter/",
      nested: mentorId
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
      <SideBar navigators={navigators} />
      <LayoutWithSideBar>{children}</LayoutWithSideBar>
    </FlexBox>
  );
}
