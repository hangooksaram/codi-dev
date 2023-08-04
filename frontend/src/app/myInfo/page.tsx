"use client";

import ProfileCard from "@/components/Profile/ProfileCard";
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

const MyInfoPage = () => {
  return (
    <Card color={theme.colors.background} padding="30px" height="auto">
      <FlexBox alignItems="flex-start" columnGap="20px" rowGap="20px">
        <ProfileCard
          edit
          name={name}
          desiredJob={desiredJob}
          imgUrl={imgUrl}
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
              {data.map(({ name, value }, index) => (
                <FlexBox key={index} justifyContent="flex-start">
                  <Typography
                    variant="div"
                    color={theme.colors.gray.main}
                    {...{ minWidth: "96px" }}
                  >
                    {name}
                  </Typography>
                  <Typography variant="div">{value}</Typography>
                </FlexBox>
              ))}
            </Grid>
          </LabelBox>

          <FlexBox justifyContent="flex-start" {...{ marginTop: "60px" }}>
            <LabelBox text="희망직무" width="50%">
              <Chip>{desiredJob}</Chip>
            </LabelBox>
            <LabelBox text="태그" width="50%">
              <Chip>{disability}</Chip>
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
          <p>{introduction}</p>
        </LabelBox>
      </Card>
    </Card>
  );
};
const mock = {
  imgUrl:
    "https://codi-image-s3-bucket.s3.ap-northeast-2.amazonaws.com/profile/test1.png",
  name: "오현재",
  desiredJob: "오오오",
  age: "23",
  education: "ff",
  disability: "ff",
  serverity: "ff",
  introduction: "fff",
};

const {
  imgUrl,
  name,
  desiredJob,
  age,
  education,
  disability,
  serverity,
  introduction,
} = mock;

const data = [
  {
    name: "이름",
    value: name,
  },
  {
    name: "최종학력",
    value: education,
  },
  {
    name: "나이",
    value: age,
  },
  {
    name: "희망직무",
    value: desiredJob,
  },
  {
    name: "장애구분",
    value: disability,
  },
  {
    name: "중증도",
    value: serverity,
  },
];
export default MyInfoPage;
