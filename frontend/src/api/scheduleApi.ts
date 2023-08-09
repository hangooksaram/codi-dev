import customAxios from "./customAxios";

const getSchedules = async (mentorId: number, date: string) => {
  return (await customAxios.get(`/${mentorId}/${date}`)).data;
};

export { getSchedules };
