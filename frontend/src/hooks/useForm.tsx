import { ChangeEvent, useState } from "react";

const useForm = <T extends Object>(values: T) => {
  const [invalidValues, setInvalidValues] = useState<string[]>([]);
  const [form, setForm] = useState<T>(values);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

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
    let invalidValue = false;
    for (let i = 0; i < validations.length; i++) {
      if (Object.values(validations[i].obj).find((flag) => flag === true)) {
        invalidValue = true;
        break;
      }
    }
    setIsInvalid(invalidValue);
    return;
  };

  const invalid = (key: string, { required, regex, min, max }: InvalidType) => {
    const formValue = form[key as keyof typeof form];
    const validation: ValidationObj = {};
    const valdationCondition = {
      required: !formValue,
      regex: !regex?.test(formValue!.toString()),
      min: typeof formValue === "string" && formValue.length < min!,
      max: typeof formValue === "string" && formValue.length > max!,
    };

    const doValidate = (key: keyof typeof valdationCondition) => {
      Object.assign(validation, {
        ...validation,
        [key]: valdationCondition[key],
      });
    };

    if (required) {
      doValidate("required");
    }
    if (regex) {
      doValidate("regex");
    }
    if (typeof formValue === "string") {
      if (min) {
        doValidate("min");
      }
      if (max) {
        doValidate("max");
      }
    }
    validations = [...validations, { name: key, obj: validation }];
    return isSubmitted && Object.values(validation).includes(true);
  };

  interface InvalidType {
    required?: boolean;
    regex?: RegExp;
    min?: number;
    max?: number;
  }

  interface Validation {
    name: string;
    obj: ValidationObj;
  }

  interface ValidationObj {
    required?: boolean;
    regex?: boolean;
    min?: boolean;
    max?: boolean;
  }

  return {
    invalidValues,
    setInvalidValues,
    form,
    setForm,
    validateForm,
    invalid,
    isSubmitted,
    setIsSubmitted,
    handleFormValueChange,
    isInvalid,
  };
};

export default useForm;
