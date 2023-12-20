"use client";

import ProfileCard from "@/components/Profile/ProfileCard";
import {
  useMentoringAcceptMutation,
  useMentoringRejectMutation,
} from "@/queries/mentoring/mentorMentoringQuery";
import { GetMentoringAppliesResponseData } from "@/types/api/mentoring";
import Button from "@/ui/atoms/Button";
import Card from "@/ui/atoms/Card";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import LabelBox from "@/ui/molecules/LabelBox";
import theme, { device } from "@/ui/theme";
import { css } from "@emotion/css";
import { useRouter } from "next/navigation";
import MyInfoCard from "../myInfoCommon/MyInfoCard";

const MentorCenterApplyCard = ({
  mentoringId,
  applicationDate,
  menteeInfo,
  applicationReason,
}: GetMentoringAppliesResponseData) => {
  const router = useRouter();
  const { profileId } = menteeInfo;
  const acceptMutation = useMentoringAcceptMutation(mentoringId!);
  const rejectMutation = useMentoringRejectMutation(mentoringId!);
  return (
    <FlexBox
      justifyContent="space-between"
      columnGap="20px"
      {...{
        [device("tablet")]: {
          flexDirection: "column",
          rowGap: "20px",
        },
      }}
    >
      <div
        className={css({
          [device("tablet")]: {
            width: "100%",
          },
        })}
      >
        <ProfileCard
          width="293px"
          height="400px"
          isMentorProfile={false}
          edit={false}
          {...menteeInfo}
        />
      </div>
      <MyInfoCard width="100%" height="400px" padding="45px !important">
        <FlexBox
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          {...{ height: "100%" }}
        >
          <FlexBox direction="column" alignItems="flex-start" rowGap="40px">
            <LabelBox text="신청일자" width="50%">
              <Chip>{applicationDate}</Chip>
            </LabelBox>

            <div className={css({ gridColumnEnd: 2 })}>
              <LabelBox text="하고 싶은 말">
                <Typography variant="div">{applicationReason}</Typography>
              </LabelBox>
            </div>
          </FlexBox>

          <FlexBox
            justifyContent="space-between"
            {...{
              [device("tablet")]: {
                flexDirection: "column",
                rowGap: "10px",
              },
            }}
          >
            <Button
              size="small"
              color={theme.colors.secondary}
              variant="default"
              onClick={() =>
                router.push(
                  `/mentoringAppliedMenteeProfile?profileId=${profileId}&mentoringApply=${true}&mentoringId=${mentoringId}`
                )
              }
              {...{
                [device("tablet")]: {
                  width: "100%",
                },
              }}
            >
              멘티 프로필 보기
            </Button>
            <FlexBox
              width="fit-content"
              {...{
                [device("tablet")]: {
                  width: "100%",
                },
              }}
            >
              <Button
                size="small"
                color={theme.colors.primary}
                variant="default"
                {...{
                  marginRight: "24px",
                  [device("tablet")]: {
                    width: "100%",
                  },
                }}
                onClick={() => acceptMutation.mutate()}
              >
                수락
              </Button>
              <Button
                size="small"
                color={theme.colors.white}
                outline
                variant="default"
                onClick={() => rejectMutation.mutate()}
                {...{
                  [device("tablet")]: {
                    width: "100%",
                  },
                }}
              >
                거절
              </Button>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </MyInfoCard>
    </FlexBox>
  );
};

export default MentorCenterApplyCard;
