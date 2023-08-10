"use client";

import { FormContainer } from "@/ui/atoms/Container";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import * as Yup from "yup";
import FormInputContainer from "@/ui/molecules/Input/FormInput";
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
import useUploadFile from "@/hooks/useUploadFile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DISABILITIES,
  EMPLOYMENT_STATUSES,
  EMPLOYMENT_STATUSES_VALUE,
  SEVERITIES,
} from "@/constants";
import {
  editProfile as patchEditProfile,
  registerProfile as postRegisterProfile,
} from "@/api/profileApi";
import { handleApiCallback } from "@/utils/api";
import JobSelector from "@/components/Job/JopSelector";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "@/features/user/userSlice";
import { setLocalUser, localUser } from "@/utils/tempUser";
import { RegisterProfileResponse } from "@/types/api/profile";
import { useDispatch } from "react-redux";
import useGetProfileQuery from "@/queries/profileQuery";

const ProfileFormPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isEdit = useSearchParams().get("edit");
  const editIntoduction = useSearchParams().get("introduction");
  const editDesiredJob = useSearchParams().get("desiredJob");
  const editJob = useSearchParams().get("job");
  const editEductation = useSearchParams().get("education");
  const editDisability = useSearchParams().get("disability");
  const editEmploymentStatus = useSearchParams().get("employmentStatus");
  const editSeverity = useSearchParams().get("severity");
  const editImgUrl = useSearchParams().get("imgUrl");

  const profileFormValues = {
    introduction: editIntoduction ? editIntoduction : "",
    desiredJob: editDesiredJob ? editDesiredJob : "",
  };

  const initialRestForm = {
    job: editJob ? editJob : "",
    education: editEductation ? editEductation : "",
    disability: editDisability ? editDisability : "",
    employmentStatus: editEmploymentStatus ? editEmploymentStatus : "",
    severity: editSeverity ? editSeverity : "중증",
  };

  const { id: memberId, profileId } = useSelector(selectUser)!;

  const { restForm, setRestForm, validateRestForm, invalid } =
    useRestForm<RestFormValues>(initialRestForm);
  const { file, onUploadFile } = useUploadFile();
  const [bigEducationCategory, setBigEducationCategory] = useState("");
  const [job, setJob] = useState("");
  const [openJobSelector, setOpenJobSelector] = useState(false);
  const [submitType, setSubmitType] = useState<string>("");

  useEffect(() => {
    if (isEdit) setJob(editJob!);
  });

  const handleProfileSubmit = async (values: ProfileFormValues) => {
    processData();
    createFormData(values, restForm);

    if (isEdit) {
      editProfile();
    } else registerProfile();
  };

  const processData = () => {
    if (bigEducationCategory !== "대학교") {
      restForm.education = bigEducationCategory;
    }
    restForm.employmentStatus = EMPLOYMENT_STATUSES_VALUE.get(
      restForm.employmentStatus
    );
  };

  const createFormData = (
    values: ProfileFormValues,
    restForm: RestFormValues
  ) => {
    const formValues = { ...values, ...restForm };
    const blob = new Blob([JSON.stringify(formValues)], {
      type: "application/json",
    });

    formData.append("profile", blob);
    formData.append("file", file.data!);
    const imageFormData = new FormData();
    imageFormData.append("file", file.data!);
  };

  const registerProfile = async () => {
    const { data, status, errorMessage } =
      await postRegisterProfile<RegisterProfileResponse>(memberId, formData);

    const signInSuccessCallback = () => {
      const { id, imgUrl } = data!;
      setLocalUser({ profileId: id, imgUrl });
      dispatch(setUser(localUser()));
      if (submitType === "complete") {
        router.push("/");
      } else router.push("/mentorRegisterForm");
    };

    handleApiCallback(status!, signInSuccessCallback, () =>
      alert(
        `프로필 등록이 실패하였습니다. 다시 시도해주세요. error message : ${errorMessage}`
      )
    );
  };

  const editProfile = async () => {
    const { data, status, errorMessage } =
      await patchEditProfile<RegisterProfileResponse>(profileId!, formData);

    const signInSuccessCallback = () => {
      const { id, imgUrl } = data!;
      setLocalUser({ profileId: id, imgUrl });
      dispatch(setUser(localUser()));
      router.back();
    };

    handleApiCallback(status!, signInSuccessCallback, () =>
      alert(
        `프로필 수정이 실패하였습니다. 다시 시도해주세요. error message : ${errorMessage}`
      )
    );
  };

  const formData = new FormData();
  const formik = useFormik({
    initialValues: profileFormValues,
    onSubmit: (values: ProfileFormValues) => handleProfileSubmit(values),
    validationSchema: ProfileSchema,
  });

  useEffect(() => {
    searchUniv();
  }, []);

  useEffect(() => {
    setRestForm({ ...restForm, job });
  }, [job]);

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
            {SEVERITIES.map((severity) => (
              <Button
                key={severity}
                width="50%"
                type="button"
                color={
                  restForm.severity === severity
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
                onClick={() => setRestForm({ ...restForm, severity })}
              >
                {severity}
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
            <FlexBox columnGap="10px">
              <JobSelector
                invalid={invalid("job")}
                selected={job}
                setSelected={setJob}
                open={openJobSelector}
                setOpen={setOpenJobSelector}
              />
              <Input
                id="desiredJob"
                name="desiredJob"
                outline={true}
                maxLength={10}
                width="60%"
                placeholder="정확한 직무를 입력해주세요. 10자 내외."
                value={formik.values.desiredJob}
                onChange={formik.handleChange}
                invalid={
                  formik.errors.desiredJob !== undefined &&
                  formik.touched.desiredJob
                }
              />
            </FlexBox>
          </FormInputContainer>
          <FormInputContainer text="취업 상태" htmlFor="employmentStatus">
            <Dropdown
              width="40%"
              type="form"
              title="선택"
              selectedCategory={restForm.employmentStatus}
              setSelectedCategory={(employmentStatus) =>
                setRestForm({ ...restForm, employmentStatus })
              }
              invalid={invalid("employmentStatus")}
              categories={EMPLOYMENT_STATUSES}
            ></Dropdown>
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
            onClick={() => {
              setSubmitType("complete");
              validateRestForm();
            }}
            width="100%"
            type="submit"
            variant="square"
            color={theme.colors.white}
          >
            작성완료
          </Button>
          {!isEdit && (
            <Button
              onClick={() => {
                setSubmitType("complete-apply");
                validateRestForm();
              }}
              width="100%"
              type="submit"
              variant="square"
            >
              작성하고 멘토 신청하러 가기
            </Button>
          )}
        </FlexBox>
      </form>
    </FormContainer>
  );
};

interface ProfileFormValues {
  introduction: string;
  desiredJob: string;
}

interface RestFormValues {
  job: string;
  education: string;
  employmentStatus: string;
  disability: string;
  severity: string;
}

const ProfileSchema = Yup.object().shape({
  desiredJob: Yup.string().required("Required"),
  introduction: Yup.string().required("Required"),
});

export default ProfileFormPage;
