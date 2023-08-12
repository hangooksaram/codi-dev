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

const MenteeProfile = ({ profileId }: { profileId: number }) => {
  const { data: profile } = useGetProfileQuery(profileId);
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
          edit
          name="이름"
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
        />
        <Card
          padding="45px 0px 0px 45px"
          className={css({
            minHeight: "477px",
            [device("tablet")]: {
              padding: "30px !important",
            },
          })}
        >
          <LabelBox text="멘티정보">
            <ReactiveGrid1 gridTemplateColumns="1fr 1fr" rowGap="10px">
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

const ReactiveGrid1 = styled(Grid)({
  [device("tablet")]: {
    gridTemplateColumns: "1fr",
  },
});

export default MenteeProfile;
