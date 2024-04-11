import { SetState } from '@/index';
import { FormPropertyType, FormType } from './useForm';
import { ValidType, ValidateConditions, invalid } from '@/utils/validate';

const useValidateForm = (
  form: FormType,
  setForm: SetState<FormType>,
  setIsSubmitted: SetState<boolean>,
) => {
  const validateFormValue = <T,>(
    formName: keyof typeof form,
    formValue: FormPropertyType<T>,
  ) => {
    const isValid = setIsValid(formValue.value!, formValue.validCondition);
    setForm((prevForm) => {
      return {
        ...prevForm,
        [formName]: {
          ...form[formName],
          isValid,
        } as FormPropertyType<T>,
      };
    });

    return isValid;
  };

  const validateAllFormValues = () => {
    const isValid: ValidType[] = [];
    Object.entries(form).forEach((item) => {
      const [formName, formValue] = item;
      isValid.push(
        validateFormValue<typeof formValue.value>(
          formName as keyof typeof form,
          formValue,
        ),
      );
    });
    setIsSubmitted(true);

    return !isValid.includes('invalid');
  };

  const setIsValid = <T,>(value: T, validCondition: ValidateConditions) => {
    return invalid(value, validCondition) ? 'invalid' : 'valid';
  };

  return { validateAllFormValues, validateFormValue, setIsValid };
};

export default useValidateForm;
