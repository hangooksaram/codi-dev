import theme, { device } from "@/ui/theme";
import styled from "@emotion/styled";
import Logo from "@icons/logo/logo-primary.svg";
import FlexBox from "@/ui/atoms/FlexBox";
import StyledLink from "@/ui/atoms/Link";
import Alarm from "@icons/common/alarm.svg";
import Button from "@/ui/atoms/Button";
import { usePathname, useRouter } from "next/navigation";
import Typography from "@/ui/atoms/Typography";
import Link from "next/link";
import Profile from "@icons/common/profile.svg";
import { useEffect, useState } from "react";
import Dropdown from "@/ui/atoms/Dropdown";
import { PROFILE_MENU } from "@/constants";
import MobileAppBar from "./MobileAppBar";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import { backgroundImage } from "@/ui/atoms/BackgroundImage";
import { signOut } from "@/api/signApi";

const NOT_SHOWING_LIST = ["/signin/", "/account/findId/", "/account/findPw/"];

const AppBar = () => {
  const path = usePathname();
  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);
  const [selected, setSelected] = useState();
  const user = useSelector(selectUser);

  const goToApply = () => {
    if (!user?.isProfile)
      alert(
        "아직 프로필이 작성되어있지 않습니다. 프로필 작성 페이지로 이동하시겠습니까?"
      );
    router.push("/mentorRegisterForm");
  };

  useEffect(() => {
    console.log("this iss user", user);
    setDomLoaded(true);
    if (selected) {
      if (selected === "로그아웃") {
        signOut();
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else
        router.push(
          PROFILE_MENU(user.isProfile!).find((menu) => menu.name === selected)!
            .href!
        );
    }
    return () => setSelected(undefined);
  }, [selected]);

  if (NOT_SHOWING_LIST.includes(path)) return;

  return (
    domLoaded && (
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
            {user?.id ? (
              <FlexBox justifyContent="flex-end" columnGap="30px">
                <Alarm />
                <Dropdown
                  type="menu"
                  categories={PROFILE_MENU(user.isProfile !== null).map(
                    ({ name }) => name
                  )}
                  selectedCategory={selected!}
                  setSelectedCategory={setSelected}
                  left
                >
                  {user.profileImage ? (
                    <AppBarProfile src={user.profileImage!} />
                  ) : (
                    <AppBarProfile>
                      <Profile fill={theme.colors.white} />
                    </AppBarProfile>
                  )}
                </Dropdown>
                {!user.isMentor ? (
                  <Button
                    size="small"
                    variant="default"
                    color={theme.colors.primary}
                    {...{ height: "39px" }}
                    onClick={() => goToApply()}
                  >
                    멘토 신청
                  </Button>
                ) : null}
              </FlexBox>
            ) : (
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
    )
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

const AppBarProfile = styled.div(({ src }: { src?: string }) => ({
  ...backgroundImage(src!),
  width: "42px",
  height: "42px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: `${theme.colors.gray.light}`,
  borderRadius: "100%",
}));

export default AppBar;
