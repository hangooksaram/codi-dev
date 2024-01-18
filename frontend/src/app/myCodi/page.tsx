'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CalendarContainer from '@/components/Container/CalendarContainer'
import Mentorings from '@/components/Mentoring/Mentorings'
import MentoringsWithSingleCalendar, {
  SchedulesContainer,
} from '@/components/Mentoring/MentoringsWithSingleCalendar'
import { selectUser } from '@/features/user/userSlice'
import {
  useDailyMentoringsQuery,
  useMonthlyMentoringsQuery,
} from '@/queries/mentoring/commonMentoringQuery'

import FlexBox from '@/ui/atoms/FlexBox'
import LabelBox from '@/ui/molecules/LabelBox'
import { formattedDate, formattedMonth } from '@/utils/dateFormat'

function MyCodiPage() {
  const [date, setDate] = useState<Date>()
  const [type, setType] = useState<'mentor' | 'mentee'>('mentee')

  const [month, setMonth] = useState<string>()

  const { data: mentoringsData } = useMonthlyMentoringsQuery({
    month: month ?? formattedMonth(new Date()),
    type: 'mentees',
  })

  const { data: dailyMentoringData } = useDailyMentoringsQuery({
    date: formattedDate(date),
    type: 'mentees',
  })

  const mentoringSchedules = mentoringsData?.monthlyMentoringMembers!.map(
    ({ date, mentoringStatus }) => ({
      date,
      mentoringStatus,
    }),
  )

  return (
    <FlexBox>
      <LabelBox text="멘토링 일정 관리">
        <CalendarContainer
          date={date}
          setDate={setDate}
          setMonth={setMonth}
          type={type}
          mentoringSchedules={mentoringSchedules!}
        >
          <SchedulesContainer>
            <Mentorings
              mentorings={
                date
                  ? dailyMentoringData!
                  : mentoringsData?.monthlyMentoringMembers
              }
            />
          </SchedulesContainer>
        </CalendarContainer>
      </LabelBox>
    </FlexBox>
  )
}

export default MyCodiPage
