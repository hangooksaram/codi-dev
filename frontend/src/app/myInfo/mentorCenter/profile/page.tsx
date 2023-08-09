"use client";

import MentorCategoryButton from "@/components/Mentor/MentoringCategoryButton";
import ProfileCard from "@/components/Profile/ProfileCard";
import ProfileLabelText from "@/components/Profile/ProfileLabelText";
import { selectUser } from "@/features/user/userSlice";
import { useGetMentorQuery } from "@/queries/mentorQuery";
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
  const { mentorId } = useSelector(selectUser);
  const { data: mentor, isLoading } = useGetMentorQuery(mentorId!);
  console.log(mentor);
  return (
    <Card color={theme.colors.background} padding="30px" height="auto">
      <FlexBox alignItems="flex-start" columnGap="20px" rowGap="20px">
        <ProfileCard
          name={mentor?.name}
          mentor={true}
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
          <LabelBox text="멘토정보">
            <Grid gridTemplateColumns="1fr 1fr" rowGap="10px">
              <ProfileLabelText name="이름" value="오현재" />
              <ProfileLabelText name="최종학력" value={mentor?.education} />
              <ProfileLabelText name="나이" value="25세" />
              <ProfileLabelText name="직무" value={mentor?.job} />
              <ProfileLabelText name="장애구분" value={mentor?.disability} />
              <ProfileLabelText name="회사명" value={mentor?.company} />
              <ProfileLabelText name="중증도" value={mentor?.severity} />
              <ProfileLabelText name="경력" value={mentor?.career} />
            </Grid>
          </LabelBox>

          <FlexBox justifyContent="flex-start" {...{ marginTop: "60px" }}>
            <LabelBox text="멘토링도구">
              <Chip>{mentor?.desiredJob}</Chip>
            </LabelBox>
            <LabelBox text="멘토링분야">
              {mentor?.mentoringCategories?.map((category, index) => (
                <MentorCategoryButton variant="default">
                  {category}
                </MentorCategoryButton>
              ))}
            </LabelBox>
          </FlexBox>
        </Card>
      </FlexBox>
      <FlexBox columnGap="20px" alignItems="flex-start">
        <Card
          width="313px"
          height="auto"
          className={css`
            min-height: 150px;
            margin-top: 20px;
          `}
        >
          <FlexBox>
            <div>
              <Typography variant="div">멘토링 횟수</Typography>
              <Typography variant="div">123</Typography>
            </div>
            <Divider />
            <div>
              <Typography variant="div">응답률</Typography>
              <Typography variant="div">99%</Typography>
            </div>
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
