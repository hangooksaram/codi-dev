import { selectUser } from '@/features/user/userSlice';
import { useTodayMentoringsQuery } from '@/queries/mentoring/commonMentoringQuery';
import { useSelector } from 'react-redux';

const useTodayMentorings = () => {
  const { isProfile } = useSelector(selectUser);
  const { data: dailyMentoringData, isSuccess } = useTodayMentoringsQuery(
    isProfile!,
  );

  return {
    todayMentorings: dailyMentoringData?.map(
      ({ applicationDate, mentorInfo }) => ({
        ...mentorInfo,
        applicationDate,
      }),
    ),
    isSuccess,
  };
};

export default useTodayMentorings;
