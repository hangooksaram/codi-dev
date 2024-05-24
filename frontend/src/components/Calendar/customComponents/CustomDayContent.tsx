import styled from '@emotion/styled';
import Mentoring from '@icons/calendar/calendar-mentoring.svg';
import Schedule from '@icons/calendar/calendar-schedule.svg';
import { DayContentProps } from 'react-day-picker';
import { formattedDate } from '@/utils/dateFormat';
import theme, { device } from '@/ui/theme';
import { DailyMentoringStatus } from '@/types/mentoring';

interface CustomDayContentProps extends DayContentProps {
  selected?: Date;
  schedules?: string[];
  mentoringSchedules?: DailyMentoringStatus[];
}

export function CustomDayContent({
  date,
  selected,
  schedules,
  mentoringSchedules,
}: CustomDayContentProps) {
  const day = date.getDate();

  const isSchedule = schedules?.includes(formattedDate(date));

  const isScheduleWithMentoring = mentoringSchedules?.some(
    ({ date: mentoringDate }) => mentoringDate === formattedDate(date),
  );

  const icon = () => {
    if (isSchedule) return <Schedule fill={theme.colors.gray.main} />;
    if (isScheduleWithMentoring) {
      return (
        <Mentoring
          fill={
            date.getDate() === selected?.getDate()
              ? theme.colors.white
              : theme.colors.primary.normal
          }
        />
      );
    }
  };
  return (
    <CustomCell id={day.toString()}>
      <div style={{ marginBottom: '5px' }}>{day}</div>
      {icon()}
    </CustomCell>
  );
}

const CustomCell = styled.div({
  width: '50px',
  height: '64px',
  marginTop: '8px',
  paddingTop: '5px',
  [device('mobile')]: {
    width: '40px',
    height: '54px',
  },
});
