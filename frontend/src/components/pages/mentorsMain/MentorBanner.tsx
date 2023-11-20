import Button from "@/ui/atoms/Button";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import theme, { device } from "@/ui/theme";
import styled from "@emotion/styled";
import StyledImage from "@/ui/atoms/StyledImage";
import { css } from "@emotion/css";
import ImageComponent from "@/ui/atoms/ImageComponent";
import mentorsBannerImage from "@images/mentors-banner-image.png";

const MentorBanner = ({
  scrollToMentorList,
}: {
  scrollToMentorList: Function;
}) => {
  return (
    <FlexBox
      {...{
        backgroundColor: theme.colors.white,
        [device("tablet")]: {
          flexDirection: "column-reverse",
          rowGap: "10px",
        },
      }}
    >
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

      <ImageComponent
        width="660px"
        height="400px"
        alt="mentors-page-banner"
        src={mentorsBannerImage}
      />
    </FlexBox>
  );
};

const StyledMentorBanner = styled.div`
  background-color: ${theme.colors.white};
`;

export default MentorBanner;
