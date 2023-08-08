import Card from "@/ui/atoms/Card";
import FlexBox from "@/ui/atoms/FlexBox";
import theme from "@/ui/theme";
import ProfileCard from "./ProfileCard";
import { css } from "@emotion/css";
import LabelBox from "@/ui/molecules/LabelBox";
import Grid from "@/ui/atoms/Grid";
import Typography from "@/ui/atoms/Typography";
import Chip from "@/ui/atoms/Chip";

const InfoText = ({ name, value }: { name: string; value: string }) => (
  <FlexBox justifyContent="flex-start">
    <Typography
      variant="div"
      color={theme.colors.gray.main}
      {...{ minWidth: "96px" }}
    >
      {name}
    </Typography>
    <Typography variant="div">{value}</Typography>
  </FlexBox>
);

const MenteeProfile = ({ profileId }: { profileId: number }) => (
  <Card color={theme.colors.background} padding="30px" height="auto">
    {/* <FlexBox alignItems="flex-start" columnGap="20px" rowGap="20px">
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
              <InfoText name={name} value={value} key={index} />
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
    </Card> */}
  </Card>
);

export default MenteeProfile;
