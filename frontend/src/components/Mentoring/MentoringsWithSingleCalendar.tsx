import FlexBox from "@/ui/atoms/FlexBox";
import { device } from "@/ui/theme";
import { css } from "@emotion/css";
import SingleCalendar from "../Calendar/SingleCalendar";
import { SetStateAction, useEffect } from "react";

import Card from "@/ui/atoms/Card";
import Mentorings from "./Mentorings";
import styled from "@emotion/styled";
import CalendarContainer from "../Container/CalendarContainer";

interface MentoringsWithSingleCalendarProps {
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  mentorings: any[];
  type: "mentor" | "mentee";
}

const MentoringsWithSingleCalendar = ({
  date,
  setDate,
  mentorings,
  type,
}: MentoringsWithSingleCalendarProps) => {
  return (
    <CalendarContainer date={date} setDate={setDate} type={type}>
      <SchedulesContainer>
        <Mentorings mentorings={mentorings} />
      </SchedulesContainer>
    </CalendarContainer>
  );
};
const SchedulesContainer = styled.div({
  maxHeight: "510px",
  overflowY: "auto",
});

export default MentoringsWithSingleCalendar;
