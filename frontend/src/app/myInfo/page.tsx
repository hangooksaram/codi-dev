"use client";

import ProfileCard from "@/components/Profile/ProfileCard";
import ProfileLabelText from "@/components/Profile/ProfileLabelText";
import { selectUser } from "@/features/user/userSlice";
import useGetProfileQuery from "@/queries/profileQuery";
import { MenteeProfile } from "@/types/profile";
import Button from "@/ui/atoms/Button";
import Card from "@/ui/atoms/Card";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import Grid from "@/ui/atoms/Grid";
import { FormLabel } from "@/ui/atoms/Label";
import Typography from "@/ui/atoms/Typography";
import LabelBox from "@/ui/molecules/LabelBox";

import theme from "@/ui/theme";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const MyInfoPage = () => {
  const profileId = useSelector(selectUser).profileId;
  const { data: profile, isLoading, isError } = useGetProfileQuery(profileId!);

  const router = useRouter();

  if (isLoading) {
    if (profileId === null) {
      return (
        <FlexBox direction="column" rowGap="30px">
          <Typography variant="div" color={theme.colors.gray.main}>
            아직 프로필이 작성되지 않았습니다.
          </Typography>
          <Button variant="default" onClick={() => router.push("/profileForm")}>
            프로필 작성하러 가기
          </Button>
        </FlexBox>
      );
    }
    return <>로딩 중</>;
  }
  if (isError) {
    return <>error</>;
  }

  return (
    <Card color={theme.colors.background} padding="30px" height="auto">
      <FlexBox alignItems="flex-start" columnGap="20px" rowGap="20px">
        <ProfileCard
          edit
          name="이름"
          imgUrl={profile?.imgUrl}
          employmentStatus={profile?.employmentStatus}
          width="313px"
          height="477px"
        />
        <Card
          padding="45px 0px 0px 45px"
          className={css`
            min-height: 477px;
          `}
        >
          <LabelBox text="멘티정보">
            <Grid gridTemplateColumns="1fr 1fr" rowGap="10px">
              <ProfileLabelText name="이름" value="오현재" />
              <ProfileLabelText name="최종학력" value={profile?.education} />
              <ProfileLabelText name="나이" value={"25세"} />
              <ProfileLabelText name="희망직무" value={profile?.desiredJob} />
              <ProfileLabelText name="장애구분" value={profile?.disability} />
              <ProfileLabelText
                name="취업상태"
                value={profile?.employmentStatus}
              />
              <ProfileLabelText name="중증도" value={profile?.severity} />
            </Grid>
          </LabelBox>

          <FlexBox justifyContent="flex-start" {...{ marginTop: "60px" }}>
            <LabelBox text="희망직무" width="50%">
              <Chip>{profile?.desiredJob}</Chip>
            </LabelBox>
            <LabelBox text="태그" width="50%">
              <FlexBox justifyContent="flex-start" columnGap="10px">
                <Chip>{profile?.disability}</Chip>
                <Chip>{profile?.severity}</Chip>
              </FlexBox>
            </LabelBox>
          </FlexBox>
        </Card>
      </FlexBox>
      <Card
        height="auto"
        padding="45px 0px 0px 45px"
        className={css`
          min-height: 261px;
          margin-top: 20px;
        `}
      >
        <LabelBox text="자기소개">
          <p>{profile?.introduction}</p>
        </LabelBox>
      </Card>
    </Card>
  );
};

export default MyInfoPage;
