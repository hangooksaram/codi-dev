'use client';

import MentorProfile from '@/components/Profile/MentorProfile/MentorProfile';
import MentorStatus from '@/components/Profile/MentorProfile/MentorStatus';
import ProfileCard, { Footer } from '@/components/Profile/ProfileCard';
import Content from '@/components/Profile/ProfileCard/Content';
import { useGetMentorQuery } from '@/queries/mentorQuery';
import Button from '@/ui/atoms/Button';
import LabelBox from '@/ui/molecules/LabelBox';
import theme from '@/ui/theme';
import { useRouter } from 'next/navigation';

function MentorProfilePage() {
  const { data: mentor, isSuccess } = useGetMentorQuery();
  const router = useRouter();
  return (
    isSuccess && (
      <>
        <LabelBox text="멘토 프로필"></LabelBox>
        <MentorProfile mentor={mentor!}>
          <ProfileCard width="322px">
            <Content.Container>
              <Content.Avatar src={mentor?.imgUrl} />
              <Content.Name name={mentor?.name!} />
              <Content.Job job={mentor?.job!} />
              <Content.Rating star={mentor?.star!} mentees={mentor?.mentees!} />

              <Content.Tags
                career={mentor?.career}
                disability={mentor?.disability!}
                severity={mentor?.severity!}
              />
            </Content.Container>

            <Button
              onClick={() => router.push('/mentorRegisterForm?edit=true')}
              size="small"
              variant="default"
              color={theme.colors.secondary.main}
            >
              프로필 수정하기
            </Button>
            <MentorStatus
              mentoringCount={mentor?.mentoringCount}
              responseRate={mentor?.responseRate}
            />
          </ProfileCard>
        </MentorProfile>
      </>
    )
  );
}

export default MentorProfilePage;
