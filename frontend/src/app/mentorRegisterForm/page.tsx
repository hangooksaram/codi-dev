'use client';

import ProfileImage from '@icons/common/profile-image.svg';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import IconInputContainer from '@/ui/molecules/Input/IconInput';
import Input from '@/ui/atoms/Input';
import { FormContainer } from '@/ui/atoms/Container';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import Button from '@/ui/atoms/Button';
import Dropdown from '@/ui/atoms/Dropdown';
import Checkbox from '@/ui/atoms/Checkbox';
import Textarea from '@/ui/atoms/Textarea';
import useUploadFile from '@/hooks/useUploadFile';
import MentoringCategoriesSelector, {
  MENTOR_CATEGORIES,
} from '@/components/Mentoring/MentoringCategory/MentoringCategoriesSelector';
import {
  registerMentor as postRegisterMentor,
  editMentor as patchEditMentor,
} from '@/api/mentorApi';
import JobSelector from '@/components/Job/JopSelector';

import { handleApiCallback } from '@/utils/api';
import { CAREERS } from '@/constants';
import useNewForm, {
  FormPropertyType,
  FormType,
} from '@/hooks/useNewForm/useNewForm';
import { useGetMentorQuery } from '@/queries/mentorQuery';
import LabelBox from '@/ui/molecules/LabelBox';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';

