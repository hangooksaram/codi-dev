import { css } from '@emotion/css';
import { ReactNode, SetStateAction } from 'react';
import styled from '@emotion/styled';
import FlexBox from '@/ui/atoms/FlexBox';
import { device } from '@/ui/theme';
import SingleCalendar from '../Calendar/SingleCalendar';

import Card from '@/ui/atoms/Card';
import { DailyMentoringStatus, MentoringMember } from '@/types/mentoring';

interface CalendarContainerProps {
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  setMonth?: React.Dispatch<SetStateAction<string | undefined>>;
  type: 'mentor' | 'mentee';
  children: ReactNode;
  schedules?: string[];

  mentoringSchedules?: DailyMentoringStatus[];
}

function CalendarContainer({
  date,
  setDate,
  setMonth,
  type,
  children,
  schedules,
  mentoringSchedules,
}: CalendarContainerProps) {
  return (
    <StyledCalendarContainer columnGap="20px">
      <SingleCalendar
        type={type}
        date={date}
        setDate={setDate}
        setMonth={setMonth!}
        schedules={schedules!}
        mentoringSchedules={mentoringSchedules}
      />
      <StyledCalendarContainerCard padding="0px">
        {children}
      </StyledCalendarContainerCard>
    </StyledCalendarContainer>
  );
}

const StyledCalendarContainer = styled(FlexBox)({
  height: '590px',
  [device('tablet')]: {
    height: 'auto',
    flexDirection: 'column',
    columnGap: '0px',
    rowGap: '20px',
  },
});

const StyledCalendarContainerCard = styled(Card)({});

export default CalendarContainer;
