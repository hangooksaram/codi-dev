"use client";

import CalendarContainer from "@/components/Container/CalendarContainer";
import Mentorings from "@/components/Mentoring/Mentorings";
import MentoringsWithSingleCalendar, {
  SchedulesContainer,
} from "@/components/Mentoring/MentoringsWithSingleCalendar";
import { selectUser } from "@/features/user/userSlice";
import {
  useDailyMentoringsQuery,
  useMonthlyMentoringsQuery,
} from "@/queries/mentoring/commonMentoringQuery";

import FlexBox from "@/ui/atoms/FlexBox";
import LabelBox from "@/ui/molecules/LabelBox";
import formattedDate, { formattedMonth } from "@/utils/dateFormat";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyCodiPage = () => {
  const { profileId } = useSelector(selectUser);
  const [date, setDate] = useState<Date>();
  const [type, setType] = useState<"mentor" | "mentee">("mentee");

  const [month, setMonth] = useState<string>();
  const { data: mentoringsData } = useMonthlyMentoringsQuery({
    profileId: profileId!,
    month: month ?? formattedMonth(new Date()),
  });
  const { data: dailyMentoringData, refetch } = useDailyMentoringsQuery({
    profileId: profileId!,
    date: formattedDate(date),
  });

  const mentoringSchedules = mentoringsData?.monthlyMentoringMembers!.map(
    ({ date, mentoringStatus }) => ({
      date,
      mentoringStatus,
    })
  );

  useEffect(() => {
    if (date) {
      refetch();
    }
  }, [date]);
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
  );
};

export default MyCodiPage;
