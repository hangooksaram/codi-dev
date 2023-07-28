import FlexBox from "@/ui/atoms/FlexBox";
import ProfileCard from "../Profile/ProfileCard";
import theme from "@/ui/theme";
import { PageComponentLayout } from "@/ui/molecules/Layout/PageComonentLayout";
import { Mentor } from "@/types/mentor";
import Grid from "@/ui/atoms/Grid";
import Typography from "@/ui/atoms/Typography";
import styled from "@emotion/styled";
import Button from "@/ui/atoms";
import Logo from "@icons/common/recommend-icon.svg";
import { isUser } from "@/utils/tempUser";
import { StyledImage } from "@/ui/atoms/Image/StyledImage";
import { useRouter } from "next/navigation";
import TitleSection from "./TitleSection";
import MentorList from "./MentorList";

const Recommendation = ({ mentors }: { mentors: Mentor[] }) => {
  const router = useRouter();
  return (
    <PageComponentLayout>
      <TitleSection
        logo={<Logo />}
        title="추천멘토"
        description="다양한 분야에서 꿈을 펼치고 있는 멘토들을 만나보세요!"
      />
      <MentorList mentors={mentors} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <MoreMentorsButton variant="default" color={theme.colors.primary}>
          멘토전체보기
        </MoreMentorsButton>
      </div>
      {!isUser() && (
        <FlexBox>
          <StyledImage
            width="651px"
            height="251px"
            src="/images/main-mentor-apply.png"
            alt="apply-button"
            {...{ cursor: "pointer" }}
            onClick={() => router.push("/signup")}
          />

          <StyledImage
            width="651px"
            height="251px"
            src="/images/main-mentor-recommend.png"
            alt="recommend-button"
            {...{ cursor: "pointer" }}
          />
        </FlexBox>
      )}
    </PageComponentLayout>
  );
};

const MoreMentorsButton = styled(Button)({
  fontWeight: theme.fonts.weight.black,
});

export default Recommendation;
