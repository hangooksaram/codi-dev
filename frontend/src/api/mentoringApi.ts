import customAxios from "./customAxios";

const getMentoringsByMonth = async (date: string) => {
  return (await customAxios.get(`/mock/${date}`)).data;
};

export { getMentoringsByMonth };
