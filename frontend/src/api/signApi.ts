import axios from "axios";
import { SignUpData, SignInData } from "@/types/sign";

export const BASE_URL =
  "http://ec2-54-180-217-241.ap-northeast-2.compute.amazonaws.com:8080/api/v1";
const signUp = async (signUpData: SignUpData) =>
  (await axios.post(`${BASE_URL}/members/signup`, signUpData)).data;
const signIn = async (signInData: SignInData) => {
  return (await axios.post("", signInData)).data;
};
const checkDuplicateId = async (id: string) => {
  return await axios.get(`${BASE_URL}/account/validate-id?id=${id}`);
};
const searchUniv = async () => {
  const URL =
    "https://career.go.kr/cnet/openapi/getOpenApi?apiKey=5ae9204a5c24d7c8d88317b2e1135255&svcType=api&svcCode=SCHOOL&contentType=json&gubun=elem_list";

  return await axios.get(URL);
};

export { signIn, signUp, checkDuplicateId, searchUniv };
