import { ChangeEvent, useEffect, useState } from 'react';
import { ValidType, ValidateConditions, invalid } from '../../utils/validate';
import { getFormattedFormValues } from './utils';
import useInitializeForm from './useInitializeForm';
import useValidateForm from './useValidateForm';

const useNewForm = (initialFormValues: FormType, serverData?: object) => {
  const [form, setForm] = useState<FormType>(
    getFormattedFormValues(initialFormValues),
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  if (serverData) useInitializeForm(form, setForm, serverData);

  const convertToFormData = () => {
    const formValues = { ...form };
    const formData = {};
    Object.keys(formValues).forEach((key) => {
      const formValue = formValues[key];
      Object.assign(formData, {
        ...formData,
        [key]: formValue.value,
      });
    });

    return formData;
  };

  /** input 태그 를 사용하지 않을 시, 타입 지정 필요 */
  const handleFormValueChange = <T,>(
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: T },
  ) => {
    const target = 'target' in e ? e.target : e;
    const { name, value } = target;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: {
          ...form[name],
          value,
          isValid:
            isSubmitted && setIsValid<T>(value as T, form[name].validCondition),
        } as FormPropertyType<T>,
      };
    });
  };

  const { validateAllFormValues, validateFormValue, setIsValid } =
    useValidateForm(form, setForm, setIsSubmitted);

  return {
    form,
    handleFormValueChange,
    validateAllFormValues,
    validateFormValue,
    setIsSubmitted,
    convertToFormData,
  };
};

export interface FormPropertyType<T> {
  initialValue?: T;
  value?: T;
  validCondition: ValidateConditions;
  isValid?: ValidType;
}

export interface FormType {
  [key: string]: FormPropertyType<any>;
}

export default useNewForm;
