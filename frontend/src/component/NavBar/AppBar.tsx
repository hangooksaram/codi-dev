import theme from "@/ui/theme";
import styled from "@emotion/styled";
import Logo from "@icons/logo/logo-primary.svg";
import FlexBox from "@/ui/atoms/FlexBox";
import Image from "next/image";
import StyledLink from "@/ui/atoms/Link";
import Alarm from "@icons/common/alarm.svg";
import Button from "@/ui/atoms/Button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { isUser } from "@/utils/tempUser";
import Typography from "@/ui/atoms/Typography";
import Link from "next/link";
import Profile from "@icons/common/profile.svg";
const StyledAppBar = styled.nav`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  height: 59px;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray.main};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppBarContent = styled(FlexBox)`
  width: 90%;
  align-items: center;

  justify-content: space-between;
`;

const AppBarProfile = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.gray.light};
  border-radius: 100%;
`;

const AppBar = () => {
  const path = usePathname();
  const router = useRouter();

  if (path === "/signin/") return;
  return (
    <StyledAppBar>
      <AppBarContent>
        <FlexBox justifyContent="flex-start" columnGap="90px">
          <Link href={"/"}>
            <Logo width="108px" height="26px" />
          </Link>
          <StyledLink href="/mentors">멘토 페이지</StyledLink>
          <StyledLink href="/">마이코디</StyledLink>
        </FlexBox>
        {isUser() ? (
          <FlexBox justifyContent="flex-end" columnGap="30px">
            <Alarm />
            <AppBarProfile>
              <Profile />
            </AppBarProfile>
            <Button
              size="small"
              variant="default"
              color={theme.colors.primary}
              {...{ height: "39px" }}
              onClick={() => router.push("/mentorApplyForm")}
            >
              멘토 신청
            </Button>
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
  );
};

export default AppBar;
