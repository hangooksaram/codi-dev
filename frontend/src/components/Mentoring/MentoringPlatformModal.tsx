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
import Modal from '@/ui/molecules/Modal/GlobalModal';
import theme, { device } from '@/ui/theme';
import { useDispatch } from 'react-redux';
import { setCurrentModal, setModalState } from '@/features/modal/modalSlice';
import ConfirmModal from '@/ui/molecules/Modal/ConfirmModal';
import LocalModal from '@/ui/molecules/Modal/LocalModal';

function MentoringPlatformModal({
  open,
  setOpen,
  mentoringId,
}: {
  open: boolean;
  setOpen: SetState<boolean>;
  mentoringId: number;
}) {
  const dispatch = useDispatch();
  const [platform, setPlatform] = useState<MentoringPlatform>('Google Meeting');
  const linkRef = useRef<HTMLTextAreaElement>(null);

  const isValidLink = () => {
    const regex =
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

    return regex.test(linkRef?.current?.value!);
  };

  const addMentoringlink = async () => {
    if (!isValidLink()) {
      alert('올바른 링크 주소를 입력해주세요!');
      return;
    }
    await addMentoringLink(mentoringId, {
      link: linkRef?.current?.value!,
      platform,
    });
    setOpen(false);

    setTimeout(() => {
      dispatch(
        setCurrentModal({
          type: 'confirm',
          text: '멘토링 플랫폼을 성공적으로 설정하였습니다.',
        }),
      );
      dispatch(setModalState(true));
    }, 1000);
  };
  return (
    <LocalModal open={open} setOpen={setOpen}>
      <ModalCard>
        <FlexBox direction="column" alignItems="center" rowGap="20px">
          <FlexBox justifyContent="space-between">
            <FlexBox
              justifyContent="flex-start"
              columnGap="10px"
              {...{
                [device('tablet')]: { flexDirection: 'column', rowGap: '10px' },
              }}
            >
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
            <FlexBox
              justifyContent="flex-start"
              columnGap="10px"
              rowGap="10px"
              isWrap
            >
              {MENTORING_PLATFORMS.map(({ text, iconSrc }, index) => (
                <Chip
                  onClick={() => setPlatform(text)}
                  key={index}
                  color={
                    text === platform
                      ? theme.colors.primary.normal
                      : theme.colors.background
                  }
                  fontColor={
                    text === platform
                      ? theme.colors.white
                      : theme.colors.primary.normal
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
          <Button onClick={() => addMentoringlink()} variant="default">
            멘토링 링크 추가
          </Button>
        </FlexBox>
      </ModalCard>
    </LocalModal>
  );
}

const ModalCard = styled(Card)({
  maxWidth: '708px',
  width: '90%',
  minWidth: 'fit-content',
  height: '362px',
  padding: '30px 45px',

  [device('tablet')]: {
    padding: '10px',
    width: '100%',
    minWidth: 'auto',
    height: 'auto',
  },
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
