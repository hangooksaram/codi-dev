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
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import Typography from "@/ui/atoms/Typography";
import Button from "@/ui/atoms/Button";
import { useRouter } from "next/navigation";

export default function MyCodiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = useSelector(selectUser).id;
  const router = useRouter();

  return (
    <FlexBox justifyContent="flex-start" alignItems="flex-start">
      <SideBar navigators={navigators} />
      <LayoutWithSideBar>
        {userId ? (
          children
        ) : (
          <FlexBox direction="column" rowGap="20px">
            <Typography
              variant="span"
              color={theme.colors.gray.dark}
              {...{ marginRight: "10px" }}
            >
              아직 아이디가 없어요
            </Typography>
            <Button
              size="small"
              onClick={() => router.push("/signup")}
              variant="default"
            >
              회원가입 하러 가기
            </Button>
          </FlexBox>
        )}
      </LayoutWithSideBar>
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
