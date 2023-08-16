"use client";
import React from "react";
import SideBar from "@/components/NavBar/SideBar";
import Profile from "@icons/common/profile.svg";
import Verified from "@icons/common/verified.svg";
import Link from "@icons/common/link.svg";
import theme from "@/ui/theme";
import FlexBox from "@/ui/atoms/FlexBox";
import styled from "@emotion/styled";
import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";

export default function MyCodiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlexBox justifyContent="flex-start" alignItems="flex-start">
      <SideBar navigators={navigators} />
      <LayoutWithSideBar>{children}</LayoutWithSideBar>
    </FlexBox>
  );
}

const navigators = [
  {
    iconComponent: <Profile fill={theme.colors.gray.main} />,
    currentIconComponent: <Profile fill={theme.colors.white} />,
    name: "멘토링 일정 관리",
    href: "/myCodi/",
  },
  {
    iconComponent: <Verified fill={theme.colors.gray.main} />,
    currentIconComponent: <Verified fill={theme.colors.white} />,
    name: "관심 멘토",
    href: "/myCodi/favorites/",
  },
];
