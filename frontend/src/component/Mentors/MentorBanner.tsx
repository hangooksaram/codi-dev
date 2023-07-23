import Button from "@/ui/atoms/Button/Button";
import Card from "@/ui/atoms/Card/Card";
import { StyledImage } from "@/ui/atoms/Image/StyledImage";
import FlexBox from "@/ui/atoms/Layout/FlexBox";
import { PageComponentLayout } from "@/ui/atoms/Layout/PageComonentLayout";
import Typography from "@/ui/atoms/Typography/Typography";
import theme from "@/ui/theme";
import styled from "@emotion/styled";

const MentorBanner = ({
  scrollToMentorList,
}: {
  scrollToMentorList: Function;
}) => {
  return (
    <FlexBox {...{ backgroundColor: theme.colors.white }}>
      <FlexBox width="90%" direction="column" rowGap="20px">
        <Typography variant="h1" size={theme.fonts.size.xl}>
          MEET YOUR MENTORS
        </Typography>
        <Typography variant="div">
          나와 같은 장애를 가진 멘토들을 만나보세요!
        </Typography>
        <Button variant="default" onClick={() => scrollToMentorList()}>
          멘토 찾아 보기
        </Button>
      </FlexBox>
      <StyledImage
        width="660px"
        height="400px"
        alt="mentors-page-banner"
        src="/images/mentors-banner-image.png"
      />
    </FlexBox>
  );
};

const StyledMentorBanner = styled.div`
  background-color: ${theme.colors.white};
`;

export default MentorBanner;
