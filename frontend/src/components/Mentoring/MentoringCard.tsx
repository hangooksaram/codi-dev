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
import MentoringToolModal from "./MentoringToolModal";

const mocks = [];

const MentoringCard = ({
  date,
  time,
}: {
  date: string | undefined;
  time: string;
}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <StyledCard>
      <Header completed={true}>{date}</Header>
      <FlexBox justifyContent="space-between">
        <ProfileImage>
          <StyledImage
            width="40px"
            height="40px"
            alt="zoom"
            src="/images/tools/zoom.png"
            {...{
              position: "absolute",
              bottom: "-10px",
              right: "-10px",
            }}
          ></StyledImage>
        </ProfileImage>
        <div>
          <Typography
            variant="div"
            weight={theme.fonts.weight.bold}
            {...{ marginBottom: "5px" }}
          >
            윤지영
          </Typography>
          <Typography
            variant="div"
            size={theme.fonts.size.sm}
            color={theme.colors.gray.dark}
          >
            마라토너
          </Typography>
        </div>
        <LinkButton
          onClick={() => setOpenModal(true)}
          width="42px"
          variant="round"
          completed={true}
        >
          <Link fill={theme.colors.white} />
        </LinkButton>
        <MentoringToolModal open={openModal} setOpen={setOpenModal} />
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

const Header = styled.div(({ completed = false }: { completed: boolean }) => ({
  padding: "0px 10px",
  height: "33px",
  display: "flex",
  justifyㅊontent: "space-between",
  alignItems: "center",
  borderRadius: "20px",
  backgroundColor: completed ? theme.colors.gray.main : theme.colors.primary,
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

const LinkButton = styled(Button)(
  ({ completed = false }: { completed: boolean }) => ({
    minWidth: "42px",
    backgroundColor: completed ? theme.colors.gray.main : theme.colors.primary,
  })
);

const ScheduleContainer = styled(Card)(({}) => ({
  maxWidth: "831px",
  overflowY: "auto",
  minHeight: "477px",
  boxShadow: `0px 2px 6px 0px rgba(0, 0, 0, 0.04)`,
}));

export default MentoringCard;
