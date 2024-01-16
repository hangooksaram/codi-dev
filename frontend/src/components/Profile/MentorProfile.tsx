"use client";

import Card from "@/ui/atoms/Card";
import FlexBox from "@/ui/atoms/FlexBox";
import theme, { device } from "@/ui/theme";
import ProfileCard, { Footer } from "./ProfileCard";
import LabelBox from "@/ui/molecules/LabelBox";
import Grid from "@/ui/atoms/Grid";
import ProfileLabelText from "./ProfileLabelText";
import { MENTOR_CATEGORIES } from "../Mentoring/MentoringCategory/MentoringCategoriesSelector";
import MentorCategoryButton from "../Mentoring/MentoringCategory/MentoringCategoryButton";
import { css } from "@emotion/css";
import Typography from "@/ui/atoms/Typography";
import styled from "@emotion/styled";
import { useGetMentorQuery } from "@/queries/mentorQuery";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import Button from "@/ui/atoms/Button";
import MyInfoCommonContainerCard from "../pages/myInfoCommon/MyInfoCommonContainerCard";
import MyInfoCard from "../pages/myInfoCommon/MyInfoCard";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";

import Content from "./ProfileCard/Content";
import { ReactNode } from "react";
import { Mentor } from "@/types/profile";

const MentorProfile = ({
  mentor,
  children,
}: {
  mentor?: Mentor;
  children?: ReactNode;
}) => {
  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="flex-start"
      columnGap="20px"
      rowGap="20px"
      {...{
        [device("tablet")]: {
          flexDirection: "column",
        },
      }}
    >
      {children}

      <MyInfoCard>
        <FlexBox
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          rowGap="60px"
        >
          <LabelBox text="멘토정보">
            <Grid
              gridTemplateColumns="repeat(auto-fit, minmax(300px, 2fr))"
              rowGap="10px"
            >
              <ProfileLabelText name="이름" value={mentor?.name} />
              <ProfileLabelText name="최종학력" value={mentor?.education} />
              <ProfileLabelText
                name="나이"
                value={`${mentor?.age?.toString()}세`}
              />
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
                <MentorCategoryButton
                  variant="default"
                  key={text}
                  hoverDisabled
                >
                  <IconComponent fill={theme.colors.primary} />
                  {text}
                </MentorCategoryButton>
              ))}
            </FlexBox>
          </LabelBox>
          <LabelBox text="자기소개">
            <Typography variant="div">{mentor?.introduction!}</Typography>
          </LabelBox>
        </FlexBox>
      </MyInfoCard>
    </FlexBox>
  );
};
const Divider = styled.div`
  width: 4px;
  height: 130px;
  border-radius: 4px;
  background: ${theme.colors.background};
`;

export default MentorProfile;
