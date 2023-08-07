import FlexBox from "@/ui/atoms/FlexBox";
import { device } from "@/ui/theme";
import { css } from "@emotion/css";
import SingleCalendar from "../Calendar/SingleCalendar";
import { ReactNode, SetStateAction } from "react";

import Card from "@/ui/atoms/Card";
import styled from "@emotion/styled";

interface CalendarContainerProps {
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  type: "mentor" | "mentee";
  children: ReactNode;
}

const CalendarContainer = ({
  date,
  setDate,
  type,
  children,
}: CalendarContainerProps) => {
  return (
    <StyledCalendarContainer columnGap="20px">
      <SingleCalendar type={type} date={date} setDate={setDate} />
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
