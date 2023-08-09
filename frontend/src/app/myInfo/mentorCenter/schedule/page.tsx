"use client";

import SingleCalendar from "@/components/Calendar/SingleCalendar";
import MentoringsWithSingleCalendar from "@/components/Mentoring/MentoringsWithSingleCalendar";
import MentorScheduleEdit from "@/components/Schedule/Mentor/MentorScheduleEdit";
import MentorSchedules from "@/components/Schedule/Mentor/MentorSchedules";

import useGetMentoringsQuery from "@/queries/mentoringQuery";
import Button from "@/ui/atoms/Button";

import LabelBox from "@/ui/molecules/LabelBox";
import formattedDate from "@/utils/dateFormat";

import { useEffect, useState } from "react";

const SchedulePage = () => {
  const [date, setDate] = useState<Date>();
  const [type, setType] = useState<"mentor" | "mentee">("mentee");
  const [isEdit, setIsEdit] = useState(false);
  const { mentorings, refetch } = useGetMentoringsQuery(formattedDate(date));

  const toggleEditState = () => {
    setType((prev) => (prev === "mentor" ? "mentee" : "mentor"));
    setIsEdit((prev) => !prev);
    if (!date) setDate(new Date());
  };

  useEffect(() => {
    if (date) {
      refetch();
    }
  }, [date]);
  return (
    <LabelBox
      text="멘토링 일정 관리"
      helpText="멘토링 시간은 2주 전부터 한 달 단위로 설정 가능합니다."
      adorement={
        <Button
          disabled={date && date?.getDate() < new Date().getDate()}
          onClick={toggleEditState}
          variant="default"
        >
          일정편집
        </Button>
      }
    >
      <MentoringsWithSingleCalendar
        type={type}
        date={date}
        setDate={setDate}
        mentorings={mentorings}
      />
      {isEdit ? (
        <MentorScheduleEdit
          date={formattedDate(date)}
          toggleEditState={toggleEditState}
        />
      ) : (
        <MentorSchedules date={formattedDate(date)} />
      )}
    </LabelBox>
  );
};

export default SchedulePage;
