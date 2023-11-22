import { ChangeEvent, useState } from "react";
import { ValidType, ValidateConditions, invalid } from "../../utils/validate";

const useNewForm = <T extends Object>(values: T) => {
  const [form, setForm] = useState<T>(values);
  const [isSubmitted, setIsSubmitted] = useState(false);
  type FormType = keyof typeof form;
  const handleFormValueChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: string | boolean | number }
  ) => {
    const target = "target" in e ? e.target : e;
    const { name, value } = target;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: {
          ...(form[name as FormType] as FormValueType),
          value,
          isValid:
            isSubmitted &&
            setIsValid(
              value as string | number,
              (form[name as FormType] as FormValueType).validCondition
            ),
        },
      };
    });
  };

  const validateFormValue = (
    formName: keyof typeof form,
    formValue: FormValueType
  ) => {
    const isValid = setIsValid(formValue.value, formValue.validCondition);
    setForm((prevForm) => {
      return {
        ...prevForm,
        [formName]: {
          ...form[formName],
          isValid,
        },
      };
    });

    return isValid;
  };

  const validateAllFormValues = () => {
    let isValid: ValidType[] = [];
    Object.entries(form).forEach((item) => {
      const [formName, formValue] = item;
      isValid.push(validateFormValue(formName as keyof typeof form, formValue));
    });
    setIsSubmitted(true);

    return !isValid.includes("invalid");
  };

  const setIsValid = (
    value: string | number,
    validCondition: ValidateConditions
  ) => {
    return invalid(value, validCondition) ? "invalid" : "valid";
  };

  return {
    form,
    handleFormValueChange,
    validateAllFormValues,
    setIsSubmitted,
  };
};

export interface FormValueType {
  value: string | number;
  validCondition: ValidateConditions;
  isValid: ValidType;
}

export default useNewForm;
