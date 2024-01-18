export const formattedDate = (date: Date | undefined) => {
  const month = date?.getMonth()! + 1
  const day = date?.getDate()!

  return date !== undefined
    ? `${date?.getFullYear()}/${month < 10 ? `0${month}` : month}/${
        day < 10 ? `0${day}` : day
      }`
    : ''
}

export const accessibleFormattedDate = (date: Date | undefined) => {
  const month = date?.getMonth()! + 1
  const day = date?.getDate()!

  return date !== undefined
    ? `${date?.getFullYear()}년 ${month < 10 ? `0${month}` : month}월 ${
        day < 10 ? `0${day}` : day
      }일`
    : ''
}

export const formattedMonth = (date: Date | undefined) => {
  const month = date?.getMonth()! + 1

  return date !== undefined
    ? `${date?.getFullYear()}/${month < 10 ? `0${month}` : month}`
    : ''
}

export const disabledDays = () => {
  const MAX_DAY = new Date(9999, 9, 9)
  const MIN_DAY = new Date(1999, 9, 9)
  const endDay = new Date()
  endDay.setDate(new Date().getDate() + 30)
  const yesterday = new Date()
  yesterday.setDate(new Date().getDate() - 1)

  return [
    {
      from: endDay,
      to: MAX_DAY,
    },
    {
      from: MIN_DAY,
      to: yesterday,
    },
  ]
}
