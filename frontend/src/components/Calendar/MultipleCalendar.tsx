import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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
import SelectedSchedule from "@icons/calendar/calendar-schedule-selected.svg";
import Schedule from "@icons/calendar/calendar-schedule.svg";
import CompletedSchedule from "@icons/calendar/calendar-schedule-completed.svg";
import styled from "@emotion/styled";
import theme from "@/ui/theme";
import {
  CustomCaptionNavigation,
  CustomContentdates,
  dayPickerContainerStyle,
} from "./style";

/**기능 변경으로 인해 사용되지않음. 추후에 다시 사용될 수 있음. */
const MultipleCalendar = ({
  selecteds,
  setSelecteds,
}: {
  selecteds: string[];
  setSelecteds: React.Dispatch<SetStateAction<string[]>>;
}) => {
  const initials: Date[] = [];
  const [dates, setDates] = useState<Date[] | undefined>(initials);
  const [currentDate, setCurrentDate] = useState<Date>();

  useEffect(() => {
    if (dates !== undefined && dates.length > 0) {
      if (selecteds.find((day) => day === formattedDate(currentDate))) {
        setSelecteds((prev) =>
          prev?.filter((sDay) => sDay !== formattedDate(currentDate))
        );
        return;
      }

      setSelecteds((prev) => prev?.concat(formattedDate(currentDate)));
    }
  }, [dates]);

  return (
    <DayPicker
      style={dayPickerContainerStyle}
      mode="multiple"
      selected={dates}
      onSelect={setDates}
      components={{
        Day: (props) =>
          CustomDay({
            ...props,
            setCurrentDate,
          }),
        DayContent: (props) =>
          CustomDayContent({
            ...props,
            selected: dates,
          }),
        Caption: CustomCaption,
      }}
      modifiersClassNames={{
        selected: "mentor-calendar-selected",
      }}
      locale={ko}
    />
  );
};

const CustomDay = (props: CustomDayProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);

  dayRender.buttonProps.style = {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
  };
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dayRender.buttonProps?.onClick?.(e);
    props.setCurrentDate(props.date);
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

const CustomDayContent = ({ date, selected }: CustomDayContentProps) => {
  const today = new Date().getDate();
  const day = date.getDate();

  const selecteDay = selected?.find((dates) => dates.getDate() === day);

  return (
    <div
      id={day.toString()}
      style={{ width: "50px", height: "64px", paddingTop: "14px" }}
    >
      <div style={{ marginBottom: "5px" }}>{day}</div>
      {today === day &&
        (selecteDay?.getDate() === date.getDate() ? (
          <SelectedSchedule />
        ) : (
          <Schedule />
        ))}
    </div>
  );
};

const CustomCaption = (props: CaptionProps) => {
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

interface CustomDayContentProps extends DayContentProps {
  selected?: Date[];
}

interface CustomDayProps extends DayProps {
  setCurrentDate: Dispatch<SetStateAction<Date | undefined>>;
}

export default MultipleCalendar;