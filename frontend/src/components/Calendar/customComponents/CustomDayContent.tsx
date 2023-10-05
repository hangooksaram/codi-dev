import { DailyMentoringStatus } from "@/types/mentoring";
import theme, { device } from "@/ui/theme";
import { formattedDate } from "@/utils/dateFormat";
import styled from "@emotion/styled";
import Mentoring from "@icons/calendar/calendar-mentoring.svg";
import Schedule from "@icons/calendar/calendar-schedule.svg";
import { DayContentProps } from "react-day-picker";

interface CustomDayContentProps extends DayContentProps {
  selected?: Date;
  schedules?: string[];
  mentoringSchedules?: DailyMentoringStatus[];
}

export const CustomDayContent = ({
  date,
  selected,
  schedules,
  mentoringSchedules,
}: CustomDayContentProps) => {
  const day = date.getDate();
  const isSchedule = schedules?.includes(formattedDate(date));
  const isScheduleWithMentoring = mentoringSchedules?.some(
    ({ date: mentoringDate }) => mentoringDate === formattedDate(date)
  );

  const icon = () => {
    if (isSchedule) return <Schedule />;
    if (isScheduleWithMentoring) {
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
  };
  return (
    <CustomCell id={day.toString()}>
      <div style={{ marginBottom: "5px" }}>{day}</div>
      {icon()}
    </CustomCell>
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
