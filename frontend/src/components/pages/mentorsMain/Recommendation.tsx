import theme from "@/ui/theme";
import { PageComponentLayout } from "@/components/pages/mentorsMain/PageComonentLayout";
import styled from "@emotion/styled";
import Logo from "@icons/logo/recommend-icon.svg";
import { useRouter } from "next/navigation";
import TitleSection from "./TitleSection";
import Button from "@/ui/atoms/Button";
import MentorList from "@/components/Mentor/Mentors/MentorList";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import { useJobRanksQuery } from "@/queries/jobQuery";
import { useGetRecommendationMentorsQuery } from "@/queries/mentorQuery";
import ApplyAndShareButtons from "./ApplyAndShareButtons";

const Recommendation = () => {
  const router = useRouter();
  const { id, mentorId } = useSelector(selectUser);
  const { data: jobRanks } = useJobRanksQuery(id!);
  const {
    data: recommendationMentors,
    isSuccess: isRecommendationMentorsSuccess,
  } = useGetRecommendationMentorsQuery({
    disability: jobRanks?.disability!,
    firstJob: jobRanks?.infos[0].job!,
    secondJob: jobRanks?.infos[1]?.job! ?? "",
    thirdJob: jobRanks?.infos[2]?.job! ?? "",
  });
  return (
    <PageComponentLayout>
      <TitleSection
        logo={<Logo />}
        title="추천멘토"
        description="다양한 분야에서 꿈을 펼치고 있는 멘토들을 만나보세요!"
      />
      {isRecommendationMentorsSuccess && (
        <MentorList mentors={recommendationMentors} />
      )}

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
      <ApplyAndShareButtons />
    </PageComponentLayout>
  );
};

const MoreMentorsButton = styled(Button)({
  fontWeight: theme.fonts.weight.black,
});

export default Recommendation;
