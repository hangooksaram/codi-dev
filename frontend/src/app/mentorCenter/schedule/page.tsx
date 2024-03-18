'use client';

import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import { SchedulesContainer } from '@/components/Mentoring/MentoringsWithSingleCalendar';
import MentorScheduleEdit from '@/components/Schedule/Mentor/MentorScheduleEdit';
import {
  useDailyMentoringsQuery,
  useMonthlyMentoringsQuery,
} from '@/queries/mentoring/commonMentoringQuery';
import Button from '@/ui/atoms/Button';
import LabelBox from '@/ui/molecules/LabelBox';
import { formattedDate, formattedMonth } from '@/utils/dateFormat';
import useDailySchedulesQuery, {
  useMonthlySchedulesQuery,
} from '@/queries/scheduleQuery';
import MentorSchedules from '@/components/Schedule/Mentor/MentorSchedules';
import CalendarContainer from '@/components/Container/CalendarContainer';
import FlexBox from '@/ui/atoms/FlexBox';
import { MentoringsScrollContainer } from '@/components/Mentoring/Mentorings/Mentorings.styled';
import Card from '@/ui/atoms/Card';
import Mentorings from '@/components/Mentoring/Mentorings/Mentorings';

function SchedulePage() {
  const [date, setDate] = useState<Date>();
  const [month, setMonth] = useState<string>();

  const [type, setType] = useState<'mentor' | 'mentee'>('mentee');
  const [isEdit, setIsEdit] = useState(false);
  const [isScheduleEdited, setIsScheduleEdited] = useState(0);
  const { data: dailySchedules } = useDailySchedulesQuery({
    date: formattedDate(date),
    updated: isScheduleEdited,
  });
  const { data: monthlySchedules } = useMonthlySchedulesQuery({
    month: month ?? formattedMonth(new Date()),
    updated: isScheduleEdited,
  });

  const { data: mentoringsData } = useMonthlyMentoringsQuery({
    month: formattedMonth(new Date()),
    type: 'mentors',
  });

  const { data: dailyMentoringData } = useDailyMentoringsQuery({
    date: formattedDate(date),
    type: 'mentors',
  });

  const mentoringSchedules = mentoringsData?.monthlyMentoringMembers!.map(
    ({ date, mentoringStatus }) => ({
      date,
      mentoringStatus,
    }),
  );

  const toggleEditState = () => {
    setType((prev) => (prev === 'mentor' ? 'mentee' : 'mentor'));
    setIsEdit((prev) => !prev);
    if (!date) {
      setDate(new Date());
    }
  };

  return (
    <FlexBox direction="column" rowGap="20px">
      <FlexBox>
        <LabelBox
          text="멘토링 일정 관리"
          helpText="멘토링 시간은 2주 전부터 한 달 단위로 설정 가능합니다."
        />
        <Button
          onClick={toggleEditState}
          variant="default"
          size="small"
          {...{ minWidth: 'fit-content', marginBottom: '20px' }}
        >
          일정편집
        </Button>
      </FlexBox>

      <CalendarContainer
        date={date}
        setDate={setDate}
        setMonth={setMonth}
        type={type}
        schedules={monthlySchedules?.days.map(({ date }) => date)!}
        mentoringSchedules={mentoringSchedules}
      >
        <Card padding="40px">
          <MentoringsScrollContainer>
            <Mentorings
              mentorings={
                date
                  ? dailyMentoringData!
                  : mentoringsData?.monthlyMentoringMembers
              }
            />
          </MentoringsScrollContainer>
        </Card>
      </CalendarContainer>

      {isEdit ? (
        <MentorScheduleEdit
          date={formattedDate(date)}
          schedules={dailySchedules!}
          toggleEditState={toggleEditState}
          setIsScheduleEdited={setIsScheduleEdited}
        />
      ) : (
        <MentorSchedules
          schedules={date ? dailySchedules! : monthlySchedules?.days!}
        />
      )}
    </FlexBox>
  );
}

export default SchedulePage;
