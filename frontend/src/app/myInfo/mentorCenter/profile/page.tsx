"use client";

import { MENTOR_CATEGORIES } from "@/components/Mentoring/MentoringCategory/MentoringCategoriesSelector";
import MentorCategoryButton from "@/components/Mentoring/MentoringCategory/MentoringCategoryButton";
import ProfileCard from "@/components/Profile/ProfileCard";
import ProfileLabelText from "@/components/Profile/ProfileLabelText";
import { selectUser } from "@/features/user/userSlice";
import { useGetMentorQuery } from "@/queries/mentorQuery";
import useGetProfileQuery from "@/queries/profileQuery";
import Card from "@/ui/atoms/Card";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import Grid from "@/ui/atoms/Grid";
import Typography from "@/ui/atoms/Typography";
import LabelBox from "@/ui/molecules/LabelBox";
import theme from "@/ui/theme";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const MentorProfilePage = () => {
  const { mentorId, profileId } = useSelector(selectUser);
  const { data: mentor, isLoading } = useGetMentorQuery(mentorId!);

  return (
    <Card color={theme.colors.background} padding="30px" height="auto">
      <FlexBox alignItems="flex-start" columnGap="20px" rowGap="20px">
        <ProfileCard
          name={mentor?.name}
          mentor={true}
          star={mentor?.star}
          mentees={mentor?.mentees}
          disability={mentor?.disability}
          desiredJob={mentor?.desiredJob}
          imgUrl={mentor?.imgUrl}
          width="313px"
          height="477px"
        />
        <Card
          padding="45px 0px 0px 45px"
          className={css`
            min-height: 477px;
          `}
        >
          <FlexBox
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            rowGap="60px"
          >
            <LabelBox text="멘토정보">
              <Grid gridTemplateColumns="1fr 1fr" rowGap="10px">
                <ProfileLabelText name="이름" value="오현재" />
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
              >
                {MENTOR_CATEGORIES.filter((category) =>
                  mentor?.mentoringCategories?.find((c) => c === category.text)
                ).map(({ text, iconComponent: IconComponent }) => (
                  <MentorCategoryButton variant="default">
                    <IconComponent fill={theme.colors.primary} />
                    {text}
                  </MentorCategoryButton>
                ))}
              </FlexBox>
            </LabelBox>
          </FlexBox>
        </Card>
      </FlexBox>
      <FlexBox columnGap="20px" alignItems="flex-start">
        <Card
          width="313px"
          height="150px"
          className={css`
            min-height: 150px;
            margin-top: 20px;
          `}
        >
          <FlexBox
            alignItems="center"
            {...{ height: "100%" }}
            justifyContent="space-between"
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

export default MentorProfilePage;
