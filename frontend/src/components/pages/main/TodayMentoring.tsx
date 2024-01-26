import Logo from '@icons/logo/recommend-icon.svg';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import MentorList from '@/components/Mentor/Mentors/MentorList';
import { selectUser } from '@/features/user/userSlice';
import { useTodayMentoringsQuery } from '@/queries/mentoring/commonMentoringQuery';
import { Mentor } from '@/types/profile';
import { PageComponentLayout } from '../mentorsMain/PageComonentLayout';
import TitleSection from '../mentorsMain/TitleSection';
import Card from '@/ui/atoms/Card';
import theme from '@/ui/theme';
import FlexBox from '@/ui/atoms/FlexBox';
import Button from '@/ui/atoms/Button';

function TodayMentoring() {
  const { isProfile } = useSelector(selectUser);
  const { data: dailyMentoringData, isSuccess } = useTodayMentoringsQuery(
    isProfile!,
  );
  const mentors: Mentor[] = [];
  const router = useRouter();

  dailyMentoringData?.map(({ applicationDate, mentorInfo }) => {
    const newMentorInfo = { ...mentorInfo, applicationDate };
    mentors.push(newMentorInfo);
  });

  return (
    <PageComponentLayout>
      <TitleSection
        logo={<Logo />}
        title="멘토링 일정"
        description="오늘 예정된 멘토링들을 확인해보세요"
      />
      {isSuccess &&
        (dailyMentoringData.length > 0 ? (
          <MentorList mentors={mentors!} />
        ) : (
          <NoContentCard color={theme.colors.background}>
            <FlexBox direction="column" rowGap="20px">
              <div>예정된 멘토링이 없습니다</div>
              <Button
                variant="default"
                onClick={() => router.push('/mentorsMain/')}
              >
                나에게 맞는 멘토 확인하러 가기
              </Button>
            </FlexBox>
          </NoContentCard>
        ))}
    </PageComponentLayout>
  );
}

const NoContentCard = styled(Card)({
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px',
});

export default TodayMentoring;
