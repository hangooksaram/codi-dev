"use client";

import MentoringsWithSingleCalendar from "@/components/Mentoring/MentoringsWithSingleCalendar";
import { selectUser } from "@/features/user/userSlice";
import { useMonthlyMentoringsQuery } from "@/queries/mentoring/commonMentoringQuery";

import FlexBox from "@/ui/atoms/FlexBox";
import LabelBox from "@/ui/molecules/LabelBox";
import formattedDate from "@/utils/dateFormat";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyCodiPage = () => {
  const { profileId } = useSelector(selectUser);
  const [date, setDate] = useState<Date>();
  const { mentorings, refetch } = useMonthlyMentoringsQuery({
    profileId: profileId!,
    month: formattedDate(date),
  });

  useEffect(() => {
    if (date) {
      refetch();
    }
  }, [date]);
  return (
    <FlexBox>
      <LabelBox text="멘토링 일정 관리">
        <MentoringsWithSingleCalendar
          type="mentee"
          date={date}
          setDate={setDate}
          mentorings={mentorings}
        />
      </LabelBox>
    </FlexBox>
  );
};

export default MyCodiPage;
