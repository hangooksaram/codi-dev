"use client";

import FormInputContainer from "@/ui/molecules/Input/FormInput";
import IconInputContainer from "@/ui/molecules/Input/IconInput";
import Input from "@/ui/atoms/Input";
import { FormContainer } from "@/ui/atoms/Container";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import { useFormik } from "formik";
import ProfileImage from "@icons/common/profile-image.svg";
import Button from "@/ui/atoms/Button";
import Dropdown from "@/ui/atoms/Dropdown";
import Checkbox from "@/ui/atoms/Checkbox";
import * as Yup from "yup";
import Textarea from "@/ui/atoms/Textarea";
import useRestForm from "@/hooks/useRestForm";
import useUploadFile from "@/hooks/useUploadFile";
import { useEffect, useState } from "react";
import MentorCategoriesSelector, {
  MENTOR_CATEGORIES,
} from "@/components/Mentoring/MentoringCategory/MentoringCategoriesSelector";
import { registerMentor } from "@/api/mentorApi";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "@/features/user/userSlice";
import JobSelector from "@/components/Job/JopSelector";
import { RegisterMentorResponse } from "@/types/api/mentor";
import { localUser, setLocalUser } from "@/utils/tempUser";
import { useDispatch } from "react-redux";
import useRedirectMentorRegisterForm from "@/hooks/useRedirectMentorApplyForm";

const MentorRegisterForm = () => {
  const { restForm, setRestForm, validateRestForm, invalid } =
    useRestForm<RestFormValues>(initialRestForm);
  useRedirectMentorRegisterForm();
  const memberId = useSelector(selectUser).id;
  const dispatch = useDispatch();
  const { file, onUploadFile } = useUploadFile();
  const [job, setJob] = useState("");
  const [openJobSelector, setOpenJobSelector] = useState(false);
  const formData = new FormData();
  useEffect(() => {
    setRestForm({ ...restForm, job });
  }, [job]);
  const handleSignUpSubmit = async (values: MentorRegisterFormValues) => {
    restForm.mentoringCategories = MENTOR_CATEGORIES.filter((category) =>
      mentorCategories.includes(category.text)
    ).map((category) => category.value);

    createFormData(values, restForm);

    // router.push("/");
  };

  const createFormData = (
    values: MentorRegisterFormValues,
    restForm: RestFormValues
  ) => {
    const formValues = { ...values, ...restForm };
    const blob = new Blob([JSON.stringify(formValues)], {
      type: "application/json",
    });
    console.log(formValues);
    formData.append("mentor", blob);
    formData.append("file", file.data!);
  };

  // const registerMentor = async () => {
  //   const { data, status } = await applyMentor<RegisterMentorResponse>(
  //     memberId,
  //     formData
  //   );
  //   setLocalUser({ mentorId: data.id });
  //   dispatch(setUser(localUser()));
  // };

  const formik = useFormik({
    initialValues: MentorRegisterFormValues,
    onSubmit: (values: MentorRegisterFormValues) => handleSignUpSubmit(values),
    validationSchema: MentorRegisterFormSchema,
  });

  const [mentorCategories, setMentorCategories] = useState<string[]>([
    "면접대비",
  ]);

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
                  <JobSelector
                    invalid={invalid("job")}
                    selected={job}
                    setSelected={setJob}
                    open={openJobSelector}
                    setOpen={setOpenJobSelector}
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
                  <Checkbox
                    label="재직중"
                    handleClick={() => {
                      setRestForm({
                        ...restForm,
                        inOffice: !restForm.inOffice,
                      });
                    }}
                  />
                </div>
              </FlexBox>
            </FlexBox>
          </FormInputContainer>

          <FormInputContainer
            text="직무명 입력"
            htmlFor="jobName"
            labelColor={theme.colors.secondary}
          >
            <Input
              id="jobName"
              name="jobName"
              placeholder="프로필에 표시 될 직무명을 입력해주세요."
              outline
              onChange={formik.handleChange}
              value={formik.values.jobName}
              invalid={
                formik.errors.jobName !== undefined && formik.touched.jobName
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
          <FormInputContainer text="멘토링분야" helpText="(최대 4개)">
            <MentorCategoriesSelector
              mentorCategories={mentorCategories}
              setMentorCategories={setMentorCategories}
            />
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

interface MentorRegisterFormValues {
  company: string;
  introduction: string;
  jobName: string;
}

interface RestFormValues {
  job: string;
  career: string;
  inOffice: boolean;
  mentoringCategories: string[];
}

const MentorRegisterFormValues = {
  company: "",
  introduction: "",
  jobName: "",
};

const initialRestForm: RestFormValues = {
  job: "",
  career: "",
  inOffice: false,
  mentoringCategories: [],
};

const MentorRegisterFormSchema = Yup.object().shape({
  company: Yup.string().required("Required"),
  introduction: Yup.string().required("Required"),
  jobName: Yup.string().required("Required"),
});

export default MentorRegisterForm;
