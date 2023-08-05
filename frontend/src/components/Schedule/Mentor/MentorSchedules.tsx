import Card from "@/ui/atoms/Card";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import theme from "@/ui/theme";
import { css } from "@emotion/css";

const MentorSchedules = ({ mentorings }: { mentorings: any[] }) => (
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
            {times.map((time: string) => (
              <Chip color={theme.colors.white} outline key={index}>
                {time}
              </Chip>
            ))}
          </FlexBox>
        </div>
      );
    })}
  </Card>
);

export default MentorSchedules;
