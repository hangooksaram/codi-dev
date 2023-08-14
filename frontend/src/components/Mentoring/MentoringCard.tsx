import Card from "@/ui/atoms/Card";
import theme from "@/ui/theme";
import styled from "@emotion/styled";
import Button from "@/ui/atoms/Button";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import Link from "@icons/common/link.svg";
import { backgroundImage } from "@/ui/atoms/BackgroundImage";
import { StyledImage } from "@/ui/atoms/StyledImage";
import { useState } from "react";
import Modal from "@/ui/molecules/Modal";
import MentoringToolModal, { MENTORING_TOOLS } from "./MentoringToolModal";
import { MentoringPlatform, MentoringStatus } from "@/types/mentoring";
import formattedDate from "@/utils/dateFormat";

const mocks = [];

const MentoringCard = ({
  mentoringId,
  date,
  time,
  name,
  mentoringJob,
  platform,
}: {
  mentoringId: number;
  date: string | undefined;
  time: string;
  name: string;
  mentoringJob: string;
  platform: MentoringPlatform | string;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const platformInfo = MENTORING_TOOLS.find(({ text }) => text === platform);
  return (
    <StyledCard>
      <Header today={date === formattedDate(new Date())}>{time}</Header>
      <FlexBox justifyContent="space-between">
        <ProfileImage>
          {platform === "No Selection." ? null : platformInfo?.icon!}
        </ProfileImage>
        <div>
          <Typography
            variant="div"
            weight={theme.fonts.weight.bold}
            {...{ marginBottom: "5px" }}
          >
            {name}
          </Typography>
          <Typography
            variant="div"
            size={theme.fonts.size.sm}
            color={theme.colors.gray.dark}
          >
            {mentoringJob}
          </Typography>
        </div>
        <LinkButton
          onClick={() => setOpenModal(true)}
          width="42px"
          variant="round"
          color={
            platform === "No Selection."
              ? theme.colors.gray.main
              : theme.colors.primary
          }
        >
          <Link fill={theme.colors.white} />
        </LinkButton>
        <MentoringToolModal
          mentoringId={mentoringId}
          open={openModal}
          setOpen={setOpenModal}
        />
      </FlexBox>
    </StyledCard>
  );
};

const StyledCard = styled(Card)({
  maxWidth: "237px",
  maxHeight: "130px",
  padding: "10px",
  border: `1px solid ${theme.colors.primary}`,
});

const Header = styled.div(({ today = false }: { today: boolean }) => ({
  padding: "0px 10px",
  height: "33px",
  display: "flex",
  justifyㅊontent: "space-between",
  alignItems: "center",
  borderRadius: "20px",
  backgroundColor: today ? theme.colors.primary : theme.colors.gray.main,
  color: theme.colors.white,
  marginBottom: "13px",
}));

const ProfileImage = styled.div(({}) => ({
  width: "54px",
  height: "54px",
  borderRadius: "100%",
  position: "relative",
  ...backgroundImage("/images/ProfileTest.png"),
}));

const LinkButton = styled(Button)(() => ({
  minWidth: "42px",
}));

const ScheduleContainer = styled(Card)(({}) => ({
  maxWidth: "831px",
  overflowY: "auto",
  minHeight: "477px",
  boxShadow: `0px 2px 6px 0px rgba(0, 0, 0, 0.04)`,
}));

export default MentoringCard;