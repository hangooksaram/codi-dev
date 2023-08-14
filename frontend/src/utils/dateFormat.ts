const formattedDate = (date: Date | undefined) => {
  const month = date?.getMonth()!;
  const day = date?.getDate()!;

  return date !== undefined
    ? `${date?.getFullYear()}/${month < 10 ? `0${month}` : month}/${
        day < 10 ? `0${day}` : day
      }`
    : "";
};

export const formattedMonth = (date: Date | undefined) => {
  const month = date?.getMonth()!;

  return date !== undefined
    ? `${date?.getFullYear()}/${month < 10 ? `0${month}` : month}`
    : "";
};

export default formattedDate;
