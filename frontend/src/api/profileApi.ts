import customAxios from "./customAxios";

const registerProfile = async (profile: FormData) =>
  (await customAxios.post(`/${profile.get("id")}`, profile)).data;

export { registerProfile };
