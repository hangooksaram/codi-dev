"use client";

import MultipleCalendar from "@/components/Calendar/MultipleCalendar";
import SingleCalendar from "@/components/Calendar/SingleCalendar";
import Schedules from "@/components/Schedule/Schedules";

import FlexBox from "@/ui/atoms/FlexBox";
import { useEffect, useState } from "react";

const MyCodiPage = () => {
  const [selected, setSelected] = useState<string>();
  const [selecteds, setSelecteds] = useState<string[]>([]);
  useEffect(() => {
    console.log(selecteds);
  }, [selecteds]);
  return (
    <FlexBox>
      <SingleCalendar type="mentee" setSelected={setSelected} />
      {/* <Schedules schedules={[selected]} /> */}
    </FlexBox>
  );
};

export default MyCodiPage;
