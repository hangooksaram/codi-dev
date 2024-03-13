import { DailyMentoringMember } from '@/types/mentoring';
import MonthlyMentorings from './MonthlyMentorings';
import DailyMentoring from './DailyMentoring';

function Mentorings({
  mentorings,
}: {
  mentorings: DailyMentoringMember[] | DailyMentoringMember;
}) {
  if (Array.isArray(mentorings))
    return <MonthlyMentorings mentorings={mentorings} />;
  return <DailyMentoring mentorings={mentorings} />;
}

export default Mentorings;
