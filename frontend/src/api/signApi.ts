import axios from "axios";
import { SignUpData, SignInData } from "@/types/sign";
const signUp = async (signUpData: SignUpData) =>
  (await axios.post("", signUpData)).data;
const signIn = async (signInData: SignInData) => {
  return (await axios.post("", signInData)).data;
};

export { signIn, signUp };
