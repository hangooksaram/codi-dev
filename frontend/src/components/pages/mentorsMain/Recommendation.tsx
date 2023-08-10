import FlexBox from "@/ui/atoms/FlexBox";
import theme from "@/ui/theme";
import { PageComponentLayout } from "@/components/pages/mentorsMain/PageComonentLayout";
import styled from "@emotion/styled";
import Logo from "@icons/logo/recommend-icon.svg";
import { useRouter } from "next/navigation";
import TitleSection from "./TitleSection";
import { StyledImage } from "@/ui/atoms/StyledImage";
import Button from "@/ui/atoms/Button";
import { Mentor } from "@/types/profile";
import MentorList from "@/components/Mentor/Mentors/MentorList";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";

const Recommendation = ({ mentors }: { mentors: Mentor[] }) => {
  const router = useRouter();
  const user = useSelector(selectUser).id;
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
      {!user && (
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
