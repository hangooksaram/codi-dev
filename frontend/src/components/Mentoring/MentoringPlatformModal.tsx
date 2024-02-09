import styled from '@emotion/styled';
import Close from '@icons/common/close.svg';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { addMentoringLink } from '@/api/mentoring/mentorApi';
import { selectUser } from '@/features/user/userSlice';
import { SetState } from '@/index';
import { MentoringPlatform } from '@/types/mentoring';
import Button from '@/ui/atoms/Button';
import Card from '@/ui/atoms/Card';
import Chip from '@/ui/atoms/Chip';
import FlexBox from '@/ui/atoms/FlexBox';
import StyledImage from '@/ui/atoms/StyledImage';
import Textarea from '@/ui/atoms/Textarea';
import Typography from '@/ui/atoms/Typography';
import Modal from '@/ui/molecules/Modal';
import theme, { device } from '@/ui/theme';

function MentoringPlatformModal({
  open,
  setOpen,
  mentoringId,
}: {
  open: boolean;
  setOpen: SetState<boolean>;
  mentoringId: number;
}) {
  const [platform, setPlatform] = useState<MentoringPlatform>('Google Meeting');
  const linkRef = useRef<HTMLTextAreaElement>(null);

  const addMentoringlink = async () => {
    await addMentoringLink(mentoringId, {
      link: linkRef?.current?.value!,
      platform,
    });

    setOpen(false);
  };
  return (
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
            <Typography variant="div" {...{ marginBottom: '10px' }}>
              멘토링에 사용할 도구를 선택해주세요.
            </Typography>
            <FlexBox justifyContent="flex-start" columnGap="10px">
              {MENTORING_PLATFORMS.map(({ text, iconSrc }, index) => (
                <Chip
                  onClick={() => setPlatform(text)}
                  key={index}
                  color={
                    text === platform
                      ? theme.colors.primary.main
                      : theme.colors.background
                  }
                  fontColor={
                    text === platform
                      ? theme.colors.white
                      : theme.colors.primary.main
                  }
                >
                  <FlexBox alignItems="center" justifyContent="flex-start">
                    <StyledImage
                      src={iconSrc!}
                      width="24px"
                      height="24px"
                      key={text}
                      alt={text}
                    />
                    {text}
                  </FlexBox>
                </Chip>
              ))}
            </FlexBox>
          </FlexBox>
          <ModalTextarea ref={linkRef} placeholder="링크 주소 붙여넣기" />
          <Button onClick={addMentoringlink} variant="default">
            멘토링 링크 추가
          </Button>
        </FlexBox>
      </ModalCard>
    </Modal>
  );
}

const ModalCard = styled(Card)({
  maxWidth: '708px',
  width: '90%',
  minWidth: 'fit-content',
  height: '362px',
  padding: '30px 45px',
});

const ModalTextarea = styled(Textarea)({
  height: 'auto',
  background: theme.colors.gray.light,
  color: theme.colors.gray.dark,
});

export const MENTORING_PLATFORMS = [
  {
    iconSrc: '/images/platforms/google.png',
    text: 'Google Meeting' as MentoringPlatform,
  },
  {
    iconSrc: '/images/platforms/discord.png',
    text: 'Discord' as MentoringPlatform,
  },
  {
    iconSrc: '/images/platforms/zoom.png',
    text: 'Zoom' as MentoringPlatform,
  },
  {
    iconSrc: '/images/platforms/kakaotalk.png',
    text: 'KakaoTalk' as MentoringPlatform,
  },
];

export default MentoringPlatformModal;
