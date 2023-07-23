import axios from "axios";
import { BASE_URL } from "./signApi";

const registerProfile = async (profile: FormData) =>
  (await axios.post(`${BASE_URL}/${profile.get("id")}`, profile)).data;

export { registerProfile };
