import LeftIcon from "../../../public/icons/left-arrow.svg";
import RightIcon from "../../../public/icons/right-arrow.svg";
import styled from "@emotion/styled";
import CompletedSelected from "../../../public/icons/calendar-schedule-completed-selected.svg";
import Schedule from "../../../public/icons/calendar-schedule.svg";

import {
  Button,
  CaptionProps,
  DayContentProps,
  DayProps,
  useDayRender,
  useNavigation,
} from "react-day-picker";
import theme from "@/ui/theme";
import { useRef } from "react";

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
    console.log(e);
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
      <div>{day}</div>
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
    <CustomContentDate>
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
    </CustomContentDate>
  );
};

export const dayPickerContainerStyle = {
  maxWidth: "482px",
  maxHeight: "590px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
  border: `1px solid ${theme.colors.gray.main}`,
  background: theme.colors.white,
};

const CustomCaptionNavigation = styled.button`
  height: 24px;
  border: none;
  outline: none;
  background-color: transparent;
`;

const CustomContentDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  size: ${theme.fonts.size.md};
  font-weight: ${theme.fonts.weight.regular};
`;
