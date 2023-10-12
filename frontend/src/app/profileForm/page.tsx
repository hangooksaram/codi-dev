"use client";

import { FormContainer } from "@/ui/atoms/Container";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import LabeledInputContainer from "@/ui/molecules/Input/LabeledInput";
import IconInputContainer from "@/ui/molecules/Input/IconInput";
import Input from "@/ui/atoms/Input";
import Button from "@/ui/atoms/Button";
import ProfileImage from "@icons/common/profile-image.svg";
import Dropdown from "@/ui/atoms/Dropdown";
import FlexBox from "@/ui/atoms/FlexBox";
import Search from "@icons/common/search.svg";
import Textarea from "@/ui/atoms/Textarea";
import { FormEvent, useEffect, useState } from "react";
import { searchUniv } from "@/api/signApi";
import useForm from "@/hooks/useForm";
import useUploadFile from "@/hooks/useUploadFile";
import { useRouter } from "next/navigation";
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
import useInitiallizeFormValues from "@/hooks/useInitiallizeFormValues";

const ProfileFormPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialFormValues = {
    introduction: "",
    desiredJob: "",
    job: "",
    education: "",
    disability: "",
    employmentStatus: "",
    severity: "중증",
  };

  const { formValues, isEdit, pathParams } =
    useInitiallizeFormValues<FormValues>(initialFormValues);

  const { id: memberId, profileId } = useSelector(selectUser)!;
  const {
    form,
    setForm,
    validateForm,
    invalid,
    handleFormValueChange,
    formInvalid,
  } = useForm<FormValues>(formValues);
  const { file, onUploadFile } = useUploadFile();
  const [bigEducationCategory, setBigEducationCategory] = useState("");
  const [job, setJob] = useState("");
  const [openJobSelector, setOpenJobSelector] = useState(false);
  const [submitType, setSubmitType] = useState<string>("");

  useEffect(() => {
    if (isEdit) {
      setJob(formValues.job!);
      if (formValues.education === ("초등학교" || "중학교" || "고등학교")) {
        setBigEducationCategory(formValues.education);
        formValues.education = "";
      }
    }
  }, []);

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formInvalid) return;
    processData();
    createFormData(form);

    if (isEdit) {
      editProfile();
    } else registerProfile();
  };

  const processData = () => {
    if (bigEducationCategory !== "대학교" && bigEducationCategory) {
      form.education = bigEducationCategory;
    }

    form.employmentStatus = EMPLOYMENT_STATUSES_VALUE.get(
      form.employmentStatus
    );
  };

  const createFormData = (form: FormValues) => {
    const formValues = { ...form };
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
      await postRegisterProfile<RegisterProfileResponse>(memberId!, formData);

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

  useEffect(() => {
    searchUniv();
  }, []);

  useEffect(() => {
    setForm({ ...form, job });
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
        {isEdit ? "프로필 수정하기" : "프로필 작성하기"}
      </Typography>
      <form onSubmit={(e) => handleProfileSubmit(e)}>
        <FlexBox direction="column" rowGap="50px">
          <LabeledInputContainer text="프로필 사진" helpText="(선택)">
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
          </LabeledInputContainer>
          <LabeledInputContainer text="장애 분류">
            <FlexBox direction="column" rowGap="10px">
              <FlexBox columnGap="10px">
                <Dropdown
                  id="disability"
                  invalid={invalid("disability", { required: true })}
                  width="100%"
                  type="form"
                  title="소분류"
                  categories={DISABILITIES}
                  contentType="grid"
                  selectedCategory={form.disability}
                  setSelectedCategory={(disability) =>
                    handleFormValueChange({
                      name: "disability",
                      value: disability,
                    })
                  }
                ></Dropdown>
              </FlexBox>
            </FlexBox>
          </LabeledInputContainer>
          <LabeledInputContainer text="중증도">
            {SEVERITIES.map((severity) => (
              <Button
                key={severity}
                width="50%"
                type="button"
                color={
                  form.severity === severity
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
                onClick={() =>
                  handleFormValueChange({ name: "severity", value: severity })
                }
              >
                {severity}
              </Button>
            ))}
          </LabeledInputContainer>
          <LabeledInputContainer
            text="학력"
            htmlFor="education"
            helpText="(선택)"
          >
            <FlexBox columnGap="10px">
              <Dropdown
                id="bigEducation"
                width="40%"
                type="form"
                title="최종 학력"
                selectedCategory={bigEducationCategory}
                setSelectedCategory={(bigEducation) =>
                  setBigEducationCategory(bigEducation)
                }
                categories={["초등학교", "중학교", "고등학교", "대학교"]}
              />
              <IconInputContainer iconComponent={<Search />}>
                <Input
                  disabled={bigEducationCategory !== "대학교"}
                  id="education"
                  name="education"
                  placeholder="학교명 검색"
                  value={form.education}
                  outline
                  onChange={handleFormValueChange}
                />
              </IconInputContainer>
            </FlexBox>
          </LabeledInputContainer>
          <LabeledInputContainer text="희망 직무" htmlFor="desiredJob">
            <FlexBox columnGap="10px">
              <JobSelector
                invalid={invalid("job", { required: true })}
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
                onChange={handleFormValueChange}
                invalid={invalid("desiredJob", { required: true })}
              />
            </FlexBox>
          </LabeledInputContainer>
          <LabeledInputContainer text="취업 상태" htmlFor="employmentStatus">
            <Dropdown
              id="employmentStatus"
              width="40%"
              type="form"
              title="선택"
              selectedCategory={form.employmentStatus}
              setSelectedCategory={(employmentStatus) =>
                handleFormValueChange({
                  name: "employmentStatus",
                  value: employmentStatus,
                })
              }
              invalid={invalid("employmentStatus", { required: true })}
              categories={EMPLOYMENT_STATUSES}
            ></Dropdown>
          </LabeledInputContainer>
          <LabeledInputContainer text="자기 소개" htmlFor="introduction">
            <Textarea
              id="introduction"
              name="introduction"
              placeholder="최소 50 글자"
              onChange={handleFormValueChange}
              invalid={invalid("introduction", {
                required: true,
                min: 10,
                max: 50,
              })}
            />
          </LabeledInputContainer>
          <Button
            onClick={() => {
              setSubmitType("complete");
              validateForm();
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
                validateForm();
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

interface FormValues {
  introduction: string;
  desiredJob: string;
  job: string;
  education: string;
  employmentStatus: string;
  disability: string;
  severity: string;
}

export default ProfileFormPage;
