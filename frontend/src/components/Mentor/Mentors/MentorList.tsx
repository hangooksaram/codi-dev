import Grid from "@/ui/atoms/Grid";
import theme, { device } from "@/ui/theme";
import { css } from "@emotion/css";
import Card from "@/ui/atoms/Card";
import Typography from "@/ui/atoms/Typography";
import styled from "@emotion/styled";
import FlexBox from "@/ui/atoms/FlexBox";
import ProfileCard from "@/components/Profile/ProfileCard";
import { Mentor } from "@/types/profile";
import Button from "@/ui/atoms/Button";
import { useRouter } from "next/navigation";
import { useGetFavoriteMentorsQuery } from "@/queries/mentorQuery";

const MentorList = ({ mentors }: { mentors: Mentor[] }) => {
  const router = useRouter();
  const { favoriteIds, isSuccess: isFavoritesSuccess } =
    useGetFavoriteMentorsQuery();

  if (mentors.length === 0)
    return (
      <NoResultCard>
        <FlexBox {...{ height: "100%" }}>
          <Typography variant="div" size={theme.fonts.size.sm}>
            앗, 검색결과가 없어요.
          </Typography>
        </FlexBox>
      </NoResultCard>
    );
  return (
    <Grid
      className={css({
        [device("mdWeb")]: {
          gridTemplateColumns:
            "repeat(auto-fill,  minmax(47%, auto)) !important",
        },
        [device("tablet")]: {
          gridTemplateColumns:
            "repeat(auto-fill,  minmax(50%, auto)) !important",
        },
      })}
      gridTemplateColumns="repeat(auto-fill,  minmax(23%, auto))"
      gridAutoRows="477px"
      columnGap="20px"
      rowGap="20px"
    >
      {mentors!.map((mentor) => {
        const { mentorId } = mentor;
        return (
          <ProfileCard key={mentorId} {...mentor}>
            <Button
              onClick={() =>
                router.push(
                  `/mentorProfile?mentorId=${mentorId!}&mentoringApply=${true}`
                )
              }
              size="small"
              variant="default"
              color={theme.colors.secondary}
            >
              멘토프로필 보기
            </Button>
          </ProfileCard>
        );
      })}
    </Grid>
  );
};

const NoResultCard = styled(Card)({
  backgroundColor: theme.colors.background,
  width: "100%",
  maxWidth: "1312px",
  height: "200px",
  border: "none",
});

export default MentorList;
