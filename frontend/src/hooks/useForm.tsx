import { ChangeEvent, useState } from "react";

const useForm = <T extends Object>(values: T) => {
  const [form, setForm] = useState<T>(values);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formInvalid, setFormInvalid] = useState(false);
  let validations: Validation[] = [];

  const handleFormValueChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: string | boolean | number }
  ) => {
    const target = "target" in e ? e.target : e;
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (isSubmitted === false) setIsSubmitted(true);
    setFormInvalid(false);
    validations.some(({ validation }) => {
      if (
        Object.values(validation).some((validationValue) => validationValue)
      ) {
        setFormInvalid(true);
        return false;
      }
    });
  };

  const invalid = (key: string, invalidType: InvalidType) => {
    const validationResult = validate(key, invalidType);
    validations = [...validations, { key, validation: validationResult }];
    return isSubmitted && Object.values(validationResult).includes(true);
  };

  const validateCondition = (
    formKey: string,
    invalidType: InvalidType,
    key: string
  ) => {
    const { regex, min, max } = invalidType;
    const formValue = form[formKey as keyof typeof form];
    const condition = {
      required: !formValue,
      regex: !regex?.test(formValue!.toString()),
      min: typeof formValue === "string" && formValue.length < min!,
      max: typeof formValue === "string" && formValue.length > max!,
    };

    return condition[key as keyof typeof condition];
  };

  const validate = (formKey: string, invalidType: InvalidType) => {
    const validationResult: ValidationObj = {};

    Object.keys(invalidType).map((key) => {
      if (invalidType[key as keyof typeof invalidType])
        Object.assign(validationResult, {
          ...validationResult,
          [key]: validateCondition(formKey, invalidType, key),
        });
    });

    return validationResult;
  };

  interface InvalidType {
    required?: boolean;
    regex?: RegExp;
    min?: number;
    max?: number;
  }

  interface Validation {
    key: string;
    validation: ValidationObj;
  }

  interface ValidationObj {
    required?: boolean;
    regex?: boolean;
    min?: boolean;
    max?: boolean;
  }

  return {
    form,
    setForm,
    validateForm,
    invalid,
    isSubmitted,
    setIsSubmitted,
    handleFormValueChange,
    formInvalid,
  };
};

export default useForm;
