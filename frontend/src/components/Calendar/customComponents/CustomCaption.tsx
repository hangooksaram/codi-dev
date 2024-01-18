import { CaptionProps, useNavigation } from 'react-day-picker'
import LeftIcon from '@icons/common/left-arrow.svg'
import RightIcon from '@icons/common/right-arrow.svg'
import { SetState } from '@/index'
import { formattedMonth } from '@/utils/dateFormat'
import { CustomCaptionNavigation, CustomContentDates } from '../style'
import theme from '@/ui/theme'

interface CustomCaptionProps extends CaptionProps {
  setMonth: SetState<string | undefined>
}

export function CustomCaption(props: CustomCaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation()
  const handleGoToMonth = (direction: Date) => {
    if (direction === previousMonth) previousMonth && goToMonth(previousMonth)
    else nextMonth && goToMonth(nextMonth)
    props.setMonth(formattedMonth(direction))
  }
  return (
    <CustomContentDates>
      <CustomCaptionNavigation
        disabled={!previousMonth}
        type="button"
        onClick={() => handleGoToMonth(previousMonth!)}
      >
        <LeftIcon width={24} height={24} fill={theme.colors.gray.main} />
      </CustomCaptionNavigation>

      {`${new Date(props.displayMonth).getFullYear()}.${
        new Date(props.displayMonth).getMonth() + 1
      }`}

      <CustomCaptionNavigation
        disabled={!nextMonth}
        onClick={() => handleGoToMonth(nextMonth!)}
      >
        <RightIcon width={24} height={24} fill={theme.colors.gray.main} />
      </CustomCaptionNavigation>
    </CustomContentDates>
  )
}
