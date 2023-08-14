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
import formattedDate, { formattedMonth } from "@/utils/dateFormat";
import LeftIcon from "@icons/common/left-arrow.svg";
import RightIcon from "@icons/common/right-arrow.svg";
import styled from "@emotion/styled";
import SelectedMentoring from "@icons/calendar/calendar-mentoring-selected.svg";
import Mentoring from "@icons/calendar/calendar-mentoring.svg";
import CompletedMentoring from "@icons/calendar/calendar-mentoring-completed.svg";
import Schedule from "@icons/calendar/calendar-schedule.svg";
import theme, { device } from "@/ui/theme";
import {
  CustomCaptionNavigation,
  CustomContentdates,
  dayPickerContainerStyle,
} from "./style";
import { format } from "date-fns";
import { DailyMentoringStatus, MentoringMember } from "@/types/mentoring";
import { SetState } from "@/index";

interface CustomDayContentProps extends DayContentProps {
  selected?: Date;
  schedules?: string[];
  mentoringSchedules?: DailyMentoringStatus[];
}

interface CustomCaptionProps extends CaptionProps {
  setMonth: SetState<string | undefined>;
}

const SingleCalendar = ({
  date,
  setDate,
  setMonth,
  type,
  mentoringSchedules,
  schedules,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  setMonth: React.Dispatch<SetStateAction<string | undefined>>;
  type: "mentor" | "mentee";
  mentoringSchedules?: DailyMentoringStatus[];
  schedules: string[];
}) => {
  const maxDay = new Date();
  const endDay = new Date(9999, 9, 9);
  maxDay.setDate(new Date().getDate() + 30);

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
            schedules,
            mentoringSchedules,
          }),
        Caption: (props) => CustomCaption({ ...props, setMonth }),
      }}
      modifiersClassNames={{
        selected:
          type === "mentor" ? "mentor-calendar-selected" : "calendar-selected",
        today: "calendar-today",
      }}
      locale={ko}
      disabled={{
        from: maxDay,
        to: endDay,
      }}
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
  schedules,
  mentoringSchedules,
}: CustomDayContentProps) => {
  const day = date.getDate();

  const icon = () => {
    if (
      mentoringSchedules?.some(
        ({ date: mentoringDate }) => mentoringDate === formattedDate(date)
      )
    ) {
      return (
        <Mentoring
          fill={
            date.getDate() === selected?.getDate()
              ? theme.colors.white
              : theme.colors.primary
          }
        />
      );
    }
    if (schedules?.includes(formattedDate(date))) return <Schedule />;
  };
  return (
    <CustomCell id={day.toString()}>
      <div style={{ marginBottom: "5px" }}>{day}</div>
      {icon()}
    </CustomCell>
  );
};

export const CustomCaption = (props: CustomCaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const handleGoToMonth = (direction: Date) => {
    if (direction === previousMonth) previousMonth && goToMonth(previousMonth);
    else nextMonth && goToMonth(nextMonth);

    props.setMonth(formattedMonth(direction));
  };
  return (
    <CustomContentdates>
      <CustomCaptionNavigation
        disabled={!previousMonth}
        onClick={() => handleGoToMonth(previousMonth!)}
      >
        <LeftIcon />
      </CustomCaptionNavigation>

      {`${new Date(props.displayMonth).getFullYear()}.${new Date(
        props.displayMonth
      ).getMonth()}`}

      <CustomCaptionNavigation
        disabled={!nextMonth}
        onClick={() => handleGoToMonth(nextMonth!)}
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
