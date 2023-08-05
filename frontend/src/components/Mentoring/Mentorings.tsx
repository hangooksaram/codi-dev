import Chip from "@/ui/atoms/Chip";
import MentoringCard from "./MentoringCard";
import FlexBox from "@/ui/atoms/FlexBox";
import theme from "@/ui/theme";
import { css } from "@emotion/css";

const Mentorings = ({ mentorings }: { mentorings: any[] }) => {
  const completed = false;
  const accepted = false;

  return mentorings.map(({ date, times }, index) => {
    return (
      <div className={css({ width: "100%", marginBottom: "30px" })} key={index}>
        <Chip color={chipColor(completed, accepted)}>{date}</Chip>
        <FlexBox
          justifyContent="flex-start"
          isWrap
          columnGap="20px"
          rowGap="20px"
          {...{ marginTop: "10px" }}
        >
          {times.map((time: string) => (
            <MentoringCard date={date} time={time} key={index} />
          ))}
        </FlexBox>
      </div>
    );
  });
};

const chipColor = (completed: boolean, accepted: boolean) => {
  if (completed) return theme.colors.info;
  if (accepted) return theme.colors.primary;
  return theme.colors.gray.main;
};

export default Mentorings;
