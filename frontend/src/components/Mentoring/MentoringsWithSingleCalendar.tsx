import { SetStateAction, useEffect } from 'react'

import styled from '@emotion/styled'
import Card from '@/ui/atoms/Card'
import Mentorings from './Mentorings'
import CalendarContainer from '../Container/CalendarContainer'
import { DailyMentoringMember } from '@/types/mentoring'

interface MentoringsWithSingleCalendarProps {
  date: Date | undefined
  setDate: React.Dispatch<SetStateAction<Date | undefined>>
  setMonth: React.Dispatch<SetStateAction<string | undefined>>
  mentorings: DailyMentoringMember[] | DailyMentoringMember
  type: 'mentor' | 'mentee'
  schedules: string[]
}

function MentoringsWithSingleCalendar({
  date,
  setDate,
  setMonth,
  mentorings,
  type,
  schedules,
}: MentoringsWithSingleCalendarProps) {
  const mentoringSchedules = Array.isArray(mentorings)
    ? mentorings.map(({ date, mentoringStatus }) => ({
        date,
        mentoringStatus,
      }))
    : []
  return (
    <CalendarContainer
      date={date}
      setDate={setDate}
      setMonth={setMonth}
      type={type}
      schedules={schedules}
      mentoringSchedules={mentoringSchedules}
    >
      <SchedulesContainer>
        <Mentorings mentorings={mentorings} />
      </SchedulesContainer>
    </CalendarContainer>
  )
}
export const SchedulesContainer = styled.div({
  maxHeight: '510px',
  overflowY: 'auto',
})

export default MentoringsWithSingleCalendar
