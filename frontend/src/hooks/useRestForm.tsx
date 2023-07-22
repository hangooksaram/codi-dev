import { useEffect, useState } from "react";

const useRestForm = <T extends Object>(values: T) => {
  const [invalidValues, setInvalidValues] = useState<string[]>([]);
  const [restForm, setRestForm] = useState<T>(values);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateRestForm = () => {
    setIsSubmitted(true);
    const keys = Object.keys(restForm);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = restForm[key as keyof typeof restForm];
      const isDuplicated = invalidValues.find((value) => value === key);

      if (!value && !isDuplicated) {
        setInvalidValues((prev) => prev.concat(key));
        continue;
      }
      setInvalidValues((prev) => prev.filter((item) => item !== key));
    }
  };

  const invalid = (key: string) => {
    return isSubmitted && !restForm[key as keyof typeof restForm];
  };

  return {
    invalidValues,
    setInvalidValues,
    restForm,
    setRestForm,
    validateRestForm,
    invalid,
    isSubmitted,
    setIsSubmitted,
  };
};

export default useRestForm;
