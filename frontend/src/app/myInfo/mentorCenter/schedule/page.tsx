"use client";

import SingleCalendar from "@/components/Calendar/SingleCalendar";
import FlexBox from "@/ui/atoms/FlexBox";
import LabelBox from "@/ui/molecules/LabelBox";

import { useState } from "react";

const SchedulePage = () => {
  const [selected, setSelected] = useState<string>();
  return (
    <LabelBox
      text="멘토링일정관리"
      helpText="멘토링시간은 2주 전부터 한 달 단위로 설정 가능합니다."
    >
      <FlexBox>
        <SingleCalendar type="mentor" setSelected={setSelected} />
      </FlexBox>
    </LabelBox>
  );
};

export default SchedulePage;
