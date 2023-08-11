"use client";

import MentoringsWithSingleCalendar from "@/components/Mentoring/MentoringsWithSingleCalendar";
import useMentoringsQuery from "@/queries/mentoringQuery";
import FlexBox from "@/ui/atoms/FlexBox";
import LabelBox from "@/ui/molecules/LabelBox";
import formattedDate from "@/utils/dateFormat";
import { useEffect, useState } from "react";

const MyCodiPage = () => {
  const [date, setDate] = useState<Date>();
  const { mentorings, refetch } = useMentoringsQuery(formattedDate(date));

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
