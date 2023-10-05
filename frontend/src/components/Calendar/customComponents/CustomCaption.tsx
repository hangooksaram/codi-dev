import { SetState } from "@/index";
import { formattedMonth } from "@/utils/dateFormat";
import { CaptionProps, useNavigation } from "react-day-picker";
import { CustomCaptionNavigation, CustomContentDates } from "../style";
import LeftIcon from "@icons/common/left-arrow.svg";
import RightIcon from "@icons/common/right-arrow.svg";

interface CustomCaptionProps extends CaptionProps {
  setMonth: SetState<string | undefined>;
}

export const CustomCaption = (props: CustomCaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const handleGoToMonth = (direction: Date) => {
    if (direction === previousMonth) previousMonth && goToMonth(previousMonth);
    else nextMonth && goToMonth(nextMonth);
    props.setMonth(formattedMonth(direction));
  };
  return (
    <CustomContentDates>
      <CustomCaptionNavigation
        disabled={!previousMonth}
        type="button"
        onClick={() => handleGoToMonth(previousMonth!)}
      >
        <LeftIcon />
      </CustomCaptionNavigation>

      {`${new Date(props.displayMonth).getFullYear()}.${
        new Date(props.displayMonth).getMonth() + 1
      }`}

      <CustomCaptionNavigation
        disabled={!nextMonth}
        onClick={() => handleGoToMonth(nextMonth!)}
      >
        <RightIcon />
      </CustomCaptionNavigation>
    </CustomContentDates>
  );
};
