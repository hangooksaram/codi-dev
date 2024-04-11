'use client';

import ProfileImage from '@icons/common/profile-image.svg';
import Search from '@icons/common/search.svg';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { FormContainer } from '@/ui/atoms/Container';
import Typography from '@/ui/atoms/Typography';
import theme, { device } from '@/ui/theme';
import IconInputContainer from '@/ui/molecules/Input/IconInput';
import Input from '@/ui/atoms/Input';
import Button from '@/ui/atoms/Button';
import Dropdown from '@/ui/atoms/Dropdown';
import FlexBox from '@/ui/atoms/FlexBox';
import Textarea from '@/ui/atoms/Textarea';
import useUploadFile from '@/hooks/useUploadFile';
import {
  DISABILITIES,
  EMPLOYMENT_STATUSES,
  EMPLOYMENT_STATUSES_VALUE,
  SEVERITIES,
} from '@/constants';
import {
  editProfile as patchEditProfile,
  registerProfile as postRegisterProfile,
} from '@/api/profileApi';
import { handleApiCallback } from '@/utils/api';
import JobSelector from '@/components/Job/JobSelector/JobSelector';
import { selectUser, setUser } from '@/features/user/userSlice';
import { RegisterProfileResponse } from '@/types/api/profile';
import Label from '@/ui/atoms/Label';
import useGetProfileQuery from '@/queries/profileQuery';
import useForm, { FormType, FormPropertyType } from '@/hooks/useForm/useForm';
import LabelBox from '@/ui/molecules/LabelBox';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';

function ProfileFormPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isEdit = useSearchParams().get('edit');
  const formData = new FormData();

  const { id: memberId } = useSelector(selectUser)!;
  const { data, isFetching } = useGetProfileQuery();

  interface ProfileFormValuesType extends FormType {
    introduction: FormPropertyType<string>;
    desiredJob: FormPropertyType<string>;
    job: FormPropertyType<string>;
    education: FormPropertyType<string>;
    disability: FormPropertyType<string>;
    employmentStatus: FormPropertyType<string>;
    severity: FormPropertyType<string>;
  }

  const initialFormValues: ProfileFormValuesType = {
    introduction: {
      validCondition: {
        required: true,
        minLength: 50,
      },
    },
    desiredJob: {
      validCondition: {
        required: true,
      },
    },
    job: {
      validCondition: {
        required: true,
      },
    },
    education: {
      validCondition: {},
    },
    disability: {
      validCondition: {
        required: true,
      },
    },
    employmentStatus: {
      validCondition: {
        required: true,
      },
    },
    severity: {
      initialValue: '중증',
      validCondition: {
        required: true,
      },
    },
  };

  const {
    form,
    handleFormValueChange,
    validateAllFormValues,
    convertToFormData,
  } = useForm(initialFormValues, data!);

  const { file, onUploadFile } = useUploadFile();
  const [bigEducationCategory, setBigEducationCategory] = useState('');
  const [job, setJob] = useState('');
  const [openJobSelector, setOpenJobSelector] = useState(false);
  const [submitType, setSubmitType] = useState<string>('');

  useEffect(() => {
    if (isEdit && data) {
      const { job, education } = data;
      setJob(job!);
      if (education === ('초등학교' || '중학교' || '고등학교')) {
        setBigEducationCategory(education);
        form.education.value = '';
      }
    }
  }, [isFetching]);

  const processData = () => {
    if (bigEducationCategory !== '대학교' && bigEducationCategory) {
      form.education.value = bigEducationCategory;
    }

    form.employmentStatus.value = EMPLOYMENT_STATUSES_VALUE.get(
      form.employmentStatus.value,
    );
  };

  const createFormData = () => {
    const formValues = convertToFormData();

    const blob = new Blob([JSON.stringify(formValues)], {
      type: 'application/json',
    });

    formData.append('profile', blob);
    formData.append('file', file.data!);
    const imageFormData = new FormData();
    imageFormData.append('file', file.data!);
  };

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isFormValid = validateAllFormValues();

    if (isFormValid) {
      processData();
      createFormData();
      if (isEdit) {
        await editProfile();
      } else await registerProfile();
    }
  };

  const registerProfile = async () => {
    const { data, status, errorMessage } =
      await postRegisterProfile<RegisterProfileResponse>(formData);

    handleApiCallback(
      status!,
      () => apiSuccessCallback('register', data!),
      () =>
        alert(
          `프로필 등록이 실패하였습니다. 다시 시도해주세요. error message : ${errorMessage}`,
        ),
    );
  };

  const editProfile = async () => {
    const { data, status, errorMessage } =
      await patchEditProfile<RegisterProfileResponse>(formData);

    handleApiCallback(
      status!,
      () => apiSuccessCallback('edit', data!),
      () =>
        alert(
          `프로필 수정이 실패하였습니다. 다시 시도해주세요. error message : ${errorMessage}`,
        ),
    );
  };

  const apiSuccessCallback = (
    type: 'register' | 'edit',
    data: RegisterProfileResponse,
  ) => {
    const { imgUrl } = data;

    dispatch(setUser({ profileImage: imgUrl }));

    if (type === 'register') {
      if (submitType === 'complete') {
        router.push('/');
        return;
      }
      router.push('/mentorRegisterForm');
      return;
    }

    router.back();
  };

  useEffect(() => {
    // searchUniv();
  }, []);

  return (
    <SinglePageLayout background={theme.colors.white}>
      <FormContainer>
        <Typography
          variant="h1"
          size={theme.fonts.size.lg}
          weight={theme.fonts.weight.black}
          align="center"
          {...{ marginBottom: '80px' }}
        >
          {isEdit ? '프로필 수정하기' : '프로필 작성하기'}
        </Typography>
        <form onSubmit={(e) => handleProfileSubmit(e)}>
          <FlexBox direction="column" rowGap="50px">
            <LabelBox text="프로필 사진" helpText="(선택)">
              <FlexBox justifyContent="space-between">
                <IconInputContainer iconComponent={<ProfileImage />}>
                  <Input outline disabled value={file.name} />
                  <div style={{ display: 'none' }}>
                    <Input
                      id="profileImage"
                      name="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={onUploadFile}
                    />
                  </div>
                </IconInputContainer>
                <Label
                  htmlFor="profileImage"
                  text="프로필 사진 등록 (선택사항입니다)"
                />
                <Button
                  id="profileImage"
                  width="30%"
                  variant="square"
                  type="button"
                  onClick={() =>
                    document.getElementById('profileImage')?.click()
                  }
                  {...{ marginLeft: '10px' }}
                >
                  {isEdit && data?.imgUrl ? '수정하기' : '등록하기'}
                </Button>
              </FlexBox>
            </LabelBox>
            <LabelBox text="장애 분류">
              <FlexBox direction="column" rowGap="10px">
                <FlexBox columnGap="10px">
                  <Label htmlFor="disability" text="장애 분류" />
                  <Dropdown
                    id="disability"
                    invalid={form.disability.isValid === 'invalid'}
                    width="100%"
                    type="form"
                    title="소분류"
                    categories={DISABILITIES}
                    selectedCategory={form.disability.value!}
                    setSelectedCategory={(disability) =>
                      handleFormValueChange<string>({
                        name: 'disability',
                        value: disability,
                      })
                    }
                  />
                </FlexBox>
              </FlexBox>
            </LabelBox>
            <LabelBox text="중증도">
              <FlexBox justifyContent="space-between">
                {SEVERITIES.map((severity) => (
                  <Button
                    id={severity}
                    key={severity}
                    width="50%"
                    type="button"
                    color={
                      form.severity.value === severity
                        ? theme.colors.primary.main
                        : theme.colors.white
                    }
                    variant="square"
                    outline
                    {...{
                      ':first-child': {
                        marginRight: '10px',
                      },
                    }}
                    onClick={() =>
                      handleFormValueChange({
                        name: 'severity',
                        value: severity,
                      })
                    }
                  >
                    {severity}
                  </Button>
                ))}
              </FlexBox>
            </LabelBox>
            <LabelBox text="학력" helpText="(선택)">
              <FlexBox columnGap="10px">
                <Label
                  htmlFor="bigEducation"
                  text="최종 학력 (선택사항입니다)"
                />
                <Dropdown
                  id="bigEducation"
                  width="40%"
                  type="form"
                  title="최종 학력"
                  selectedCategory={bigEducationCategory}
                  setSelectedCategory={(bigEducation) =>
                    setBigEducationCategory(bigEducation)
                  }
                  categories={['초등학교', '중학교', '고등학교', '대학교']}
                />
                <IconInputContainer iconComponent={<Search />}>
                  <Label htmlFor="education" text="대학교 입력" />
                  <Input
                    disabled={bigEducationCategory !== '대학교'}
                    id="education"
                    name="education"
                    placeholder="학교명 검색"
                    value={form.education.value}
                    outline
                    onChange={handleFormValueChange}
                  />
                </IconInputContainer>
              </FlexBox>
            </LabelBox>
            <LabelBox text="희망 직무">
              <FlexBox
                columnGap="10px"
                {...{
                  [device('tablet')]: {
                    flexDirection: 'column',
                    rowGap: '10px',
                  },
                }}
              >
                <Label htmlFor="job" text="직무 분류" />
                <JobSelector
                  id="job"
                  invalid={form.job.isValid === 'invalid'}
                  selected={form.job.value}
                  setSelected={(job) =>
                    handleFormValueChange({ name: 'job', value: job })
                  }
                  open={openJobSelector}
                  setOpen={setOpenJobSelector}
                  width="100%"
                />
                <Label htmlFor="desiredJob" text="희망 직무" />
                <Input
                  id="desiredJob"
                  name="desiredJob"
                  value={form.desiredJob.value}
                  outline
                  maxLength={10}
                  width="60%"
                  placeholder="정확한 직무를 입력해주세요. 10자 내외."
                  onChange={handleFormValueChange}
                  invalid={form.desiredJob.isValid === 'invalid'}
                  {...{
                    [device('tablet')]: {
                      width: '100%',
                    },
                  }}
                />
              </FlexBox>
            </LabelBox>
            <LabelBox text="취업 상태">
              <Label htmlFor="employmentStatus" text="취업 상태" />
              <Dropdown
                id="employmentStatus"
                width="40%"
                type="form"
                title="선택"
                selectedCategory={form.employmentStatus.value!}
                setSelectedCategory={(employmentStatus) =>
                  handleFormValueChange({
                    name: 'employmentStatus',
                    value: employmentStatus,
                  })
                }
                invalid={form.employmentStatus.isValid === 'invalid'}
                categories={EMPLOYMENT_STATUSES}
              />
            </LabelBox>
            <LabelBox text="자기 소개">
              <Label htmlFor="introduction" text="자기 소개" />
              <Textarea
                id="introduction"
                name="introduction"
                placeholder="최소 50 글자"
                value={form.introduction.value}
                onChange={handleFormValueChange}
                invalid={form.introduction.isValid === 'invalid'}
              />
            </LabelBox>
            <FlexBox
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowGap="16px"
            >
              <Button
                onClick={() => {
                  setSubmitType('complete');
                  validateAllFormValues();
                }}
                width="100%"
                type="submit"
                variant="square"
              >
                작성완료
              </Button>
              {!isEdit && (
                <Button
                  onClick={() => {
                    setSubmitType('complete-apply');
                    validateAllFormValues();
                  }}
                  width="100%"
                  type="submit"
                  variant="square"
                >
                  작성하고 멘토 신청하러 가기
                </Button>
              )}
            </FlexBox>
          </FlexBox>
        </form>
      </FormContainer>
    </SinglePageLayout>
  );
}

export default ProfileFormPage;
