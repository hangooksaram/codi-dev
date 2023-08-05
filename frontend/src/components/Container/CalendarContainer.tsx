import FlexBox from "@/ui/atoms/FlexBox";
import { device } from "@/ui/theme";
import { css } from "@emotion/css";
import SingleCalendar from "../Calendar/SingleCalendar";
import { ReactNode, SetStateAction } from "react";

import Card from "@/ui/atoms/Card";

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
    <FlexBox
      columnGap="20px"
      className={css({
        [device("tablet")]: {
          flexDirection: "column",
          columnGap: "0px",
          rowGap: "20px",
        },
      })}
    >
      <SingleCalendar type={type} date={date} setDate={setDate} />
      <Card padding="40px">{children}</Card>
    </FlexBox>
  );
};

export default CalendarContainer;
