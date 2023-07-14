import axios from "axios";
import { SignUpData, SignInData } from "@/types/sign";

const BASE_URL =
  "http://ec2-54-180-217-241.ap-northeast-2.compute.amazonaws.com:8080/api/v1";
const signUp = async (signUpData: SignUpData) =>
  (await axios.post("", signUpData)).data;
const signIn = async (signInData: SignInData) => {
  return (await axios.post("", signInData)).data;
};
const checkDuplicateId = async (id: string) => {
  return await axios.get(`${BASE_URL}/account/vaidate-id/${id}`);
};
export { signIn, signUp, checkDuplicateId };
