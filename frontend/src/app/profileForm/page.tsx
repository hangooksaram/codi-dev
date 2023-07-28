"use client";

import { FormContainer } from "@/ui/atoms/Container";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import * as Yup from "yup";
import FormInputContainer, {
  Form as MentorProfileForm,
} from "@/ui/molecules/Input/FormInput";
import IconInputContainer from "@/ui/molecules/Input/IconInput";
import Input from "@/ui/atoms/Input";
import Button from "@/ui/atoms/Button";
import ProfileImage from "@icons/common/profile-image.svg";
import Dropdown from "@/ui/atoms/Dropdown";
import FlexBox from "@/ui/atoms/FlexBox";
import Search from "@icons/common/search.svg";
import Textarea from "@/ui/atoms/Textarea";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { searchUniv } from "@/api/signApi";
import useRestForm from "@/hooks/useRestForm";
import { FileType } from "@/index";
import useUploadFile from "@/hooks/useUploadFile";
import { useRouter } from "next/navigation";
import { DISABILITIES } from "@/constants";

interface ProfileFormValues {
  disability: string;
  education: string;
  introduction: string;
  desiredJob: string;
  severity: string;
}

const profileFormValues = {
  disability: "",
  education: "",
  introduction: "",
  desiredJob: "",
  severity: "",
};

interface RestFormValues {
  severity: string;
  education: string;
  disability: string;
}

const SEVERITIES = ["중증", "경증"];

const MenteeSchema = Yup.object().shape({
  desiredJob: Yup.string().required("Required"),
  introduction: Yup.string().required("Required"),
});

const initialRestForm: RestFormValues = {
  severity: "중증",
  education: "",
  disability: "",
};

const ProfileFormPage = () => {
  const { restForm, setRestForm, validateRestForm, invalid } =
    useRestForm<RestFormValues>(initialRestForm);
  const { file, onUploadFile } = useUploadFile();
  const [bigEducationCategory, setBigEducationCategory] = useState("");
  const router = useRouter();
  const handleSignUpSubmit = (values: ProfileFormValues) => {
    if (bigEducationCategory !== "대학교") {
      restForm.education = bigEducationCategory;
    }

    values = { ...values, ...restForm };
    console.log(values);
    formData.append("profile", JSON.stringify(values));
    formData.append("file", file.data!);

    console.log(formData.get("profile"));
    console.log(formData.get("file"));
    router.push("/");
  };

  const formData = new FormData();
  const formik = useFormik({
    initialValues: profileFormValues,
    onSubmit: (values: ProfileFormValues) => handleSignUpSubmit(values),
    validationSchema: MenteeSchema,
  });

  useEffect(() => {
    searchUniv();
  }, []);

  return (
    <FormContainer>
      <Typography
        variant="h1"
        size={theme.fonts.size.lg}
        weight={theme.fonts.weight.black}
        align="center"
        {...{ margin: "80px 0px 80px 0px" }}
      >
        프로필 작성하기
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FlexBox direction="column" rowGap="50px">
          <FormInputContainer text="프로필 사진" helpText="(선택)">
            <IconInputContainer iconComponent={<ProfileImage />}>
              <Input outline={true} disabled value={file.name} />
              <div style={{ display: "none" }}>
                <Input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={onUploadFile}
                />
              </div>
            </IconInputContainer>
            <Button
              width="30%"
              variant="square"
              type="button"
              onClick={() => document.getElementById("profileImage")?.click()}
              {...{ marginLeft: "10px" }}
            >
              등록하기
            </Button>
          </FormInputContainer>
          <FormInputContainer text="장애 분류">
            <FlexBox direction="column" rowGap="10px">
              <FlexBox columnGap="10px">
                <Dropdown
                  invalid={invalid("disability")}
                  width="100%"
                  type="form"
                  title="소분류"
                  categories={DISABILITIES}
                  contentType="grid"
                  selectedCategory={restForm.disability}
                  setSelectedCategory={(disability) =>
                    setRestForm({ ...restForm, disability })
                  }
                ></Dropdown>
              </FlexBox>
            </FlexBox>
          </FormInputContainer>
          <FormInputContainer text="중증도">
            {SEVERITIES.map((serverity) => (
              <Button
                key={serverity}
                width="50%"
                color={
                  restForm.severity === serverity
                    ? theme.colors.primary
                    : theme.colors.white
                }
                variant="square"
                outline
                {...{
                  ":first-child": {
                    marginRight: "10px",
                  },
                }}
              >
                {serverity}
              </Button>
            ))}
          </FormInputContainer>
          <FormInputContainer text="학력" htmlFor="education" helpText="(선택)">
            <FlexBox columnGap="10px">
              <Dropdown
                width="40%"
                type="form"
                title="최종 학력"
                selectedCategory={bigEducationCategory}
                setSelectedCategory={(education) =>
                  setBigEducationCategory(education)
                }
                categories={["초등학교", "중학교", "고등학교", "대학교"]}
              />
              <IconInputContainer iconComponent={<Search />}>
                <Input
                  disabled={bigEducationCategory !== "대학교"}
                  id="education"
                  name="education"
                  placeholder="학교명 검색"
                  value={restForm.education}
                  outline
                  onChange={(e) =>
                    setRestForm({ ...restForm, education: e.target.value })
                  }
                />
              </IconInputContainer>
            </FlexBox>
          </FormInputContainer>
          <FormInputContainer text="희망 직무" htmlFor="desiredJob">
            <Input
              id="desiredJob"
              name="desiredJob"
              outline={true}
              placeholder="희망직무를 입력해주세요"
              value={formik.values.desiredJob}
              onChange={formik.handleChange}
              invalid={
                formik.errors.desiredJob !== undefined &&
                formik.touched.desiredJob
              }
            />
          </FormInputContainer>
          <FormInputContainer text="자기 소개" htmlFor="introduction">
            <Textarea
              id="introduction"
              name="introduction"
              placeholder="최소 50 글자"
              value={formik.values.introduction}
              onChange={formik.handleChange}
              outline
              invalid={
                formik.errors.introduction !== undefined &&
                formik.touched.introduction
              }
            />
          </FormInputContainer>
          {/* 
        
        
        <FormInputContainer text="직무 경력"></FormInputContainer>
        */}
          <Button
            onClick={validateRestForm}
            width="100%"
            type="submit"
            variant="square"
          >
            작성완료
          </Button>
        </FlexBox>
      </form>
    </FormContainer>
  );
};

// const Textarea = styled;

export default ProfileFormPage;
