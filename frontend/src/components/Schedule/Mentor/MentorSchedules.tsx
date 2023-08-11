import { selectUser } from "@/features/user/userSlice";
import { useMonthlySchedulesQuery } from "@/queries/scheduleQuery";
import { Schedule } from "@/types/schedule";
import Card from "@/ui/atoms/Card";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import theme from "@/ui/theme";
import { formattedMonth } from "@/utils/dateFormat";
import { css } from "@emotion/css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MentorSchedules = ({ date }: { date?: string }) => {
  const { mentorId } = useSelector(selectUser);
  const { data } = useMonthlySchedulesQuery(
    mentorId!,
    formattedMonth(new Date())
  );
  useEffect(() => {
    // api 호출 코드
  }, [date]);
  return (
    <Card padding="45px">
      {data?.days?.map(({ date, times }, index) => {
        return (
          <div
            className={css({ width: "100%", marginBottom: "30px" })}
            key={index}
          >
            <div>{date}</div>
            <FlexBox
              justifyContent="flex-start"
              isWrap
              columnGap="20px"
              rowGap="20px"
              {...{ marginTop: "15px" }}
            >
              {times.map(({ time, enabled }) => (
                <Chip
                  color={enabled ? theme.colors.primary : theme.colors.white}
                  fontColor={
                    enabled ? theme.colors.white : theme.colors.gray.main
                  }
                  outline
                  key={index}
                >
                  {time}
                </Chip>
              ))}
            </FlexBox>
          </div>
        );
      })}
    </Card>
  );
};

export default MentorSchedules;
