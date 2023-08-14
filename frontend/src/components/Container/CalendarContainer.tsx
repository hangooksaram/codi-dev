import FlexBox from "@/ui/atoms/FlexBox";
import { device } from "@/ui/theme";
import { css } from "@emotion/css";
import SingleCalendar from "../Calendar/SingleCalendar";
import { ReactNode, SetStateAction } from "react";

import Card from "@/ui/atoms/Card";
import styled from "@emotion/styled";
import { DailyMentoringStatus, MentoringMember } from "@/types/mentoring";

interface CalendarContainerProps {
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  setMonth: React.Dispatch<SetStateAction<string | undefined>>;
  type: "mentor" | "mentee";
  children: ReactNode;
  schedules: string[];

  mentoringSchedules?: DailyMentoringStatus[];
}

const CalendarContainer = ({
  date,
  setDate,
  setMonth,
  type,
  children,
  schedules,
  mentoringSchedules,
}: CalendarContainerProps) => {
  return (
    <StyledCalendarContainer columnGap="20px">
      <SingleCalendar
        type={type}
        date={date}
        setDate={setDate}
        setMonth={setMonth}
        schedules={schedules}
        mentoringSchedules={mentoringSchedules}
      />
      <Card padding="40px">{children}</Card>
    </StyledCalendarContainer>
  );
};

const StyledCalendarContainer = styled(FlexBox)({
  height: "590px",
  [device("tablet")]: {
    flexDirection: "column",
    columnGap: "0px",
    rowGap: "20px",
  },
});

export default CalendarContainer;
