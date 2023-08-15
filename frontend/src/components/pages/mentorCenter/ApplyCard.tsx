"use client";

import ProfileCard from "@/components/Profile/ProfileCard";
import { selectUser } from "@/features/user/userSlice";
import {
  useMentoringAcceptMutation,
  useMentoringRejectMutation,
} from "@/queries/mentoring/mentorMentoringQuery";
import { GetMentoringAppliesResponseData } from "@/types/api/mentoring";
import Button from "@/ui/atoms/Button";
import Card from "@/ui/atoms/Card";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import LabelBox from "@/ui/molecules/LabelBox";
import theme, { device } from "@/ui/theme";
import { css } from "@emotion/css";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const MentorCenterApplyCard = ({
  mentoringId,
  applicationDate,
  menteeInfo,
  applicationReason,
}: GetMentoringAppliesResponseData) => {
  const router = useRouter();
  const {
    name,
    disability,
    desiredJob,
    severity,
    employmentStatus,
    profileId,
    imgUrl,
  } = menteeInfo;
  const { mentorId } = useSelector(selectUser);
  const acceptMutation = useMentoringAcceptMutation(mentorId!, mentoringId!);
  const rejectMutation = useMentoringRejectMutation(mentorId!, mentoringId!);
  return (
    <FlexBox
      justifyContent="space-between"
      columnGap="20px"
      className={css({
        [device("tablet")]: {
          flexDirection: "column",
        },
      })}
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
          name={name}
          disability={disability}
          desiredJob={desiredJob}
          severity={severity}
          employmentStatus={employmentStatus}
          imgUrl={imgUrl}
          apply={true}
          mentor={false}
        />
      </div>
      <Card padding="40px" width="100%" height="400px">
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
                <p>{applicationReason}</p>
              </LabelBox>
            </div>
          </FlexBox>

          <FlexBox justifyContent="space-between">
            <Button
              size="small"
              color={theme.colors.secondary}
              variant="default"
              onClick={() => router.push(`/menteeProfile/${profileId}`)}
            >
              멘티 프로필 보기
            </Button>
            <FlexBox width="fit-content">
              <Button
                size="small"
                color={theme.colors.primary}
                variant="default"
                {...{ marginRight: "24px" }}
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
              >
                거절
              </Button>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default MentorCenterApplyCard;
