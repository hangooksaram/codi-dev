import { SetState } from "@/index";
import Button from "@/ui/atoms/Button";
import Card from "@/ui/atoms/Card";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import { StyledImage } from "@/ui/atoms/StyledImage";
import Textarea from "@/ui/atoms/Textarea";
import Typography from "@/ui/atoms/Typography";
import Modal from "@/ui/molecules/Modal";
import theme from "@/ui/theme";
import styled from "@emotion/styled";
import Close from "@icons/common/close.svg";

const MENTORING_TOOLS = [
  {
    icon: (
      <StyledImage
        width="24px"
        height="24px"
        key="Google Meeting"
        src="/images/tools/discord.png"
        alt="Google Meeting"
      />
    ),
    text: "Google Meeting",
  },
  {
    icon: (
      <StyledImage
        width="24px"
        height="24px"
        key="Google Meeting"
        src="/images/tools/zoom.png"
        alt="Google Meeting"
      />
    ),
    text: "Google Meeting",
  },
  {
    icon: (
      <StyledImage
        width="24px"
        height="24px"
        key="Google Meeting"
        src="/images/tools/discord.png"
        alt="Google Meeting"
      />
    ),
    text: "Google Meeting",
  },
];

const MentoringToolModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: SetState<boolean>;
}) => (
  <Modal open={open} setOpen={setOpen}>
    <ModalCard>
      <FlexBox direction="column" alignItems="center" rowGap="20px">
        <FlexBox justifyContent="space-between">
          <FlexBox justifyContent="flex-start" columnGap="10px">
            <Typography
              variant="span"
              size={theme.fonts.size.md}
              weight={theme.fonts.weight.extraBold}
            >
              멘토링 링크 추가
            </Typography>
            <Typography variant="span" color={theme.colors.gray.main}>
              멘티는 해당 링크를 통해 멘토링 페이지로 접속합니다.
            </Typography>
          </FlexBox>
          <Close onClick={() => setOpen(false)} />
        </FlexBox>
        <FlexBox direction="column" alignItems="flex-start">
          <Typography variant="div" {...{ marginBottom: "10px" }}>
            멘토링에 사용할 도구를 선택해주세요.
          </Typography>
          <FlexBox justifyContent="flex-start" columnGap="10px">
            {MENTORING_TOOLS.map((tool, index) => (
              <Chip key={index}>
                <FlexBox alignItems="center" justifyContent="flex-start">
                  {tool.icon}
                  {tool.text}
                </FlexBox>
              </Chip>
            ))}
          </FlexBox>
        </FlexBox>
        <ModalTextarea placeholder="링크 주소 붙여넣기" />
        <Button variant="default">멘토링 링크 추가</Button>
      </FlexBox>
    </ModalCard>
  </Modal>
);

const ModalCard = styled(Card)({
  maxWidth: "708px",
  width: "90%",
  height: "362px",
  padding: "30px 45px",
  position: "fixed",

  left: "50%",
  transform: "translate(-50%, 0)",
  zIndex: 2,
});

const ModalTextarea = styled(Textarea)({
  height: "auto",
  background: theme.colors.gray.light,
  color: theme.colors.gray.dark,
});

export default MentoringToolModal;
