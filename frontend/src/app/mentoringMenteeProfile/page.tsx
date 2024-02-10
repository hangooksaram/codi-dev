'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';
import MentoringPlatformModal from '@/components/Mentoring/MentoringPlatformModal';
import MenteeProfile from '@/components/Profile/MenteeProfile/MenteeProfile';
import ProfileCard, { Footer } from '@/components/Profile/ProfileCard';
import Content from '@/components/Profile/ProfileCard/Content';
import useGetProfileQuery from '@/queries/profileQuery';
import Button from '@/ui/atoms/Button';
import theme from '@/ui/theme';
import ProfileStatusCard from '@/components/Profile/ProfileStatusCard/ProfileStatusCard';
import { useDispatch } from 'react-redux';
import { setCurrentModal, setModalState } from '@/features/modal/modalSlice';

function MentoringMenteeProfilePage({}) {
  const param = useSearchParams();
  const profileId = param.get('profileId')!;
  const mentoringId = param.get('mentoringId')!;
  const platform = param.get('platform');
  const { data: profile } = useGetProfileQuery(profileId!);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  return (
    <SinglePageLayout>
      <MenteeProfile profile={profile}>
        <ProfileCard width="322px">
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
          <Footer>
            {!platform?.includes('No') && (
              <>
                <Button
                  onClick={() => {
                    dispatch(
                      setCurrentModal(
                        <MentoringPlatformModal
                          mentoringId={parseInt(mentoringId!)}
                        />,
                      ),
                    );
                    dispatch(setModalState(true));
                  }}
                  size="small"
                  variant="default"
                  color={theme.colors.secondary.main}
                  {...{ marginTop: '16px' }}
                >
                  멘토링 링크 수정
                </Button>
              </>
            )}
          </Footer>
          <ProfileStatusCard text="희망직무" value={profile?.desiredJob!} />
        </ProfileCard>
      </MenteeProfile>
    </SinglePageLayout>
  );
}

export default MentoringMenteeProfilePage;
