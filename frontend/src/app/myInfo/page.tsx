'use client';

import { useRouter } from 'next/navigation';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';
import MenteeProfile from '@/components/Profile/MenteeProfile/MenteeProfile';
import ProfileCard, { Footer } from '@/components/Profile/ProfileCard';
import Content from '@/components/Profile/ProfileCard/Content';
import useGetProfileQuery from '@/queries/profileQuery';
import Button from '@/ui/atoms/Button';
import theme from '@/ui/theme';
import ProfileStatusCard from '@/components/Profile/ProfileStatusCard/ProfileStatusCard';

function MyInfoPage() {
  const { data: profile } = useGetProfileQuery();

  const router = useRouter();

  return (
    <MenteeProfile profile={profile}>
      <ProfileCard width="328px" height="477px">
        <Content.Container>
          <Content.Avatar imgUrl={profile?.imgUrl} />
          <Content.Name name={profile?.name!} />
          <Content.EmploymentStatus
            employmentStatus={profile?.employmentStatus!}
          />
          <Content.Job job={profile?.job!} />
        </Content.Container>
        <Footer>
          <Button
            onClick={() => router.push('/profileForm?edit=true')}
            size="small"
            variant="default"
            color={theme.colors.secondary.main}
          >
            프로필 수정하기
          </Button>
        </Footer>
        <ProfileStatusCard text="희망직무" value={profile?.desiredJob!} />
      </ProfileCard>
    </MenteeProfile>
  );
}

export default MyInfoPage;
