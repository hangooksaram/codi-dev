import Logo from '@icons/logo/recommend-icon.svg';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import MentorList from '@/components/Mentor/Mentors/MentorList';
import { PageComponentLayout } from '../mentorsMain/PageComonentLayout';
import TitleSection from '../mentorsMain/TitleSection';
import Card from '@/ui/atoms/Card';
import theme from '@/ui/theme';
import FlexBox from '@/ui/atoms/FlexBox';
import Button from '@/ui/atoms/Button';
import useTodayMentorings from '@/hooks/mentorings/useTodayMentorings';
import ImageComponent from '@/ui/atoms/ImageComponent';
import todayMentoringsNoData from '@images/todaymentorings-no-data.png';
import Typography from '@/ui/atoms/Typography';

function TodayMentoring() {
  const router = useRouter();
  const { todayMentorings, isSuccess } = useTodayMentorings();

  return (
    isSuccess && (
      <PageComponentLayout>
        <TitleSection
          logo={<Logo />}
          title="멘토링 일정"
          description={`${todayMentorings!.length > 0 ? '오늘 예정된 멘토링들을 확인해보세요' : '오늘은 예정된 멘토링이 없어요'}`}
        />

        {todayMentorings!.length > 0 ? (
          <MentorList mentors={todayMentorings!} />
        ) : (
          <NoContentCard color={theme.colors.background}>
            <FlexBox direction="column" rowGap="20px">
              <ImageComponent
                src={todayMentoringsNoData}
                alt="for-not-mentor"
                width="50%"
                height="auto"
              />
              <Button
                variant="default"
                onClick={() => router.push('/mentorsMain/')}
              >
                멘토 찾아보기
              </Button>
            </FlexBox>
          </NoContentCard>
        )}
      </PageComponentLayout>
    )
  );
}

const NoContentCard = styled(Card)({
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px',
  background: 'none',
});

export default TodayMentoring;
