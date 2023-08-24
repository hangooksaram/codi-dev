import { ChangeEvent, useState } from "react";

const useForm = <T extends Object>(values: T) => {
  const [invalidValues, setInvalidValues] = useState<string[]>([]);
  const [form, setForm] = useState<T>(values);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormValueChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: string }
  ) => {
    const target = "target" in e ? e.target : e;
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };
  const validateForm = () => {
    setIsSubmitted(true);
    const keys = Object.keys(form);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = form[key as keyof typeof form];
      const isDuplicated = invalidValues.find((value) => value === key);

      if (!value && !isDuplicated) {
        setInvalidValues((prev) => prev.concat(key));
        continue;
      }
      setInvalidValues((prev) => prev.filter((item) => item !== key));
    }
  };

  const invalid = (key: string, { required, regex }: InvalidType) => {
    if (isSubmitted) {
      if (required) {
        return !form[key as keyof typeof form];
      }
      if (regex) {
        return !regex.test(form[key as keyof typeof form]!.toString());
      }
    }
    return false;
  };

  interface InvalidType {
    required?: boolean;
    regex?: RegExp;
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
  };
};

export default useForm;
