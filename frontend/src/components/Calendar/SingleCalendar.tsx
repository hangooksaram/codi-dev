import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { ko } from "date-fns/locale";
import {
  Button,
  CaptionProps,
  DayContentProps,
  DayPicker,
  DayProps,
  useDayRender,
  useNavigation,
} from "react-day-picker";
import formattedDate from "@/utils/dateFormat";
import LeftIcon from "@icons/common/left-arrow.svg";
import RightIcon from "@icons/common/right-arrow.svg";
import styled from "@emotion/styled";
import CompletedSelected from "@icons/calendar/calendar-schedule-completed-selected.svg";
import Schedule from "@icons/calendar/calendar-schedule.svg";
import theme from "@/ui/theme";
import {
  CustomCaptionNavigation,
  CustomContentdates,
  dayPickerContainerStyle,
} from "./style";

const SingleCalendar = ({
  setSelected,
  type,
}: {
  setSelected: React.Dispatch<SetStateAction<string | undefined>>;
  type: "mentor" | "mentee";
}) => {
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    setSelected(formattedDate(date));
  }, [date]);
  return (
    <DayPicker
      style={dayPickerContainerStyle}
      mode="single"
      selected={date}
      onSelect={(date) => setDate(date)}
      components={{
        Day: CustomDay,
        DayContent: (props) =>
          CustomDayContent({
            ...props,
            selected: date,
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

interface CustomDayContentProps extends DayContentProps {
  selected?: Date;
}

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

export const CustomDayContent = ({ date, selected }: CustomDayContentProps) => {
  const today = new Date().getDate();
  const day = date.getDate();

  return (
    <div
      id={day.toString()}
      style={{ width: "50px", height: "64px", paddingTop: "14px" }}
    >
      <div style={{ marginBottom: "5px" }}>{day}</div>
      {today === day &&
        (selected?.getDate() === date.getDate() ? (
          <CompletedSelected />
        ) : (
          <Schedule />
        ))}
    </div>
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

export default SingleCalendar;
