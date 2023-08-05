"use client";

import SingleCalendar from "@/components/Calendar/SingleCalendar";
import CalendarContainer from "@/components/Container/CalendarContainer";
import { SCHEDULE_TIME_TABLE } from "@/constants";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import Grid from "@/ui/atoms/Grid";
import LabelBox from "@/ui/molecules/LabelBox";
import theme from "@/ui/theme";
import { useState } from "react";

const MentoringApplyFormPage = () => {
  const [date, setDate] = useState<Date>();
  return (
    <>
      <CalendarContainer date={date} setDate={setDate} type="mentee">
        <FlexBox
          isWrap
          justifyContent="flex-start"
          columnGap="15px"
          rowGap="15px"
        >
          {SCHEDULE_TIME_TABLE.map((time, index) => (
            <Chip color={theme.colors.background} key={index}>
              {time}
            </Chip>
          ))}
        </FlexBox>
      </CalendarContainer>
      <LabelBox text="원하는 멘토링 분야" helpText="(최대 4자)"></LabelBox>

      <LabelBox text="하고싶은 말" helpText="(최소 50자)"></LabelBox>
    </>
  );
};

export default MentoringApplyFormPage;
