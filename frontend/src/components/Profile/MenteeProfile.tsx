import Card from "@/ui/atoms/Card";
import FlexBox from "@/ui/atoms/FlexBox";
import theme, { device } from "@/ui/theme";
import ProfileCard from "./ProfileCard";
import { css } from "@emotion/css";
import LabelBox from "@/ui/molecules/LabelBox";
import Grid from "@/ui/atoms/Grid";
import Typography from "@/ui/atoms/Typography";
import Chip from "@/ui/atoms/Chip";
import useGetProfileQuery from "@/queries/profileQuery";
import ProfileLabelText from "./ProfileLabelText";
import styled from "@emotion/styled";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Button from "@/ui/atoms/Button";
import MentoringPlatformModal from "../Mentoring/MentoringPlatformModal";
import { useState } from "react";
import { useMentoringAcceptMutation } from "@/queries/mentoring/mentorMentoringQuery";
import MyInfoCommonContainerCard from "../pages/myInfoCommon/MyInfoCommonContainerCard";
import MyInfoCard from "../pages/myInfoCommon/MyInfoCard";

interface MenteeProfilePageParams {
  profileId?: string;
  mentoringId?: string;
  isMentoringApply?: boolean;
  platform?: string;
}

const MenteeProfile = ({
  profileId,
  mentoringId,
  isMentoringApply,
  platform,
}: MenteeProfilePageParams) => {
  const { data: profile } = useGetProfileQuery(profileId!);
  const router = useRouter();
  const acceptMutation = useMentoringAcceptMutation(parseInt(mentoringId!));
  const [openModal, setOpenModal] = useState(false);

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
        <ProfileCard
          edit={mentoringId ? false : true}
          name={profile?.name}
          imgUrl={profile?.imgUrl}
          employmentStatus={profile?.employmentStatus}
          width="313px"
          height="477px"
          link={`/profileForm?edit=${true}&job=${profile?.job}&education=${
            profile?.education
          }&disability=${profile?.disability}&employmentStatus=${
            profile?.employmentStatus
          }&severity=${profile?.severity}&introduction=${
            profile?.introduction
          }&desiredJob=${profile?.desiredJob}&imgUrl=${profile?.imgUrl}`}
          disability={profile?.disability}
          severity={profile?.disability}
        >
          {platform && platform?.includes("No") ? (
            <>
              <Button
                onClick={() => setOpenModal(true)}
                size="small"
                variant="default"
                color={theme.colors.secondary}
              >
                멘토링 링크 수정
              </Button>
              <MentoringPlatformModal
                mentoringId={parseInt(mentoringId!)}
                open={openModal}
                setOpen={setOpenModal}
              />
            </>
          ) : null}
          {isMentoringApply && (
            <Button
              onClick={() => {
                acceptMutation.mutate();
                router.back();
              }}
              size="small"
              variant="default"
              color={theme.colors.secondary}
            >
              멘토링 수락 하기
            </Button>
          )}
        </ProfileCard>
        <MyInfoCard
          className={css({
            minHeight: "477px",
          })}
        >
          <LabelBox text="멘티정보">
            <ReactiveGrid1 gridTemplateColumns="1fr 1fr" rowGap="10px">
              <ProfileLabelText name="이름" value={profile?.name} />
              <ProfileLabelText name="최종학력" value={profile?.education} />
              <ProfileLabelText name="나이" value={`${profile?.age}세`} />
              <ProfileLabelText name="희망직무" value={profile?.desiredJob} />
              <ProfileLabelText name="장애구분" value={profile?.disability} />
              <ProfileLabelText
                name="취업상태"
                value={profile?.employmentStatus}
              />
              <ProfileLabelText name="중증도" value={profile?.severity} />
            </ReactiveGrid1>
          </LabelBox>

          <FlexBox
            justifyContent="flex-start"
            {...{
              marginTop: "60px",
              [device("tablet")]: {
                marginTop: "20px",
                flexDirection: "column",
                rowGap: "20px",
              },
            }}
          >
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
        </MyInfoCard>
      </FlexBox>
      <MyInfoCard
        height="auto"
        className={css`
          min-height: 261px;
          margin-top: 20px;
        `}
      >
        <LabelBox text="자기소개">
          <p>{profile?.introduction}</p>
        </LabelBox>
      </MyInfoCard>
    </MyInfoCommonContainerCard>
  );
};

const ReactiveGrid1 = styled(Grid)({
  [device("tablet")]: {
    gridTemplateColumns: "1fr",
  },
});

export default MenteeProfile;
