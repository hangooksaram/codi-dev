import theme from "@/ui/theme";
import styled from "@emotion/styled";
import Logo from "../../../public/images/logo-primary.svg";
import FlexBox from "@/ui/atoms/Layout/FlexBox";
import Image from "next/image";
import StyledLink from "@/ui/atoms/Button/Link";
import Alarm from "../../../public/icons/alarm.svg";
import Button from "@/ui/atoms/Button/Button";

const StyledAppBar = styled.nav`
  width: 100%;
  position: fixed;
  z-index: 1;
  height: 61px;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray.main};
`;

const AppBarContent = styled(FlexBox)`
  width: 80%;
  align-items: center;
  margin: 10px auto;
  justify-content: space-between;
`;

const AppBarProfile = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 100%;
  background-color: red;
`;

const AppBar = () => {
  return (
    <StyledAppBar>
      <AppBarContent>
        <FlexBox justifyContent="flex-start" columnGap="90px">
          <Logo width="108px" height="26px" />
          <StyledLink href="/">멘토 페이지</StyledLink>
          <StyledLink href="/">마이코디</StyledLink>
        </FlexBox>
        <FlexBox justifyContent="flex-end" columnGap="30px">
          <Alarm />
          <AppBarProfile />
          <Button size="small" variant="default" color={theme.colors.primary}>
            멘토 신청
          </Button>
        </FlexBox>
      </AppBarContent>
    </StyledAppBar>
  );
};

export default AppBar;
