import Button from "@/ui/atoms/Button";
import Card from "@/ui/atoms/Card";
import FlexBox from "@/ui/atoms/FlexBox";
import theme, { device } from "@/ui/theme";
import styled from "@emotion/styled";
import Home from "@icons/mobile/appbar/home.svg";
import MentorPage from "@icons/mobile/appbar/mentor-page.svg";
import MyCodi from "@icons/mobile/appbar/my-codi.svg";
import MyInfo from "@icons/mobile/appbar/my-info.svg";
import { usePathname, useRouter } from "next/navigation";

const MobileAppBar = () => {
  const router = useRouter();
  const path = usePathname();
  return (
    <StyledMobileAppBar>
      <MobileAppBarContent>
        <FlexBox columnGap="10px">
          {MOBILE_APPBAR_LINKS.map(({ icon: Icon, text, link }, index) => {
            const current = link === "/" ? path === "/" : path.includes(link);
            return (
              <MobileMenuButton
                variant="default"
                key={index}
                onClick={() => router.push(link)}
                selected={current}
              >
                <Icon
                  fill={current ? theme.colors.primary : theme.colors.gray.main}
                />
                {text}
              </MobileMenuButton>
            );
          })}
        </FlexBox>
      </MobileAppBarContent>
    </StyledMobileAppBar>
  );
};

const StyledMobileAppBar = styled.nav({
  width: "100%",
  position: "fixed",
  bottom: "0",
  zIndex: "1",
  height: "128px",
  backgroundColor: theme.colors.background,
  display: "none",
  [device("tablet")]: {
    display: "block",
  },
});

const MobileAppBarContent = styled(Card)({
  width: "94%",
  height: "87px",
  display: "flex",
  margin: "0 auto",
  marginTop: "20px",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: `0px 2px 6px 0px rgba(0, 0, 0, 0.04)`,
  background: theme.colors.white,
});

const MobileMenuButton = styled(Button)(
  ({ selected }: { selected: boolean }) => ({
    width: "69px",
    height: "67px",
    borderRadius: "20px",
    background: selected ? theme.colors.background : theme.colors.white,
    border: "none",
    color: selected ? theme.colors.primary : theme.colors.gray.main,
    fontSize: theme.fonts.size.xs,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px",
  })
);

const MOBILE_APPBAR_LINKS = [
  {
    icon: Home,
    text: "홈",
    link: "/",
  },
  {
    icon: MentorPage,
    text: "멘토 페이지",
    link: "/mentorsMain",
  },
  {
    icon: MyCodi,
    text: "마이코디",
    link: "/myCodi",
  },
  {
    icon: MyInfo,
    text: "내 정보",
    link: "/myInfo",
  },
];
export default MobileAppBar;