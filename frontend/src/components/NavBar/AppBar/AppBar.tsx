"use client";

import theme, { device } from "@/ui/theme";
import styled from "@emotion/styled";
import Logo from "@icons/logo/logo-primary.svg";
import FlexBox from "@/ui/atoms/FlexBox";
import StyledLink from "@/ui/atoms/Link";
import Button from "@/ui/atoms/Button";
import { usePathname, useRouter } from "next/navigation";
import Typography from "@/ui/atoms/Typography";
import Link from "next/link";
import MobileAppBar from "./MobileAppBar";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import AppBarProfile from "../../Profile/AppBarProfile";
import { selectAuth } from "@/features/auth/authSlice";
import Notification from "../Notification/Notification";
import { TopNavigator } from "@/ui/atoms/Navigator";

const NOT_SHOWING_LIST = ["/signin/", "/account/findId/", "/account/findPw/"];

const AppBar = () => {
  const path = usePathname();
  const router = useRouter();

  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  const goToApply = () => {
    if (!user?.isProfile)
      alert(
        "아직 프로필이 작성되어있지 않습니다. 프로필 작성 페이지로 이동하시겠습니까?"
      );
    router.push("/mentorRegisterForm");
  };

  if (NOT_SHOWING_LIST.includes(path)) return;

  return (
    <>
      <StyledAppBar>
        <FlexBox justifyContent="space-between" {...{ height: "100%" }}>
          <Link href={"/"}>
            <Logo width="108px" height="26px" />
          </Link>

          <TopNavigator
            current={path.includes("/mentorsMain")}
            href="/mentorsMain"
          >
            멘토 찾기
          </TopNavigator>
          <TopNavigator current={path.includes("/myCodi")} href="/myCodi">
            멘티 센터
          </TopNavigator>
          <Notification />
        </FlexBox>
        {auth?.isLoggedIn && user.id && (
          <FlexBox justifyContent="flex-end" columnGap="30px">
            {user.isMentor && (
              <Button
                size="small"
                variant="default"
                color={theme.colors.primary}
                {...{ height: "39px" }}
                onClick={() => router.push("/mentorCenter")}
              >
                멘토 센터
              </Button>
            )}
            <Notification />
            <AppBarProfile />
            {!user.isMentor && (
              <Button
                size="small"
                variant="default"
                color={theme.colors.primary}
                {...{ height: "39px" }}
                onClick={() => goToApply()}
              >
                멘토 신청
              </Button>
            )}
          </FlexBox>
        )}
        {auth?.isLoggedIn === false && (
          <FlexBox justifyContent="flex-end" columnGap="30px">
            <StyledLink href="/signup">
              아이디가 없으신가요?
              <Typography
                variant="span"
                size={theme.fonts.size.sm}
                weight={theme.fonts.weight.bold}
                {...{ marginLeft: "4px" }}
              >
                회원가입
              </Typography>
            </StyledLink>
            <Button
              size="small"
              variant="default"
              color={theme.colors.primary}
              {...{ height: "39px" }}
              onClick={() => router.push("/signin")}
            >
              로그인
            </Button>
          </FlexBox>
        )}
      </StyledAppBar>
      <MobileAppBar />
    </>
  );
};

const StyledAppBar = styled.nav({
  width: "100%",
  padding: "0px 15.8%",
  position: "sticky",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  top: "0",
  zIndex: "999",
  height: "59px",
  backgroundColor: theme.colors.white,
  borderBottom: `1px solid ${theme.colors.gray.main}`,

  [device("smWeb")]: {
    display: "none",
  },
});

export default AppBar;
