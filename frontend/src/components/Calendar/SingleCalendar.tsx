import React from 'react';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { disabledDays } from '@/utils/dateFormat';
import { dayPickerContainerStyle } from './style';
import { DailyMentoringStatus } from '@/types/mentoring';
import { CustomDay } from './customComponents/CustomDay';
import { CustomDayContent } from './customComponents/CustomDayContent';
import { CustomCaption } from './customComponents/CustomCaption';
import { SetState } from '@/index';
import Card from '@/ui/atoms/Card';
import styled from '@emotion/styled';
import { device } from '@/ui/theme';

function SingleCalendar({
  date,
  setDate,
  setMonth,
  type,
  mentoringSchedules,
  schedules,
}: {
  date: Date | undefined;
  setDate: SetState<Date | undefined>;
  setMonth: SetState<string | undefined>;
  type: 'mentor' | 'mentee';
  mentoringSchedules?: DailyMentoringStatus[];
  schedules: string[];
}) {
  return (
    <SingleCalenderContianerCard>
      <DayPicker
        style={dayPickerContainerStyle}
        mode="single"
        selected={date}
        onSelect={setDate}
        components={{
          Day: CustomDay,
          DayContent: (props) =>
            CustomDayContent({
              ...props,
              selected: date,
              schedules,
              mentoringSchedules,
            }),
          Caption: (props) => CustomCaption({ ...props, setMonth }),
        }}
        modifiersClassNames={{
          selected:
            type === 'mentor'
              ? 'mentor-calendar-selected'
              : 'calendar-selected',
          today: 'calendar-today',
        }}
        locale={ko}
        disabled={disabledDays()}
      />
    </SingleCalenderContianerCard>
  );
}

const SingleCalenderContianerCard = styled(Card)(() => ({
  maxWidth: '482px',
  height: '590px',

  [device('tablet')]: {
    height: 'auto',
  },
}));
export default SingleCalendar;
