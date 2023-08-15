import Card from "@/ui/atoms/Card";
import FlexBox from "@/ui/atoms/FlexBox";
import theme, { device } from "@/ui/theme";
import ProfileCard from "./ProfileCard";
import LabelBox from "@/ui/molecules/LabelBox";
import Grid from "@/ui/atoms/Grid";
import ProfileLabelText from "./ProfileLabelText";
import { MENTOR_CATEGORIES } from "../Mentoring/MentoringCategory/MentoringCategoriesSelector";
import MentorCategoryButton from "../Mentoring/MentoringCategory/MentoringCategoryButton";
import { css } from "@emotion/css";
import Typography from "@/ui/atoms/Typography";
import styled from "@emotion/styled";
import { useGetMentorQuery } from "@/queries/mentorQuery";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/ui/atoms/Button";

const MentorProfile = ({ mentorId }: { mentorId: number }) => {
  const { data: mentor } = useGetMentorQuery(mentorId!);
  const router = useRouter();
  const param = useSearchParams();
  const isMentoringApply = param.get("mentoring");
  return (
    <Card color={theme.colors.background} padding="30px" height="auto">
      <FlexBox
        alignItems="flex-start"
        columnGap="20px"
        rowGap="20px"
        {...{
          [device("tablet")]: {
            flexDirection: "column",
          },
        }}
      >
        <ProfileCard
          edit={isMentoringApply ? false : true}
          name={mentor?.name}
          mentor={true}
          star={mentor?.star}
          mentees={mentor?.mentees}
          disability={mentor?.disability}
          severity={mentor?.severity}
          desiredJob={mentor?.desiredJob}
          imgUrl={mentor?.imgUrl}
          width="313px"
          height="477px"
          link={`/mentorRegisterForm?edit=${true}&company=${
            mentor?.company
          }&introduction=${mentor?.introduction}&jobName=${
            mentor?.jobName
          }&job=${mentor?.job}&career=${mentor?.career}&inOffice=${
            mentor?.inOffice
          }&mentoringCategories=${mentor?.mentoringCategories}`}
        >
          {isMentoringApply ? (
            <Button
              onClick={() => router.push(`/mentoringApplyForm/${mentorId}`)}
              size="small"
              variant="default"
              color={theme.colors.secondary}
            >
              멘토링 신청하기
            </Button>
          ) : null}
        </ProfileCard>
        <Card
          padding="45px 0px 0px 45px"
          className={css({
            minHeight: "477px",
            [device("tablet")]: {
              padding: "30px !important",
            },
          })}
        >
          <FlexBox
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            rowGap="60px"
          >
            <LabelBox text="멘토정보">
              <Grid gridTemplateColumns="1fr 1fr" rowGap="10px">
                <ProfileLabelText name="이름" value={mentor?.name} />
                <ProfileLabelText name="최종학력" value={mentor?.education} />
                <ProfileLabelText name="나이" value={"1"} />
                <ProfileLabelText name="직무" value={mentor?.job} />
                <ProfileLabelText name="장애구분" value={mentor?.disability} />
                <ProfileLabelText name="회사명" value={mentor?.company} />
                <ProfileLabelText name="중증도" value={mentor?.severity} />
                <ProfileLabelText name="경력" value={mentor?.career} />
              </Grid>
            </LabelBox>

            <LabelBox text="멘토링분야">
              <FlexBox
                justifyContent="flex-start"
                alignItems="center"
                columnGap="10px"
                {...{
                  [device("tablet")]: {
                    rowGap: "10px",
                    flexWrap: "wrap",
                  },
                }}
              >
                {MENTOR_CATEGORIES.filter((category) =>
                  mentor?.mentoringCategories?.find((c) => c === category.text)
                ).map(({ text, iconComponent: IconComponent }) => (
                  <MentorCategoryButton variant="default" key={text}>
                    <IconComponent fill={theme.colors.primary} />
                    {text}
                  </MentorCategoryButton>
                ))}
              </FlexBox>
            </LabelBox>
          </FlexBox>
        </Card>
      </FlexBox>
      <FlexBox
        columnGap="20px"
        alignItems="flex-start"
        {...{
          [device("tablet")]: {
            flexDirection: "column",
          },
        }}
      >
        <Card
          width="313px"
          height="150px"
          className={css({
            minHeight: "150px",
            marginTop: "20px",
            [device("tablet")]: {
              width: "100%",
            },
          })}
        >
          <FlexBox
            alignItems="center"
            justifyContent="space-between"
            {...{
              height: "100%",
              [device("tablet")]: {
                width: "90%",
              },
            }}
          >
            {[
              { text: "멘토링 횟수", value: "0회" },
              { text: "응답률", value: "0%" },
            ].map(({ text, value }, index) => (
              <>
                <FlexBox direction="column" rowGap="10px" key={index}>
                  <Typography variant="div" color={theme.colors.gray.main}>
                    {text}
                  </Typography>
                  <Typography
                    variant="div"
                    size={theme.fonts.size.md}
                    color={theme.colors.primary}
                    weight={theme.fonts.weight.extraBold}
                  >
                    {value}
                  </Typography>
                </FlexBox>
                {index === 0 ?? <Divider />}
              </>
            ))}
          </FlexBox>
        </Card>
        <Card
          width="100%"
          height="auto"
          padding="45px 0px 0px 45px"
          className={css`
            min-height: 261px;
            margin-top: 20px;
          `}
        >
          <LabelBox text="자기소개">
            <p>{mentor?.introduction}</p>
          </LabelBox>
        </Card>
      </FlexBox>
    </Card>
  );
};
const Divider = styled.div`
  width: 4px;
  height: 130px;
  border-radius: 4px;
  background: ${theme.colors.background};
`;

export default MentorProfile;
