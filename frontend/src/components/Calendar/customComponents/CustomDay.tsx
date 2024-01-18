import { useRef } from 'react'
import { Button, DayProps, useDayRender } from 'react-day-picker'
import Label from '@/ui/atoms/Label'
import { accessibleFormattedDate, formattedDate } from '@/utils/dateFormat'

export function CustomDay(props: DayProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef)

  dayRender.buttonProps.style = {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
  }
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dayRender.buttonProps?.onClick?.(e)
  }
  if (dayRender.isHidden) {
    return <></>
  }
  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />
  }

  return (
    <>
      <Label
        htmlFor={props.date.toString()}
        text={accessibleFormattedDate(props.date)}
      />
      <Button
        id={props.date.toString()}
        {...dayRender.buttonProps}
        ref={buttonRef}
        onClick={handleClick}
      />
    </>
  )
}