function MentorRegisterForm() {
  const router = useRouter();

  const { file, onUploadFile } = useUploadFile();
  const isEdit = useSearchParams().get('edit');
  const [openJobSelector, setOpenJobSelector] = useState(false);
  const formData = new FormData();

  interface MentorRegisterFormValuesType extends FormType {
    company: FormPropertyType<string>;
    introduction: FormPropertyType<string>;
    jobName: FormPropertyType<string>;
    job: FormPropertyType<string>;
    career: FormPropertyType<string>;
    inOffice: FormPropertyType<boolean>;
    mentoringCategories: FormPropertyType<string[]>;
  }

  const initialFormValues: MentorRegisterFormValuesType = {
    company: {
      validCondition: {
        required: true,
      },
    },
    introduction: {
      validCondition: {
        required: true,
        minLength: 50,
      },
    },
    jobName: {
      validCondition: {
        required: true,
      },
    },
    job: {
      validCondition: {
        required: true,
      },
    },
    career: {
      validCondition: {
        required: true,
      },
    },
    inOffice: {
      validCondition: {},
      initialValue: false,
    },
    mentoringCategories: {
      validCondition: {
        required: true,
      },
      initialValue: [],
    },
  };

  const { data } = useGetMentorQuery();

  const isCertificate = data?.fileUrl;

  const {
    form,
    handleFormValueChange,
    validateAllFormValues,
    convertToFormData,
  } = useNewForm(initialFormValues, data!);

  const processData = () => {
    form.mentoringCategories.value = MENTOR_CATEGORIES.filter((category) =>
      form.mentoringCategories.value.includes(category.text),
    ).map((category) => category.value);
  };

  const createFormData = () => {
    const formValues = convertToFormData();

    const blob = new Blob([JSON.stringify(formValues)], {
      type: 'application/json',
    });
    formData.append('mentor', blob);
    formData.append('file', file.data!);
  };

  const handleMentorProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isFormValid = validateAllFormValues();

    if (isFormValid) {
      processData();
      createFormData();

      if (isEdit) await editMentor();
      else await registerMentor();
    }
  };

  const registerMentor = async () => {
    const { status } = await postRegisterMentor(formData);

    handleApiCallback(
      status!,
      () => {
        router.push('/');
      },
      () => {
        alert(`멘토 등록이 실패하였습니다. 다시 시도해주세요.`);
      },
    );
  };

  const editMentor = async () => {
    const { status } = await patchEditMentor(formData);
    handleApiCallback(
      status!,
      () => {
        router.back();
      },
      () => {
        alert(`멘토 수정이 실패하였습니다. 다시 시도해주세요.`);
      },
    );
  };

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
          {isEdit ? '멘토 프로필 수정하기' : '멘토 신청하기'}
        </Typography>

        <form onSubmit={(e) => handleMentorProfileSubmit(e)}>
          <FlexBox direction="column" rowGap="50px">
            <LabelBox labelColor={theme.colors.secondary.main} text="직무경력">
              <FlexBox direction="column" rowGap="14px">
                <Input
                  placeholder="회사명을 입력해주세요."
                  outline
                  id="company"
                  name="company"
                  onChange={handleFormValueChange}
                  value={form.company.value}
                  invalid={form.company.isValid === 'invalid'}
                />
                <FlexBox justifyContent="space-between" columnGap="10px">
                  <FlexBox
                    justifyContent="flex-start"
                    width="80%"
                    columnGap="10px"
                  >
                    <JobSelector
                      id="job"
                      invalid={form.job.isValid === 'invalid'}
                      selected={form.job.value}
                      setSelected={(job) =>
                        handleFormValueChange({ name: 'job', value: job })
                      }
                      open={openJobSelector}
                      setOpen={setOpenJobSelector}
                    />
                    <Dropdown
                      id="career"
                      width="50%"
                      type="form"
                      title="경력"
                      categories={CAREERS}
                      selectedCategory={form.career.value}
                      setSelectedCategory={(career) =>
                        handleFormValueChange({
                          name: 'career',
                          value: career,
                        })
                      }
                      invalid={form.career.isValid === 'invalid'}
                    />
                  </FlexBox>

                  <div>
                    <Checkbox
                      label="재직중"
                      checked={form.inOffice.value}
                      setChecked={(value) => {
                        handleFormValueChange({
                          name: 'inOffice',
                          value,
                        });
                      }}
                    />
                  </div>
                </FlexBox>
              </FlexBox>
            </LabelBox>

            <LabelBox
              text="직무명 입력"
              labelColor={theme.colors.secondary.main}
            >
              <Input
                id="jobName"
                name="jobName"
                placeholder="프로필에 표시 될 직무명을 입력해주세요."
                outline
                onChange={handleFormValueChange}
                value={form.jobName.value}
                invalid={form.jobName.isValid === 'invalid'}
              />
            </LabelBox>
            <LabelBox
              text="재직증명서 제출"
              helpText="(선택)"
              labelColor={theme.colors.secondary.main}
            >
              <FlexBox columnGap="8px">
                <IconInputContainer iconComponent={<ProfileImage />}>
                  <Input disabled outline value={file.name} />
                  <div style={{ display: 'none' }}>
                    <Input
                      id="certificate"
                      type="file"
                      accept="application/pdf,.png,.jpg,.jpeg"
                      onChange={onUploadFile}
                    />
                  </div>
                </IconInputContainer>
                <Button
                  onClick={() =>
                    document.getElementById('certificate')?.click()
                  }
                  type="button"
                  variant="square"
                  {...{ minWidth: 'fit-content' }}
                >
                  {isCertificate ? '수정하기' : '등록하기'}
                </Button>
              </FlexBox>
            </LabelBox>
            <LabelBox text="멘토링분야" helpText="(최대 4개)">
              <MentoringCategoriesSelector
                id="mentoringCategories"
                mentoringCategories={form.mentoringCategories.value}
                setMentoringCategories={(category) =>
                  handleFormValueChange({
                    name: 'mentoringCategories',
                    value: category,
                  })
                }
              />
            </LabelBox>
            <LabelBox text="자기 소개" labelColor={theme.colors.secondary.main}>
              <Textarea
                as="textarea"
                id="introduction"
                name="introduction"
                placeholder="최소 50 글자"
                outline
                onChange={handleFormValueChange}
                value={form.introduction.value}
                invalid={form.introduction.isValid === 'invalid'}
              />
            </LabelBox>
            <Button width="100%" variant="square" type="submit">
              저장
            </Button>
          </FlexBox>
        </form>
      </FormContainer>
    </SinglePageLayout>
  );
}

export default MentorRegisterForm;
