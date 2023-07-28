import { backgroundImage } from "@/ui/atoms/BackgroundImage/BackgroundImage";
import Button from "@/ui/atoms/Button/Button";
import Card from "@/ui/atoms/Card/Card";
import theme from "@/ui/theme";
import styled from "@emotion/styled";
import ProfileTest from "@assets/images/ProfileTest.png";
import FlexBox from "@/ui/atoms/Layout/FlexBox";
import Typography from "@/ui/atoms/Typography/Typography";
import Link from "@icons/common/link.svg";
const ScheduleCard = () => {
  return (
    <StyledCard>
      <Header>06/24 금 12:00</Header>
      <FlexBox justifyContent="space-between">
        <ProfileImage />
        <div>
          <Typography variant="div">윤지영</Typography>
          <Typography variant="div">마라토너</Typography>
        </div>
        <LinkButton width="42px" variant="round">
          <Link />
        </LinkButton>
      </FlexBox>
    </StyledCard>
  );
};

const StyledCard = styled(Card)({
  maxWidth: "237px",
  maxHeight: "130px",
  padding: "10px 20px 20px 20px",
  border: `1px solid ${theme.colors.primary}`,
});

const Header = styled.div`
  height: 33px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  margin-bottom: 13px;
`;

const CircleElement = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 100%;
`;

const ProfileImage = styled(CircleElement)(({}) => ({
  ...backgroundImage(ProfileTest.src),
}));

const LinkButton = styled(Button)`
  min-width: 42px;
`;

export default ScheduleCard;
