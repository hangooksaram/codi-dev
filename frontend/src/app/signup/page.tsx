"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { FormContainer } from "@/ui/atoms/Container";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import Button from "@/ui/atoms/Button";
import FormInputContainer from "@/ui/molecules/Input/FormInput";
import IconInputContainer from "@/ui/molecules/Input/IconInput";
import Input from "@/ui/atoms/Input";
import FlexBox from "@/ui/atoms/FlexBox";
import Dropdown from "@/ui/atoms/Dropdown";
import { useState } from "react";
import IdIcon from "@icons/common/id.svg";
import PasswordIcon from "@icons/common/password.svg";
import TagIcon from "@icons/common/tag.svg";
import { useRouter } from "next/navigation";
import { checkDuplicateId, signUp } from "@/api/signApi";
import { DATE } from "@/constants";
import { SignUpBody } from "@/types/api/sign";
import { handleApiCallback } from "@/utils/api";
import { setLocal } from "@/utils/tempUser";

const signUpFormValueProps = {
  birth: "",
  email: "",
  id: "",
  gender: "선택안함",
  name: "",
  password: "",
};

const SignupSchema = Yup.object({
  id: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-7]).{8,15}$/,
      "확인 요망"
    ),
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
});

const GENDER_LIST = [
  { name: "남자", key: "MAN" },
  { name: "여자", key: "WOMAN" },
  { name: "선택하지 않음", key: "NOT_CHECKED" },
];

const SignUpPage = () => {
  const [emailType, setEmailType] = useState("gmail.com");
  const [gender, setGender] = useState({
    name: "선택하지 않음",
    key: "NOT_CHECKED",
  });
  const [birth, setBirth] = useState({
    year: null,
    month: null,
    day: null,
  });

  const [isIdDuplicated, setIsIdDuplicated] = useState(false);

  const router = useRouter();

  const postCheckDuplicateId = async () => {
    const { data, status, errorMessage } = await checkDuplicateId(
      formik.values.id
    );
    handleApiCallback(
      status,
      () => setIsIdDuplicated(data!),
      () => alert(`호출 실패 : ${errorMessage}`)
    );
  };

  const processedValues = (values: SignUpBody) => {
    const { year, month, day } = birth;
    const stringFiedBirth = `${year}-${month}-${day}`;
    return { ...values, gender: gender.key, birth: stringFiedBirth };
  };

  const handleSubmit = async (values: SignUpBody) => {
    const { status, errorMessage } = await signUp(processedValues(values));

    // handleApiCallback(
    //   status,
    //   () => router.push("/"),
    //   () => alert(`호출 실패 : ${errorMessage}`)
    // );
    // setLocal(values);
  };

  const formik = useFormik({
    initialValues: signUpFormValueProps,
    onSubmit: (values: SignUpBody) => {
      handleSubmit(values);
    },
    validationSchema: SignupSchema,
  });
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

      <form onSubmit={formik.handleSubmit}>
        <FlexBox direction="column" rowGap="50px">
          <FormInputContainer text="아이디" htmlFor="id">
            <FlexBox direction="column" alignItems="flex-start" rowGap="10px">
              <FlexBox>
                <IconInputContainer iconComponent={<IdIcon />}>
                  <Input
                    id="id"
                    name="id"
                    onChange={formik.handleChange}
                    value={formik.values.id}
                    invalid={
                      formik.errors.id !== undefined && formik.touched.id
                    }
                    outline
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
              </FlexBox>
              <div>
                {isIdDuplicated &&
                  "아이디가 중복되었습니다. 다른 아이디를 입력해주세요."}
              </div>
            </FlexBox>
          </FormInputContainer>

          <FormInputContainer
            text="비밀번호"
            helpText="영어, 숫자, 특수기호가 포함된 6자리 이상 비밀번호를 입력해주세요."
            htmlFor="password"
          >
            <IconInputContainer iconComponent={<PasswordIcon />}>
              <Input
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                invalid={
                  formik.errors.password !== undefined &&
                  formik.touched.password
                }
                outline
              />
            </IconInputContainer>
          </FormInputContainer>
          <FormInputContainer text="이름" htmlFor="name">
            <IconInputContainer iconComponent={<TagIcon />}>
              <Input
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                invalid={
                  formik.errors.name !== undefined && formik.touched.name
                }
                outline
              />
            </IconInputContainer>
          </FormInputContainer>

          <FormInputContainer text="성별" htmlFor="gender">
            <FlexBox columnGap="10px">
              {GENDER_LIST.map((genderType) => (
                <Button
                  key={genderType.key}
                  onClick={() => setGender(genderType)}
                  width="100%"
                  variant="square"
                  color={
                    genderType.name === gender.name
                      ? theme.colors.primary
                      : theme.colors.white
                  }
                  type="button"
                  outline
                >
                  {genderType.name}
                </Button>
              ))}
            </FlexBox>
          </FormInputContainer>

          <FormInputContainer text="생년 월일" htmlFor="birth">
            <FlexBox columnGap="10px">
              <Dropdown
                width="100%"
                categories={DATE.YEARS}
                selectedCategory={birth.year!}
                setSelectedCategory={(year) => setBirth({ ...birth, year })}
                title="연도"
              />
              <Dropdown
                width="100%"
                categories={DATE.MONTHS}
                selectedCategory={birth.month!}
                setSelectedCategory={(month) => setBirth({ ...birth, month })}
                title="월"
              />
              <Dropdown
                width="100%"
                categories={DATE.DAYS}
                selectedCategory={birth.day!}
                setSelectedCategory={(day) => setBirth({ ...birth, day })}
                title="일"
              />
            </FlexBox>
          </FormInputContainer>
          <FormInputContainer text="이메일" htmlFor="email">
            <FlexBox columnGap="10px">
              <Input
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                invalid={
                  formik.errors.email !== undefined && formik.touched.email
                }
                outline
              />
              @
              <Dropdown
                selectedCategory={emailType}
                setSelectedCategory={setEmailType}
                width="30%"
                categories={["gmail.com", "naver.com", "hanmail.net"]}
                title="gmail.com"
                type="form"
              />
            </FlexBox>
          </FormInputContainer>
          <Button width="100%" variant="square" type="submit">
            가입완료
          </Button>
        </FlexBox>
      </form>
    </FormContainer>
  );
};

export default SignUpPage;

{
  /* <FlexBox justifyContent="space-between" columnGap="10px">
          <Button variant="square" type="button" width="100%">
            인증번호 전송
          </Button>
            <Input
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              outline
            />
            <Button width="30%" variant="square">
              인증
            </Button>
          </FlexBox> */
}
