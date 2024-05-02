'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';
import MentoringPlatformModal from '@/components/Mentoring/MentoringPlatformModal';
import MenteeProfile from '@/components/Profile/MenteeProfile/MenteeProfile';
import ProfileCard from '@/components/Profile/ProfileCard';
import Content from '@/components/Profile/ProfileCard/Content';
import Header from '@/components/Profile/ProfileCard/Header';
import { useResponseMentoringMutation } from '@/queries/mentoring/mentorMentoringQuery';
import useGetProfileQuery from '@/queries/profileQuery';
import Button from '@/ui/atoms/Button';
import theme from '@/ui/theme';
import { useDispatch } from 'react-redux';
import { setCurrentModal, setModalState } from '@/features/modal/modalSlice';
import ConfirmModal from '@/ui/molecules/Modal/ConfirmModal';
import Footer from '@/components/Profile/ProfileCard/Footer';

function MentoringAppliedMenteeProfilePage() {
  const router = useRouter();
  const param = useSearchParams();
  const mentoringId = param.get('mentoringId');
  const profileId = param.get('profileId');
  const dispatch = useDispatch();

  const isMentoringApply = Boolean(param.get('mentoringApply'))!;

  const { data: profile, isSuccess } = useGetProfileQuery(profileId!);

  const acceptMutation = useResponseMentoringMutation(
    parseInt(mentoringId!),
    'accept',
    () => {
      dispatch(
        setCurrentModal({
          type: 'confirm',
          text: '멘토링을 수락하였습니다.',
        }),
      );
      dispatch(setModalState(true));
      router.replace('/mentorCenter/apply/');
    },
  );

  return (
    <SinglePageLayout>
      <MenteeProfile profile={profile}>
        <ProfileCard width="322px" height="477px">
          <Content.Container>
            <Content.Avatar src={profile?.imgUrl} />
            <Content.Name name={profile?.name!} />
            <Content.EmploymentStatus
              employmentStatus={profile?.employmentStatus!}
            />
            <Content.Job job={profile?.job!} />
            <Content.Tags
              disability={profile?.disability!}
              severity={profile?.severity!}
            />
          </Content.Container>
          <Footer.Container>
            <Button
              onClick={() => {
                acceptMutation.mutate();
              }}
              size="small"
              variant="default"
              color={theme.colors.secondary.main}
            >
              멘토링 수락 하기
            </Button>
          </Footer.Container>
        </ProfileCard>
      </MenteeProfile>
    </SinglePageLayout>
  );
}

export default MentoringAppliedMenteeProfilePage;
