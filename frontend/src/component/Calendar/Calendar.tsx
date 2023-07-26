import React, { Dispatch, SetStateAction, useEffect } from "react";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import {
  CustomCaption,
  CustomDay,
  CustomDayContent,
  dayPickerContainerStyle,
} from "./CustomElements";

const Calendar = ({
  selected,
  setSelected,
}: {
  selected: Date | undefined;
  setSelected: React.Dispatch<SetStateAction<Date | undefined>>;
}) => {
  useEffect(() => {
    setSelected(new Date());
  }, []);

  return (
    <DayPicker
      style={dayPickerContainerStyle}
      mode="single"
      selected={selected}
      onSelect={setSelected}
      components={{
        Day: CustomDay,
        DayContent: (props) =>
          CustomDayContent({
            ...props,
            selected,
          }),
        Caption: CustomCaption,
      }}
      modifiersClassNames={{
        selected: "calendar-selected",
      }}
      locale={ko}
    />
  );
};

export default Calendar;
