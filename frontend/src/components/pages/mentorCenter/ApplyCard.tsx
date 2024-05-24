'use client';

import { css } from '@emotion/css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProfileCard from '@/components/Profile/ProfileCard';
import {
  ResponseMentoringType,
  useResponseMentoringMutation,
} from '@/queries/mentoring/mentorMentoringQuery';
import { GetMentoringAppliesResponseData } from '@/types/api/mentoring';
import Button from '@/ui/atoms/Button';
import Card from '@/ui/atoms/Card';
import Chip from '@/ui/atoms/Chip';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import LabelBox from '@/ui/molecules/LabelBox';
import theme, { device } from '@/ui/theme';
import MyInfoCard from '../menteeCenter/myInfoCommon/MyInfoCard';
import { SetState } from '@/index';
import Content from '@/components/Profile/ProfileCard/Content';
import { setCurrentModal, setModalState } from '@/features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import ConfirmModal from '@/ui/molecules/Modal/ConfirmModal';

interface MentorCenterApplyCardProps extends GetMentoringAppliesResponseData {
  setApplies: SetState<GetMentoringAppliesResponseData[] | undefined>;
}

function MentorCenterApplyCard({
  mentoringId,
  applicationDate,
  menteeInfo,
  applicationReason,
  setApplies,
}: MentorCenterApplyCardProps) {
  const router = useRouter();
  const { profileId } = menteeInfo;
  const dispatch = useDispatch();

  const onSuccess = (type: ResponseMentoringType) => {
    const modalMessage = type === 'accept' ? '수락' : '거절';
    dispatch(
      setCurrentModal({
        type: 'confirm',
        text: `멘토링을 ${modalMessage}하였습니다.`,
      }),
    );
    dispatch(setModalState(true));
    setApplies((prev) => prev!.filter((p) => p.mentoringId !== mentoringId));
  };
  const onError = () => {
    alert('멘토링 수락에 실패했습니다. 다시 시도해주세요.');
  };

  const acceptMutation = useResponseMentoringMutation(
    mentoringId!,
    'accept',
    () => onSuccess('accept'),
    onError,
  );
  const rejectMutation = useResponseMentoringMutation(
    mentoringId!,
    'reject',
    () => onSuccess('reject'),
    onError,
  );

  return (
    <FlexBox
      justifyContent="space-between"
      columnGap="20px"
      {...{
        [device('tablet')]: {
          flexDirection: 'column',
          rowGap: '20px',
          height: 'auto',
        },
      }}
    >
      <ProfileCard width="293px" height="400px">
        <Content.Container>
          <Content.Avatar src={menteeInfo.imgUrl} />
          <Content.Name name={menteeInfo.name} />
          <Content.EmploymentStatus
            employmentStatus={menteeInfo.employmentStatus}
          />
          <Content.Tags
            disability={menteeInfo.disability}
            severity={menteeInfo.severity}
          />
        </Content.Container>
      </ProfileCard>

      <MyInfoCard width="100%" height="400px" padding="45px !important">
        <FlexBox
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          {...{ height: '100%' }}
        >
          <FlexBox direction="column" alignItems="flex-start" rowGap="40px">
            <LabelBox text="신청일자" width="50%">
              <Chip>{applicationDate}</Chip>
            </LabelBox>

            <LabelBox text="하고 싶은 말">
              <Typography
                variant="div"
                {...{ [device('tablet')]: { marginBottom: '16px' } }}
              >
                {applicationReason}
              </Typography>
            </LabelBox>
          </FlexBox>

          <FlexBox
            justifyContent="space-between"
            {...{
              [device('tablet')]: {
                flexDirection: 'column',
                rowGap: '10px',
              },
            }}
          >
            <Button
              size="small"
              color={theme.colors.assist.normal}
              variant="default"
              onClick={() =>
                router.push(
                  `/mentoringAppliedMenteeProfile?profileId=${profileId}&mentoringApply=${true}&mentoringId=${mentoringId}`,
                )
              }
              {...{
                [device('tablet')]: {
                  width: '100%',
                  maxWidth: '100%',
                },
              }}
            >
              멘티 프로필 보기
            </Button>
            <FlexBox
              width="fit-content"
              {...{
                [device('tablet')]: {
                  width: '100%',
                },
              }}
            >
              <Button
                size="small"
                color={theme.colors.primary.normal}
                variant="default"
                {...{
                  marginRight: '24px',
                  [device('tablet')]: {
                    width: '100%',
                    maxWidth: '50%',
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
                  [device('tablet')]: {
                    width: '100%',
                    maxWidth: '50%',
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
}

export default MentorCenterApplyCard;
