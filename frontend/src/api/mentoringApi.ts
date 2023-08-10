import customAxios from "./customAxios";

export const getMentoringsByMonth = async (date: string) => {
  return (await customAxios.get(`/mock/${date}`)).data;
};
