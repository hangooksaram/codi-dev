"use client";

import Input from "@/ui/atoms/Input/Input";
import IdIcon from "../../../public/icons/id.svg";
import PasswordIcon from "../../../public/icons/password.svg";
import TagIcon from "../../../public/icons/tag.svg";

import FormInputContainer, {
  Form as SignUpForm,
} from "@/ui/atoms/Input/FormInput";
import Button from "@/ui/atoms/Button/Button";
import IconInputContainer from "@/ui/atoms/Input/IconInput";
import useForm from "@/hooks/useForm";
import { checkDuplicateId } from "@/api/signApi";
import Typography from "@/ui/atoms/Typography/Typography";
import theme from "@/ui/theme";
import { FormContainer } from "@/ui/atoms/Layout/Container";

interface SignUpFormValueProps {
  birth: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  password: string;
}
const signUpFormValueProps = {
  birth: "",
  email: "",
  gender: "",
  id: "",
  name: "",
  password: "",
};

const SignUpPage = () => {
  const { formValues: signUpFormValues, handleValueChange } =
    useForm<SignUpFormValueProps>({ formValueProps: signUpFormValueProps });
  const handleSignUpSubmit = () => {};
  const postCheckDuplicateId = async () => {
    const res = await checkDuplicateId(signUpFormValues.id);
    console.log(res);
  };
  return (
    <FormContainer>
      <Typography
        variant="h1"
        size={theme.fonts.size.lg}
        weight={theme.fonts.weight.black}
        align="center"
        {...{ margin: "80px 0px 80px 0px" }}
      >
        새로운 계정 생성
      </Typography>
      <SignUpForm onSubmit={handleSignUpSubmit}>
        <FormInputContainer text="아이디">
          <IconInputContainer iconComponent={<IdIcon />}>
            <Input
              id="id"
              name="id"
              value={signUpFormValues.id}
              onChange={handleValueChange}
            />
          </IconInputContainer>
          <Button
            onClick={postCheckDuplicateId}
            width="30%"
            variant="square"
            type="button"
            {...{ marginLeft: "10px" }}
          >
            중복확인
          </Button>
        </FormInputContainer>

        <FormInputContainer
          text="비밀번호"
          helpText="영어, 숫자, 특수기호가 포함된 6자리 이상 비밀번호를 입력해주세요."
        >
          <IconInputContainer iconComponent={<PasswordIcon />}>
            <Input
              id="password"
              name="password"
              value={signUpFormValues.password}
              onChange={handleValueChange}
            />
          </IconInputContainer>
        </FormInputContainer>
        <FormInputContainer text="이름">
          <IconInputContainer iconComponent={<TagIcon />}>
            <Input
              id="name"
              name="name"
              value={signUpFormValues.name}
              onChange={handleValueChange}
            />
          </IconInputContainer>
        </FormInputContainer>

        <FormInputContainer text="성별">
          <Input
            id="gender"
            name="gender"
            value={signUpFormValues.gender}
            onChange={handleValueChange}
          />
        </FormInputContainer>

        <FormInputContainer text="생년 월일">
          <Input
            id="birth"
            name="birth"
            value={signUpFormValues.birth}
            onChange={handleValueChange}
          />
        </FormInputContainer>
        <FormInputContainer text="이메일">
          <Input
            id="email"
            name="email"
            value={signUpFormValues.email}
            onChange={handleValueChange}
          />
        </FormInputContainer>
        <Button width="100%" variant="square" type="submit">
          가입완료
        </Button>
      </SignUpForm>
    </FormContainer>
  );
};

export default SignUpPage;
