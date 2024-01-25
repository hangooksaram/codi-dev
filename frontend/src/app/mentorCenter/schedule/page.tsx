'use client'

import { css } from '@emotion/css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SingleCalendar from '@/components/Calendar/SingleCalendar'
import MentoringsWithSingleCalendar, {
  SchedulesContainer,
} from '@/components/Mentoring/MentoringsWithSingleCalendar'
import MentorScheduleEdit from '@/components/Schedule/Mentor/MentorScheduleEdit'

import { selectUser } from '@/features/user/userSlice'
import {
  useDailyMentoringsQuery,
  useMonthlyMentoringsQuery,
} from '@/queries/mentoring/commonMentoringQuery'
import Button from '@/ui/atoms/Button'

import LabelBox from '@/ui/molecules/LabelBox'
import { formattedDate, formattedMonth } from '@/utils/dateFormat'

import useDailySchedulesQuery, {
  useMonthlySchedulesQuery,
} from '@/queries/scheduleQuery'
import MentorSchedules from '@/components/Schedule/Mentor/MentorSchedules'
import CalendarContainer from '@/components/Container/CalendarContainer'
import Mentorings from '@/components/Mentoring/Mentorings'

function SchedulePage() {
  const [date, setDate] = useState<Date>()
  const [month, setMonth] = useState<string>()

  const [type, setType] = useState<'mentor' | 'mentee'>('mentee')
  const [isEdit, setIsEdit] = useState(false)
  const { data: dailySchedules } = useDailySchedulesQuery(formattedDate(date))
  const { data: monthlySchedules, refetch: refetchMonthlySchedule } =
    useMonthlySchedulesQuery(formattedMonth(new Date()))

  const { data: mentoringsData } = useMonthlyMentoringsQuery({
    month: month ?? formattedMonth(new Date()),
    type: 'mentors',
  })

  const { data: dailyMentoringData } = useDailyMentoringsQuery({
    date: formattedDate(date),
    type: 'mentors',
  })

  const mentoringSchedules = mentoringsData?.monthlyMentoringMembers!.map(
    ({ date, mentoringStatus }) => ({
      date,
      mentoringStatus,
    }),
  )

  const toggleEditState = () => {
    setType((prev) => (prev === 'mentor' ? 'mentee' : 'mentor'))
    setIsEdit((prev) => !prev)
    if (!date) {
      setDate(new Date())
    }
  }

  return (
    <LabelBox
      text="멘토링 일정 관리"
      helpText="멘토링 시간은 2주 전부터 한 달 단위로 설정 가능합니다."
      adornment={
        <Button
          disabled={date && date?.getDate() < new Date().getDate()}
          onClick={toggleEditState}
          variant="default"
          size="small"
          {...{ minWidth: 'fit-content', marginBottom: '20px' }}
        >
          일정편집
        </Button>
      }
    >
      {/* <MentoringsWithSingleCalendar
        type={type}
        date={date}
        setDate={setDate}
        setMonth={setMonth}
        mentorings={
          date ? dailyMentoringData! : mentoringsData?.monthlyMentoringMembers
        }
        schedules={}
      /> */}
      <CalendarContainer
        date={date}
        setDate={setDate}
        setMonth={setMonth}
        type={type}
        schedules={monthlySchedules?.days.map(({ date }) => date)!}
        mentoringSchedules={mentoringSchedules}
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
      <div className={css({ marginTop: '20px' })}>
        {isEdit ? (
          <MentorScheduleEdit
            date={formattedDate(date)}
            schedules={dailySchedules!}
            toggleEditState={toggleEditState}
            refetchMonthlySchedule={refetchMonthlySchedule}
          />
        ) : (
          <MentorSchedules
            schedules={date ? dailySchedules! : monthlySchedules?.days!}
          />
        )}
      </div>
    </LabelBox>
  )
}

export default SchedulePage
