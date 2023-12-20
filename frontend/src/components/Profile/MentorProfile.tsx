"use client";

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
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import Button from "@/ui/atoms/Button";
import MyInfoCommonContainerCard from "../pages/myInfoCommon/MyInfoCommonContainerCard";
import MyInfoCard from "../pages/myInfoCommon/MyInfoCard";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";

const MentorProfile = ({
  mentorId,
  pageParams,
  isMyPage,
}: {
  mentorId?: number;
  pageParams?: ReadonlyURLSearchParams;
  isMyPage?: boolean;
}) => {
  const { data: mentor, isSuccess } = useGetMentorQuery(mentorId);
  const router = useRouter();
  const isMentoringApply = pageParams?.get("mentoringApply");
  const isMentoring = pageParams?.get("mentoringId");
  const { id } = useSelector(selectUser);

  return (
    <MyInfoCommonContainerCard>
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
        {isSuccess && (
          <ProfileCard
            width="313px"
            height="477px"
            isMentorProfile={true}
            link={`/mentorRegisterForm?edit=${true}`}
            edit={isMentoringApply || isMentoring ? false : true}
            isMyPage={isMyPage}
            {...mentor}
          >
            {isMentoringApply ? (
              <Button
                onClick={() =>
                  router.push(`/mentoringApplyForm?mentorId=${mentorId}`)
                }
                size="small"
                variant="default"
                color={theme.colors.secondary}
              >
                멘토링 신청하기
              </Button>
            ) : null}
          </ProfileCard>
        )}

        <MyInfoCard
          className={css({
            minHeight: "477px",
          })}
        >
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
          </FlexBox>
        </MyInfoCard>
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
        <MyInfoCard
          width="100%"
          height="auto"
          className={css`
            min-height: 261px;
            margin-top: 20px;
          `}
        >
          <LabelBox text="자기소개">
            <Typography variant="div">{mentor?.introduction!}</Typography>
          </LabelBox>
        </MyInfoCard>
      </FlexBox>
    </MyInfoCommonContainerCard>
  );
};
const Divider = styled.div`
  width: 4px;
  height: 130px;
  border-radius: 4px;
  background: ${theme.colors.background};
`;

export default MentorProfile;
