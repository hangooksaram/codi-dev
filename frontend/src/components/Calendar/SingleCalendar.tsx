import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { ko } from "date-fns/locale";
import {
  Button,
  CaptionProps,
  DayContentProps,
  DayPicker,
  DateFormatter,
  DayProps,
  useDayRender,
  useNavigation,
} from "react-day-picker";
import formattedDate from "@/utils/dateFormat";
import LeftIcon from "@icons/common/left-arrow.svg";
import RightIcon from "@icons/common/right-arrow.svg";
import styled from "@emotion/styled";
import SelectedSchedule from "@icons/calendar/calendar-schedule-selected.svg";
import Schedule from "@icons/calendar/calendar-schedule.svg";
import CompletedSchedule from "@icons/calendar/calendar-schedule-completed.svg";
import theme, { device } from "@/ui/theme";
import {
  CustomCaptionNavigation,
  CustomContentdates,
  dayPickerContainerStyle,
} from "./style";
import { format } from "date-fns";

interface CustomDayContentProps extends DayContentProps {
  selected?: Date;
  mentoringDates?: string[];
}

const SingleCalendar = ({
  date,
  setDate,
  type,
  mentoringDates,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  type: "mentor" | "mentee";
  mentoringDates?: string[];
}) => {
  return (
    <DayPicker
      style={dayPickerContainerStyle}
      mode="single"
      selected={date}
      onSelect={setDate}
      components={{
        Day: CustomDay,
        DayContent: (props) =>
          CustomDayContent({
            ...props,
            selected: date,
            mentoringDates,
          }),
        Caption: CustomCaption,
      }}
      modifiersClassNames={{
        selected:
          type === "mentor" ? "mentor-calendar-selected" : "calendar-selected",
        today: "calendar-today",
      }}
      locale={ko}
    />
  );
};

export const CustomDay = (props: DayProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);

  dayRender.buttonProps.style = {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
  };
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dayRender.buttonProps?.onClick?.(e);
  };
  if (dayRender.isHidden) {
    return <></>;
  }
  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />;
  }

  return (
    <Button {...dayRender.buttonProps} ref={buttonRef} onClick={handleClick} />
  );
};

export const CustomDayContent = ({
  date,
  selected,
  mentoringDates,
}: CustomDayContentProps) => {
  const day = date.getDate();

  return (
    <CustomCell id={day.toString()}>
      <div style={{ marginBottom: "5px" }}>{day}</div>
      {mentoringDates?.includes(formattedDate(date)) &&
        (selected?.getDate() === date.getDate() ? (
          <SelectedSchedule />
        ) : (
          <Schedule />
        ))}
    </CustomCell>
  );
};

export const CustomCaption = (props: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  return (
    <CustomContentdates>
      <CustomCaptionNavigation
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <LeftIcon />
      </CustomCaptionNavigation>

      {`${new Date(props.displayMonth).getFullYear()}.${new Date(
        props.displayMonth
      ).getMonth()}`}

      <CustomCaptionNavigation
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <RightIcon />
      </CustomCaptionNavigation>
    </CustomContentdates>
  );
};
const CustomCell = styled.div({
  width: "50px",
  height: "64px",
  marginTop: "8px",
  paddingTop: "14px",
  [device("mobile")]: {
    width: "40px",
    height: "54px",
  },
});

export default SingleCalendar;
