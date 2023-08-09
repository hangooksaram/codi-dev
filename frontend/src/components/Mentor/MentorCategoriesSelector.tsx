import Prepare from "@icons/mentorCategories/prepare.svg";
import Direction from "@icons/mentorCategories/direction.svg";
import Info from "@icons/mentorCategories/info.svg";
import JobPrepare from "@icons/mentorCategories/jobPrepare.svg";
import Power from "@icons/mentorCategories/power.svg";
import Share from "@icons/mentorCategories/share.svg";
import Social from "@icons/mentorCategories/social.svg";
import Tech from "@icons/mentorCategories/tech.svg";
import { Dispatch, SetStateAction } from "react";
import theme from "@/ui/theme";
import MentorCategoryButton from "./MentoringCategoryButton";
import FlexBox from "@/ui/atoms/FlexBox";

export const MENTOR_CATEGORIES = [
  { iconComponent: Prepare, text: "면접대비", value: "PREPARINGINTERVIEW" },
  { iconComponent: Direction, text: "커리어방향", value: "CAREERDIRECTION" },
  { iconComponent: Info, text: "일자리정보", value: "JOBINFORMATION" },
  { iconComponent: JobPrepare, text: "취업준비", value: "PREPARATIONEMPLOY" },
  { iconComponent: Power, text: "업무역량", value: "WORKCOMPETENCY" },
  { iconComponent: Share, text: "경험공유", value: "SHARINGEXPERIENCE" },
  { iconComponent: Social, text: "사회생활", value: "SOCIALSKILL" },
  { iconComponent: Tech, text: "실무/기술", value: "PRACTICALSKILL" },
];

const MentorCategoriesSelector = ({
  mentorCategories,
  setMentorCategories,
}: {
  mentorCategories: string[];
  setMentorCategories: Dispatch<SetStateAction<string[]>>;
}) => (
  <FlexBox justifyContent="flex-start" columnGap="10px" rowGap="10px" isWrap>
    {MENTOR_CATEGORIES.map(({ iconComponent: IconComponent, text }, index) => (
      <div
        key={index}
        onClick={() => {
          if (mentorCategories.includes(text))
            setMentorCategories((prev) =>
              prev.filter((category) => category !== text)
            );
          else setMentorCategories([...mentorCategories, text]);
        }}
      >
        <MentorCategoryButton
          variant="square"
          type="button"
          selected={mentorCategories.includes(text)}
          disabled={
            !mentorCategories.includes(text) && mentorCategories.length > 3
          }
        >
          <IconComponent
            fill={
              mentorCategories.includes(text)
                ? theme.colors.white
                : theme.colors.primary
            }
          />
          {text}
        </MentorCategoryButton>
      </div>
    ))}
  </FlexBox>
);

export default MentorCategoriesSelector;
