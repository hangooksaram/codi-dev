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

const NOT_SHOWING_LIST = ["/signin/", "/account/findId/", "/account/findPw/"];

const AppBar = () => {
  const path = usePathname();
  const router = useRouter();

  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  if (NOT_SHOWING_LIST.includes(path)) return;

  return (
    <>
      <StyledAppBar>
        <AppBarContent>
          <FlexBox justifyContent="flex-start" columnGap="90px">
            <Link href={"/"}>
              <Logo width="108px" height="26px" />
            </Link>
            <StyledLink href="/mentorsMain">멘토 페이지</StyledLink>
            <StyledLink href="/myCodi">마이코디</StyledLink>
          </FlexBox>
          {auth?.isLoggedIn && user.id && <AppBarProfile />}
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
        </AppBarContent>
      </StyledAppBar>
      <MobileAppBar />
    </>
  );
};

const StyledAppBar = styled.nav({
  width: "100%",
  position: "sticky",
  top: "0",
  zIndex: "999",
  height: "59px",
  backgroundColor: theme.colors.white,
  borderBottom: `1px solid ${theme.colors.gray.main}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [device("smWeb")]: {
    display: "none",
  },
});

const AppBarContent = styled(FlexBox)({
  width: "90%",
  alignItems: "center",
  justifyContent: "space-between",
});

export default AppBar;
