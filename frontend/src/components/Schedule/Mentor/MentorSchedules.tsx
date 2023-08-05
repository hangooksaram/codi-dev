import { Schedule } from "@/types/schedule";
import Card from "@/ui/atoms/Card";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import theme from "@/ui/theme";
import { css } from "@emotion/css";
import { useEffect } from "react";

const MentorSchedules = ({ date }: { date?: string }) => {
  useEffect(() => {
    // api 호출 코드
  }, [date]);
  return (
    <Card padding="45px">
      {mentorings.map(({ date, times }, index) => {
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
              {times.map(({ time, status }) => (
                <Chip
                  color={
                    status === "ACCEPTED"
                      ? theme.colors.primary
                      : theme.colors.white
                  }
                  fontColor={
                    status === "ACCEPTED"
                      ? theme.colors.white
                      : theme.colors.gray.main
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
const mentorings = [
  {
    date: "2023/05/11",
    times: [
      {
        time: "10:00-10:50",
        status: "ACCEPTED",
      },
      {
        time: "10:00-10:50",
        status: "ACCEPTED",
      },
      {
        time: "10:00-10:50",
        status: "ACCEPTED",
      },
    ],
  },
  {
    date: "2023/05/13",
    times: [
      {
        time: "10:00-10:50",
        status: "ACCEPTED",
      },
      {
        time: "10:00-10:50",
        status: "",
      },
      {
        time: "10:00-10:50",
        status: "",
      },
    ],
  },
  {
    date: "2023/05/12",
    times: [
      {
        time: "10:00-10:50",
        status: "",
      },
      {
        time: "10:00-10:50",
        status: "",
      },
      {
        time: "10:00-10:50",
        status: "",
      },
    ],
  },
] as Schedule[];
