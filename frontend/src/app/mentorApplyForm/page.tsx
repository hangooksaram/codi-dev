"use client";

import FormInputContainer from "@/ui/atoms/Input/FormInput";
import IconInputContainer from "@/ui/atoms/Input/IconInput";
import Input from "@/ui/atoms/Input/Input";
import { FormContainer } from "@/ui/atoms/Layout/Container";
import FlexBox from "@/ui/atoms/Layout/FlexBox";
import Typography from "@/ui/atoms/Typography/Typography";
import theme from "@/ui/theme";
import { Form, Formik, FormikHelpers, useFormik } from "formik";

import ProfileImage from "@icons/common/profile-image.svg";
import Button from "@/ui/atoms/Button/Button";
import Dropdown from "@/ui/atoms/Dropdown/Dropdown";
import { useRef, useState } from "react";
import Checkbox from "@/ui/atoms/Checkbox/Checkbox";
import * as Yup from "yup";
import Textarea from "@/ui/atoms/Input/Textarea";
import useRestForm from "@/hooks/useRestForm";
import useUploadFile from "@/hooks/useUploadFile";
import { JOBS } from "@/constants";
import { useRouter } from "next/navigation";

interface MentorApplyFormValues {
  career: string;
  company: string;
  introduction: string;
  job: string;
  customJob: string;
}

interface RestFormValues {
  job: string;
  career: string;
}

const mentorApplyFormValues = {
  career: "",
  company: "",
  introduction: "",
  job: "",
  customJob: "",
};

const initialRestForm: RestFormValues = {
  job: "",
  career: "",
};

const MentorApplyFormSchema = Yup.object().shape({
  company: Yup.string().required("Required"),
  introduction: Yup.string().required("Required"),
  customJob: Yup.string().required("Required"),
});

const MentorApplyFormPage = () => {
  const {
    invalidValues,
    restForm,
    setRestForm,
    validateRestForm,
    invalid,
    isSubmitted,
    setIsSubmitted,
  } = useRestForm<RestFormValues>(initialRestForm);
  const router = useRouter();
  const { file, onUploadFile } = useUploadFile();
  const formData = new FormData();
  const handleSignUpSubmit = (values: MentorApplyFormValues) => {
    values = { ...values, ...restForm };

    formData.append("apply", JSON.stringify(values));
    formData.append("file", file.data!);

    console.log(formData.get("apply"));
    console.log(formData.get("file"));
    router.push("/");
  };

  const formik = useFormik({
    initialValues: mentorApplyFormValues,
    onSubmit: (values: MentorApplyFormValues) => handleSignUpSubmit(values),
    validationSchema: MentorApplyFormSchema,
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
        멘토 신청하기
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <FlexBox direction="column" rowGap="50px">
          <FormInputContainer
            labelColor={theme.colors.secondary}
            text="직무경력"
            htmlFor="job"
          >
            <FlexBox direction="column" rowGap="14px">
              <Input
                placeholder="회사명을 입력해주세요."
                outline
                id="company"
                name="company"
                onChange={formik.handleChange}
                value={formik.values.company}
                invalid={
                  formik.errors.company !== undefined && formik.touched.company
                }
              />
              <FlexBox justifyContent="space-between" columnGap="10px">
                <FlexBox
                  justifyContent="flex-start"
                  width="80%"
                  columnGap="10px"
                >
                  <Dropdown
                    width="50%"
                    title="직무"
                    categories={JOBS}
                    selectedCategory={restForm.job}
                    setSelectedCategory={(job) => {
                      setRestForm({ ...restForm, job });
                    }}
                    invalid={invalid("job")}
                  />
                  <Dropdown
                    width="50%"
                    title="경력"
                    categories={[
                      "신입",
                      "1 - 3년차",
                      "3 - 5년차",
                      "5 - 10년차",
                      "10년 이상",
                    ]}
                    selectedCategory={restForm.career}
                    setSelectedCategory={(career) =>
                      setRestForm({ ...restForm, career })
                    }
                    invalid={invalid("career")}
                  />
                </FlexBox>

                <div>
                  <Checkbox label="재직중" handleClick={() => {}} />
                </div>
              </FlexBox>
            </FlexBox>
          </FormInputContainer>

          <FormInputContainer
            text="직무명 입력"
            htmlFor="customJob"
            labelColor={theme.colors.secondary}
          >
            <Input
              id="customJob"
              name="customJob"
              placeholder="프로필에 표시 될 직무명을 입력해주세요."
              outline
              onChange={formik.handleChange}
              value={formik.values.customJob}
              invalid={
                formik.errors.customJob !== undefined &&
                formik.touched.customJob
              }
            />
          </FormInputContainer>
          <FormInputContainer
            text="재직증명서 제출"
            helpText="(선택)"
            labelColor={theme.colors.secondary}
          >
            <IconInputContainer iconComponent={<ProfileImage />}>
              <Input disabled outline value={file.name} />
              <div style={{ display: "none" }}>
                <Input
                  id="certificate"
                  type="file"
                  accept="application/pdf"
                  onChange={onUploadFile}
                />
              </div>
            </IconInputContainer>
            <Button
              onClick={() => document.getElementById("certificate")?.click()}
              type="button"
              variant="square"
            >
              등록하기
            </Button>
          </FormInputContainer>
          <FormInputContainer
            text="자기 소개"
            htmlFor="introduction"
            labelColor={theme.colors.secondary}
          >
            <Textarea
              as="textarea"
              id="introduction"
              name="introduction"
              placeholder="최소 50 글자"
              outline
              onChange={formik.handleChange}
              value={formik.values.introduction}
              invalid={
                formik.errors.introduction !== undefined &&
                formik.touched.introduction
              }
            />
          </FormInputContainer>
          <Button
            width="100%"
            onClick={validateRestForm}
            variant="square"
            type="submit"
          >
            저장
          </Button>
        </FlexBox>
      </form>
    </FormContainer>
  );
};

export default MentorApplyFormPage;
